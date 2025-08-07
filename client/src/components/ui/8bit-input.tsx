import * as React from "react"
import { cn } from "@/lib/utils"

export interface BitInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const BitInput = React.forwardRef<HTMLInputElement, BitInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border-4 border-neon-green bg-dark-bg px-3 py-2 text-sm text-white font-pixel file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:border-neon-cyan focus-visible:shadow-[0_0_10px_rgba(0,255,65,0.5)] disabled:cursor-not-allowed disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
BitInput.displayName = "BitInput"

export { BitInput }