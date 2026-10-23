"use client";

import { Map, Package, PoundSterling } from "lucide-react";
import { motion } from "motion/react";

const TYPE_ICON = {
  deposit: PoundSterling,
  materials: Package,
  trip: Map,
} as const;

interface PaymentTypeCardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  paymentType: keyof typeof TYPE_ICON;
  title: string;
  description: string;
  fromPrice: string;
  selected: boolean;
}

export function PaymentTypeCard({
  id,
  paymentType,
  title,
  description,
  fromPrice,
  selected,
  ...rest
}: PaymentTypeCardProps) {
  const Icon = TYPE_ICON[paymentType];

  return (
    <motion.label
      htmlFor={id}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
      className={`group flex cursor-pointer items-center justify-between gap-4 rounded-xl border-2 p-4 transition-colors duration-200 ease-standard focus-within:focus-ring md:p-5 ${
        selected ? "border-line-brand bg-brand-subtle" : "border-line bg-surface hover:border-line-brand"
      }`}
    >
      <input id={id} type="radio" checked={selected} className="sr-only" {...rest} />

      <div className="flex items-center gap-4">
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ease-standard ${
            selected
              ? "bg-brand text-fg-on-brand"
              : "bg-surface-muted text-icon-secondary group-hover:bg-brand-subtle group-hover:text-icon-brand"
          }`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>

        <div>
          <h3 className="type-h6 text-fg">{title}</h3>
          <p className="type-body-s mt-0.5 text-fg-secondary">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <span className="type-overline block text-fg-secondary">Fee</span>
          <span className="type-body-m-strong text-fg">{fromPrice}</span>
        </div>

        <div
          className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ease-standard ${
            selected ? "border-line-brand bg-brand" : "border-line-strong bg-surface group-hover:border-line-brand"
          }`}
        >
          <span
            className={`size-2 rounded-full bg-fg-on-brand transition-transform duration-120 ease-standard ${
              selected ? "scale-100" : "scale-0"
            }`}
          />
        </div>
      </div>
    </motion.label>
  );
}
