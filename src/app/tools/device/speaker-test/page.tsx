import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { SpeakerTestTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function SpeakerTestPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Speaker test tool"><SpeakerTestTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use Speaker Test</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Turn up your volume</span> — Set your device volume to a comfortable but audible level.</li>
            <li><span className="text-foreground font-medium">Test Left Channel</span> — Click 'Left Channel' and verify you hear sound from the left speaker only.</li>
            <li><span className="text-foreground font-medium">Test Right Channel</span> — Click 'Right Channel' and verify you hear sound from the right speaker only.</li>
            <li><span className="text-foreground font-medium">Test Both Channels</span> — Click 'Both Channels' to confirm stereo output works together.</li>
            <li><span className="text-foreground font-medium">Run Frequency Sweep</span> — Click 'Frequency Sweep' to test across the full 100Hz–10kHz range.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Dedicated left, right, and both channel tests", "Real-time waveform visualization using Canvas", "Frequency sweep from 100Hz to 10,000Hz", "StereoPannerNode for precise channel control", "440Hz reference tone (musical note A4)", "Safe volume levels to protect hearing", "Works with speakers and headphones", "Clean stop/reset functionality"].map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>))}
          </ul>
        </section>
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Speaker Test</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Use headphones for the most accurate left/right channel testing to isolate each speaker properly.","Set your system volume to 50-70% before testing — full volume can distort audio and mask subtle issues.","If speakers sound distorted after water exposure, try our Water Eject Tool to remove trapped moisture first.","Test your microphone alongside speakers using our Microphone Test for a complete audio system check.","Check if background noise is affecting your audio quality with our Noise Level Meter.","After confirming speakers work, verify your hearing range with our Hearing Test.","If only one channel plays, check your audio balance settings in your OS sound control panel."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Water Eject Tool/g, '<a href="/tools/device/water-eject-tool" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Water Eject Tool</a>')
                    .replace(/our Microphone Test/g, '<a href="/tools/device/microphone-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Microphone Test</a>')
                    .replace(/our Noise Level Meter/g, '<a href="/tools/device/noise-level-meter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Noise Level Meter</a>')
                    .replace(/our Hearing Test/g, '<a href="/tools/device/hearing-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Hearing Test</a>')
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
