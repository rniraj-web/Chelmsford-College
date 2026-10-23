export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-4 border-line-accent pl-4">
      <p className="type-stat text-fg-brand">{value}</p>
      <p className="type-body-s text-fg-secondary">{label}</p>
    </div>
  );
}
