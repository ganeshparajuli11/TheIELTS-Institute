# Validation Workflow

Scripts and checks for The IELTS Institute. Run locally before every push; CI runs the same checks automatically on every PR to `main`.

---

## Quick Reference

| Script                  | What it does                                                                         | Safe to auto-fix?         |
| ----------------------- | ------------------------------------------------------------------------------------ | ------------------------- |
| `pnpm format`           | Prettier writes all files                                                            | Yes                       |
| `pnpm format:check`     | Prettier checks without writing                                                      | Check only                |
| `pnpm lint`             | ESLint reports issues                                                                | Check only                |
| `pnpm lint:fix`         | ESLint auto-fixes safe rules                                                         | Yes (formatting, imports) |
| `pnpm typecheck`        | `tsc --noEmit` — TS compile check                                                    | Manual only               |
| `pnpm prisma:validate`  | Schema syntax validation                                                             | Check only                |
| `pnpm prisma:generate`  | Generates Prisma TypeScript client                                                   | Side-effect (safe)        |
| `pnpm security:secrets` | Custom security scan                                                                 | Manual only               |
| `pnpm security:audit`   | `pnpm audit --audit-level=high`                                                      | Manual only               |
| `pnpm validate:fix`     | format → lint:fix → typecheck → build                                                | Safe fixes only           |
| `pnpm validate`         | format:check → lint → typecheck → prisma:validate → security:secrets → audit → build | Check only                |

---

## Day-to-Day Workflow

### Before committing

```bash
pnpm validate:fix   # auto-formats, auto-fixes lint, typechecks, builds
git diff            # review what changed
```

### Before pushing / opening a PR

```bash
pnpm validate       # full read-only check — must pass clean
```

### Fresh checkout or after pulling

```bash
pnpm prisma:generate   # generate Prisma client before typecheck/build
pnpm validate
```

---

## Scripts in Detail

### `pnpm format` / `pnpm format:check`

