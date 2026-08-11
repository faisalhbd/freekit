import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { RgbToHexTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function RgbToHexPage() {
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
        <section className="mt-8" aria-label="RGB to HEX Converter">
          <RgbToHexTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert RGB to HEX</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Set RGB values</span> — Adjust the Red, Green, and Blue channel values using the sliders or type numbers directly into the input fields. Each channel ranges from 0 to 255.
            </li>
            <li>
              <span className="text-foreground font-medium">Preview the color</span> — The large color swatch updates in real time as you change values, showing both the HEX code and the RGB notation overlaid on the color.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy the HEX code</span> — Click the copy button next to the HEX output to copy it to your clipboard. You can also copy the RGB, RGBA, or HSL equivalents.
            </li>
            <li>
              <span className="text-foreground font-medium">Use the color picker</span> — Click the native color picker swatch to visually select a color, and the RGB sliders will automatically sync to the chosen color.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Three interactive sliders for Red, Green, and Blue channels (0–255) with real-time updates",
              "Number input fields for precise channel value entry alongside each slider",
              "Live HEX output displayed prominently as the primary conversion result",
              "Additional RGB, RGBA, and HSL format outputs for maximum flexibility",
              "Large color preview swatch with the HEX and RGB code overlaid",
              "Native browser color picker synced bidirectionally with RGB values",
              "One-click copy buttons for HEX, RGB, RGBA, and HSL output formats",
              "Bonus HSL conversion showing hue, saturation, and lightness as badges",
              "Color information panel showing total possible colors (16,777,216) and current index",
              "Binary representation of each RGB channel for advanced use cases",
              "Relative luminance calculation to determine optimal text contrast",
              "Reset and Random buttons for quick testing and exploration",
              "100% client-side processing — no data sent to any server",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. RGB vs HEX Explained */}
        <section className="mt-16 space-y-4" aria-label="RGB vs HEX">
          <h2 className="text-2xl font-bold tracking-tight">Understanding RGB to HEX Conversion</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "RGB — Decimal Notation",
                d: "RGB expresses each color channel as a decimal number from 0 to 255, where 0 means no light and 255 means maximum intensity. The format rgb(255, 87, 51) is explicit about each channel's value. RGB is essential when you need to manipulate individual channels programmatically, animate colors with JavaScript, or add transparency via rgba().",
              },
              {
                t: "HEX — Hexadecimal Notation",
                d: "HEX uses a # prefix followed by 6 hexadecimal digits (0–9, A–F). Each pair represents one color channel: the first pair is red, the second is green, and the third is blue. HEX is the most compact and widely used color format in web development. It is supported everywhere — CSS, HTML, SVG, canvas, and all design tools.",
              },
              {
                t: "RGBA — RGB with Alpha",
                d: "RGBA extends RGB by adding a fourth value for opacity (alpha), ranging from 0 (fully transparent) to 1 (fully opaque). The format rgba(255, 87, 51, 0.8) is commonly used for semi-transparent backgrounds, overlays, and hover effects. Our converter always shows the RGBA equivalent with alpha set to 1.",
              },
              {
                t: "HSL — Hue, Saturation, Lightness",
                d: "HSL represents color as a hue angle (0–360° on the color wheel), saturation percentage (0–100%), and lightness percentage (0–100%). HSL is more intuitive for designers because you can easily create lighter or darker variants by adjusting lightness alone. Our bonus conversion shows the HSL equivalent of your RGB input.",
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
              { t: "Web Development", d: "Convert RGB values from JavaScript color calculations or canvas operations into HEX codes for use in CSS stylesheets, HTML attributes, and framework component props." },
              { t: "Design System Tokens", d: "Translate RGB color values from design specifications into HEX format for your design system tokens, ensuring consistency across your codebase." },
              { t: "Brand Color Management", d: "Convert brand colors provided in RGB format by marketing teams into HEX codes for web implementation, email templates, and social media assets." },
              { t: "Data Visualization", d: "Convert computed RGB colors from chart libraries or data-driven algorithms into HEX for static exports, reports, and documentation." },
              { t: "Game Development", d: "Convert RGB color values from game engines or sprite editors into HEX codes for web-based game UIs and HTML5 canvas rendering." },
              { t: "Email Development", d: "Email templates often require HEX color codes. Convert your RGB brand colors for maximum compatibility across email clients like Gmail and Outlook." },
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
          <h2 className="text-2xl font-bold tracking-tight">RGB to HEX Conversion Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "If you need to convert back from HEX to RGB, use our HEX to RGB Converter for instant reverse conversion.",
              "For full color format flexibility, try our Color Converter which supports HEX, RGB, HSL, HSV, and CMYK all in one interface.",
              "Use the Random button to explore the full color space and discover unexpected color combinations.",
              "When creating CSS gradients with your converted HEX values, our Gradient Generator can help you build smooth multi-stop gradients.",
              "For designing complete UI elements with your converted colors, the Box Shadow Generator lets you add matching shadows.",
              "The binary values shown in the info panel are useful for low-level image processing or working with embedded systems.",
              "Remember that RGB and HEX represent the exact same color — conversion is lossless with no rounding or approximation.",
              "The luminance percentage helps you choose whether to use light or dark text on your selected color for accessibility.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip
                      .replace(
                        /our (HEX to RGB Converter)/g,
                        '<a href="/tools/css/hex-to-rgb" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
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
