"use client"

import { useState, useCallback, useMemo } from "react"
import { Braces, Copy, Check, Plus, Code, Eye, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const SCHEMA_TYPES = [
  { value: "Article", label: "Article", fields: ["headline","description","image","authorName","authorUrl","publisherName","publisherLogo","datePublished","dateModified","url"] },
  { value: "FAQPage", label: "FAQ Page", fields: ["questions"] },
  { value: "Product", label: "Product", fields: ["name","description","image","url","brand","price","priceCurrency","availability","ratingValue","reviewCount"] },
  { value: "LocalBusiness", label: "Local Business", fields: ["name","description","image","url","telephone","streetAddress","addressLocality","addressRegion","postalCode","addressCountry","latitude","longitude","openingHours"] },
  { value: "Organization", label: "Organization", fields: ["name","url","logo","description","contactEmail","contactPhone","sameAs"] },
  { value: "BreadcrumbList", label: "Breadcrumb List", fields: ["items"] },
  { value: "HowTo", label: "How-To", fields: ["name","description","image","totalTime","step1Name","step1Text","step2Name","step2Text","step3Name","step3Text"] },
]

interface SchemaForm { [key: string]: string }

function buildSchema(type: string, form: SchemaForm): string {
  const clean = (v: string | undefined) => (v || "").trim()
  const num = (v: string | undefined) => { const n = parseFloat(v || ""); return isNaN(n) ? undefined : n }

  switch (type) {
    case "Article": return JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: clean(form.headline), description: clean(form.description), image: clean(form.image), author: form.authorName ? { "@type": "Person", name: clean(form.authorName), url: clean(form.authorUrl) || undefined } : undefined, publisher: form.publisherName ? { "@type": "Organization", name: clean(form.publisherName), logo: form.publisherLogo ? { "@type": "ImageObject", url: clean(form.publisherLogo) } : undefined } : undefined, datePublished: clean(form.datePublished) || undefined, dateModified: clean(form.dateModified) || undefined, url: clean(form.url) || undefined }, null, 2)
    case "FAQPage": {
      const qs = (form.questions || "").split("\n").filter((l) => l.includes("?")).map((l) => {
        const [q, ...a] = l.split("?")
        return { "@type": "Question", name: clean(q), acceptedAnswer: { "@type": "Answer", text: clean(a.join("?")) } }
      })
      return JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qs }, null, 2)
    }
    case "Product": return JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: clean(form.name), description: clean(form.description), image: clean(form.image), url: clean(form.url) || undefined, brand: form.brand ? { "@type": "Brand", name: clean(form.brand) } : undefined, offers: { "@type": "Offer", price: num(form.price), priceCurrency: clean(form.priceCurrency) || "USD", availability: clean(form.availability) || "https://schema.org/InStock", ratingValue: num(form.ratingValue), reviewCount: num(form.reviewCount) } }, null, 2)
    case "LocalBusiness": return JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", name: clean(form.name), description: clean(form.description), image: clean(form.image), url: clean(form.url) || undefined, telephone: clean(form.telephone) || undefined, address: { "@type": "PostalAddress", streetAddress: clean(form.streetAddress) || undefined, addressLocality: clean(form.addressLocality) || undefined, addressRegion: clean(form.addressRegion) || undefined, postalCode: clean(form.postalCode) || undefined, addressCountry: clean(form.addressCountry) || undefined }, geo: form.latitude && form.longitude ? { "@type": "GeoCoordinates", latitude: num(form.latitude), longitude: num(form.longitude) } : undefined, openingHoursSpecification: clean(form.openingHours) || undefined }, null, 2)
    case "Organization": return JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: clean(form.name), url: clean(form.url) || undefined, logo: clean(form.logo) || undefined, description: clean(form.description) || undefined, contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: clean(form.contactEmail) || undefined, telephone: clean(form.contactPhone) || undefined }, sameAs: form.sameAs ? form.sameAs.split("\n").map((s) => clean(s)).filter(Boolean) : undefined }, null, 2)
    case "BreadcrumbList": {
      const items = (form.items || "").split("\n").filter(Boolean).map((l, i) => { const [name, url] = l.split("|").map((s) => clean(s))
        return { "@type": "ListItem", position: i + 1, name, item: url } }).filter((i) => i.name)
      return JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }, null, 2)
    }
    case "HowTo": {
      const steps = []
      for (let i = 1; i <= 3; i++) { const n = clean(form[`step${i}Name`]); const t = clean(form[`step${i}Text`]); if (n) steps.push({ "@type": "HowToStep", name: n, text: t || undefined }) }
      return JSON.stringify({ "@context": "https://schema.org", "@type": "HowTo", name: clean(form.name), description: clean(form.description), image: clean(form.image) || undefined, totalTime: clean(form.totalTime) || undefined, step: steps.length > 0 ? steps : undefined }, null, 2)
    }
    default: return "{}"
  }
}

