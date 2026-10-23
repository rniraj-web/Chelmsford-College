import { CircleAlert } from "lucide-react";

export interface ErrorSummaryItem {
  fieldId: string;
  message: string;
}

export function ErrorSummary({ errors, title = "There is a problem" }: { errors: ErrorSummaryItem[]; title?: string }) {
  if (errors.length === 0) return null;

  return (
    <div role="alert" tabIndex={-1} className="rounded-lg border-l-4 border-line-error bg-error-subtle p-4">
      <h2 className="type-h6 flex items-center gap-2 text-fg-error">
        <CircleAlert className="size-6" aria-hidden="true" />
        {title}
      </h2>
      <ul className="type-body-s mt-3 flex flex-col gap-2">
        {errors.map((error) => (
          <li key={error.fieldId}>
            <a href={`#${error.fieldId}`} className="text-fg-link focus-visible:focus-highlight">
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
