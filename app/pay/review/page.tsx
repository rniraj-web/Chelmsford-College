"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgressStepper } from "@/components/ProgressStepper";
import { OrderSummary } from "@/components/OrderSummary";
import { PaymentForm } from "@/components/PaymentForm";
import { Button } from "@/components/Button";
import { PayHelp } from "@/components/PayHelp";
import { getCourseById } from "@/lib/courses";
import { usePayment } from "../payment-context";
import { PAYMENT_TYPES, PAY_STEPS } from "../payment-types";

export default function PayReviewPage() {
  const router = useRouter();
  const { data, hydrated } = usePayment();

  const ready = Boolean(data.paymentType && data.learnerFirstName && data.studentId);

  useEffect(() => {
    if (hydrated && !ready) router.replace("/pay");
  }, [hydrated, ready, router]);

  if (!hydrated || !ready || !data.paymentType) return null;

  const paymentType = PAYMENT_TYPES[data.paymentType];
  const course = getCourseById(Number(data.courseId));
  const amountLabel = `£${paymentType.amount.toFixed(2)}`;

  const rows = [
    { label: "Payment for", value: paymentType.title },
    { label: "Learner", value: `${data.learnerFirstName} ${data.learnerLastName}` },
    { label: "Student ID", value: data.studentId },
    { label: "Course", value: course?.title ?? "Course" },
    ...(data.payerType === "parent"
      ? [{ label: "Paid by", value: `${data.payerFirstName} ${data.payerLastName}` }]
      : []),
  ];

  function handlePay() {
    router.push("/pay/confirmation");
  }

  return (
    <div className="container-page section-y flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/pay", label: "Pay a fee" },
          { href: "/pay/review", label: "Review & pay" },
        ]}
      />

      <div className="flex flex-col gap-2">
        <h1 className="type-h1 text-fg">Review & pay</h1>
        <p className="type-body-l max-w-prose text-fg-secondary">
          Check your details and submit your payment securely.
        </p>
      </div>

      <div className="gap-gutter grid grid-cols-1 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-3">
          <ProgressStepper steps={PAY_STEPS} currentStep={3} />
        </div>

        <div className="flex flex-col gap-8 lg:col-span-9">
          <div className="gap-gutter grid grid-cols-1 items-start lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <OrderSummary rows={rows} total={amountLabel} />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <PaymentForm amountLabel={amountLabel} onSubmit={handlePay} />
            </div>
          </div>

          <Button href="/pay/details" variant="ghost" size="large" leadingIcon={ChevronLeft} className="self-start">
            Back to details
          </Button>

          <div className="max-w-prose">
            <PayHelp />
          </div>
        </div>
      </div>
    </div>
  );
}
