function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonial({
  tone = "light",
  quote,
  name,
  // course,
}: {
  tone?: "light" | "brand";
  quote: string;
  name: string;
  // course: string;
}) {
  const isBrand = tone === "brand";

  return (
    <figure
      className={`rounded-lg p-6 lg:p-8 ${isBrand ? "bg-brand-strong text-fg-inverse" : "bg-accent-subtle text-fg"}`}
    >
      <blockquote className="type-quote">“{quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          className={`flex size-control-lg shrink-0 items-center justify-center rounded-full type-h5 ${
            isBrand ? "bg-surface text-fg-brand" : "bg-brand text-fg-on-brand"
          }`}
        >
          {initials(name)}
        </span>
        <div>
          <p className="type-body-m-strong">{name}</p>
          {/* <p className={`type-body-s ${isBrand ? "text-fg-inverse" : "text-fg-secondary"}`}>{course}</p> */}
        </div>
      </figcaption>
    </figure>
  );
}
