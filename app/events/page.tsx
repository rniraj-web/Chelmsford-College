import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { EventCard } from "@/components/EventCard";
import { Reveal } from "@/components/Reveal";
import { getEvents, getEventTypes, type Event } from "@/lib/events";

function buildQuery(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const qs = search.toString();
  return qs ? `/events?${qs}` : "/events";
}

function monthLabel(month: string) {
  const [year, m] = month.split("-").map(Number);
  return new Date(year, m - 1, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

function chipClasses(active: boolean) {
  return `type-label-m inline-flex h-target-sm items-center rounded-full px-4 focus-visible:focus-ring ${
    active
      ? "border-2 border-line-brand bg-brand-subtle text-fg-info"
      : "border border-line-strong text-fg hover:border-line-brand hover:bg-surface-hover"
  }`;
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const type = typeof sp.type === "string" ? sp.type : undefined;
  const month = typeof sp.month === "string" ? sp.month : undefined;

  const eventTypes = getEventTypes();
  const allMonths = Array.from(
    new Set(getEvents().map((event) => event.start.slice(0, 7))),
  );
  const events = getEvents({ type, month });

  const groups = events.reduce<Record<string, Event[]>>((acc, event) => {
    const key = event.start.slice(0, 7);
    (acc[key] ??= []).push(event);
    return acc;
  }, {});

  return (
    <div className="container-page section-y flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/events", label: "Events" },
        ]}
      />

      <div>
        <h1 className="type-h1 text-fg">Events</h1>
        <p className="type-body-l mt-2 max-w-prose text-fg-secondary">
          Open evenings, taster days and information sessions, book your place
          online.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by event type"
        >
          <Link
            href={buildQuery({ month })}
            aria-current={!type ? "true" : undefined}
            className={chipClasses(!type)}
          >
            All
          </Link>
          {eventTypes.map((eventType) => (
            <Link
              key={eventType.id}
              href={buildQuery({ type: eventType.id, month })}
              aria-current={type === eventType.id ? "true" : undefined}
              className={chipClasses(type === eventType.id)}
            >
              {eventType.label}
            </Link>
          ))}
        </div>

        <form method="get" action="/events" className="flex items-end gap-3">
          {type ? <input type="hidden" name="type" value={type} /> : null}
          <Select
            id="month"
            name="month"
            label="Month"
            defaultValue={month ?? ""}
            className="min-w-40"
          >
            <option value="">All dates</option>
            {allMonths.map((m) => (
              <option key={m} value={m}>
                {monthLabel(m)}
              </option>
            ))}
          </Select>
          <Button type="submit" variant="secondary" size="medium">
            Update
          </Button>
        </form>
      </div>

      {events.length === 0 ? (
        <p className="type-body-m text-fg-secondary">
          No events match your filters.{" "}
          <Link
            href="/events"
            className="text-fg-link focus-visible:focus-highlight"
          >
            Clear all filters
          </Link>{" "}
          and try again.
        </p>
      ) : (
        Object.entries(groups).map(([monthKey, monthEvents]) => (
          <Reveal key={monthKey} className="flex flex-col gap-4">
            <h2 className="type-h3 text-fg">{monthLabel(monthKey)}</h2>
            <div className="flex flex-col gap-4 lg:hidden">
              {monthEvents.map((event) => (
                <EventCard key={event.id} event={event} layout="compact" />
              ))}
            </div>
            <div className="gap-gutter hidden lg:grid lg:grid-cols-3">
              {monthEvents.map((event) => (
                <EventCard key={event.id} event={event} layout="vertical" />
              ))}
            </div>
          </Reveal>
        ))
      )}
    </div>
  );
}
