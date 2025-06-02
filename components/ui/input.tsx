import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "block w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          "sm:text-base sm:py-2.5", // Responsive padding and font size
          "file:border-0 file:bg-transparent file:text-sm file:font-medium", // File input styling
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
