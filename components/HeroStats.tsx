"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Users, BookOpen, User, Building2, Calendar } from "lucide-react";
import type { Event } from "@/lib/events";

// shortcut: placeholder figures supplied for layout only (see PLACEHOLDERS.md) —
// replace with the college's real headcounts before launch.
const STATS = [
  { icon: Users, value: "3,771", label: "Students" },
  { icon: BookOpen, value: "317", label: "Programmes" },
  { icon: User, value: "192", label: "Teachers" },
  { icon: Building2, value: "2", label: "Campuses" },
];

// Counts up from 0 once the card scrolls into view. Starts rendered at the
// real value (correct before hydration/with JS off) and only resets to 0 to
// animate once in view; skipped entirely under prefers-reduced-motion.
function AnimatedNumber({ value }: { value: string }) {
  const target = Number(value.replace(/,/g, "")) || 0;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.2, 0, 0, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, target]);

  return <span ref={ref}>{display.toLocaleString("en-GB")}</span>;
}

export function HeroStats({ latestEvent }: { latestEvent: Event }) {
  const eventDate = new Date(latestEvent.start).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {STATS.map((stat) => (
        <div key={stat.label} className="flex items-center gap-3 rounded-xl bg-surface p-4 shadow-lg md:gap-4 md:p-6">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-icon-brand md:size-14">
            <stat.icon className="size-6 md:size-7" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="type-h3 text-fg">
              <AnimatedNumber value={stat.value} />
            </p>
            <p className="type-body-s text-fg-secondary">{stat.label}</p>
          </div>
        </div>
      ))}
      <Link
        href={`/events/${latestEvent.slug}`}
        className="col-span-2 flex flex-col justify-center gap-2 rounded-xl bg-brand-strong p-4 shadow-lg transition-colors duration-120 ease-standard hover:bg-brand-pressed focus-visible:focus-ring md:p-6 lg:col-span-1"
      >
        <span className="type-label-m flex items-center gap-2 text-fg-inverse">
          <Calendar className="size-5" aria-hidden="true" />
          Upcoming Event
        </span>
        <p className="type-h5 text-fg-inverse">{latestEvent.title}</p>
        <p className="type-body-s text-fg-inverse">{eventDate}</p>
        <span className="type-link-s text-fg-inverse">View event →</span>
      </Link>
    </div>
  );
}
