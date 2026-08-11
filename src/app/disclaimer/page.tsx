import type { Metadata } from "next"
import { AlertTriangle } from "lucide-react"
import { siteConfig } from "@/config/site"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer for ${siteConfig.name}. Understand the limitations and responsibilities when using our free online tools.`,
  alternates: { canonical: "/disclaimer" },
}

const sections = [
  {
    title: "General Disclaimer",
    content: [
      `The information and tools provided on ${siteConfig.name} are for general informational and utility purposes only. While we strive to ensure accuracy and reliability, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of the tools or their output.`,
      "Any reliance you place on the results of our tools is strictly at your own risk.",
    ],
  },
  {
    title: "Not Professional Advice",
    content: [
      "The tools and content on this website do not constitute professional advice of any kind. This includes, but is not limited to: legal, financial, medical, technical, or SEO advice.",
      "Always consult with a qualified professional for advice specific to your situation. Do not use our tools as a substitute for professional judgment.",
    ],
  },
  {
    title: "Tool Accuracy",
    content: [
      "While we test our tools thoroughly, errors may occur. Tool results should be verified independently before being used for critical purposes.",
      "We are not responsible for any losses, damages, or consequences arising from the use of tool output, including but not limited to: incorrect calculations, formatting errors, data loss, or misinterpretation of results.",
    ],
  },
  {
    title: "SEO Tools",
    content: [
      "Our SEO tools provide suggestions and analysis based on general best practices. Search engine algorithms change frequently, and we cannot guarantee that following our tool recommendations will result in specific search rankings.",
      "SEO success depends on many factors beyond our tools, including content quality, backlinks, user experience, and search engine algorithm updates.",
    ],
  },
  {
    title: "No Endorsement",
    content: [
      "References to specific products, services, or organizations within our tools or content do not constitute or imply endorsement by " + siteConfig.name + ".",
      "Mention of third-party products or services is for informational purposes only.",
    ],
  },
  {
    title: "External Links",
    content: [
      "Our website may contain links to external websites. We have no control over the content, availability, or privacy practices of these sites. The inclusion of any link does not imply endorsement.",
    ],
  },
  {
    title: "Availability",
    content: [
      `We strive to keep ${siteConfig.name} available at all times, but we do not guarantee uninterrupted access. The website may be temporarily unavailable due to maintenance, server issues, or circumstances beyond our control.`,
    ],
  },
  {
    title: "User Responsibility",
    content: [
      "You are solely responsible for the data you input into our tools and how you use the output. Do not input sensitive, confidential, or personally identifiable information into any tool unless you understand and accept the risks.",
      "Although our tools process data locally in your browser, you should exercise caution with sensitive data on any website.",
    ],
  },
  {
    title: "Changes",
    content: [
      "We reserve the right to modify, update, or remove any tool or content on this website at any time without prior notice.",
    ],
  },
  {
    title: "Contact",
    content: [
      `If you have questions about this disclaimer, please contact us at ${siteConfig.email}.`,
    ],
  },
]

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Disclaimer" },
        ]}
      />

      <div className="mt-8 space-y-12">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <AlertTriangle className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Disclaimer
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Please understand the limitations and responsibilities when using {siteConfig.name}.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: June 2025
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              {section.content.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
