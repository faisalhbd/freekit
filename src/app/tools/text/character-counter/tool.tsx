"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { ALargeSmall, Copy, RotateCcw, Type, Hash, Check, Shield, BookOpen } from "lucide-react"

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. This classic pangram contains every letter of the English alphabet at least once, making it a popular sentence for typography testing and keyboard demonstrations.

Character counting is essential in today's digital world. Social media platforms like Twitter/X enforce a strict 280-character limit per tweet, while Instagram captions can go up to 2,200 characters. SEO professionals need to keep meta descriptions under 160 characters to avoid truncation in Google search results.

Whether you're writing a tweet, crafting a meta description, composing an SMS message, or optimizing ad copy, knowing your exact character count helps you stay within limits and communicate effectively. This tool calculates everything in real-time — including UTF-8 byte size — so you always know exactly where you stand.`

interface LimitBarProps {
  value: number
  max: number
  label: string
}

function getBarColor(value: number, max: number): string {
  const pct = (value / max) * 100
  if (pct > 100) return "bg-red-500"
  if (pct >= 80) return "bg-yellow-500"
  return "bg-emerald-500"
}

function LimitBar({ value, max, label }: LimitBarProps) {
  const pct = Math.min((value / max) * 100, 100)
  const over = value > max
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={over ? "text-red-500 font-medium tabular-nums" : "text-muted-foreground tabular-nums"}>
          {value} / {max}
          {over && " ⚠"}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getBarColor(value, max)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground truncate">{label}</p>
          <p className="text-xl font-bold tracking-tight tabular-nums">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function CharacterCounterTool() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState(false)

  const stats = useMemo(() => {
    const raw = (text || "").trim()

    // Characters
    const charsWithSpaces = text.length
    const charsWithoutSpaces = text.replace(/\s/g, "").length

    // Words
    const words = raw.length === 0
      ? []
      : raw.split(/\s+/).filter((w) => w.length > 0)
    const wordCount = words.length

    // Sentences
    let sentenceCount = 0
    if (raw.length > 0) {
      const matches = raw.match(/[.!?]+(\s|$)/g)
      sentenceCount = matches ? matches.length : 0
      if (sentenceCount === 0) sentenceCount = 1
    }

    // Paragraphs
    let paragraphCount = 0
    if (raw.length > 0) {
      const paras = raw.split(/\n\s*\n/).filter((p) => (p || "").trim().length > 0)
      paragraphCount = paras.length
      if (paragraphCount <= 1) {
        const lines = raw.split(/\n/).filter((l) => (l || "").trim().length > 0)
        if (lines.length > 1) paragraphCount = lines.length
        else paragraphCount = raw.length > 0 ? 1 : 0
      }
    }

    // UTF-8 byte size
    const byteSize = new TextEncoder().encode(text).length

    return {
      charsWithSpaces,
      charsWithoutSpaces,
      wordCount,
      sentenceCount,
      paragraphCount,
      byteSize,
    }
  }, [text])

  const statsText = useMemo(() => {
    return `Characters (with spaces): ${stats.charsWithSpaces}\nCharacters (no spaces): ${stats.charsWithoutSpaces}\nWords: ${stats.wordCount}\nSentences: ${stats.sentenceCount}\nParagraphs: ${stats.paragraphCount}\nBytes (UTF-8): ${stats.byteSize}`
  }, [stats])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(statsText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [statsText])

  const handleClear = useCallback(() => {
    setText("")
  }, [])

  const handleSample = useCallback(() => {
    setText(SAMPLE_TEXT)
  }, [])

  return (
    <div className="space-y-6">
      {/* Textarea + Actions */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="text-input" className="text-base font-semibold flex items-center gap-2">
              <ALargeSmall className="size-4" />
              Enter or Paste Your Text
            </Label>
            <Badge variant="secondary" className="tabular-nums">
              {stats.charsWithSpaces} chars
            </Badge>
          </div>
          <Textarea
            id="text-input"
            placeholder="Start typing or paste your text here to see real-time character count, word count, and platform limit analysis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] sm:min-h-[260px] resize-y text-base leading-relaxed"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleSample}>
              <BookOpen className="size-4 mr-1.5" />
              Sample Text
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="size-4 mr-1.5" /> : <Copy className="size-4 mr-1.5" />}
              {copied ? "Copied!" : "Copy All Stats"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              <RotateCcw className="size-4 mr-1.5" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          icon={<Type className="size-5" />}
          label="Characters (with spaces)"
          value={stats.charsWithSpaces.toLocaleString()}
        />
        <StatCard
          icon={<Type className="size-5" />}
          label="Characters (no spaces)"
          value={stats.charsWithoutSpaces.toLocaleString()}
        />
        <StatCard
          icon={<Hash className="size-5" />}
          label="Words"
          value={stats.wordCount.toLocaleString()}
        />
        <StatCard
          icon={<ALargeSmall className="size-5" />}
          label="Sentences"
          value={stats.sentenceCount.toLocaleString()}
        />
        <StatCard
          icon={<ALargeSmall className="size-5" />}
          label="Paragraphs"
          value={stats.paragraphCount.toLocaleString()}
        />
        <StatCard
          icon={<Hash className="size-5" />}
          label="Bytes (UTF-8)"
          value={stats.byteSize.toLocaleString()}
        />
      </div>

      {/* Platform Limit Progress Bars */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Type className="size-4 text-muted-foreground" />
            Platform Character Limits
          </h3>
          <div className="space-y-3">
            <LimitBar
              value={stats.charsWithSpaces}
              max={280}
              label="Twitter / X Post"
            />
            <LimitBar
              value={stats.charsWithSpaces}
              max={150}
              label="Instagram Bio"
            />
            <LimitBar
              value={stats.charsWithSpaces}
              max={160}
              label="Meta Description (SEO)"
            />
            <LimitBar
              value={stats.charsWithSpaces}
              max={160}
              label="SMS Message"
            />
            <LimitBar
              value={stats.charsWithSpaces}
              max={30}
              label="Google Ad Title"
            />
            <LimitBar
              value={stats.charsWithSpaces}
              max={3000}
              label="LinkedIn Post"
            />
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
              All text analysis is performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
