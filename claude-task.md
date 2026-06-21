# Claude Code Prompt — Design Consistency Audit & Fix

# Repo: github.com/ganeshparajuli11/TheIELTS-Institute

# Paste everything below into Claude Code in the repo root.

---

You are a senior frontend architect and design-system engineer working on
"The IELTS Institute" — a Next.js App Router project for a Nepal-based UK
education consultancy.

## Context you must read first

1. Read `task.md` in the repo root. This was the original brief that built
   the current `src/` structure. Treat it as the source of truth for
   architecture decisions (content bank pattern, shared header/footer,
   compliance wording, etc.) — do not undo anything it already got right.
2. Read `html-files/DESIGN (1).md`. This is the Stitch-generated design
   system spec the visual style should follow: colors, type scale, spacing,
   shape language, component rules. Pay close attention to:
   - Shape language: "Soft (0.25rem)" rounding is the brand standard.
     Sharp (0px) corners are reserved ONLY for high-level decorative
     elements like section dividers or background image containers —
     NOT for cards or buttons.
   - Color tokens (Royal Purple `#4c0080` primary, Deep Indigo `#5654a8`
     secondary, etc.) — these must come from CSS variables / Tailwind
     theme tokens, never hardcoded hex values in component className props.
   - Typography: Montserrat for headings, Inter for body, label-caps
     pattern for small category labels.
   - Component rules section specifically: how buttons, cards, chips,
     and the "Journey Tracker" stepper should look.
3. Read all 5 files in `html-files/` (`code-1.html` through `code-5.html`).
   These are the original Stitch HTML exports — each one independently
   hand-rolled its own nav/footer/buttons, which is WHY they're
   inconsistent with each other. Do not copy their structure or their
   per-page Tailwind config blocks. Instead, extract from them:
   - The exact button shapes/padding/states used for primary CTAs,
     secondary CTAs, and small action links (e.g. `code-1.html`'s hero
     buttons, `code-5.html`'s date/time picker buttons, `code-4.html`'s
     form submit button).
   - The exact card patterns used for service cards, story cards,
     and university cards (border treatment, shadow, padding, image
     ratio, rounding).
   - The "Journey Tracker" stepper component pattern (`code-1.html` and
     `code-2.html` both implement it differently — reconcile into one).
   - The academic-grid background pattern.
   - Chip/badge styling (e.g. "RUSSELL GROUP" badge, "8.5 BAND" badge,
     "Most Popular" ribbon in `code-5.html`).
     These HTML files are READ-ONLY references for visual patterns. Do not
     modify them. Do not generate new files in `html-files/`.

## The actual problem (confirmed by direct repo inspection)

The content and information architecture in `src/` is good — page copy,
the content-bank pattern (`src/config/`, `src/data/`), and compliance
wording are already correct and should NOT be rewritten. The problem is
purely **visual/style inconsistency at the component level**, where
individual components independently re-implement buttons, cards, and
colors instead of using the shared design system tokens and the shared
`Button`/`Card` primitives. Concrete confirmed examples to fix:

1. **Three different CTA button implementations that should be one:**
   - `src/components/shared/page-hero.tsx` — correctly uses
     `buttonVariants({ size: "lg" })` from `@/components/ui/button`. This
     is the reference pattern.
   - `src/components/layout/site-header.tsx` (line ~43) — hand-rolled
     `rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white` with
     a **hardcoded hex** `hover:bg-[#6a0dad]` instead of a token.
   - `src/components/shared/cta-section.tsx` — hand-rolled
     `rounded-lg bg-white px-10 py-5 text-xl font-bold text-primary` with
     a **hardcoded hex** `hover:bg-[#f1daff]` instead of a token.
     Fix: every CTA button in the app must render through `buttonVariants`
     (or the `<Button>` component) from `src/components/ui/button.tsx`. If
     the existing `buttonVariants` sizes (`default`, `sm`, `lg`, etc.) don't
     cover the large hero/CTA-section button size used in the Stitch design,
     ADD a new size variant (e.g. `xl`) to `buttonVariants` rather than
     hand-rolling classes again. No component should contain a raw hex
     color in a `className` string — if a color isn't available as a
     Tailwind/CSS-variable token, add it to `globals.css` `:root` first.

2. **Card shape contradicts the documented design system:**
   - `src/components/cards/service-card.tsx` overrides the base
     `Card` component's `rounded-xl` with `rounded-none`, and uses a
     hardcoded hex `bg-[#dee8ff]` for the icon circle background.
   - `DESIGN (1).md` explicitly says sharp/0px corners are for
     decorative dividers only, NOT cards. The base `Card` component's
     default rounding is correct; `ServiceCard` should not override it.
   - Audit `university-card.tsx` and `success-story-card.tsx` for the
     same kind of override and reconcile all three cards to one shared
     visual pattern (same border treatment, same rounding, same shadow
     behavior on hover, same image aspect ratio where applicable).

