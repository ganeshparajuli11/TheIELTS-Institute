# Security Checklist

Pre-production security checklist for The IELTS Institute. Review every item before going live. Items marked **[TODO]** require implementation before the site handles real user data.

---

## Environment Variables

- [ ] `.env*` files are in `.gitignore` — verified via `pnpm security:secrets`
- [ ] No `.env` file committed to git — `git ls-files .env` returns empty
- [ ] `DATABASE_URL` uses a strong password, not a dev default
- [ ] No `NEXT_PUBLIC_` variable exposes a secret key or token
- [ ] Production env file is stored in a secrets manager (Vercel Environment Variables, GitHub Secrets, Doppler), not in the repo
- [ ] Separate `DATABASE_URL` for development vs production — never share credentials across environments

---

## Authentication and RBAC **[TODO — Phase 2]**

The admin panel (`/admin/*`) is currently **unprotected** — anyone who knows the URL can access it. This is acceptable during development but must be resolved before any real data is managed.

- [ ] **[TODO]** Implement session-based auth (NextAuth.js, Lucia, or custom) with HttpOnly + Secure + SameSite=Strict cookies
- [ ] **[TODO]** Protect `/admin` via `src/middleware.ts` — redirect unauthenticated users to `/login`
- [ ] **[TODO]** Admin users stored in database with Argon2id-hashed passwords (never plain text or MD5/bcrypt-weak)
- [ ] **[TODO]** Role check in every server action (`src/app/actions/content.ts`) — the TODO comment is already in place
- [ ] **[TODO]** Session timeout — invalidate sessions after 8 hours of inactivity
- [ ] **[TODO]** Login attempt rate limiting — max 5 failed attempts per IP per 15 minutes before lockout
- [ ] **[TODO]** Audit log every admin mutation (AuditLog model exists in Prisma schema — wire it up)
- [ ] Do NOT use `localStorage` for session tokens — verified clean by `pnpm security:secrets`
- [ ] Do NOT expose user passwords or session tokens in API responses

---

## Rate Limiting

Current implementation: in-memory rate limiter in `src/lib/rate-limit.ts`.

- [x] `/api/contact` — rate limited per IP
- [x] `/api/counselling` — rate limited per IP
- [ ] **[TODO for production]** Replace in-memory store with Redis (Upstash or similar) — in-memory limits reset on server restart and don't work across multiple instances
- [ ] **[TODO]** Add rate limiting to any future API routes — every `route.ts` should call `checkRateLimit` before processing

---

## Input Validation

- [x] Contact form validated with Zod schema (`src/lib/validators/contact.ts`)
- [x] Counselling form validated with Zod schema
- [x] Admin forms validated with Zod + react-hook-form before calling server actions
- [ ] **[TODO]** Validate all server action inputs server-side — don't trust the form schema alone; always re-validate in the action
- [ ] Ensure `zod` `safeParse` is used (not `parse`) everywhere — errors are returned, not thrown

---

## Admin Route Protection

- [x] Security headers on all routes (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- [ ] **[TODO]** Middleware-level auth check in `src/middleware.ts` matching `/admin/:path*`
- [ ] **[TODO]** Server action auth guard — every function in `src/app/actions/content.ts` must verify the caller is an authenticated admin before writing to `src/content/*.json`
- [ ] Admin panel must not be indexed — add `robots: { index: false }` to the admin layout metadata
- [ ] Admin panel should ideally be restricted by IP (Vercel deployment protection, Cloudflare Access, or VPN) in addition to password auth

---

## API Route Security

- [x] `server-only` import in all server modules (`src/lib/db.ts`, `src/lib/content-store.ts`, API routes)
- [x] Generic error responses — `serverError()` helper never exposes `err.stack` or `err.message` to clients
- [x] Rate limiting on all current public API routes
- [x] Request body size is implicitly limited by Next.js (default 4 MB)
- [ ] **[TODO]** If file upload is added later: validate MIME type server-side, scan for malware, store outside `public/`, enforce size limits

---

## Database Safety

Current: PostgreSQL via Prisma + `@prisma/adapter-pg`.

- [x] All DB queries use Prisma ORM — no raw string interpolation in SQL
- [x] `AuditLog` model in schema for tracking mutations
- [ ] **[TODO]** Connection string must use SSL in production — `?sslmode=require` in `DATABASE_URL`
- [ ] **[TODO]** Database user should have minimum permissions — no superuser for the app connection
- [ ] **[TODO]** Enable automatic backups on the database host
- [ ] Never call `prisma migrate deploy` in CI against the production database without a manual approval gate

---

## Content Store (JSON Files)

The admin panel writes to `src/content/*.json` via `fs.writeFileSync`. This is the current data layer.

- [x] Files are read-only from the frontend — only server actions can write
- [x] `content-store.ts` imports `server-only` — cannot be imported by client components
- [ ] **[TODO]** Server action auth guard must be in place before these files contain real business data
- [ ] Content directory should not be directly accessible via the web — verify no Next.js static file serving is pointed at `src/content/`
- [ ] Consider migrating to PostgreSQL (Prisma) as the content grows — JSON files on disk aren't safe for multi-instance deployments

---

## Security Headers

All implemented in `next.config.ts`:

- [x] `Content-Security-Policy` — restricts script, style, image, font, connect sources
- [x] `Strict-Transport-Security` — max-age 2 years, includeSubDomains, preload
- [x] `X-Frame-Options: SAMEORIGIN` — prevents clickjacking
- [x] `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Permissions-Policy` — camera, microphone, geolocation all denied

Review after any new third-party script or embed is added — CSP `script-src` may need updating.

---

## Dependency Security

- [ ] Run `pnpm security:audit` before each release — zero high/critical advisories
- [ ] Review `pnpm audit` (all levels) monthly
- [ ] Keep Next.js, Prisma, and Zod on the latest patch release — these handle user data
- [ ] Do not add packages with `postinstall` scripts unless you have reviewed the script
- [ ] Use `pnpm` lockfile pinning — `pnpm install --frozen-lockfile` in CI (already configured)

---

## Secret Scanning

`pnpm security:secrets` checks for:

- Committed env files
- `NEXT_PUBLIC_*` secret-like variables
- `localStorage` auth token patterns
- API routes leaking `err.stack` / `err.message`
- Missing security headers
- Missing rate limiting on new routes
- Admin layout without auth guard

Add any additional patterns to `scripts/security-check.mjs` as the codebase grows.

---

## Pre-Production Sign-Off

Before handling real student or payment data, the following must be complete:

1. Admin auth implemented and tested (login, logout, session expiry)
2. Server actions verify admin session before every write
3. Rate limiting on Redis (not in-memory)
4. Database user has minimum permissions
5. Database SSL enabled
6. `pnpm validate` passes clean
7. `pnpm security:audit` passes with zero high/critical advisories
8. CSP reviewed after any new third-party integrations
9. Admin panel not publicly indexed
10. Env vars stored in Vercel or equivalent secrets manager
