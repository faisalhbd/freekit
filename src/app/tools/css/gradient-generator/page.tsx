import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { GradientGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function GradientGeneratorPage() {
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
        <section className="mt-8" aria-label="Gradient Generator">
          <GradientGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Gradient Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose a gradient type</span> — Select between Linear, Radial, or Conic gradient using the tabs at the top of the editor.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize your gradient</span> — Adjust the angle for linear gradients, the position for radial gradients, or the starting angle for conic gradients using the sliders.
            </li>
            <li>
              <span className="text-foreground font-medium">Add or modify color stops</span> — Pick colors with the color picker, set position percentages, and add up to 5 color stops to create your desired effect.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy the CSS</span> — Once satisfied with your gradient, click the Copy CSS button to copy the generated code and paste it directly into your stylesheet.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Support for linear, radial, and conic CSS gradient types",
              "Large interactive preview area with real-time gradient rendering",
              "Color stop management with native color picker and hex input",
              "Adjustable position (0–100%) for each color stop with slider",
              "Angle control (0–360°) for linear gradients with slider and input",
              "Direction selector with 9 positions for radial gradients",
              "From-angle control (0–360°) for conic gradients",
              "Up to 5 color stops per gradient with add and remove controls",
              "One-click copy to clipboard with generated CSS property",
              "Syntax-highlighted CSS output for easy reading",
              "6 built-in gradient presets for quick starts",
              "Randomize button to generate new color combinations",
              "100% client-side — no data leaves your browser",
              "Fully responsive design for desktop and mobile",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Explanation Cards */}
        <section className="mt-16 space-y-4" aria-label="Gradient type explanations">
          <h2 className="text-2xl font-bold tracking-tight">Understanding CSS Gradient Types</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Linear Gradients",
                d: "Linear gradients transition colors along a straight line defined by an angle or direction. The gradient flows from one side to another — for example, a 180deg gradient flows from top to bottom. They are the most commonly used gradient type in web design, perfect for backgrounds, overlays, buttons, and dividers. The angle can range from 0deg (bottom to top) to 360deg.",
              },
              {
                t: "Radial Gradients",
                d: "Radial gradients emanate outward from a center point in a circular or elliptical pattern. The position of the center can be adjusted to create off-center effects like spotlights, glows, or vignettes. By default, radial gradients use a circle shape, but you can specify an ellipse for stretched effects. They are ideal for creating depth, spotlight effects, and subtle background textures.",
              },
              {
                t: "Conic Gradients",
                d: "Conic gradients transition colors around a center point in a sweeping arc (like a color wheel or pie chart). Unlike linear and radial gradients, conic gradients wrap around the center, creating pie-chart-like sections or smooth rainbow transitions. The 'from' angle controls where the gradient starts. They are perfect for color wheels, progress indicators, and creative design effects.",
              },
              {
                t: "Repeating Gradients",
                d: "Repeating variants (repeating-linear-gradient, repeating-radial-gradient, repeating-conic-gradient) tile the gradient pattern infinitely. By defining a color pattern that spans less than the full range, you can create stripes, checkered patterns, and geometric backgrounds without images. These are lightweight, responsive, and perfect for decorative UI patterns.",
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
              { t: "Website Backgrounds", d: "Create eye-catching hero section backgrounds that make a strong first impression and set the visual tone of your page." },
              { t: "UI Component Styling", d: "Design gradient buttons, cards, and input fields with polished, modern appearances for dashboards and apps." },
              { t: "Overlay Effects", d: "Apply semi-transparent gradient overlays on images to improve text readability and create depth in composite designs." },
              { t: "Loading Animations", d: "Use animated conic gradients for loading spinners and skeleton screens that look premium and engaging." },
              { t: "Brand Identity", d: "Build cohesive brand gradients for logos, marketing materials, and social media assets with consistent color schemes." },
              { t: "Data Visualization", d: "Apply gradient color scales to charts, heatmaps, and infographics to represent data ranges intuitively." },
              { t: "Text Effects", d: "Create vibrant gradient text using background-clip and color transparency techniques for headings and call-to-action elements." },
              { t: "Dark Mode Themes", d: "Design subtle radial gradient backgrounds for dark mode interfaces that add depth without overwhelming the content." },
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
          <h2 className="text-2xl font-bold tracking-tight">Gradient Design Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use our Color Converter to find the exact HEX codes for your brand colors before adding them as gradient stops.",
              "Pair your gradients with matching box shadows using our Box Shadow Generator for cohesive, polished UI components.",
              "Round your gradient containers with our Border Radius Generator to create pill-shaped buttons and soft card layouts.",
              "For responsive layouts with gradient sections, use our CSS Clamp Generator to create fluid spacing that adapts to any screen size.",
              "Keep gradients subtle for professional designs — use analogous colors (adjacent on the color wheel) for a harmonious effect.",
              "Always add a solid fallback background-color before the gradient declaration to support older browsers and ensure content remains readable.",
              "Use transparency in color stops to create layered depth effects — for example, rgba(0,0,0,0.3) at the bottom for a fade-to-dark overlay.",
              "Conic gradients are underutilized — try them for progress indicators, gauge visualizations, and creative pie-chart backgrounds.",
              "Test your gradient backgrounds with real content overlaid to ensure text contrast meets WCAG accessibility standards.",
              "Use repeating gradients with small color ranges to create CSS-only patterns like stripes, polka dots, and diagonal lines without images.",
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
