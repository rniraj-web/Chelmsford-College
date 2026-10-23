import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function MenuItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="type-h5 flex h-control-lg items-center justify-between border-b border-line-subtle text-fg focus-visible:focus-ring"
    >
      {label}
      <ChevronRight className="size-6 text-icon-brand" aria-hidden="true" />
    </Link>
  );
}
