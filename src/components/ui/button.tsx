import * as React from "react";

import { cn } from "@/lib/utils";

// Lightweight, dependency-free Button (no cva / @radix-ui/react-slot needed).
// Variant/size give sensible defaults; callers override freely via className
// (tailwind-merge resolves conflicts, last wins).
type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-white/10 text-white hover:bg-white/15",
  secondary: "bg-white/10 text-white hover:bg-white/15",
  outline: "border border-white/15 text-white hover:bg-white/10",
  ghost: "text-white hover:bg-white/10",
  link: "text-white underline-offset-4 hover:underline",
  destructive: "bg-[#ff4b42] text-white hover:bg-[#ff4b42]/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button };
