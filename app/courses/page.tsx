import Link from "next/link";
import { X } from "lucide-react";
import { getCourses, getCourseFacetSummaries, getFacets, type CourseSort } from "@/lib/courses";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchBar } from "@/components/SearchBar";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { FilterFieldsets, type SelectedFacets } from "@/components/FilterFieldsets";
import { FiltersDrawer } from "@/components/FiltersDrawer";
import { CourseCard } from "@/components/CourseCard";
import { CompareCheckbox } from "@/components/CompareCheckbox";
import { CompareBar } from "@/components/CompareBar";
import { Pagination } from "@/components/Pagination";
import { LiveResultCount } from "@/components/LiveResultCount";
import { Reveal } from "@/components/Reveal";

const PAGE_SIZE = 9;
const FORM_ID = "course-filters";
const FACET_KEYS = ["subject", "level", "mode", "campus", "ageGroup"] as const;

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  // shortcut: the sidebar and drawer filter fieldsets share one form (so filtering
  // still works without JS), so a submit with an already-active filter checked in
  // both duplicates that value in the query string — dedupe here.
  return Array.from(new Set(Array.isArray(value) ? value : [value]));
}

function buildQuery(params: Record<string, string | string[] | number | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    if (Array.isArray(value)) {
      for (const v of value) search.append(key, v);
    } else {
      search.append(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `/courses?${qs}` : "/courses";
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const sort = (typeof sp.sort === "string" ? sp.sort : "relevance") as CourseSort;
  const requestedPage = Math.max(1, Number(sp.page) || 1);

  const selected: SelectedFacets = {
    subject: toArray(sp.subject),
    level: toArray(sp.level),
    mode: toArray(sp.mode),
    campus: toArray(sp.campus),
    ageGroup: toArray(sp.ageGroup),
  };

  const facets = getFacets();
  const facetSummaries = getCourseFacetSummaries();
  const allResults = getCourses({ q, sort, ...selected });
  const totalPages = Math.max(1, Math.ceil(allResults.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const results = allResults.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const activeChips = FACET_KEYS.flatMap((key) =>
    selected[key].map((value) => ({
      key,
      value,
      label: facets[key].find((option) => option.value === value)?.label ?? value,
    })),
  );

  const clearAllHref = buildQuery({ q, sort });

  function hrefWithoutChip(key: (typeof FACET_KEYS)[number], value: string) {
    return buildQuery({
      q,
      sort,
      ...selected,
      [key]: selected[key].filter((v) => v !== value),
    });
  }

  return (
    <div className="container-page section-y flex flex-col gap-6 pb-24">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/courses", label: "Find a course" }]} />
      <h1 className="type-h1 text-fg">Find a course</h1>
      <SearchBar size="compact" defaultValue={q} action="/courses" className="lg:max-w-prose" />

      {/* Shared destination for every filter/sort control below, wherever it sits in the DOM (sidebar, drawer, toolbar). */}
      <form id={FORM_ID} method="get" action="/courses">
        <input type="hidden" name="q" value={q ?? ""} />
      </form>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <aside className="hidden lg:block lg:w-sidebar lg:shrink-0">
          <h2 className="type-h5 mb-4 text-fg">Filters</h2>
          <FilterFieldsets facets={facets} selected={selected} formId={FORM_ID} idPrefix="sidebar" />
          <div className="mt-6 flex flex-col gap-3">
            <button type="submit" form={FORM_ID} className="type-button-m flex h-12 items-center justify-center rounded-md bg-brand text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring">
              Show <LiveResultCount formId={FORM_ID} courses={facetSummaries} initialCount={allResults.length} />
            </button>
            <Link href={clearAllHref} className="type-link-m text-center text-fg-link focus-visible:focus-highlight">
              Clear all
            </Link>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <FiltersDrawer
              facets={facets}
              courses={facetSummaries}
              selected={selected}
              formId={FORM_ID}
              activeCount={activeChips.length}
              resultCount={allResults.length}
              clearAllHref={clearAllHref}
            />
            <div className="flex items-end gap-3">
              <Select id="sort" name="sort" label="Sort by" form={FORM_ID} defaultValue={sort} className="min-w-32 flex-1">
                <option value="relevance">Most relevant</option>
                <option value="title">Course title (A–Z)</option>
                <option value="start">Start date</option>
              </Select>
              <Button type="submit" form={FORM_ID} variant="secondary" size="medium">
                Update results
              </Button>
            </div>
          </div>

          {activeChips.length > 0 ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <Link
                  key={`${chip.key}-${chip.value}`}
                  href={hrefWithoutChip(chip.key, chip.value)}
                  className="type-label-m inline-flex h-target-sm items-center gap-2 rounded-full border-2 border-line-brand bg-brand-subtle px-4 text-fg-info focus-visible:focus-ring"
                >
                  {chip.label}
                  <X className="size-4" aria-hidden="true" />
                </Link>
              ))}
              <Link href={clearAllHref} className="type-link-m text-fg-link focus-visible:focus-highlight">
                Clear all
              </Link>
            </div>
          ) : null}

          <p className="type-body-m mt-6 text-fg-secondary">
            {allResults.length} course{allResults.length === 1 ? "" : "s"} found
          </p>

          {results.length > 0 ? (
            <Reveal className="mt-4 flex flex-col gap-4">
              {results.map((course) => (
                <div key={course.id} className="flex flex-col gap-2">
                  <CourseCard course={course} layout="horizontal" />
                  <CompareCheckbox courseId={course.id} courseTitle={course.title} />
                </div>
              ))}
            </Reveal>
          ) : (
            <p className="type-body-m mt-4 text-fg-secondary">
              No courses match your filters.{" "}
              <Link href={clearAllHref} className="text-fg-link focus-visible:focus-highlight">
                Clear all filters
              </Link>{" "}
              and try again.
            </p>
          )}

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              buildHref={(targetPage) => buildQuery({ q, sort, page: targetPage, ...selected })}
            />
          </div>
        </div>
      </div>

      <CompareBar />
    </div>
  );
}