const FIELD_LABELS: Record<string, { label: string; placeholder: string; type?: string; hint?: string }> = {
  headline: { label: "Headline", placeholder: "Your Article Title" }, description: { label: "Description", placeholder: "A brief description of the content" }, image: { label: "Image URL", placeholder: "https://example.com/image.jpg" }, authorName: { label: "Author Name", placeholder: "John Doe" }, authorUrl: { label: "Author URL", placeholder: "https://example.com/author" }, publisherName: { label: "Publisher Name", placeholder: "Example Inc." }, publisherLogo: { label: "Publisher Logo URL", placeholder: "https://example.com/logo.png" }, datePublished: { label: "Date Published", placeholder: "2025-01-15", type: "date" }, dateModified: { label: "Date Modified", placeholder: "2025-07-25", type: "date" }, url: { label: "Page URL", placeholder: "https://example.com/article" }, questions: { label: "FAQ Q&As", placeholder: "What is SEO?\nSearch Engine Optimization is the process...\nHow does it work?\nBy optimizing content and technical elements...", type: "textarea", hint: "Enter each Q&A on two lines: question line ending with ?, then the answer line." }, name: { label: "Name", placeholder: "Product or Business Name" }, brand: { label: "Brand", placeholder: "Brand Name" }, price: { label: "Price", placeholder: "29.99" }, priceCurrency: { label: "Currency", placeholder: "USD" }, availability: { label: "Availability", placeholder: "https://schema.org/InStock" }, ratingValue: { label: "Rating (1-5)", placeholder: "4.5" }, reviewCount: { label: "Review Count", placeholder: "128" }, telephone: { label: "Phone", placeholder: "+1-555-123-4567" }, streetAddress: { label: "Street Address", placeholder: "123 Main St" }, addressLocality: { label: "City", placeholder: "New York" }, addressRegion: { label: "State", placeholder: "NY" }, postalCode: { label: "ZIP Code", placeholder: "10001" }, addressCountry: { label: "Country", placeholder: "US" }, latitude: { label: "Latitude", placeholder: "40.7128" }, longitude: { label: "Longitude", placeholder: "-74.0060" }, openingHours: { label: "Opening Hours", placeholder: "Mo-Fr 09:00-17:00" }, logo: { label: "Logo URL", placeholder: "https://example.com/logo.png" }, contactEmail: { label: "Contact Email", placeholder: "info@example.com" }, contactPhone: { label: "Contact Phone", placeholder: "+1-555-123-4567" }, sameAs: { label: "Social Profiles", placeholder: "https://twitter.com/example\nhttps://facebook.com/example\nhttps://linkedin.com/company/example", type: "textarea", hint: "One URL per line for social media profiles." }, items: { label: "Breadcrumb Items", placeholder: "Home|https://example.com\nBlog|https://example.com/blog\nSEO Tips|https://example.com/blog/seo", type: "textarea", hint: "One item per line: Name|URL" }, totalTime: { label: "Total Time", placeholder: "PT30M (ISO 8601 duration)" }, step1Name: { label: "Step 1 Name" }, step1Text: { label: "Step 1 Text" }, step2Name: { label: "Step 2 Name" }, step2Text: { label: "Step 2 Text" }, step3Name: { label: "Step 3 Name" }, step3Text: { label: "Step 3 Text" },
}

