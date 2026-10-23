# Chelmsford College website — tender prototype

A clickable, responsive prototype for Chelmsford College's website tender. It covers the **Homepage (with course search and results), Course page, Events (listing + event page) and a Payment journey**.

The brief asks for a prototype, not a live site, but we build it as a real Next.js app so the panel can use it on their own devices and it can grow into the final build.

## Read first
- `docs/brief.md`: what the college asked for (the original is in `source-files/`).
- `docs/design-system.md`: tokens, typography, layout, **every component spec** and the page compositions.
- `docs/data.md`: course and event data, assumptions, and how JSON is later swapped for the college's SQL database.
- `docs/figma.md`: Figma file map. **Don't call Figma MCP tools.** Use the files here.
- `design/tokens.css` / `design/tokens.json`: all design values, named exactly like the Figma variables.
- `design/tailwind-theme.css`: those tokens mapped into Tailwind classes. This is the only Tailwind config; don't add a `tailwind.config.js`.
- `design/screens/*.png`: visual references exported from Figma.

## Stack
- Next.js (App Router) + TypeScript, deployed to Vercel for the panel.
- **Styling: Tailwind CSS v4.** `app/globals.css` must start with:
  ```css
  @import "tailwindcss";
  @import "../design/tokens.css";
  @import "../design/tailwind-theme.css";
  ```
  `design/tailwind-theme.css` maps every token into Tailwind and **removes Tailwind's default colours, font sizes, radii, shadows and breakpoints**, so only brand values exist. It's tested with Tailwind 4.3. No UI kits (MUI, Chakra, Bootstrap); components are built to match our design system.
- **Animation: Motion** (`motion` package, formerly Framer Motion; `import { motion } from "motion/react"`). See the rules below.
- Fonts: a single system-first stack for both headings and body — `-apple-system, Arial, Inter, Times, sans-serif`. `-apple-system`/`Arial` cover almost every device without loading anything; Inter (`next/font/google`, `variable: '--font-inter'`) and Times are rare fallbacks. Set `--cc-font-heading` and `--cc-font-body` to `-apple-system, Arial, var(--font-inter), Times, sans-serif;` in `globals.css`.
- Icons: `lucide-react` (names in `docs/design-system.md`).
- Images: `next/image` from `public/images/`. The originals are large, so always set `sizes`.
- Rich text from course data: sanitise before rendering (`sanitize-html` with a minimal allow-list).

## Non-negotiables

### Mobile first
- Unprefixed classes = mobile (360px+). Then layer up with **`md:` (768, tablet), `lg:` (1024, desktop), `xl:` (1440, wide)**. `sm:` and `2xl:` don't exist.
- Never write desktop-first (`max-md:` overrides as the main approach).
- Check every page at **375, 768 and 1440** wide. Nothing may scroll horizontally at 320px.
- Content order in the source = visual order at every breakpoint.

### Design tokens only (via Tailwind classes)
- **Colours:**
  - Backgrounds: `bg-surface`, `bg-brand`, `bg-accent`, `bg-brand-strong`…
  - Text: always `text-fg-*` (`text-fg`, `text-fg-secondary`, `text-fg-link`, `text-fg-on-brand`…).
  - Borders: `border-line-*`.
  - Icons: `text-icon-*`.
  - Full list in `docs/design-system.md` → "Tailwind classes".
- **Typography:** use the `type-*` utilities (`type-display`, `type-h1`…`type-h6`, `type-body-m`, `type-label-m`, `type-overline`…). They match the Figma text styles and **resize automatically at md/lg**, so never add breakpoint font-size classes. Tailwind's `text-sm`/`text-lg` etc. are removed on purpose.
- **Spacing:** Tailwind's default 4px step already matches our scale, but only these steps are allowed: `0 0.5 1 2 3 4 5 6 8 10 12 16 20 24 32` (= 0–128px). Never `p-7`, `gap-9` or arbitrary `[13px]` values.
- **Layout:** `container-page` (1280 max + responsive page margin), `section-y` (48/64/96 vertical padding), `gap-gutter` (16/24 grid gap).
- **Radius and shadow:** `rounded-xs…2xl/full`, `shadow-xs…xl`.
- **Focus:** `focus-visible:focus-ring` on every interactive element; `focus-visible:focus-highlight` on text links.
- **Gradients:** `bg-gradient-brand`, `bg-gradient-brand-deep`, `bg-overlay-hero-left`, `bg-overlay-hero-bottom`.
- **No arbitrary values** (`bg-[#…]`, `text-[17px]`). If something is missing, add a token to `design/tokens.css` + `tailwind-theme.css` (and to Figma) instead.
- Use `clsx` / `tailwind-variants` (or `cva`) for component variants, so a variant's classes live in one place.
- Component names and props match Figma (see the component list in `docs/design-system.md`).

