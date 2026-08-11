import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { FaviconGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function FaviconGeneratorPage() {
  const schemas = getSchemas()

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 1. Breadcrumb + Hero */}
        <ToolHeader tool={toolConfig} />

        {/* 2. Tool Interface */}
        <section className="mt-8" aria-label="Favicon Generator Tool">
          <FaviconGeneratorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">
            How to Generate Favicons
          </h2>
          <p className="text-muted-foreground">
            Creating favicons for your website takes just a few steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">
                Upload your logo or icon
              </span>{" "}
              — Drag and drop a PNG, SVG, or any image file. For best results, use a
              square image at least 512×512 pixels with a transparent background. Need
              to convert SVG first? Try our{" "}
              <Link
                href="/tools/image/svg-to-png"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                SVG to PNG
              </Link>{" "}
              converter.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Choose your settings
              </span>{" "}
              — Select background (transparent or custom color), padding (0–20%), and
              shape (square, rounded, or circle). Adjust until the preview looks right.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Click Generate
              </span>{" "}
              — The tool creates all six standard favicon sizes (16×16 through 256×256)
              and displays them in a preview grid.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Download individually or as ZIP
              </span>{" "}
              — Download each size separately or grab all six at once as a ZIP file.
              To crop or adjust your source image first, use our{" "}
              <Link
                href="/tools/ocr/image-cropper"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image Cropper
              </Link>{" "}
              or{" "}
              <Link
                href="/tools/ocr/image-resizer"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image Resizer
              </Link>
              .
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side processing — your images never leave your browser",
              "Generates all 6 standard sizes: 16×16, 32×32, 48×48, 64×64, 128×128, 256×256",
              "Transparent or custom color background options",
              "Adjustable padding from 0% to 20% for perfect spacing",
              "Three shape options: Square, Rounded, Circle",
              "Download individual sizes or all at once as ZIP",
              "Maintains original aspect ratio — no stretching or distortion",
              "Drag & drop or click-to-upload for easy image loading",
              "Works with PNG, JPG, SVG, WebP, and more",
              "All favicons generated as PNG — fully supported by modern browsers",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Benefits */}
        <section className="mt-16 space-y-4" aria-label="Benefits">
          <h2 className="text-2xl font-bold tracking-tight">Benefits</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "100% Private & Secure",
                desc: "All favicon generation runs locally in your browser using the Canvas API. Your images are never uploaded to any server — your brand assets stay on your device at all times.",
              },
              {
                title: "All Sizes in One Click",
                desc: "Instead of manually resizing your icon six times, this tool generates every required favicon size from a single upload, saving you time and ensuring consistency.",
                link: {
                  href: "/tools/ocr/image-resizer",
                  label: "Image Resizer →",
                },
              },
              {
                title: "No Sign-Up Required",
                desc: "Start generating favicons immediately. No account creation, no email verification, no watermarks, and no usage limits — just open and use.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
                {"link" in item && item.link && (
                  <Link
                    href={item.link.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {item.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 6. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">
            Common Use Cases
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Website Launch",
                desc: "Generate a complete set of favicons for a new website. Cover all browsers and devices with a single upload and ZIP download.",
              },
              {
                title: "Brand Redesign",
                desc: "When updating your logo, quickly regenerate all favicon sizes to match the new branding across your entire web presence.",
              },
              {
                title: "PWA (Progressive Web App)",
                desc: "Create the icon assets needed for PWA manifests. The 192×192 and 512×512 sizes (use the 256×256 as a base) are standard for web app icons.",
              },
              {
                title: "Static Site Generators",
                desc: "Generate favicons for Next.js, Gatsby, Hugo, or any static site. Drop the PNG files into your public folder and add the link tags.",
              },
              {
                title: "CMS Platforms",
                desc: "Create favicons for WordPress, Shopify, or other CMS platforms. Upload the generated files through the theme customizer or directly via FTP.",
              },
              {
                title: "Email Marketing",
                desc: "Generate small icons for email templates and newsletters that display correctly in Gmail, Outlook, and other email clients.",
              },
              {
                title: "Bookmark Icons",
                desc: "Ensure your website has a recognizable icon when users bookmark it. A clear, well-designed favicon improves brand recall.",
              },
              {
                title: "Browser Tab Identity",
                desc: "Help users find your tab among many open tabs. A distinctive favicon is one of the easiest ways to improve user navigation experience.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-4"
              >
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use a square source image at least 512×512 pixels. Higher resolution sources produce sharper favicons at all sizes.",
              "Use a transparent (PNG) source with a simple, recognizable design. Complex details become unreadable at 16×16 pixels.",
              "Add 5–10% padding to prevent the icon from touching the edges, especially for rounded or circle shapes.",
              "Test your favicon at all sizes after generation. What looks great at 256×256 may be unclear at 16×16.",
              "Use a solid background color if your icon is light-colored, so it remains visible on light browser tab backgrounds.",
              "Include both 16×16 and 32×32 sizes in your HTML for maximum compatibility. The 32×32 is used for Windows taskbar pins.",
              "Add an Apple Touch Icon (180×180) for iOS home screen bookmarks. You can use the 256×256 PNG as a starting point.",
              "After generating, use our Image Compressor to optimize file sizes without visible quality loss for faster page loads.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Common Mistakes */}
        <section className="mt-16 space-y-4" aria-label="Common mistakes">
          <h2 className="text-2xl font-bold tracking-tight">
            Common Mistakes to Avoid
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Using a low-resolution source image — a 64×64 logo upscaled to 256×256 will look blurry. Always start with the largest version available.",
              "Using too much detail in your icon — fine lines, small text, and intricate patterns are invisible at 16×16. Keep the design bold and simple.",
              "Forgetting to add favicon link tags — generating the files is only half the job. You must add the correct HTML link tags to your page's <head> section.",
              "Using a rectangular source image without padding — the icon will be distorted or cropped awkwardly. Use a square source or add padding.",
              "Only generating one size — different browsers and contexts (tabs, bookmarks, home screen) require different sizes. Generate all six for full coverage.",
            ].map((mistake) => (
              <li key={mistake} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        {/* CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
