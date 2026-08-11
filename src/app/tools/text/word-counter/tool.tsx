"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { FileText, Copy, RotateCcw, BookOpen, Clock, MessageSquare, Type, Check, Shield } from "lucide-react"

const SAMPLE_TEXT = `The art of writing is the art of discovering what you believe. Every sentence you craft is a small step toward understanding your own thoughts more clearly. Whether you are writing a blog post, an essay, a novel, or a simple email, the words you choose matter.

Good writing is clear, concise, and compelling. It avoids unnecessary jargon and gets straight to the point. A well-written paragraph can convey complex ideas in a way that is easy to understand and enjoyable to read.

Here are some tips to improve your writing:
- Read widely and often to expand your vocabulary.
- Write every day, even if it is just a few sentences.
- Edit ruthlessly — remove words that do not add value.
- Read your writing aloud to catch awkward phrasing.
- Get feedback from others and be open to criticism.

Remember that writing is a process. The first draft does not have to be perfect. What matters is that you start writing and keep refining your work until it communicates exactly what you intend.`

function ProgressBbar({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  const pct = Math.min((value / max) * 100, 100)
  const over = value > max
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={over ? "text-red-500 font-medium" : "text-muted-foreground"}>
          {value} / {max}
          {over && " ⚠"}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-300 ${over ? "bg-red-500" : color}`}
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

export function WordCounterTool() {
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
      // If there's text but no ending punctuation, count as 1
      if (sentenceCount === 0) sentenceCount = 1
    }

    // Paragraphs
    let paragraphCount = 0
    if (raw.length > 0) {
      const paras = raw.split(/\n\s*\n/).filter((p) => (p || "").trim().length > 0)
      paragraphCount = paras.length
      // If splitting didn't produce multiple, count non-empty lines
      if (paragraphCount <= 1) {
        const lines = raw.split(/\n/).filter((l) => (l || "").trim().length > 0)
        if (lines.length > 1) paragraphCount = lines.length
        else paragraphCount = raw.length > 0 ? 1 : 0
      }
    }

    // Average word length
    const avgWordLength = wordCount > 0
      ? (charsWithoutSpaces / wordCount).toFixed(1)
      : "0"

    // Reading & speaking time
    const readingTime = Math.max(0, wordCount / 200)
    const speakingTime = Math.max(0, wordCount / 130)

    return {
      wordCount,
      charsWithSpaces,
      charsWithoutSpaces,
      sentenceCount,
      paragraphCount,
      avgWordLength,
      readingTime,
      speakingTime,
    }
  }, [text])

  const statsText = useMemo(() => {
    return `Words: ${stats.wordCount}\nCharacters (with spaces): ${stats.charsWithSpaces}\nCharacters (no spaces): ${stats.charsWithoutSpaces}\nSentences: ${stats.sentenceCount}\nParagraphs: ${stats.paragraphCount}\nAvg Word Length: ${stats.avgWordLength} chars\nReading Time: ${stats.readingTime.toFixed(1)} min\nSpeaking Time: ${stats.speakingTime.toFixed(1)} min`
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

  const formatTime = (minutes: number) => {
    if (minutes < 1) return "< 1 min"
    return `${minutes.toFixed(1)} min`
  }

  return (
    <div className="space-y-6">
      {/* Textarea + Actions */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="text-input" className="text-base font-semibold flex items-center gap-2">
              <FileText className="size-4" />
              Enter or Paste Your Text
            </Label>
            <Badge variant="secondary" className="tabular-nums">
              {stats.charsWithSpaces} chars
            </Badge>
          </div>
          <Textarea
            id="text-input"
            placeholder="Start typing or paste your text here to see real-time word count and text statistics..."
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={<Type className="size-5" />}
          label="Words"
          value={stats.wordCount.toLocaleString()}
        />
        <StatCard
          icon={<FileText className="size-5" />}
          label="Characters (with spaces)"
          value={stats.charsWithSpaces.toLocaleString()}
        />
        <StatCard
          icon={<FileText className="size-5" />}
          label="Characters (no spaces)"
          value={stats.charsWithoutSpaces.toLocaleString()}
        />
        <StatCard
          icon={<MessageSquare className="size-5" />}
          label="Sentences"
          value={stats.sentenceCount.toLocaleString()}
        />
        <StatCard
          icon={<Type className="size-5" />}
          label="Paragraphs"
          value={stats.paragraphCount.toLocaleString()}
        />
        <StatCard
          icon={<Type className="size-5" />}
          label="Avg Word Length"
          value={`${stats.avgWordLength} chars`}
        />
        <StatCard
          icon={<Clock className="size-5" />}
          label="Reading Time"
          value={formatTime(stats.readingTime)}
        />
        <StatCard
          icon={<Clock className="size-5" />}
          label="Speaking Time"
          value={formatTime(stats.speakingTime)}
        />
      </div>

      {/* Character Limit Progress Bars */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <FileText className="size-4 text-muted-foreground" />
            Character Limit Check
          </h3>
          <div className="space-y-3">
            <ProgressBbar
              value={stats.charsWithSpaces}
              max={280}
              label="Twitter / X"
              color="bg-sky-500"
            />
            <ProgressBbar
              value={stats.charsWithSpaces}
              max={160}
              label="SMS"
              color="bg-emerald-500"
            />
            <ProgressBbar
              value={stats.charsWithSpaces}
              max={500}
              label="Meta Description"
              color="bg-amber-500"
            />
            <ProgressBbar
              value={stats.charsWithSpaces}
              max={2000}
              label="LinkedIn Post"
              color="bg-violet-500"
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
