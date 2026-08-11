import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { MemeGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function MemeGeneratorPage() {
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
        <section className="mt-8" aria-label="Meme Generator">
          <MemeGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Meme Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose a template or upload an image</span> — Pick from 10 popular meme templates or upload your own image from your device.
            </li>
            <li>
              <span className="text-foreground font-medium">Add your text</span> — Type your top text and bottom text in the classic meme format. Text is automatically converted to ALL CAPS.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize the style</span> — Adjust font size (24–72px), choose between Impact, Arial Black, or Comic Sans MS, and pick your text color.
            </li>
            <li>
              <span className="text-foreground font-medium">Toggle the text stroke</span> — Enable the outline for that classic meme readability, or turn it off for a cleaner modern look.
            </li>
            <li>
              <span className="text-foreground font-medium">Preview and download</span> — See your meme update in real time on the canvas, then click Download PNG to save it to your device.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "10 popular meme templates with colored placeholders",
              "Upload your own custom images (PNG, JPG, WebP, GIF)",
              "Classic top/bottom text format with automatic ALL CAPS conversion",
              "Adjustable font size from 24px to 72px with real-time slider",
              "Three font families: Impact, Arial Black, Comic Sans MS",
              "Three text color options: white, black, and yellow",
              "Toggleable text stroke/outline for classic meme readability",
              "Automatic word wrapping for long text",
              "800×600 pixel canvas output in PNG format",
              "100% client-side processing — no server uploads, no watermarks",
              "Real-time WYSIWYG canvas preview",
              "One-click download to your device",
              "Responsive editor that works on desktop and mobile",
              "Reset button to start over quickly",
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
          <h2 className="text-2xl font-bold tracking-tight">Benefits of Using a Meme Generator</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Boost Social Media Engagement",
                d: "Memes are the most shared content format on social media. Creating your own memes with relevant humor and messaging can dramatically increase your engagement rates, shares, and follower growth across all platforms.",
              },
              {
                t: "No Design Skills Required",
                d: "You don't need Photoshop or any design experience. Simply pick a template, type your text, and download. The tool handles all the styling automatically with the classic meme format that everyone recognizes.",
              },
              {
                t: "Privacy-First Processing",
                d: "Your images never leave your device. Everything is processed locally in your browser using the Canvas API. No uploads, no cloud storage, no data collection — your memes stay completely private.",
              },
              {
                t: "Instant and Free",
                d: "Create a meme in seconds without signing up, paying, or dealing with watermarks. The real-time preview means you can iterate quickly until your meme looks perfect before downloading.",
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
              { t: "Social Media Posts", d: "Create relatable, shareable memes for Twitter/X, Instagram, Facebook, and Reddit that capture trending moments and inside jokes your audience will love." },
              { t: "Marketing Campaigns", d: "Use memes to humanize your brand and connect with younger audiences. Branded memes can increase engagement and make your marketing more memorable and shareable." },
              { t: "Team Communication", d: "Add humor to internal Slack channels, team presentations, or company newsletters with custom memes that reference inside jokes and shared experiences." },
              { t: "Educational Content", d: "Make learning more fun by creating memes that explain concepts, highlight common mistakes, or celebrate achievements in a relatable format students will remember." },
              { t: "Event Promotion", d: "Generate buzz for events, product launches, or special occasions with memes that create anticipation and encourage sharing among potential attendees." },
              { t: "Personal Expression", d: "Create memes to share your thoughts, reactions, and observations about daily life, pop culture, or any topic you want to comment on with humor." },
              { t: "Content Creation", d: "YouTubers, bloggers, and streamers can use memes as thumbnails, channel art, or supplementary content to engage their audience between main content releases." },
              { t: "Community Building", d: "Foster a sense of community in Discord servers, Facebook groups, or forums by creating memes that reference shared experiences and running joke threads." },
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
          <h2 className="text-2xl font-bold tracking-tight">Meme Creation Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Keep your text short and punchy. The best memes communicate their joke in just a few words — ideally under 8 words per line.",
              "Use the classic Impact font with white text and black stroke for maximum readability and the authentic meme look.",
              "Choose templates that match your message. Each template has an established context, and using it correctly makes the meme funnier.",
              "Make sure your text contrasts well with the background. If your image is very bright, consider using black text instead of white.",
              "Size your font appropriately. Text that's too small becomes unreadable when shared; text that's too large gets cut off or wraps awkwardly.",
              "Time your memes with current trends and events for maximum relevance and shareability.",
              "Test your meme at small sizes. View the preview and imagine it on a phone screen to ensure the text is still legible.",
              "Avoid overused templates unless you're putting a genuinely fresh spin on them. Originality stands out in crowded social feeds.",
              "Use high-quality source images when uploading your own. Blurry or pixelated images make even the funniest text fall flat.",
              "Remember that memes spread quickly and widely. Make sure your meme content is appropriate for your intended audience and brand.",
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
