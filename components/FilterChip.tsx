"use client";

import { Check, X } from "lucide-react";

interface FilterChipProps {
  selected: boolean;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
  children: React.ReactNode;
}

export function FilterChip({ selected, removable, onClick, onRemove, className, children }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`type-label-m inline-flex h-target-sm items-center gap-2 rounded-full px-4 transition-colors duration-120 ease-standard focus-visible:focus-ring ${
        selected
          ? "border-2 border-line-brand bg-brand-subtle text-fg-info"
          : "border border-line-strong text-fg hover:border-line-brand hover:bg-surface-hover"
      } ${className ?? ""}`}
    >
      {selected ? <Check className="size-4" aria-hidden="true" /> : null}
      {children}
      {selected && removable ? (
        <X
          className="size-4"
          aria-hidden="true"
          onClick={(event) => {
            event.stopPropagation();
            onRemove?.();
          }}
        />
      ) : null}
    </button>
  );
}
