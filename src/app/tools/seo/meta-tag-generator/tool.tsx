"use client"

import { useState, useCallback, useMemo } from "react"
import { Copy, Check, Tag, Eye, Code, Info, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface MetaFormData {
  title: string
  description: string
  keywords: string
  canonicalUrl: string
  author: string
  viewport: string
  charset: string
  robots: string
  ogImage: string
  ogType: string
  twitterCard: string
}

const TITLE_LIMIT = 60
const DESCRIPTION_LIMIT = 160

function getCharColor(count: number, limit: number): string {
  if (count === 0) return "text-muted-foreground"
  const ratio = count / limit
  if (ratio <= 0.85) return "text-emerald-600 dark:text-emerald-400"
  if (ratio <= 1) return "text-amber-500"
  return "text-red-500"
}

function getCharBg(count: number, limit: number): string {
  if (count === 0) return "bg-muted"
  const ratio = count / limit
  if (ratio <= 0.85) return "bg-emerald-500/10"
  if (ratio <= 1) return "bg-amber-500/10"
  return "bg-red-500/10"
}

function CharCounter({ count, limit }: { count: number; limit: number }) {
  return (
    <span
      className={`text-xs font-mono px-1.5 py-0.5 rounded ${getCharBg(count, limit)} ${getCharColor(count, limit)}`}
    >
      {count}/{limit}
    </span>
  )
}

export function MetaTagGeneratorTool() {
  const [form, setForm] = useState<MetaFormData>({
    title: "",
    description: "",
    keywords: "",
    canonicalUrl: "",
    author: "",
    viewport: "width=device-width, initial-scale=1.0",
    charset: "UTF-8",
    robots: "index, follow",
    ogImage: "",
    ogType: "website",
    twitterCard: "summary_large_image",
  })

  const [copied, setCopied] = useState(false)

  const updateField = useCallback(
    (field: keyof MetaFormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const resetForm = useCallback(() => {
    setForm({
      title: "",
      description: "",
      keywords: "",
      canonicalUrl: "",
      author: "",
      viewport: "width=device-width, initial-scale=1.0",
      charset: "UTF-8",
      robots: "index, follow",
      ogImage: "",
      ogType: "website",
      twitterCard: "summary_large_image",
    })
    setCopied(false)
  }, [])

  const generatedHtml = useMemo(() => {
    const lines: string[] = []

    lines.push('<meta charset="' + form.charset + '">')
    lines.push('<meta name="viewport" content="' + form.viewport + '">')

    if (form.title) {
      lines.push('<title>' + form.title + '</title>')
    }

    if (form.description) {
      lines.push('<meta name="description" content="' + form.description + '">')
    }

    if (form.keywords) {
      lines.push('<meta name="keywords" content="' + form.keywords + '">')
    }

    if (form.author) {
      lines.push('<meta name="author" content="' + form.author + '">')
    }

    if (form.robots) {
      lines.push('<meta name="robots" content="' + form.robots + '">')
    }

    if (form.canonicalUrl) {
      lines.push('<link rel="canonical" href="' + form.canonicalUrl + '">')
    }

    if (form.title || form.description || form.canonicalUrl || form.ogImage || form.ogType) {
      lines.push("")
      lines.push('<!-- Open Graph / Facebook -->')
      if (form.ogType) {
        lines.push('<meta property="og:type" content="' + form.ogType + '">')
      }
      if (form.title) {
        lines.push('<meta property="og:title" content="' + form.title + '">')
      }
      if (form.description) {
        lines.push('<meta property="og:description" content="' + form.description + '">')
      }
      if (form.canonicalUrl) {
        lines.push('<meta property="og:url" content="' + form.canonicalUrl + '">')
      }
      if (form.ogImage) {
        lines.push('<meta property="og:image" content="' + form.ogImage + '">')
      }
    }

    if (form.title || form.description || form.ogImage) {
      lines.push("")
      lines.push('<!-- Twitter -->')
      lines.push('<meta name="twitter:card" content="' + form.twitterCard + '">')
      if (form.title) {
        lines.push('<meta name="twitter:title" content="' + form.title + '">')
      }
      if (form.description) {
        lines.push('<meta name="twitter:description" content="' + form.description + '">')
      }
      if (form.ogImage) {
        lines.push('<meta name="twitter:image" content="' + form.ogImage + '">')
      }
    }

    return lines.join("\n")
  }, [form])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const textarea = document.createElement("textarea")
      textarea.value = generatedHtml
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [generatedHtml])

  const hasAnyInput =
    form.title || form.description || form.keywords || form.canonicalUrl || form.author || form.ogImage

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left Column — Inputs */}
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Tag className="size-5 text-primary" />
              Meta Tag Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Page Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="meta-title" className="font-medium">
                  Page Title
                </Label>
                <CharCounter count={form.title.length} limit={TITLE_LIMIT} />
              </div>
              <Input
                id="meta-title"
                placeholder="Enter your page title (e.g., Best SEO Tools - FreeKit)"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 50-60 characters for optimal display in search results.
              </p>
            </div>

            {/* Meta Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="meta-desc" className="font-medium">
                  Meta Description
                </Label>
                <CharCounter count={form.description.length} limit={DESCRIPTION_LIMIT} />
              </div>
              <Textarea
                id="meta-desc"
                placeholder="Write a compelling description of your page (150-160 characters)"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                maxLength={300}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 140-160 characters. Include your primary keyword.
              </p>
            </div>

            <Separator />

            {/* Keywords */}
            <div className="space-y-2">
              <Label htmlFor="meta-keywords" className="font-medium">
                Keywords
              </Label>
              <Input
                id="meta-keywords"
                placeholder="seo tools, meta tags, free online tools"
                value={form.keywords}
                onChange={(e) => updateField("keywords", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of relevant keywords.
              </p>
            </div>

            {/* Canonical URL */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="canonical-url" className="font-medium">
                  Canonical URL
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="size-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    The canonical URL tells search engines which version of this page is the
                    preferred one. Prevents duplicate content issues.
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="canonical-url"
                placeholder="https://example.com/page"
                value={form.canonicalUrl}
                onChange={(e) => updateField("canonicalUrl", e.target.value)}
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="meta-author" className="font-medium">
                Author
              </Label>
              <Input
                id="meta-author"
                placeholder="Author name (optional)"
                value={form.author}
                onChange={(e) => updateField("author", e.target.value)}
              />
            </div>

            <Separator />

            {/* Viewport */}
            <div className="space-y-2">
              <Label htmlFor="meta-viewport" className="font-medium">
                Viewport
              </Label>
              <Input
                id="meta-viewport"
                value={form.viewport}
                onChange={(e) => updateField("viewport", e.target.value)}
              />
            </div>

            {/* Charset */}
            <div className="space-y-2">
              <Label htmlFor="meta-charset" className="font-medium">
                Charset
              </Label>
              <Input
                id="meta-charset"
                value={form.charset}
                onChange={(e) => updateField("charset", e.target.value)}
              />
            </div>

            {/* Robots */}
            <div className="space-y-2">
              <Label htmlFor="meta-robots" className="font-medium">
                Robots
              </Label>
              <Input
                id="meta-robots"
                value={form.robots}
                onChange={(e) => updateField("robots", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Common values: &quot;index, follow&quot;, &quot;noindex, follow&quot;, &quot;index, nofollow&quot;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <svg
                className="size-5 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Social Media Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* OG Image */}
            <div className="space-y-2">
              <Label htmlFor="og-image" className="font-medium">
                OG / Twitter Image URL
              </Label>
              <Input
                id="og-image"
                placeholder="https://example.com/og-image.jpg"
                value={form.ogImage}
                onChange={(e) => updateField("ogImage", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 1200×630px for optimal display on all platforms.
              </p>
            </div>

            {/* OG Type */}
            <div className="space-y-2">
              <Label htmlFor="og-type" className="font-medium">
                OG Type
              </Label>
              <Input
                id="og-type"
                value={form.ogType}
                onChange={(e) => updateField("ogType", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Common types: website, article, product, profile, video.other
              </p>
            </div>

            {/* Twitter Card Type */}
            <div className="space-y-2">
              <Label htmlFor="twitter-card" className="font-medium">
                Twitter Card Type
              </Label>
              <Input
                id="twitter-card"
                value={form.twitterCard}
                onChange={(e) => updateField("twitterCard", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Types: summary (small image), summary_large_image (large banner), app
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reset button */}
        <Button variant="outline" onClick={resetForm} className="w-full">
          <RefreshCw className="size-4 mr-2" />
          Reset All Fields
        </Button>
      </div>

      {/* Right Column — Output */}
      <div className="space-y-6">
        {/* Google SERP Preview */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="size-5 text-primary" />
              Search Result Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-background p-4 space-y-2">
              <div className="text-sm text-muted-foreground">
                {form.canonicalUrl ? (
                  <span className="truncate block">
                    {form.canonicalUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  </span>
                ) : (
                  <span>https://example.com/your-page</span>
                )}
              </div>
              <div className="text-xl text-blue-700 dark:text-blue-400 hover:underline cursor-pointer leading-snug">
                {form.title || "Your Page Title Will Appear Here"}
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                {form.description || "Your meta description will appear here. Write a compelling summary of 140-160 characters to improve click-through rates from search results."}
              </div>
              {form.keywords && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {form.keywords
                    .split(",")
                    .map((k) => k.trim())
                    .filter(Boolean)
                    .slice(0, 5)
                    .map((kw) => (
                      <Badge key={kw} variant="secondary" className="text-xs">
                        {kw}
                      </Badge>
                    ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generated HTML Code */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="size-5 text-primary" />
                Generated HTML
              </CardTitle>
              <Button
                size="sm"
                onClick={copyToClipboard}
                disabled={!hasAnyInput}
                className="gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy HTML
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto text-sm leading-relaxed">
                <code className="text-foreground/90 whitespace-pre-wrap break-all font-mono">
                  {hasAnyInput ? (
                    generatedHtml
                  ) : (
                    <span className="text-muted-foreground italic">
                      {"<!-- Start filling in the fields on the left -->\n"}
                      {"<!-- and your generated meta tags will appear here -->"}
                    </span>
                  )}
                </code>
              </pre>
            </div>
            <p className="mt-3 text-xs text-muted-foreground flex items-start gap-1.5">
              <Info className="size-3.5 mt-0.5 shrink-0" />
              Copy the code above and paste it inside the &lt;head&gt; section of your HTML document.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
