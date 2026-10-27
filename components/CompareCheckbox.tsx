"use client";

import { Checkbox } from "./Checkbox";
import { MAX_COMPARE, useCompare } from "@/app/courses/compare-context";

export function CompareCheckbox({ courseId, courseTitle }: { courseId: number; courseTitle: string }) {
  const { isSelected, toggle, selectedIds, hydrated } = useCompare();
  const selected = isSelected(courseId);
  const limitReached = hydrated && !selected && selectedIds.length >= MAX_COMPARE;

  return (
    <Checkbox
      id={`compare-${courseId}`}
      label="Compare"
      aria-label={`Compare ${courseTitle}`}
      checked={selected}
      disabled={limitReached}
      onChange={() => toggle(courseId)}
    />
  );
}
