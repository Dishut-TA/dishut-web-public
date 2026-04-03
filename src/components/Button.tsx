import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl"; 
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  variant = "primary",
  size = "md", // default
  fullWidth,
  loading,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyle =
    "rounded-full font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/70",
    secondary: "bg-secondary text-white hover:bg-secondary/70",
    tertiary: "bg-tertiary text-white hover:bg-tertiary/70",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/10",
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={clsx(
        baseStyle,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Left Icon */}
      {leftIcon && !loading && <span>{leftIcon}</span>}

      {/* Text */}
      {loading ? "Loading..." : label || children}

      {/* Right Icon */}
      {rightIcon && !loading && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;