Runs [Prettier](https://prettier.io/) with `prettier.config.mjs`:

- **Plugin**: `prettier-plugin-tailwindcss` sorts Tailwind class names in the canonical order
- **Settings**: 100-char print width, double quotes, semicolons, trailing commas, 2-space indent
- **Ignores**: `.next/`, `node_modules/`, `src/generated/`, `src/content/`, `pnpm-lock.yaml`, `public/`

`src/content/*.json` files are **excluded** — they are written by the admin panel via `fs.writeFileSync` and must not be reformatted by Prettier.

**Auto-fixes**: spacing, trailing commas, quote style, Tailwind class order  
**Does NOT fix**: logic, types, imports that are semantically wrong

### `pnpm lint` / `pnpm lint:fix`

Runs ESLint with the flat config in `eslint.config.mjs` (ESLint 9, `eslint-config-next`).

**Auto-fixable rules** (safe with `lint:fix`):

- Unused import removal
- `const` over `let` where variable is never reassigned
- Consistent arrow function bodies
- Simple import ordering

**Manual-only** (lint reports, you fix):

- `react-hooks/exhaustive-deps` — adding a dep may change behaviour
- `@typescript-eslint/no-explicit-any` — casting properly requires understanding the type
- Accessibility warnings — need domain knowledge to fix correctly

### `pnpm typecheck`

Runs `tsc --noEmit` using `tsconfig.json` (strict mode enabled).

TypeScript errors **must be fixed manually** — the compiler cannot auto-fix type errors. Common issues:

- Missing type annotations on function parameters
- `undefined` not handled in optional chaining
- Incorrect generic type arguments

### `pnpm prisma:validate`

Runs `prisma validate` — checks `prisma/schema.prisma` for syntax errors and internal consistency. Does **not** connect to the database. Safe to run in CI without `DATABASE_URL`.

### `pnpm prisma:generate`

Runs `prisma generate` — regenerates the TypeScript client in `src/generated/prisma/`. Must be run after:

- Pulling schema changes from git
- Modifying `prisma/schema.prisma`
- A fresh `pnpm install`

Generated files are in `.gitignore` and never committed.

### `pnpm security:secrets`

Runs `scripts/security-check.mjs` — a lightweight Node.js script that checks:

1. **Env files not committed to git** — `git ls-files .env*`
2. **`.gitignore` covers `.env*`** — pattern check
3. **`NEXT_PUBLIC_` vars don't look like secrets** — scans env files for public variables with names like `SECRET`, `KEY`, `TOKEN`, `PASSWORD`
4. **No `localStorage` auth token patterns** — flags `localStorage.setItem/getItem` calls that reference `token`, `auth`, `session` (should use HttpOnly cookies)
5. **API routes import rate limiting** — warns if a route doesn't use `checkRateLimit`
6. **API routes don't leak error details** — checks for `err.stack` or `err.message` in JSON responses
7. **Security headers configured** — verifies `next.config.ts` has `securityHeaders`
8. **Admin routes have auth guard** — checks middleware or admin layout for auth markers

Exit code 1 on hard failures (committed env files, exposed secrets, localStorage auth).  
Exit code 0 with warnings on softer issues (missing rate limit on new route, auth TODO).

### `pnpm security:audit`

Runs `pnpm audit --audit-level=high` — checks installed packages against the npm advisory database. Fails on high or critical severity vulnerabilities only.

**What to do when it fails**:

1. Run `pnpm audit` (no flag) to see all levels with detail
2. Run `pnpm audit --fix` only if you understand the breaking-change risk
3. If the vulnerability is in a sub-dependency you can't upgrade, create a `pnpm.overrides` entry in `package.json` after verifying the upgrade doesn't break anything
4. Document any known accepted risk in `docs/SECURITY_CHECKLIST.md`

### `pnpm validate:fix`

Runs in order:

1. `pnpm prisma:generate` — ensures generated client is up to date
2. `pnpm format` — Prettier formats all source files
3. `pnpm lint:fix` — ESLint auto-fixes
4. `pnpm typecheck` — TypeScript compile check (no auto-fix)
5. `pnpm build` — full Next.js production build

If `typecheck` or `build` fail, fix manually then re-run `pnpm validate:fix`.

### `pnpm validate`

Runs in order (read-only — no file changes):

1. `pnpm format:check` — Prettier check
2. `pnpm lint` — ESLint check
3. `pnpm typecheck` — TypeScript check
4. `pnpm prisma:validate` — Schema check
5. `pnpm security:secrets` — Security self-scan
6. `pnpm security:audit` — Dependency audit (high/critical)
7. `pnpm build` — Production build

All steps must pass for the pipeline to succeed. CI runs the equivalent sequence.

---

## What Is and Is NOT Auto-Fixed

### Safe to auto-fix (`validate:fix` does this)

- Code formatting (spacing, line breaks, trailing commas, quotes)
- Tailwind class order sorting
- ESLint auto-fixable rules (unused imports, `const` vs `let`)
- Prisma client regeneration

### Must be fixed manually (never auto-fixed)

| Category                                    | Why                                           |
| ------------------------------------------- | --------------------------------------------- |
| Security logic (auth, RBAC, rate limiting)  | Auto-fix could accidentally weaken protection |
| Database schema / migrations                | Destructive changes require manual review     |
| Business logic (forms, validation, pricing) | Logic bugs must be understood before fixing   |
| API permissions and access control          | Requires intent verification                  |
| Type errors with `any` casting              | Casting masks bugs rather than fixing them    |
| React hook dependency arrays                | Adding wrong deps causes infinite loops       |
| User data and content files                 | `src/content/*.json` is user-managed data     |

---

## CI Pipeline

GitHub Actions runs on every push to `main` and every PR targeting `main`.

Steps: install → prisma:generate → format:check → lint → typecheck → prisma:validate → security:secrets → build → audit (non-blocking)

The dependency audit is `continue-on-error: true` in CI so moderate vulnerabilities don't block merges — but they are still reported in the Actions log.

See `.github/workflows/validate.yml` for the full workflow.

---

## Adding New npm Scripts

When adding a new npm script, update this document and add it to the quick-reference table above. Follow the convention:

- `category:action` — for sub-commands (`prisma:generate`, `security:audit`)
- plain verb — for top-level operations (`format`, `validate`, `build`)
