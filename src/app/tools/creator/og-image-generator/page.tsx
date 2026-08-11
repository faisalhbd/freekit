import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { OGImageGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function OGImageGeneratorPage() {
  const schemas = getSchemas()
  return (
    <>
      {/* 1. JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 2. Tool Header */}
        <ToolHeader tool={toolConfig} />

        {/* 3. Tool Section */}
        <section className="mt-8" aria-label="OG Image Generator">
          <OGImageGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the OG Image Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose a template</span> — Select from Blog Post, Product, Article, Event, or Custom to start with pre-configured settings tailored to different content types.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter your text</span> — Type your title (up to 60 characters) and subtitle (up to 120 characters). Add your brand or website name for recognition.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize the design</span> — Pick a solid color or gradient background, set text colors, adjust font sizes, and choose a layout style (centered, left-aligned, or bottom-heavy).
            </li>
            <li>
              <span className="text-foreground font-medium">Preview in real time</span> — See your OG image update live as you make changes. The preview maintains the correct 1200×630 aspect ratio.
            </li>
            <li>
              <span className="text-foreground font-medium">Download your image</span> — Click the Download PNG button to generate and save a high-quality 1200×630 pixel image ready for use as your og:image.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "5 built-in templates: Blog Post, Product, Article, Event, and Custom",
              "Real-time WYSIWYG preview at 1200×630 aspect ratio",
              "Solid color and linear gradient background options",
              "Two-color gradient with adjustable angle (0°–360°)",
              "Custom text and background color pickers with hex input",
              "Adjustable title and subtitle font sizes with range sliders",
              "Three layout options: Centered, Left-Aligned, and Bottom-Heavy",
              "Character counters for title (60 max) and subtitle (120 max)",
              "Brand/website name displayed at top of the image",
              "One-click PNG download at full 1200×630 resolution",
              "Reset button to restore template defaults instantly",
              "100% client-side — no data leaves your browser",
              "Fully responsive design for desktop and mobile editing",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Benefits */}
        <section className="mt-16 space-y-4" aria-label="Benefits">
          <h2 className="text-2xl font-bold tracking-tight">Benefits of Using OG Images</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Higher Click-Through Rates",
                d: "Links with custom OG images receive 2–3x more clicks than those without. A visually compelling preview makes your content stand out in crowded social feeds and compels users to click.",
              },
              {
                t: "Brand Consistency",
                d: "Create a consistent visual identity across all your shared links. When every page has a professionally designed OG image, your brand becomes instantly recognizable in social media feeds.",
              },
              {
                t: "Professional Appearance",
                d: "Custom OG images signal quality and professionalism. Users are more likely to trust and engage with content that has polished, branded preview images rather than auto-generated ones.",
              },
              {
                t: "Better Social Engagement",
                d: "Posts with attractive preview images get more likes, shares, and comments. OG images are the first impression of your content on social platforms — make it count.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Blog Post Previews", d: "Create branded OG images for every blog post to increase shares and traffic from social media platforms like Facebook, Twitter, and LinkedIn." },
              { t: "Product Launches", d: "Design eye-catching OG images for product pages that showcase your product name and tagline when shared on social media." },
              { t: "Event Announcements", d: "Promote conferences, webinars, and meetups with custom OG images featuring event details and branding." },
              { t: "Content Marketing", d: "Generate consistent OG images for articles, guides, and resources to build a recognizable content brand across social channels." },
              { t: "Landing Pages", d: "Create preview images for landing pages and signup forms that make your call-to-action links irresistible when shared." },
              { t: "Portfolio & Case Studies", d: "Design OG images for portfolio pieces and case studies that highlight your work and attract potential clients on social media." },
              { t: "Newsletter Previews", d: "Create OG images for newsletter archive pages and signup forms to drive subscriptions from social traffic." },
              { t: "Documentation Pages", d: "Add branded OG images to documentation and API reference pages for a polished developer experience." },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-lg border border-border bg-card p-4"
              >
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">OG Image Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always use the 1200×630 pixel size for maximum compatibility across Facebook, Twitter, LinkedIn, Slack, and other platforms.",
              "Keep your title short and impactful — under 60 characters ensures it is fully readable on mobile devices.",
              "Use high contrast between text and background colors to ensure readability on all screen sizes and brightness levels.",
              "Include your brand name consistently on all OG images to build visual recognition in social feeds.",
              "Avoid placing important text too close to the edges — some platforms crop OG images on mobile, cutting off 10–20% of the edges.",
              "Use the same font family across all your OG images for brand consistency.",
              "Test your OG images using Facebook's Sharing Debugger and Twitter's Card Validator to confirm they render correctly.",
              "Keep file sizes under 1MB for fast loading — PNG with simple gradients and text typically stays well under this limit.",
              "Use a consistent color scheme that matches your brand identity across all your OG images.",
              "Update OG images when you refresh your brand guidelines to maintain a current, cohesive online presence.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools + CTA */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>
        <ToolPageCTA />
      </div>
    </>
  )
}
