import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { QRCodeScannerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function QRCodeScannerPage() {
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
        <section className="mt-8" aria-label="QR Code Scanner Tool">
          <QRCodeScannerTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Scan a QR Code from an Image</h2>
          <p className="text-muted-foreground">
            Decode QR codes from any image in two simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload an image</span> — Drag and drop or click to browse for an image containing a QR code (screenshot, photo, or saved image).
            </li>
            <li>
              <span className="text-foreground font-medium">View the result</span> — The decoded content is displayed instantly. If it is a URL, click to open it directly.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Uses browser's built-in BarcodeDetector API",
              "No external libraries needed",
              "Detects multiple QR codes in one image",
              "URL detection with clickable link",
              "One-click copy to clipboard",
              "Drag-and-drop image upload",
              "Image preview after upload",
              "Clear error messages if no QR found",
              "Browser compatibility check on load",
              "100% client-side — no server uploads",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Browser Support */}
        <section className="mt-16 space-y-4" aria-label="Browser support">
          <h2 className="text-2xl font-bold tracking-tight">Browser Support</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { browser: "Google Chrome", version: "83+", supported: true, note: "Full support. Recommended browser for this tool." },
              { browser: "Microsoft Edge", version: "83+", supported: true, note: "Full support. Uses the same Chromium engine as Chrome." },
              { browser: "Opera", version: "69+", supported: true, note: "Full support. Chromium-based browser." },
              { browser: "Firefox", version: "Any", supported: false, note: "BarcodeDetector API not yet implemented natively." },
              { browser: "Safari", version: "Any", supported: false, note: "BarcodeDetector API not yet implemented natively." },
              { browser: "Mobile Chrome", version: "83+", supported: true, note: "Works on Android Chrome." },
            ].map((item) => (
              <div key={item.browser} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.browser}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.supported
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}>
                    {item.supported ? "Supported" : "Not Supported"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Version {item.version}</p>
                <p className="text-sm text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Tips for Best Results */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Best Results</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { tip: "Use clear, well-lit images", desc: "Blurry or dark images reduce detection accuracy. Ensure the QR code is crisp and well-illuminated." },
              { tip: "Center the QR code in the image", desc: "The QR code should be the main subject and occupy a reasonable portion of the frame." },
              { tip: "Avoid extreme angles", desc: "QR codes work best when viewed straight-on. Extreme perspective distortion can prevent detection." },
              { tip: "Use screenshots when possible", desc: "Screenshots from websites or apps produce the clearest QR code images for scanning." },
            ].map((item) => (
              <div key={item.tip} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.tip}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. QR Code Content Types */}
        <section className="mt-16 space-y-4" aria-label="Content types">
          <h2 className="text-2xl font-bold tracking-tight">What Can QR Codes Contain?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { type: "URLs", desc: "Website links that open in your browser when scanned with a camera app." },
              { type: "Plain Text", desc: "Any text message, note, or information encoded as plain text." },
              { type: "Contact Info (vCard)", desc: "Name, phone, email, and address information in vCard format." },
              { type: "Wi-Fi Credentials", desc: "Network name (SSID), password, and encryption type for easy Wi-Fi sharing." },
              { type: "Calendar Events", desc: "Event title, date, time, and location in vCalendar format." },
              { type: "Payment Info", desc: "Payment request URLs used by services like PayPal or cryptocurrency wallets." },
            ].map((item) => (
              <div key={item.type} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.type}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Privacy & Security */}
        <section className="mt-16 space-y-4" aria-label="Privacy">
          <h2 className="text-2xl font-bold tracking-tight">Privacy & Security</h2>
          <p className="text-muted-foreground">
            This tool processes your images entirely in your browser. The image is drawn to a canvas and scanned locally. Nothing is uploaded to any server. The decoded content is displayed only to you and is not stored, logged, or shared. When you navigate away, all data is released from memory.
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Security note:</span> If a QR code contains a URL, be cautious before opening it. Malicious QR codes can link to phishing sites. Always verify the URL looks legitimate before clicking.
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
