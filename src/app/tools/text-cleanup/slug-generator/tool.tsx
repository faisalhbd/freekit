"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Hash, Copy, RotateCcw, Shield } from "lucide-react"

type SeparatorType = "-" | "_" | "."

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "must", "ought",
  "and", "or", "but", "if", "in", "on", "at", "to", "for", "of",
  "with", "by", "from", "as", "into", "through", "during", "before",
  "after", "above", "below", "between", "out", "off", "over", "under",
  "again", "further", "then", "once", "here", "there", "when", "where",
  "why", "how", "all", "both", "each", "few", "more", "most", "other",
  "some", "such", "no", "nor", "not", "only", "own", "same", "so",
  "than", "too", "very", "just", "about", "up", "down", "it", "its",
])

function transliterate(text: string): string {
  return text
    .replace(/[ÀÁÂÃÄÅ]/g, "A")
    .replace(/[àáâãäå]/g, "a")
    .replace(/[ÒÓÔÕÖ]/g, "O")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ÈÉÊË]/g, "E")
    .replace(/[èéêë]/g, "e")
    .replace(/[ÌÍÎÏ]/g, "I")
    .replace(/[ìíîï]/g, "i")
    .replace(/[ÙÚÛÜ]/g, "U")
    .replace(/[ùúûü]/g, "u")
    .replace(/[Ñ]/g, "N")
    .replace(/[ñ]/g, "n")
    .replace(/[Ç]/g, "C")
    .replace(/[ç]/g, "c")
    .replace(/[Ð]/g, "D")
    .replace(/[ð]/g, "d")
    .replace(/[Ý]/g, "Y")
    .replace(/[ýÿ]/g, "y")
    .replace(/[Þ]/g, "Th")
    .replace(/[þ]/g, "th")
    .replace(/[ß]/g, "ss")
    .replace(/[Æ]/g, "Ae")
    .replace(/[æ]/g, "ae")
    .replace(/[Œ]/g, "Oe")
    .replace(/[œ]/g, "oe")
    .replace(/[^a-zA-Z0-9\s-_.]/g, "")
}

function generateSlug(text: string, options: {
  separator: SeparatorType
  lowercase: boolean
  transliterateAccents: boolean
  removeStopWords: boolean
  maxLength: number
}): string {
  let result = (text || "")

  if (options.transliterateAccents) {
    result = transliterate(result)
  }

  // Remove all non-alphanumeric characters except spaces and allowed separators
  result = result.replace(/[^a-zA-Z0-9\s-_.]/g, " ")

  let words = result.split(/\s+/).filter((w) => w.length > 0)

  if (options.removeStopWords) {
    words = words.filter((w) => {
      const lower = (w || "").toLowerCase()
      return !(STOP_WORDS.has(lower))
    })
  }

  let slug = words.join(options.separator)

  if (options.lowercase) {
    slug = slug.toLowerCase()
  }

  // Replace any remaining separator-like characters with the chosen separator
  slug = slug.replace(/[-_.]+/g, options.separator)

  // Trim separator from start and end
  if (slug.startsWith(options.separator)) {
    slug = slug.substring(1)
  }
  if (slug.endsWith(options.separator)) {
    slug = slug = slug.substring(0, slug.length - 1)
  }

  // Enforce max length (don't cut in the middle of a word)
  if (options.maxLength > 0 && slug.length > options.maxLength) {
    slug = slug.substring(0, options.maxLength)
    const lastSep = slug.lastIndexOf(options.separator)
    if (lastSep > options.maxLength * 0.5) {
      slug = slug.substring(0, lastSep)
    }
  }

  return slug
}

export function SlugGeneratorTool() {
  const [input, setInput] = useState("")
  // slug state removed - using computed value from useMemo
  const [copied, setCopied] = useState(false)

  const [separator, setSeparator] = useState<SeparatorType>("-")
  const [lowercase, setLowercase] = useState(true)
  const [transliterateAccents, setTransliterateAccents] = useState(true)
  const [removeStopWords, setRemoveStopWords] = useState(false)
  const [maxLength, setMaxLength] = useState(0)

  const slug = useMemo(() => generateSlug(input, {
    separator,
    lowercase,
    transliterateAccents,
    removeStopWords,
    maxLength,
  }), [input, separator, lowercase, transliterateAccents, removeStopWords, maxLength])

  const handleCopy = useCallback(async () => {
    if ((slug || "").length === 0) return
    try {
      await navigator.clipboard.writeText(slug)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [slug])

  const handleClear = useCallback(() => {
    setInput("")
    // input already cleared above
  }, [])

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <Label htmlFor="slug-input" className="text-base font-semibold flex items-center gap-2">
            <Hash className="size-4" />
            Title or Text
          </Label>
          <Input
            id="slug-input"
            placeholder="Enter your title or text to generate a slug..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-base h-12"
          />
        </CardContent>
      </Card>

      {/* Options */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <Label className="text-base font-semibold">Options</Label>

          {/* Separator */}
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Separator</Label>
            <RadioGroup value={separator} onValueChange={(v) => setSeparator(v as SeparatorType)} className="flex flex-wrap gap-3">
              {[
                { value: "-" as SeparatorType, label: "Hyphen (-)", example: "my-blog-post" },
                { value: "_" as SeparatorType, label: "Underscore (_)", example: "my_blog_post" },
                { value: "." as SeparatorType, label: "Dot (.)", example: "my.blog.post" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-2 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem id={`sep-${opt.value}`} value={opt.value} />
                  <Label htmlFor={`sep-${opt.value}`} className="cursor-pointer">
                    <span className="text-sm font-medium">{opt.label}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5 font-mono">{opt.example}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Checkboxes */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Checkbox id="lowercase" checked={lowercase} onCheckedChange={(v) => setLowercase(!!v)} />
              <Label htmlFor="lowercase" className="text-sm cursor-pointer">Lowercase</Label>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Checkbox id="transliterate" checked={transliterateAccents} onCheckedChange={(v) => setTransliterateAccents(!!v)} />
              <Label htmlFor="transliterate" className="text-sm cursor-pointer">Transliterate accents</Label>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Checkbox id="stopwords" checked={removeStopWords} onCheckedChange={(v) => setRemoveStopWords(!!v)} />
              <Label htmlFor="stopwords" className="text-sm cursor-pointer">Remove stop words</Label>
            </div>
          </div>

          {/* Max Length */}
          <div className="flex items-center gap-3 rounded-lg border border-border p-3">
            <Label htmlFor="max-length" className="text-sm whitespace-nowrap">Max length (0 = unlimited)</Label>
            <Input
              id="max-length"
              type="number"
              min={0}
              max={500}
              value={maxLength}
              onChange={(e) => setMaxLength(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-24 h-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Slug Output */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Hash className="size-4" />
              Generated Slug
            </Label>
            <Badge variant="secondary" className="tabular-nums">
              {(slug || "").length} character{(slug || "").length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 sm:p-6">
            <p className="font-mono text-lg sm:text-2xl break-all text-primary font-semibold min-h-[2rem]">
              {(slug || "") || (
                <span className="text-muted-foreground font-normal text-base italic">Your slug will appear here as you type...</span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={(slug || "").length === 0}>
              <Copy className="size-4 mr-1.5" />
              {copied ? "Copied!" : "Copy Slug"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              <RotateCcw className="size-4 mr-1.5" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your Text Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All slug generation is performed entirely in your browser. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
