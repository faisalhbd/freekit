import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PcToPhoneFileTransfer } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PcToPhoneFileTransferPage() {
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
        <section className="mt-8" aria-label="PC to Phone File Transfer Tool">
          <PcToPhoneFileTransfer />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Transfer Files from PC to Phone</h2>
          <p className="text-muted-foreground">
            Transfer files between your PC and phone in four simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose your role</span> — Click &quot;Send Files&quot; on the device that has the files you want to share, or &quot;Receive Files&quot; on the device you want to save them to.
            </li>
            <li>
              <span className="text-foreground font-medium">Connect the devices</span> — On the sender, a QR code appears. Scan it with the receiver's phone camera. Alternatively, share the 6-character room code and enter it on the receiver.
            </li>
            <li>
              <span className="text-foreground font-medium">Select your files</span> — On the sender device, click to browse or drag and drop files. You can select multiple files of any type.
            </li>
            <li>
              <span className="text-foreground font-medium">Send and receive</span> — Click &quot;Send&quot; on the sender. Files transfer directly between devices and download automatically on the receiver. Monitor real-time progress and speed.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "WebRTC peer-to-peer — files go directly device to device",
              "QR code scanning for instant pairing — no typing needed",
              "6-character room code as a backup connection method",
              "End-to-end DTLS encryption on all transfers",
              "Real-time transfer speed and progress display",
              "Drag and drop file selection with multi-file support",
              "All file types supported — photos, videos, docs, and more",
              "No file size limits (practical limit based on connection)",
              "Works across platforms: Windows, Mac, Linux, Android, iOS",
              "No app installation, no account, no cloud storage",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Security & Privacy */}
        <section className="mt-16 space-y-4" aria-label="Security and privacy">
          <h2 className="text-2xl font-bold tracking-tight">Security &amp; Privacy</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "End-to-End Encryption",
                desc: "All data is encrypted using DTLS (Datagram Transport Layer Security), the same protocol that powers HTTPS. Your files are encrypted before they leave your device and can only be decrypted by the receiving device.",
              },
              {
                title: "No Server Storage",
                desc: "Files never pass through any server. The signaling server only helps exchange connection setup data (SDP offers/answers). Once the WebRTC connection is established, data flows directly between your devices.",
              },
              {
                title: "No Account Required",
                desc: "No sign-up, no login, no email. Just open the page, scan the QR code, and transfer. We don't collect any personal information or track your transfers.",
              },
              {
                title: "Automatic Cleanup",
                desc: "Connections are closed immediately after transfer. No data is cached, logged, or retained. The room is automatically deleted from the signaling server after both peers disconnect.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Comparison with Alternatives */}
        <section className="mt-16 space-y-4" aria-label="Comparison">
          <h2 className="text-2xl font-bold tracking-tight">How It Compares</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Feature</th>
                  <th className="px-4 py-3 text-center font-semibold">FreeKit Transfer</th>
                  <th className="px-4 py-3 text-center font-semibold">AirDrop</th>
                  <th className="px-4 py-3 text-center font-semibold">Bluetooth</th>
                  <th className="px-4 py-3 text-center font-semibold">Cloud Upload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Cross-Platform", "Yes", "No", "Yes", "Yes"],
                  ["No App Install", "Yes", "No", "No", "Sometimes"],
                  ["No Cloud Upload", "Yes", "Yes", "Yes", "No"],
                  ["Speed (same Wi-Fi)", "Fast", "Fast", "Slow", "Medium"],
                  ["End-to-End Encrypted", "Yes", "Yes", "No", "Sometimes"],
                  ["Works in Browser", "Yes", "No", "No", "Yes"],
                  ["File Size Limit", "None", "None", "~25MB", "Varies"],
                ].map(([feature, ...vals]) => (
                  <tr key={feature}>
                    <td className="px-4 py-2.5 font-medium">{feature}</td>
                    {vals.map((val, i) => (
                      <td
                        key={i}
                        className={`px-4 py-2.5 text-center ${
                          val === "Yes" || val === "Fast" || val === "None"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : val === "No" || val === "Slow"
                              ? "text-red-500 dark:text-red-400"
                              : "text-muted-foreground"
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Tips for Best Performance */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Best Performance</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Same Wi-Fi Network", desc: "Keep both devices on the same Wi-Fi network for the fastest transfer speeds. Local network transfers bypass the internet entirely." },
              { title: "Close Other Tabs", desc: "Close bandwidth-heavy tabs and downloads on both devices to maximize available bandwidth for the file transfer." },
              { title: "Stay on the Page", desc: "Don't navigate away from the transfer page during an active transfer. The WebRTC connection requires the page to stay open." },
              { title: "Use Chrome or Firefox", desc: "For the best WebRTC performance and compatibility, use the latest version of Chrome or Firefox on both devices." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Technical Details */}
        <section className="mt-16 space-y-4" aria-label="Technical details">
          <h2 className="text-2xl font-bold tracking-tight">Technical Details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "WebRTC Data Channels", desc: "Uses RTCDataChannel for reliable, ordered data transfer. Files are sent in 64KB chunks with backpressure management to prevent memory issues." },
              { title: "STUN Servers", desc: "Uses Google's public STUN servers for NAT traversal. This allows connections across different networks while keeping the transfer P2P." },
              { title: "Signaling Protocol", desc: "A lightweight WebSocket signaling server exchanges SDP offers/answers and ICE candidates. No file data passes through the signaling server." },
              { title: "QR Code Encoding", desc: "The QR code encodes the tool URL with the room ID. When scanned, it opens the page in receive mode on the phone's browser." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
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
