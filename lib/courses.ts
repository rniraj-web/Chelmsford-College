import coursesData from "@/data/courses.json";

export interface Course {
  id: number;
  title: string;
  sectionId: number;
  mode: string;
  appType: string | null;
  duration: string | null;
  days: string | null;
  qualificationHtml: string | null;
  additionalQualsHtml: string | null;
  courseCode: string | null;
  shortCode: string | null;
  learningAim: string | null;
  level: string | null;
  startDateRaw: string | null;
  studyOverviewHtml: string | null;
  employabilityHtml: string | null;
  eligibilityHtml: string | null;
  eligibilitySpecificHtml: string | null;
  assessmentHtml: string | null;
  feesHtml: string | null;
  additionalFeesHtml: string | null;
  fundingHtml: string | null;
  contactHtml: string | null;
  metaDescriptionHtml: string | null;
  seoTitle: string | null;
  seoH1: string | null;
  seoH2: string | null;
  applyFormType: string | null;
  courseForMeHtml: string | null;
  year: string | null;
  published: boolean;
  derived: {
    startDate: string;
    startDateLabel: string;
    level: string;
    subject: string;
    modeLabel: string;
    slug: string;
    image: string;
    contactEmail: string | null;
    feesText: string | null;
    additionalFeesText: string | null;
    summary: string;
  };
}

export type CourseSort = "relevance" | "title" | "start";

export interface CourseFilters {
  subject?: string[];
  level?: string[];
  mode?: string[];
  campus?: string[];
  ageGroup?: string[];
  q?: string;
  sort?: CourseSort;
}

const allCourses = coursesData.courses as Course[];

const publishedCourses = allCourses.filter((course) => course.published);

export const PLACEHOLDER_CAMPUS = "Princes Road campus";
export const PLACEHOLDER_AGE_GROUP = "All ages";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function matchesFacet(value: string, selected: string[] | undefined) {
  return !selected?.length || selected.includes(slugify(value));
}

export function getCourses(filters: CourseFilters = {}): Course[] {
  const q = filters.q?.trim().toLowerCase();

  const filtered = publishedCourses.filter((course) => {
    if (!matchesFacet(course.derived.subject, filters.subject)) return false;
    if (!matchesFacet(course.derived.level, filters.level)) return false;
    if (!matchesFacet(course.derived.modeLabel, filters.mode)) return false;
    if (!matchesFacet(PLACEHOLDER_CAMPUS, filters.campus)) return false;
    if (!matchesFacet(PLACEHOLDER_AGE_GROUP, filters.ageGroup)) return false;
    if (q && !course.title.toLowerCase().includes(q)) return false;
    return true;
  });

  if (filters.sort === "title") {
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }
  if (filters.sort === "start") {
    return [...filtered].sort((a, b) =>
      a.derived.startDate.localeCompare(b.derived.startDate),
    );
  }
  return filtered;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return publishedCourses.find((course) => course.derived.slug === slug);
}

export function getCourseById(id: number): Course | undefined {
  return publishedCourses.find((course) => course.id === id);
}

export interface Facet {
  value: string;
  label: string;
  count: number;
}

export interface Facets {
  subject: Facet[];
  level: Facet[];
  mode: Facet[];
  campus: Facet[];
  ageGroup: Facet[];
}

function buildFacet(
  courses: Course[],
  getLabel: (course: Course) => string,
): Facet[] {
  const counts = new Map<string, number>();
  for (const course of courses) {
    const label = getLabel(course);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([label, count]) => ({ value: slugify(label), label, count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export interface CourseFacetSummary {
  subject: string;
  level: string;
  mode: string;
}

export function getCourseFacetSummaries(): CourseFacetSummary[] {
  return publishedCourses.map((course) => ({
    subject: slugify(course.derived.subject),
    level: slugify(course.derived.level),
    mode: slugify(course.derived.modeLabel),
  }));
}

export function getFacets(): Facets {
  return {
    subject: buildFacet(publishedCourses, (c) => c.derived.subject),
    level: buildFacet(publishedCourses, (c) => c.derived.level),
    mode: buildFacet(publishedCourses, (c) => c.derived.modeLabel),
    campus: buildFacet(publishedCourses, () => PLACEHOLDER_CAMPUS),
    ageGroup: buildFacet(publishedCourses, () => PLACEHOLDER_AGE_GROUP),
  };
}
