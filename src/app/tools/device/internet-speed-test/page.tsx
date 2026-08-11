import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { InternetSpeedTestTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function InternetSpeedTestPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Internet speed test"><InternetSpeedTestTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use Internet Speed Test</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Close other tabs</span> — For the most accurate results, close other tabs and apps using bandwidth.</li>
            <li><span className="text-foreground font-medium">Click Run Speed Test</span> — The tool will download ~30MB of test data from a CDN.</li>
            <li><span className="text-foreground font-medium">Watch the progress</span> — Real-time speed and progress are shown during the test.</li>
            <li><span className="text-foreground font-medium">Review results</span> — See your average speed, peak speed, and duration.</li>
            <li><span className="text-foreground font-medium">Re-test for consistency</span> — Run multiple tests and average the results for accuracy.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Download speed measurement in Mbps", "Real-time progress bar and speed display", "Peak speed tracking during test", "Cloudflare CDN for reliable test data", "Cancel test at any time", "Total data and duration display", "Speed quality classification", "No account or installation needed"].map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>))}
          </ul>
        </section>
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Internet Speed Test</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Close other tabs and applications that use bandwidth before running the test for accurate results.","Run the test multiple times and average the results — network speeds fluctuate throughout the day.","Connect via Ethernet cable instead of Wi-Fi for the most accurate speed measurement.","If your speed is low, check if background noise is causing device issues with our Noise Level Meter.","Test your audio setup for video calls using our Microphone Test after checking your connection.","Verify your speakers work for streaming content with our Speaker Test.","Compare your results at different times of day to identify peak usage slowdowns from your ISP."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Noise Level Meter/g, '<a href="/tools/device/noise-level-meter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Noise Level Meter</a>')
                    .replace(/our Microphone Test/g, '<a href="/tools/device/microphone-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Microphone Test</a>')
                    .replace(/our Speaker Test/g, '<a href="/tools/device/speaker-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Speaker Test</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-16" aria-label="FAQ"><FAQSection items={faqs} /></section>
        <section className="mt-16" aria-label="Related tools"><ToolFooter tool={toolConfig} /></section>
        <ToolPageCTA />
      </div>
    </>
  )
}
