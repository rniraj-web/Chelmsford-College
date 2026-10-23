"use client";

import { useEffect, useState } from "react";
import type { CourseFacetSummary } from "@/lib/courses";

function readChecked(form: HTMLFormElement, name: string): string[] {
  return Array.from(form.elements)
    .filter(
      (el): el is HTMLInputElement =>
        el instanceof HTMLInputElement &&
        el.name === name &&
        el.checked &&
        el.offsetParent !== null,
    )
    .map((el) => el.value);
}

function matches(selected: string[], value: string) {
  return selected.length === 0 || selected.includes(value);
}

export function LiveResultCount({
  formId,
  courses,
  initialCount,
}: {
  formId: string;
  courses: CourseFacetSummary[];
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const form = document.getElementById(formId);
    if (!(form instanceof HTMLFormElement)) return;

    function recompute() {
      const subject = readChecked(form as HTMLFormElement, "subject");
      const level = readChecked(form as HTMLFormElement, "level");
      const mode = readChecked(form as HTMLFormElement, "mode");
      setCount(
        courses.filter(
          (c) =>
            matches(subject, c.subject) &&
            matches(level, c.level) &&
            matches(mode, c.mode),
        ).length,
      );
    }

    const checkboxes = Array.from(form.elements).filter(
      (el): el is HTMLInputElement =>
        el instanceof HTMLInputElement && el.type === "checkbox",
    );
    checkboxes.forEach((el) => el.addEventListener("change", recompute));
    recompute();
    return () =>
      checkboxes.forEach((el) => el.removeEventListener("change", recompute));
  }, [formId, courses]);

  return (
    <>
      {count} course{count === 1 ? "" : "s"}
    </>
  );
}
