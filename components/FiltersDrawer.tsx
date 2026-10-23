"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { useFocusTrap } from "@/lib/useFocusTrap";
import type { CourseFacetSummary, Facets } from "@/lib/courses";
import { FilterFieldsets, type SelectedFacets } from "./FilterFieldsets";
import { LiveResultCount } from "./LiveResultCount";

export function FiltersDrawer({
  facets,
  courses,
  selected,
  formId,
  activeCount,
  resultCount,
  clearAllHref,
}: {
  facets: Facets;
  courses: CourseFacetSummary[];
  selected: SelectedFacets;
  formId: string;
  activeCount: number;
  resultCount: number;
  clearAllHref: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useFocusTrap({ open, panelRef, triggerRef, onClose: () => setOpen(false), initialFocusSelector: "[data-close-button]" });

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="type-label-l flex h-12 items-center gap-2 rounded-md border-2 border-line-strong px-4 text-fg hover:border-line-brand focus-visible:focus-ring lg:hidden"
      >
        <SlidersHorizontal className="size-5" aria-hidden="true" />
        Filters{activeCount > 0 ? ` (${activeCount})` : ""}
      </button>

      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filter courses">
            <motion.div
              className="absolute inset-0 bg-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={panelRef}
              className="absolute inset-0 flex flex-col bg-surface"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-line-subtle px-4">
                <h2 className="type-h5 text-fg">Filters</h2>
                <button
                  type="button"
                  data-close-button
                  onClick={() => setOpen(false)}
                  aria-label="Close filters"
                  className="flex size-12 items-center justify-center rounded-md text-icon focus-visible:focus-ring"
                >
                  <X className="size-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <FilterFieldsets facets={facets} selected={selected} formId={formId} idPrefix="drawer" />
              </div>

              <div className="flex shrink-0 gap-3 border-t border-line-subtle p-4">
                <Link
                  href={clearAllHref}
                  className="type-link-m flex h-12 flex-1 items-center justify-center text-fg-link focus-visible:focus-highlight"
                >
                  Clear all
                </Link>
                <button
                  type="submit"
                  form={formId}
                  onClick={() => setOpen(false)}
                  className="type-button-m flex h-12 flex-1 items-center justify-center rounded-md bg-brand px-5 text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring"
                >
                  Show <LiveResultCount formId={formId} courses={courses} initialCount={resultCount} />
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
