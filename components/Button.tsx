import NextLink from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const button = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-md transition-colors duration-120 ease-standard focus-visible:focus-ring disabled:bg-surface-disabled disabled:text-fg-disabled disabled:border-transparent",
  variants: {
    variant: {
      primary: "bg-brand text-fg-on-brand hover:bg-brand-hover",
      secondary: "border-2 border-line-brand bg-surface text-fg-brand hover:bg-brand-subtle",
      accent: "bg-accent text-fg-on-accent hover:bg-accent-hover",
      ghost: "bg-transparent text-fg-link hover:bg-surface-hover hover:underline",
      inverse: "bg-surface text-fg-brand hover:bg-brand-subtle",
    },
    size: {
      large: "h-control-lg px-8 type-button-l",
      medium: "h-12 px-5 type-button-m",
    },
  },
  defaultVariants: { variant: "primary", size: "medium" },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends ButtonVariants {
  href?: string;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

export function Button({
  variant,
  size = "medium",
  href,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  className,
  children,
  type,
  ...rest
}: ButtonProps) {
  const classes = button({ variant, size, className });
  const iconSize = size === "large" ? "size-6" : "size-5";
  const content = (
    <>
      {LeadingIcon ? <LeadingIcon className={iconSize} aria-hidden="true" /> : null}
      {children}
      {TrailingIcon ? <TrailingIcon className={iconSize} aria-hidden="true" /> : null}
    </>
  );

  if (href) {
    return (
      <NextLink href={href} className={classes} {...rest}>
        {content}
      </NextLink>
    );
  }

  return (
    <button className={classes} type={type ?? "button"} {...rest}>
      {content}
    </button>
  );
}
