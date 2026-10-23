"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { PaymentProvider } from "./payment-context";

export default function PayLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <PaymentProvider>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.2, 0, 0, 1] } }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </PaymentProvider>
  );
}
