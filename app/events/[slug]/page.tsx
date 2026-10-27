import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Users,
  CalendarPlus,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Badge } from "@/components/Badge";
import { button } from "@/components/Button";
import { BookEventButton } from "@/components/BookEventButton";
import { KeyFact } from "@/components/KeyFactsPanel";
import { Alert } from "@/components/Alert";
import { EventCard, EVENT_BADGE_TONE_MAP } from "@/components/EventCard";
import { imageFocalPoint } from "@/lib/images";
import {
  getEventBySlug,
  getEventTypeById,
  getEvents,
  type Event,
} from "@/lib/events";

function toIcsDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// shortcut: minimal RFC 5545 text escaping (comma/semicolon/backslash/newline only); fine for the placeholder copy we have.
function icsEscape(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

function buildIcsHref(event: Event) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `UID:${event.slug}@chelmsfordcollege-prototype`,
    `DTSTAMP:${toIcsDate(event.start)}`,
    `DTSTART:${toIcsDate(event.start)}`,
    `DTEND:${toIcsDate(event.end)}`,
    `SUMMARY:${icsEscape(event.title)}`,
    `LOCATION:${icsEscape(event.location)}`,
    `DESCRIPTION:${icsEscape(event.summary)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const type = getEventTypeById(event.type);
  const tone = type
    ? (EVENT_BADGE_TONE_MAP[type.badgeTone] ?? "neutral")
    : "neutral";
  const date = new Date(event.start).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeRange = `${new Date(event.start).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit" })}–${new Date(
    event.end,
  ).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit" })}`;

  const otherEvents = getEvents()
    .filter((e) => e.slug !== event.slug)
    .slice(0, 3);

  const limitedPlaces = /limited/i.test(event.howToBook);

  return (
    <div className="container-page section-y flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/events", label: "Events" },
          { href: `/events/${event.slug}`, label: event.title },
        ]}
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="flex flex-1 flex-col gap-4">
          <div className="relative h-80 w-full overflow-hidden rounded-lg">
            <Image
              src={event.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
              style={{ objectPosition: imageFocalPoint(event.image) }}
            />
          </div>
          {type ? (
            <Badge emphasis="subtle" tone={tone} className="self-start">
              {type.label}
            </Badge>
          ) : null}
          <h1 className="type-h1 text-fg">{event.title}</h1>
          <p className="type-body-l text-fg-secondary">{event.summary}</p>

          <div className="grid grid-cols-2 gap-5 rounded-lg bg-brand-subtle p-5 lg:grid-cols-3">
            <KeyFact icon={Calendar} label="Date" value={date} />
            <KeyFact icon={Clock} label="Time" value={timeRange} />
            <KeyFact icon={MapPin} label="Location" value={event.location} />
            <KeyFact icon={Ticket} label="Cost" value={event.cost} />
            <KeyFact icon={Users} label="Who it's for" value={event.audience} />
          </div>

          <div className="flex flex-wrap items-start gap-3">
            <BookEventButton bookingUrl={event.bookingUrl} eventTitle={event.title} />
            <a
              href={buildIcsHref(event)}
              download={`${event.slug}.ics`}
              className={button({ variant: "secondary", size: "large" })}
            >
              <CalendarPlus className="size-5" aria-hidden="true" />
              Add to calendar
            </a>
          </div>

          <section className="flex flex-col gap-3">
            <h2 className="type-h3 text-fg">About this event</h2>
            {event.description.map((paragraph, index) => (
              <p key={index} className="type-body-m text-fg-secondary">
                {paragraph}
              </p>
            ))}
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="type-h3 text-fg">What to expect</h2>
            <ul className="type-body-m flex flex-col gap-2 text-fg-secondary">
              {event.whatToExpect.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="type-h3 text-fg">How to book</h2>
            <p className="type-body-m text-fg-secondary">{event.howToBook}</p>
            {limitedPlaces ? (
              <Alert tone="warning" title="Places are limited">
                Book early to avoid disappointment, we can&apos;t guarantee a
                place on the day.
              </Alert>
            ) : null}
          </section>

          <section className="flex flex-col gap-3 rounded-lg border border-line-subtle p-5">
            <h2 className="type-h5 flex items-center gap-2 text-fg">
              <MapPin className="size-5 text-icon-brand" aria-hidden="true" />
              {event.online ? "Joining online" : "Location"}
            </h2>
            {event.online ? (
              <p className="type-body-m text-fg-secondary">
                This event takes place online. We&apos;ll email a joining link
                after you book.
              </p>
            ) : (
              <>
                <p className="type-body-m text-fg-secondary">
                  {event.location}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-link-m text-fg-link focus-visible:focus-highlight"
                >
                  Get directions →
                </a>
              </>
            )}
          </section>
        </div>
      </div>

      {otherEvents.length > 0 ? (
        <section className="flex flex-col gap-4">
          <h2 className="type-h3 text-fg">Other events</h2>
          <div className="gap-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {otherEvents.map((e) => (
              <EventCard key={e.id} event={e} layout="compact" />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
