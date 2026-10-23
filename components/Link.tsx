import NextLink from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

const link = tv({
  base: "inline-flex items-center gap-1 focus-visible:focus-highlight",
  variants: {
    tone: {
      default: "text-fg-link hover:text-fg-link-hover",
      inverse: "text-fg-inverse hover:text-fg-inverse",
    },
    size: {
      m: "type-link-m",
      s: "type-link-s",
    },
  },
  defaultVariants: { tone: "default", size: "m" },
});

type LinkVariants = VariantProps<typeof link>;

interface LinkProps extends LinkVariants {
  href: string;
  external?: boolean;
  showIcon?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Link({ href, tone, size, external, showIcon = Boolean(external), className, children }: LinkProps) {
  const classes = link({ tone, size, className });
  const Icon = external ? ExternalLink : ArrowRight;
  const icon = showIcon ? <Icon className="size-4" aria-hidden="true" /> : null;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes}>
      {children}
      {icon}
    </NextLink>
  );
}
