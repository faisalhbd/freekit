import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { LinkInBioGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function LinkInBioGeneratorPage() {
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
        <section className="mt-8" aria-label="Link in Bio Generator">
          <LinkInBioGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Link in Bio Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Set up your profile</span> — Enter your name and a short bio or tagline. Optionally upload a profile image that will appear as a circular avatar.
            </li>
            <li>
              <span className="text-foreground font-medium">Add your links</span> — Switch to the Links tab and add all the URLs you want to share. Give each link a clear title so visitors know where it leads.
            </li>
            <li>
              <span className="text-foreground font-medium">Reorder links</span> — Use the up and down arrows to arrange your links in order of importance. Put your most-clicked or highest-priority links at the top.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize the style</span> — Switch to the Style tab to pick a theme color, button shape (rounded, pill, or sharp), and background style (solid or gradient).
            </li>
            <li>
              <span className="text-foreground font-medium">Preview your page</span> — Check the phone preview on the right to see exactly how your bio page will look on mobile devices.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy and publish</span> — Click Copy HTML, save the code as an index.html file, and host it on any static hosting platform like Netlify, Vercel, or GitHub Pages.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Live phone-frame preview that updates in real time as you edit",
              "Add unlimited links with title and URL for each",
              "Reorder links with simple up/down arrow buttons",
              "Remove individual links while keeping at least one",
              "Profile image upload with circular avatar display",
              "Initials fallback avatar when no image is provided",
              "8 preset theme colors plus full color picker with hex input",
              "3 button styles: Rounded, Pill, and Sharp corners",
              "2 background styles: Solid color and Gradient",
              "Complete standalone HTML file — no dependencies required",
              "Mobile-first responsive design for all screen sizes",
              "One-click HTML copy with clipboard feedback",
              "100% client-side — no data leaves your browser",
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
          <h2 className="text-2xl font-bold tracking-tight">Benefits of a Link-in-Bio Page</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "One Link, Unlimited Destinations",
                d: "Social platforms limit you to one bio link. A link-in-bio page breaks that constraint by giving you a single URL that opens a hub of all your important links — your website, store, social profiles, and more.",
              },
              {
                t: "Full Ownership and Control",
                d: "Unlike hosted link-in-bio services, you own the generated HTML and can host it anywhere. No platform lock-in, no subscription fees, no branding limitations. Your page, your rules.",
              },
              {
                t: "Professional Branding",
                d: "Custom theme colors, button styles, and your own profile image create a cohesive brand experience that builds trust and recognition. Your bio page becomes an extension of your personal or business brand.",
              },
              {
                t: "Works Everywhere",
                d: "The generated HTML is a single static file that works on any hosting platform, any browser, and any device. No JavaScript frameworks to deploy, no build steps, no server requirements.",
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
              { t: "Instagram Creators", d: "Share your website, YouTube channel, merch store, and other social profiles from your single Instagram bio link. Drive followers to your most important destinations." },
              { t: "TikTok Influencers", d: "Direct your TikTok audience to brand deals, affiliate products, your other social platforms, and any content you want to promote beyond the TikTok ecosystem." },
              { t: "Small Businesses", d: "Create a mobile-friendly hub for your online store, Google Maps listing, phone number, email, and social media profiles — all accessible from one link in your business bio." },
              { t: "Freelancers", d: "Link to your portfolio, booking calendar, testimonials, LinkedIn profile, and contact form. Give potential clients every path to hire you from a single tap." },
              { t: "Musicians and Artists", d: "Point fans to your music on Spotify and Apple Music, merch store, upcoming events, and Patreon or Ko-fi for support — all from one link." },
              { t: "Podcasters", d: "Share links to listen on Apple Podcasts, Spotify, and YouTube. Add your website, newsletter signup, and sponsor links for a complete listener hub." },
              { t: "Event Organizers", d: "Link to ticket sales, event schedule, speaker bios, venue map, and social media accounts for seamless event promotion across all platforms." },
              { t: "Educators and Coaches", d: "Direct students to your course platform, free resources, booking page, YouTube channel, and email newsletter from a clean, branded bio page." },
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
          <h2 className="text-2xl font-bold tracking-tight">Link-in-Bio Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Keep your link count between 5 and 10 — too many links overwhelm visitors and reduce click-through rates on each individual link.",
              "Put your most important link first — the top position gets the most clicks, so place your highest-priority destination there.",
              "Use clear, action-oriented link titles like 'Shop Now', 'Watch Video', or 'Book a Call' instead of generic labels.",
              "Choose a theme color that matches your brand for consistency across your social profiles and bio page.",
              "Use a high-quality, well-lit photo for your profile image — blurry or low-res images reduce trust and professionalism.",
              "Test your published bio page on both iOS and Android devices before sharing it — check that links work and the layout looks correct.",
              "Update your bio page regularly to keep it relevant — remove expired links and add new ones to reflect your current priorities.",
              "Add UTM parameters to your links using our UTM Builder to track which bio links drive the most traffic and conversions.",
              "Keep your bio or tagline short and compelling — one sentence that tells visitors who you are and what you offer.",
              "Use a custom domain like links.yourname.com for a more professional appearance than a generic hosting platform URL.",
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
