import { EventCard } from "./EventCard";
import type { Event } from "@/lib/events";

// Auto-scrolling track: approved exception to the "no looping animation" rule for this
// section only. Pauses on hover/focus and is frozen under prefers-reduced-motion (see
// design/tailwind-theme.css). The duplicated half is `inert` so it's invisible to AT/keyboard.
export function EventsMarquee({ events }: { events: Event[] }) {
  if (events.length === 0) return null;

  return (
    <div className="marquee-mask overflow-hidden">
      <div className="animate-marquee gap-gutter flex w-max">
        {events.map((event) => (
          <div key={event.id} className="w-80 shrink-0">
            <EventCard event={event} layout="compact" />
          </div>
        ))}
        {events.map((event) => (
          <div key={`dup-${event.id}`} className="w-80 shrink-0" inert>
            <EventCard event={event} layout="compact" />
          </div>
        ))}
      </div>
    </div>
  );
}
