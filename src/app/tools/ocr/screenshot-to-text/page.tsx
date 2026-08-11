import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ScreenshotToTextTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ScreenshotToTextPage() {
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
        <section className="mt-8" aria-label="Screenshot to Text Tool">
          <ScreenshotToTextTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">
            How to Extract Text from Screenshots
          </h2>
          <p className="text-muted-foreground">
            Grabbing text from any screenshot is fast and simple:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">
                Upload or paste your screenshot
              </span>{" "}
              — Drag and drop a screenshot file, click to browse, or simply press Ctrl+V to paste directly from your clipboard. You can also click the &quot;Paste from Clipboard&quot; button.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Preview and verify
              </span>{" "}
              — The tool shows a preview of your screenshot. Click the zoom button to inspect the image and ensure the text is clearly readable. For general images, try our{" "}
              <Link
                href="/tools/ocr/image-to-text-ocr"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image to Text OCR
              </Link>{" "}
              tool.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Select language and extract
              </span>{" "}
              — Choose the text language from the dropdown and click &quot;Extract Text&quot;. A progress bar tracks the OCR process in real time.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Copy or download the result
              </span>{" "}
              — Once extraction is complete, review the text stats and use the copy or download buttons. You can also analyze the text further with our{" "}
              <Link
                href="/tools/text/word-counter"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Word Counter
              </Link>{" "}
              tool. For handwritten content, try{" "}
              <Link
                href="/tools/ocr/handwriting-to-text"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Handwriting to Text
              </Link>.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Paste from clipboard with Ctrl+V — fastest way to process screenshots",
              "Drag and drop or click to upload screenshot files",
              "Click-to-zoom image preview for verification before extraction",
              "Client-side OCR processing — screenshots never leave your browser",
              "Support for 9 languages including English, Chinese, Japanese, and Arabic",
              "Real-time progress bar during text recognition",
              "Character, word, and line count statistics after extraction",
              "One-click copy to clipboard with visual check icon feedback",
              "Download extracted text as a plain .txt file",
              "Works with PNG, JPG, WebP, BMP, and GIF screenshot formats",
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
                title: "Lightning-Fast Workflow",
                desc: "Paste screenshots directly with Ctrl+V for the fastest possible text extraction. No file saving or uploading needed — just capture and paste.",
                link: {
                  href: "/tools/ocr/image-to-text-ocr",
                  label: "Image to Text OCR →",
                },
              },
              {
                title: "Screenshot-Optimized",
                desc: "Specifically tuned for screen captures which have crisp, pixel-perfect text. This means higher accuracy compared to general photo OCR.",
              },
              {
                title: "Fully Private",
                desc: "Your screenshots may contain sensitive information like messages, emails, or code. All processing happens in your browser — nothing is ever sent to a server.",
                link: {
                  href: "/tools/text/text-sorter",
                  label: "Text Sorter →",
                },
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
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Error Messages",
                desc: "Copy error text from screenshots when you cannot select text directly, making it easy to search for solutions.",
              },
              {
                title: "Social Media Posts",
                desc: "Extract text from Instagram, Twitter, or LinkedIn screenshots for content research and repurposing.",
              },
              {
                title: "Chat Messages",
                desc: "Pull text from messaging app screenshots for record-keeping or archiving important conversations.",
              },
              {
                title: "Code Snippets",
                desc: "Grab code from video tutorials or documentation screenshots when copy-paste is not available.",
              },
              {
                title: "Presentation Slides",
                desc: "Extract content from presentation screenshots shared as images in meetings or emails.",
              },
              {
                title: "App UI Text",
                desc: "Capture labels, buttons, and descriptions from app screenshots for design reviews or localization work.",
              },
              {
                title: "Website Content",
                desc: "Extract text from website screenshots when the page is not accessible or copy is disabled.",
              },
              {
                title: "Notes from Videos",
                desc: "Pause a video, take a screenshot of on-screen text, and extract it for your notes.",
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
              "Take full-resolution screenshots for the best OCR results. Avoid compressing or downscaling screenshots before uploading.",
              "Use Ctrl+V (or Cmd+V on Mac) to paste directly from your clipboard — this is the fastest workflow for screen captures.",
              "Select the correct language that matches the text in your screenshot. Mismatched languages are the leading cause of reduced accuracy.",
              "If the screenshot contains a mix of languages, run the extraction with the dominant language and manually fix any misrecognized characters.",
              "For long scrolling screenshots, consider cropping to the specific text region first for faster and more accurate results.",
              "Use the zoom preview feature to verify the screenshot quality before extracting — blurry screenshots will produce lower accuracy.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip.replace(
                      /our Image to Text OCR tool/,
                      '<a href="/tools/ocr/image-to-text-ocr" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image to Text OCR tool</a>'
                    ),
                  }}
                />
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
              "Using low-quality compressed screenshots — always use the original full-resolution capture for best results.",
              "Forgetting to select the correct language — this is the single biggest factor affecting OCR accuracy on screenshots.",
              "Not zooming to verify the image — use the zoom preview to confirm the text is clear before running extraction.",
              "Trying to extract from heavily styled or decorative text — stylized fonts and text overlays on images may not be recognized accurately.",
              "Not reviewing the output — always proofread the extracted text, especially for numbers and special characters which are more prone to errors.",
            ].map((mistake) => (
              <li key={mistake} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                {mistake}
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