3. **Verify and reconcile across every page**, not just the components
   above. Inconsistency may exist anywhere a page builds its own section
   instead of using a shared component. Check every file in:
   - `src/app/(marketing)/page.tsx`
   - `src/app/(marketing)/about/page.tsx`
   - `src/app/(marketing)/study-in-uk/page.tsx`
   - `src/app/(marketing)/universities/page.tsx`
   - `src/app/(marketing)/services/page.tsx`
   - `src/app/(marketing)/success-stories/page.tsx`
   - `src/app/(marketing)/blog/page.tsx`
   - `src/app/(marketing)/contact/page.tsx`
   - `src/app/(marketing)/counselling/page.tsx`
     For each one, check:
   - Does every button on the page route through `buttonVariants`?
   - Does every card route through the shared `Card` component (or a
     card component in `src/components/cards/`) with no one-off
     rounding/color/shadow overrides?
   - Are section backgrounds alternating white / soft lavender / deep
     purple per the design system, and is that alternation implemented
     via the same Tailwind/CSS-variable tokens everywhere (no raw hex)?
   - Is the academic-grid background pattern (defined as a Tailwind
     `@utility` in `globals.css`) used consistently wherever the Stitch
     reference shows it, instead of being re-implemented inline?
   - Does the page use `SectionHeading`, `PageHero`, and `CtaSection`
     consistently rather than hand-building equivalent markup?

4. **`src/app/(marketing)/about/page.tsx` is a placeholder stub** (33
   lines: hero + one empty `SectionHeading` + CTA, no real content
   sections). This was not in the original `task.md` page list. Either:
   - Build it out properly with real sections (team/mission/why-us,
     following the same content-bank pattern as other pages — add a
     `src/data/about-content.ts` or extend `src/data/page-content.ts` if
     one already exists, do not hardcode prose directly in the page), OR
   - If it's intentionally not a priority right now, leave a clear
     `// TODO` comment explaining it's a stub and why, and confirm with
     a clear final summary that this was a deliberate choice, not a
     missed page.
     Default to option 1 unless you find evidence the page is meant to be
     deprioritized.

5. **Stepper / "Journey Tracker" component**: `code-1.html` and
   `code-2.html` each implement the 4-step "Consultation → IELTS →
   Application → Visa" tracker differently (numbered circles with
   connecting line vs. numbered circles with vertical timeline). Check
   `src/data/process.ts` and `src/components/sections/process-section.tsx`
   — confirm there is exactly ONE stepper implementation used everywhere
   this pattern appears (home page process section, study-in-uk page,
   counselling page "what happens next" sidebar), built from
   `process.ts` data, not hardcoded per page.

## Constraints (do not violate these)

- Do NOT change the content-bank architecture. Page copy must keep coming
  from `src/config/` and `src/data/` files — this is intentional because
  an admin panel will edit these files later, and a single edit there
  must propagate everywhere the data is used. If you find a page with
  hardcoded prose that should be in the content bank, move it into the
  appropriate `src/data/*.ts` or `src/config/*.ts` file as part of this
  fix, rather than leaving it inline.
- Do NOT reintroduce Material Symbols, CDN Tailwind, Google Fonts via
  `<link>` tags, or any of the other items explicitly disallowed in
  `task.md`. Use Lucide React icons and the existing `next/font` setup.
- Do NOT touch `html-files/` — read-only reference only.
- Do NOT remove or weaken the compliance-safe wording already in
  `src/config/site.ts` and `src/data/stats.ts` (no unverified visa
  success percentages, no guaranteed-visa language).
- Do NOT change route structure, page purposes, or section order
  described in `task.md`'s "Page strategy" section unless you find an
  actual conflict with this fix.
- Keep all color/spacing/radius changes token-based (CSS variables in
  `globals.css` or Tailwind theme), never inline hex/px one-offs.
- Run `pnpm lint` (or the project's configured lint command) and fix any
  errors introduced before finishing.

## Process

1. Inventory every button, card, badge/chip, and stepper instance across
   `src/components/` and every page in `src/app/(marketing)/`. Build a
   short table (in your own working notes, not necessarily a committed
   file) of: location → current implementation → which shared
   component/token it should use instead.
2. Fix the shared primitives first (`button.tsx`, `card.tsx`, any
   missing CSS variables in `globals.css`) so they fully cover what the
   Stitch design needs (add an `xl` button size if needed, confirm card
   rounding/border/shadow tokens match `DESIGN (1).md`).
3. Update each component/page identified in step 1 to use the shared
   primitives instead of one-off styling. Do this file by file, not as
   one giant diff, so changes are easy to review.
4. Fix or properly build out `about/page.tsx` per point 4 above.
5. Reconcile the stepper/Journey Tracker into one implementation per
   point 5 above.
6. Run lint and fix issues.
7. Give a final summary covering exactly:
   - Every file changed and why
   - Every hardcoded hex value that was replaced with a token, with
     before/after
   - Confirmation that no page content/copy was changed, only styling
   - What was done with `about/page.tsx`
   - Any remaining inconsistency you found but didn't fix, with a reason
     (e.g. needs a content/business decision from the owner)

Do not commit/push until you've shown me the diff summary and I've
confirmed it's correct.
