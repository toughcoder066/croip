-- An MMDA belongs to exactly one concessionaire at a time (a concessionaire can hold many
-- MMDAs). Prisma's `@@unique([concessionId, assemblyId])` only stops the same concession
-- being assigned the same MMDA twice — it never stopped two different concessions both
-- holding an active assignment for the same assemblyId. `prisma db push` cannot express a
-- filtered/partial unique index, so this file is not auto-applied by the dev migration
-- container (see prisma/migrations/20261023110552_real_api_client_lifecycle for the same
-- caveat) — it must be applied by hand against every environment, mirroring the existing
-- api_clients_one_active_per_concession index.
CREATE UNIQUE INDEX IF NOT EXISTS "concession_assemblies_one_active_per_assembly"
  ON "concession_assemblies"("assembly_id")
  WHERE status = 'ACTIVE';
