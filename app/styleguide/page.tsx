import { Calendar, GraduationCap, MapPin, PoundSterling, Search, User } from "lucide-react";
import { getCourses, getFacets } from "@/lib/courses";
import { getEvents } from "@/lib/events";

import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { Link } from "@/components/Link";
import { TextField } from "@/components/TextField";
import { Select } from "@/components/Select";
import { SearchBar } from "@/components/SearchBar";
import { Checkbox } from "@/components/Checkbox";
import { Radio } from "@/components/Radio";
import { ErrorSummary } from "@/components/ErrorSummary";
import { Badge } from "@/components/Badge";
import { FilterChip } from "@/components/FilterChip";
import { Tabs } from "@/components/Tabs";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Pagination } from "@/components/Pagination";
import { Alert } from "@/components/Alert";
import { NotificationBar } from "@/components/NotificationBar";
import { ProgressStepper } from "@/components/ProgressStepper";
import { DateBadge } from "@/components/DateBadge";
import { CourseCard } from "@/components/CourseCard";
import { EventCard } from "@/components/EventCard";
import { NewsCard } from "@/components/NewsCard";
import { SubjectTile } from "@/components/SubjectTile";
import { FeatureCard } from "@/components/FeatureCard";
import { CampaignBanner } from "@/components/CampaignBanner";
import { Accordion } from "@/components/Accordion";
import { KeyFactsPanel } from "@/components/KeyFactsPanel";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Testimonial } from "@/components/Testimonial";
import { Stat } from "@/components/Stat";
import { StickyApplyBar } from "@/components/StickyApplyBar";
import { PaymentTypeCard } from "@/components/PaymentTypeCard";
import { OrderSummary } from "@/components/OrderSummary";
import { PaymentForm } from "@/components/PaymentForm";
import { PaymentConfirmation } from "@/components/PaymentConfirmation";

function Section({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 border-b border-line-subtle py-12">
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />
      {children}
    </section>
  );
}

function Swatch({ label, sample }: { label: string; sample: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="type-label-m text-fg-secondary">{label}</p>
      {sample}
    </div>
  );
}

