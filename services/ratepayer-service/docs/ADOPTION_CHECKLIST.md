# Adoption checklist

Complete every item before creating a production service from this template.

- Replace `example-service`, the example module and placeholder problem URI.
- Give the service one bounded business responsibility and a named owner.
- Create a dedicated PostgreSQL database and credentials; never share tables with another service.
- Define the service's OpenAPI contract and versioned event catalogue before implementation.
- Configure the ZITADEL project, audience, roles and `urn:idarms:context` claim mapping.
- Confirm every query includes the authorised concession and Assembly boundary.
- Define idempotency behaviour for commands and all financial operations.
- Write business changes and outgoing events atomically using the outbox.
- Deduplicate incoming events using the inbox table before applying effects.
- Define retry limits, dead-letter handling and the operational recovery owner.
- Replace development secrets and enable secret rotation.
- Add unit, integration, contract, migration, authorization and recovery tests.
- Set resource requests, limits, disruption rules and autoscaling for deployment.
- Create dashboards, alerts, runbooks, backup tests and a service restoration test.
- Complete threat modelling, data classification and retention review.
