import Link from "next/link"
import { ArrowRight, Search, Zap } from "lucide-react"

import { siteConfig } from "@/config/site"
import { getSiteStats } from "@/lib/tool-engine"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const { toolCount, categoryCount } = getSiteStats()

  return (
    <section
      id="hero"
      className="py-20 md:py-28 lg:py-32"
      aria-label="Hero"
    >
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
        <Badge variant="secondary" className="mb-6">
          <Zap className="size-3" />
          100% Free
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Free Online Tools for Everyone
        </h1>

        <p className="mt-6 text-lg text-muted-foreground md:text-xl text-balance">
          {siteConfig.description}
        </p>

        <div className="mt-8 flex flex-col gap-4 justify-center sm:flex-row">
          <Button asChild size="lg">
            <Link href="#categories">
              Explore All Tools
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#categories">
              <Search className="size-4" />
              Search Tools
            </Link>
          </Button>
        </div>

        <div
          className="mt-12 flex justify-center gap-8 md:gap-12"
          aria-label="Site statistics"
        >
          <div className="text-center">
            <p className="text-2xl font-bold">{toolCount}+</p>
            <p className="text-sm text-muted-foreground">Free Tools</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{categoryCount}</p>
            <p className="text-sm text-muted-foreground">Categories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">&#8734;</p>
            <p className="text-sm text-muted-foreground">No Sign-Up Required</p>
          </div>
        </div>
      </div>
    </section>
  )
}