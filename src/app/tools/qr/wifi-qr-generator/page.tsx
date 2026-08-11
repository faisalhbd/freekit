import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { WifiQrGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function WifiQrGeneratorPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />

        <section className="mt-8" aria-label="WiFi QR Code Generator">
          <WifiQrGeneratorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the WiFi QR Code Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter your Network Name (SSID)</span> — Type the exact name of your WiFi network as it appears on your router settings.</li>
            <li><span className="text-foreground font-medium">Enter the Password</span> — Type the WiFi password. Toggle the eye icon to show or hide it for verification.</li>
            <li><span className="text-foreground font-medium">Select Security Type</span> — Choose WPA/WPA2 for most networks, WEP for older setups, or None for open networks.</li>
            <li><span className="text-foreground font-medium">Customize and Generate</span> — Optionally change colors and size, then click "Generate QR Code".</li>
            <li><span className="text-foreground font-medium">Download and Share</span> — Download the PNG and print it or share it digitally with guests.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Supports WPA/WPA2/WPA3, WEP, and open (no password) networks",
              "Hidden network toggle for non-broadcasting SSIDs",
              "Custom foreground and background colors for branding",
              "Three size options: 256px (digital), 512px (print), 1024px (large format)",
              "One-click PNG download with descriptive filename",
              "Shows the WIFI string (password hidden) for technical reference",
              "Password visibility toggle for secure entry verification",
              "100% client-side processing — zero data transmission",
              "Special character escaping for SSIDs and passwords with semicolons, colons, and commas",
              "Responsive design for mobile, tablet, and desktop",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Home & Family", d: "Print a WiFi QR code and stick it on your fridge so family members and guests can connect without asking for the password every time." },
              { t: "Cafes & Restaurants", d: "Place a QR code on each table so customers can connect to your guest WiFi instantly without staff intervention." },
              { t: "Hotels & Airbnbs", d: "Include a WiFi QR code in your welcome folder or printed guide so guests have seamless internet access from the moment they arrive." },
              { t: "Offices & Co-working Spaces", d: "Display QR codes in meeting rooms and common areas for visitors and contractors to connect to the guest network." },
              { t: "Events & Conferences", d: "Print WiFi QR codes on badges, programs, or signage to handle hundreds of simultaneous connections without bottlenecking registration." },
              { t: "IoT Device Setup", d: "Use WiFi QR codes to quickly connect smart home devices, printers, and IoT gadgets that need network access during initial configuration." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using WiFi QR Code Generator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Double-check your WiFi password for typos before generating — the QR code will encode exactly what you enter.","Set the correct encryption type (WPA/WPA2/WPA3 or WEP) to ensure devices connect successfully.","Share your WiFi QR code by printing it or sending the image to guests.","For general URLs and text, use our QR Code Generator for more customization options.","Scan the generated QR code with our QR Code Scanner to verify it works correctly.","For product barcodes, try our Barcode Generator for UPC and EAN formats."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our QR Code Generator/g, '<a href="/tools/utility/qr-code-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">QR Code Generator</a>')
                    .replace(/our QR Code Scanner/g, '<a href="/tools/privacy/qr-code-scanner" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">QR Code Scanner</a>')
                    .replace(/our Barcode Generator/g, '<a href="/tools/privacy/barcode-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Barcode Generator</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-16" aria-label="FAQ">
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