export default function StyleguidePage() {
  const courses = getCourses();
  const facets = getFacets();
  const events = getEvents();
  const [courseA, courseB] = courses;
  const [eventA, eventB] = events;

  return (
    <div className="container-page flex flex-col pb-24 lg:pb-0">
      <div className="py-8">
        <p className="type-overline text-fg-accent">Design system</p>
        <h1 className="type-h1 mt-1 text-fg">Styleguide</h1>
        <p className="type-body-l mt-2 max-w-prose text-fg-secondary">
          Every component in <code>docs/design-system.md</code>, built with the tokens in{" "}
          <code>design/tokens.css</code>. Real course and event data where it makes sense — nothing here is a
          fabricated statistic.
        </p>
      </div>

      <Section title="Buttons & links" eyebrow="Actions">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost">Ghost</Button>
            <div className="rounded-md bg-brand-strong p-2">
              <Button variant="inverse">Inverse</Button>
            </div>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="large" trailingIcon={GraduationCap}>
              Large with icon
            </Button>
            <Button variant="secondary" size="medium" leadingIcon={Search}>
              Medium with icon
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <IconButton icon={Search} variant="ghost" aria-label="Search" />
            <IconButton icon={PoundSterling} variant="primary" aria-label="Pay a fee" />
            <IconButton icon={User} variant="secondary" aria-label="Student login" />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="#">Default link</Link>
            <Link href="#" showIcon>
              Link with arrow
            </Link>
            <Link href="https://example.com" external>
              External link
            </Link>
            <div className="rounded-md bg-brand-strong p-2">
              <Link href="#" tone="inverse">
                Inverse link
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Form controls" eyebrow="Forms">
        <div className="grid gap-6 lg:grid-cols-2">
          <TextField id="sg-name" label="Full name" hint="As it appears on your ID" autoComplete="name" />
          <TextField
            id="sg-email"
            label="Email address"
            type="email"
            autoComplete="email"
            error="Enter an email address in the correct format"
          />
          <Select id="sg-campus" label="Preferred campus">
            <option>Princes Road</option>
            <option>Other</option>
          </Select>
          <TextField id="sg-search-field" label="Search" leadingIcon={Search} placeholder="Course title" />
          <fieldset className="flex flex-col lg:col-span-2">
            <legend className="type-label-l mb-1 text-fg">Study mode</legend>
            <Checkbox id="sg-check-1" label="Full-time" count={facets.mode.find((m) => m.label === "Full-time")?.count} defaultChecked />
            <Checkbox id="sg-check-2" label="Part-time" count={0} disabled />
          </fieldset>
          <fieldset className="flex flex-col lg:col-span-2">
            <legend className="type-label-l mb-1 text-fg">Who is paying?</legend>
            <Radio id="sg-radio-1" name="sg-payer" label="I'm the learner" defaultChecked />
            <Radio id="sg-radio-2" name="sg-payer" label="I'm a parent or carer" />
          </fieldset>
          <div className="lg:col-span-2">
            <ErrorSummary
              errors={[
                { fieldId: "sg-email", message: "Email address: enter an email in the correct format" },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Swatch label="SearchBar — compact" sample={<SearchBar size="compact" />} />
          <Swatch label="SearchBar — hero" sample={<SearchBar size="hero" />} />
        </div>
      </Section>

      <Section title="Badges, chips & tabs" eyebrow="Status">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="blue">Blue subtle</Badge>
            <Badge tone="green">Green subtle</Badge>
            <Badge tone="neutral">Neutral subtle</Badge>
            <Badge tone="yellow">Yellow subtle</Badge>
            <Badge tone="purple">Purple subtle</Badge>
            <Badge tone="orange">Orange subtle</Badge>
            <Badge tone="error">Error subtle</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge emphasis="solid" tone="blue">
              Blue solid
            </Badge>
            <Badge emphasis="solid" tone="green">
              Green solid
            </Badge>
            <Badge emphasis="solid" tone="neutral">
              Neutral solid
            </Badge>
            <Badge emphasis="solid" tone="yellow">
              Yellow solid
            </Badge>
            <Badge emphasis="solid" tone="purple">
              Purple solid
            </Badge>
            <Badge emphasis="solid" tone="orange">
              Orange solid
            </Badge>
            <Badge emphasis="solid" tone="error">
              Error solid
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {facets.subject.slice(0, 3).map((subject, index) => (
              <FilterChip key={subject.value} selected={index === 0} removable={index === 0}>
                {subject.label} ({subject.count})
              </FilterChip>
            ))}
          </div>
          <Tabs
            tabs={[
              { id: "study", label: "What you'll study", content: <p className="type-body-m">Example tab content.</p> },
              { id: "entry", label: "Entry requirements", content: <p className="type-body-m">Example tab content.</p> },
              { id: "fees", label: "Fees & funding", content: <p className="type-body-m">Example tab content.</p> },
            ]}
          />
        </div>
      </Section>

      <Section title="Navigation" eyebrow="Wayfinding">
        <div className="flex flex-col gap-8">
          <Swatch
            label="Breadcrumbs"
            sample={
              <Breadcrumbs
                items={[
                  { href: "/", label: "Home" },
                  { href: "/courses", label: "Courses" },
                  { href: "#", label: courseA?.title ?? "Course" },
                ]}
              />
            }
          />
          <Swatch label="Pagination" sample={<Pagination currentPage={3} totalPages={7} buildHref={(page) => `/styleguide?page=${page}`} />} />
        </div>
      </Section>

      <Section title="Feedback & progress" eyebrow="Status">
        <div className="flex flex-col gap-6">
          <Alert tone="info" title="Applications open">
            You can apply for September 2026 courses now.
          </Alert>
          <Alert tone="success" title="Application submitted">
            We&rsquo;ll be in touch within 5 working days.
          </Alert>
          <Alert tone="warning" title="Places are limited" action={{ href: "#", label: "Book now" }}>
            This event has limited capacity.
          </Alert>
          <Alert tone="error" title="There is a problem">
            Enter an email address in the correct format.
          </Alert>
          <NotificationBar action={{ href: "/events", label: "See upcoming events" }}>
            Open Evening — Wednesday 18 November, 4–7pm.
          </NotificationBar>
          <NotificationBar tone="highlight">Applications for September 2026 are now open.</NotificationBar>
          <ProgressStepper steps={["Payment", "Your details", "Review & pay", "Confirmation"]} currentStep={2} />
        </div>
      </Section>

      <Section title="Cards" eyebrow="Content">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <DateBadge date={eventA?.start ?? "2026-11-18"} tone="brand" />
            <DateBadge date={eventA?.start ?? "2026-11-18"} tone="light" />
          </div>
          {courseA ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <CourseCard course={courseA} />
              {courseB ? <CourseCard course={courseB} /> : null}
            </div>
          ) : null}
          {courseA ? <CourseCard course={courseA} layout="horizontal" /> : null}
          {eventA ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <EventCard event={eventA} />
              {eventB ? <EventCard event={eventB} layout="compact" /> : null}
            </div>
          ) : null}
          <NewsCard
            href="#"
            image="/images/news-awards.jpg"
            date="12 October 2026"
            title="Chelmsford College shortlisted for national award"
            excerpt="Placeholder news item — the college hasn't supplied real news content for the prototype yet."
          />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <SubjectTile href="/courses?subject=hair-beauty" image="/images/hairdressing.jpg" label="Hair & Beauty" count={facets.subject.find((s) => s.label === "Hair & Beauty")?.count ?? 0} />
            <SubjectTile href="/courses?subject=catering-hospitality" image="/images/catering.jpg" label="Catering & Hospitality" count={facets.subject.find((s) => s.label === "Catering & Hospitality")?.count ?? 0} />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <FeatureCard icon={GraduationCap} title="Already enrolled?" href="/pay">
              Make a payment for a deposit, materials fee or trip.
            </FeatureCard>
            <FeatureCard tone="brand" icon={Calendar} title="Visit an open event" href="/events">
              Meet tutors and tour our facilities.
            </FeatureCard>
          </div>
        </div>
      </Section>

      <Section title="Content blocks" eyebrow="Composition">
        <div className="flex flex-col gap-10">
          <CampaignBanner
            image="/images/group-of-learners.jpg"
            title="Adult learning at Chelmsford College"
            ctaHref="/courses?mode=adult-learning"
            ctaLabel="Explore adult courses"
          >
            Flexible part-time and full-time courses designed around work and family life.
          </CampaignBanner>
          {courseA ? (
            <Accordion
              items={[
                { id: "for-me", title: "Is this course for me?", content: <p>{courseA.derived.summary}</p> },
                { id: "study", title: "What you'll study", content: <p>Course content from the college&rsquo;s data.</p> },
                { id: "entry", title: "Entry requirements", content: <p>See the full course page for details.</p> },
              ]}
            />
          ) : null}
          {courseA ? (
            <KeyFactsPanel
              applyHref="#"
              downloadHref="#"
              facts={[
                { icon: GraduationCap, label: "Level", value: courseA.derived.level },
                { icon: Calendar, label: "Start date", value: courseA.derived.startDateLabel },
                { icon: MapPin, label: "Mode", value: courseA.derived.modeLabel },
                { icon: PoundSterling, label: "Fees", value: courseA.derived.feesText ?? "Contact us" },
              ]}
            />
          ) : null}
          <VideoPlayer
            poster="/images/students-learning.jpg"
            youtubeId="aqz-KE-bpKQ"
            duration="2:14"
            caption="Example video caption"
            transcriptHref="#"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Testimonial quote="Studying here gave me the confidence and skills to start my career." name="Alex Smith" />
            <Testimonial tone="brand" quote="Studying here gave me the confidence and skills to start my career." name="Alex Smith" />
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <Stat value={String(courses.length)} label="Courses in the prototype data" />
            <Stat value={String(facets.subject.length)} label="Subject areas" />
          </div>
        </div>
      </Section>

      <Section title="Payment" eyebrow="Checkout">
        <div className="flex flex-col gap-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <PaymentTypeCard
              id="sg-pay-deposit"
              name="sg-pay-type"
              paymentType="deposit"
              title="Course deposit"
              description="Secure your place before enrolment."
              fromPrice="£50"
              selected
              readOnly
            />
            <PaymentTypeCard
              id="sg-pay-materials"
              name="sg-pay-type"
              paymentType="materials"
              title="Materials fee"
              description="Paid after enrolment."
              fromPrice="£25"
              selected={false}
              readOnly
            />
            <PaymentTypeCard
              id="sg-pay-trip"
              name="sg-pay-type"
              paymentType="trip"
              title="Trip or visit"
              description="One-off payments for trips."
              fromPrice="£15"
              selected={false}
              readOnly
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <OrderSummary
              rows={[
                { label: "Payment for", value: "Course deposit" },
                { label: "Learner", value: "Alex Smith" },
                { label: "Student ID", value: "CC000000 (placeholder)" },
                { label: "Course", value: courseA?.title ?? "Example course" },
              ]}
              total="£50.00"
            />
            <PaymentForm amountLabel="£50.00" />
          </div>
          <PaymentConfirmation reference="CHC-000000" amount="£50.00" paidFor="Course deposit" makeAnotherPaymentHref="/pay" />
        </div>
      </Section>

      <p className="type-body-s py-8 text-fg-secondary">
        StickyApplyBar is fixed to the bottom of the viewport on mobile — scroll on a narrow screen to see it below.
      </p>
      <StickyApplyBar title={courseA?.title ?? "Example course"} subtitle="Starts 1 September 2026 · Full-time" applyHref="#" />
    </div>
  );
}
