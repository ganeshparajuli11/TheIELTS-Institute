You are a senior frontend architect, senior UI/UX designer, SEO strategist, and design-system engineer.

The Next.js frontend project setup is already ready. Your task is now to design and organize the frontend properly for “The IELTS Institute”, a Nepal-based UK education consultancy.

This task is frontend design + frontend content architecture only.

Do not build backend.
Do not build database.
Do not build authentication logic.
Do not build API routes.
Do not build Prisma.
Do not build real CMS yet.
Do not install unnecessary packages.
Use only the packages already installed in the project unless something is absolutely required.

Project:
The IELTS Institute

Business:
A Nepal-based education consultancy helping students apply to study in the United Kingdom only.

Main services:

- UK study counselling
- UK university selection
- UK university application support
- SOP and documentation guidance
- Student visa application guidance
- IELTS preparation guidance
- Pre-departure guidance
- Success story publishing

Important:
Do not mention or promote other countries.
This website is focused on UK study applications from Nepal only.

Design reference:
I have a Stitch-generated design that I like. Follow its visual direction, but do not copy its messy structure.

What I liked from the design:

- Royal purple academic brand system
- Premium institutional feel
- Montserrat headings and Inter body typography
- Clean white and soft lavender background
- Academic grid patterns
- UK landmark / university inspired visual feeling
- Editorial spacing
- Clean cards with thin borders
- Premium consultancy feel
- Strong CTA style
- Professional trust-building layout

What I do not like and must be fixed:

- Navbar is inconsistent between pages
- Footer is inconsistent between pages
- Page structure is inconsistent
- Same content is repeated randomly on multiple pages
- University content appears on Home, Study in UK, and Universities page without proper purpose
- Content is hardcoded inside pages
- Design sections do not follow one reusable system
- Some pages feel like separate templates instead of one website
- Some claims like “98% visa success rate” can be risky if not verified
- Some old generated HTML uses Material Symbols and CDN style, but this project should use our installed React components and icons

Use the current project stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Motion for React
- Lucide React icons
- React Hook Form
- Zod
- next/font
- Next/Image
- Sonner if needed for frontend-only form feedback

Do not use:

- Material Symbols
- CDN Tailwind
- Google Fonts via link tag
- Inline tailwind config inside components
- Random icon libraries
- Heavy animation libraries
- Lottie
- Three.js
- Canvas particles
- Video backgrounds
- Hardcoded repeated page content

Main goal:
Create a consistent, premium, SEO-friendly frontend design system and page structure where all reusable content comes from a shared content bank.

Content bank requirement:
Create centralized frontend content files so the same information can be used across pages and later replaced by admin/CMS data.

Create or update these content/config files:

src/config/site.ts

- business name
- short description
- full description
- location
- phone placeholder
- email placeholder
- address placeholder
- social links placeholder
- main CTA
- secondary CTA
- SEO default metadata
- brand tagline
- legal/compliance note

src/config/navigation.ts

- main public navigation
- footer navigation
- admin navigation placeholder
- CTA route
- active route structure

src/data/services.ts

- all service data
- service title
- slug
- short description
- full description
- icon name using Lucide icons
- CTA label
- SEO keywords

src/data/universities.ts

- placeholder UK university data
- name
- city
- region
- popular courses
- intake
- short description
- image placeholder
- featured flag
- slug

src/data/success-stories.ts

- placeholder success stories
- student name
- university
- course
- intake
- image placeholder
- quote
- status/published flag

src/data/faqs.ts

- shared FAQs
- page-specific FAQ groups:
  home
  studyInUk
  services
  counselling
  contact

src/data/process.ts

- UK study process steps
- step title
- description
- icon
- CTA if needed

src/data/testimonials.ts

- testimonial data if separate from success stories

src/data/stats.ts

- trust indicators
- important: use safe placeholder wording only
- do not use unverified visa success percentages
- use ethical alternatives like “student-focused guidance”, “UK-focused support”, “application preparation assistance”, “experienced counselling team”

Important content bank rule:
Pages should import data from these files instead of hardcoding repeated content.

Later when backend CMS is created, these files should be easy to replace with database/API data.

Page strategy:
Make every page have a unique purpose.

Home page:
Purpose: brand trust + lead conversion.
Sections:

1. Hero
2. Trust indicators
3. Why The IELTS Institute
4. Services preview
5. UK study journey process
6. Featured universities preview only
7. Success stories preview only
8. FAQ preview
9. Final counselling CTA

Study in UK page:
Purpose: SEO landing page for “Study in UK from Nepal”.
Sections:

