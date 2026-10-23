export const PAYMENT_TYPES = {
  deposit: {
    title: "Course deposit",
    description: "Secure your place before enrolment.",
    amount: 50,
  },
  materials: {
    title: "Materials fee",
    description: "Paid after enrolment.",
    amount: 25,
  },
  trip: {
    title: "Trip or visit",
    description: "One-off payments for trips.",
    amount: 15,
  },
} as const;

export type PaymentTypeId = keyof typeof PAYMENT_TYPES;

export const PAY_STEPS = ["Payment", "Your details", "Review & pay", "Confirmation"];
