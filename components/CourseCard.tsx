import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, GraduationCap } from "lucide-react";
import type { Course } from "@/lib/courses";
import { imageFocalPoint } from "@/lib/images";
import { Badge } from "./Badge";

export function CourseCard({
  course,
  layout = "vertical",
}: {
  course: Course;
  layout?: "vertical" | "horizontal";
}) {
  const isHorizontal = layout === "horizontal";

  return (
    <Link
      href={`/courses/${course.id}-${course.derived.slug}`}
      className={`group block overflow-hidden rounded-lg border border-line-subtle bg-surface shadow-sm transition duration-500 ease-standard hover:-translate-y-4 hover:border-line-brand hover:shadow-md focus-visible:focus-ring ${
        isHorizontal ? "md:flex" : ""
      }`}
    >
      <div
        className={`relative ${isHorizontal ? "h-media-card w-full shrink-0 md:h-auto md:w-media-card-wide" : "h-media-card w-full"}`}
      >
        <Image
          src={course.derived.image}
          alt=""
          fill
          sizes={isHorizontal ? "280px" : "(min-width: 1024px) 400px, 100vw"}
          className="object-cover"
          style={{ objectPosition: imageFocalPoint(course.derived.image) }}
        />
        <Badge emphasis="solid" tone="blue" className="absolute left-4 top-4">
          {course.derived.subject}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 lg:p-6">
        <h3 className="type-h4 text-fg group-hover:text-fg-link group-hover:underline">
          {course.title}
        </h3>
        {course.derived.summary ? (
          <p className="type-body-s line-clamp-2 text-fg-secondary">
            {course.derived.summary}
          </p>
        ) : null}
        <div className="type-body-s flex flex-wrap items-center gap-4 text-fg-secondary">
          <span className="flex items-center gap-2">
            <GraduationCap
              className="size-5 text-icon-brand"
              aria-hidden="true"
            />
            {course.derived.level}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-5 text-icon-brand" aria-hidden="true" />
            {course.derived.modeLabel}
            {course.duration ? ` · ${course.duration}` : ""}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="size-5 text-icon-brand" aria-hidden="true" />
            {course.derived.startDateLabel}
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-2 border-t border-line-subtle pt-4">
          {course.derived.feesText ? (
            <Badge emphasis="subtle" tone="neutral" className="self-start">
              {course.derived.feesText}
            </Badge>
          ) : null}
          <span className="type-link-s self-end text-fg-link">View course →</span>
        </div>
      </div>
    </Link>
  );
}
