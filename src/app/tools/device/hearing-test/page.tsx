import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { HearingTestTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function HearingTestPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Hearing test"><HearingTestTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use Hearing Test</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Put on headphones</span> — Headphones are strongly recommended for accurate results.</li>
            <li><span className="text-foreground font-medium">Set comfortable volume</span> — Adjust your device volume to a moderate, comfortable level.</li>
            <li><span className="text-foreground font-medium">Start the test</span> — Click Start Test and a tone will play at 125Hz.</li>
            <li><span className="text-foreground font-medium">Respond honestly</span> — Click 'I Can Hear It' or 'I Cannot Hear It' for each frequency.</li>
            <li><span className="text-foreground font-medium">View results</span> — After all 12 frequencies, see your hearing response chart.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["12 test frequencies from 125Hz to 16kHz", "Visual frequency response bar chart", "Play/replay each tone before answering", "Heard vs missed counter during test", "Pure sine wave tones via Web Audio API", "Fade-in/fade-out to prevent clicks", "Progress tracking with percentage", "Not a medical diagnosis — educational only"].map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>))}
          </ul>
        </section>
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Hearing Test</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Use headphones instead of speakers for the most accurate frequency detection results.","Set your volume to a comfortable level before starting — the test uses varying volumes.","Take the test in a quiet room using our Noise Level Meter to ensure environmental sounds do not interfere.","If you cannot hear high frequencies, first check your speakers with our Speaker Test.","After testing hearing, verify your microphone captures audio properly with our Microphone Test.","This is a screening tool only — consult an audiologist for a professional hearing evaluation.","Retest at different times of day as ear fatigue can temporarily affect your hearing sensitivity."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Noise Level Meter/g, '<a href="/tools/device/noise-level-meter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Noise Level Meter</a>')
                    .replace(/our Speaker Test/g, '<a href="/tools/device/speaker-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Speaker Test</a>')
                    .replace(/our Microphone Test/g, '<a href="/tools/device/microphone-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Microphone Test</a>')
                    .replace(/our Water Eject Tool/g, '<a href="/tools/device/water-eject-tool" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Water Eject Tool</a>')
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
