import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PhotoCollageMakerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PhotoCollageMakerPage() {
  const schemas = getSchemas()
  return (
    <>
      {/* 1. JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 2. Tool Header */}
        <ToolHeader tool={toolConfig} />

        {/* 3. Tool Section */}
        <section className="mt-8" aria-label="Photo Collage Maker">
          <PhotoCollageMakerTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Photo Collage Maker</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your photos</span> — Click the upload area to select 2–6 photos from your device. You can select multiple files at once.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose a layout</span> — Browse the layout grid and click to select. Layouts automatically filter to match your photo count.
            </li>
            <li>
              <span className="text-foreground font-medium">Reorder if needed</span> — Use the up/down arrows on each photo thumbnail to change which photo goes in which slot.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize the style</span> — Adjust border width, border color, border radius, gap spacing, and background color to your preference.
            </li>
            <li>
              <span className="text-foreground font-medium">Preview and download</span> — See your collage update in real time, then click Download PNG to save it to your device.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "10 grid layouts for 2, 3, 4, and 6 photos",
              "Visual layout previews to see the grid structure before selecting",
              "Upload up to 6 photos at once with multi-file selection",
              "Move photos up and down to reorder them in the collage",
              "Remove individual photos without clearing the entire collage",
              "Adjustable border width from 0 to 20 pixels",
              "Full color picker for border color with hex input",
              "Adjustable border radius from 0 to 30 pixels for rounded corners",
              "Adjustable gap/spacing between photos from 0 to 20 pixels",
              "Background color picker to set the color behind the collage",
              "800×600 pixel canvas output in high-quality PNG format",
              "Automatic cover-fit cropping so photos fill their slots perfectly",
              "100% client-side processing — no uploads, no servers, no watermarks",
              "Real-time WYSIWYG canvas preview that updates instantly",
              "Responsive editor that works on desktop and mobile devices",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Benefits */}
        <section className="mt-16 space-y-4" aria-label="Benefits">
          <h2 className="text-2xl font-bold tracking-tight">Benefits of Using a Photo Collage Maker</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Tell a Visual Story",
                d: "Combine multiple photos into a single composition that tells a complete story. Collages are perfect for showing before-and-after comparisons, event highlights, product collections, or travel journeys in one shareable image.",
              },
              {
                t: "Professional-Looking Results",
                d: "With adjustable borders, spacing, and rounded corners, you can create collages that look like they were made by a professional designer. The clean grid layouts and customizable styling give your collages a polished, gallery-quality appearance.",
              },
              {
                t: "Complete Privacy",
                d: "Your photos never leave your device. All image processing happens locally in your browser using the Canvas API. No cloud uploads, no data collection, no servers — your personal photos stay completely private and secure.",
              },
              {
                t: "Fast and Free",
                d: "Create beautiful collages in seconds without any software installation, account creation, or payment. The real-time preview means you see changes instantly as you adjust settings, so you can experiment freely until it looks perfect.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Social Media Posts", d: "Create eye-catching collage posts for Instagram, Facebook, and Twitter that combine multiple angles, moments, or products into a single scroll-stopping image." },
              { t: "Event Recaps", d: "Compile the best moments from weddings, parties, conferences, or vacations into a single shareable collage that captures the full experience." },
              { t: "Before and After", d: "Show transformations clearly with side-by-side comparisons for fitness progress, home renovations, design projects, or makeover results." },
              { t: "Product Showcases", d: "Display multiple product angles, color variations, or features in a single image for e-commerce listings, catalogs, or marketing materials." },
              { t: "Mood Boards", d: "Assemble visual inspiration boards with color palettes, textures, reference images, and design elements for creative projects." },
              { t: "Team or Group Photos", d: "Combine individual portraits, team photos, and candid shots into a group collage for office displays, yearbooks, or team pages." },
              { t: "Recipe or Tutorial Steps", d: "Show multiple steps of a recipe, DIY project, or tutorial in a single visual guide that's easy to follow at a glance." },
              { t: "Travel Albums", d: "Create compact travel summary collages that showcase the best sights, food, and experiences from your trip in one shareable image." },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-lg border border-border bg-card p-4"
              >
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Photo Collage Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use photos with similar lighting and color tones for a cohesive, professional-looking collage that feels unified rather than disjointed.",
              "Keep your collage to a consistent theme — mixing too many different subjects or styles can make the final result feel cluttered and unfocused.",
              "Use high-resolution source images so each photo looks crisp when rendered in the collage. Low-res photos will appear blurry when enlarged.",
              "Consider the layout before uploading. Asymmetric layouts (like 1 large + 2 small) work great for highlighting a hero image alongside supporting shots.",
              "Add a small gap (4–8px) between photos for a clean, modern look. Zero gap can make photos blend together in an unintended way.",
              "White borders give a classic, Polaroid-style look. Match the border color to your brand or theme for a more customized appearance.",
              "Use rounded corners (8–16px) for a friendly, approachable feel, or sharp corners (0px) for a more editorial, magazine-style appearance.",
              "When showing a sequence or story, upload photos in chronological order and use the reorder buttons to fine-tune the arrangement.",
              "For social media, aim for a balanced composition. Place your strongest or most eye-catching photo in the largest slot of asymmetric layouts.",
              "Choose a background color that complements your photos. Dark backgrounds make bright photos pop, while light backgrounds create a clean, airy feel.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools + CTA */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>
        <ToolPageCTA />
      </div>
    </>
  )
}
