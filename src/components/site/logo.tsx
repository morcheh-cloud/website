import { cn } from "@/lib/utils"

// Morcheh means "ant": the mark is its three body segments, as in the panel.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 16"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-4 w-8", className)}
    >
      <circle cx="4.5" cy="8" r="3.5" />
      <circle cx="12.5" cy="8" r="2.5" />
      <ellipse cx="24" cy="8" rx="7" ry="5.5" />
    </svg>
  )
}

export function Logo({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display font-medium text-lg text-lumen",
        className,
      )}
    >
      <LogoMark className="text-honey" />
      {name}
    </span>
  )
}

// An ant for SVG scenes, head pointing along +x so animateMotion's
// rotate="auto" walks it head first. About 6 units long.
export function AntShape() {
  return (
    <g>
      <g
        className="stroke-honey/70"
        strokeWidth="0.35"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M-0.2 0 L-1 -1.6 M-0.2 0 L-1 1.6" />
        <path d="M0.4 0 L0.6 -1.7 M0.4 0 L0.6 1.7" />
        <path d="M1 0 L2 -1.5 M1 0 L2 1.5" />
      </g>
      <g className="fill-honey">
        <ellipse cx="-1.7" cy="0" rx="1.5" ry="1.1" />
        <circle cx="0.4" cy="0" r="0.6" />
        <circle cx="2" cy="0" r="0.85" />
      </g>
    </g>
  )
}
