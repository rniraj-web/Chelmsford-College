interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  count?: number;
  error?: boolean;
}

export function Radio({ id, label, count, error, className, ...rest }: RadioProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 py-3 ${rest.disabled ? "text-fg-disabled" : "text-fg"} ${className ?? ""}`}
    >
      <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
        <input
          id={id}
          type="radio"
          className={`peer size-6 shrink-0 appearance-none rounded-full border-2 bg-surface checked:border-line-brand focus-visible:focus-ring disabled:bg-surface-disabled ${
            error ? "border-line-error" : "border-line-strong"
          }`}
          {...rest}
        />
        <span className="pointer-events-none absolute size-3 scale-0 rounded-full bg-brand transition-transform duration-120 ease-standard peer-checked:scale-100" />
      </span>
      <span className="type-body-m flex-1">{label}</span>
      {typeof count === "number" ? <span className="type-body-s text-fg-secondary">{count}</span> : null}
    </label>
  );
}
