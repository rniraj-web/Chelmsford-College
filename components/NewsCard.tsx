import Image from "next/image";
import Link from "next/link";
import { imageFocalPoint } from "@/lib/images";

export function NewsCard({
  href,
  image,
  date,
  title,
  excerpt,
}: {
  href: string;
  image: string;
  date: string;
  title: string;
  excerpt: string;
}) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg border border-line-subtle bg-surface shadow-sm transition-shadow duration-120 ease-standard hover:border-line-brand hover:shadow-md focus-visible:focus-ring"
    >
      <div className="relative h-media-card w-full">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover"
          style={{ objectPosition: imageFocalPoint(image) }}
        />
      </div>
      <div className="flex flex-col gap-2 p-5">
        <p className="type-overline text-fg-accent">News · {date}</p>
        <h3 className="type-h4 text-fg group-hover:text-fg-link group-hover:underline">{title}</h3>
        <p className="type-body-s line-clamp-2 text-fg-secondary">{excerpt}</p>
      </div>
    </Link>
  );
}
