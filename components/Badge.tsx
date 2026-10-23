import type { LucideIcon } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

const badge = tv({
  base: "type-label-s inline-flex items-center gap-1 rounded-full px-3 py-1",
  variants: {
    emphasis: { subtle: "", solid: "" },
    tone: {
      blue: "",
      green: "",
      neutral: "",
      yellow: "",
      purple: "",
      orange: "",
      error: "",
    },
  },
  compoundVariants: [
    { emphasis: "subtle", tone: "blue", class: "bg-brand-subtle text-fg-info" },
    { emphasis: "subtle", tone: "green", class: "bg-accent-subtle text-fg-accent" },
    { emphasis: "subtle", tone: "neutral", class: "bg-surface-muted text-fg" },
    { emphasis: "subtle", tone: "yellow", class: "bg-highlight-subtle text-fg-warning" },
    { emphasis: "subtle", tone: "purple", class: "bg-purple-subtle text-fg-purple" },
    { emphasis: "subtle", tone: "orange", class: "bg-orange-subtle text-fg-orange" },
    { emphasis: "subtle", tone: "error", class: "bg-error-subtle text-fg-error" },
    { emphasis: "solid", tone: "blue", class: "bg-brand text-fg-on-brand" },
    { emphasis: "solid", tone: "green", class: "bg-accent text-fg-on-accent" },
    { emphasis: "solid", tone: "neutral", class: "bg-surface-inverse text-fg-inverse" },
    { emphasis: "solid", tone: "yellow", class: "bg-highlight text-fg-on-highlight" },
    { emphasis: "solid", tone: "purple", class: "bg-purple-600 text-fg-inverse" },
    { emphasis: "solid", tone: "orange", class: "bg-orange-500 text-fg-on-highlight" },
    { emphasis: "solid", tone: "error", class: "bg-error text-fg-inverse" },
  ],
  defaultVariants: { emphasis: "subtle", tone: "neutral" },
});

type BadgeVariants = VariantProps<typeof badge>;

export function Badge({
  emphasis,
  tone,
  icon: Icon,
  className,
  children,
}: BadgeVariants & { icon?: LucideIcon; className?: string; children: React.ReactNode }) {
  return (
    <span className={badge({ emphasis, tone, className })}>
      {Icon ? <Icon className="size-4" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
