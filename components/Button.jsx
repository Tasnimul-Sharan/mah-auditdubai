import React from "react";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  as: Component = "button",
  ...props
}) {
  let base =
    "inline-flex min-h-11 items-center justify-center rounded-lg font-bold transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
  let variants = {
    primary: "bg-primary text-white hover:bg-secondary",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "bg-transparent text-primary hover:bg-primary hover:text-white",
  };
  let sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "min-h-12 px-8 py-3 text-lg",
  };

  const elementProps =
    Component === "button" ? { type: "button", ...props } : props;

  return (
    <Component
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...elementProps}
    >
      {children}
    </Component>
  );
}
