import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import type { Event } from "@/lib/events";
import { getEventTypeById } from "@/lib/events";
import { imageFocalPoint } from "@/lib/images";
import { Badge } from "./Badge";
import { DateBadge } from "./DateBadge";

export const EVENT_BADGE_TONE_MAP: Record<
  string,
  "blue" | "green" | "neutral" | "yellow" | "purple" | "orange" | "error"
> = {
  Blue: "blue",
  Green: "green",
  Neutral: "neutral",
  Yellow: "yellow",
  Purple: "purple",
  Orange: "orange",
};

export function EventCard({
  event,
  layout = "vertical",
}: {
  event: Event;
  layout?: "vertical" | "compact";
}) {
  const type = getEventTypeById(event.type);
  const tone = type
    ? (EVENT_BADGE_TONE_MAP[type.badgeTone] ?? "neutral")
    : "neutral";
  const time = new Date(event.start).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group flex overflow-hidden rounded-lg border border-line-subtle bg-surface shadow-sm transition-shadowtransition duration-500 ease-standard hover:-translate-y-4 hover:border-line-brand hover:shadow-md focus-visible:focus-ring ${
        layout === "vertical" ? "flex-col" : "gap-4"
      }`}
    >
      {layout === "vertical" ? (
        <div className="relative h-media-card w-full shrink-0">
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover"
            style={{ objectPosition: imageFocalPoint(event.image) }}
          />
          <div className="absolute left-4 top-4">
            <DateBadge date={event.start} tone="light" />
          </div>
        </div>
      ) : (
        <div className="shrink-0 p-4">
          <DateBadge date={event.start} tone="brand" />
        </div>
      )}
      <div
        className={`flex flex-1 flex-col gap-2 ${layout === "vertical" ? "p-5" : "py-4 pr-4"}`}
      >
        {type ? (
          <Badge emphasis="subtle" tone={tone}>
            {type.label}
          </Badge>
        ) : null}
        <h3 className="type-h4 text-fg group-hover:text-fg-link group-hover:underline">
          {event.title}
        </h3>
        <div className="type-body-s flex flex-wrap items-center gap-4 text-fg-secondary">
          <span className="flex items-center gap-2">
            <Clock className="size-5 text-icon-brand" aria-hidden="true" />
            {time}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="size-5 text-icon-brand" aria-hidden="true" />
            {event.location}
          </span>
        </div>
        {layout === "vertical" ? (
          <p className="type-body-s line-clamp-2 text-fg-secondary">
            {event.summary}
          </p>
        ) : null}
        <span className="type-link-s mt-auto text-fg-link">
          Book your place →
        </span>
      </div>
    </Link>
  );
}
