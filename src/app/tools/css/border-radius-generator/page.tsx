import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { BorderRadiusGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function BorderRadiusGeneratorPage() {
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
        <section className="mt-8" aria-label="Border Radius Generator">
          <BorderRadiusGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Border Radius Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose a preset or start fresh</span> — Select one of the 8 built-in presets (Rounded, Pill, Circle, Squircle, Blob, Leaf, Ticket, Sharp) for a quick start, or begin with the default 12px rounded corners.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust corner values</span> — Use the sliders and number inputs to fine-tune each corner from 0 to 150px. Toggle "Link All Corners" to adjust all four corners at once or edit them independently.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize the preview</span> — Change the background color, border color, and border width to see how your border-radius looks with different visual styles.
            </li>
            <li>
              <span className="text-foreground font-medium">Review the corner diagram</span> — The visual diagram displays each corner value directly on the box shape for a clear overview of your radius configuration.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy the CSS</span> — Choose between shorthand (single property) or individual properties (one per corner) and click the copy button to get production-ready CSS.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time visual preview with a large 256×256px box showing your border-radius instantly",
              "Four independent corner sliders (0–150px) with synchronized number inputs for precise control",
              "Link All Corners toggle to update all four corners simultaneously or edit each independently",
              "Visual corner values diagram that displays each radius directly on the box shape",
              "8 built-in presets: Rounded, Pill, Circle, Squircle, Blob, Leaf, Ticket, and Sharp",
              "Customizable background color with a native color picker and hex input",
              "Customizable border color and border width (0–20px) for realistic previewing",
              "Syntax-highlighted CSS output in both shorthand and individual property formats",
              "One-click copy buttons for both CSS formats with visual confirmation feedback",
              "Smart shorthand detection — automatically reduces to the minimal syntax needed",
              "Fully responsive design that works great on desktop and mobile devices",
              "100% client-side — no data ever leaves your browser",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Explanation Cards */}
        <section className="mt-16 space-y-4" aria-label="Border radius property explanations">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Border Radius Properties</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Shorthand Syntax",
                d: "The border-radius shorthand accepts one to four values. One value applies equally to all corners. Two values set top-left/bottom-right and top-right/bottom-left. Three values set top-left, top-right/bottom-left, and bottom-right. Four values apply clockwise starting from top-left. This intelligent shorthand reduces code size while maintaining full control over each corner.",
              },
              {
                t: "Individual Corner Properties",
                d: "For maximum clarity and when you need to transition individual corners independently, use the four individual properties: border-top-left-radius, border-top-right-radius, border-bottom-right-radius, and border-bottom-left-radius. Each accepts one or two values (for elliptical radii). These are especially useful in animation keyframes and when you need to override a single corner from a shorthand.",
              },
              {
                t: "Elliptical Radii",
                d: "Each corner radius can accept two values separated by a forward slash (e.g., 20px / 10px). The first value is the horizontal radius and the second is the vertical radius. This creates elliptical rather than circular corners, enabling organic, non-uniform shapes. When using percentages, the horizontal radius is relative to the element's width and the vertical radius is relative to its height.",
              },
              {
                t: "Percentage vs Pixel Values",
                d: "Pixel values create fixed-radius corners that don't change with element size. Percentage values scale with the element's dimensions — 50% on a square creates a perfect circle, while on a rectangle it creates an ellipse. Percentages are ideal for responsive components where elements may resize. Pixels are better for design system tokens where you want consistent corner rounding regardless of element size.",
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
              { t: "Card Components", d: "Round the corners of content cards, panels, and containers for a modern, approachable feel that softens the visual hierarchy." },
              { t: "Button Shapes", d: "Create pill-shaped buttons with 9999px radius for primary actions, and subtly rounded buttons with 6-8px for secondary actions." },
              { t: "Avatar Images", d: "Apply 50% border-radius to square images for perfectly circular profile pictures and user avatars." },
              { t: "Modal Dialogs", d: "Use consistent corner rounding (12-16px) on modal dialogs and popovers for a polished, professional appearance." },
              { t: "Form Inputs", d: "Add subtle 6-8px border-radius to text inputs, textareas, and select elements for a cohesive form design." },
              { t: "Notification Badges", d: "Create pill-shaped notification indicators with full border-radius for a clean, compact badge design." },
              { t: "Creative Shapes", d: "Combine different per-corner values to create organic shapes like blobs, leaves, and tickets for decorative elements." },
              { t: "Design System Tokens", d: "Establish a consistent radius scale (e.g., sm: 4px, md: 8px, lg: 12px, xl: 16px, full: 9999px) for your entire design system." },
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
          <h2 className="text-2xl font-bold tracking-tight">Border Radius Design Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use our Color Converter to find the perfect background and border colors for your rounded elements by converting between HEX, RGB, and HSL formats.",
              "Pair rounded corners with CSS gradients using our Gradient Generator to create visually rich cards and containers with depth.",
              "Add subtle box shadows to your rounded elements using our Box Shadow Generator to enhance the sense of elevation and depth.",
              "For responsive designs, use our CSS Clamp Generator to create fluid border-radius values that scale smoothly across different screen sizes.",
              "Consistency is key — define 3-5 radius tokens in your design system and stick to them to maintain a cohesive visual language.",
              "Use 9999px (or a very large value) instead of 50% when you want guaranteed pill or circle shapes, since 50% can produce unexpected results on non-square elements.",
              "Test your border-radius values with real content inside the element — text, images, and child elements can reveal clipping issues you might miss on an empty box.",
              "Pair border-radius with overflow: hidden when you have child content (especially images) that should be clipped to the rounded shape.",
              "Consider accessibility — very small border-radius values (0-2px) are nearly invisible and may not be worth the extra CSS complexity.",
              "For dark themes, slightly increase your border-radius values (1-2px more) as the softer corners help reduce visual harshness against dark backgrounds.",
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
                        /our (Box Shadow Generator)/g,
                        '<a href="/tools/css/box-shadow-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
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
