import type { LucideIcon } from "lucide-react";
import { Button } from "./Button";

export interface KeyFactData {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function KeyFact({ icon: Icon, label, value }: KeyFactData) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-6 shrink-0 text-icon-brand" aria-hidden="true" />
      <div>
        <p className="type-body-s text-fg-secondary">{label}</p>
        <p className="type-body-m-strong text-fg">{value}</p>
      </div>
    </div>
  );
}

export function KeyFactsPanel({
  facts,
  applyHref,
  downloadHref,
}: {
  facts: KeyFactData[];
  applyHref: string;
  downloadHref: string;
}) {
  return (
    <div className="rounded-lg bg-brand-subtle p-5 lg:sticky lg:top-24 lg:bg-surface lg:p-6 lg:shadow-sm">
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-1 lg:gap-4">
        {facts.map((fact) => (
          <KeyFact key={fact.label} {...fact} />
        ))}
      </div>
      <div className="mt-5 hidden flex-col gap-3 lg:mt-6 lg:flex">
        <Button href={applyHref} variant="primary" size="large" className="w-full">
          Apply now
        </Button>
        <Button href={downloadHref} variant="secondary" size="large" className="w-full">
          Download course guide
        </Button>
      </div>
    </div>
  );
}
