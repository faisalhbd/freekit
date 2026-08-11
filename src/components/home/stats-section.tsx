import { Heart, UserX, Shield, Zap, Smartphone, RefreshCw } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface StatItem {
  icon: LucideIcon
  title: string
  description: string
}

const stats: StatItem[] = [
  {
    icon: Heart,
    title: "100% Free",
    description: "Every tool is completely free to use with no hidden costs, subscriptions, or premium plans.",
  },
  {
    icon: UserX,
    title: "No Sign Up",
    description: "Start using any tool instantly without creating an account or sharing personal information.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Most tools process your data directly in your browser. Your files and text stay under your control.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Our tools are optimized for speed, allowing you to complete tasks in seconds without waiting.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Every tool is fully responsive and works seamlessly on desktops, tablets, and smartphones.",
  },
  {
    icon: RefreshCw,
    title: "Regular Updates",
    description: "New tools, improvements, and feature updates are added regularly to keep FreeKit useful.",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30" aria-label="Why choose FreeKit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Why Choose FreeKit
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            FreeKit is built with simplicity, speed, and privacy in mind. Whether
            you&apos;re a developer, SEO specialist, student, or business owner,
            our tools are designed to help you complete everyday tasks quickly.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className="group rounded-xl border border-border bg-card p-5 sm:p-6 transition-shadow hover:shadow-md"
              >
                <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 mb-4 transition-colors group-hover:bg-primary/15">
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold">{stat.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}