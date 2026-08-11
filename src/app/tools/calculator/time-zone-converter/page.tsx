import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TimeZoneConverterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TimeZoneConverterPage() {
  const schemas = getSchemas()

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 1. Breadcrumb + Hero */}
        <ToolHeader tool={toolConfig} />

        {/* 2. Tool Interface */}
        <section className="mt-8" aria-label="Time Zone Converter">
          <TimeZoneConverterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert Time Between Time Zones</h2>
          <p className="text-muted-foreground">
            Converting time between zones is simple and instant:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Select the &ldquo;From&rdquo; time zone</span> — Choose the source time zone from the dropdown (e.g., Eastern Time for New York).
            </li>
            <li>
              <span className="text-foreground font-medium">Select the &ldquo;To&rdquo; time zone</span> — Choose the target time zone (e.g., Japan Standard Time for Tokyo).
            </li>
            <li>
              <span className="text-foreground font-medium">Enter a date and time</span> — The inputs default to your current date and time. Adjust as needed or click &ldquo;Use Current Time.&rdquo;
            </li>
            <li>
              <span className="text-foreground font-medium">View the result</span> — The converted time appears instantly with the date, day of the week, and UTC offsets for both zones.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Supports 25+ major world time zones across 6 continents",
              "Automatic daylight saving time (DST) handling via the browser's Intl API",
              "Live-updating clocks showing current time in both selected zones",
              "UTC offset badges for instant reference (e.g., UTC-5, UTC+9)",
              "Quick Compare: add up to 4 extra zones and see all times at a glance",
              "Swap button to instantly reverse the from/to zones",
              "Date change detection when the conversion crosses midnight",
              "100% client-side — no data sent to any server",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Understanding Time Zones */}
        <section className="mt-16 space-y-4" aria-label="Understanding time zones">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Time Zones</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">UTC — The Universal Standard</h3>
              <p className="text-sm text-muted-foreground">
                UTC (Coordinated Universal Time) is the world's primary time standard. All other
                time zones are expressed as offsets from UTC — for example, EST is UTC-5 and JST
                is UTC+9. UTC never observes daylight saving time, making it ideal for international
                scheduling and technical applications.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Daylight Saving Time (DST)</h3>
              <p className="text-sm text-muted-foreground">
                Many regions advance their clocks by one hour during summer months. This means the
                UTC offset changes twice a year — for example, New York shifts from UTC-5 (EST) to
                UTC-4 (EDT). This converter handles DST automatically using your browser's built-in
                time zone database.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">IANA Time Zone Names</h3>
              <p className="text-sm text-muted-foreground">
                The Internet Assigned Numbers Authority (IANA) maintains a database of time zones
                using identifiers like &ldquo;America/New_York&rdquo; and &ldquo;Asia/Tokyo.&rdquo;
                These are more reliable than abbreviations because they encode the full geographic
                and historical rules for each zone, including DST transitions.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Time Zone Abbreviations</h3>
              <p className="text-sm text-muted-foreground">
                Abbreviations like EST, PST, and IST are convenient but can be ambiguous. For example,
                CST can mean Central Standard Time (US), China Standard Time, or Cuba Standard Time.
                This converter shows both the abbreviation and the full IANA name to avoid confusion.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Scheduling International Meetings", desc: "Find a time that works for participants in New York, London, and Tokyo by using the Quick Compare feature to view all zones simultaneously." },
              { title: "Booking Flights and Travel", desc: "Convert departure and arrival times to your home time zone to plan layovers, airport arrivals, and hotel check-ins." },
              { title: "Remote Team Coordination", desc: "Distributed teams can use the converter to find overlapping work hours and set fair rotating meeting schedules." },
              { title: "Webinar and Event Planning", desc: "Announce event times in multiple zones so attendees worldwide know exactly when to join." },
              { title: "Software Development", desc: "Convert timestamps and deadlines between server time (often UTC) and local time zones for debugging and deployment." },
              { title: "Financial Trading", desc: "Convert market open and close times (e.g., NYSE, LSE, TSE) to your local time to plan trading activities." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. World Time Zone Reference */}
        <section className="mt-16 space-y-4" aria-label="Time zone reference">
          <h2 className="text-2xl font-bold tracking-tight">Major World Time Zones</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left font-medium p-3">Zone</th>
                    <th className="text-left font-medium p-3">Region</th>
                    <th className="text-left font-medium p-3">UTC Offset</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { zone: "UTC", region: "Reference", offset: "UTC±0" },
                    { zone: "EST/EDT", region: "US East Coast", offset: "UTC-5 / UTC-4" },
                    { zone: "CST/CDT", region: "US Central", offset: "UTC-6 / UTC-5" },
                    { zone: "MST/MDT", region: "US Mountain", offset: "UTC-7 / UTC-6" },
                    { zone: "PST/PDT", region: "US West Coast", offset: "UTC-8 / UTC-7" },
                    { zone: "GMT/BST", region: "United Kingdom", offset: "UTC±0 / UTC+1" },
                    { zone: "CET/CEST", region: "Central Europe", offset: "UTC+1 / UTC+2" },
                    { zone: "IST", region: "India", offset: "UTC+5:30" },
                    { zone: "GST", region: "UAE / Gulf", offset: "UTC+4" },
                    { zone: "JST", region: "Japan", offset: "UTC+9" },
                    { zone: "AEST/AEDT", region: "Australia East", offset: "UTC+10 / UTC+11" },
                    { zone: "NZST/NZDT", region: "New Zealand", offset: "UTC+12 / UTC+13" },
                  ].map((row) => (
                    <tr key={row.zone} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-mono font-medium">{row.zone}</td>
                      <td className="p-3 text-muted-foreground">{row.region}</td>
                      <td className="p-3 font-mono text-muted-foreground">{row.offset}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 8. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Working Across Time Zones</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always communicate meeting times in at least two time zones to avoid confusion.",
              "Use the Quick Compare feature to find overlapping business hours across regions.",
              "For recurring meetings with global teams, consider rotating the schedule so the same region isn't always inconvenienced.",
              "When booking flights, always verify times in both the departure and arrival time zones.",
              "Store all times in UTC in databases and convert to local time only for display — this avoids ambiguity.",
              "Remember that some countries do not observe DST (e.g., India, Japan), so offsets stay constant year-round.",
              "Need to find the number of days between dates? Try our <a href=\"/tools/calculator/days-between-dates\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Days Between Dates Calculator</a>.",
              "Want to calculate your exact age? Use our <a href=\"/tools/calculator/age-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Age Calculator</a>.",
              "Need to convert between units of measurement? Try our <a href=\"/tools/calculator/unit-converter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Unit Converter</a>.",
              "Looking for percentage-based calculations? Our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> has you covered.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
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