### Motion (animation)
- **Library:** use `motion` (formerly Framer Motion).
- **Reduced motion:** wrap the app in `<MotionConfig reducedMotion="user">` so `prefers-reduced-motion` is honoured.
- **Timing:** take values from the tokens:
  - Durations: 0.12s (micro: hover, press), 0.2s (base: accordion, chip, dropdown), 0.32s (large: drawer, menu, page).
  - Easing: `[0.2, 0, 0, 1]` (standard) and `[0.4, 0, 1, 1]` (exit).
  - The same values are in `design/tokens.json` → `motion`.
  - CSS transitions use `duration-120/200/320 ease-standard`.
- **What to animate:** only `transform` and `opacity`, never layout-shifting properties. `AnimatePresence` handles exits for the mobile menu, filter drawer, accordions and payment step changes.
- **Restraint:**
  - Motion is functional: show where something came from or went.
  - No autoplay, parallax or looping animation.
  - Nothing that flashes more than 3 times a second.
  - Content must be readable and usable before any animation finishes.
- **Focus with animated panels:** moving focus into an animated panel (menu, drawer) must still work when animation is off.

### Accessibility: WCAG 2.2 AA
- Use only the approved colour pairs. **Never white text on Green (#7BC242).** Text on photos always sits on an overlay gradient.
- Every interactive element gets `:focus-visible { box-shadow: var(--cc-focus-ring) }`. Text links use the yellow highlight focus instead.
- Targets ≥ 44px tall (48px default). Visible labels on every field. Error text goes above the field, plus an error summary.
- Skip link first. Landmarks (`header`, `nav`, `main`, `footer`). One `h1` per page with logical heading order.
- Accordion, Tabs, Mobile Menu (dialog with focus trap + Esc) and Filter Chips follow WAI-ARIA patterns.
- `prefers-reduced-motion` respected. No autoplay video or carousels.
- Sticky header and sticky apply bar must not hide focused elements (`scroll-padding`).
- Test with axe (Playwright + `@axe-core/playwright`) on every route at all three widths. Zero violations is the bar.

### Content honesty
- Use the supplied content: `data/courses.json` (33 real courses), `public/images/`, and the logos.
- **Never invent facts or statistics.** For example, not "400+ courses"; the data has 33. Counts in filters are computed from data.
- These are **placeholders**: show them, but keep them easy to find and replace (list them in a `PLACEHOLDERS.md` if you add more):
  - All events in `data/events.json`.
  - Footer address "Princes Road, Chelmsford, Essex CM2 9DE" and phone "01245 293000". Both are unverified.
  - The £50 course deposit amount (not in the data).
  - Testimonial quote and learner name.
  - Subject names for `sectionId` and campus filter options (neither is in the data).
  - Demo learner "Alex Smith", student ID, and payment reference.

### Data
- All course and event access goes through `lib/courses.ts` / `lib/events.ts` (`getCourses(filters)`, `getCourseBySlug`, `getFacets()`, etc.), so JSON can later be swapped for the college's SQL database without touching pages.
- Filters live in URL query params. Results work without JavaScript.
- Course page sections map to fields as in `docs/data.md`; hide a section when its field is null.

### Payment journey
- Front-end mock only. **Never collect or store real card data**, and never post card numbers anywhere.
- Steps: 1 Who's paying + what for (deposit / materials / trip) → 2 Learner (and payer) details → 3 Review & pay → 4 Confirmation.
- Support both learners and parents or carers paying on a learner's behalf.
- The card step represents provider-hosted fields. If a realistic card step is needed, use a payment provider's **test mode** only.

## Routes
| Route | Page |
|---|---|
| `/` | Homepage |
| `/courses` | Search results + filters (subject, level, study mode, age group, campus) |
| `/courses/[slug]` | Course template (one template for all 33 courses) |
| `/events` | Events listing, filter by type and month |
| `/events/[slug]` | Single event |
| `/pay`, `/pay/details`, `/pay/review`, `/pay/confirmation` | Payment journey |

## Suggested structure
`app/` (routes; `app/globals.css` imports Tailwind + tokens + theme) · `components/` (one folder per design-system component; animated parts are client components) · `lib/` (data access) · `data/` · `public/images/`

## Definition of done (per page)
1. Matches `docs/design-system.md` and the PNG references on mobile, tablet and desktop.
2. Uses only tokens and design-system components.
3. axe: no violations at 375 / 768 / 1440. Keyboard-only walkthrough works.
4. `npm run lint`, `npm run build` and type-check all pass.
