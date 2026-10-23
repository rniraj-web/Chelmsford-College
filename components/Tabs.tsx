"use client";

import { useId, useRef, useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({
  tabs,
  className,
  ariaLabel = "Course information",
}: {
  tabs: TabItem[];
  className?: string;
  ariaLabel?: string;
}) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const groupId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function focusTab(index: number) {
    const tab = tabs[(index + tabs.length) % tabs.length];
    setActiveId(tab.id);
    tabRefs.current[tab.id]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key === "ArrowRight") focusTab(index + 1);
    else if (event.key === "ArrowLeft") focusTab(index - 1);
    else if (event.key === "Home") focusTab(0);
    else if (event.key === "End") focusTab(tabs.length - 1);
    else return;
    event.preventDefault();
  }

  return (
    <div className={className}>
      <div role="tablist" aria-label={ariaLabel} className="flex border-b border-line-subtle">
        {tabs.map((tab, index) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              role="tab"
              id={`${groupId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${groupId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`type-label-l px-5 py-3 focus-visible:focus-ring ${
                selected
                  ? "border-b-3 border-line-brand font-bold text-fg-brand"
                  : "border-b border-line-subtle text-fg-secondary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${groupId}-panel-${tab.id}`}
          aria-labelledby={`${groupId}-tab-${tab.id}`}
          hidden={tab.id !== activeId}
          className="py-6"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
