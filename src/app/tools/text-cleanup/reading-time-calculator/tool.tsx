"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Copy, RotateCcw, Clock, Mic, Shield } from "lucide-react"

function formatTime(totalSeconds: number): string {
  if (totalSeconds < 1) return "0 sec"
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.round(totalSeconds % 60)
  if (minutes === 0) return `${seconds} sec`
  return `${minutes} min ${seconds} sec`
}

function countSentences(text: string): number {
  const matches = (text || "").match(/[^.!?]*[.!?]+/g)
  return matches ? matches.length : 0
}

function countParagraphs(text: string): number {
  const raw = (text || "")
  if (raw.length === 0) return 0
  const paragraphs = raw.split(/\n\s*\n/)
  const nonEmpty = paragraphs.filter((p) => (p || "").trim().length > 0)
  return nonEmpty.length
}

export function ReadingTimeCalculatorTool() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)

  const [readingWPM, setReadingWPM] = useState(200)
  const [speakingWPM, setSpeakingWPM] = useState(130)

  const handleCopy = useCallback(async () => {
    const raw = (input || "")
    if (raw.length === 0) return

    const words = raw.split(/\s+/).filter((w) => w.length > 0)
    const wordCount = words.length
    const charCount = raw.length
    const charNoSpaces = raw.replace(/\s/g, "").length
    const sentences = countSentences(raw)
    const paragraphs = countParagraphs(raw)
    const readingSeconds = (wordCount / readingWPM) * 60
    const speakingSeconds = (wordCount / speakingWPM) * 60

    const stats = `Word Count: ${wordCount}
Characters: ${charCount}
Characters (no spaces): ${charNoSpaces}
Sentences: ${sentences}
Paragraphs: ${paragraphs}
Reading Time: ${formatTime(readingSeconds)} (${readingWPM} WPM)
Speaking Time: ${formatTime(speakingSeconds)} (${speakingWPM} WPM)`

    try {
      await navigator.clipboard.writeText(stats)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [input, readingWPM, speakingWPM])

  const handleClear = useCallback(() => {
    setInput("")
  }, [])

  // Computed stats
  const raw = (input || "")
  const words = raw.split(/\s+/).filter((w) => w.length > 0)
  const wordCount = words.length
  const charCount = raw.length
  const charNoSpaces = raw.replace(/\s/g, "").length
  const sentences = countSentences(raw)
  const paragraphs = countParagraphs(raw)
  const readingSeconds = (wordCount / readingWPM) * 60
  const speakingSeconds = (wordCount / speakingWPM) * 60

  // Progress bar: map reading time to 0-100 scale
  // Under 1 min = ~10%, 5 min = ~40%, 10 min = ~60%, 20+ min = ~90-100%
  const readingProgress = Math.min(100, Math.round((Math.log10(readingSeconds + 1) / Math.log10(1201)) * 100))

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="rtc-input" className="text-base font-semibold flex items-center gap-2">
              <BookOpen className="size-4" />
              Enter Your Text
            </Label>
            <Badge variant="secondary" className="tabular-nums">
              {wordCount} word{wordCount !== 1 ? "s" : ""}
            </Badge>
          </div>
          <Textarea
            id="rtc-input"
            placeholder="Paste or type your text here to calculate reading time, speaking time, and text statistics..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[280px] sm:min-h-[340px] resize-y text-base leading-relaxed"
          />
        </CardContent>
      </Card>

      {/* Speed Controls */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Clock className="size-4" />
              Reading Speed
            </Label>
            <div className="space-y-3">
              <Slider
                value={[readingWPM]}
                onValueChange={(v) => setReadingWPM(v[0])}
                min={100}
                max={400}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>100 WPM</span>
                <span className="font-semibold text-foreground">{readingWPM} WPM</span>
                <span>400 WPM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Mic className="size-4" />
              Speaking Speed
            </Label>
            <div className="space-y-3">
              <Slider
                value={[speakingWPM]}
                onValueChange={(v) => setSpeakingWPM(v[0])}
                min={80}
                max={200}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>80 WPM</span>
                <span className="font-semibold text-foreground">{speakingWPM} WPM</span>
                <span>200 WPM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {wordCount > 0 && (
        <>
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <Label className="text-base font-semibold">Text Statistics</Label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Words", value: wordCount.toLocaleString() },
                  { label: "Characters", value: charCount.toLocaleString() },
                  { label: "Characters (no spaces)", value: charNoSpaces.toLocaleString() },
                  { label: "Sentences", value: sentences.toLocaleString() },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-border p-4 text-center">
                    <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Paragraphs", value: paragraphs.toLocaleString() },
                  { label: "Reading Time", value: formatTime(readingSeconds), highlight: true },
                  { label: "Speaking Time", value: formatTime(speakingSeconds), highlight: true },
                  { label: "Avg Words/Sentence", value: sentences > 0 ? Math.round(wordCount / sentences).toString() : "0" },
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-lg border p-4 text-center ${stat.highlight ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                    <p className={`text-2xl font-bold tabular-nums ${stat.highlight ? "text-primary" : ""}`}>{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reading Time Progress Bar */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Reading Time Estimate</Label>
                <span className="text-sm font-semibold tabular-nums">{formatTime(readingSeconds)}</span>
              </div>
              <Progress value={readingProgress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Quick read</span>
                <span>5 min</span>
                <span>10 min</span>
                <span>Long read</span>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy} disabled={wordCount === 0}>
          <Copy className="size-4 mr-1.5" />
          {copied ? "Copied!" : "Copy Stats"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleClear}>
          <RotateCcw className="size-4 mr-1.5" />
          Clear
        </Button>
      </div>

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
              All reading time calculations and text analysis are performed entirely in your browser. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
