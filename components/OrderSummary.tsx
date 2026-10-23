import { Lock, ReceiptText } from "lucide-react";

interface OrderSummaryRow {
  label: string;
  value: string;
}

export function OrderSummary({
  rows,
  total,
  className = "",
}: {
  rows: OrderSummaryRow[];
  total: string;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-line-subtle bg-surface p-6 shadow-xs ${className}`}>
      <h2 className="type-h5 flex items-center gap-2 text-fg">
        <ReceiptText className="size-6 text-icon-brand" aria-hidden="true" />
        Order summary
      </h2>

      <dl className="mt-4 divide-y divide-line-subtle">
        {rows.map((row) => (
          <div key={row.label} className="type-body-s flex items-center justify-between py-3 first:pt-0">
            <dt className="text-fg-secondary">{row.label}</dt>
            <dd className="text-right text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex items-baseline justify-between border-t border-line-subtle pt-4">
        <p className="type-h6 text-fg">Total payable</p>
        <p className="type-h4 text-fg-brand">{total}</p>
      </div>

      <p className="type-body-s mt-4 flex items-center gap-2 rounded-md bg-success-subtle p-3 text-fg-success">
        <Lock className="size-5 shrink-0" aria-hidden="true" />
        Payments are processed securely. We never store your card details.
      </p>
    </div>
  );
}
