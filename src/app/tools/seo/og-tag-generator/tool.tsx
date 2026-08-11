"use client"

import { useState, useCallback, useMemo } from "react"
import { Copy, Check, Share2, Eye, Code, Info, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// ─── Types ───────────────────────────────────────────────────────────────────

interface OGData {
  title: string
  description: string
  image: string
  url: string
  type: string
  siteName: string
  locale: string
  twitterCard: string
  twitterSite: string
  twitterCreator: string
  articlePublishedTime: string
  articleAuthor: string
  articleSection: string
}

const OG_TYPES = [
  { value: "website", label: "Website" },
  { value: "article", label: "Article" },
  { value: "profile", label: "Profile" },
  { value: "book", label: "Book" },
  { value: "music.song", label: "Music Song" },
  { value: "video.movie", label: "Video Movie" },
  { value: "product", label: "Product" },
]

const LOCALES = [
  { value: "en_US", label: "English (US)" },
  { value: "en_GB", label: "English (UK)" },
  { value: "fr_FR", label: "French" },
  { value: "de_DE", label: "German" },
  { value: "es_ES", label: "Spanish" },
  { value: "pt_BR", label: "Portuguese (BR)" },
  { value: "ja_JP", label: "Japanese" },
  { value: "zh_CN", label: "Chinese (CN)" },
]

// ─── Generate HTML ───────────────────────────────────────────────────────────

function generateHTML(data: OGData): string {
  const lines: string[] = []
  lines.push('<!-- Open Graph / Facebook -->')
  lines.push(`<meta property="og:title" content="${escapeAttr(data.title)}" />`)
  lines.push(`<meta property="og:description" content="${escapeAttr(data.description)}" />`)
  if (data.image) lines.push(`<meta property="og:image" content="${escapeAttr(data.image)}" />`)
  if (data.url) lines.push(`<meta property="og:url" content="${escapeAttr(data.url)}" />`)
  lines.push(`<meta property="og:type" content="${data.type}" />`)
  if (data.siteName) lines.push(`<meta property="og:site_name" content="${escapeAttr(data.siteName)}" />`)
  lines.push(`<meta property="og:locale" content="${data.locale}" />`)

  if (data.type === "article") {
    lines.push("")
    lines.push('<!-- Article-specific OG tags -->')
    if (data.articlePublishedTime) lines.push(`<meta property="article:published_time" content="${escapeAttr(data.articlePublishedTime)}" />`)
    if (data.articleAuthor) lines.push(`<meta property="article:author" content="${escapeAttr(data.articleAuthor)}" />`)
    if (data.articleSection) lines.push(`<meta property="article:section" content="${escapeAttr(data.articleSection)}" />`)
  }

  lines.push("")
  lines.push('<!-- Twitter -->')
  lines.push(`<meta name="twitter:card" content="${data.twitterCard}" />`)
  if (data.twitterSite) lines.push(`<meta name="twitter:site" content="@${data.twitterSite.replace(/@/g, "")}" />`)
  if (data.twitterCreator) lines.push(`<meta name="twitter:creator" content="@${data.twitterCreator.replace(/@/g, "")}" />`)
  if (data.title) lines.push(`<meta name="twitter:title" content="${escapeAttr(data.title)}" />`)
  if (data.description) lines.push(`<meta name="twitter:description" content="${escapeAttr(data.description)}" />`)
  if (data.image) lines.push(`<meta name="twitter:image" content="${escapeAttr(data.image)}" />`)

  return lines.join("\n")
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function OGTagGeneratorTool() {
  const [data, setData] = useState<OGData>({
    title: "",
    description: "",
    image: "",
    url: "",
    type: "website",
    siteName: "",
    locale: "en_US",
    twitterCard: "summary_large_image",
    twitterSite: "",
    twitterCreator: "",
    articlePublishedTime: "",
    articleAuthor: "",
    articleSection: "",
  })
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(true)

  const update = useCallback((field: keyof OGData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const html = useMemo(() => generateHTML(data), [data])
  const isArticle = data.type === "article"

  const copyHTML = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback */ }
  }, [html])

  const titleLen = data.title.length
  const descLen = data.description.length

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Input Fields */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Share2 className="size-4 text-primary" />
              <h2 className="font-semibold">Open Graph Tags</h2>
            </div>

            <Separator />

            {/* Title */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="og-title">og:title</Label>
                <span className={`text-xs tabular-nums ${titleLen <= 60 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>{titleLen}/60</span>
              </div>
              <Input id="og-title" value={data.title} onChange={(e) => update("title", e.target.value)} placeholder="Your page title" />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="og-desc">og:description</Label>
                <span className={`text-xs tabular-nums ${descLen <= 200 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>{descLen}/200</span>
              </div>
              <textarea id="og-desc" value={data.description} onChange={(e) => update("description", e.target.value)} placeholder="A brief description of your page" className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
            </div>

            {/* Image */}
            <div className="space-y-1.5">
              <Label htmlFor="og-image">og:image</Label>
              <Input id="og-image" value={data.image} onChange={(e) => update("image", e.target.value)} placeholder="https://example.com/image.jpg (1200×630px recommended)" className="font-mono text-sm" />
              <p className="text-[10px] text-muted-foreground">Recommended: 1200×630px, JPG/PNG/WebP, under 5MB</p>
            </div>

            {/* URL */}
            <div className="space-y-1.5">
              <Label htmlFor="og-url">og:url</Label>
              <Input id="og-url" value={data.url} onChange={(e) => update("url", e.target.value)} placeholder="https://example.com/page" className="font-mono text-sm" />
            </div>

            {/* Type + Site Name + Locale row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>og:type</Label>
                <Select value={data.type} onValueChange={(v) => update("type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{OG_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="og-site">og:site_name</Label>
                <Input id="og-site" value={data.siteName} onChange={(e) => update("siteName", e.target.value)} placeholder="My Site" />
              </div>
              <div className="space-y-1.5">
                <Label>og:locale</Label>
                <Select value={data.locale} onValueChange={(v) => update("locale", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{LOCALES.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            {/* Article-specific fields */}
            {isArticle && (
              <>
                <Separator />
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Info className="size-3" /> Article-specific fields</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="art-time">Published</Label>
                    <Input id="art-time" type="date" value={data.articlePublishedTime} onChange={(e) => update("articlePublishedTime", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="art-author">Author</Label>
                    <Input id="art-author" value={data.articleAuthor} onChange={(e) => update("articleAuthor", e.target.value)} placeholder="Author name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="art-section">Section</Label>
                    <Input id="art-section" value={data.articleSection} onChange={(e) => update("articleSection", e.target.value)} placeholder="Technology" />
                  </div>
                </div>
              </>
            )}

            <Separator />
            <div className="flex items-center gap-2">
              <Globe className="size-4 text-primary" />
              <h3 className="font-semibold">Twitter Card Tags</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>twitter:card</Label>
                <Select value={data.twitterCard} onValueChange={(v) => update("twitterCard", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">summary</SelectItem>
                    <SelectItem value="summary_large_image">summary_large_image</SelectItem>
                    <SelectItem value="player">player</SelectItem>
                    <SelectItem value="app">app</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tw-site">twitter:site</Label>
                <Input id="tw-site" value={data.twitterSite} onChange={(e) => update("twitterSite", e.target.value)} placeholder="@yoursite" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tw-creator">twitter:creator</Label>
              <Input id="tw-creator" value={data.twitterCreator} onChange={(e) => update("twitterCreator", e.target.value)} placeholder="@yourhandle" />
            </div>
          </Card>

          {/* Right: Preview + Code */}
          <div className="space-y-6">
            {/* Social Preview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2"><Eye className="size-4 text-primary" /> Social Preview</h3>
                <div className="flex gap-1">
                  <Button variant={showCode ? "ghost" : "outline"} size="sm" onClick={() => setShowCode(false)}><Eye className="size-3.5 mr-1" />Preview</Button>
                  <Button variant={showCode ? "outline" : "ghost"} size="sm" onClick={() => setShowCode(true)}><Code className="size-3.5 mr-1" />Code</Button>
                </div>
              </div>

              {showCode ? (
                <div className="relative">
                  <pre className="rounded-lg bg-muted/50 border border-border p-4 text-xs font-mono overflow-x-auto max-h-[500px] overflow-y-auto whitespace-pre-wrap break-all">{html || "<!-- Fill in the fields to generate OG tags -->"}</pre>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={copyHTML}>
                        {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy HTML to clipboard</TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                <div className="rounded-lg border border-border overflow-hidden">
                  {data.image ? (
                    <img src={data.image} alt="OG Preview" className="w-full h-48 object-cover bg-muted" />
                  ) : (
                    <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground text-sm">1200 × 630 Image Preview</div>
                  )}
                  <div className="p-3 border-t border-border space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-medium truncate">{data.siteName || data.url || "example.com"}</p>
                    <p className="font-semibold text-sm line-clamp-2">{data.title || "Your Page Title"}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{data.description || "Your page description will appear here"}</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Info Banner */}
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
                  <Check className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">All Processing in Your Browser</p>
                  <p className="text-xs text-muted-foreground">No data is sent to any server. Validate your tags using Facebook Sharing Debugger, LinkedIn Post Inspector, or Twitter Card Validator.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
