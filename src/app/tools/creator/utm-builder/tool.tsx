"use client"

import { useState, useCallback, useMemo } from "react"
import {
  Copy,
  Check,
  Trash2,
  Link as LinkIcon,
  AlertCircle,
  ExternalLink,
  Tag,
  Megaphone,
  FileText,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Presets ────────────────────────────────────────────────────────────────

const SOURCE_PRESETS = [
  "google",
  "facebook",
  "twitter",
  "linkedin",
  "instagram",
  "newsletter",
  "email",
  "bing",
  "youtube",
  "tiktok",
]

const MEDIUM_PRESETS = [
  "cpc",
  "cpm",
  "email",
  "social",
  "organic",
  "referral",
  "display",
  "affiliate",
  "video",
  "push",
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function isValidUrl(str: string): boolean {
  if (!str) return false
  try {
    const url = new URL(str)
    return url.protocol === "http" || url.protocol === "https"
  } catch {
    return false
  }
}

// ─── Component ──────────────────────────────────────────────────────────────

export function UTMBuilderTool() {
  const [baseUrl, setBaseUrl] = useState("")
  const [utmSource, setUtmSource] = useState("")
  const [utmMedium, setUtmMedium] = useState("")
  const [utmCampaign, setUtmCampaign] = useState("")
  const [utmTerm, setUtmTerm] = useState("")
  const [utmContent, setUtmContent] = useState("")
  const [copied, setCopied] = useState(false)

  const urlError = useMemo(() => {
    if (!baseUrl) return ""
    if (!isValidUrl(baseUrl)) return "Please enter a valid URL (e.g., https://example.com)"
    return ""
  }, [baseUrl])

  const generatedUrl = useMemo(() => {
    if (!baseUrl || urlError) return ""

    const params: string[] = []
    if (utmSource) params.push(`utm_source=${encodeURIComponent(utmSource)}`)
    if (utmMedium) params.push(`utm_medium=${encodeURIComponent(utmMedium)}`)
    if (utmCampaign) params.push(`utm_campaign=${encodeURIComponent(utmCampaign)}`)
    if (utmTerm) params.push(`utm_term=${encodeURIComponent(utmTerm)}`)
    if (utmContent) params.push(`utm_content=${encodeURIComponent(utmContent)}`)

    if (params.length === 0) return (baseUrl || "")
    const separator = (baseUrl || "").includes("?") ? "&" : "?"
    return `${(baseUrl || "")}${separator}${params.join("&")}`
  }, [baseUrl, urlError, utmSource, utmMedium, utmCampaign, utmTerm, utmContent])

  const paramEntries = useMemo(() => {
    const entries: { key: string; value: string; label: string; icon: typeof LinkIcon }[] = []
    if (utmSource) entries.push({ key: "utm_source", value: utmSource, label: "Source", icon: Tag })
    if (utmMedium) entries.push({ key: "utm_medium", value: utmMedium, label: "Medium", icon: Megaphone })
    if (utmCampaign) entries.push({ key: "utm_campaign", value: utmCampaign, label: "Campaign", icon: FileText })
    if (utmTerm) entries.push({ key: "utm_term", value: utmTerm, label: "Term", icon: Search })
    if (utmContent) entries.push({ key: "utm_content", value: utmContent, label: "Content", icon: FileText })
    return entries
  }, [utmSource, utmMedium, utmCampaign, utmTerm, utmContent])

  const handleCopy = useCallback(() => {
    if (!generatedUrl) return
    navigator.clipboard.writeText(generatedUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [generatedUrl])

  const handleClearAll = useCallback(() => {
    setBaseUrl("")
    setUtmSource("")
    setUtmMedium("")
    setUtmCampaign("")
    setUtmTerm("")
    setUtmContent("")
  }, [])

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ── Input Panel ── */}
          <Card className="p-6 space-y-5">
            {/* Base URL */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <LinkIcon className="size-3" />
                Website URL <span className="text-destructive">*</span>
              </Label>
              <Input
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://example.com/landing-page"
                className={`text-sm ${urlError ? "border-destructive" : ""}`}
              />
              {urlError && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {urlError}
                </p>
              )}
            </div>

            <Separator />

            {/* utm_source */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium flex items-center gap-1.5">
                  <Tag className="size-3" />
                  utm_source <span className="text-destructive">*</span>
                </Label>
                <Badge variant="secondary" className="text-[10px]">Required</Badge>
              </div>
              <Select value={utmSource} onValueChange={setUtmSource}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select or type a source..." />
                </SelectTrigger>
                <SelectContent>
                  {SOURCE_PRESETS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                placeholder="e.g., google, facebook, newsletter"
                className="text-sm"
              />
            </div>

            {/* utm_medium */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium flex items-center gap-1.5">
                  <Megaphone className="size-3" />
                  utm_medium <span className="text-destructive">*</span>
                </Label>
                <Badge variant="secondary" className="text-[10px]">Required</Badge>
              </div>
              <Select value={utmMedium} onValueChange={setUtmMedium}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select or type a medium..." />
                </SelectTrigger>
                <SelectContent>
                  {MEDIUM_PRESETS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
                placeholder="e.g., cpc, email, social"
                className="text-sm"
              />
            </div>

            {/* utm_campaign */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium flex items-center gap-1.5">
                  <FileText className="size-3" />
                  utm_campaign <span className="text-destructive">*</span>
                </Label>
                <Badge variant="secondary" className="text-[10px]">Required</Badge>
              </div>
              <Input
                value={utmCampaign}
                onChange={(e) => setUtmCampaign(e.target.value)}
                placeholder="e.g., summer-sale-2025"
                className="text-sm"
              />
            </div>

            <Separator />

            {/* utm_term (optional) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium flex items-center gap-1.5">
                  <Search className="size-3" />
                  utm_term
                </Label>
                <Badge variant="outline" className="text-[10px]">Optional</Badge>
              </div>
              <Input
                value={utmTerm}
                onChange={(e) => setUtmTerm(e.target.value)}
                placeholder="e.g., running+shoes"
                className="text-sm"
              />
            </div>

            {/* utm_content (optional) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium flex items-center gap-1.5">
                  <FileText className="size-3" />
                  utm_content
                </Label>
                <Badge variant="outline" className="text-[10px]">Optional</Badge>
              </div>
              <Input
                value={utmContent}
                onChange={(e) => setUtmContent(e.target.value)}
                placeholder="e.g., header-banner, sidebar-cta"
                className="text-sm"
              />
            </div>

            {/* Clear All */}
            <Button variant="ghost" size="sm" className="text-xs gap-1.5 w-full" onClick={handleClearAll}>
              <Trash2 className="size-3" />
              Clear All
            </Button>
          </Card>

          {/* ── Output Panel ── */}
          <div className="space-y-6">
            {/* Generated URL */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <ExternalLink className="size-3.5" />
                  Generated URL
                </Label>
                <Button
                  variant={copied ? "default" : "outline"}
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={handleCopy}
                  disabled={!generatedUrl}
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      Copy URL
                    </>
                  )}
                </Button>
              </div>
              {generatedUrl ? (
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap break-all">
                    <code>{generatedUrl}</code>
                  </pre>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-8 text-center">
                  <LinkIcon className="size-8 mx-auto text-muted-foreground/40 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Fill in the fields to generate your UTM link
                  </p>
                </div>
              )}
            </Card>

            {/* URL Breakdown */}
            {generatedUrl && (
              <Card className="p-6 space-y-4">
                <Label className="text-sm font-medium">URL Breakdown</Label>
                <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">Base</Badge>
                    <span className="text-xs font-mono break-all text-muted-foreground">{(baseUrl || "")}</span>
                  </div>
                  {paramEntries.map((p) => (
                    <div key={p.key} className="flex items-start gap-2">
                      <Badge variant="secondary" className="text-[10px] shrink-0 mt-0.5">
                        {p.key}
                      </Badge>
                      <span className="text-xs font-mono break-all text-foreground">{p.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Parameters Table */}
            {paramEntries.length > 0 && (
              <Card className="p-6 space-y-4">
                <Label className="text-sm font-medium">Parameters Summary</Label>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left font-medium px-3 py-2">Parameter</th>
                        <th className="text-left font-medium px-3 py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paramEntries.map((p) => (
                        <tr key={p.key} className="border-b border-border last:border-0">
                          <td className="px-3 py-2 font-mono text-muted-foreground">{p.key}</td>
                          <td className="px-3 py-2 font-mono">{p.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
