import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const bitButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-pixel image-rendering-pixelated border-4 border-solid transform transition-transform duration-75 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-neon-green text-dark-bg border-neon-green hover:bg-neon-cyan hover:border-neon-cyan shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        destructive: "bg-game-red text-white border-game-red hover:bg-red-600 hover:border-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        outline: "border-neon-green text-neon-green bg-transparent hover:bg-neon-green hover:text-dark-bg shadow-[4px_4px_0px_0px_rgba(0,255,65,0.3)]",
        secondary: "bg-neon-cyan text-dark-bg border-neon-cyan hover:bg-neon-yellow hover:border-neon-yellow shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        ghost: "border-transparent text-neon-green hover:bg-neon-green hover:text-dark-bg hover:border-neon-green",
        link: "text-neon-cyan underline-offset-4 hover:underline border-transparent",
        neon: "bg-neon-pink text-white border-neon-pink hover:bg-neon-purple hover:border-neon-purple shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pixel-pulse",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof bitButtonVariants> {
  asChild?: boolean
}

const BitButton = React.forwardRef<HTMLButtonElement, BitButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(bitButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
BitButton.displayName = "BitButton"

export { BitButton, bitButtonVariants }