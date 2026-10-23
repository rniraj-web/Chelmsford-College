"use client";

import { AlertTriangle, CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { Link } from "./Link";

const TONE_CONFIG = {
  info: { icon: Info, bg: "bg-info-subtle", text: "text-fg-info", border: "border-line-brand" },
  success: { icon: CircleCheck, bg: "bg-success-subtle", text: "text-fg-success", border: "border-line-success" },
  warning: { icon: AlertTriangle, bg: "bg-warning-subtle", text: "text-fg-warning", border: "border-line-warning" },
  error: { icon: CircleAlert, bg: "bg-error-subtle", text: "text-fg-error", border: "border-line-error" },
} as const;

export function Alert({
  tone,
  title,
  children,
  action,
  onDismiss,
}: {
  tone: keyof typeof TONE_CONFIG;
  title: string;
  children?: React.ReactNode;
  action?: { href: string; label: string };
  onDismiss?: () => void;
}) {
  const { icon: Icon, bg, text, border } = TONE_CONFIG[tone];

  return (
    <div role={tone === "error" ? "alert" : "status"} className={`flex gap-3 rounded-lg border-l-4 p-4 ${bg} ${border}`}>
      <Icon className={`size-6 shrink-0 ${text}`} aria-hidden="true" />
      <div className="flex-1">
        <h2 className={`type-h6 ${text}`}>{title}</h2>
        {children ? <p className="type-body-s mt-1 text-fg-secondary">{children}</p> : null}
        {action ? (
          <Link href={action.href} size="s" className="mt-2">
            {action.label}
          </Link>
        ) : null}
      </div>
      {onDismiss ? (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" className="shrink-0 text-icon-secondary focus-visible:focus-ring">
          <X className="size-5" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
