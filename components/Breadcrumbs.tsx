import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  href: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const parent = items[items.length - 2];
  const current = items[items.length - 1];

  return (
    <nav aria-label="Breadcrumb">
      {parent ? (
        <Link
          href={parent.href}
          className="type-link-m flex items-center gap-1 text-fg-link focus-visible:focus-highlight md:hidden"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
          Back to {parent.label}
        </Link>
      ) : null}
      <ol className="type-body-s hidden items-center gap-2 md:flex">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <ChevronRight className="size-4 text-icon-secondary" aria-hidden="true" /> : null}
              {isCurrent ? (
                <span aria-current="page" className="text-fg-secondary">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-fg-link focus-visible:focus-highlight">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      {current && !parent ? <span className="sr-only">{current.label}</span> : null}
    </nav>
  );
}
