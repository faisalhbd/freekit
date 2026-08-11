import type { Metadata } from "next"
import { ShieldCheck } from "lucide-react"
import { siteConfig } from "@/config/site"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Learn how ${siteConfig.name} handles your data. Your privacy matters to us — all tools process data locally in your browser.`,
  alternates: { canonical: "/privacy-policy" },
}

const sections = [
  {
    title: "Information We Collect",
    content: [
      "We do not collect, store, or process any personal data when you use our tools. All tool processing happens entirely within your browser on your device.",
      "We may collect anonymized, aggregated analytics data such as page views, tool usage frequency, and general geographic regions (country/city level only). This data cannot be used to identify individual users.",
    ],
  },
  {
    title: "How We Use Your Data",
    content: [
      "Since we do not collect personal data, there is no personal data to use. The anonymized analytics data we may collect is used solely to understand how our tools are being used so we can improve them.",
      "We never sell, share, or trade any data — personal or anonymized — with third parties for marketing or advertising purposes.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "We use minimal cookies necessary for the website to function properly. This may include a cookie to store your theme preference (light/dark mode).",
      "We do not use tracking cookies, advertising cookies, or third-party analytics cookies that track you across websites.",
    ],
  },
  {
    title: "Local Storage",
    content: [
      "Some tools may use your browser's local storage to save your preferences, recent inputs, or tool history. This data never leaves your device and is fully controlled by you.",
      "You can clear this data at any time through your browser's settings.",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "Our website may use third-party services for hosting, content delivery, or fonts. These services may collect standard technical information (IP address, browser type, etc.) as described in their own privacy policies.",
      "We do not integrate with third-party advertising networks, social media tracking pixels, or data brokers.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "All tool processing happens client-side in your browser. Your input data is never transmitted to our servers or any third-party servers during tool usage.",
      "Our website is served over HTTPS to ensure secure communication between your browser and our servers.",
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      "Our services are not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided personal information, please contact us.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this privacy policy from time to time. Changes will be posted on this page with an updated date. We encourage you to review this page periodically.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      `If you have questions about this privacy policy, please contact us at ${siteConfig.email}.`,
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <div className="mt-8 space-y-12">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <ShieldCheck className="size-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how {siteConfig.name} handles your data.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: June 2025
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            At {siteConfig.name}, we believe in transparency and respect for your
            privacy. Unlike many online tools, all of our tools process data
            directly in your browser. Your data never leaves your device.
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