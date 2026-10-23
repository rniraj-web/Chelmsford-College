"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, PoundSterling, Calendar, User, Search, X } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "./SearchBar";

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

const POPULAR_SEARCHES = [
  { href: "/courses?subject=hair-beauty", label: "Hair & Beauty" },
  { href: "/courses?subject=health-social-care", label: "Health & Social Care" },
  { href: "/courses?subject=it-digital", label: "IT & Digital" },
  { href: "/courses?level=level-3", label: "Level 3" },
];

const MAIN_NAV = [
  { href: "/courses", label: "Courses", dropdown: true },
  { href: "/courses?mode=apprenticeships", label: "Apprenticeships", dropdown: false },
  { href: "/courses?mode=adult-learning", label: "Adult learning", dropdown: false },
  { href: "/courses?level=university-level", label: "University level", dropdown: false },
  { href: "/events", label: "Events", dropdown: false },
  { href: "#", label: "About us", dropdown: true },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  useEffect(() => {
    if (!searchOpen) return;
    // Only one of these is actually rendered (display:block) at a given width;
    // focusing a display:none element is a no-op, so trying both is safe.
    document.getElementById("search-header")?.focus();
    document.getElementById("search-header-compact")?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

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
        <div className="container-page hidden items-center justify-between py-5 lg:flex">
          <Link href="/" className="focus-visible:focus-ring">
            <Image src="/images/logo-colour.png" alt="Chelmsford College home" width={200} height={40} priority />
          </Link>
          <nav aria-label="Main" className="flex items-center gap-8">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="type-label-l flex items-center gap-1 text-fg focus-visible:focus-ring"
              >
                {item.label}
                {item.dropdown ? <ChevronDown className="size-4" aria-hidden="true" /> : null}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={searchOpen ? "Close search" : "Search courses"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
              className="relative flex size-12 items-center justify-center rounded-md text-icon hover:bg-surface-hover focus-visible:focus-ring"
            >
              <AnimatePresence initial={false} mode="wait">
                {searchOpen ? (
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
                    key="search"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
                    className="absolute flex items-center justify-center"
                  >
                    <Search className="size-6" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <Link
              href="#"
              className="type-button-m flex h-12 items-center justify-center rounded-md bg-brand px-5 text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring"
            >
              Apply now
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              className="overflow-hidden bg-brand-strong"
            >
              <div className="container-page flex flex-col gap-4 py-6">
                <h2 className="type-h5 text-fg-inverse">Find your course</h2>
                <SearchBar size="compact" id="search-header-compact" className="lg:hidden" />
                <SearchBar size="hero" id="search-header" className="hidden lg:flex" />
                <div className="type-body-s flex flex-wrap items-center gap-2 text-fg-inverse">
                  <span>Popular searches:</span>
                  {POPULAR_SEARCHES.map((search) => (
                    <Link
                      key={search.href}
                      href={search.href}
                      className="type-link-s text-fg-inverse focus-visible:focus-highlight"
                    >
                      {search.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Mobile bar */}
        <div className="container-page flex h-16 items-center justify-between lg:hidden">
          <Link href="/" className="focus-visible:focus-ring">
            <Image src="/images/logo-colour.png" alt="Chelmsford College home" width={140} height={28} priority />
          </Link>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={searchOpen ? "Close search" : "Search courses"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
              className="relative flex size-12 items-center justify-center rounded-md text-icon hover:bg-surface-hover focus-visible:focus-ring"
            >
              <AnimatePresence initial={false} mode="wait">
                {searchOpen ? (
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
                    key="search"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
                    className="absolute flex items-center justify-center"
                  >
                    <Search className="size-6" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
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
