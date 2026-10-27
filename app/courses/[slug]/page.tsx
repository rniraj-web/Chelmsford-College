import Image from "next/image";
import { notFound } from "next/navigation";
import {
  GraduationCap,
  Clock,
  Calendar,
  MapPin,
  PoundSterling,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { KeyFactsPanel, type KeyFactData } from "@/components/KeyFactsPanel";
import { StickyApplyBar } from "@/components/StickyApplyBar";
import { Accordion, type AccordionItemData } from "@/components/Accordion";
import { FeatureCard } from "@/components/FeatureCard";
import { CourseCard } from "@/components/CourseCard";
import { imageFocalPoint } from "@/lib/images";
import { sanitizeCourseHtml } from "@/lib/sanitizeHtml";
import {
  getCourseById,
  getRelatedCourses,
  PLACEHOLDER_CAMPUS,
} from "@/lib/courses";

function Html({ html }: { html: string }) {
  return (
    <div
      className="type-body-m flex flex-col gap-3 text-fg-secondary"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = Number(slug.match(/^\d+/)?.[0]);
  const course = id ? getCourseById(id) : undefined;
  if (!course) notFound();

  const keyFacts: KeyFactData[] = [
    {
      icon: GraduationCap,
      label: "Qualification level",
      value: course.derived.level,
    },
    { icon: Clock, label: "Study mode", value: course.derived.modeLabel },
    ...(course.duration
      ? [{ icon: Clock, label: "Duration", value: course.duration }]
      : []),
    {
      icon: Calendar,
      label: "Start date",
      value: course.derived.startDateLabel,
    },
    { icon: MapPin, label: "Campus", value: PLACEHOLDER_CAMPUS },
  ];

  const accordionItems: AccordionItemData[] = [
    course.courseForMeHtml && {
      id: "for-me",
      title: "Is this course for me?",
      content: <Html html={sanitizeCourseHtml(course.courseForMeHtml)} />,
    },
    course.studyOverviewHtml && {
      id: "study",
      title: "What you'll study",
      content: <Html html={sanitizeCourseHtml(course.studyOverviewHtml)} />,
    },
    (course.eligibilityHtml || course.eligibilitySpecificHtml) && {
      id: "entry",
      title: "Entry requirements",
      content: (
        <>
          {course.eligibilityHtml ? (
            <Html html={sanitizeCourseHtml(course.eligibilityHtml)} />
          ) : null}
          {course.eligibilitySpecificHtml ? (
            <Html html={sanitizeCourseHtml(course.eligibilitySpecificHtml)} />
          ) : null}
        </>
      ),
    },
    course.assessmentHtml && {
      id: "assessment",
      title: "How you'll be assessed",
      content: <Html html={sanitizeCourseHtml(course.assessmentHtml)} />,
    },
    (course.feesHtml || course.additionalFeesHtml || course.fundingHtml) && {
      id: "fees",
      title: "Fees & funding",
      content: (
        <>
          {course.feesHtml ? (
            <Html html={sanitizeCourseHtml(course.feesHtml)} />
          ) : null}
          {course.additionalFeesHtml ? (
            <Html html={sanitizeCourseHtml(course.additionalFeesHtml)} />
          ) : null}
          {course.fundingHtml ? (
            <Html html={sanitizeCourseHtml(course.fundingHtml)} />
          ) : null}
        </>
      ),
    },
    course.employabilityHtml && {
      id: "employability",
      title: "Where this course can lead",
      content: <Html html={sanitizeCourseHtml(course.employabilityHtml)} />,
    },
    course.contactHtml && {
      id: "contact",
      title: "Contact us",
      content: <Html html={sanitizeCourseHtml(course.contactHtml)} />,
    },
  ].filter(Boolean) as AccordionItemData[];

  const relatedCourses = getRelatedCourses(course, 3);

  return (
    <div className="container-page section-y flex flex-col gap-8 pb-28 md:pb-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/courses", label: "Find a course" },
          {
            href: `/courses/${course.id}-${course.derived.slug}`,
            label: course.title,
          },
        ]}
      />

      <div className="gap-gutter grid grid-cols-1 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="relative h-80 w-full overflow-hidden rounded-lg">
            <Image
              src={course.derived.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
              style={{ objectPosition: imageFocalPoint(course.derived.image) }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge emphasis="subtle" tone="blue">
              {course.derived.level}
            </Badge>
            <Badge emphasis="subtle" tone="neutral">
              {course.derived.modeLabel}
            </Badge>
            <Badge emphasis="subtle" tone="green">
              {course.derived.startDateLabel}
            </Badge>
          </div>
          <h1 className="type-h1 text-fg">{course.title}</h1>
          {course.derived.summary ? (
            <p className="type-body-l text-fg-secondary">
              {course.derived.summary}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5 lg:row-span-2 lg:sticky lg:top-24 lg:gap-5">
          <KeyFactsPanel facts={keyFacts} applyHref="#" downloadHref="#" />
          <Button
            href="/events"
            variant="secondary"
            size="large"
            className="w-full"
          >
            Book an open event
          </Button>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-7">
          {accordionItems.length > 0 ? (
            <Accordion items={accordionItems} />
          ) : null}

          <FeatureCard
            tone="brand"
            icon={PoundSterling}
            title="Already enrolled?"
            href="/pay"
          >
            Make a payment for a deposit, materials fee or trip.
          </FeatureCard>
        </div>
      </div>
      {relatedCourses.length > 0 ? (
        <section className="flex flex-col gap-4">
          <h2 className="type-h3 text-fg">Related courses</h2>
          <div className="gap-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {relatedCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>
      ) : null}

      <StickyApplyBar
        title={course.title}
        subtitle={course.derived.startDateLabel}
        applyHref="#"
      />
    </div>
  );
}
