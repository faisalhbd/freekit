import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { WebcamTestTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function WebcamTestPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Webcam test tool"><WebcamTestTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use Webcam Test</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Click Start Camera</span> — Grant camera permission when your browser prompts you.</li>
            <li><span className="text-foreground font-medium">Check the preview</span> — Verify the video feed appears and looks correct.</li>
            <li><span className="text-foreground font-medium">Review specs</span> — Check the resolution and FPS displayed below the video.</li>
            <li><span className="text-foreground font-medium">Toggle mirror mode</span> — Switch between mirrored and normal orientation.</li>
            <li><span className="text-foreground font-medium">Take a screenshot</span> — Capture the current frame as a PNG image.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Live video preview with responsive layout", "Resolution and frame rate display", "Mirror/normal view toggle", "One-click PNG screenshot download", "Camera device name detection", "getUserMedia API — no server uploads", "Works on desktop and mobile devices", "Real-time FPS counter"].map((f) => (<li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>))}
          </ul>
        </section>
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Webcam Test</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Grant camera permission when your browser prompts you — the tool needs access to display your webcam feed.","Check your lighting conditions before testing — good lighting helps you spot focus and color issues.","If your webcam appears dark, try adjusting your room lighting or the camera exposure in device settings.","Use our Mirror Online tool for a fullscreen mirror experience after confirming your webcam works.","Test your display quality alongside your camera with our Dead Pixel Test.","For a complete device check, combine this with our Touch Screen Test on touchscreen devices.","If your webcam feed is blurry, clean the lens with a microfiber cloth and retest."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Mirror Online/g, '<a href="/tools/device/mirror-online" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Mirror Online</a>')
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
