"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProgressStepper } from "@/components/ProgressStepper";
import { PaymentConfirmation } from "@/components/PaymentConfirmation";
import { PayHelp } from "@/components/PayHelp";
import { usePayment } from "../payment-context";
import { PAYMENT_TYPES, PAY_STEPS } from "../payment-types";


// shortcut: static demo reference "CHC-000000" (see PLACEHOLDERS.md) — a real
// build would generate this from the payment provider's transaction id
const REFERENCE = "CHC-000000";

export default function PayConfirmationPage() {
  const router = useRouter();
  const { data, hydrated } = usePayment();

  const ready = Boolean(data.paymentType && data.learnerFirstName);

  useEffect(() => {
    if (hydrated && !ready) router.replace("/pay");
  }, [hydrated, ready, router]);

  if (!hydrated || !ready || !data.paymentType) return null;

  const paymentType = PAYMENT_TYPES[data.paymentType];
  const amountLabel = `£${paymentType.amount.toFixed(2)}`;

  return (
    <div className="container-page section-y flex flex-col gap-8">
      <div className="gap-gutter grid grid-cols-1 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-3">
          <ProgressStepper steps={PAY_STEPS} currentStep={4} />
        </div>

        <div className="flex flex-col gap-8 lg:col-span-9">
          <PaymentConfirmation
            reference={REFERENCE}
            amount={amountLabel}
            paidFor={paymentType.title}
            onDownloadReceipt={() => window.print()}
            makeAnotherPaymentHref="/pay"
          />

          <div className="max-w-prose self-center">
            <PayHelp />
          </div>
        </div>
      </div>
    </div>
  );
}
