import * as React from "react";
import { cn } from "@/lib/utils";

import "./styles/retro.css";

export interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function Frame({ className, children, ...props }: FrameProps) {
  return (
    <div
      className={cn(
        "relative inline-block w-full rounded-none retro",
        className
      )}
      {...props}
    >
      {children}

      {/* Pixelated border pieces matching 8-bit Button */}
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

      {/* Soft shadows like non-outline 8-bit button */}
      <div className="pointer-events-none absolute top-0 left-0 h-1.5 w-full bg-foreground/20" />
      <div className="pointer-events-none absolute top-1.5 left-0 h-1.5 w-3 bg-foreground/20" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full bg-foreground/20" />
      <div className="pointer-events-none absolute bottom-1.5 right-0 h-1.5 w-3 bg-foreground/20" />
    </div>
  );
}


