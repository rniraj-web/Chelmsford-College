import { Button } from "./Button";

export function StickyApplyBar({
  title,
  subtitle,
  applyHref,
}: {
  title: string;
  subtitle: string;
  applyHref: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-line-subtle bg-surface p-4 shadow-lg lg:hidden">
      <div className="min-w-0">
        <p className="type-body-s-strong truncate text-fg">{title}</p>
        <p className="type-body-s truncate text-fg-secondary">{subtitle}</p>
      </div>
      <Button
        href={applyHref}
        variant="primary"
        size="medium"
        className="shrink-0"
      >
        Apply now
      </Button>
    </div>
  );
}
