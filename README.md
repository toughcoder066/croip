# CROIP — Central Revenue Oversight & Integration Platform
> **Repository:** `Level10-Ghana/Central-Platform`  
> **Status:** Active Core Platform Development (Phase 0)  
> **Architecture:** Modular Monorepo (pnpm Workspaces + Turborepo)

---

## 1. Overview
**CROIP** (Central Revenue Oversight & Integration Platform) is the national platform established to provide centralized oversight, rate card governance, financial reconciliation, and unified ratepayer payment orchestration across all municipal concessions in Ghana.

### Core Operating Principles
* **Open Standard Integration:** Concessionaires retain their local operational software (e.g., valuation, customer operations, iDARMS) and connect via published OpenAPI standards.
* **Rate Card Governance:** Concessionaires compute local property rates, but CROIP independently verifies municipal rate cards and validates bills before they become payable.
* **Central Payment Orchestration:** Ratepayers pay through CROIP's unified channels (MoMo, cards, bank) via a pluggable gateway. Funds never sit in concessionaire or municipal accounts.
* **Automated Disbursement:** CROIP applies national revenue split rules and orchestrates daily settlement instructions with the partner banking institution.
* **Unified Citizen Experience:** A single national Ratepayer application (Flutter: iOS, Android & Web) + USSD channel allowing citizens to manage properties across multiple District Assemblies with one account.

---

## 2. Monorepo Architecture

The repository is organized into isolated, independently deployable **apps** and shared internal **packages**:

```
Central-Platform/
├── apps/
│   ├── api/              # Core API Gateway (Hono/OpenAPI 3.1, OAuth2 client ingress)
│   ├── admin/            # Government Oversight & Admin Portal (Next.js 15, shadcn/ui)
│   ├── worker/           # Background Processing Worker (pg-boss: webhooks, disbursements, SMS)
│   └── ratepayer_app/    # Unified Citizen Mobile & Web App (Flutter)
│
├── packages/
│   ├── contracts/        # Canonical Zod schemas, OpenAPI contract, and shared domain events
│   ├── db/               # PostgreSQL client (Kysely/Prisma), query helpers, and typed models
│   ├── ui/               # Shared shadcn/Tailwind design tokens and primitives
│   └── tsconfig/         # Unified, strict TypeScript configurations across the workspace
│
├── database/
│   └── migrations/       # Versioned PostgreSQL SQL migrations (Source of truth)
│
├── docs/                 # Architecture Decision Records (ADRs) and integration specifications
└── .github/              # Issue templates, PR templates, and CI/CD pipelines
```

---

## 3. Team Collaboration & Git Workflow

With two developers collaborating on the codebase, we adhere to a structured, professional Git workflow to prevent merge conflicts and maintain high code quality.

### 3.1 Branching Strategy
* **`main`** is protected. Direct commits to `main` are prohibited.
* All development occurs on short-lived branches cut from `main`.
* Branch naming conventions:
  * `feat/<issue-number>-<short-description>`: New features (e.g., `feat/12-user-auth-endpoints`)
  * `fix/<issue-number>-<short-description>`: Bug fixes (e.g., `fix/19-rate-card-rounding`)
  * `refactor/<issue-number>-<short-description>`: Code restructuring without behavior changes
  * `docs/<issue-number>-<short-description>`: Documentation and ADR updates

### 3.2 Issue-Driven Development
* Every piece of work must have an associated **GitHub Issue** with the appropriate labels (`area:*`, `type:*`, `priority:*`).
* Pull requests must reference their issue in the description using GitHub keywords (e.g., `Closes #12`).

### 3.3 Pull Request & Code Review Rules
1. **Branch up-to-date:** Rebase on the latest `main` prior to requesting review.
2. **Typecheck & Tests:** Verify `pnpm typecheck` and local unit tests pass.
3. **Peer Review:** Every PR requires **at least 1 review and approval** from the pair developer before merging.
4. **Merge Strategy:** Use **Squash and Merge** with Conventional Commit messages (`feat(api): add OAuth2 client authentication`).

---

## 4. Getting Started

### Prerequisites
* **Node.js**: v22+ LTS (Recommended: v24)
* **pnpm**: v10+ (`npm install -g pnpm`)
* **PostgreSQL**: PostgreSQL 15+ (Local instance or Supabase CLI)
* **Flutter SDK**: v3.24+ (for `apps/ratepayer_app`)
* **Docker Desktop**: For running local database, Redis/RabbitMQ, and mail-catcher

### Local Setup
```bash
# 1. Clone the repository
git clone https://github.com/Level10-Ghana/Central-Platform.git
cd Central-Platform

# 2. Install workspace dependencies
pnpm install

# 3. Verify TypeScript build across all packages
pnpm typecheck

# 4. Apply Database Migrations (to local Postgres)
# Example using psql or Supabase:
# psql -h localhost -U postgres -d croip -f database/migrations/20261012000001_croip_iam_init.sql
```

### Available Workspace Scripts
* `pnpm dev`: Start all apps concurrently in watch mode.
* `pnpm build`: Run cached production builds for all applications.
* `pnpm lint`: Run ESLint across all apps and packages.
* `pnpm typecheck`: Run `tsc --noEmit` across all workspace projects.
* `pnpm --filter <app-name> <script>`: Run a command inside a specific app (e.g. `pnpm --filter api dev`).

---

## 5. Security & Data Protection
* **Regulatory Compliance:** Built in accordance with Ghana Data Protection Act, 2012 (Act 843).
* **Immutability:** Audit trails and financial transaction ledgers are append-only. Triggers block any update/delete operations.
* **Separation of Duties:** Maker-checker signoffs enforced for policy updates, rate-card verifications, and disbursement transfers.
* **Secrets Management:** Credentials and integration API keys are never stored in git. Secrets are managed through encrypted vaults.

---
*Maintained by Level 10 Ghana Engineering Team.*
