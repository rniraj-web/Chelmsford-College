import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export function FeatureCard({
  tone = "default",
  icon: Icon,
  title,
  children,
  href,
  linkLabel = "Find out more",
}: {
  tone?: "default" | "brand";
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  href: string;
  linkLabel?: string;
}) {
  const isBrand = tone === "brand";

  return (
    <Link
      href={href}
      className={`group block rounded-lg p-6 transition-shadow duration-120 ease-standard hover:shadow-md focus-visible:focus-ring ${
        isBrand ? "bg-brand-subtle" : "border border-line-subtle bg-surface"
      }`}
    >
      <span className="mb-4 flex size-control-lg items-center justify-center rounded-full bg-brand text-fg-on-brand">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="type-h5 text-fg">{title}</h3>
      <p className="type-body-s mt-2 text-fg-secondary">{children}</p>
      <span className="type-link-s mt-3 inline-block text-fg-link group-hover:text-fg-link-hover">{linkLabel} →</span>
    </Link>
  );
}
