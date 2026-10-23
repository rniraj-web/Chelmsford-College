import { Headphones } from "lucide-react";

export function PayHelp() {
  return (
    <div role="status" className="flex gap-3 rounded-lg border-l-4 border-line-brand bg-info-subtle p-4">
      <Headphones className="size-6 shrink-0 text-fg-info" aria-hidden="true" />
      <div>
        <h2 className="type-h6 text-fg-info">Need help with fee payments?</h2>
        <p className="type-body-s mt-1 text-fg-secondary">
          Contact our finance team on{" "}
          <strong className="type-body-s-strong text-fg">01245 293000</strong> (Mon–Fri, 9am–5pm) or visit
          Student Services.
        </p>
      </div>
    </div>
  );
}
