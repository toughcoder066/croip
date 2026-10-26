# Zitadel-side scripts

Config that lives in the Zitadel instance itself, not in any service's codebase — kept here
so it's reviewable and versioned, but it has to be pushed to Zitadel by hand (Console) or via
its Management API; nothing in this repo applies it automatically.

## `inject-idarms-context.js` — historical, not the live mechanism

**This approach was abandoned.** It targeted Zitadel's v1-style "Complement Token" Action
(inline JS run by Zitadel itself). This project's Zitadel is v4.16.0, which uses Actions v2
instead — Zitadel calls out to an externally-hosted HTTP "Target" rather than running inline
script. A `restCall`-type Target was built, wired to the `preaccesstoken` function trigger,
and verified reachable and correctly invoked by Zitadel (confirmed via logs: Zitadel called
it with the right identity, got back a well-formed 200 response) — but the claims it
returned never landed in the issued token, for client_credentials grants specifically. That
held across both Target types (`restWebhook`, which is documented to ignore responses
entirely, and `restCall`, which is documented to apply them), both response field casings,
and both a real claim and a trivial throwaway one. This looks like either an undocumented
limitation of this Zitadel version for this grant type, or an unmet requirement neither the
public docs nor the community bug threads surfaced.

**What replaced it:** every service now resolves a service (client_credentials) token's
concession by calling `platform-governance-service`'s own
`GET /v1/api-clients/:clientId/context` with the verified JWT's own `client_id` claim,
instead of trusting a claim injected into the token. See
`services/platform-governance-service/src/modules/governance/service.ts`
(`getApiClientContext`) and each service's `src/plugins/auth.ts`. No Zitadel Action, Target,
or webhook is involved in the live system. This file and this note are kept only so the
investigation and the reasoning for abandoning it aren't lost.
