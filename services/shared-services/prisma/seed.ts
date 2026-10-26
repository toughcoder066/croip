import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '../src/generated/prisma-client/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../..');

const prisma = new PrismaClient();

function normalizeName(name: string): string {
  return name.toLowerCase().replace(' region', '').replace(/[\s-]/g, '');
}

async function main() {
  console.log('Seeding GIS Regions and Municipal Assemblies (MMDAs)...');

  const ghJsonPath = path.join(repoRoot, 'docs', 'gh.json');
  const ghaAdmin2Path = path.join(repoRoot, 'docs', 'gha_admin2.geojson');

  if (!fs.existsSync(ghJsonPath) || !fs.existsSync(ghaAdmin2Path)) {
    throw new Error(`Required geojson files not found in ${path.join(repoRoot, 'docs')}`);
  }

  const ghData = JSON.parse(fs.readFileSync(ghJsonPath, 'utf8'));
  const ghaAdmin2Data = JSON.parse(fs.readFileSync(ghaAdmin2Path, 'utf8'));

  // 1. Seed 16 Regions from gh.json
  console.log(`Processing ${ghData.features.length} regions from gh.json...`);
  const regionMapByName = new Map<string, string>(); // normalized name -> region id

  for (const feature of ghData.features) {
    const props = feature.properties;
    const regionCode = `REG-2026-${props.id}`;
    const regionName = props.name.trim();

    const region = await prisma.region.upsert({
      where: { code: regionCode },
      create: {
        code: regionCode,
        name: regionName,
        polygonGeoJson: feature.geometry ?? null
      },
      update: {
        name: regionName,
        polygonGeoJson: feature.geometry ?? null
      }
    });

    regionMapByName.set(normalizeName(regionName), region.id);
  }

  console.log(`Successfully seeded ${regionMapByName.size} regions.`);

  // 2. Seed 260 Municipal Assemblies from gha_admin2.geojson
  console.log(`Processing ${ghaAdmin2Data.features.length} MMDAs from gha_admin2.geojson...`);
  let mmdaCount = 0;

  for (const feature of ghaAdmin2Data.features) {
    const props = feature.properties;
    const pcode: string = props.adm2_pcode;
    const mmdaName: string = props.adm2_name.trim();
    const adm1Name: string = props.adm1_name || '';

    const regionId = regionMapByName.get(normalizeName(adm1Name));
    if (!regionId) {
      console.warn(`Warning: Could not find matching region for MMDA '${mmdaName}' (adm1: '${adm1Name}')`);
      continue;
    }

    let category = 'DISTRICT';
    if (mmdaName.includes('Metropolitan')) {
      category = 'METROPOLITAN';
    } else if (mmdaName.includes('Municipal')) {
      category = 'MUNICIPAL';
    }

    await prisma.municipalAssembly.upsert({
      where: { code: pcode },
      create: {
        regionId,
        code: pcode,
        name: mmdaName,
        category,
        polygonGeoJson: feature.geometry ?? null
      },
      update: {
        regionId,
        name: mmdaName,
        category,
        polygonGeoJson: feature.geometry ?? null
      }
    });

    mmdaCount++;
  }

  console.log(`Successfully seeded ${mmdaCount} Municipal Assemblies (MMDAs).`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
