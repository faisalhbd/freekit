import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ColorConverterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ColorConverterPage() {
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
        <section className="mt-8" aria-label="Color Converter">
          <ColorConverterTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Color Converter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Pick a color</span> — Click the color swatch to open the native color picker, or type a HEX code directly into the input field.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust in any format</span> — Modify values in HEX, RGB, HSL, HSV, or CMYK fields. All other formats update instantly in real time.
            </li>
            <li>
              <span className="text-foreground font-medium">Check contrast</span> — Review the WCAG contrast ratios against white and black backgrounds to ensure your color meets accessibility standards.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy or generate palette</span> — Click the copy button next to any format string, or switch to the Palette tab to generate tints and shades.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time conversion between HEX, RGB, HSL, HSV, and CMYK formats",
              "Native color picker with large interactive color swatch preview",
              "Individual input fields for every component of each color format",
              "One-click copy for all format strings with visual feedback",
              "WCAG contrast ratio checker against white and black backgrounds",
              "Accessibility pass/fail badges for AA and AAA compliance levels",
              "Automatic palette generation with 5 tints and shades",
              "Clickable palette swatches that apply the color to the converter",
              "Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) HEX input",
              "100% client-side processing — your colors never leave your browser",
              "Clean, responsive design that works on desktop and mobile",
              "Intuitive tabbed interface separating picker and palette views",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Explanation Cards */}
        <section className="mt-16 space-y-4" aria-label="Color format explanations">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Color Formats</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "HEX — Hexadecimal",
                d: "HEX is the most common web color format. It uses a # prefix followed by 6 hex digits (0-9, A-F), with two digits each for red, green, and blue. Example: #FF5733. A shorthand 3-digit form (#F53) doubles each digit. HEX is compact and universally supported in CSS and HTML.",
              },
              {
                t: "RGB & RGBA — Red, Green, Blue",
                d: "RGB defines colors by mixing three light channels from 0 to 255. It follows the additive color model used by screens. RGBA adds an alpha channel (0-1) for transparency. Example: rgba(255, 87, 51, 0.8). RGB is great when you need precise numeric control over each color channel.",
              },
              {
                t: "HSL & HSLA — Hue, Saturation, Lightness",
                d: "HSL uses a hue angle (0-360°), saturation (0-100%), and lightness (0-100%). This model is more intuitive for designers because you can easily create lighter or darker variants by adjusting a single value. HSLA adds alpha for transparency.",
              },
              {
                t: "HSV & CMYK — Display and Print Models",
                d: "HSV (Hue, Saturation, Value) is widely used in color picker UIs and image editing — its Value component represents brightness without mixing in white. CMYK (Cyan, Magenta, Yellow, Key/Black) is the subtractive model for print design. Converting between screen (RGB/HSV) and print (CMYK) ensures consistent color across media.",
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
              { t: "Web Design", d: "Convert brand colors from design files to CSS-ready HEX or RGB values for your stylesheet." },
              { t: "UI/UX Development", d: "Generate HSL variations for hover states, disabled states, and theme tokens in design systems." },
              { t: "Print Design Prep", d: "Convert screen colors to CMYK to ensure printed materials match your digital designs." },
              { t: "Accessibility Auditing", d: "Check contrast ratios to meet WCAG AA/AAA guidelines for text readability and compliance." },
              { t: "Brand Identity", d: "Create consistent color palettes with tints and shades for logos, marketing materials, and apps." },
              { t: "Data Visualization", d: "Generate harmonious color scales for charts, graphs, and infographics." },
              { t: "Game Development", d: "Convert colors between engine-specific formats and web-standard CSS values." },
              { t: "Email Development", d: "Ensure colors are in compatible formats for email clients that have limited CSS support." },
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
          <h2 className="text-2xl font-bold tracking-tight">Color Conversion Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use HSL when building design systems — adjusting the lightness value is the easiest way to create hover, active, and disabled states from a single base color.",
              "Always check WCAG contrast ratios when choosing text and background color pairs. A contrast ratio below 4.5:1 fails AA compliance for normal text.",
              "When converting colors for print, remember that CMYK has a smaller gamut than RGB — some bright screen colors cannot be reproduced in print.",
              "Use our Gradient Generator to create smooth CSS gradients using the colors you convert here.",
              "Combine this tool with our Box Shadow Generator to create cohesive UI elements with matching colors and shadows.",
              "For consistent spacing and sizing in your color-heavy designs, try our Border Radius Generator to round elements perfectly.",
              "When building responsive layouts with colored sections, use our CSS Clamp Generator for fluid, responsive sizing without media queries.",
              "The palette generator creates 5 evenly spaced lightness variations — use the darkest for text, mid-tones for backgrounds, and lightest for highlights.",
              "HSV is often better than HSL for creating color picker interfaces because its saturation component does not affect perceived brightness.",
              "For CSS custom properties, prefer HSL format so you can easily create themes by swapping hue values.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip
                      .replace(
                        /our (Gradient Generator)/g,
                        '<a href="/tools/css/gradient-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
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
