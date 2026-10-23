"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgressStepper } from "@/components/ProgressStepper";
import { TextField } from "@/components/TextField";
import { Select } from "@/components/Select";
import { ErrorSummary, type ErrorSummaryItem } from "@/components/ErrorSummary";
import { Button } from "@/components/Button";
import { PayHelp } from "@/components/PayHelp";
import { getCourses } from "@/lib/courses";
import { usePayment } from "../payment-context";
import { PAY_STEPS } from "../payment-types";

const courses = getCourses();

export default function PayDetailsPage() {
  const router = useRouter();
  const { data, update, hydrated } = usePayment();
  const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);

  useEffect(() => {
    if (hydrated && !data.paymentType) router.replace("/pay");
  }, [hydrated, data.paymentType, router]);

  if (!hydrated || !data.paymentType) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: ErrorSummaryItem[] = [];
    if (!data.learnerFirstName) nextErrors.push({ fieldId: "learner-first-name", message: "Enter the learner's first name" });
    if (!data.learnerLastName) nextErrors.push({ fieldId: "learner-last-name", message: "Enter the learner's last name" });
    if (!data.studentId) nextErrors.push({ fieldId: "student-id", message: "Enter the student ID" });
    if (!data.courseId) nextErrors.push({ fieldId: "course", message: "Select the course" });
    if (!data.learnerEmail) nextErrors.push({ fieldId: "learner-email", message: "Enter an email address" });
    if (data.payerType === "parent") {
      if (!data.payerFirstName) nextErrors.push({ fieldId: "payer-first-name", message: "Enter your first name" });
      if (!data.payerLastName) nextErrors.push({ fieldId: "payer-last-name", message: "Enter your last name" });
      if (!data.payerEmail) nextErrors.push({ fieldId: "payer-email", message: "Enter your email address" });
    }
    setErrors(nextErrors);
    if (nextErrors.length === 0) router.push("/pay/review");
  }

  return (
    <div className="container-page section-y flex flex-col gap-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/pay", label: "Pay a fee" },
          { href: "/pay/details", label: "Your details" },
        ]}
      />

      <div className="flex flex-col gap-2">
        <h1 className="type-h1 text-fg">Your details</h1>
        <p className="type-body-l max-w-prose text-fg-secondary">
          Enter the learner information so the payment can be attributed correctly.
        </p>
      </div>

      <div className="gap-gutter grid grid-cols-1 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-3">
          <ProgressStepper steps={PAY_STEPS} currentStep={2} />
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

        <fieldset className="flex flex-col gap-5 rounded-2xl border border-line-subtle bg-surface p-6 shadow-xs md:p-8">
          <legend className="type-h5 px-1 text-fg">Learner details</legend>

          <div className="gap-gutter grid grid-cols-1 md:grid-cols-2">
            <TextField
              id="learner-first-name"
              label="First name"
              autoComplete="given-name"
              required
              value={data.learnerFirstName}
              error={errors.find((e) => e.fieldId === "learner-first-name")?.message}
              onChange={(e) => update({ learnerFirstName: e.target.value })}
            />
            <TextField
              id="learner-last-name"
              label="Last name"
              autoComplete="family-name"
              required
              value={data.learnerLastName}
              error={errors.find((e) => e.fieldId === "learner-last-name")?.message}
              onChange={(e) => update({ learnerLastName: e.target.value })}
            />
          </div>

          <div className="gap-gutter grid grid-cols-1 md:grid-cols-2">
            <TextField
              id="student-id"
              label="Student ID"
              hint="Found on ID card or enrolment letter"
              required
              value={data.studentId}
              error={errors.find((e) => e.fieldId === "student-id")?.message}
              onChange={(e) => update({ studentId: e.target.value })}
            />
            <Select
              id="course"
              label="Course"
              required
              value={data.courseId}
              error={errors.find((e) => e.fieldId === "course")?.message}
              onChange={(e) => update({ courseId: e.target.value })}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={String(course.id)}>
                  {course.title}
                </option>
              ))}
            </Select>
          </div>

          <TextField
            id="learner-email"
            label="Learner's email"
            hint="We'll send a copy of the receipt here"
            type="email"
            autoComplete="email"
            required
            value={data.learnerEmail}
            error={errors.find((e) => e.fieldId === "learner-email")?.message}
            onChange={(e) => update({ learnerEmail: e.target.value })}
          />
        </fieldset>

        {data.payerType === "parent" ? (
          <fieldset className="flex flex-col gap-5 rounded-2xl border border-line-subtle bg-surface p-6 shadow-xs md:p-8">
            <legend className="type-h5 px-1 text-fg">Your details (parent or carer)</legend>

            <div className="gap-gutter grid grid-cols-1 md:grid-cols-2">
              <TextField
                id="payer-first-name"
                label="First name"
                autoComplete="given-name"
                required
                value={data.payerFirstName}
                error={errors.find((e) => e.fieldId === "payer-first-name")?.message}
                onChange={(e) => update({ payerFirstName: e.target.value })}
              />
              <TextField
                id="payer-last-name"
                label="Last name"
                autoComplete="family-name"
                required
                value={data.payerLastName}
                error={errors.find((e) => e.fieldId === "payer-last-name")?.message}
                onChange={(e) => update({ payerLastName: e.target.value })}
              />
            </div>

            <TextField
              id="payer-email"
              label="Your email"
              hint="We'll send a copy of the receipt here"
              type="email"
              autoComplete="email"
              required
              value={data.payerEmail}
              error={errors.find((e) => e.fieldId === "payer-email")?.message}
              onChange={(e) => update({ payerEmail: e.target.value })}
            />
          </fieldset>
        ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" variant="primary" size="large">
                Continue to review
              </Button>
              <Button href="/pay" variant="ghost" size="large">
                Back
              </Button>
            </div>
          </form>

          <div className="max-w-prose">
            <PayHelp />
          </div>
        </div>
      </div>
    </div>
  );
}
