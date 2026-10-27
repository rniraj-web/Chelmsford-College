# Placeholders

Already listed in `PROJECT_GUIDELINES.md` → "Content honesty": all events data, footer address/phone, the £50 deposit, the testimonial, subject/campus filter names. Not repeated here.

Added while building navigation (Phase 1):

- **Header desktop utility bar links** ("School leavers", "Adults", "Parents & carers", "Employers", "International", "Term dates", "Student login") — placeholder destinations (`#`), no audience landing pages exist yet.
- **MobileMenu quick links and CTA panel** ("Term dates", "Contact us", "Student login", "Apply now", "Book an open event") — same reason.
- **Footer link columns** (Courses / Information / About us) and **legal row** (Accessibility statement, Privacy notice, Cookies, Safeguarding, Freedom of information) — placeholder destinations until those pages/policies exist.
- **Footer social links and "Send us a message"** — placeholder destinations; no real social profiles or contact form supplied.
- **"Courses ▾" and "About us ▾" dropdown chevrons** in the desktop nav are decorative only for now — no submenu content was supplied, so they link straight through rather than opening a mega-menu.

Added while building the component library + `/styleguide` (Phase 2):

- **NewsCard has no real data source** — resolved in Phase 4: the college supplied 3 real news items (`data/news.json`), now shown on the homepage via `lib/news.ts`. The `/styleguide` example still uses `public/images/news-awards.jpg` with invented copy, since that page is for component demos, not live content.
- **VideoPlayer example uses a generic YouTube placeholder ID** (`aqz-KE-bpKQ`, a public-domain test clip) on the styleguide page — no real college video was supplied. The homepage's own video (`MmUFKbYLKP4`) is a real, published Chelmsford College video, confirmed via YouTube's public data (title, channel) and has auto-generated English captions available through the player's own CC control. No transcript was supplied for it, so the "Transcript" link is omitted there rather than pointing somewhere fake — `components/VideoPlayer.tsx`'s `transcriptHref` is optional for this reason.
- **PaymentTypeCard / OrderSummary / PaymentConfirmation example values** on `/styleguide` (student ID, reference, amounts) are illustrative only, reusing the already-documented "Alex Smith" demo learner.

Added while building the homepage + `/courses` search (Phase 3):

- **Campus and Age group filters are now live in the `/courses` UI** (checkbox fieldsets, both mobile drawer and desktop sidebar), but each is a single placeholder bucket — `"Princes Road campus"` and `"All ages"` — covering all 33 courses, because the data has no campus or age-group field (`lib/courses.ts` → `PLACEHOLDER_CAMPUS` / `PLACEHOLDER_AGE_GROUP`). Selecting them doesn't narrow results; replace with the college's real campuses/age bands once confirmed.
- **Homepage NotificationBar, News section and video/testimonial** reuse the same placeholders already documented above — nothing new there, just now live on `/`.

Added while redesigning the Hero (Phase 5):

- **HeroStats figures** (`components/HeroStats.tsx`: 3,771 Students / 317 Programmes / 192 Teachers / 2 Campuses) — content supplied as a layout reference, not verified against the college's actual headcounts. They don't match our own course data (33 courses, one documented campus), so they're almost certainly illustrative. Replace with the college's real figures before launch.

Added while building the payment journey (Phase 6):

- **`/pay` route group** (`app/pay/*`) is a front-end mock only — no real payment provider is wired in, no card data is collected or transmitted, and "Pay £x.xx" just advances to the confirmation step. The college has not chosen a payment provider yet (per the brief).
- **Payment amounts** (£50 deposit / £25 materials / £15 trip, in `app/pay/payment-types.ts`) are illustrative; only the £50 deposit figure was supplied, and it's already flagged as unverified in `PROJECT_GUIDELINES.md`.
- **Confirmation reference "CHC-000000"** (`app/pay/confirmation/page.tsx`) is a static placeholder, reusing the format already shown on `/styleguide`. A real build would generate this from the payment provider's transaction.
- **"Download receipt (PDF)"** triggers the browser's print dialog (`window.print()`) rather than generating a real PDF — a working, dependency-free stand-in until a provider-generated receipt exists.
- **VISA / MASTERCARD / AMEX badges** on `components/PaymentForm.tsx` are illustrative chrome, not a confirmed list of accepted card schemes — no payment provider has been chosen yet (per the brief), so this shouldn't be read as a commitment.
- **Apple Pay / Google Pay tabs** on `components/PaymentForm.tsx` are visual mocks only — no Apple Pay JS / Google Pay API integration (both require a live merchant account and HTTPS production domain). Clicking either "Pay" button advances the mock flow exactly like the card form; no wallet sheet actually opens. Generic icons are used throughout rather than the real Apple/Google Pay marks.

Added while building the course detail page (Phase 7):

- **"Apply now" / "Download course guide" / "Book an open event" links** on `app/courses/[slug]/page.tsx` (`KeyFactsPanel`, `StickyApplyBar`, and the inline button) all point to `#` — the college hasn't supplied an application system, course guide downloads, or an events-specific landing page for this CTA. "Book an open event" currently links to `/events` as the closest real destination.
- **Related courses** (same page) are filtered by `derived.subject`, which `docs/data.md` already flags as an assumed grouping of `sectionId`, not a college-confirmed taxonomy — confirm subject names with the college before launch.

Added while fixing event booking (Phase 8):

- **"Book your place"** (`components/BookEventButton.tsx`) is a simulated prototype interaction — every event's `bookingUrl` is `null` (per `data/events.json`), so clicking it swaps to an inline "You're booked in" confirmation rather than linking anywhere real. No booking is recorded, no email is sent. If the college later supplies a real booking URL per event, the component already prefers that over the simulation.

Added while building course comparison (Phase 9, Appendix 4 feature):

- **`/courses/compare`** — select up to 3 courses from the search results and compare qualification level, duration, campus and entry requirements. The "Campus" row reuses the same single-bucket `PLACEHOLDER_CAMPUS` value already documented above (no real campus field in the data), so it reads the same for every course for now.

Added while building reusable CMS campaign sections (Phase 10, Appendix 4 feature):

- **`data/campaigns.json`** is sample content standing in for what a College marketing editor would manage through the CMS admin — add, edit, reorder, or switch `active` off, with zero code changes (`lib/campaigns.ts` → `getActiveCampaigns()` just filters on that flag). The "September 2027 enrolment" entry is deliberately set to `active: false` to demonstrate that toggle — it won't render anywhere until switched on. Replace all three with the college's real campaign content before launch.
