// components/ui/switch.tsx
"use client";
import { Switch as SwitchPrimitive } from "radix-ui";
import * as React from "react";
import { Sun, Moon } from "lucide-react"; // Import your icons
import { cn } from "@/lib/utils";

const ThemeSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    >
      {/* Icon Logic inside the Thumb */}
      <Sun className="h-3 w-3 text-yellow-500 transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-3 w-3 text-blue-400 transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
    </SwitchPrimitive.Thumb>
  </SwitchPrimitive.Root>
));
ThemeSwitch.displayName = SwitchPrimitive.Root.displayName;

export { ThemeSwitch };
