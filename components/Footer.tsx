import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "./icons/SocialIcons";

const LINK_COLUMNS = [
  {
    heading: "Courses",
    links: [
      { href: "/courses", label: "Search all courses" },
      { href: "/courses?level=level-3", label: "Level 3 courses" },
      { href: "/courses?mode=adult-learning", label: "Adult learning" },
      { href: "#", label: "Apprenticeships" },
    ],
  },
  {
    heading: "Information",
    links: [
      { href: "/events", label: "Events" },
      { href: "/pay", label: "Pay a fee" },
      { href: "#", label: "Term dates" },
      { href: "#", label: "Student support" },
    ],
  },
  {
    heading: "About us",
    links: [
      { href: "#", label: "Our college" },
      { href: "#", label: "Work for us" },
      { href: "#", label: "News" },
      { href: "#", label: "Contact us" },
    ],
  },
];

const LEGAL_LINKS = [
  { href: "#", label: "Accessibility statement" },
  { href: "#", label: "Privacy notice" },
  { href: "#", label: "Cookies" },
  { href: "#", label: "Safeguarding" },
  { href: "#", label: "Freedom of information" },
];

const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", Icon: FacebookIcon },
  { href: "#", label: "Instagram", Icon: InstagramIcon },
  { href: "#", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "#", label: "YouTube", Icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="bg-brand-strong text-fg-inverse">
      <div className="h-2 bg-gradient-brand" />
      <div className="container-page grid grid-cols-1 gap-12 py-16 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Image src="/images/logo-white.png" alt="Chelmsford College" width={160} height={32} />
          <address className="type-body-s not-italic text-fg-inverse">
            Princes Road, Chelmsford, Essex CM2 9DE
          </address>
          <Link href="tel:01245293000" className="type-body-s flex items-center gap-2 text-fg-inverse focus-visible:focus-ring">
            <Phone className="size-4" aria-hidden="true" />
            01245 293000
          </Link>
          <Link href="#" className="type-link-s flex items-center gap-2 text-fg-inverse focus-visible:focus-ring">
            <Mail className="size-4" aria-hidden="true" />
            Send us a message
          </Link>
          <ul className="mt-2 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  className="flex size-12 items-center justify-center rounded-full border border-line-inverse text-fg-inverse focus-visible:focus-ring"
                >
                  <Icon className="size-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {LINK_COLUMNS.map((column) => (
          <div key={column.heading} className="flex flex-col gap-4">
            <h2 className="type-h6 text-fg-inverse">{column.heading}</h2>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="type-body-s text-fg-inverse focus-visible:focus-ring">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line-inverse">
        <div className="container-page flex flex-col items-center gap-4 py-6 lg:flex-row lg:justify-between">
          <ul className="flex flex-wrap items-center justify-center gap-4">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="type-caption text-fg-inverse focus-visible:focus-ring">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="type-caption text-fg-inverse">© Chelmsford College</p>
        </div>
      </div>
    </footer>
  );
}
