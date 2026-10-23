"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([items[0]?.id].filter(Boolean) as string[]));

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function showAll() {
    setOpenIds(new Set(items.map((item) => item.id)));
  }

  const allOpen = items.every((item) => openIds.has(item.id));

  return (
    <div>
      <div className="flex justify-end pb-2">
        <button
          type="button"
          onClick={showAll}
          disabled={allOpen}
          className="type-link-s text-fg-link focus-visible:focus-highlight disabled:text-fg-disabled"
        >
          Show all sections
        </button>
      </div>
      {items.map((item) => {
        const open = openIds.has(item.id);
        return (
          <div key={item.id} className="border-b border-line-subtle">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:focus-ring"
            >
              <span className="type-h5 text-fg">{item.title}</span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-fg-brand">
                <ChevronDown
                  className={`size-5 transition-transform duration-200 ease-standard ${open ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </span>
            </button>
            <div id={`accordion-panel-${item.id}`} hidden={!open} className="type-body-m pb-4 text-fg-secondary">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
