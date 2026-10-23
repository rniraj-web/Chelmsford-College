"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgressStepper } from "@/components/ProgressStepper";
import { Radio } from "@/components/Radio";
import { PaymentTypeCard } from "@/components/PaymentTypeCard";
import { ErrorSummary, type ErrorSummaryItem } from "@/components/ErrorSummary";
import { Button } from "@/components/Button";
import { PayHelp } from "@/components/PayHelp";
import { usePayment } from "./payment-context";
import { PAYMENT_TYPES, PAY_STEPS, type PaymentTypeId } from "./payment-types";

export default function PayPage() {
  const router = useRouter();
  const { data, update } = usePayment();
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: ErrorSummaryItem[] = [];
    if (!data.payerType) nextErrors.push({ fieldId: "payer-learner", message: "Select who is paying" });
    if (!data.paymentType) nextErrors.push({ fieldId: "pay-deposit", message: "Select what you're paying for" });
    setErrors(nextErrors);
    if (nextErrors.length === 0) router.push("/pay/details");
  }

  return (
    <div className="container-page section-y flex flex-col gap-8">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/pay", label: "Pay a fee" }]} />

      <div className="flex flex-col gap-2">
        <h1 className="type-h1 text-fg">Pay a fee</h1>
        <p className="type-body-l max-w-prose text-fg-secondary">
          Pay a course deposit, materials fee, or trip payment. Students and parents or carers can both
          use this form.
        </p>
      </div>

      <div className="gap-gutter grid grid-cols-1 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-3">
          <ProgressStepper steps={PAY_STEPS} currentStep={1} />
        </div>

        <div className="flex flex-col gap-8 lg:col-span-9">
          <form onSubmit={handleSubmit} noValidate className="flex max-w-prose flex-col gap-8">
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

            <fieldset className="flex flex-col gap-1">
              <legend className="type-h5 mb-2 text-fg">Who is making this payment?</legend>
              <div className="gap-gutter grid grid-cols-1 md:grid-cols-2">
                <Radio
                  id="payer-learner"
                  name="payerType"
                  label="I'm the student"
                  checked={data.payerType === "learner"}
                  error={errors.some((e) => e.fieldId === "payer-learner")}
                  onChange={() => update({ payerType: "learner" })}
                />
                <Radio
                  id="payer-parent"
                  name="payerType"
                  label="I'm a parent or carer"
                  checked={data.payerType === "parent"}
                  error={errors.some((e) => e.fieldId === "payer-learner")}
                  onChange={() => update({ payerType: "parent" })}
                />
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-3">
              <legend className="type-h5 mb-1 text-fg">What are you paying for?</legend>
              {(Object.keys(PAYMENT_TYPES) as PaymentTypeId[]).map((id) => (
                <PaymentTypeCard
                  key={id}
                  id={`pay-${id}`}
                  name="paymentType"
                  paymentType={id}
                  title={PAYMENT_TYPES[id].title}
                  description={PAYMENT_TYPES[id].description}
                  fromPrice={`£${PAYMENT_TYPES[id].amount}`}
                  selected={data.paymentType === id}
                  onChange={() => update({ paymentType: id })}
                />
              ))}
            </fieldset>

            <Button type="submit" variant="primary" size="large" className="self-start">
              Continue to details
            </Button>
          </form>

          <div className="max-w-prose">
            <PayHelp />
          </div>
        </div>
      </div>
    </div>
  );
}
