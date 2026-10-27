"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { imageFocalPoint } from "@/lib/images";
import { sanitizeCourseHtml } from "@/lib/sanitizeHtml";
import { getCourseById, PLACEHOLDER_CAMPUS } from "@/lib/courses";
import { useCompare } from "../compare-context";

function EntryRequirements({ eligibilityHtml, eligibilitySpecificHtml }: { eligibilityHtml: string | null; eligibilitySpecificHtml: string | null }) {
  if (!eligibilityHtml && !eligibilitySpecificHtml) {
    return <span className="text-fg-secondary">Not specified</span>;
  }
  return (
    <div className="flex flex-col gap-2">
      {eligibilityHtml ? (
        <div dangerouslySetInnerHTML={{ __html: sanitizeCourseHtml(eligibilityHtml) }} />
      ) : null}
      {eligibilitySpecificHtml ? (
        <div dangerouslySetInnerHTML={{ __html: sanitizeCourseHtml(eligibilitySpecificHtml) }} />
      ) : null}
    </div>
  );
}

export default function ComparePage() {
  const { selectedIds, toggle, clear, hydrated } = useCompare();

  if (!hydrated) return null;

  const courses = selectedIds.map((id) => getCourseById(id)).filter((c) => c !== undefined);

  return (
    <div className="container-page section-y flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/courses", label: "Find a course" },
          { href: "/courses/compare", label: "Compare courses" },
        ]}
      />

      <div className="flex flex-col gap-2">
        <h1 className="type-h1 text-fg">Compare courses</h1>
        <p className="type-body-l max-w-prose text-fg-secondary">
          Qualification level, duration, campus and entry requirements, side by side.
        </p>
      </div>

      {courses.length < 2 ? (
        <p className="type-body-m text-fg-secondary">
          Select at least 2 courses to compare.{" "}
          <Link href="/courses" className="text-fg-link focus-visible:focus-highlight">
            Browse courses
          </Link>
          .
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">Comparing {courses.length} courses</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-32" />
                  {courses.map((course) => (
                    <th key={course.id} scope="col" className="p-4 text-left align-top">
                      <div className="flex flex-col gap-3">
                        <div className="relative h-32 w-full overflow-hidden rounded-lg">
                          <Image
                            src={course.derived.image}
                            alt=""
                            fill
                            sizes="300px"
                            className="object-cover"
                            style={{ objectPosition: imageFocalPoint(course.derived.image) }}
                          />
                        </div>
                        <Link
                          href={`/courses/${course.id}-${course.derived.slug}`}
                          className="type-body-m-strong text-fg-link focus-visible:focus-highlight"
                        >
                          {course.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggle(course.id)}
                          className="type-link-s flex w-fit items-center gap-1 text-fg-secondary hover:text-fg-link focus-visible:focus-ring"
                        >
                          <X className="size-4" aria-hidden="true" />
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-line-subtle">
                  <th scope="row" className="type-body-s-strong p-4 text-left align-top text-fg">
                    Qualification level
                  </th>
                  {courses.map((course) => (
                    <td key={course.id} className="type-body-m p-4 align-top text-fg-secondary">
                      {course.derived.level}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-line-subtle">
                  <th scope="row" className="type-body-s-strong p-4 text-left align-top text-fg">
                    Duration
                  </th>
                  {courses.map((course) => (
                    <td key={course.id} className="type-body-m p-4 align-top text-fg-secondary">
                      {course.duration ?? "Not specified"}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-line-subtle">
                  <th scope="row" className="type-body-s-strong p-4 text-left align-top text-fg">
                    Campus
                  </th>
                  {courses.map((course) => (
                    <td key={course.id} className="type-body-m p-4 align-top text-fg-secondary">
                      {PLACEHOLDER_CAMPUS}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-line-subtle">
                  <th scope="row" className="type-body-s-strong p-4 text-left align-top text-fg">
                    Entry requirements
                  </th>
                  {courses.map((course) => (
                    <td key={course.id} className="type-body-m p-4 align-top text-fg-secondary">
                      <EntryRequirements
                        eligibilityHtml={course.eligibilityHtml}
                        eligibilitySpecificHtml={course.eligibilitySpecificHtml}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <Button type="button" variant="ghost" size="medium" onClick={clear} className="self-start">
            Clear comparison
          </Button>
        </>
      )}
    </div>
  );
}
