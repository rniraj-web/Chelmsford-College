import Image from "next/image";
import { imageFocalPoint } from "@/lib/images";
import { Button } from "./Button";

export function CampaignBanner({
  tone = "brand",
  image,
  title,
  children,
  ctaHref,
  ctaLabel,
}: {
  tone?: "brand" | "accent";
  image: string;
  title: string;
  children: React.ReactNode;
  ctaHref: string;
  ctaLabel: string;
}) {
  const isBrand = tone === "brand";

  return (
    <div
      className={`overflow-hidden rounded-xl lg:flex ${isBrand ? "bg-gradient-brand-deep text-fg-inverse" : "bg-accent text-fg-on-accent"}`}
    >
      <div className="relative h-media-card w-full lg:h-auto lg:w-2/5">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover"
          style={{ objectPosition: imageFocalPoint(image) }}
        />
      </div>
      <div className="flex flex-col gap-3 p-6 lg:justify-center lg:p-10">
        <h3 className="type-h3">{title}</h3>
        <p className="type-body-m">{children}</p>
        <Button href={ctaHref} variant={isBrand ? "inverse" : "secondary"} size="medium" className="mt-2 self-start">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
