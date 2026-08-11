import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { WaterEjectTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function WaterEjectPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Water eject tool"><WaterEjectTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use Water Eject Tool</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Wipe your device</span> — Remove any visible water from the outside of your device.</li>
            <li><span className="text-foreground font-medium">Set volume to maximum</span> — Turn your device volume all the way up for best results.</li>
            <li><span className="text-foreground font-medium">Hold speaker-down</span> — Place your device with the speaker facing downward on a soft cloth or towel.</li>
            <li><span className="text-foreground font-medium">Click Start Eject</span> — The tool will play a 30-second frequency sweep to vibrate water out.</li>
            <li><span className="text-foreground font-medium">Repeat if needed</span> — Run additional cycles until no more water droplets appear.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["80–400Hz sine wave sweep for optimal water displacement", "30-second duration with real-time progress tracking", "Visual frequency display and position indicator", "Multiple cycle support for persistent water", "Web Audio API — no server audio streaming", "Works on phones, laptops, and tablets", "Smooth cosine interpolation for natural sweep", "Automatic cleanup on completion"].map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>))}
          </ul>
        </section>
        {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Water Eject Tool</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Always set your device volume to maximum before running the water eject sweep for the strongest vibration effect.", "Place your device speaker-side down on a soft cloth to help gravity assist the water removal process.", "Run multiple cycles if water persists — sometimes a second or third pass clears remaining moisture.", "After ejecting water, use our Speaker Test to verify your speakers still sound clear and undistorted.", "If your microphone sounds muffled after water exposure, try our Microphone Test to check for issues.", "Prevent future water damage by checking ambient noise levels with our Noise Level Meter in wet environments.", "For devices exposed to salt water, rinse with fresh water first, then use this tool to remove remaining liquid.", "If speaker audio remains distorted after multiple ejection attempts, try our Hearing Test to rule out device damage."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our (Speaker Test)/g, '<a href="/tools/device/speaker-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Microphone Test)/g, '<a href="/tools/device/microphone-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Noise Level Meter)/g, '<a href="/tools/device/noise-level-meter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Hearing Test)/g, '<a href="/tools/device/hearing-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
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
