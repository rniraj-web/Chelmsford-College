"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { PaymentTypeId } from "./payment-types";

export interface PaymentData {
  payerType: "learner" | "parent" | "";
  paymentType: PaymentTypeId | "";
  learnerFirstName: string;
  learnerLastName: string;
  studentId: string;
  courseId: string;
  learnerEmail: string;
  payerFirstName: string;
  payerLastName: string;
  payerEmail: string;
}

const EMPTY_DATA: PaymentData = {
  payerType: "",
  paymentType: "",
  learnerFirstName: "",
  learnerLastName: "",
  studentId: "",
  courseId: "",
  learnerEmail: "",
  payerFirstName: "",
  payerLastName: "",
  payerEmail: "",
};

const STORAGE_KEY = "cc-pay-journey";

interface PaymentContextValue {
  data: PaymentData;
  update: (patch: Partial<PaymentData>) => void;
  reset: () => void;
  hydrated: boolean;
}

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PaymentData>(EMPTY_DATA);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData({ ...EMPTY_DATA, ...JSON.parse(stored) });
      } catch {
        // shortcut: corrupt storage falls back to empty state, no migration needed for a mock
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, hydrated]);

  function update(patch: Partial<PaymentData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function reset() {
    setData(EMPTY_DATA);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  return (
    <PaymentContext.Provider value={{ data, update, reset, hydrated }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error("usePayment must be used within PaymentProvider");
  return ctx;
}
