#!/bin/bash
# Recreates the "central-platform" Zitadel project — roles, the croip-portal OIDC app, and
# the superuser's role grant — on a fresh Zitadel instance (idempotent: safe to re-run; it
# checks before creating, never duplicates).
#
# Why this exists: this exact setup was done by hand, call-by-call, against the Zitadel
# Management API during local development (never through the console UI, and never
# scripted). That meant redoing it on the office server would mean re-deriving every role
# key and API call from memory a second time. This script is that setup, captured once
# from the actual live local instance's current state so it reflects what's really running,
# not what was originally planned.
#
# What this does NOT do (can't be scripted — a genuinely fresh Zitadel instance has no
# authenticated caller yet to call its own API with):
#   1. Bootstrap the very first admin identity. A brand-new instance only trusts the
#      ZITADEL_FIRSTINSTANCE_* org/human credentials docker-compose gives it on first boot
#      (or Zitadel's own default admin, printed to its container logs on first start if
#      none were configured). Log in as that admin via the console
#      (http://<host>:8080/ui/console) ONCE, create a Personal Access Token for a machine
#      user with "Org User Manager" (or broader) rights, and pass it as ZITADEL_PAT below.
#   2. Set a password for the superuser account this script creates — it's created with
#      Zitadel's invite flow; the actual person signing in sets their own password the
#      first time, the same as any other oversight officer onboarded through the portal.
#
# Usage:
#   ZITADEL_PAT=<pat from step 1 above> \
#   ZITADEL_URL=http://localhost:8080 \
#   PORTAL_URL=http://localhost:3050 \
#   SUPERUSER_EMAIL=superuser@croip.com \
#   ./scripts/bootstrap-zitadel.sh
#
# Prints the resulting project ID, portal OIDC client ID, and superuser Zitadel user ID at
# the end — these are what every service's .env (ZITADEL_AUDIENCE) and the portal's .env
# (ZITADEL_CLIENT_ID) need to be set to.

set -euo pipefail

ZITADEL_URL="${ZITADEL_URL:-http://localhost:8080}"
PORTAL_URL="${PORTAL_URL:-http://localhost:3050}"
SUPERUSER_EMAIL="${SUPERUSER_EMAIL:-superuser@croip.com}"
SUPERUSER_NAME="${SUPERUSER_NAME:-CROIP Superuser}"

if [ -z "${ZITADEL_PAT:-}" ]; then
  echo "ZITADEL_PAT is required — see the comment block at the top of this script for how to get one." >&2
  exit 1
fi

AUTH_HEADER="Authorization: Bearer ${ZITADEL_PAT}"

# The full permission-string catalog checked across all 11 services' requirePermissions()
# calls, as literal Zitadel Project Role keys — a role's key must be the exact permission
# string for every service's auth.ts to pick it up with zero code changes (it reads
# Zitadel's own role-assertion claim and treats each key as a granted permission).
ROLE_KEYS=(
  "api_clients:manage"
  "api_clients:self_manage"
  "concession:read"
  "concessionaires:manage"
  "concessionaires:read"
  "iam:roles_assign"
  "iam:users_manage"
  "message:send"
  "properties:manage"
  "properties:read"
  "properties:verify"
  "properties:verify:review"
  "ratepayers:manage"
  "ratepayers:read"
  "reference:manage"
  "reference:read"
)

echo "== Finding or creating the central-platform project =="
PROJECT_ID=$(curl -s -X POST "${ZITADEL_URL}/management/v1/projects/_search" \
  -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
  --data-raw '{"queries":[{"nameQuery":{"name":"central-platform","method":"TEXT_QUERY_METHOD_EQUALS"}}]}' \
  | python3 -c "import sys,json; r=json.load(sys.stdin).get('result',[]); print(r[0]['id'] if r else '')")

