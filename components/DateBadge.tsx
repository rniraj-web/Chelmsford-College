export function DateBadge({ date, tone = "brand" }: { date: string; tone?: "brand" | "light" }) {
  const parsed = new Date(date);
  const day = parsed.getDate();
  const month = parsed.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();

  return (
    <div
      className={`flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-md ${
        tone === "brand" ? "bg-brand text-fg-on-brand" : "bg-surface text-fg shadow-sm"
      }`}
    >
      <span className="type-date-day">{day}</span>
      <span className="type-overline">{month}</span>
    </div>
  );
}
