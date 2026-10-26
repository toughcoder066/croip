# Deploying to the office on-prem server

This is a checklist for the first time this stack runs somewhere other than a developer's
own laptop. It assumes the same `docker compose` setup already used for local dev — just
pointed at the office server instead of `localhost`. Nothing here needs to happen until
that server actually exists; local dev is unaffected by any of it.

## 0. Before you start

Decide the server's address once — a real domain name, or just its LAN IP/hostname — and
use the same value everywhere below. Changing it later means re-registering every OIDC
app's redirect URIs in Zitadel, not just editing one file.

## 1. Generate real secrets

Create a root `.env` next to `docker-compose.yml` on the server (never commit it — it's
already gitignored) with:

```
ZITADEL_MASTERKEY=<32 random characters>
POSTGRES_PASSWORD=<a real password>
RABBITMQ_DEFAULT_PASS=<a real password>
```

`docker-compose.yml`'s `postgres`/`rabbitmq` services still hardcode `idarms_dev_only` —
that's the one place passwords aren't yet wired to env vars (everywhere else already is,
see the comments next to `ZITADEL_ISSUER`/`ZITADEL_AUDIENCE` in that file). Update those
two `environment:` blocks to reference `${POSTGRES_PASSWORD}` / `${RABBITMQ_DEFAULT_PASS}`
the same way, and update every service's `DATABASE_URL`/`RABBITMQ_URL` to match, before
first boot on the server — changing a database password after data exists is a migration,
not a config edit.

Keep a copy of the masterkey somewhere durable (not just the shell that first ran
`docker compose up`) — losing it makes every secret Zitadel has ever stored unrecoverable.

## 2. Point everything at the server's real address

Every `http://localhost:...` in this repo is a dev default, not a hardcoded requirement —
each one is overridable via an env var (see the comments in `docker-compose.yml` and each
service's `.env.example`). On the server:

- `docker-compose.yml`'s `zitadel` service: `ZITADEL_EXTERNALDOMAIN` → the server's address.
- A root `.env` with `ZITADEL_ISSUER=http://<server-address>:8080` (or `https://` once step
  3 is done) — read by all 11 services via the `${ZITADEL_ISSUER:-...}` interpolation
  already in `docker-compose.yml`.
- `apps/croip-portal/.env`: every `*_API_URL`, plus `ZITADEL_ISSUER` to match.

## 3. TLS (recommended)

Put a reverse proxy (Caddy or nginx) in front of the portal and Zitadel, terminating HTTPS
with a self-signed or internal-CA certificate — this is a LAN-only deployment, so a public
CA certificate isn't needed. Traffic between containers on the Docker network stays plain
HTTP; only the edge needs TLS. Once that's in place, flip in the `zitadel` service:

```
ZITADEL_EXTERNALSECURE: "true"
ZITADEL_TLS_ENABLED: "true"
```

and change every `http://` issuer/API URL from step 2 to `https://`.

## 4. Bootstrap Zitadel

On a genuinely fresh Zitadel instance (first boot, empty database):

1. Log in once to its console (`http://<server-address>:8080/ui/console`) as the default
   admin Zitadel creates on first start (check its container logs if no
   `ZITADEL_FIRSTINSTANCE_*` env vars were set — it prints one). Create a Personal Access
   Token for a machine user with "Org User Manager" rights (or broader).
2. Run `scripts/bootstrap-zitadel.sh` with that token:
   ```
   ZITADEL_PAT=<token from step 1> \
   ZITADEL_URL=http://<server-address>:8080 \
   PORTAL_URL=http://<server-address>:3050 \
   ./scripts/bootstrap-zitadel.sh
   ```
   This recreates the `central-platform` project, all 16 permission roles, the
   `croip-portal` OIDC app, and the superuser account + role grant — everything that was
   built by hand against the local instance during development. It's idempotent: re-run it
   any time without fear of duplicating anything.
3. Take the `ZITADEL_AUDIENCE` and `ZITADEL_CLIENT_ID` values it prints and set them in the
   root `.env` / portal `.env` from step 2.
4. The superuser signs in through the portal and sets their own password on first login —
   nothing to configure for that.

## 5. Backups

There's no managed-cloud snapshotting on an on-prem box. At minimum, a nightly cron like:

```bash
#!/bin/bash
# /etc/cron.daily/croip-pg-backup (adjust paths/retention to taste)
BACKUP_DIR=/var/backups/croip-postgres
mkdir -p "$BACKUP_DIR"
docker exec central-platform-postgres pg_dumpall -U idarms \
  | gzip > "$BACKUP_DIR/$(date +%Y%m%d-%H%M).sql.gz"
find "$BACKUP_DIR" -name '*.sql.gz' -mtime +14 -delete
```

If the office already has its own backup/snapshot system covering Docker volumes, point it
at `central-platform-postgres-data` instead and skip this.

## 6. Bring it up

```
docker compose up -d --build
docker compose ps   # everything healthy
```

Then walk the portal end to end — login, every page that calls a backend service — the
same regression pass used after wiring each service's auth locally. `postgres` and
`rabbitmq` now both have `restart: unless-stopped`, so a server reboot brings everything
back without manual intervention; worth actually testing once (reboot the box, or at least
`docker compose restart` the stack) before calling this done.
