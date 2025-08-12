"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import "./styles/retro.css";

// Re-export base parts EXCEPT Trigger
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectValue,
} from "@/components/ui/select";

// 8-bit framed Trigger matching the 8-bit Button frame
export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex h-10 w-full items-center justify-between rounded-none border-0 bg-black px-3 py-2 text-sm text-white retro",
      "focus:outline-none focus:ring-0",
      className
    )}
    {...props}
  >
    <span className="relative inline-flex w-full items-center justify-between gap-1.5">
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-80" />
      </SelectPrimitive.Icon>
    </span>

    {/* Pixelated border pieces */}
    <div className="pointer-events-none absolute -top-1.5 left-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring" />
    <div className="pointer-events-none absolute -top-1.5 right-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring" />
    <div className="pointer-events-none absolute -bottom-1.5 left-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring" />
    <div className="pointer-events-none absolute -bottom-1.5 right-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring" />
    <div className="pointer-events-none absolute top-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
    <div className="pointer-events-none absolute top-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
    <div className="pointer-events-none absolute bottom-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
    <div className="pointer-events-none absolute bottom-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
    <div className="pointer-events-none absolute top-1.5 -left-1.5 h-2/3 w-1.5 bg-foreground dark:bg-ring" />
    <div className="pointer-events-none absolute top-1.5 -right-1.5 h-2/3 w-1.5 bg-foreground dark:bg-ring" />

    {/* Soft shadows */}
    <div className="pointer-events-none absolute top-0 left-0 h-1.5 w-full bg-foreground/20" />
    <div className="pointer-events-none absolute top-1.5 left-0 h-1.5 w-3 bg-foreground/20" />
    <div className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full bg-foreground/20" />
    <div className="pointer-events-none absolute bottom-1.5 right-0 h-1.5 w-3 bg-foreground/20" />
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
