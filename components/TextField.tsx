import type { LucideIcon } from "lucide-react";
import { CircleAlert } from "lucide-react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  leadingIcon?: LucideIcon;
}

export function TextField({
  id,
  label,
  hint,
  error,
  leadingIcon: LeadingIcon,
  className,
  autoComplete,
  ...rest
}: TextFieldProps) {
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
        {LeadingIcon ? (
          <LeadingIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-icon-secondary" aria-hidden="true" />
        ) : null}
        <input
          id={id}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`type-body-m h-12 w-full rounded-md border-2 px-4 text-fg placeholder:text-fg-secondary focus-visible:focus-ring disabled:bg-surface-disabled disabled:text-fg-disabled ${
            LeadingIcon ? "pl-12" : ""
          } ${error ? "border-line-error" : "border-line-strong hover:border-line-brand focus:border-line-brand"}`}
          {...rest}
        />
      </div>
    </div>
  );
}
