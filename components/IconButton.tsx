import NextLink from "next/link";
import type { LucideIcon } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

const iconButton = tv({
  base: "inline-flex size-12 items-center justify-center rounded-md transition-colors duration-120 ease-standard focus-visible:focus-ring disabled:bg-surface-disabled disabled:text-fg-disabled",
  variants: {
    variant: {
      primary: "bg-brand text-fg-on-brand hover:bg-brand-hover",
      secondary: "border-2 border-line-brand bg-surface text-fg-brand hover:bg-brand-subtle",
      ghost: "bg-transparent text-icon hover:bg-surface-hover",
      inverse: "bg-surface text-fg-brand hover:bg-brand-subtle",
    },
  },
  defaultVariants: { variant: "ghost" },
});

type IconButtonVariants = VariantProps<typeof iconButton>;

interface IconButtonProps extends IconButtonVariants {
  icon: LucideIcon;
  "aria-label": string;
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function IconButton({ variant, icon: Icon, href, className, type, ...rest }: IconButtonProps) {
  const classes = iconButton({ variant, className });

  if (href) {
    return (
      <NextLink href={href} className={classes} {...rest}>
        <Icon className="size-6" aria-hidden="true" />
      </NextLink>
    );
  }

  return (
    <button className={classes} type={type ?? "button"} {...rest}>
      <Icon className="size-6" aria-hidden="true" />
    </button>
  );
}
