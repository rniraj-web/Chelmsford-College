"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

export function ProgressStepper({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  const percent = (currentStep / steps.length) * 100;

  return (
    <nav aria-label="Progress" className="w-full">
      {/* Mobile */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="type-body-s-strong flex items-center justify-between text-fg-secondary">
          <span>
            Step {currentStep} of {steps.length}
          </span>
          <span className="type-h6 text-fg">{steps[currentStep - 1]}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
          <motion.div
            className="h-full rounded-full bg-brand"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
          />
        </div>
      </div>

      {/* Tablet: horizontal row */}
      <ol className="hidden items-center justify-between md:flex lg:hidden">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const complete = stepNumber < currentStep;
          const current = stepNumber === currentStep;

          return (
            <li key={step} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-3">
                <div
                  aria-current={current ? "step" : undefined}
                  className={`type-body-s-strong flex size-control-sm shrink-0 items-center justify-center rounded-full transition-colors duration-200 ease-standard ${
                    complete
                      ? "bg-brand text-fg-on-brand"
                      : current
                        ? "border-2 border-line-brand bg-brand-subtle text-fg-brand"
                        : "border-2 border-line-strong bg-surface text-fg-secondary"
                  }`}
                >
                  {complete ? <Check className="size-5" aria-hidden="true" /> : stepNumber}
                </div>
                <span className={`type-body-s ${current ? "text-fg" : "text-fg-secondary"}`}>{step}</span>
              </div>
              {stepNumber < steps.length ? (
                <div
                  className={`mx-4 h-0.5 flex-1 transition-colors duration-200 ease-standard ${
                    complete ? "bg-brand" : "bg-surface-muted"
                  }`}
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      {/* Desktop: vertical sidebar */}
      <ol className="hidden flex-col lg:flex">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const complete = stepNumber < currentStep;
          const current = stepNumber === currentStep;
          const isLast = stepNumber === steps.length;

          return (
            <li key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  aria-current={current ? "step" : undefined}
                  className={`type-h6 flex size-control-lg shrink-0 items-center justify-center rounded-full transition-all duration-200 ease-standard ${
                    complete
                      ? "bg-brand text-fg-on-brand"
                      : current
                        ? "border-2 border-line-brand bg-brand-subtle text-fg-brand ring-4 ring-brand-subtle"
                        : "border-2 border-line-strong bg-surface text-fg-secondary"
                  }`}
                >
                  {complete ? <Check className="size-6" aria-hidden="true" /> : stepNumber}
                </div>
                {!isLast ? (
                  <div
                    className={`my-1 w-0.5 flex-1 transition-colors duration-200 ease-standard ${
                      complete ? "bg-brand" : "bg-surface-muted"
                    }`}
                  />
                ) : null}
              </div>
              <p
                className={`pt-4 ${current ? "type-body-m-strong text-fg" : "type-body-m text-fg-secondary"} ${
                  isLast ? "pb-1" : "pb-10"
                }`}
              >
                {step}
              </p>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
