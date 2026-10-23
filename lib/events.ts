import eventsData from "@/data/events.json";

export interface EventType {
  id: string;
  label: string;
  badgeTone: string;
}

export interface Event {
  id: number;
  slug: string;
  title: string;
  type: string;
  start: string;
  end: string;
  location: string;
  online: boolean;
  cost: string;
  audience: string;
  summary: string;
  description: string[];
  whatToExpect: string[];
  howToBook: string;
  bookingUrl: string | null;
  image: string;
  placeholder: boolean;
}

export interface EventFilters {
  type?: string;
  month?: string; // "2026-11"
}

const allEvents = eventsData.events as Event[];
const eventTypes = eventsData.eventTypes as EventType[];

export function getEvents(filters: EventFilters = {}): Event[] {
  return allEvents
    .filter((event) => {
      if (filters.type && event.type !== filters.type) return false;
      if (filters.month && !event.start.startsWith(filters.month)) return false;
      return true;
    })
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function getEventBySlug(slug: string): Event | undefined {
  return allEvents.find((event) => event.slug === slug);
}

export function getEventTypes(): EventType[] {
  return eventTypes;
}

export function getEventTypeById(id: string): EventType | undefined {
  return eventTypes.find((type) => type.id === id);
}
