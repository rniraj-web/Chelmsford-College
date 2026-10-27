"use client";

import { AnimatePresence, motion } from "motion/react";
import { Button } from "./Button";
import { useCompare } from "@/app/courses/compare-context";

export function CompareBar() {
  const { selectedIds, clear, hydrated } = useCompare();
  const count = hydrated ? selectedIds.length : 0;

  return (
    <AnimatePresence>
      {count > 0 ? (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line-subtle bg-surface p-4 shadow-lg"
        >
          <div className="container-page flex flex-wrap items-center justify-between gap-3">
            <p className="type-body-s-strong text-fg" aria-live="polite">
              {count} course{count === 1 ? "" : "s"} selected to compare
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clear}
                className="type-link-m text-fg-link focus-visible:focus-highlight"
              >
                Clear
              </button>
              <Button href="/courses/compare" variant="primary" size="medium">
                Compare
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
