import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SubjectTile({
  href,
  image,
  label,
  count,
}: {
  href: string;
  image: string;
  label: string;
  count: number;
}) {
  const countLabel = `${count} course${count === 1 ? "" : "s"}`;

  return (
    <>
      <Link
        href={href}
        className="group flex items-center gap-4 rounded-lg border border-line-subtle bg-surface p-3 transition-colors duration-120 ease-standard hover:border-line-brand hover:bg-surface-hover focus-visible:focus-ring md:hidden"
      >
        <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
          <Image
            src={image}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="type-h5 text-fg group-hover:text-fg-link">{label}</h3>
          <p className="type-body-s text-fg-secondary">{countLabel}</p>
        </div>
        <ArrowRight
          className="size-5 shrink-0 text-icon-brand"
          aria-hidden="true"
        />
      </Link>

      {/* Tablet/desktop: image tile with overlay, as per the design system. */}
      <Link
        href={href}
        className="group relative hidden aspect-square shrink-0 overflow-hidden rounded-lg transition duration-520 ease-standard hover:z-10 hover:scale-105 hover:shadow-lg focus-visible:focus-ring md:block"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 300px, 40vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-overlay-hero-bottom" />
        <div className="absolute inset-x-0 bottom-0 p-4 pr-16">
          <h3 className="type-h4 text-fg-inverse">{label}</h3>
          <p className="type-body-s text-fg-inverse">{countLabel}</p>
        </div>
        <span className="absolute bottom-4 right-4 flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-fg-brand transition-colors duration-120 ease-standard group-hover:bg-accent group-hover:text-fg-on-accent">
          <ArrowRight className="size-5" aria-hidden="true" />
        </span>
      </Link>
    </>
  );
}
