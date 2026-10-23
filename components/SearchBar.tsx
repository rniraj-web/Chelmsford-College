import { Search } from "lucide-react";

interface SearchBarProps {
  size?: "hero" | "compact";
  defaultValue?: string;
  action?: string;
  id?: string;
  formId?: string;
  className?: string;
}

export function SearchBar({
  size = "compact",
  defaultValue,
  action = "/courses",
  id,
  formId,
  className,
}: SearchBarProps) {
  const isHero = size === "hero";
  const Wrapper = formId ? "div" : "form";
  const inputId = id ?? `search-${size}`;

  const inputField = (
    <input
      id={inputId}
      type="search"
      name="q"
      form={formId}
      defaultValue={defaultValue}
      placeholder="Search courses"
      autoComplete="off"
      className={`h-full flex-1 bg-transparent px-4 text-fg outline-none placeholder:text-fg-secondary focus-visible:focus-ring ${
        isHero ? "type-body-l" : "type-body-m"
      }`}
    />
  );

  const submitButton = isHero ? (
    <button
      type="submit"
      form={formId}
      className="type-button-m inline-flex h-12 items-center gap-2 rounded-sm bg-brand px-5 text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring"
    >
      <Search className="size-5" aria-hidden="true" />
      Search
    </button>
  ) : (
    <button
      type="submit"
      form={formId}
      aria-label="Search"
      className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-brand text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring"
    >
      <Search className="size-5" aria-hidden="true" />
    </button>
  );

  return (
    <Wrapper
      {...(formId ? {} : { role: "search", action, method: "get" })}
      className={`flex items-center rounded-md border-2 border-line-strong bg-surface focus-within:border-line-brand ${
        isHero ? "h-control-lg gap-2 p-1" : "h-12"
      } ${className ?? ""}`}
    >
      <label htmlFor={inputId} className="sr-only">
        Search courses
      </label>
      {inputField}
      {submitButton}
    </Wrapper>
  );
}
