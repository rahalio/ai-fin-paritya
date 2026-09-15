---
name: codegen-never-commit
description: Reminds agents that .codegen is local-only and must never be committed or pushed to GitHub. Use when cloning, committing, pushing, or syncing zero-codegen.
---

# Codegen never commit

`.codegen/` holds the Python `zero-codegen` tool and runtime config for this monorepo. It is **gitignored** and must **never** be committed or pushed.

## Sync when missing

```bash
rsync -a --delete \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  .codegen/
# Re-apply product scope after sync:
# package_scope / imports → @paritya
pnpm codegen:paths
```

## Related

- Rule: `.cursor/rules/codegen-never-commit.mdc`
- Skills: `ddd-codegen`, `ddd-platform`
