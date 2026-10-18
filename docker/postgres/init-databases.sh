#!/usr/bin/env bash
set -e

databases=(
  "reporting_gateway"
  "event_processing"
  "independent_evidence"
  "shared_services"
  "oversight_reconciliation"
  "audit_assurance"
  "platform_governance"
  "property_registry"
  "ratepayer_core"
  "billing_payments"
  "disputes"
)

for db in "${databases[@]}"; do
  echo "Checking database: $db"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT 'CREATE DATABASE $db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$db')\gexec
    GRANT ALL PRIVILEGES ON DATABASE $db TO "$POSTGRES_USER";
EOSQL
  echo "Database $db ready."
done
