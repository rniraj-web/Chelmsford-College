"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, PoundSterling, Calendar, User, X } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

const UTILITY_LEFT = [
  { href: "#", label: "School leavers" },
  { href: "#", label: "Adults" },
  { href: "#", label: "Parents & carers" },
  { href: "#", label: "Employers" },
  { href: "#", label: "International" },
];

const UTILITY_RIGHT = [
  { href: "/pay", label: "Pay a fee", icon: PoundSterling },
  { href: "#", label: "Term dates", icon: Calendar },
  { href: "#", label: "Student login", icon: User },
];

const MAIN_NAV = [
  { href: "/courses", label: "Courses", dropdown: true },
  { href: "/courses", label: "Apprenticeships", dropdown: false },
  { href: "/courses", label: "Adult learning", dropdown: false },
  { href: "/courses", label: "University level", dropdown: false, hideAtLg: true },
  { href: "/events", label: "Events", dropdown: false },
  { href: "#", label: "About us", dropdown: true },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-surface transition-shadow duration-200 ease-standard ${scrolled ? "shadow-lg" : ""}`}
      >
        {/* Desktop utility bar */}
        <div className="hidden bg-brand-strong lg:block">
          <div className="container-page flex items-center justify-between py-2">
            <ul className="flex items-center gap-6">
              {UTILITY_LEFT.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="type-label-m text-fg-inverse focus-visible:focus-ring">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-6">
              {UTILITY_RIGHT.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="type-label-m flex items-center gap-2 text-fg-inverse focus-visible:focus-ring"
                  >
                    <link.icon className="size-4" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop main bar */}
        <div className="container-page hidden items-center justify-between gap-4 py-5 lg:flex xl:gap-6">
          <Link href="/" className="shrink-0 focus-visible:focus-ring">
            <Image src="/images/logo-colour.png" alt="Chelmsford College home" width={200} height={40} priority />
          </Link>
          <nav aria-label="Main" className="flex items-center gap-4 xl:gap-8">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`type-label-l items-center gap-1 whitespace-nowrap text-fg focus-visible:focus-ring ${
                  item.hideAtLg ? "hidden xl:flex" : "flex"
                }`}
              >
                {item.label}
                {item.dropdown ? <ChevronDown className="size-4" aria-hidden="true" /> : null}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="#"
              className="type-button-m flex h-12 items-center justify-center whitespace-nowrap rounded-md bg-brand px-5 text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring"
            >
              Apply now
            </Link>
          </div>
        </div>

        {/* Mobile bar */}
        <div className="container-page flex h-16 items-center justify-between lg:hidden">
          <Link href="/" className="focus-visible:focus-ring">
            <Image src="/images/logo-colour.png" alt="Chelmsford College home" width={140} height={28} priority />
          </Link>
          <div className="flex items-center gap-1">
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="relative flex size-12 items-center justify-center rounded-md text-icon hover:bg-surface-hover focus-visible:focus-ring"
            >
              <AnimatePresence initial={false} mode="wait">
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
                    className="absolute flex items-center justify-center"
                  >
                    <X className="size-6" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
                    className="absolute flex items-center justify-center"
                  >
                    <Menu className="size-6" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={menuButtonRef} />
    </>
  );
}
