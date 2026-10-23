"use client";

import { useEffect, useRef, useState } from "react";
import { CircleCheck, Copy, Check, Download, ArrowRight } from "lucide-react";
import { Button } from "./Button";

export function PaymentConfirmation({
  reference,
  amount,
  paidFor,
  onDownloadReceipt,
  makeAnotherPaymentHref,
}: {
  reference: string;
  amount: string;
  paidFor: string;
  onDownloadReceipt?: () => void;
  makeAnotherPaymentHref: string;
}) {
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  function copyReference() {
    navigator.clipboard.writeText(reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="mx-auto flex max-w-prose flex-col items-center text-center">
      <span className="flex size-20 items-center justify-center rounded-full bg-success-subtle text-icon-success">
        <CircleCheck className="size-10" aria-hidden="true" />
      </span>

      <h1 ref={headingRef} tabIndex={-1} className="type-h1 mt-6 text-fg">
        Payment successful
      </h1>
      <p className="type-body-m mt-2 text-fg-secondary">Your payment has been completed.</p>

      <div className="mt-8 flex w-full flex-col gap-4 rounded-xl border border-line-subtle bg-surface p-6 text-left shadow-xs">
        <div className="flex items-center justify-between border-b border-line-subtle pb-4">
          <div>
            <span className="type-caption block text-fg-secondary">Reference</span>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="type-body-s-strong text-fg">{reference}</span>
              <button
                type="button"
                onClick={copyReference}
                className="flex size-8 items-center justify-center rounded-md text-icon-secondary transition-colors duration-120 ease-standard hover:text-icon-brand focus-visible:focus-ring"
                aria-label={copied ? "Reference copied" : "Copy reference"}
              >
                {copied ? (
                  <Check className="size-4 text-icon-success" aria-hidden="true" />
                ) : (
                  <Copy className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <span className="type-overline rounded-full bg-success-subtle px-3 py-1 text-fg-success">Paid</span>
        </div>

        <div className="type-body-s flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-fg-secondary">Amount paid</span>
            <span className="type-body-s-strong text-fg">{amount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg-secondary">Paid for</span>
            <span className="type-body-s-strong text-fg">{paidFor}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg-secondary">Date</span>
            <span className="type-body-s-strong text-fg">{today}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col gap-3 md:flex-row">
        <Button
          variant="secondary"
          size="medium"
          leadingIcon={Download}
          className="flex-1"
          onClick={onDownloadReceipt ?? (() => window.print())}
        >
          Download receipt (PDF)
        </Button>
        <Button href={makeAnotherPaymentHref} variant="primary" size="medium" trailingIcon={ArrowRight} className="flex-1">
          Make another payment
        </Button>
      </div>
    </div>
  );
}
