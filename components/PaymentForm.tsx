"use client";

import { CreditCard, Lock, Wallet } from "lucide-react";
import { TextField } from "./TextField";
import { Button } from "./Button";
import { Tabs } from "./Tabs";

export function PaymentForm({
  amountLabel,
  onSubmit,
}: {
  amountLabel: string;
  onSubmit?: () => void;
}) {
  return (
    <div className="rounded-xl border border-line-subtle bg-surface p-6 shadow-xs md:p-8">
      <div className="flex items-center gap-2 border-b border-line-subtle pb-4">
        <CreditCard className="size-5 text-icon-brand" aria-hidden="true" />
        <h3 className="type-h6 text-fg">Payment details</h3>
      </div>

      <Tabs
        ariaLabel="Payment method"
        className="mt-4"
        tabs={[
          {
            id: "card",
            label: "Card",
            content: (
              <div className="flex flex-col gap-5">
                <div className="type-overline flex gap-1 text-fg-secondary">
                  <span className="rounded bg-surface-muted px-1.5 py-0.5">VISA</span>
                  <span className="rounded bg-surface-muted px-1.5 py-0.5">MASTERCARD</span>
                  <span className="rounded bg-surface-muted px-1.5 py-0.5">AMEX</span>
                </div>

                <form
                  className="flex flex-col gap-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit?.();
                  }}
                >
                  <TextField
                    id="card-name"
                    label="Name on card"
                    placeholder="e.g. A Smith"
                    autoComplete="cc-name"
                    required
                  />
                  <TextField
                    id="card-number"
                    label="Card number"
                    placeholder="•••• •••• •••• ••••"
                    autoComplete="cc-number"
                    inputMode="numeric"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      id="card-expiry"
                      label="Expiry date"
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      required
                    />
                    <TextField
                      id="card-cvc"
                      label="Security code (CVC)"
                      placeholder="•••"
                      autoComplete="cc-csc"
                      inputMode="numeric"
                      required
                    />
                  </div>
                  <TextField
                    id="receipt-email"
                    label="Email for your receipt"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                  <Button type="submit" variant="primary" size="large" leadingIcon={Lock} className="w-full">
                    Pay {amountLabel}
                  </Button>
                </form>
              </div>
            ),
          },
          {
            id: "apple-pay",
            label: "Apple Pay",
            content: (
              <div className="flex flex-col gap-4">
                <p className="type-body-s text-fg-secondary">
                  Confirm with Face ID, Touch ID or your device passcode. No card details to enter.
                </p>
                <button
                  type="button"
                  onClick={() => onSubmit?.()}
                  className="flex h-12 items-center justify-center gap-2 rounded-md bg-fg text-fg-inverse transition-colors duration-120 ease-standard hover:bg-fg-secondary focus-visible:focus-ring"
                >
                  <Wallet className="size-5" aria-hidden="true" />
                  <span className="type-button-l">Pay {amountLabel}</span>
                </button>
              </div>
            ),
          },
          {
            id: "google-pay",
            label: "Google Pay",
            content: (
              <div className="flex flex-col gap-4">
                <p className="type-body-s text-fg-secondary">
                  Confirm with the card saved to your Google account. No card details to enter.
                </p>
                <button
                  type="button"
                  onClick={() => onSubmit?.()}
                  className="flex h-12 items-center justify-center gap-2 rounded-md border-2 border-line-strong bg-surface text-fg transition-colors duration-120 ease-standard hover:border-line-brand focus-visible:focus-ring"
                >
                  <Wallet className="size-5" aria-hidden="true" />
                  <span className="type-button-l">Pay {amountLabel}</span>
                </button>
              </div>
            ),
          },
        ]}
      />

      <p className="type-caption mt-4 text-center text-fg-secondary">
        Payments are encrypted and processed by our payment provider. We never see or store your card details.
      </p>
    </div>
  );
}
