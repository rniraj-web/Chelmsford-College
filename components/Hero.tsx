import Image from "next/image";
import { Button } from "./Button";
import { HeroStats } from "./HeroStats";
import type { Event } from "@/lib/events";

interface HeroCopyProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  children: React.ReactNode;
  ctaHref: string;
  ctaLabel: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
}

function HeroCopy({
  eyebrow,
  title,
  titleAccent,
  children,
  ctaHref,
  ctaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
}: HeroCopyProps) {
  return (
    <div className="flex flex-col gap-4 lg:max-w-prose lg:gap-6">
      <p className="type-overline text-fg-inverse">{eyebrow}</p>
      <h1 className="type-display text-fg-inverse">
        <span className="block">{title}</span>
        {titleAccent ? <span className="block">{titleAccent}</span> : null}
      </h1>
      <p className="type-body-m text-fg-inverse lg:type-body-xl">{children}</p>
      <div className="flex flex-wrap gap-3">
        <Button href={ctaHref} variant="accent" size="large">
          {ctaLabel}
        </Button>
        {secondaryCtaHref && secondaryCtaLabel ? (
          <Button
            href={secondaryCtaHref}
            variant="inverse"
            size="large"
            className="hidden lg:inline-flex"
          >
            {secondaryCtaLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function Hero({
  image,
  eyebrow,
  title,
  titleAccent,
  children,
  ctaHref,
  ctaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
  latestEvent,
}: HeroCopyProps & {
  image: string;
  latestEvent: Event;
}) {
  const copyProps = {
    eyebrow,
    title,
    titleAccent,
    children,
    ctaHref,
    ctaLabel,
    secondaryCtaHref,
    secondaryCtaLabel,
  };

  return (
    <section>
      <div className="lg:relative lg:h-hero">
        <div className="relative h-80 w-full lg:absolute lg:inset-0 lg:h-full">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 hidden lg:block lg:bg-overlay-hero-left" />
          <div className="container-page relative hidden h-full items-center lg:flex">
            <HeroCopy {...copyProps} />
          </div>
        </div>

        <div className="bg-brand-strong py-8 lg:hidden">
          <div className="container-page">
            <HeroCopy {...copyProps} />
          </div>
        </div>
      </div>

      <div className="container-page py-6 lg:relative lg:z-10 lg:-mt-16 lg:py-0">
        <HeroStats latestEvent={latestEvent} />
      </div>
    </section>
  );
}
