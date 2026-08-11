import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TouchScreenTestTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TouchScreenTestPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Touch screen test"><TouchScreenTestTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use Touch Screen Test</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Draw on the canvas</span> — Touch or click-drag across the entire surface area.</li>
            <li><span className="text-foreground font-medium">Check for gaps</span> — Any areas that don't respond indicate a dead zone.</li>
            <li><span className="text-foreground font-medium">Test edges and corners</span> — These are common problem areas on touchscreens.</li>
            <li><span className="text-foreground font-medium">Test multi-touch</span> — Place 2+ fingers simultaneously and check the counter.</li>
            <li><span className="text-foreground font-medium">Clear and retest</span> — Use Clear Canvas to start fresh and verify consistency.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["HTML5 Canvas drawing with touch events", "Multi-touch detection and display", "Color-coded sequential touch points", "Real-time touch count statistics", "Mouse support for desktop testing", "High-DPI canvas rendering", "Line drawing between sequential touches", "One-click canvas clear and reset"].map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>))}
          </ul>
        </section>
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Touch Screen Test</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Draw slowly across the entire screen to ensure no dead zones exist in touch sensitivity.","Use multiple fingers at once to test multi-touch capability on your device.","Check the touch point count display — it should match the number of fingers touching the screen.","After testing touch, verify your display has no dead pixels with our Dead Pixel Test.","Check if your webcam and camera are functioning correctly with our Webcam Test.","If touch response is delayed, test your device performance with our Internet Speed Test.","Clean your screen before testing — dirt and smudges can interfere with touch accuracy."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Dead Pixel Test/g, '<a href="/tools/device/dead-pixel-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Dead Pixel Test</a>')
                    .replace(/our Webcam Test/g, '<a href="/tools/device/webcam-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Webcam Test</a>')
                    .replace(/our Internet Speed Test/g, '<a href="/tools/device/internet-speed-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Internet Speed Test</a>')
                    .replace(/our Microphone Test/g, '<a href="/tools/device/microphone-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Microphone Test</a>')
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
