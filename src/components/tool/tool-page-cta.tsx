import Image from "next/image"
import Link from "next/link"
import { Mail, MessageCircle, Linkedin, BadgeCheck, ArrowRight, Clock, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  "SEO Audit, Technical SEO & On-Page SEO",
  "WordPress & Shopify Development",
  "WooCommerce & E-commerce Management",
  "n8n & AI Workflow Automation",
  "Python Automation & Web Scraping",
  "VPS, Linux & Self-Hosted Infrastructure",
  "AI Vibe Coding Expert — APPS, WEB, SAAS",
]

export function ToolPageCTA() {
  return (
    <section className="mt-16" aria-label="About the developer">
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
            {/* Profile Photo */}
            <div className="shrink-0">
              <div className="relative size-24 sm:size-28">
                <Image
                  src="/ceo-profile.jpg"
                  alt="Faisal Hossain — Founder & Developer of FreeKit"
                  fill
                  className="rounded-full object-cover"
                  priority={false}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight inline-flex items-center gap-2 justify-center sm:justify-start">
                  Faisal Hossain
                  <BadgeCheck className="size-5 sm:size-6 fill-blue-500 text-white" aria-label="Verified" />
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Founder & Developer of FreeKit
                </p>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                I personally designed and built every tool on this website — including the one
                you just used. If these tools have been helpful, I can build custom tools,
                automation workflows, websites, and SEO solutions tailored to your business.
              </p>

              {/* Services */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Services
                </h3>
                <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {services.map((service) => (
                    <li
                      key={service}
                      className="text-xs sm:text-sm text-foreground flex items-start gap-2"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Availability */}
              <div className="rounded-lg border border-border bg-background p-3 sm:p-4 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Availability
                </h3>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                  <div className="flex items-start gap-2">
                    <Clock className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        Remote: <span className="text-emerald-600 dark:text-emerald-400">Available Now</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        United States &amp; European company
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        USD $25/hour or USD $1,500/month
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Plane className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        On-site: <span className="text-amber-600 dark:text-amber-400">Open to Relocation</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        With work visa &amp; travel support
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Button asChild size="sm">
                  <a href="mailto:ifaisal.eth@gmail.com">
                    <Mail className="size-4" />
                    Email Me
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="https://wa.me/8801719619698" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="https://linkedin.com/in/ifaisalh" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="size-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom link back to homepage */}
        <div className="border-t border-border bg-muted/20 px-6 py-3 sm:px-8">
          <Link
            href="/#hire-me"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View full profile &amp; services
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
