import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PDFMetadataRemoverTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PDFMetadataRemoverPage() {
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
        <section className="mt-8" aria-label="PDF Metadata Remover Tool">
          <PDFMetadataRemoverTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Remove PDF Metadata</h2>
          <p className="text-muted-foreground">
            Strip metadata from any PDF in three simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your PDF</span> — Drag and drop or click to browse for a .pdf file.
            </li>
            <li>
              <span className="text-foreground font-medium">Review the current metadata</span> — See all metadata fields that will be removed.
            </li>
            <li>
              <span className="text-foreground font-medium">Click &quot;Remove All Metadata&quot;</span> — The cleaned PDF is generated and auto-downloaded.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Removes all 8 standard PDF metadata fields",
              "Displays current metadata before removal",
              "Before/after comparison table",
              "File size display",
              "Auto-download cleaned PDF",
              "Redownload button after cleaning",
              "Drag-and-drop upload",
              "PDF content remains completely untouched",
              "Powered by pdf-lib (client-side)",
              "No server uploads — 100% private",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. What Gets Removed */}
        <section className="mt-16 space-y-4" aria-label="What gets removed">
          <h2 className="text-2xl font-bold tracking-tight">What Metadata Gets Removed</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { field: "Title", desc: "The document title stored in the PDF properties" },
              { field: "Author", desc: "The name of the person who created the document" },
              { field: "Subject", desc: "The subject or topic of the document" },
              { field: "Keywords", desc: "Searchable keywords associated with the document" },
              { field: "Creator", desc: "The application used to originally create the PDF" },
              { field: "Producer", desc: "The application that last converted or saved the PDF" },
              { field: "Creation Date", desc: "The timestamp when the document was first created" },
              { field: "Modification Date", desc: "The timestamp when the document was last modified" },
            ].map((item) => (
              <div key={item.field} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.field}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Why Remove Metadata */}
        <section className="mt-16 space-y-4" aria-label="Why remove metadata">
          <h2 className="text-2xl font-bold tracking-tight">Why You Should Remove PDF Metadata</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Protect Your Identity", desc: "Your name in the Author field can identify you even when sharing documents anonymously. Removing it protects your identity." },
              { title: "Prevent Information Leakage", desc: "Creator and Producer fields reveal what software and version you use, which can be used for targeted attacks." },
              { title: "Professional Document Sharing", desc: "When sharing contracts, reports, or proposals, metadata from draft versions can leak internal information." },
              { title: "Compliance Requirements", desc: "Some industries and regulations require that documents be stripped of metadata before being shared externally." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Comparison with Other Methods */}
        <section className="mt-16 space-y-4" aria-label="Comparison">
          <h2 className="text-2xl font-bold tracking-tight">Online Tool vs. Desktop Software</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium">Feature</th>
                  <th className="text-center p-4 font-medium">FreeKit Online</th>
                  <th className="text-center p-4 font-medium">Desktop Software</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["No installation needed", true, false],
                  ["Works on any device", true, false],
                  ["Files never leave browser", true, false],
                  ["Batch processing", false, true],
                  ["Advanced PDF editing", false, true],
                ].map(([feature, online, desktop]) => (
                  <tr key={feature as string} className="border-b border-border last:border-0">
                    <td className="p-4 text-muted-foreground">{feature as string}</td>
                    <td className="p-4 text-center">{online ? "✓" : "—"}</td>
                    <td className="p-4 text-center">{desktop ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Technical Details */}
        <section className="mt-16 space-y-4" aria-label="Technical details">
          <h2 className="text-2xl font-bold tracking-tight">Technical Details</h2>
          <p className="text-muted-foreground">
            This tool uses pdf-lib, a popular open-source PDF manipulation library that runs entirely in the browser. It loads the PDF into memory, accesses the document information dictionary, and sets all metadata fields to undefined. The PDF is then re-serialized and saved. This process preserves all page content, fonts, images, and formatting while removing only the metadata layer.
          </p>
        </section>

        {/* 9. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
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
