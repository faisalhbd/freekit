"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { AlignLeft, Copy, RotateCcw, RefreshCw, FileText, Check, Shield } from "lucide-react"

// ── Latin-like word bank (100+ unique words) ──────────────────────────────────
const LATIN_WORDS: string[] = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
  "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
  "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores",
  "quas", "molestias", "excepturi", "occaecati", "cupiditate", "provident",
  "similique", "perspiciatis", "unde", "omnis", "iste", "natus", "error",
  "voluptatem", "accusantium", "doloremque", "laudantium", "totam", "rem",
  "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis",
  "quasi", "architecto", "beatae", "vitae", "dicta", "explicabo", "nemo",
  "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit", "fugit",
  "consequuntur", "magni", "ratione", "sequi", "nesciunt", "neque", "porro",
  "quisquam", "dolorem", "numquam", "eius", "modi", "tempora", "magnam",
  "aliquam", "quaerat", "minima", "nostrum", "exercitationem", "ullam",
  "corporis", "suscipit", "laboriosam", "aliquid", "commodi",
]

// Classic opening words that start traditional Lorem Ipsum
const CLASSIC_OPENING = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
]

type Unit = "paragraphs" | "sentences" | "words"

const UNIT_LIMITS: Record<Unit, { min: number; max: number; label: string }> = {
  paragraphs: { min: 1, max: 100, label: "Paragraphs" },
  sentences: { min: 1, max: 200, label: "Sentences" },
  words: { min: 1, max: 1000, label: "Words" },
}

function pickRandom(arr: string[], count: number): string[] {
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    result.push(arr[Math.floor(Math.random() * arr.length)])
  }
  return result
}

