import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { BoxShadowGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function BoxShadowGeneratorPage() {
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
        <section className="mt-8" aria-label="Box Shadow Generator">
          <BoxShadowGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Box Shadow Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose a preset or start fresh</span> — Select one of the 8 built-in shadow presets for a quick start, or begin with the default medium shadow.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust shadow properties</span> — Use the sliders and number inputs to fine-tune the X/Y offset, blur radius, and spread radius until the shadow looks right.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize color and opacity</span> — Pick a shadow color with the color picker and set the opacity percentage to control how transparent the shadow appears.
            </li>
            <li>
              <span className="text-foreground font-medium">Layer multiple shadows</span> — Add up to 3 shadow layers for complex depth effects, then toggle inset mode for inner shadows.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy the CSS</span> — Click the Copy CSS button to copy the production-ready box-shadow property and paste it into your stylesheet.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time visual preview with a white card on a subtle background",
              "X offset control from -50px to 50px with slider and number input",
              "Y offset control from -50px to 50px with slider and number input",
              "Blur radius from 0 to 100px for fine-tuned shadow softness",
              "Spread radius from -50px to 50px to shrink or expand the shadow",
              "Separate color picker and opacity slider for precise alpha control",
              "Inset toggle to switch between outer and inner shadows",
              "Up to 3 shadow layers for complex, multi-layered depth effects",
              "8 built-in presets: Subtle, Medium, Dramatic, Neon Glow, Soft Float, Sharp, Inset Press, Layered",
              "Syntax-highlighted CSS output with one-click copy to clipboard",
              "Individual layer CSS breakdown for debugging and fine-tuning",
              "100% client-side — no data leaves your browser",
              "Fully responsive design for desktop and mobile devices",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Explanation Cards */}
        <section className="mt-16 space-y-4" aria-label="Shadow property explanations">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Box Shadow Properties</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Offset (X and Y)",
                d: "The X offset moves the shadow horizontally — positive values shift it right, negative values shift it left. The Y offset moves the shadow vertically — positive values shift it down, negative values shift it up. A shadow with X: 0 and Y: 4 creates a shadow directly below the element, simulating a light source from above. Combining both offsets allows you to position the shadow at any angle around the element.",
              },
              {
                t: "Blur Radius",
                d: "The blur radius controls how soft or sharp the shadow edges appear. A value of 0 produces a hard-edged shadow with no blurring, while larger values create progressively softer, more diffused shadows. At 0px, the shadow is an exact copy of the element's shape. At 20px, the shadow edges fade smoothly into the background. Most modern designs use blur values between 4px and 30px for natural-looking depth.",
              },
              {
                t: "Spread Radius",
                d: "The spread radius expands or contracts the shadow area. A positive spread value makes the shadow larger in all directions, while a negative value makes it smaller. At -1px, the shadow is 1px smaller than the element on each side. At 10px, the shadow extends 10px beyond the element's border. A spread of 0 keeps the shadow the same size as the element. Combined with blur, spread is essential for creating the Material Design elevation system.",
              },
              {
                t: "Color and Opacity",
                d: "Box shadow color can be any CSS color value. Using rgba() is recommended because it allows separate opacity control. Low opacity (5-15%) creates subtle, professional shadows, while higher opacity (30-50%) produces dramatic effects. Black is the standard shadow color because it simulates realistic light blocking. However, colored shadows can create neon glow effects, brand-colored depth, or themed UI elements when used intentionally.",
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
              { t: "Card Elevation", d: "Add depth to content cards, panels, and containers with subtle shadows that make elements appear to float above the background." },
              { t: "Button Hover Effects", d: "Create interactive button states where shadows grow or shift on hover, providing tactile visual feedback to users." },
              { t: "Dropdown Menus", d: "Apply shadows to dropdown menus and popovers to separate them visually from the underlying page content." },
              { t: "Modal Dialogs", d: "Use large, dramatic shadows on modal overlays to draw user attention and create a clear visual hierarchy." },
              { t: "Neon and Glow Effects", d: "Combine colored shadows with zero offset and large blur for neon glow effects on dark-themed interfaces." },
              { t: "Inset Form Fields", d: "Apply inset shadows to input fields and text areas to create a subtle pressed-in appearance that invites interaction." },
              { t: "Image Frames", d: "Add soft shadows to images and thumbnails to lift them off the page and create visual interest." },
              { t: "Design Systems", d: "Establish a consistent shadow scale (sm, md, lg, xl) for your entire design system to maintain cohesive visual hierarchy." },
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
          <h2 className="text-2xl font-bold tracking-tight">Box Shadow Design Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use our Color Converter to find the perfect shadow color by converting between HEX, RGB, HSL, and other formats before applying it.",
              "Pair your shadows with CSS gradients using our Gradient Generator to create rich, layered backgrounds beneath elevated elements.",
              "Round your shadow containers with our Border Radius Generator to ensure shadows flow smoothly around corners without visual artifacts.",
              "For responsive layouts, use our CSS Clamp Generator to create fluid shadow values that scale appropriately across different screen sizes.",
              "Use low opacity (5-15%) with moderate blur for natural-looking elevation that works on both light and dark backgrounds.",
              "Combine a small, sharp shadow with a larger, soft shadow for realistic multi-layered depth that mimics real-world lighting.",
              "Avoid animating box-shadow directly on performance-critical elements — use pseudo-elements with opacity transitions instead.",
              "Define shadow tokens using CSS custom properties (e.g., --shadow-sm, --shadow-md) to maintain consistency across your design system.",
              "Test your shadows on both light and dark themes, as the same shadow values can look very different depending on the background.",
              "Use inset shadows sparingly — they are most effective for active/pressed states on buttons and interactive elements.",
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
                        /our (Gradient Generator)/g,
                        '<a href="/tools/css/gradient-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                      )
                      .replace(
                        /our (Border Radius Generator)/g,
                        '<a href="/tools/css/border-radius-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                      )
                      .replace(
                        /our (CSS Clamp Generator)/g,
                        '<a href="/tools/css/css-clamp-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
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
