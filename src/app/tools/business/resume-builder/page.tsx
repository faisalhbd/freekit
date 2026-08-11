import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ResumeBuilderTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ResumeBuilderPage() {
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

        {/* 3. Tool Interface */}
        <section className="mt-8" aria-label="Resume Builder">
          <ResumeBuilderTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Resume Builder</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Fill in your personal information</span> — Enter your full name, job title, email, phone, location, and LinkedIn URL. This appears at the top of your resume.
            </li>
            <li>
              <span className="text-foreground font-medium">Write a professional summary</span> — Add 2–4 sentences highlighting your experience level, key skills, and what value you bring to employers.
            </li>
            <li>
              <span className="text-foreground font-medium">Add work experience</span> — Click "Add Experience" to create entries. Fill in company, position, dates (use "Present" for current roles), and a description of your responsibilities and achievements.
            </li>
            <li>
              <span className="text-foreground font-medium">Add education</span> — Click "Add Education" to list your degrees, institutions, fields of study, and attendance years.
            </li>
            <li>
              <span className="text-foreground font-medium">Add skills</span> — Type each skill and click Add (or press Enter). Skills appear as tags in both the editor and the live preview.
            </li>
            <li>
              <span className="text-foreground font-medium">Preview and print</span> — The live preview on the right updates in real time. Click "Print Resume" to open your browser's print dialog and save as PDF, or click "Download .txt" for a plain text version.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Five-tab editor: Personal Info, Summary, Experience, Education, Skills",
              "Real-time live preview that updates as you type",
              "Add unlimited work experience and education entries",
              "'Present' toggle for current positions",
              "Skill tags with one-click add and remove",
              "Print-optimized output — editor controls hidden during print",
              "Download as plain text file for easy copying",
              "100% client-side — no data leaves your browser",
              "No sign-up, no account, no watermarks",
              "Responsive design works on desktop, tablet, and phone",
              "Clean, professional resume layout with proper typography",
              "Contact info displayed in a single line for a polished look",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Benefits */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Benefits">
          <h2 className="text-2xl font-bold tracking-tight">Why Use Our Resume Builder</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "No Cost, No Strings",
                d: "Unlike paid resume builders that lock your finished resume behind a paywall, FreeKit lets you create, preview, and print unlimited resumes for free. No trial period, no subscription, no hidden fees.",
              },
              {
                t: "Complete Privacy",
                d: "Your resume data never leaves your browser. Nothing is uploaded to any server, stored in any database, or shared with any third party. Close the tab and your data is gone — simple and secure.",
              },
              {
                t: "Instant Results",
                d: "There is no sign-up flow, no template selection, and no waiting. Open the tool, fill in your details, and your resume is ready to print or download in seconds.",
              },
              {
                t: "Professional Layout",
                d: "The live preview uses a clean, ATS-friendly resume layout with clear section headings, consistent typography, and proper spacing that hiring managers and applicant tracking systems can easily read.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Resume Writing Tips */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Resume Writing Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Start with a strong professional summary — 2–4 sentences that capture your value proposition, not a generic objective statement.",
              "Use action verbs to begin each bullet point: Led, Built, Designed, Implemented, Increased, Managed, Streamlined.",
              "Quantify your achievements wherever possible — 'Increased sales by 35%' is much stronger than 'Improved sales performance'.",
              "Tailor your resume for each job application by emphasizing the skills and experience most relevant to the role.",
              "Keep your resume to one page if you have fewer than 10 years of experience; two pages maximum otherwise.",
              "Use a clean, consistent format — the same font, bullet style, and date format throughout.",
              "List skills that are relevant to the job you are applying for, not every skill you have ever learned.",
              "Proofread carefully. A single typo can hurt your chances — use our text tools to review your content.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Common Use Cases */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Job Applications", d: "Create a tailored resume for each position you apply to. Use the live preview to ensure your content fits on one or two pages." },
              { t: "Career Changes", d: "Highlight transferable skills and relevant experience when pivoting to a new industry or role." },
              { t: "Recent Graduates", d: "Focus on education, internships, projects, and skills when you have limited work experience." },
              { t: "Senior Professionals", d: "Showcase extensive experience, leadership roles, and measurable accomplishments across multiple companies." },
              { t: "Freelancers", d: "Build a project-focused resume that highlights client work, deliverables, and domain expertise." },
              { t: "Quick Updates", d: "Need to add a new role or skill before an interview? Open the builder, make your changes, and print in under a minute." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16 print:hidden" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools + CTA */}
        <section className="mt-16 print:hidden" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>
        <div className="print:hidden">
          <ToolPageCTA />
        </div>
      </div>
    </>
  )
}
