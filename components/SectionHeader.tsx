import Link from "next/link";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  viewAllHref,
  viewAllLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow ? <p className="type-overline text-fg-accent">{eyebrow}</p> : null}
        <h2 className="type-h2 mt-1 text-fg">{title}</h2>
        {intro ? <p className="type-body-l mt-2 max-w-prose text-fg-secondary">{intro}</p> : null}
      </div>
      {viewAllHref ? (
        <Link href={viewAllHref} className="type-link-m shrink-0 text-fg-link focus-visible:focus-highlight">
          {viewAllLabel} →
        </Link>
      ) : null}
    </div>
  );
}
