import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { YouTubeThumbnailMakerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function YouTubeThumbnailMakerPage() {
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
        <section className="mt-8" aria-label="YouTube Thumbnail Maker">
          <YouTubeThumbnailMakerTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the YouTube Thumbnail Maker</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose your background</span> — Upload a custom image, pick a solid color, or select a gradient with two colors and an adjustable angle.
            </li>
            <li>
              <span className="text-foreground font-medium">Add your text</span> — Type a bold title (up to 50 characters) and an optional subtitle (up to 80 characters) that capture your video's value.
            </li>
            <li>
              <span className="text-foreground font-medium">Style your text</span> — Adjust font sizes with sliders, pick text colors, enable outlines and shadows for maximum readability on any background.
            </li>
            <li>
              <span className="text-foreground font-medium">Apply an overlay</span> — Choose a dark gradient, vignette, or no overlay to ensure your text pops against the background.
            </li>
            <li>
              <span className="text-foreground font-medium">Preview and download</span> — See your thumbnail update in real time at the correct 1280×720 aspect ratio, then click Download PNG to save.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Custom background image upload with automatic cover-fit cropping",
              "Solid color and linear gradient background options with adjustable angle",
              "Bold title text with character limit (50 chars) for optimal readability",
              "Optional subtitle text below the title (80 chars max)",
              "Adjustable font sizes for both title and subtitle with range sliders",
              "Custom text color picker with hex code input",
              "Text outline / stroke effect with customizable color for contrast",
              "Text shadow effect for added depth and separation from background",
              "Three text alignment options: left, center, and right",
              "Three overlay effects: dark gradient, vignette, and none",
              "Real-time WYSIWYG preview at the exact 1280×720 aspect ratio",
              "One-click PNG download at full 1280×720 pixel resolution",
              "100% client-side processing — no uploads, no servers, no watermarks",
              "Fully responsive editor that works on desktop and mobile devices",
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
          <h2 className="text-2xl font-bold tracking-tight">Benefits of Using a Thumbnail Maker</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Higher Click-Through Rates",
                d: "Custom thumbnails can increase your video CTR by 2-3x compared to YouTube's auto-generated options. A professional, eye-catching thumbnail is the single biggest lever you can pull to get more views on your existing content.",
              },
              {
                t: "Channel Brand Consistency",
                d: "Create a cohesive visual identity across your entire channel. When viewers recognize your thumbnail style in search results, they are more likely to click because they already trust your brand.",
              },
              {
                t: "Better Mobile Performance",
                d: "Over 70% of YouTube watch time comes from mobile devices. Our tool ensures your text is large, bold, and readable even on small phone screens with outlines and shadows for contrast.",
              },
              {
                t: "Save Time and Money",
                d: "No need for Photoshop or hiring a designer. Create professional thumbnails in seconds right in your browser, completely free. The real-time preview means you get it right the first time.",
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
              { t: "Tutorial Videos", d: "Create thumbnails that clearly communicate the tutorial topic with bold text and relevant background imagery to attract learners searching for how-to content." },
              { t: "Product Reviews", d: "Design thumbnails featuring product names and star ratings that stand out in search results and compel viewers to watch your review." },
              { t: "Vlog Thumbnails", d: "Make your daily or weekly vlogs visually consistent with a recognizable style that subscribers can spot instantly in their feed." },
              { t: "Gaming Videos", d: "Create dramatic, high-contrast thumbnails with game titles and episode numbers that capture the energy of your gaming content." },
              { t: "Music Videos", d: "Design clean, artistic thumbnails with song titles and artist names that match the aesthetic of your music content." },
              { t: "Educational Content", d: "Build trust with professional-looking thumbnails that clearly state the topic and make your educational channel appear authoritative." },
              { t: "Travel Vlogs", d: "Combine stunning destination photos with bold overlay text to showcase locations and attract travel enthusiasts." },
              { t: "Tech Reviews", d: "Create consistent gadget review thumbnails with device names and verdict text that tech-savvy viewers can quickly scan." },
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
          <h2 className="text-2xl font-bold tracking-tight">YouTube Thumbnail Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always use 1280×720 pixels (16:9 ratio) for the highest quality display across all devices and platforms.",
              "Keep title text to 3-5 words maximum. Short, punchy text is readable at small sizes and creates more impact than long sentences.",
              "Use high contrast between text and background. White or yellow text on dark backgrounds, or dark text on light backgrounds, ensures readability.",
              "Enable text outlines when using photographic backgrounds — this is the single most effective technique for readable text on any image.",
              "Maintain consistent styling across all thumbnails: same color scheme, text position, font treatment, and overlay to build channel recognition.",
              "Avoid placing important text in the bottom-right corner, as YouTube overlays the video duration badge there on hover.",
              "Use faces and emotions when possible — thumbnails with expressive human faces get significantly higher click-through rates.",
              "Test your thumbnails at small sizes. Squint at your design or view it on your phone to verify text is still legible.",
              "Use bold, saturated colors that stand out in YouTube's white and dark mode interfaces without blending into the background.",
              "Create curiosity gaps — your thumbnail and title should work together to create a question the viewer wants answered.",
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
