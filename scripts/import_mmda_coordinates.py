#!/usr/bin/env python3
"""
Imports MMDA (Municipal Assembly) GIS coordinates into CROIP Shared Services database
from docs/gha_admin2.geojson.
"""

import json
import os
import subprocess
import sys

def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    geojson_path = os.path.join(repo_root, 'docs', 'gha_admin2.geojson')

    if not os.path.exists(geojson_path):
        print(f"Error: {geojson_path} not found.")
        sys.exit(1)

    print(f"Loading GeoJSON from {geojson_path}...")
    with open(geojson_path, 'r') as f:
        geojson = json.load(f)

    features = geojson.get('features', [])
    print(f"Loaded {len(features)} MMDA features.")

    # 1. Fetch DB regions for region_id verification
    cmd_reg = [
        'docker', 'exec', 'central-platform-postgres',
        'psql', '-U', 'idarms', '-d', 'shared_services',
        '-t', '-c', 'SELECT id, code, name FROM regions;'
    ]
    raw_reg = subprocess.check_output(cmd_reg).decode('utf-8')

    db_regions = {}
    for line in raw_reg.strip().split('\n'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) == 3:
            clean_name = parts[2].lower().replace(' region', '').replace(' ', '').replace('-', '')
            db_regions[clean_name] = parts[0]

    # 2. Fetch existing DB municipal_assemblies
    cmd_mmda = [
        'docker', 'exec', 'central-platform-postgres',
        'psql', '-U', 'idarms', '-d', 'shared_services',
        '-t', '-c', 'SELECT id, code, name FROM municipal_assemblies;'
    ]
    raw_mmda = subprocess.check_output(cmd_mmda).decode('utf-8')

    db_assemblies = {}
    for line in raw_mmda.strip().split('\n'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) == 3:
            db_assemblies[parts[1]] = {'id': parts[0], 'name': parts[2]}

    print(f"Found {len(db_assemblies)} existing MMDAs in database.")

    # 3. Generate SQL updates
    sql_statements = ['BEGIN;']
    updated_count = 0

    for f in features:
        props = f['properties']
        pcode = props['adm2_pcode']
        adm2_name = props['adm2_name']
        adm1_name = props.get('adm1_name', '')
        clean_adm1 = adm1_name.lower().replace(' region', '').replace(' ', '').replace('-', '')
        target_region_id = db_regions.get(clean_adm1)

        db_entry = db_assemblies.get(pcode)
        if not db_entry:
            print(f"Warning: No database MMDA found for pcode '{pcode}' ({adm2_name})")
            continue

        geom_json = json.dumps(f['geometry']).replace("'", "''")

        if target_region_id:
            sql = f"UPDATE municipal_assemblies SET polygon_geojson = '{geom_json}'::jsonb, region_id = '{target_region_id}', updated_at = NOW() WHERE code = '{pcode}';"
        else:
            sql = f"UPDATE municipal_assemblies SET polygon_geojson = '{geom_json}'::jsonb, updated_at = NOW() WHERE code = '{pcode}';"

        sql_statements.append(sql)
        updated_count += 1

    sql_statements.append('COMMIT;')
    print(f"Generated {updated_count} MMDA update statements.")

    full_sql = '\n'.join(sql_statements)
    tmp_sql_path = '/tmp/update_mmdas.sql'
    with open(tmp_sql_path, 'w') as out_f:
        out_f.write(full_sql)

    # 4. Execute SQL in Postgres
    print("Executing update in PostgreSQL container...")
    proc = subprocess.Popen(
        ['docker', 'exec', '-i', 'central-platform-postgres', 'psql', '-U', 'idarms', '-d', 'shared_services'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    stdout, stderr = proc.communicate(input=full_sql)

    if proc.returncode != 0:
        print(f"Error executing SQL: {stderr}")
        sys.exit(proc.returncode)

    print(f"Successfully imported coordinates for all {updated_count} MMDAs!")

if __name__ == '__main__':
    main()
