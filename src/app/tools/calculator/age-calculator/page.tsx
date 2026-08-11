import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { AgeCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function AgeCalculatorPage() {
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
        <section className="mt-8" aria-label="Age Calculator Tool">
          <AgeCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Calculate Your Age Online</h2>
          <p className="text-muted-foreground">
            Finding your exact age is quick and simple:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter your date of birth</span> — Use the date picker to select your birthday or type it directly in the format YYYY-MM-DD.
            </li>
            <li>
              <span className="text-foreground font-medium">Optionally set a target date</span> — By default the calculator uses today&apos;s date, but you can pick any date in the past to see how old you were at that point.
            </li>
            <li>
              <span className="text-foreground font-medium">Click &ldquo;Calculate Age&rdquo;</span> — Instantly see your age in years, months, days, weeks, hours, minutes, and seconds, along with your zodiac sign and birthday countdown.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Precise age breakdown: years, months, and days using calendar-aware logic",
              "Total age in months, weeks, days, hours, minutes, and seconds",
              "Live-updating seconds counter for real-time age tracking",
              "Next birthday countdown with days and hours remaining",
              "Zodiac sign detection with astrological symbol and element",
              "Day of the week you were born",
              "Support for custom target dates, not just today",
              "Correctly handles leap years and February 29 birthdays",
              "Birthday celebration banner when your birthday is today",
              "100% browser-based — no data sent to any server",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Understanding Age Calculation */}
        <section className="mt-16 space-y-4" aria-label="Understanding age calculation">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Age Calculation</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Calendar vs. Total Age</h3>
              <p className="text-sm text-muted-foreground">
                Calendar age (e.g., 25 years, 3 months, 12 days) counts full calendar months and years.
                Total age in days simply counts every day between the two dates. These can differ because
                months have varying lengths — a &ldquo;month&rdquo; is not a fixed unit of time.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Leap Year Handling</h3>
              <p className="text-sm text-muted-foreground">
                A leap year occurs every 4 years (except century years not divisible by 400). The
                calculator correctly handles February 29 birthdays: on non-leap years, the next birthday
                is calculated based on March 1 or February 28, ensuring accurate countdowns.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Zodiac Signs Explained</h3>
              <p className="text-sm text-muted-foreground">
                Western astrology divides the year into 12 zodiac signs, each spanning roughly one month.
                Your sign depends on your birth month and day — for example, Aries runs from March 21 to
                April 19. Each sign belongs to one of four elements: Fire, Earth, Air, or Water.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Why Precision Matters</h3>
              <p className="text-sm text-muted-foreground">
                Simply subtracting birth year from the current year gives an approximate age, but it ignores
                whether your birthday has occurred this year. Our calculator checks the exact month and day
                to give you the correct age down to the day — essential for legal, medical, or official use.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Personal Curiosity", desc: "Find out exactly how many days, hours, or seconds you have lived." },
              { title: "Document Forms", desc: "Determine your exact age for visa applications, insurance forms, or government documents." },
              { title: "School Enrollment", desc: "Check if a child meets the minimum or maximum age requirement for school admission." },
              { title: "Retirement Planning", desc: "Calculate years and months until you reach retirement age." },
              { title: "Birthday Planning", desc: "Find the exact countdown in days and hours until your next birthday celebration." },
              { title: "Medical Records", desc: "Provide precise age in days, weeks, or months for pediatric or geriatric assessments." },
              { title: "Legal Age Verification", desc: "Determine if someone has reached a specific legal age (driving, voting, drinking, etc.)." },
              { title: "Anniversary Tracking", desc: "Calculate exactly how long you have been married, employed, or in a relationship." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using the Age Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Leave the 'Calculate to' field empty to always see your age relative to today.",
              "Use the custom target date to find your age on a specific past or future date.",
              "The seconds counter updates in real-time — watch your age grow by one second every second!",
              "For legal documents, the calendar age (years, months, days) is the standard format.",
              "Need the number of days between two arbitrary dates? Try our <a href=\"/tools/calculator/days-between-dates\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Days Between Dates Calculator</a>.",
              "Wondering about percentage-based calculations? Use our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> for all percentage needs.",
              "Working with people in different time zones? Our <a href=\"/tools/calculator/time-zone-converter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Time Zone Converter</a> can help.",
              "Checking your health metrics alongside your age? Our <a href=\"/tools/calculator/bmi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">BMI Calculator</a> complements age-based health assessments.",
              "Your zodiac sign is determined by the Western astrological calendar, which may differ from Chinese or Vedic zodiac systems.",
              "All calculations use your browser's local time zone. For different time zones, adjust your device settings or the target date.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Age in Different Cultures */}
        <section className="mt-16 space-y-4" aria-label="Age in different cultures">
          <h2 className="text-2xl font-bold tracking-tight">Age Across Different Cultures</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Western (Gregorian) Age</h3>
              <p className="text-sm text-muted-foreground">
                The most common system worldwide — your age increases by one each year on your birthday.
                This is the method used by our calculator and by most countries for legal purposes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">East Asian (Korean) Age</h3>
              <p className="text-sm text-muted-foreground">
                In the traditional Korean age system, you are considered 1 year old at birth and gain a
                year every January 1st (not on your birthday). South Korea officially adopted the
                international age system in 2023, but the traditional system is still used socially.
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