1. SEO hero
2. Why study in the UK
3. Popular UK courses for Nepalese students
4. UK application process
5. Document preparation overview
6. Intake guidance
7. Visa guidance disclaimer
8. FAQ
9. Counselling CTA

Universities page:
Purpose: browse UK universities.
Sections:

1. Universities hero
2. Search/filter UI placeholder
3. University cards
4. Featured universities
5. How we help with university selection
6. CTA

Services page:
Purpose: explain all consultancy services.
Sections:

1. Services hero
2. Service grid
3. Detailed service sections
4. Process connection
5. FAQ
6. CTA

Success Stories page:
Purpose: trust-building and proof.
Sections:

1. Success stories hero
2. Featured story
3. Story grid
4. CTA
   Important: do not create fake unrealistic claims. Use placeholder stories clearly and professionally.

Blog page:
Purpose: SEO resources.
Sections:

1. Blog hero
2. Featured article placeholder
3. Blog card grid
4. Categories placeholder
5. CTA

Contact page:
Purpose: direct enquiry.
Sections:

1. Contact hero
2. Contact form
3. Contact details from site config
4. Office hours placeholder
5. Map placeholder
6. FAQ or CTA

Counselling page:
Purpose: lead capture form.
Sections:

1. Counselling hero
2. Counselling form
3. What happens after submission
4. Required documents overview
5. CTA / reassurance note

Login page:
Purpose: admin/staff login frontend only.
Create clean login UI only.
Do not implement actual authentication logic.
Add TODO comments for backend auth.

Admin pages:
Keep as frontend shell only.
Use consistent admin layout, placeholder dashboard cards, and placeholder tables.
Do not implement real CRUD yet.
Add TODO comments for future backend/CMS integration.

Global CSS and design system:
Update globals.css and design tokens properly.

Use the brand direction:

- Primary: Royal Purple
- Secondary: Deep Indigo
- Accent: Soft lavender / soft violet
- Background: white and soft lavender
- Text: near-black / slate
- Borders: low-contrast lavender/slate
- Cards: white with thin border and subtle shadow
- Section backgrounds: alternate white / soft lavender / deep purple
- Shape: slightly rounded, professional, not overly pill-shaped

Typography:
Use next/font.
Use a professional heading/body setup:

- Headings: Montserrat-style or suitable next/font equivalent if already configured
- Body: Inter-style or suitable next/font equivalent
- Use strong H1/H2 hierarchy
- Use label caps for small section labels
- Do not import fonts through external CSS links

Layout rules:

- Create one consistent container class
- Create one consistent section spacing system
- Create one consistent heading system
- Create one consistent card style
- Create one consistent button hierarchy
- Create one consistent navbar
- Create one consistent footer
- Use one mobile navigation pattern
- Use one active nav state pattern
- Use one CTA style across the website

Components to use/create:
src/components/layout/site-header.tsx
src/components/layout/site-footer.tsx
src/components/layout/mobile-nav.tsx
src/components/shared/logo.tsx
src/components/shared/section-heading.tsx
src/components/shared/page-hero.tsx
src/components/shared/cta-section.tsx
src/components/shared/empty-state.tsx
src/components/shared/status-badge.tsx
src/components/cards/service-card.tsx
src/components/cards/university-card.tsx
src/components/cards/success-story-card.tsx
src/components/sections/hero-section.tsx
src/components/sections/trust-section.tsx
src/components/sections/services-section.tsx
src/components/sections/process-section.tsx
src/components/sections/universities-section.tsx
src/components/sections/success-stories-section.tsx
src/components/sections/faq-section.tsx
src/components/forms/contact-form.tsx
src/components/forms/counselling-form.tsx
src/components/forms/login-form.tsx
src/components/motion/fade-in.tsx
src/components/motion/stagger-container.tsx
src/components/motion/animated-card.tsx

Use Lucide icons only.
Do not use Material Symbols.

Animation rules:
Use Motion, but keep it lightweight.
Use animation only for:

- hero entrance
- section reveal
- card hover
- FAQ open/close
- mobile menu
- CTA hover

Do not animate every small item aggressively.
Use opacity and transform only.
Keep duration around 180ms to 500ms.
Respect prefers-reduced-motion.
Avoid heavy scroll animations.

SEO requirements:
Every public page must have its own metadata.
Use Next.js metadata API.
Create reusable helper in src/lib/seo.ts if needed.

Each page should have:

- SEO title
- SEO description
- page-specific keywords
- OpenGraph metadata
- proper H1
- proper H2/H3 structure
- semantic sections
- internal links
- image alt text
- FAQ structure where relevant

Target SEO keywords:

- UK education consultancy in Nepal
- Study in UK from Nepal
- UK university application from Nepal
- UK student visa guidance Nepal
- IELTS preparation Nepal
- UK study counselling Nepal
- The IELTS Institute Nepal
- Free UK study counselling Nepal

Compliance rules:
Do not promise guaranteed visa approval.
Do not write “guaranteed visa”, “100% success”, or fake success rates.
Do not write misleading immigration claims.
Use safe wording:

- visa guidance
- document preparation support
- application assistance
- counselling
- study roadmap
- student support

Design improvement goal:
Use the Stitch design as inspiration, but rebuild it properly as a real Next.js design system.
The final website should feel like one premium brand, not multiple disconnected templates.

Important consistency rules:

- Same navbar on every public page
- Same footer on every public page
- Same active nav logic
- Same CTA text hierarchy
- Same design tokens
- Same card components
- Same spacing scale
- Same icons style
- Same typography scale
- Same content source
- Same page hero pattern
- Same SEO metadata pattern

Route structure:
Keep the existing route structure.
Do not create duplicate routes.
Do not create a separate “IELTS Prep” nav item unless we have a real IELTS page.
For now, recommended main nav:
Home
Study in UK
Universities
Services
Success Stories
Blog
Contact

Primary CTA:
Book Free Counselling

CTA route:
/counselling

Important navbar fix:
The navbar should not randomly change per page.
Create one SiteHeader component and use it from layout.
Use navigation data from src/config/navigation.ts.
Active states should be based on current pathname.
Mobile menu should use the same navigation data.

Important footer fix:
The footer should not be different per page.
Create one SiteFooter component using site config + navigation config.
Footer should include:

- logo/name
- short description
- services links
- quick links
- contact info
- legal links
- disclaimer
- copyright

Forms:
Use existing React Hook Form + Zod setup.
Forms are frontend only for now.
On submit, show a success toast.
Do not save data to backend yet.
Add TODO comments for future API integration.

Counselling form fields:

- full name
- phone number
- email
- current location
- preferred course
- highest qualification
- preferred intake
- IELTS/PTE status
- preferred UK university if any
- message
- consent checkbox

Contact form fields:

- full name
- email
- phone
- enquiry type
- message
- consent checkbox

Admin future-readiness:
Since later content will be updated through admin panel, create the frontend content structure in a way that maps easily to CMS models:

- Consultancy information
- Services
- Universities
- Success stories
- FAQs
- Blog posts
- Contact details
- SEO settings

Do not build admin CMS now, but add clear comments where later CMS/database data will replace static content.

Image strategy:
Use Next/Image.
Use placeholders where real images are missing.
Use images from public/images/placeholders if available.
If no image exists, use elegant gradient/brand-shape placeholders.
Do not use remote random Google image URLs.
Do not depend on external image URLs.
Do not use broken images.

Implementation order:

1. Review current project structure.
2. Review existing global CSS, layout, and components.
3. Update global CSS/design tokens.
4. Create centralized content bank files.
5. Create consistent SiteHeader and SiteFooter.
6. Create shared PageHero, SectionHeading, CTASection.
7. Create cards and section components.
8. Update Home page.
9. Update Study in UK page.
10. Update Universities page.
11. Update Services page.
12. Update Success Stories page.
13. Update Blog page.
14. Update Contact page.
15. Update Counselling page.
16. Update Login and admin placeholder pages only if needed for visual consistency.
17. Add metadata to all public pages.
18. Check responsiveness.
19. Check consistency.
20. Run lint/build if available.

Code quality rules:

- TypeScript strict style
- No unnecessary any
- Use named exports where appropriate
- Keep components small
- Avoid huge files
- Avoid repeated data
- Avoid hardcoded repeated nav/footer
- Use @/\* imports
- Use semantic HTML
- Use accessible buttons/forms
- Use aria labels where needed
- Use proper alt text
- Keep mobile-first responsive design

Final review checklist:
Before finishing, review and fix:

1. Navbar consistency
2. Footer consistency
3. Shared content source
4. SEO metadata
5. Mobile responsiveness
6. Page-specific purpose
7. Repeated sections
8. Visual consistency
9. CTA consistency
10. Content compliance
11. Performance
12. Accessibility
13. Code readability

Expected final response:
After making changes, explain:

1. Which files were created or changed
2. How the content bank works
3. How the navbar/footer consistency issue was solved
4. How pages now avoid repeated hardcoded content
5. How SEO was improved
6. What is still frontend-only and will connect to backend later

Important:
Do not rewrite the whole project setup.
Do not install backend packages.
Do not build real CMS yet.
Do not create real auth.
This phase is only design system, frontend pages, shared content bank, SEO structure, and consistency cleanup.