function capitalize(s: string): string {
  if (s.length === 0) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function generateSentence(wordCount: number): string {
  const words = pickRandom(LATIN_WORDS, wordCount)
  words[0] = capitalize(words[0])
  // Vary sentence length by occasionally adding commas
  if (words.length > 6) {
    const commaPos = Math.floor(Math.random() * (words.length - 4)) + 3
    words[commaPos] = words[commaPos] + ","
  }
  return words.join(" ") + "."
}

function generateParagraph(sentenceCount: number): string {
  const sentenceLengths: number[] = []
  for (let i = 0; i < sentenceCount; i++) {
    // Natural sentence length: 6-18 words
    sentenceLengths.push(Math.floor(Math.random() * 13) + 6)
  }
  return sentenceLengths.map((len) => generateSentence(len)).join(" ")
}

function generateText(unit: Unit, count: number, classicStart: boolean): string {
  switch (unit) {
    case "paragraphs": {
      const sentencesPerParagraph = Math.max(3, Math.floor(count / 2))
      const paragraphs: string[] = []
      for (let i = 0; i < count; i++) {
        // Vary paragraph sentence count: 3-7 sentences
        const sCount = Math.floor(Math.random() * 5) + 3
        const para = generateParagraph(sCount)
        paragraphs.push(para)
      }
      let result = paragraphs.join("\n\n")
      if (classicStart) {
        // Replace the first paragraph's opening with the classic text
        const classicText = CLASSIC_OPENING[0]
        result = classicText + " " + result
      }
      return result
    }
    case "sentences": {
      const sentences: string[] = []
      for (let i = 0; i < count; i++) {
        const len = Math.floor(Math.random() * 13) + 6
        sentences.push(generateSentence(len))
      }
      let result = sentences.join(" ")
      if (classicStart) {
        result = CLASSIC_OPENING.slice(0, Math.min(3, count)).join(" ") + " " + result
      }
      return result
    }
    case "words": {
      const words = pickRandom(LATIN_WORDS, count)
      if (classicStart) {
        // Replace first few words with classic opening
        const classicWords = CLASSIC_OPENING[0].replace(/[^\w\s]/g, "").split(/\s+/).slice(0, 5)
        for (let i = 0; i < Math.min(classicWords.length, count); i++) {
          words[i] = classicWords[i]
        }
      }
      words[0] = capitalize(words[0])
      return words.join(" ") + "."
    }
  }
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card>
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

export function LoremIpsumGeneratorTool() {
  const [unit, setUnit] = useState<Unit>("paragraphs")
  const [count, setCount] = useState(5)
  const [classicStart, setClassicStart] = useState(true)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const limits = UNIT_LIMITS[unit]

  const handleCountChange = useCallback((v: string) => {
    const raw = (v || "").trim()
    if (raw === "") {
      setCount("")
      return
    }
    const num = parseInt(raw, 10)
    if (!isNaN(num)) {
      setCount(num)
    }
  }, [])

  const clampedCount = useMemo(() => {
    if (count === "" || typeof count === "string") return limits.min
    const num = typeof count === "number" ? count : parseInt(count, 10)
    if (isNaN(num)) return limits.min
    return Math.max(limits.min, Math.min(limits.max, num))
  }, [count, limits])

  const handleGenerate = useCallback(() => {
    const text = generateText(unit, clampedCount, classicStart)
    setOutput(text)
  }, [unit, clampedCount, classicStart])

  const handleCopy = useCallback(async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [output])

  const handleClear = useCallback(() => {
    setOutput("")
  }, [])

  const stats = useMemo(() => {
    const raw = (output || "").trim()
    if (raw.length === 0) {
      return { words: 0, characters: 0, paragraphs: 0 }
    }
    const wordCount = raw.split(/\s+/).filter((w) => (w || "").trim().length > 0).length
    const charCount = output.length
    const paraCount = raw.split(/\n\s*\n/).filter((p) => (p || "").trim().length > 0).length || 1
    return { words: wordCount, characters: charCount, paragraphs: paraCount }
  }, [output])

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-5">
          <div className="flex items-center gap-2">
            <AlignLeft className="size-4 text-primary" />
            <h2 className="text-base font-semibold">Generator Settings</h2>
          </div>

          {/* Unit Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Generate By</Label>
            <div className="flex rounded-lg border border-input bg-background p-1 gap-1">
              {(["paragraphs", "sentences", "words"] as Unit[]).map((u) => (
                <Button
                  key={u}
                  variant={unit === u ? "default" : "ghost"}
                  size="sm"
                  className="flex-1 capitalize"
                  onClick={() => {
                    setUnit(u)
                    const newLimits = UNIT_LIMITS[u]
                    const currentCount = typeof count === "number" ? count : parseInt(String(count), 10) || newLimits.min
                    const clamped = Math.max(newLimits.min, Math.min(newLimits.max, currentCount))
                    setCount(clamped)
                  }}
                >
                  {u}
                </Button>
              ))}
            </div>
          </div>

          {/* Number Input */}
          <div className="space-y-2">
            <Label htmlFor="lorem-count" className="text-sm font-medium">
              Number of {limits.label}
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="lorem-count"
                type="number"
                min={limits.min}
                max={limits.max}
                value={count}
                onChange={(e) => handleCountChange(e.target.value)}
                className="w-32"
                placeholder={`${limits.min}-${limits.max}`}
              />
              <Badge variant="secondary" className="tabular-nums">
                {limits.min}–{limits.max}
              </Badge>
            </div>
          </div>

          {/* Classic Start Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="classic-start" className="text-sm font-medium cursor-pointer">
                Start with classic &ldquo;Lorem ipsum dolor sit amet&hellip;&rdquo;
              </Label>
              <p className="text-xs text-muted-foreground">
                {classicStart
                  ? "Text will begin with the traditional opening passage."
                  : "Text will start with random words from the word pool."}
              </p>
            </div>
            <Switch
              id="classic-start"
              checked={classicStart}
              onCheckedChange={setClassicStart}
            />
          </div>

          <Separator />

          {/* Generate Button */}
          <Button size="lg" className="w-full" onClick={handleGenerate}>
            <RefreshCw className="size-4 mr-2" />
            Generate {limits.label}
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <FileText className="size-4" />
              Generated Text
            </Label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="tabular-nums">
                {stats.words.toLocaleString()} words
              </Badge>
              <Badge variant="secondary" className="tabular-nums">
                {stats.characters.toLocaleString()} chars
              </Badge>
              <Badge variant="secondary" className="tabular-nums">
                {stats.paragraphs.toLocaleString()} para{stats.paragraphs !== 1 ? "s" : ""}
              </Badge>
            </div>
          </div>
          <Textarea
            readOnly
            value={output}
            placeholder={'Click "Generate" to create placeholder text...'}
            className="min-h-[240px] sm:min-h-[320px] resize-y text-base leading-relaxed font-mono"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
              {copied ? <Check className="size-4 mr-1.5" /> : <Copy className="size-4 mr-1.5" />}
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear} disabled={!output}>
              <RotateCcw className="size-4 mr-1.5" />
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={handleGenerate}>
              <RefreshCw className="size-4 mr-1.5" />
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={<AlignLeft className="size-5" />}
          label="Words"
          value={stats.words.toLocaleString()}
        />
        <StatCard
          icon={<FileText className="size-5" />}
          label="Characters"
          value={stats.characters.toLocaleString()}
        />
        <StatCard
          icon={<FileText className="size-5" />}
          label="Paragraphs"
          value={stats.paragraphs.toLocaleString()}
        />
      </div>

      <Separator />

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Everything Runs in Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              Text generation happens entirely client-side. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
