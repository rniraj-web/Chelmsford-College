import { CircleAlert, ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export function Select({ id, label, hint, error, className, children, ...rest }: SelectProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="type-label-l mb-2 block text-fg">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="type-body-s mb-2 text-fg-secondary">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="type-body-s-strong mb-2 flex items-center gap-2 text-fg-error">
          <CircleAlert className="size-5" aria-hidden="true" />
          {error}
        </p>
      ) : null}
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`type-body-m h-12 w-full appearance-none rounded-md border-2 bg-surface px-4 pr-12 text-fg focus-visible:focus-ring disabled:bg-surface-disabled disabled:text-fg-disabled ${
            error ? "border-line-error" : "border-line-strong hover:border-line-brand focus:border-line-brand"
          }`}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2 text-icon-secondary"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
