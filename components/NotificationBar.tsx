"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, X } from "lucide-react";

export function NotificationBar({
  tone = "brand",
  children,
  action,
}: {
  tone?: "brand" | "highlight";
  children: React.ReactNode;
  action?: { href: string; label: string };
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const isHighlight = tone === "highlight";

  return (
    <div className={`${isHighlight ? "bg-highlight text-fg-on-highlight" : "bg-brand text-fg-on-brand"}`}>
      <div className="container-page flex items-center gap-3 py-3">
        <Calendar className="size-5 shrink-0" aria-hidden="true" />
        <p className="type-body-s-strong flex-1">
          {children}
          {action ? (
            <Link href={action.href} className="type-link-s ml-2 inline text-inherit focus-visible:focus-highlight">
              {action.label}
            </Link>
          ) : null}
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss notification"
          className="shrink-0 focus-visible:focus-ring"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
