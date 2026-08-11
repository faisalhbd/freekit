import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { UnitConverterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function UnitConverterPage() {
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
        <section className="mt-8" aria-label="Unit Converter Tool">
          <UnitConverterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Unit Converter</h2>
          <p className="text-muted-foreground">
            Converting between units is quick and easy. Follow these steps to get accurate results in seconds:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose a category</span> &mdash; Select from Length, Weight/Mass, Temperature, Volume, Area, Speed, or Data Storage using the tabs at the top.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter a value</span> &mdash; Type the number you want to convert in the &ldquo;Value&rdquo; input field. The result updates instantly as you type.
            </li>
            <li>
              <span className="text-foreground font-medium">Select units</span> &mdash; Pick the source unit in the &ldquo;From&rdquo; dropdown and the target unit in the &ldquo;To&rdquo; dropdown.
            </li>
            <li>
              <span className="text-foreground font-medium">Read the result</span> &mdash; The converted value appears in the result field below, along with a conversion details line showing the full equation.
            </li>
            <li>
              <span className="text-foreground font-medium">Swap units</span> &mdash; Click the &ldquo;Swap Units&rdquo; button to instantly reverse the conversion direction, including swapping the input and result values.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Seven unit categories: Length, Weight, Temperature, Volume, Area, Speed, and Data Storage",
              "Six to nine units per category covering both metric and imperial systems",
              "Real-time conversion &mdash; results update instantly as you type, no submit button needed",
              "Special temperature formulas with proper offset handling (not simple ratios)",
              "One-click swap button to reverse from/to units and carry over the result",
              "Quick reference table showing common conversions for each category",
              "Conversion details display showing the full from = to equation",
              "Supports very large and very small numbers with scientific notation",
              "100% browser-based &mdash; no server, no data collection, no API calls",
              "Fully responsive design for mobile, tablet, and desktop screens",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Conversion Categories Explained */}
        <section className="mt-16 space-y-4" aria-label="Conversion categories">
          <h2 className="text-2xl font-bold tracking-tight">Conversion Categories Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Length",
                desc: "Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles. Essential for construction, travel, and everyday measurements.",
              },
              {
                title: "Weight / Mass",
                desc: "Convert between milligrams, grams, kilograms, ounces, pounds, stones, and tons. Useful for cooking, shipping, fitness, and science.",
              },
              {
                title: "Temperature",
                desc: "Convert between Celsius, Fahrenheit, Kelvin, and Rankine. Uses special formulas since temperature scales have different zero points.",
              },
              {
                title: "Volume",
                desc: "Convert between milliliters, liters, gallons, quarts, pints, cups, fluid ounces, and tablespoons. Perfect for cooking and baking.",
              },
              {
                title: "Area",
                desc: "Convert between square millimeters, meters, kilometers, inches, feet, yards, acres, and hectares. Used in real estate and land measurement.",
              },
              {
                title: "Speed",
                desc: "Convert between meters per second, km/h, mph, knots, feet per second, and Mach. Common in travel, aviation, and physics.",
              },
              {
                title: "Data Storage",
                desc: "Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, and petabytes. Both decimal (SI) and binary (KiB/MiB) prefixes supported.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Travel Planning", desc: "Convert miles to kilometers or vice versa to understand distances in different countries. Check speed limits between mph and km/h." },
              { title: "Cooking & Baking", desc: "Convert between cups, tablespoons, fluid ounces, and milliliters when following international recipes. Switch between Fahrenheit and Celsius for oven temperatures." },
              { title: "Fitness Tracking", desc: "Convert body weight between pounds and kilograms. Track running distance in miles or kilometers. Convert pace between min/mile and min/km." },
              { title: "Construction & DIY", desc: "Convert between feet, inches, and meters for building materials. Calculate area in square feet or square meters for flooring and paint coverage." },
              { title: "Science & Engineering", desc: "Use SI unit conversions for physics and chemistry calculations. Convert temperature between Celsius, Kelvin, and Rankine for thermodynamics." },
              { title: "Digital Storage", desc: "Understand file sizes by converting between MB, GB, and TB. Check internet speeds by converting between Mbps and MB/s." },
              { title: "Real Estate", desc: "Convert property sizes between square feet, square meters, acres, and hectares. Compare listings across countries using different measurement systems." },
              { title: "Shipping & Logistics", desc: "Convert package weights between ounces, pounds, and kilograms. Calculate dimensions in inches or centimeters for international shipping labels." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips for Unit Conversion */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Unit Conversion</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "A helpful mental shortcut: 1 inch is approximately 2.5 cm, and 1 mile is approximately 1.6 km.",
              "For temperature, remember that \u221240\u00b0 is the same in both Celsius and Fahrenheit \u2014 it is the only point where the two scales intersect.",
              "When converting area, remember you must square the linear conversion factor. For example, 1 m \u2248 3.28 ft, so 1 m\u00b2 \u2248 10.76 ft\u00b2.",
              "Data storage labels on hard drives use decimal (1 GB = 1 billion bytes) while operating systems often display binary (1 GiB = 1.07 billion bytes). This explains why a 500 GB drive shows as ~465 GB in your computer.",
              "Need to calculate percentages alongside unit conversions? Try our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> for all common percentage math.",
              "Working with colors and need to convert between HEX, RGB, and HSL formats? Use our <a href=\"/tools/css/color-converter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Color Converter</a> for instant color code translations.",
              "Tracking your health metrics? Our <a href=\"/tools/calculator/bmi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">BMI Calculator</a> accepts weight in both pounds and kilograms.",
              "Scheduling meetings across time zones? Our <a href=\"/tools/calculator/time-zone-converter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Time Zone Converter</a> helps you find the perfect time for everyone.",
              "The metric system is based on powers of 10, making it easy to convert by simply moving the decimal point. Kilo- (1,000), centi- (0.01), and milli- (0.001) are the most common prefixes.",
              "For quick weight conversion, remember: 1 kg \u2248 2.2 lb. So a 70 kg person weighs about 154 lb.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Metric vs Imperial Systems */}
        <section className="mt-16 space-y-4" aria-label="Metric vs Imperial">
          <h2 className="text-2xl font-bold tracking-tight">Metric vs Imperial Systems</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Metric System (SI)</h3>
              <p className="text-sm text-muted-foreground">
                The metric system is used by nearly every country in the world and is the standard in science,
                medicine, and international trade. It is based on powers of 10, with base units like meters
                (length), kilograms (mass), liters (volume), and degrees Celsius (temperature). Converting within
                the metric system simply requires moving the decimal point.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Imperial / US Customary System</h3>
              <p className="text-sm text-muted-foreground">
                The imperial system is primarily used in the United States, with some usage in the UK and Canada.
                Units include inches, feet, yards, miles (length), ounces, pounds (weight), gallons, quarts (volume),
                and degrees Fahrenheit (temperature). Conversions between units often involve non-round numbers,
                such as 1 foot = 12 inches or 1 mile = 5,280 feet.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">When to Use Each System</h3>
              <p className="text-sm text-muted-foreground">
                Use metric for scientific work, international travel, and anything requiring precision. Use imperial
                for everyday US measurements like driving distances, body weight, and recipes. Our converter bridges
                both systems seamlessly, so you never have to worry about which one to use.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">A Brief History</h3>
              <p className="text-sm text-muted-foreground">
                The metric system originated in France during the 1790s revolution and was designed to be universal
                and easy to use. The imperial system evolved from ancient Roman and Anglo-Saxon units over centuries.
                Today, only three countries (the US, Liberia, and Myanmar) have not fully adopted the metric system.
              </p>
            </div>
          </div>
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
