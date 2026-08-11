"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { AlignLeft, Copy, Shield, ArrowRightLeft, Minus, Maximize2 } from "lucide-react"

export function SentenceCounterTool() {
  const [text, setText] = useState("")
  const [highlightLongest, setHighlightLongest] = useState(false)
  const [highlightShortest, setHighlightShortest] = useState(false)
  const [copied, setCopied] = useState(false)

  const stats = useMemo(() => {
    const raw = text || ""
    if (raw.length === 0) {
      return {
        sentences: 0,
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        paragraphs: 0,
        avgWordsPerSentence: 0,
        avgSentenceLengthChars: 0,
        longestSentenceWords: 0,
        longestSentenceText: "",
        shortestSentenceWords: 0,
        shortestSentenceText: "",
        sentenceList: [] as string[],
      }
    }

    const characters = raw.length
    const charactersNoSpaces = raw.replace(/\s/g, "").length
    const words = raw.split(/\s+/).filter((w) => w.length > 0).length
    const paragraphs = raw.split(/\n\s*\n/).filter((p) => (p || "").trim().length > 0).length || (raw.trim().length > 0 ? 1 : 0)

    // Split into sentences
    const sentenceList = raw
      .replace(/\n+/g, " ")
      .split(/(?<=[.!?])\s+/)
      .map((s) => (s || "").trim())
      .filter((s) => s.length > 0)

    const sentences = sentenceList.length || (raw.trim().length > 0 ? 1 : 0)

    let longestSentenceWords = 0
    let longestSentenceText = ""
    let shortestSentenceWords = Infinity
    let shortestSentenceText = ""

    for (const s of sentenceList) {
      const wc = s.split(/\s+/).filter((w) => w.length > 0).length
      if (wc > longestSentenceWords) {
        longestSentenceWords = wc
        longestSentenceText = s
      }
      if (wc < shortestSentenceWords && wc > 0) {
        shortestSentenceWords = wc
        shortestSentenceText = s
      }
    }

    if (shortestSentenceWords === Infinity) shortestSentenceWords = 0

    const avgWordsPerSentence = sentences > 0 ? Math.round((words / sentences) * 10) / 10 : 0
    const totalSentenceChars = sentenceList.reduce((acc, s) => acc + s.length, 0)
    const avgSentenceLengthChars = sentences > 0 ? Math.round((totalSentenceChars / sentences) * 10) / 10 : 0

    return {
      sentences,
      words,
      characters,
      charactersNoSpaces,
      paragraphs,
      avgWordsPerSentence,
      avgSentenceLengthChars,
      longestSentenceWords,
      longestSentenceText,
      shortestSentenceWords,
      shortestSentenceText,
      sentenceList,
    }
  }, [text])

  const statsText = useMemo(() => {
    if (stats.sentences === 0) return ""
    return `Sentences: ${stats.sentences}
Words: ${stats.words}
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Paragraphs: ${stats.paragraphs}
Avg words/sentence: ${stats.avgWordsPerSentence}
Avg sentence length (chars): ${stats.avgSentenceLengthChars}
Longest sentence: ${stats.longestSentenceWords} words`
  }, [stats])

  const handleCopy = useCallback(async () => {
    if ((statsText || "").trim().length === 0) return
    try {
      await navigator.clipboard.writeText(statsText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [statsText])

  const hasText = (text || "").trim().length > 0

  const statCards = [
    { label: "Sentences", value: stats.sentences, icon: AlignLeft },
    { label: "Words", value: stats.words, icon: ArrowRightLeft },
    { label: "Characters", value: stats.characters, icon: Maximize2 },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces, icon: Minus },
    { label: "Paragraphs", value: stats.paragraphs, icon: AlignLeft },
    { label: "Avg words/sentence", value: stats.avgWordsPerSentence, icon: ArrowRightLeft },
    { label: "Avg sentence length (chars)", value: stats.avgSentenceLengthChars, icon: Maximize2 },
    { label: "Longest sentence (words)", value: stats.longestSentenceWords, icon: Maximize2 },
  ]

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sc-input" className="text-base font-semibold flex items-center gap-2">
              <AlignLeft className="size-4" />
              Enter Your Text
            </Label>
            {hasText && (
              <Badge variant="secondary" className="tabular-nums">
                {stats.sentences} sentence{stats.sentences !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          <Textarea
            id="sc-input"
            placeholder="Paste or type your text here to count sentences, words, and get detailed statistics..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] sm:min-h-[260px] resize-y text-base leading-relaxed"
          />
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="highlight-longest"
                checked={highlightLongest}
                onCheckedChange={setHighlightLongest}
              />
              <Label htmlFor="highlight-longest" className="text-sm cursor-pointer">Highlight longest</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="highlight-shortest"
                checked={highlightShortest}
                onCheckedChange={setHighlightShortest}
              />
              <Label htmlFor="highlight-shortest" className="text-sm cursor-pointer">Highlight shortest</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      {hasText && (
        <>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            {statCards.map((card) => {
              const Icon = card.icon
              return (
                <Card key={card.label}>
                  <CardContent className="p-4 flex flex-col items-center text-center gap-1">
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="text-2xl font-bold tabular-nums">{card.value}</span>
                    <span className="text-xs text-muted-foreground">{card.label}</span>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Highlighted Sentences */}
          {(highlightLongest || highlightShortest) && stats.sentenceList.length > 0 && (
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-3">
                <Label className="text-base font-semibold">Sentence Analysis</Label>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {stats.sentenceList.map((sentence, idx) => {
                    const isLongest = highlightLongest && sentence === stats.longestSentenceText
                    const isShortest = highlightShortest && sentence === stats.shortestSentenceText
                    let bgClass = ""
                    let badge = null
                    if (isLongest) {
                      bgClass = "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-lg p-2"
                      badge = <Badge variant="outline" className="text-amber-700 dark:text-amber-400 text-xs">Longest ({stats.longestSentenceWords} words)</Badge>
                    }
                    if (isShortest) {
                      bgClass = "bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/40 rounded-lg p-2"
                      badge = <Badge variant="outline" className="text-sky-700 dark:text-sky-400 text-xs">Shortest ({stats.shortestSentenceWords} words)</Badge>
                    }
                    const wc = sentence.split(/\s+/).filter((w) => w.length > 0).length
                    return (
                      <div key={idx} className={bgClass || "px-2 py-1"}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm leading-relaxed">
                            <span className="text-muted-foreground mr-2 tabular-nums text-xs">#{idx + 1}</span>
                            {sentence}
                          </p>
                          {badge}
                        </div>
                        <span className="text-xs text-muted-foreground tabular-nums">{wc} word{wc !== 1 ? "s" : ""}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Copy Stats */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="size-4 mr-1.5" />
              {copied ? "Copied!" : "Copy Stats"}
            </Button>
          </div>

          <Separator />
        </>
      )}

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your Text Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All sentence counting and text analysis operations are performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
