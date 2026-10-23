import { Check } from "lucide-react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  count?: number;
  error?: boolean;
}

export function Checkbox({ id, label, count, error, className, ...rest }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 py-3 ${rest.disabled ? "text-fg-disabled" : "text-fg"} ${className ?? ""}`}
    >
      <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          className={`peer size-6 shrink-0 appearance-none rounded-sm border-2 bg-surface checked:border-line-brand checked:bg-brand focus-visible:focus-ring disabled:bg-surface-disabled ${
            error ? "border-line-error" : "border-line-strong"
          }`}
          {...rest}
        />
        <Check
          className="pointer-events-none absolute size-4 text-fg-on-brand opacity-0 peer-checked:opacity-100"
          aria-hidden="true"
        />
      </span>
      <span className="type-body-m flex-1">{label}</span>
      {typeof count === "number" ? <span className="type-body-s text-fg-secondary">{count}</span> : null}
    </label>
  );
}
