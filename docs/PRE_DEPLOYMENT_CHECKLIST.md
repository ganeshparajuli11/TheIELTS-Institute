# Pre-Deployment Checklist

Run through this checklist before every production deployment of The IELTS Institute.

---

## 1. Validation Pipeline

- [ ] `pnpm validate` passes with zero errors
- [ ] `pnpm security:audit` passes (zero high/critical advisories)
- [ ] CI pipeline is green on the branch being deployed

```bash
pnpm validate
pnpm security:audit
```

---

## 2. Environment Variables

- [ ] All required env vars are set in the deployment environment (Vercel, etc.)
- [ ] `DATABASE_URL` points to the **production** database, not dev
- [ ] `DATABASE_URL` includes `?sslmode=require`
- [ ] No `.env*` file is committed to the repository (`git ls-files .env` returns empty)
- [ ] No `NEXT_PUBLIC_` variable exposes a secret key or token

Required variables for production:

```
DATABASE_URL=postgresql://...?sslmode=require
# Add auth secret here once Phase 2 auth is implemented
# NEXTAUTH_SECRET=...
# NEXTAUTH_URL=https://yourdomain.com
```

---

## 3. Database

- [ ] `prisma migrate deploy` has been run against the production database
- [ ] `prisma validate` passes on the current schema
- [ ] Prisma client has been generated (`pnpm prisma:generate`)
- [ ] Database backups are enabled on the hosting provider
- [ ] Production DB user has minimum necessary permissions (not superuser)

---

## 4. Build

- [ ] `pnpm build` completes without errors locally
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] No ESLint errors (`pnpm lint`)
- [ ] Bundle size is reasonable — review the build output for unexpectedly large chunks

---

## 5. Forms and User-Facing Features

Test each user-facing form manually in staging before production:

- [ ] **Contact form** (`/contact`) — submits, shows success, rate limit triggers after 5 requests
- [ ] **Counselling form** (`/counselling`) — all fields validate, submits to database
- [ ] **Form validation errors** — displayed inline, not as alerts
- [ ] **Rate limit error** — 429 response shows friendly message, not a server error

---

## 6. Admin Panel **[Verify before any real data is managed]**

- [ ] **[TODO]** Admin login is required to access `/admin/*` (not yet implemented — Phase 2)
- [ ] Admin panel is not indexed by search engines
- [ ] Content changes in admin reflect on the frontend after page reload (via `revalidatePath`)
- [ ] All four content managers work: Universities, Success Stories, FAQs, Blog Posts
- [ ] Site settings form saves and reflects on the site
- [ ] Logo (`/logo.jpg`) displays correctly in sidebar and mobile nav

---

## 7. Metadata and SEO

- [ ] Page `<title>` tags are set for all public routes
- [ ] `<meta name="description">` is meaningful for each page
- [ ] `robots.txt` is not blocking important pages
- [ ] Open Graph tags are present (at minimum for the home page)
- [ ] Admin panel has `robots: { index: false }` metadata

---

## 8. Security Headers

Verify headers are present on the live URL using [securityheaders.com](https://securityheaders.com):

- [ ] `Content-Security-Policy` is set
- [ ] `Strict-Transport-Security` is set (HTTPS only)
- [ ] `X-Frame-Options: SAMEORIGIN` is set
- [ ] `X-Content-Type-Options: nosniff` is set
- [ ] `Referrer-Policy` is set
- [ ] `Permissions-Policy` is set

---

## 9. Performance Basics

- [ ] Images use `next/image` with `width`, `height`, and `alt` attributes
- [ ] No large unoptimized images in `public/` (keep images < 500 KB each)
- [ ] Core Web Vitals are acceptable — run Lighthouse in Chrome DevTools

---

## 10. Monitoring and Backups

- [ ] Error monitoring is configured (Sentry, Vercel Analytics, or equivalent)
- [ ] Uptime monitoring is in place
- [ ] Database backup schedule is confirmed
- [ ] Deployment rollback procedure is documented (Vercel instant rollback available)

---

## 11. Domain and DNS

- [ ] Custom domain is pointed to the deployment
- [ ] SSL certificate is valid and auto-renewing
- [ ] `www` redirect is configured (either `www → apex` or `apex → www`, pick one)
- [ ] Old URLs redirect correctly if domain or path structure changed

---

## 12. Legal and Compliance

- [ ] Privacy policy page exists and is linked in the footer
- [ ] Cookie consent banner is in place if any tracking cookies are used
- [ ] Legal note on counselling disclaimer is present on relevant pages
- [ ] Contact details (address, phone, email) are accurate

---

## Post-Deployment Verification

After every deployment, verify:

1. Home page loads correctly
2. Navigation links work
3. Contact form submits successfully (test with a real submission)
4. Admin panel is accessible (after auth is implemented: with credentials)
5. No JavaScript errors in browser console
6. Mobile layout renders correctly

---

## Rollback Procedure

If a deployment causes issues:

1. **Vercel**: Go to Deployments → click the previous successful deployment → "Promote to Production"
2. **Database**: If a migration was run, roll it back with `prisma migrate resolve` — do not run this without reviewing the migration first
3. **Content files**: `src/content/*.json` changes are not reversed by rollback — restore from git if needed: `git checkout HEAD -- src/content/`
