import * as React from "react"
import { cn } from "@/lib/utils"

const BitCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-dark-secondary border-4 border-neon-green text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-pixel transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,255,65,0.5)] hover:border-neon-cyan",
      className
    )}
    {...props}
  />
))
BitCard.displayName = "BitCard"

const BitCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 bg-dark-tertiary border-b-2 border-neon-green", className)}
    {...props}
  />
))
BitCardHeader.displayName = "BitCardHeader"

const BitCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-bold leading-none tracking-tight text-neon-yellow",
      className
    )}
    {...props}
  />
))
BitCardTitle.displayName = "BitCardTitle"

const BitCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-300", className)}
    {...props}
  />
))
BitCardDescription.displayName = "BitCardDescription"

const BitCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
BitCardContent.displayName = "BitCardContent"

const BitCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
BitCardFooter.displayName = "BitCardFooter"

export { BitCard, BitCardHeader, BitCardFooter, BitCardTitle, BitCardDescription, BitCardContent }