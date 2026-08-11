import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { CSSClampGenerator } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function CSSClampGeneratorPage() {
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
        <section className="mt-8" aria-label="CSS Clamp Generator">
          <CSSClampGenerator />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the CSS Clamp Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose your input mode</span> — Use "Direct Input" to manually set min, preferred, and max values, or "Calculate from Viewport" to auto-compute the preferred value from screen sizes.
            </li>
            <li>
              <span className="text-foreground font-medium">Set your values</span> — Enter the minimum size (lower bound), the preferred fluid value, and the maximum size (upper bound). Each supports px, rem, em, vw, vh, and % units.
            </li>
            <li>
              <span className="text-foreground font-medium">Preview the result</span> — The live preview shows how your text renders at mobile (375px), tablet (768px), and desktop (1440px) viewport widths.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy the CSS</span> — Click the copy button to grab the generated clamp() function and paste it directly into your stylesheet.
            </li>
            <li>
              <span className="text-foreground font-medium">Use presets for speed</span> — Click any preset button (H1, H2, body text, section padding, etc.) to instantly load a professionally tuned clamp value.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Direct input mode with min, preferred, and max value fields",
              "Calculate-from-viewport mode that auto-computes the preferred value",
              "Support for 6 CSS units: px, rem, em, vw, vh, and %",
              "Live preview at 3 viewport sizes: mobile, tablet, and desktop",
              "One-click CSS copy with visual feedback",
              "Typography presets for H1, H2, H3, body, and small text",
              "Spacing presets for section padding, card padding, gap, and container width",
              "Mathematical formula display showing the linear interpolation",
              "Real-time updates as you type — no submit button needed",
              "100% client-side — your values never leave your browser",
              "Responsive design that works seamlessly on all devices",
              "Intuitive tabbed interface for two input modes",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Explanation Cards */}
        <section className="mt-16 space-y-4" aria-label="Understanding clamp()">
          <h2 className="text-2xl font-bold tracking-tight">Understanding CSS clamp()</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "How clamp() Works",
                d: "The clamp() CSS function takes three arguments: a minimum value, a preferred (fluid) value, and a maximum value. The browser returns the preferred value as long as it falls between the min and max. If the preferred value is smaller than the minimum, the minimum is used. If it is larger than the maximum, the maximum is used. This creates a smooth scaling effect without abrupt jumps.",
              },
              {
                t: "The Preferred Value Formula",
                d: "The preferred value typically uses a viewport-relative unit (vw) to create fluid scaling. The formula is: preferred = min + (max - min) × (100vw - viewportMin) / (viewportMax - viewportMin). This linear interpolation ensures the value scales proportionally from the minimum at the small viewport to the maximum at the large viewport.",
              },
              {
                t: "Fluid Typography Best Practices",
                d: "For readable fluid typography, always set a minimum that ensures legibility on small screens (at least 1rem/16px for body text). Use rem units for min/max in typography to respect user font-size preferences. Keep the scaling range reasonable — a 1.5x to 2x ratio between min and max usually works well. Test at multiple viewport widths to ensure the progression feels natural.",
              },
              {
                t: "clamp() vs Media Queries",
                d: "Media queries create discrete style changes at specific breakpoints, while clamp() provides continuous fluid scaling. For typography and spacing, clamp() is almost always better because it eliminates visual jumps. Use media queries for structural layout changes (grid columns, element visibility, flex direction) and clamp() for sizing values that should scale smoothly.",
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
              { t: "Fluid Typography", d: "Scale headings and body text smoothly between mobile and desktop sizes without any media query breakpoints." },
              { t: "Responsive Padding", d: "Create section padding that grows proportionally with the viewport, maintaining visual balance on every screen." },
              { t: "Container Widths", d: "Set responsive container widths that fill the screen on mobile but cap at a comfortable max-width on desktop." },
              { t: "Grid and Flex Gaps", d: "Use clamp() for gap values that create tighter spacing on mobile and more breathing room on larger screens." },
              { t: "Hero Section Sizing", d: "Make hero text and padding scale dramatically from mobile to desktop for maximum visual impact." },
              { t: "Card Layout Sizing", d: "Set card padding and margins that adapt to the available space without requiring multiple breakpoints." },
              { t: "Icon and Avatar Sizes", d: "Scale decorative elements like icons and avatars proportionally with the surrounding content." },
              { t: "Design System Tokens", d: "Define fluid spacing and type scale tokens in your design system that work across all viewports." },
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

        {/* 8. Tips with Internal Links */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">CSS Clamp Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always set a sensible minimum value so that text remains readable on the smallest screens. A body text minimum of 1rem (16px) is a safe baseline.",
              "Use rem units for typography clamp() values to respect the user's browser font-size setting and improve accessibility.",
              "When combining clamp() with our Color Converter, you can create fully responsive UI elements with fluid sizing and perfectly chosen colors.",
              "Pair clamp()-based sizing with our Box Shadow Generator to create card and button components that scale smoothly with the viewport.",
              "Use our Border Radius Generator alongside clamp() to build responsive card components where both the size and corner radius adapt to the screen.",
              "For container widths, clamp(300px, 90%, 1200px) is a reliable pattern that works well for most content-centered layouts.",
              "Combine fluid typography (clamp) with our Gradient Generator for hero sections that look stunning at every viewport size.",
              "Test your clamp values at the extremes — check both the smallest phone (320px) and the largest common desktop (1920px) to ensure nothing breaks.",
              "If you need to use viewport height units (vh) for full-screen layouts, clamp(50vh, 70vh, 90vh) can create adaptive hero sections.",
              "Remember that clamp() is resolved at computed-value time, so it works everywhere CSS values are accepted — including CSS custom properties, transitions, and animations.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip
                      .replace(
                        /our (Color Converter)/g,
                        '<a href="/tools/css/color-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                      )
                      .replace(
                        /our (Box Shadow Generator)/g,
                        '<a href="/tools/css/box-shadow-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                      )
                      .replace(
                        /our (Border Radius Generator)/g,
                        '<a href="/tools/css/border-radius-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                      )
                      .replace(
                        /our (Gradient Generator)/g,
                        '<a href="/tools/css/gradient-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                      ),
                  }}
                />
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
