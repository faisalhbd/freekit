import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { NoiseLevelMeterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function NoiseLevelMeterPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Noise level meter"><NoiseLevelMeterTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use Noise Level Meter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Click Start Meter</span> — Grant microphone permission when prompted.</li>
            <li><span className="text-foreground font-medium">Observe the gauge</span> — The dB reading and color-coded gauge update in real time.</li>
            <li><span className="text-foreground font-medium">Check the history graph</span> — See noise level trends over time.</li>
            <li><span className="text-foreground font-medium">Monitor peak and average</span> — Track the highest and average levels recorded.</li>
            <li><span className="text-foreground font-medium">Stop when done</span> — Click Stop to end the measurement session.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Real-time approximate dB measurement", "Color-coded noise classification (Quiet/Moderate/Loud/Dangerous)", "Visual gauge with position indicator", "Live history graph on canvas", "Peak and average dB tracking", "Web Audio API AnalyserNode", "No audio data recorded or transmitted", "Works on desktop and mobile devices"].map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>))}
          </ul>
        </section>
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Noise Level Meter</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Calibrate by testing in a known quiet room first to establish your baseline reading.","Keep your device at the same distance from the noise source for consistent measurements.","Readings above 85dB for extended periods can cause hearing damage — use our Hearing Test to check.","Test your microphone quality alongside noise levels with our Microphone Test.","If water got into your device, use our Water Eject Tool before testing audio quality.","Verify speaker output is clear after noise exposure with our Speaker Test.","Use this tool to find the quietest spot in your home for recording or focused work."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Hearing Test/g, '<a href="/tools/device/hearing-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Hearing Test</a>')
                    .replace(/our Microphone Test/g, '<a href="/tools/device/microphone-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Microphone Test</a>')
                    .replace(/our Water Eject Tool/g, '<a href="/tools/device/water-eject-tool" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Water Eject Tool</a>')
                    .replace(/our Speaker Test/g, '<a href="/tools/device/speaker-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Speaker Test</a>')
                    .replace(/our Webcam Test/g, '<a href="/tools/device/webcam-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Webcam Test</a>')
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
