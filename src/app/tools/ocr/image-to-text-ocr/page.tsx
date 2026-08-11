import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ImageToTextOcrTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ImageToTextOcrPage() {
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
        <section className="mt-8" aria-label="Image to Text OCR Tool">
          <ImageToTextOcrTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">
            How to Extract Text from Images
          </h2>
          <p className="text-muted-foreground">
            Converting images to editable text takes just a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your image</span>{" "}
              — Drag and drop a JPG, PNG, WebP, BMP, or GIF file onto the upload area, or click to browse your device. Screenshots work great too — try our{" "}
              <Link
                href="/tools/ocr/screenshot-to-text"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Screenshot to Text
              </Link>{" "}
              tool for an optimized experience.
            </li>
            <li>
              <span className="text-foreground font-medium">Select language</span>{" "}
              — Choose the language of the text in your image from the dropdown. The tool supports English, Bengali, Spanish, French, German, Chinese, Japanese, Arabic, and Hindi.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Extract Text</span>{" "}
              — Hit the extract button and watch the progress bar as the OCR engine processes your image in real time.
            </li>
            <li>
              <span className="text-foreground font-medium">Review results</span>{" "}
              — Check the extracted text, character count, word count, line count, and confidence percentage. For handwritten content, also try our{" "}
              <Link
                href="/tools/ocr/handwriting-to-text"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Handwriting to Text
              </Link>{" "}
              tool.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy or download</span>{" "}
              — Use the copy button to send text to your clipboard, or download it as a .txt file. For scanned PDFs, you can also use our{" "}
              <Link
                href="/tools/pdf/pdf-to-text"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                PDF to Text
              </Link>{" "}
              tool.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side OCR processing — images never leave your browser",
              "Support for 9 languages including English, Chinese, Japanese, and Arabic",
              "Real-time progress bar showing recognition status",
              "Confidence score to gauge extraction accuracy",
              "Drag and drop or click to upload images",
              "Supports JPG, PNG, WebP, BMP, and GIF formats",
              "One-click copy to clipboard with visual feedback",
              "Download extracted text as a plain .txt file",
              "Character, word, and line count statistics",
              "Image preview before and after extraction",
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
                desc: "All OCR processing runs locally in your browser. Your images are never uploaded to any server — your data stays on your device at all times.",
              },
              {
                title: "Multi-Language Support",
                desc: "Extract text in 9 different languages, making it useful for documents, signs, and images from around the world.",
                link: {
                  href: "/tools/ocr/screenshot-to-text",
                  label: "Screenshot to Text →",
                },
              },
              {
                title: "No Sign-Up Required",
                desc: "Start extracting text immediately. No account creation, no email verification, no usage limits — just open and use.",
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
                title: "Scanned Documents",
                desc: "Convert scanned PDFs and paper documents into editable text for digital workflows.",
              },
              {
                title: "Screenshot Text Extraction",
                desc: "Grab text from app screenshots, error messages, or social media posts.",
              },
              {
                title: "Business Cards",
                desc: "Extract contact information from business card photos for quick data entry.",
              },
              {
                title: "Book & Article Quotes",
                desc: "Capture passages from physical books or printed articles for research and notes.",
              },
              {
                title: "Receipts & Invoices",
                desc: "Digitize receipt text for expense tracking and accounting purposes.",
              },
              {
                title: "Signs & Labels",
                desc: "Read text from photos of street signs, product labels, or menu boards.",
              },
              {
                title: "Handwritten Notes",
                desc: "Convert handwritten notes and lists into typed digital text.",
              },
              {
                title: "Presentation Slides",
                desc: "Extract content from presentation screenshots when you don't have the original file.",
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
              "Use high-resolution images (300 DPI or higher) for the best OCR accuracy. Higher resolution means clearer character recognition.",
              "Ensure good contrast between text and background. Black text on white backgrounds produces the most reliable results.",
              "Crop the image to focus only on the text area before uploading. You can use our Image Cropper tool to prepare your images.",
              "Select the correct language before extracting. The OCR engine uses language-specific models, so matching the text language improves accuracy significantly.",
              "For multi-language documents, run the OCR once per language section and combine the results manually for the best output.",
              "Straighten rotated or skewed images before processing. Crooked text reduces accuracy. Many phone scanner apps auto-straighten images.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip.replace(
                      /our Image Cropper tool/,
                      '<a href="/tools/image/image-cropper" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Cropper tool</a>'
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
              "Using low-resolution images — blurry or pixelated text leads to poor recognition accuracy.",
              "Selecting the wrong language — this is the most common cause of low accuracy. Always match the language to your image content.",
              "Not checking the confidence score — always review the confidence percentage to know if manual correction is needed.",
              "Expecting perfect results from handwritten text — handwritten content varies significantly and may require manual editing.",
              "Ignoring image preprocessing — rotating, cropping, or adjusting contrast before OCR can dramatically improve results.",
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
