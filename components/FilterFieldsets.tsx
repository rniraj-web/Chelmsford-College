import type { Facet, Facets } from "@/lib/courses";
import { Checkbox } from "./Checkbox";

export interface SelectedFacets {
  subject: string[];
  level: string[];
  mode: string[];
  campus: string[];
  ageGroup: string[];
}

const GROUPS: { key: keyof Facets; legend: string }[] = [
  { key: "subject", legend: "Subject" },
  { key: "level", legend: "Level" },
  { key: "mode", legend: "Study mode" },
  { key: "ageGroup", legend: "Age group" },
  { key: "campus", legend: "Campus" },
];

export function FilterFieldsets({
  facets,
  selected,
  formId,
  idPrefix,
}: {
  facets: Facets;
  selected: SelectedFacets;
  formId: string;
  idPrefix: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      {GROUPS.map(({ key, legend }) => {
        const options: Facet[] = facets[key];
        return (
          <fieldset key={key} className="border-b border-line-subtle pb-6 last:border-b-0">
            <legend className="type-label-l mb-1 text-fg">{legend}</legend>
            {options.map((option) => (
              <Checkbox
                key={option.value}
                id={`${idPrefix}-${key}-${option.value}`}
                name={key}
                value={option.value}
                label={option.label}
                count={option.count}
                disabled={option.count === 0}
                defaultChecked={selected[key].includes(option.value)}
                form={formId}
              />
            ))}
          </fieldset>
        );
      })}
    </div>
  );
}
