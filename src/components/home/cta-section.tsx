import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-16 md:py-24" aria-label="Call to action">
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to Boost Your Productivity?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-balance">
          Explore our collection of free online tools designed to help you work
          smarter, not harder.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="#categories">
              Browse All Tools
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}