import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-teal text-white shadow-lg shadow-teal/20 hover:bg-teal/90 focus-visible:outline-teal",
  secondary:
    "bg-white text-ink ring-1 ring-black/10 hover:bg-sand focus-visible:outline-coral",
  ghost:
    "bg-transparent text-ink hover:bg-white/70 focus-visible:outline-coral",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

