import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { HandwritingToTextTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function HandwritingToTextPage() {
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
        <section className="mt-8" aria-label="Handwriting to Text Tool">
          <HandwritingToTextTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">
            How to Convert Handwriting to Text
          </h2>
          <p className="text-muted-foreground">
            Digitizing handwritten notes takes just a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">
                Upload your handwriting image
              </span>{" "}
              — Drag and drop a photo of your handwritten notes, letters, or
              documents. For printed text, try our{" "}
              <Link
                href="/tools/ocr/image-to-text-ocr"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image to Text OCR
              </Link>{" "}
              tool for optimized results.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Enable preprocessing
              </span>{" "}
              — Check the preprocessing options (Grayscale, Increase Contrast,
              Threshold) to improve recognition accuracy. Threshold mode works
              especially well for handwriting by converting the image to pure
              black and white.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Select language
              </span>{" "}
              — Choose the language of the handwritten text from the dropdown.
              The tool supports English, Bengali, Spanish, French, German,
              Chinese, Japanese, Arabic, and Hindi.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Click Recognize Handwriting
              </span>{" "}
              — Watch the progress bar as the OCR engine processes your
              handwriting image in real time. For screenshots, also try our{" "}
              <Link
                href="/tools/ocr/screenshot-to-text"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Screenshot to Text
              </Link>{" "}
              tool.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Review and export
              </span>{" "}
              — Check the extracted text, character count, word count, line
              count, and confidence percentage. Copy to clipboard or download
              as a .txt file. For scanned PDFs, use our{" "}
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
              "Client-side OCR processing — handwriting images never leave your browser",
              "Image preprocessing: Grayscale, Contrast Enhancement, and B&W Threshold",
              "Support for 9 languages including English, Chinese, Japanese, and Arabic",
              "Real-time progress bar showing recognition status",
              "Confidence score to gauge recognition accuracy",
              "Image preview with click-to-zoom functionality",
              "One-click copy to clipboard with visual feedback",
              "Download extracted text as a plain .txt file",
              "Character, word, and line count statistics",
              "Drag and drop or click to upload images",
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
                desc: "All handwriting recognition runs locally in your browser. Your personal notes and documents are never uploaded to any server — complete data privacy guaranteed.",
              },
              {
                title: "Image Preprocessing",
                desc: "Built-in grayscale, contrast, and threshold filters improve OCR accuracy on handwritten content. No need for external image editors before recognition.",
                link: {
                  href: "/tools/ocr/image-to-text-ocr",
                  label: "Image to Text OCR →",
                },
              },
              {
                title: "No Sign-Up Required",
                desc: "Start digitizing your handwriting immediately. No account creation, no email verification, no usage limits — just open and use.",
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
                title: "Lecture Notes",
                desc: "Digitize handwritten class or meeting notes for easier searching, sharing, and long-term storage.",
              },
              {
                title: "Old Letters & Archives",
                desc: "Preserve historical handwritten letters, diaries, and documents by converting them to searchable digital text.",
              },
              {
                title: "To-Do Lists & Journals",
                desc: "Convert your handwritten to-do lists, journal entries, and personal notes into digital format.",
              },
              {
                title: "Form Filling & Applications",
                desc: "Extract text from handwritten form fields, applications, and survey responses for data entry.",
              },
              {
                title: "Creative Writing Drafts",
                desc: "Transform handwritten story drafts, poetry, and creative writing into editable digital documents.",
              },
              {
                title: "Medical & Legal Notes",
                desc: "Digitize handwritten medical charts, legal notes, and case files for organized record-keeping.",
              },
              {
                title: "Research Field Notes",
                desc: "Convert handwritten research observations and field notes into typed documents for analysis and collaboration.",
              },
              {
                title: "Recipe Cards",
                desc: "Preserve handwritten family recipes by converting them into searchable, shareable digital recipes.",
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
          <h2 className="text-2xl font-bold tracking-tight">
            Tips for Better Handwriting Recognition
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use good, even lighting when photographing handwritten text. Avoid shadows and glare on the paper surface.",
              "Write with a dark pen on light, plain paper for maximum contrast. Blue or black ink on white paper works best.",
              "Enable the Threshold preprocessing option — this converts the image to pure black and white, which dramatically improves handwriting OCR accuracy.",
              "Capture images straight-on without tilting your phone or camera. Crooked images reduce recognition quality.",
              "Use high-resolution images (at least 300 DPI). More pixels mean the OCR engine can better distinguish character shapes.",
              "Select the correct language before recognition. The engine uses language-specific models, so matching the text language is critical.",
              "For faded or old handwriting, try combining Grayscale and Increase Contrast preprocessing to make the ink more visible.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip.replace(
                      /Image Cropper tool/,
                      '<a href="/tools/image/image-cropper" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Image Cropper tool</a>'
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
              "Using blurry or low-resolution images — the OCR engine needs clear character shapes to recognize handwriting accurately.",
              "Skipping preprocessing — handwriting benefits greatly from threshold mode. Always try enabling it for better results.",
              "Not selecting the correct language — this is the most common cause of poor results. Always match the dropdown to your text language.",
              "Using images with complex backgrounds — patterns, textures, or colored backgrounds confuse the recognition engine. Plain white backgrounds work best.",
              "Expecting 100% accuracy — handwriting varies significantly between individuals. Always review and manually correct the extracted text.",
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
