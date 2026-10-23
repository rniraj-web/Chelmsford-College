import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  for (let page = 1; page <= total; page++) {
    if (page === 1 || page === total || Math.abs(page - current) <= 1) {
      pages.push(page);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }
  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between">
      {/* Mobile */}
      <div className="flex w-full items-center justify-between md:hidden">
        <Link
          href={buildHref(currentPage - 1)}
          aria-disabled={prevDisabled}
          className={`type-link-m flex items-center gap-1 focus-visible:focus-highlight ${
            prevDisabled ? "pointer-events-none text-fg-disabled" : "text-fg-link"
          }`}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
          Previous
        </Link>
        <p className="type-body-s text-fg-secondary">
          Page {currentPage} of {totalPages}
        </p>
        <Link
          href={buildHref(currentPage + 1)}
          aria-disabled={nextDisabled}
          className={`type-link-m flex items-center gap-1 focus-visible:focus-highlight ${
            nextDisabled ? "pointer-events-none text-fg-disabled" : "text-fg-link"
          }`}
        >
          Next
          <ChevronRight className="size-5" aria-hidden="true" />
        </Link>
      </div>

      {/* Desktop */}
      <ul className="hidden items-center gap-2 md:flex">
        {getPageNumbers(currentPage, totalPages).map((page, index) =>
          page === "ellipsis" ? (
            <li key={`ellipsis-${index}`} className="type-body-s px-2 text-fg-secondary">
              …
            </li>
          ) : (
            <li key={page}>
              <Link
                href={buildHref(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`type-body-s-strong flex size-target-sm items-center justify-center rounded-md focus-visible:focus-ring ${
                  page === currentPage ? "bg-brand text-fg-on-brand" : "text-fg hover:bg-surface-hover"
                }`}
              >
                {page}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
