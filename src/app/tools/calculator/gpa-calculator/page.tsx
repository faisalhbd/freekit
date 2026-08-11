import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { GPACalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function GPACalculatorPage() {
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
        <section className="mt-8" aria-label="GPA Calculator Tool">
          <GPACalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the GPA Calculator</h2>
          <p className="text-muted-foreground">
            Calculating your GPA is straightforward with our tool. Follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Select your GPA scale</span> — Choose between the 4.0 scale (most common in the US) or the 4.3 scale (used by some Canadian and select US institutions).
            </li>
            <li>
              <span className="text-foreground font-medium">Enter your courses</span> — Add course names, select your letter grade from the dropdown, and enter the credit hours for each course.
            </li>
            <li>
              <span className="text-foreground font-medium">Add more courses</span> — Click the "Add Course" button to include additional courses. Remove any you don't need with the trash icon.
            </li>
            <li>
              <span className="text-foreground font-medium">View your results</span> — Your GPA, letter grade equivalent, classification (e.g., Dean's List, Cum Laude), and total quality points are calculated in real time as you enter data.
            </li>
          </ol>
        </section>

        {/* 4. GPA Formula Explained */}
        <section className="mt-16 space-y-4" aria-label="GPA formula">
          <h2 className="text-2xl font-bold tracking-tight">How GPA Is Calculated</h2>
          <p className="text-muted-foreground">
            GPA is calculated by dividing total quality points by total credit hours. Here's the formula and an example:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">GPA Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">GPA = Total Quality Points / Total Credit Hours</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Quality points for each course = Grade Points &times; Credit Hours.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Quality Points Example</h3>
              <p className="text-sm text-muted-foreground">
                If you earn an A (4.0) in a 3-credit course: 4.0 &times; 3 = 12.0 quality points.
                A B+ (3.3) in a 4-credit course: 3.3 &times; 4 = 13.2 quality points.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Final GPA Calculation</h3>
              <p className="text-sm text-muted-foreground">
                Total quality points = 12.0 + 13.2 = 25.2. Total credits = 3 + 4 = 7.
                GPA = 25.2 / 7 = 3.60.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Supports both 4.0 and 4.3 GPA scales for different institutions",
              "Real-time GPA calculation — results update instantly as you type",
              "Visual GPA gauge with color-coded performance indicator",
              "GPA classification: Summa Cum Laude, Magna Cum Laude, Cum Laude, and more",
              "Dynamic course list — add and remove courses as needed",
              "Letter grade equivalent displayed alongside numeric GPA",
              "Total quality points and credit hours breakdown",
              "Responsive design with mobile-optimized stacked layout",
              "100% browser-based — no server, no data collection",
              "Grade point values shown next to each grade in the dropdown",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. GPA Scale Comparison */}
        <section className="mt-16 space-y-4" aria-label="GPA scale comparison">
          <h2 className="text-2xl font-bold tracking-tight">4.0 vs 4.3 GPA Scale</h2>
          <p className="text-muted-foreground">
            Understanding the difference between GPA scales helps you choose the right one for your institution.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <h3 className="font-semibold">4.0 Scale (Standard)</h3>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>A+</span><span className="font-mono">4.0</span></div>
                <div className="flex justify-between"><span>A</span><span className="font-mono">4.0</span></div>
                <div className="flex justify-between"><span>A-</span><span className="font-mono">3.7</span></div>
                <div className="flex justify-between"><span>B+</span><span className="font-mono">3.3</span></div>
                <div className="flex justify-between"><span>B</span><span className="font-mono">3.0</span></div>
                <div className="flex justify-between"><span>B-</span><span className="font-mono">2.7</span></div>
                <div className="flex justify-between"><span>C</span><span className="font-mono">2.0</span></div>
                <div className="flex justify-between"><span>D</span><span className="font-mono">1.0</span></div>
                <div className="flex justify-between"><span>F</span><span className="font-mono">0.0</span></div>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                Used by most US colleges and universities. A+ and A both equal 4.0.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <h3 className="font-semibold">4.3 Scale</h3>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>A+</span><span className="font-mono">4.3</span></div>
                <div className="flex justify-between"><span>A</span><span className="font-mono">4.0</span></div>
                <div className="flex justify-between"><span>A-</span><span className="font-mono">3.7</span></div>
                <div className="flex justify-between"><span>B+</span><span className="font-mono">3.3</span></div>
                <div className="flex justify-between"><span>B</span><span className="font-mono">3.0</span></div>
                <div className="flex justify-between"><span>B-</span><span className="font-mono">2.7</span></div>
                <div className="flex justify-between"><span>C</span><span className="font-mono">2.0</span></div>
                <div className="flex justify-between"><span>D</span><span className="font-mono">1.0</span></div>
                <div className="flex justify-between"><span>F</span><span className="font-mono">0.0</span></div>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                Used by some Canadian universities and select US schools. A+ is rewarded with 4.3.
              </p>
            </div>
          </div>
        </section>

        {/* 7. GPA Classification Guide */}
        <section className="mt-16 space-y-4" aria-label="GPA classification guide">
          <h2 className="text-2xl font-bold tracking-tight">Understanding GPA Classifications</h2>
          <p className="text-muted-foreground">
            Many universities recognize academic achievement through Latin honors and distinctions based on cumulative GPA.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Summa Cum Laude", gpa: "3.9+", desc: "Highest academic honor. Awarded to students with the most outstanding academic records. Typically the top 1–5% of the graduating class." },
              { title: "Magna Cum Laude", gpa: "3.7 – 3.89", desc: "Great honor. Recognizes exceptional academic achievement. Typically the top 5–10% of the graduating class." },
              { title: "Cum Laude", gpa: "3.5 – 3.69", desc: "With honor. Acknowledges sustained academic excellence throughout the degree program." },
              { title: "Dean's List", gpa: "3.25 – 3.49", desc: "Academic distinction for a single semester. Students on the Dean's List typically receive recognition from their college." },
              { title: "Good Standing", gpa: "3.0 – 3.24", desc: "Satisfactory academic progress. Meets the minimum requirements for most graduate school applications." },
              { title: "Academic Warning", gpa: "Below 2.0", desc: "Students below a 2.0 GPA may be placed on academic probation. This can affect financial aid eligibility and enrollment status." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{item.gpa}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Tips for Improving Your GPA */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Improving Your GPA</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Focus on courses with higher credit hours — a 4-credit course impacts your GPA more than a 1-credit lab.",
              "Retake courses where you earned a D or F if your school offers grade replacement.",
              "Balance your schedule: don't overload with difficult courses in a single semester.",
              "Use office hours and tutoring services early — don't wait until finals week.",
              "Need to calculate your grade percentages? Our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> can help track your scores.",
              "Consider withdrawing from a course before the deadline rather than earning a failing grade.",
              "Set target GPAs for each semester and track your progress using this calculator.",
              "Choose electives wisely — courses aligned with your strengths can boost your overall average.",
              "Taking a summer course can be a strategic way to improve your GPA with a lighter workload.",
              "All calculations are done locally in your browser. No data is sent to any server.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 9. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Semester GPA", desc: "Calculate your GPA for a single semester by entering only the courses from that term." },
              { title: "Cumulative GPA", desc: "Enter all courses from every semester to find your overall cumulative GPA across your academic career." },
              { title: "What-If Scenarios", desc: "Experiment with hypothetical grades to see what you need to achieve your target GPA next semester." },
              { title: "Graduate School Planning", desc: "Check whether your current GPA meets the requirements for your target graduate programs." },
              { title: "Scholarship Eligibility", desc: "Many scholarships require a minimum GPA. Use this calculator to verify you meet the threshold." },
              { title: "Transcript Verification", desc: "Double-check the GPA on your transcript by recalculating it from your individual course grades." },
              { title: "Study Abroad Conversion", desc: "Convert international grades to the US GPA scale to understand how your study abroad courses count." },
              { title: "Academic Probation Check", desc: "Monitor your GPA to ensure you stay above the minimum required to maintain good academic standing." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* Related Tools + CTA */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
