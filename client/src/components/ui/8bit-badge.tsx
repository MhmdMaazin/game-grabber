import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const bitBadgeVariants = cva(
  "inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-pixel shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
  {
    variants: {
      variant: {
        default: "border-neon-green bg-neon-green text-dark-bg",
        secondary: "border-neon-cyan bg-neon-cyan text-dark-bg",
        destructive: "border-game-red bg-game-red text-white",
        outline: "border-neon-green text-neon-green bg-transparent",
        neon: "border-neon-pink bg-neon-pink text-white animate-pixel-pulse",
        free: "border-neon-green bg-neon-green text-dark-bg animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BitBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bitBadgeVariants> {}

function BitBadge({ className, variant, ...props }: BitBadgeProps) {
  return (
    <div className={cn(bitBadgeVariants({ variant }), className)} {...props} />
  )
}

export { BitBadge, bitBadgeVariants }