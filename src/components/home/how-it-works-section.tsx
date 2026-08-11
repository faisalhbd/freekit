import { Search, MousePointerClick, ClipboardCopy } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Step {
  icon: LucideIcon
  step: number
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: Search,
    step: 1,
    title: "Choose a Tool",
    description:
      "Browse categories or use the search bar to find the tool you need.",
  },
  {
    icon: MousePointerClick,
    step: 2,
    title: "Use Instantly",
    description:
      "Enter your text, data, or settings. Most tools process everything in real time without requiring uploads or registration.",
  },
  {
    icon: ClipboardCopy,
    step: 3,
    title: "Copy or Download",
    description:
      "Copy the generated result with one click or download it if the tool supports file export.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-20" aria-label="How it works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            How It Works
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Using FreeKit is simple and takes only a few seconds.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px border-t-2 border-dashed border-border"
            aria-hidden="true"
          />
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="relative text-center group">
              <div className="relative inline-flex items-center justify-center mb-5">
                <div className="flex items-center justify-center rounded-full bg-primary text-primary-foreground size-14 sm:size-16 shadow-sm">
                  <Icon className="size-6 sm:size-7" aria-hidden="true" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full bg-background border-2 border-primary text-primary text-xs font-bold size-6">
                  {step}
                </span>
              </div>
              <h3 className="text-base font-semibold mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}