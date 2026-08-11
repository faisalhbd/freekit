import Image from "next/image"
import { Mail, MessageCircle, Linkedin, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  "SEO Audit, Technical SEO & On-Page SEO",
  "WordPress & Shopify Development",
  "WooCommerce & E-commerce Management",
  "n8n & AI Workflow Automation",
  "Python Automation & Web Scraping",
  "VPS, Linux & Self-Hosted Infrastructure",
]

export function HireMeSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10">
            {/* Profile Photo */}
            <div className="shrink-0">
              <div className="relative size-36 sm:size-40">
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
            <div className="flex-1 text-center md:text-left space-y-5">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl inline-flex items-center gap-2">
                  Faisal Hossain
                  <BadgeCheck className="size-6 sm:size-7 fill-blue-500 text-white" aria-label="Verified" />
                </h2>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  Founder & Developer of FreeKit
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                I personally designed and built every tool on this website. If these tools
                have been useful, I can build custom tools, automation workflows, websites,
                and SEO solutions tailored to your business.
              </p>

              {/* Services */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Services
                </h3>
                <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {services.map((service) => (
                    <li
                      key={service}
                      className="text-sm text-foreground flex items-start gap-2"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Availability */}
              <div className="rounded-lg border border-border bg-background p-4 space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Availability
                </h3>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                  <div>
                    <p className="text-sm font-medium">
                      Remote: <span className="text-emerald-600 dark:text-emerald-400">Available Now</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      USD $25/hour or USD $1,500/month
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      On-site: <span className="text-amber-600 dark:text-amber-400">Open to Relocation</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      With work visa & travel support
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
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
      </div>
    </section>
  )
}