export function SchemaMarkupGeneratorTool() {
  const [schemaType, setSchemaType] = useState("Article")
  const [form, setForm] = useState<SchemaForm>({})
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(true)

  const activeFields = useMemo(() => SCHEMA_TYPES.find((s) => s.value === schemaType)?.fields || [], [schemaType])
  const output = useMemo(() => buildSchema(schemaType, form), [schemaType, form])

  const updateForm = useCallback((field: string, value: string) => setForm((p) => ({ ...p, [field]: value })), [])
  const copyOutput = useCallback(async () => { try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* */ } }, [output])
  const resetForm = useCallback(() => setForm({}), [])

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Braces className="size-4 text-primary" /><h2 className="font-semibold">Schema Configuration</h2></div>
              <Button variant="outline" size="sm" onClick={resetForm}>Reset</Button>
            </div>
            <div className="space-y-1.5">
              <Label>Schema Type</Label>
              <Select value={schemaType} onValueChange={(v) => { setSchemaType(v); setForm({}) }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{SCHEMA_TYPES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-3">
              {activeFields.map((field) => {
                const cfg = FIELD_LABELS[field] || { label: field, placeholder: "" }
                const isTextarea = cfg.type === "textarea"
                return (
                  <div key={field} className="space-y-1.5">
                    <Label htmlFor={field}>{cfg.label}</Label>
                    {isTextarea ? (
                      <textarea id={field} value={form[field] || ""} onChange={(e) => updateForm(field, e.target.value)} placeholder={cfg.placeholder} className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    ) : (
                      <Input id={field} type={cfg.type || "text"} value={form[field] || ""} onChange={(e) => updateForm(field, e.target.value)} placeholder={cfg.placeholder} />
                    )}
                    {cfg.hint && <p className="text-[10px] text-muted-foreground">{cfg.hint}</p>}
                  </div>
                )
              })}
            </div>
          </Card>
          <div className="space-y-4">
            <Card className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2"><Code className="size-4 text-primary" /> JSON-LD Output</h3>
                <div className="flex gap-1">
                  <Button variant={showCode ? "ghost" : "outline"} size="sm" onClick={() => setShowCode(false)}><Eye className="size-3.5 mr-1" />Preview</Button>
                  <Button variant={showCode ? "outline" : "ghost"} size="sm" onClick={() => setShowCode(true)}><Code className="size-3.5 mr-1" />Code</Button>
                </div>
              </div>
              {showCode ? (
                <div className="relative">
                  <pre className="rounded-lg bg-muted/50 border border-border p-4 text-xs font-mono overflow-x-auto max-h-[500px] overflow-y-auto whitespace-pre-wrap break-all">{output}</pre>
                  <Tooltip><TooltipTrigger asChild><Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={copyOutput}>{copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}{copied ? "Copied" : "Copy"}</Button></TooltipTrigger><TooltipContent>Copy JSON-LD</TooltipContent></Tooltip>
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-muted/30 p-6 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-medium">{schemaType} Schema Preview</p>
                  <pre className="text-xs font-mono whitespace-pre-wrap break-all text-foreground">{(() => { try { const parsed = JSON.parse(output); return JSON.stringify(parsed, null, 2) } catch { return output } })()}</pre>
                </div>
              )}
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-emerald-500/10 p-2 shrink-0"><Check className="size-5 text-emerald-600 dark:text-emerald-400" /></div>
                <div className="space-y-1"><p className="text-sm font-medium">Ready for Your HTML Head</p><p className="text-xs text-muted-foreground">Paste this into a &lt;script type=&quot;application/ld+json&quot;&gt; tag in your page head. Validate with Google Rich Results Test.</p></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}