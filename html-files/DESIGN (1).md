---
name: Academic Excellence System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#4d4353'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#7e7384'
  outline-variant: '#cfc2d5'
  surface-tint: '#8333c6'
  primary: '#4c0080'
  on-primary: '#ffffff'
  primary-container: '#6a0dad'
  on-primary-container: '#d4a1ff'
  inverse-primary: '#dfb7ff'
  secondary: '#5654a8'
  on-secondary: '#ffffff'
  secondary-container: '#a7a5ff'
  on-secondary-container: '#393689'
  tertiary: '#2e3233'
  on-tertiary: '#ffffff'
  tertiary-container: '#45484a'
  on-tertiary-container: '#b4b7b9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f1daff'
  primary-fixed-dim: '#dfb7ff'
  on-primary-fixed: '#2d004f'
  on-primary-fixed-variant: '#690bac'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#100563'
  on-secondary-fixed-variant: '#3e3c8f'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-desktop: 2.5rem
  margin-mobile: 1rem
  section-gap: 5rem
---

## Brand & Style

This design system is built to convey **authority, prestige, and institutional reliability**. It targets ambitious students in Nepal seeking higher education in the UK, positioning the consultancy not just as an agency, but as an elite academic gateway.

The visual style is **Corporate / Modern** with a strong emphasis on **Institutional Minimalism**. It leverages high-density information layouts paired with significant editorial whitespace. Drawing from British academic heritage, the design uses "Royal" color accents and structured grid layouts to evoke the feeling of a prestigious university prospectus. The emotional response is one of confidence—providing a clear, professional roadmap for a life-changing student journey.

## Colors

The palette is rooted in the "Royal" tradition of the UK.
- **Primary (Royal Purple):** Used for primary actions, branding elements, and key academic highlights. It represents ambition and the premium nature of the service.
- **Secondary (Deep Indigo):** Provides depth and seriousness. Used for navigation bars, footers, and secondary buttons to ensure a grounded, professional feel.
- **Surface & Background:** A dominant use of clean white and ultra-light grey (#F8FAFC) ensures readability and an "open" academic atmosphere.
- **Functional Neutrals:** Slates and cool greys are used for body text and borders to maintain a high-contrast, accessible experience.

## Typography

The typographic scale balances the geometric confidence of **Montserrat** for headings with the supreme legibility of **Inter** for body content. 

- **Headlines:** Set in Montserrat with tighter letter-spacing for a modern, editorial look.
- **Body:** Inter is used for all long-form content to ensure maximum readability during the complex application and study process.
- **Institutional Labels:** Small caps are used for category labels (e.g., "COURSE CATEGORY") to provide a structured, organized feel typical of academic transcripts.

## Layout & Spacing

The layout utilizes a **Fixed Grid** system (12 columns) to maintain a sense of order and structure. 

- **The "Academic Grid":** Subtle light-grey vertical lines or background patterns may be used to reinforce the institutional feel.
- **Information Density:** On desktop, use wide margins and distinct sections separated by a 5rem gap to prevent cognitive overload.
- **Responsive Behavior:** Transitions from a 12-column desktop grid to a 1-column stack on mobile. In mobile views, padding is reduced to 1rem to maximize screen real estate for reading dense academic requirements.

## Elevation & Depth

To maintain a premium, clean aesthetic, this design system avoids heavy shadows.

- **Tonal Layering:** Depth is primarily created through subtle shifts in background color (e.g., a white card on a #F8FAFC background).
- **Low-Contrast Outlines:** UI containers and cards use a 1px border (#E2E8F0) rather than shadows to define their boundaries.
- **State Changes:** Only active elements or primary cards should use a soft, "high-diffusion" shadow (0 10px 15px -3px rgba(0, 0, 0, 0.05)) to signify interactivity without breaking the flat, professional aesthetic.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding provides a modern touch while maintaining the "sharpness" and seriousness required of an institutional brand. Excessive roundness (pills) should be avoided to distinguish the brand from casual consumer apps. Use "Sharp" (0px) for high-level decorative elements like section dividers or background image containers to reinforce the British architectural influence.

## Components

- **Buttons:** Primary buttons use Royal Purple with white text. They are rectangular with a 4px corner radius. Secondary buttons use a Deep Indigo outline.
- **Input Fields:** Professional "Border-bottom only" or "Full-stroke" styles with 1px Slate-200 borders. Focus states should use a clear Royal Purple 2px stroke.
- **Cards (Course/University):** Clean white surfaces with light borders. Use Montserrat for titles and high-quality photography of UK campuses as the header image.
- **Steppers:** A custom "Journey Tracker" component is essential for showing the student application progress (Consultation → IELTS → Application → Visa).
- **Chips:** Used for "Study Level" or "Intake" labels, utilizing the tertiary color (#F8FAFC) with Indigo text for a subtle, organized look.
- **Academic Landmarks:** Integrate high-quality, desaturated or subtly color-graded photography of UK landmarks as background hero elements or within cards to inspire the student's vision.