if [ -z "$PROJECT_ID" ]; then
  PROJECT_ID=$(curl -s -X POST "${ZITADEL_URL}/management/v1/projects" \
    -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
    --data-raw '{"name":"central-platform"}' \
    | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
  echo "Created project $PROJECT_ID"
else
  echo "Found existing project $PROJECT_ID"
fi

echo "== Enabling projectRoleAssertion (required for granted roles to appear in tokens) =="
curl -s -X PUT "${ZITADEL_URL}/management/v1/projects/${PROJECT_ID}" \
  -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
  --data-raw '{"name":"central-platform","projectRoleAssertion":true,"projectRoleCheck":false,"hasProjectCheck":false}' > /dev/null

echo "== Creating project roles (skipping any that already exist) =="
EXISTING_ROLES=$(curl -s -X POST "${ZITADEL_URL}/management/v1/projects/${PROJECT_ID}/roles/_search" \
  -H "${AUTH_HEADER}" -H "Content-Type: application/json" --data-raw '{}' \
  | python3 -c "import sys,json; print('\n'.join(r['key'] for r in json.load(sys.stdin).get('result',[])))")

for role in "${ROLE_KEYS[@]}"; do
  if echo "$EXISTING_ROLES" | grep -qx "$role"; then
    echo "  skip (exists): $role"
    continue
  fi
  curl -s -X POST "${ZITADEL_URL}/management/v1/projects/${PROJECT_ID}/roles" \
    -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
    --data-raw "{\"roleKey\": \"$role\", \"displayName\": \"$role\", \"group\": \"croip\"}" > /dev/null
  echo "  created: $role"
done

echo "== Finding or creating the croip-portal OIDC app =="
APP_ID=$(curl -s -X POST "${ZITADEL_URL}/management/v1/projects/${PROJECT_ID}/apps/_search" \
  -H "${AUTH_HEADER}" -H "Content-Type: application/json" --data-raw '{}' \
  | python3 -c "import sys,json; r=[a for a in json.load(sys.stdin).get('result',[]) if a.get('name')=='croip-portal']; print(r[0]['id'] if r else '')")

if [ -z "$APP_ID" ]; then
  CREATE_RESPONSE=$(curl -s -X POST "${ZITADEL_URL}/management/v1/projects/${PROJECT_ID}/apps/oidc" \
    -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
    --data-raw "{
      \"name\": \"croip-portal\",
      \"redirectUris\": [\"${PORTAL_URL}/api/auth/oauth/zitadel/callback\"],
      \"responseTypes\": [\"OIDC_RESPONSE_TYPE_CODE\"],
      \"grantTypes\": [\"OIDC_GRANT_TYPE_AUTHORIZATION_CODE\", \"OIDC_GRANT_TYPE_REFRESH_TOKEN\"],
      \"appType\": \"OIDC_APP_TYPE_WEB\",
      \"authMethodType\": \"OIDC_AUTH_METHOD_TYPE_NONE\",
      \"postLogoutRedirectUris\": [\"${PORTAL_URL}\", \"${PORTAL_URL}/login\"],
      \"devMode\": true,
      \"accessTokenType\": \"OIDC_TOKEN_TYPE_JWT\",
      \"accessTokenRoleAssertion\": true,
      \"idTokenRoleAssertion\": true
    }")
  APP_ID=$(echo "$CREATE_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['appId'])")
  CLIENT_ID=$(echo "$CREATE_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['clientId'])")
  echo "Created app $APP_ID (clientId $CLIENT_ID)"
else
  CLIENT_ID=$(curl -s "${ZITADEL_URL}/management/v1/projects/${PROJECT_ID}/apps/${APP_ID}" \
    -H "${AUTH_HEADER}" | python3 -c "import sys,json; print(json.load(sys.stdin)['app']['oidcConfig']['clientId'])")
  echo "Found existing app $APP_ID (clientId $CLIENT_ID)"
fi

echo "== Finding or inviting the superuser =="
USER_ID=$(curl -s -X POST "${ZITADEL_URL}/management/v1/users/_search" \
  -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
  --data-raw "{\"queries\":[{\"emailQuery\":{\"emailAddress\":\"${SUPERUSER_EMAIL}\",\"method\":\"TEXT_QUERY_METHOD_EQUALS\"}}]}" \
  | python3 -c "import sys,json; r=json.load(sys.stdin).get('result',[]); print(r[0]['id'] if r else '')")

if [ -z "$USER_ID" ]; then
  USER_ID=$(curl -s -X POST "${ZITADEL_URL}/v2/users/human" \
    -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
    --data-raw "{
      \"profile\": {\"givenName\": \"CROIP\", \"familyName\": \"Superuser\", \"displayName\": \"${SUPERUSER_NAME}\"},
      \"email\": {\"email\": \"${SUPERUSER_EMAIL}\", \"isVerified\": true}
    }" | python3 -c "import sys,json; print(json.load(sys.stdin)['userId'])")
  echo "Created superuser $USER_ID — they set their own password on first portal sign-in."
else
  echo "Found existing superuser $USER_ID"
fi

echo "== Granting all project roles to the superuser =="
EXISTING_GRANT=$(curl -s -X POST "${ZITADEL_URL}/management/v1/users/grants/_search" \
  -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
  --data-raw "{\"queries\":[{\"userIdQuery\":{\"userId\":\"${USER_ID}\"}}]}" \
  | python3 -c "import sys,json; r=json.load(sys.stdin).get('result',[]); print(r[0]['id'] if r else '')")

ROLE_KEYS_JSON=$(printf '%s\n' "${ROLE_KEYS[@]}" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read().splitlines()))")

if [ -z "$EXISTING_GRANT" ]; then
  curl -s -X POST "${ZITADEL_URL}/management/v1/users/${USER_ID}/grants" \
    -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
    --data-raw "{\"projectId\": \"${PROJECT_ID}\", \"roleKeys\": ${ROLE_KEYS_JSON}}" > /dev/null
  echo "Created grant with all ${#ROLE_KEYS[@]} roles"
else
  curl -s -X PUT "${ZITADEL_URL}/management/v1/users/${USER_ID}/grants/${EXISTING_GRANT}" \
    -H "${AUTH_HEADER}" -H "Content-Type: application/json" \
    --data-raw "{\"roleKeys\": ${ROLE_KEYS_JSON}}" > /dev/null
  echo "Updated existing grant $EXISTING_GRANT with all ${#ROLE_KEYS[@]} roles"
fi

echo ""
echo "== Done. Set these in every service's/the portal's .env: =="
echo "  ZITADEL_AUDIENCE=${PROJECT_ID}"
echo "  ZITADEL_CLIENT_ID=${CLIENT_ID}   (portal .env only)"
echo "  Superuser Zitadel user ID: ${USER_ID}"
