import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { DeviceMockupGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function DeviceMockupGeneratorPage() {
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
        <section className="mt-8" aria-label="Device Mockup Generator">
          <DeviceMockupGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Device Mockup Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your screenshot</span> — Click the Upload Image button and select any screenshot or design file from your device. The image will be loaded directly in your browser.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose a device frame</span> — Select from iPhone, Samsung Galaxy, iPad, Laptop, Desktop Monitor, or Browser Window. Each frame has realistic details and proportions.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize the appearance</span> — Pick a frame color (Black, White, Space Gray, or Rose Gold), toggle the screen shadow, and set your preferred background color or transparent background.
            </li>
            <li>
              <span className="text-foreground font-medium">Preview the mockup</span> — See your design wrapped in the device frame in real time. The preview updates instantly as you change settings.
            </li>
            <li>
              <span className="text-foreground font-medium">Download your mockup</span> — Click Download PNG to generate a high-resolution 2x mockup image. The file is ready for use in presentations, portfolios, and marketing materials.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Six device frames: iPhone, Samsung Galaxy, iPad, Laptop, Desktop Monitor, Browser Window",
              "Realistic device details: notches, camera dots, home indicators, keyboard bases, monitor stands",
              "Four frame colors: Black, White, Space Gray, Rose Gold",
              "Optional drop shadow behind the device for depth and realism",
              "Customizable background color with color picker and hex input",
              "Transparent background option for use in design tools",
              "Real-time HTML/CSS preview of the device mockup",
              "High-resolution Canvas API export at 2x scaling for crisp output",
              "Automatic cover-fit image scaling — no distortion, no manual cropping",
              "Browser window mockup with traffic light buttons and address bar",
              "Device specifications panel showing screen size and current settings",
              "100% client-side processing — images never leave your browser",
              "No watermarks, no sign-up, no download limits",
              "Fully responsive editor for desktop and mobile devices",
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
          <h2 className="text-2xl font-bold tracking-tight">Benefits of Using Device Mockups</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Professional Presentations",
                d: "Device mockups instantly elevate the perceived quality of your work. Presenting designs within realistic device frames shows clients and stakeholders exactly how the final product will look, building confidence and reducing revision cycles.",
              },
              {
                t: "Stronger Portfolio Pieces",
                d: "Design portfolios with device mockups stand out from those with plain screenshots. Mockups demonstrate attention to detail and professionalism, helping you attract better clients and opportunities.",
              },
              {
                t: "Better Marketing Materials",
                d: "App store listings, landing pages, and social media posts with device mockups generate higher engagement. Users can visualize themselves using your product, which increases conversion rates.",
              },
              {
                t: "Time and Cost Savings",
                d: "Traditional mockup creation requires photography, 3D modeling, or expensive stock photos. Our generator creates professional mockups in seconds, right in your browser, at no cost.",
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
              { t: "Design Portfolios", d: "Showcase your web and app designs in context. Device mockups make portfolio pieces look polished and help potential clients understand the scope of your work." },
              { t: "Client Presentations", d: "Present app and website designs to clients in a professional format. Device mockups help non-technical stakeholders visualize the final product." },
              { t: "App Store Listings", d: "Create compelling screenshots for Apple App Store and Google Play Store listings that show your app on real devices." },
              { t: "Landing Page Heroes", d: "Use device mockups as hero images on product landing pages to immediately communicate what your app or website does." },
              { t: "Social Media Marketing", d: "Create eye-catching social media posts showing your product on phones and laptops. Mockups are far more engaging than plain screenshots." },
              { t: "Pitch Decks", d: "Include device mockups in investor pitch decks to demonstrate your product's user interface and user experience in a tangible way." },
              { t: "Documentation", d: "Add device mockups to user documentation, API docs, and onboarding guides to show users exactly what they will see on screen." },
              { t: "Case Studies", d: "Enhance case study pages with device mockups that show before and after designs or the final product in context." },
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
          <h2 className="text-2xl font-bold tracking-tight">Device Mockup Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use high-resolution screenshots as input. The output quality is directly tied to the input resolution — aim for at least 2x the device's screen resolution.",
              "Match the device to your audience. If your product is a mobile app, show it on a phone mockup. If it is a SaaS platform, use a laptop or desktop mockup.",
              "Choose a frame color that complements your design. Dark frames work well with light designs and vice versa. Use white frames for a clean, minimal aesthetic.",
              "Use transparent backgrounds when compositing mockups into existing designs. This gives you full control over the background in your design tool.",
              "Show multiple devices for responsive designs. Display the same design on phone, tablet, and desktop mockups to demonstrate responsiveness.",
              "Keep the background simple when using solid colors. Neutral colors like light gray, white, or soft pastels keep the focus on the device and your design.",
              "Maintain consistent mockup styles across all materials. Using the same device frames and colors across your website, presentations, and social media builds brand coherence.",
              "For App Store screenshots, use the specific device frames that match the platforms — iPhone for iOS App Store and Samsung Galaxy for Google Play.",
              "Enable shadows when placing mockups on solid backgrounds for depth. Disable shadows when using transparent backgrounds or when compositing in tools with their own shadow effects.",
              "Take full-page screenshots for website mockups rather than viewport-only captures. Full-page screenshots better represent the complete user experience.",
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
