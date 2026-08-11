import type { Metadata } from "next"
import { Mail, MessageSquare, Clock } from "lucide-react"
import { siteConfig } from "@/config/site"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${siteConfig.name} team. We'd love to hear your feedback, suggestions, or bug reports.`,
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <div className="mt-8 space-y-12">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <MessageSquare className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or found a bug? We&apos;d love to hear
            from you. Reach out through any of the channels below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-6 space-y-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Mail className="size-5 text-foreground" />
            </div>
            <h2 className="font-semibold text-lg">Email</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For general inquiries, partnerships, or support requests.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="rounded-xl border border-border p-6 space-y-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Clock className="size-5 text-foreground" />
            </div>
            <h2 className="font-semibold text-lg">Response Time</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We typically respond within 24–48 hours during business days.
              We appreciate your patience.
            </p>
            <p className="text-sm text-muted-foreground">
              Monday – Friday, 9:00 AM – 6:00 PM (BST)
            </p>
          </div>
        </div>

        {/* What we help with */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How Can We Help?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Bug Reports",
                description: "Found something broken? Let us know the tool name, what you did, and what happened.",
              },
              {
                title: "Feature Requests",
                description: "Have an idea for a new tool or an improvement? We love hearing from our users.",
              },
              {
                title: "General Feedback",
                description: "Tell us what you love, what could be better, or how we can improve your experience.",
              },
              {
                title: "Partnerships",
                description: "Interested in collaborating or featuring your product? Reach out to discuss opportunities.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border p-4 space-y-1"
              >
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Note */}
        <div className="rounded-lg bg-muted/50 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Please note that {siteConfig.name} is a free tool website. We do not
            offer paid consulting, custom development, or enterprise support at
            this time.
          </p>
        </div>
      </div>
    </div>
  )
}