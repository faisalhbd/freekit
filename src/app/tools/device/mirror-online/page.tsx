import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { MirrorOnlineTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function MirrorOnlinePage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Online mirror"><MirrorOnlineTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use Mirror Online</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Click Open Mirror</span> — Grant camera permission when your browser prompts you.</li>
            <li><span className="text-foreground font-medium">Use the mirror</span> — The video is automatically mirrored for a natural reflection view.</li>
            <li><span className="text-foreground font-medium">Go fullscreen</span> — Click the fullscreen button for a distraction-free full-screen mirror.</li>
            <li><span className="text-foreground font-medium">Exit when done</span> — Press ESC to exit fullscreen or click Close Mirror.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Clean, distraction-free mirror view", "CSS scaleX(-1) for natural mirror reflection", "Fullscreen mode for true mirror experience", "Instant activation with one click", "No video recording or data storage", "Works on phones, tablets, and desktops", "Minimal UI with hover-only controls", "No installation required"].map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>))}
          </ul>
        </section>
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Mirror Online</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Click the fullscreen button for a true mirror experience without any UI distractions.","Use good lighting in front of you for the clearest mirror reflection on your webcam.","If the mirror appears flipped, that is intentional — it mimics a real mirror for natural self-viewing.","Before using the mirror, confirm your webcam works with our Webcam Test tool.","Check your screen for defects that might distort the mirror view with our Dead Pixel Test.","For presentations, use our Touch Screen Test to verify your interactive display works correctly.","This tool works great as a quick self-check before video calls or meetings."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Webcam Test/g, '<a href="/tools/device/webcam-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Webcam Test</a>')
                    .replace(/our Dead Pixel Test/g, '<a href="/tools/device/dead-pixel-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Dead Pixel Test</a>')
                    .replace(/our Touch Screen Test/g, '<a href="/tools/device/touch-screen-test" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Touch Screen Test</a>')
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
