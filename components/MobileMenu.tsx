"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { MenuItem } from "./MenuItem";
import { useFocusTrap } from "@/lib/useFocusTrap";

const NAV_ITEMS = [
  { href: "/courses", label: "Courses" },
  { href: "/courses", label: "Apprenticeships" },
  { href: "/courses", label: "Adult learning" },
  { href: "/courses", label: "University level" },
  { href: "/events", label: "Events" },
  { href: "#", label: "About us" },
];

const QUICK_LINKS = [
  { href: "/pay", label: "Pay a fee" },
  { href: "#", label: "Term dates" },
  { href: "#", label: "Contact us" },
  { href: "#", label: "Student login" },
];

export function MobileMenu({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap({ open, panelRef, triggerRef, onClose, initialFocusSelector: "[data-close-button]" });

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Site menu">
          <motion.div
            className="absolute inset-0 bg-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            className="absolute inset-0 flex flex-col overflow-y-auto bg-surface"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
          >
            <div className="flex h-16 items-center justify-between border-b border-line-subtle px-4">
              <Link href="/" className="focus-visible:focus-ring" onClick={onClose}>
                <Image src="/images/logo-colour.png" alt="Chelmsford College home" width={140} height={28} />
              </Link>
              <button
                type="button"
                data-close-button
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-12 items-center justify-center rounded-md text-icon focus-visible:focus-ring"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>

            <form role="search" className="flex items-center gap-2 border-b border-line-subtle p-4">
              <label htmlFor="mobile-menu-search" className="sr-only">
                Search courses
              </label>
              <div className="flex h-12 flex-1 items-center gap-2 rounded-md border-2 border-line-strong px-4 focus-within:border-line-brand">
                <Search className="size-5 text-icon-secondary" aria-hidden="true" />
                <input
                  id="mobile-menu-search"
                  type="search"
                  name="q"
                  placeholder="Search courses"
                  autoComplete="off"
                  className="type-body-m w-full bg-transparent text-fg outline-none"
                />
              </div>
            </form>

            <nav aria-label="Main" className="px-4">
              {NAV_ITEMS.map((item) => (
                <MenuItem key={item.label} href={item.href} label={item.label} onClick={onClose} />
              ))}
            </nav>

            <ul className="flex flex-col gap-1 px-4 py-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="type-link-m inline-block py-2 text-fg-link focus-visible:focus-highlight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 bg-surface-subtle p-4">
              <Link
                href="#"
                onClick={onClose}
                className="type-button-l flex h-control-lg items-center justify-center rounded-md bg-brand px-8 text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring"
              >
                Apply now
              </Link>
              <Link
                href="#"
                onClick={onClose}
                className="type-button-l flex h-control-lg items-center justify-center rounded-md border-2 border-line-brand px-8 text-fg-brand hover:bg-brand-subtle focus-visible:focus-ring"
              >
                Book an open event
              </Link>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
