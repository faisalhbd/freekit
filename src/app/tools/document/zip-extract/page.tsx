import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ZipExtractTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ZipExtractPage() {
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
        <ToolHeader tool={toolConfig} />

        <section className="mt-8" aria-label="ZIP Extract Tool">
          <ZipExtractTool />
        </section>

        {/* How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Extract ZIP Files Online</h2>
          <p className="text-muted-foreground">
            Extracting files from a ZIP archive is straightforward with our browser-based tool:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your ZIP file</span> — Drag and drop a ZIP archive onto the upload area, or click to browse your device. The tool shows the file size.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Extract ZIP File</span> — The tool decompresses the archive in your browser. A progress bar tracks the extraction as each file is processed.
            </li>
            <li>
              <span className="text-foreground font-medium">Browse the file tree</span> — Navigate the folder structure with expandable tree view. Click any file to preview its contents in the right panel. Text files and images are previewed inline.
            </li>
            <li>
              <span className="text-foreground font-medium">Download files</span> — Click the download icon on individual files, or use Download All to save every file. Need to compress files into a ZIP? Try our{" "}
              <Link href="/tools/pdf/jpg-to-pdf" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                JPG to PDF
              </Link>{" "}
              tool to combine images into a PDF document.
            </li>
          </ol>
        </section>

        {/* Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "100% client-side — your ZIP file never leaves your browser",
              "Interactive file tree with expandable folder navigation",
              "Inline text file preview with syntax display",
              "Image preview for PNG, JPG, GIF, WebP, and SVG files",
              "File type icons for easy identification",
              "Individual file download with one click",
              "Download All to save every file at once",
              "Archive statistics: file count, total size, compression ratio",
              "Progress bar with extraction status tracking",
              "Drag and drop file upload support",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using ZIP Extract</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["All extraction happens in your browser — your files are never uploaded to any server.","Large ZIP files may take longer to process depending on your device performance.","You can download individual files or all extracted files at once as needed.","Verify file integrity after extraction using our File Checksum Verifier tool.","For document files inside ZIPs, convert them with our PDF to Markdown tool.","Protect sensitive documents before sharing by stripping metadata with our PDF Metadata Remover."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our File Checksum Verifier/g, '<a href="/tools/privacy/file-checksum-verifier" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">File Checksum Verifier</a>')
                    .replace(/our PDF to Markdown/g, '<a href="/tools/document/pdf-to-markdown" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">PDF to Markdown</a>')
                    .replace(/our PDF Metadata Remover/g, '<a href="/tools/privacy/pdf-metadata-remover" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">PDF Metadata Remover</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
