import { forwardRef } from "react";
import clsx from "clsx";

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
};

const variantClasses = {
  solid: {
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    red: "bg-red-600 text-white hover:bg-red-700",
    gray: "bg-gray-600 text-white hover:bg-gray-700",
  },
  outline: {
    blue: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    red: "border border-red-600 text-red-600 hover:bg-red-50",
    gray: "border border-gray-600 text-gray-600 hover:bg-gray-50",
  },
  ghost: {
    blue: "text-blue-600 hover:bg-blue-100",
    red: "text-red-600 hover:bg-red-100",
    gray: "text-gray-600 hover:bg-gray-100",
  },
  link: {
    blue: "text-blue-600 underline hover:text-blue-800",
    red: "text-red-600 underline hover:text-red-800",
    gray: "text-gray-600 underline hover:text-gray-800",
  },
};

const Button = forwardRef(
  (
    {
      children,
      size = "md",
      variant = "solid",
      color = "blue",
      icon,
      isLoading = false,
      spinner,
      spinnerPlacement = "start",
      disabled = false,
      as = "button",
      radius = "rounded",
      href,
      className,
      ...props
    },
    ref
  ) => {
    const Component = as === "a" ? "a" : "button";

    const baseStyles =
      "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantStyle = variantClasses[variant]?.[color] || "";

    const spinnerElement = spinner ?? (
      <div className='w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin' />
    );

    const isDisabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        href={as === "a" ? href : undefined}
        className={clsx(
          baseStyles,
          sizeClasses[size],
          variantStyle,
          radius,
          isDisabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={as !== "a" && isDisabled}
        {...props}
      >
        {isLoading && spinnerPlacement === "start" && (
          <span className='mr-2'>{spinnerElement}</span>
        )}
        {icon && <span className='mr-2'>{icon}</span>}
        {children}
        {isLoading && spinnerPlacement === "end" && (
          <span className='ml-2'>{spinnerElement}</span>
        )}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;
