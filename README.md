# Paritya

OpenAPI-first **DDD** monorepo for Paritya — supervisory readiness and fairness governance for inclusive-finance AI in LMICs.

Product specs: [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  →  generated clients + product UI
```

Package scope: **`@paritya/*`**

## Quick start

```bash
# If .codegen is missing (it is never committed):
rsync -a --delete \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  .codegen/
# Ensure package_scope is @paritya in .codegen/*.json, then:
pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: paritya_demo_local_dev_key
```

Webapp:

```bash
pnpm --filter @paritya/webapp dev
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=paritya-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## `.codegen` (local only — never commit)

`.codegen/` is **gitignored**. Do not add, commit, or push it. Sync from the scaffold when missing (command above). See `.cursor/rules/codegen-never-commit.mdc`.

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.

## Domains

| Domain | OpenAPI |
|--------|---------|
| identity | `packages/openapi-core/src/identity.yaml` |
| usecases | `packages/openapi-core/src/usecases.yaml` |
| dossiers | `packages/openapi-core/src/dossiers.yaml` |
| gates | `packages/openapi-core/src/gates.yaml` |
| appeals | `packages/openapi-core/src/appeals.yaml` |
| monitoring | `packages/openapi-core/src/monitoring.yaml` |
| cases | `packages/openapi-core/src/cases.yaml` |
| playbooks | `packages/openapi-core/src/playbooks.yaml` |
| evidence | `packages/openapi-core/src/evidence.yaml` |

v0.1 skeleton retained at `docs/openapi-v0.1-skeleton.yaml`.
