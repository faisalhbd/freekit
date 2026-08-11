import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { DeadPixelTestTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function DeadPixelTestPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Dead pixel test"><DeadPixelTestTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use Dead Pixel Test</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Click Start Fullscreen Test</span> — The screen will turn red in fullscreen mode.</li>
            <li><span className="text-foreground font-medium">Inspect the screen carefully</span> — Look for any tiny dots that don't match the background color.</li>
            <li><span className="text-foreground font-medium">Cycle through all colors</span> — Click or press Space to go through red, green, blue, white, and black.</li>
            <li><span className="text-foreground font-medium">Check black screen closely</span> — Stuck pixels are most visible on the black background as bright dots.</li>
            <li><span className="text-foreground font-medium">Press ESC to exit</span> — Return to the tool interface when done.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["5 test colors: Red, Green, Blue, White, Black", "True fullscreen display for accurate inspection", "Click or keyboard navigation (Space/Enter)", "ESC to quickly exit fullscreen", "Visual color preview grid before testing", "Explanations for dead vs stuck pixels", "Works on all screen types and sizes", "No installation or downloads required"].map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>))}
          </ul>
        </section>
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Dead Pixel Test</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Use fullscreen mode (F11) to test every pixel on your screen without browser chrome interference.","Cycle through all colors slowly — some stuck pixels only show on specific color backgrounds.","Press Spacebar to cycle colors hands-free while you inspect the screen closely.","If you find dead pixels, also run our Touch Screen Test to check for any corresponding touch issues.","Verify your webcam feed is not affected by screen defects using our Webcam Test.","After hardware checks, confirm your audio output is clean with our Speaker Test.","New displays may have a few dead pixels — check your manufacturer warranty policy for replacement thresholds."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Touch Screen Test/g, '<a href="/tools/device/touch-screen-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Touch Screen Test</a>')
                    .replace(/our Webcam Test/g, '<a href="/tools/device/webcam-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Webcam Test</a>')
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
