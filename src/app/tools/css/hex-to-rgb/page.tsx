import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { HexToRgbTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function HexToRgbPage() {
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
        <section className="mt-8" aria-label="HEX to RGB Converter">
          <HexToRgbTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert HEX to RGB</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter a HEX code</span> — Type any 3-digit (e.g., #F53) or 6-digit (e.g., #FF5733) HEX color code into the input field. The # prefix is added automatically.
            </li>
            <li>
              <span className="text-foreground font-medium">View RGB breakdown</span> — The tool instantly displays separate Red, Green, and Blue values (0–255) with visual sliders and binary equivalents.
            </li>
            <li>
              <span className="text-foreground font-medium">Preview the color</span> — A large color swatch shows exactly what the HEX code looks like, with the code overlaid for reference.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy in any format</span> — Click the copy button next to HEX, RGB, RGBA, or HSL to copy the value to your clipboard instantly.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Instant conversion from HEX to RGB with real-time updates as you type",
              "Supports both 3-digit (#F53) and 6-digit (#FF5733) HEX color codes",
              "Separate Red, Green, and Blue channel boxes with values 0–255",
              "Visual sliders showing each channel's position on the 0–255 scale",
              "Binary equivalent displayed for each RGB channel (8-bit)",
              "Large color preview swatch with the HEX code overlaid",
              "Native color picker synced with HEX input for visual selection",
              "One-click copy for HEX, RGB, RGBA, and HSL output formats",
              "Bonus HSL conversion showing hue, saturation, and lightness values",
              "Lightweight and responsive — works perfectly on mobile and desktop",
              "100% client-side processing — no data sent to any server",
              "Input validation with clear error messages for invalid codes",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. HEX vs RGB Explained */}
        <section className="mt-16 space-y-4" aria-label="HEX vs RGB">
          <h2 className="text-2xl font-bold tracking-tight">Understanding HEX vs RGB</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "HEX — Hexadecimal Notation",
                d: "HEX uses a # prefix followed by 6 hexadecimal digits (0–9, A–F). Each pair of two digits represents one color channel: the first pair is red, the second is green, and the third is blue. HEX is the most compact and widely used color format in web development. It is supported everywhere — CSS, HTML, SVG, canvas, and all design tools.",
              },
              {
                t: "RGB — Red, Green, Blue",
                d: "RGB expresses each color channel as a decimal number from 0 to 255, where 0 means no light and 255 means maximum intensity. The format rgb(255, 87, 51) is more explicit about each channel's value. RGB is essential when you need to manipulate individual channels programmatically, animate colors with JavaScript, or add transparency via rgba().",
              },
              {
                t: "RGBA — RGB with Alpha",
                d: "RGBA extends RGB by adding a fourth value for opacity (alpha), ranging from 0 (fully transparent) to 1 (fully opaque). The format rgba(255, 87, 51, 0.8) is commonly used for semi-transparent backgrounds, overlays, and hover effects. Our converter always shows the RGBA equivalent with alpha set to 1.",
              },
              {
                t: "HSL — Hue, Saturation, Lightness",
                d: "HSL represents color as a hue angle (0–360° on the color wheel), saturation percentage (0–100%), and lightness percentage (0–100%). HSL is more intuitive for designers because you can easily create lighter or darker variants by adjusting lightness alone. Our bonus conversion shows the HSL equivalent of your HEX input.",
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
              { t: "Web Development", d: "Convert design mockup HEX values to RGB for CSS stylesheets, JavaScript canvas operations, or React/Vue component props." },
              { t: "UI Component Libraries", d: "Build design system tokens in RGB format for theming engines that require separate channel values." },
              { t: "Graphic Design", d: "Translate HEX colors from web designs into RGB values for use in image editors, illustrations, and motion graphics." },
              { t: "Data Visualization", d: "Convert HEX brand colors to RGB for chart libraries (Chart.js, D3.js) that accept color channel arrays." },
              { t: "Email Development", d: "Many email clients prefer rgb() notation. Convert your HEX brand colors for maximum email template compatibility." },
              { t: "Animation & Transitions", d: "JavaScript animation libraries and CSS transitions often work with RGB values for smooth color interpolation between states." },
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
          <h2 className="text-2xl font-bold tracking-tight">HEX to RGB Conversion Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "If you need to convert back from RGB to HEX, use our RGB to HEX Converter for instant reverse conversion.",
              "For full color format flexibility, try our Color Converter which supports HEX, RGB, HSL, HSV, and CMYK all in one interface.",
              "Use the binary values shown for each channel when working with low-level image processing or embedded systems.",
              "When creating CSS gradients with converted RGB values, our Gradient Generator can help you build smooth multi-stop gradients.",
              "For designing complete UI elements with your converted colors, the Box Shadow Generator lets you add matching shadows.",
              "Remember that HEX and RGB represent the exact same color — conversion is lossless with no rounding or approximation.",
              "The 3-digit HEX shorthand (#F53) only works when both digits in each pair are identical. Use 6-digit format for precision.",
              "In modern CSS, you can use the space-separated syntax rgb(255 87 51 / 0.8) instead of the comma-separated rgba() function.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip
                      .replace(
                        /our (RGB to HEX Converter)/g,
                        '<a href="/tools/css/rgb-to-hex" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                      )
                      .replace(
                        /our (Color Converter)/g,
                        '<a href="/tools/css/color-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                      )
                      .replace(
                        /our (Gradient Generator)/g,
                        '<a href="/tools/css/gradient-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                      )
                      .replace(
                        /the (Box Shadow Generator)/g,
                        '<a href="/tools/css/box-shadow-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
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
