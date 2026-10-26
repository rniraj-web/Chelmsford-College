"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CreditCard, Lock, Wallet } from "lucide-react";
import { TextField } from "./TextField";
import { Button } from "./Button";
import { Tabs } from "./Tabs";
import { ErrorSummary, type ErrorSummaryItem } from "./ErrorSummary";
import { Alert } from "./Alert";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CardValues {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  email: string;
}

const EMPTY_CARD: CardValues = {
  name: "",
  number: "",
  expiry: "",
  cvc: "",
  email: "",
};

export function PaymentForm({
  amountLabel,
  onSubmit,
}: {
  amountLabel: string;
  onSubmit?: () => void;
}) {
  const [card, setCard] = useState<CardValues>(EMPTY_CARD);
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);

  function update(field: keyof CardValues, value: string) {
    setCard((prev) => ({ ...prev, [field]: value }));
  }

  function handleCardSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: ErrorSummaryItem[] = [];
    if (!card.name.trim())
      nextErrors.push({
        fieldId: "card-name",
        message: "Enter the name on the card",
      });
    if (!card.number.trim())
      nextErrors.push({
        fieldId: "card-number",
        message: "Enter the card number",
      });
    if (!card.expiry.trim())
      nextErrors.push({
        fieldId: "card-expiry",
        message: "Enter the expiry date",
      });
    if (!card.cvc.trim())
      nextErrors.push({
        fieldId: "card-cvc",
        message: "Enter the security code",
      });
    if (!card.email.trim()) {
      nextErrors.push({
        fieldId: "receipt-email",
        message: "Enter an email address",
      });
    } else if (!EMAIL_PATTERN.test(card.email.trim())) {
      nextErrors.push({
        fieldId: "receipt-email",
        message: "Enter an email address in the correct format",
      });
    }
    setErrors(nextErrors);
    if (nextErrors.length === 0) onSubmit?.();
  }

  return (
    <div className="rounded-xl border border-line-subtle bg-surface p-6 shadow-xs md:p-8">
      <div className="flex items-center gap-2 border-b border-line-subtle pb-4">
        <CreditCard className="size-5 text-icon-brand" aria-hidden="true" />
        <h3 className="type-h6 text-fg">Payment details</h3>
      </div>

      <div className="mt-4">
        <Alert tone="warning" title="This is a demonstration">
          This payment step is simulated for the prototype. Please don&apos;t
          enter real card details, no payment is actually taken.
        </Alert>
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
                  <span className="rounded bg-surface-muted px-1.5 py-0.5">
                    VISA
                  </span>
                  <span className="rounded bg-surface-muted px-1.5 py-0.5">
                    MASTERCARD
                  </span>
                  <span className="rounded bg-surface-muted px-1.5 py-0.5">
                    AMEX
                  </span>
                </div>

                <form
                  className="flex flex-col gap-5"
                  onSubmit={handleCardSubmit}
                  noValidate
                >
                  <AnimatePresence>
                    {errors.length > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                      >
                        <ErrorSummary errors={errors} />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <TextField
                    id="card-name"
                    label="Name on card"
                    placeholder="e.g. A Smith"
                    autoComplete="cc-name"
                    required
                    value={card.name}
                    error={
                      errors.find((e) => e.fieldId === "card-name")?.message
                    }
                    onChange={(e) => update("name", e.target.value)}
                  />
                  <TextField
                    id="card-number"
                    label="Card number"
                    placeholder="•••• •••• •••• ••••"
                    autoComplete="cc-number"
                    inputMode="numeric"
                    required
                    value={card.number}
                    error={
                      errors.find((e) => e.fieldId === "card-number")?.message
                    }
                    onChange={(e) => update("number", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      id="card-expiry"
                      label="Expiry date"
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      required
                      value={card.expiry}
                      error={
                        errors.find((e) => e.fieldId === "card-expiry")?.message
                      }
                      onChange={(e) => update("expiry", e.target.value)}
                    />
                    <TextField
                      id="card-cvc"
                      label="Security code (CVC)"
                      placeholder="•••"
                      autoComplete="cc-csc"
                      inputMode="numeric"
                      required
                      value={card.cvc}
                      error={
                        errors.find((e) => e.fieldId === "card-cvc")?.message
                      }
                      onChange={(e) => update("cvc", e.target.value)}
                    />
                  </div>
                  <TextField
                    id="receipt-email"
                    label="Email for your receipt"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    value={card.email}
                    error={
                      errors.find((e) => e.fieldId === "receipt-email")?.message
                    }
                    onChange={(e) => update("email", e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    leadingIcon={Lock}
                    className="w-full"
                  >
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
                  Confirm with Face ID, Touch ID or your device passcode. No
                  card details to enter.
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
                  Confirm with the card saved to your Google account. No card
                  details to enter.
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
        Payments are encrypted and processed by our payment provider. We never
        see or store your card details.
      </p>
    </div>
  );
}
