import type { Metadata } from "next"
import { Wrench, Target, Shield, Users, Globe } from "lucide-react"
import { siteConfig } from "@/config/site"
import { getSiteStats } from "@/lib/tool-engine"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"

const { toolCount, categoryCount } = getSiteStats()

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — our mission, values, and the team behind ${toolCount}+ free online tools.`,
  alternates: { canonical: "/about" },
}

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "Every tool is carefully crafted, tested, and optimized for the best user experience.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "All processing happens in your browser. We never store, track, or share your data.",
  },
  {
    icon: Globe,
    title: "Free Forever",
    description: "No hidden charges, no premium tiers, no sign-up walls. Every tool is 100% free.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built for developers, designers, writers, and creators who need reliable tools.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <div className="mt-8 space-y-12">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Wrench className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About {siteConfig.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe powerful tools should be accessible to everyone.
            {siteConfig.name} provides {toolCount}+ free online tools that work
            instantly in your browser — no sign-up required.
          </p>
        </div>

        {/* Mission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            The internet is full of overpriced, bloated, and privacy-invasive tools.
            We set out to build an alternative: a comprehensive collection of
            high-quality online tools that are completely free, respect your privacy,
            and work without any barriers.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you are a developer debugging JSON, a writer counting words, an
            SEO professional generating meta tags, or a student working on a project
            — {siteConfig.name} has the right tool for you. All {toolCount}+ tools
            across {categoryCount} categories are built with care and maintained
            regularly.
          </p>
        </section>

        {/* Values */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border p-6 space-y-3"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <item.icon className="size-5 text-foreground" />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Every tool on {siteConfig.name} runs entirely in your browser using
              client-side JavaScript. This means:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">No data leaves your device</strong> —
                Your input is never sent to any server.
              </li>
              <li>
                <strong className="text-foreground">Instant results</strong> —
                No waiting for server processing or network delays.
              </li>
              <li>
                <strong className="text-foreground">Works offline</strong> —
                Once loaded, many tools continue to work without internet.
              </li>
              <li>
                <strong className="text-foreground">No account needed</strong> —
                Just open a tool and start using it.
              </li>
            </ul>
          </div>
        </section>

        {/* Built with */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Built With Care</h2>
          <p className="text-muted-foreground leading-relaxed">
            {siteConfig.name} is built with modern web technologies including Next.js,
            TypeScript, and Tailwind CSS. We follow web standards, prioritize
            accessibility, and ensure every tool works beautifully across all devices
            and screen sizes. Each tool is reviewed for quality, performance, and
            usability before publication.
          </p>
        </section>
      </div>
    </div>
  )
}