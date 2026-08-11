import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { MicrophoneTestTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function MicrophoneTestPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Microphone test tool"><MicrophoneTestTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use Microphone Test</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Click Start Test</span> — Grant microphone permission when prompted by your browser.</li>
            <li><span className="text-foreground font-medium">Check the volume meter</span> — Speak or tap near your mic to see the level bar respond in real time.</li>
            <li><span className="text-foreground font-medium">Verify device name</span> — Confirm the detected microphone name matches your intended device.</li>
            <li><span className="text-foreground font-medium">Record a clip</span> — Click 'Record 5s' to capture a short audio sample from your mic.</li>
            <li><span className="text-foreground font-medium">Play it back</span> — Listen to the recording to verify audio quality and clarity.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Real-time volume level meter with color coding", "Microphone device name auto-detection", "5-second clip recording with playback", "getUserMedia API for direct hardware access", "AnalyserNode for accurate volume measurement", "No audio data sent to any server", "Works on desktop and mobile devices", "Clean start/stop/reset controls"].map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>))}
          </ul>
        </section>
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Microphone Test</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Allow microphone permissions in your browser when prompted — the tool cannot access audio without permission.","Speak at your normal volume level to get an accurate reading of your microphone sensitivity.","Check your audio input device in system settings to make sure the correct microphone is selected.","If your mic picks up too much background noise, measure ambient levels with our Noise Level Meter.","After testing your mic, verify your speakers work properly with our Speaker Test.","For content creators, pair this test with our Hearing Test to ensure your audience gets quality audio.","Close other apps that might be using the microphone to avoid conflicts during testing."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Noise Level Meter/g, '<a href="/tools/device/noise-level-meter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Noise Level Meter</a>')
                    .replace(/our Speaker Test/g, '<a href="/tools/device/speaker-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Speaker Test</a>')
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
