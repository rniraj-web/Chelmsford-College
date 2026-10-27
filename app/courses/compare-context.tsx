"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const MAX_COMPARE = 3;
const STORAGE_KEY = "cc-compare-courses";

interface CompareContextValue {
  selectedIds: number[];
  isSelected: (id: number) => boolean;
  toggle: (id: number) => void;
  clear: () => void;
  hydrated: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSelectedIds(JSON.parse(stored));
      } catch {
        // shortcut: corrupt storage just starts from an empty selection
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds, hydrated]);

  function toggle(id: number) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  function clear() {
    setSelectedIds([]);
  }

  return (
    <CompareContext.Provider
      value={{ selectedIds, isSelected: (id) => selectedIds.includes(id), toggle, clear, hydrated }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
