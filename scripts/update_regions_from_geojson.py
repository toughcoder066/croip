#!/usr/bin/env python3
"""
Updates region coordinates and codes in CROIP Shared Services database
using docs/gh.json.
Format: REG-2026-{id from the json file} (e.g. REG-2026-GHAA, REG-2026-GHAF)
"""

import json
import os
import subprocess
import sys

def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    geojson_path = os.path.join(repo_root, 'docs', 'gh.json')

    if not os.path.exists(geojson_path):
        print(f"Error: {geojson_path} not found.")
        sys.exit(1)

    with open(geojson_path, 'r') as f:
        geojson = json.load(f)

    features = geojson.get('features', [])
    print(f"Loaded {len(features)} features from {geojson_path}")

    def normalize(name: str) -> str:
        return name.lower().replace(' region', '').replace(' ', '').replace('-', '')

    # Fetch existing DB regions
    db_res = subprocess.check_output([
        'docker', 'exec', 'central-platform-postgres',
        'psql', '-U', 'idarms', '-d', 'shared_services',
        '-t', '-c', 'SELECT id, code, name FROM regions;'
    ]).decode('utf-8')

    db_regions = []
    for line in db_res.strip().split('\n'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) == 3:
            db_regions.append({'id': parts[0], 'code': parts[1], 'name': parts[2]})

    sql_statements = ['BEGIN;']
    updated_count = 0

    for f in features:
        p = f['properties']
        f_norm = normalize(p['name'])
        match = None
        for d in db_regions:
            d_norm = normalize(d['name'])
            if f_norm == d_norm:
                match = d
                break

        if not match:
            print(f"Warning: No database match found for '{p['name']}'")
            continue

        target_code = f"REG-2026-{p['id']}"
        geom_json = json.dumps(f['geometry']).replace("'", "''")

        sql = f"UPDATE regions SET code = '{target_code}', polygon_geojson = '{geom_json}'::jsonb, updated_at = NOW() WHERE id = '{match['id']}';"
        sql_statements.append(sql)
        updated_count += 1

    sql_statements.append('COMMIT;')
    full_sql = '\n'.join(sql_statements)

    # Execute against Postgres container
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

    print(f"Successfully updated {updated_count} regions with new codes and GeoJSON coordinates.")

if __name__ == '__main__':
    main()
