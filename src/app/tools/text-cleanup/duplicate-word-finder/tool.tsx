"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Copy, Shield } from "lucide-react"

interface WordEntry {
  word: string
  count: number
}

export function DuplicateWordFinderTool() {
  const [text, setText] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [copied, setCopied] = useState(false)

  const analysis = useMemo(() => {
    const raw = text || ""
    if (raw.trim().length === 0) {
      return {
        totalWords: 0,
        uniqueWords: 0,
        duplicateCount: 0,
        duplicates: [] as WordEntry[],
        highlightedHtml: "",
        cleanedText: "",
      }
    }

    const words = raw.match(/\b[\w']+\b/g) || []
    const totalWords = words.length

    const freqMap = new Map<string, number>()
    for (const w of words) {
      const key = caseSensitive ? w : w.toLowerCase()
      freqMap.set(key, (freqMap.get(key) || 0) + 1)
    }

    const uniqueWords = freqMap.size
    const duplicates: WordEntry[] = []
    for (const [word, count] of freqMap.entries()) {
      if (count > 1) {
        duplicates.push({ word, count })
      }
    }
    duplicates.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    const duplicateCount = duplicates.reduce((sum, d) => sum + d.count, 0)

    // Build highlighted HTML
    const dupSet = new Set(duplicates.map((d) => d.word))
    let highlightedHtml = raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\b([\w']+)\b/g, (match) => {
        const key = caseSensitive ? match : match.toLowerCase()
        if (dupSet.has(key)) {
          return `<mark class="bg-amber-200 dark:bg-amber-800/60 rounded px-0.5 font-semibold">${match}</mark>`
        }
        return match
      })
      .replace(/\n/g, "<br />")

    // Cleaned text: remove duplicate occurrences (keep first)
    const seenWords = new Set<string>()
    const cleanedWords: string[] = []
    for (const w of words) {
      const key = caseSensitive ? w : w.toLowerCase()
      if (!seenWords.has(key)) {
        seenWords.add(key)
        cleanedWords.push(w)
      }
    }
    // Reconstruct cleaned text preserving non-word characters
    const cleanedText = raw.replace(/\b[\w']+\b/g, () => {
      if (cleanedWords.length > 0) return cleanedWords.shift() || ""
      return ""
    })

    return {
      totalWords,
      uniqueWords,
      duplicateCount,
      duplicates,
      highlightedHtml,
      cleanedText,
    }
  }, [text, caseSensitive])

  const handleCopyCleaned = useCallback(async () => {
    if ((analysis.cleanedText || "").trim().length === 0) return
    try {
      await navigator.clipboard.writeText(analysis.cleanedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [analysis.cleanedText])

  const hasText = (text || "").trim().length > 0

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dwf-input" className="text-base font-semibold flex items-center gap-2">
              <Copy className="size-4" />
              Enter Your Text
            </Label>
            <div className="flex items-center gap-2">
              <Switch
                id="case-sensitive"
                checked={caseSensitive}
                onCheckedChange={setCaseSensitive}
              />
              <Label htmlFor="case-sensitive" className="text-sm cursor-pointer">Case sensitive</Label>
            </div>
          </div>
          <Textarea
            id="dwf-input"
            placeholder="Paste or type your text here to find duplicate words..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[180px] sm:min-h-[220px] resize-y text-base leading-relaxed"
          />
        </CardContent>
      </Card>

      {/* Stats */}
      {hasText && (
        <div className="grid gap-3 grid-cols-3">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1">
              <span className="text-2xl font-bold tabular-nums">{analysis.totalWords}</span>
              <span className="text-xs text-muted-foreground">Total Words</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1">
              <span className="text-2xl font-bold tabular-nums">{analysis.uniqueWords}</span>
              <span className="text-xs text-muted-foreground">Unique Words</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1">
              <span className="text-2xl font-bold tabular-nums text-amber-600 dark:text-amber-400">{analysis.duplicateCount}</span>
              <span className="text-xs text-muted-foreground">Duplicate Occurrences</span>
            </CardContent>
          </Card>
        </div>
      )}

      {hasText && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Highlighted Text */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <Label className="text-base font-semibold">Highlighted Text</Label>
              <div
                className="min-h-[200px] sm:min-h-[260px] max-h-[400px] overflow-y-auto rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: analysis.highlightedHtml || "<span class=\"text-muted-foreground\">Duplicate words will be highlighted here...</span>" }}
              />
            </CardContent>
          </Card>

          {/* Duplicate Words List */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <Label className="text-base font-semibold">Duplicate Words ({analysis.duplicates.length})</Label>
              <div className="min-h-[200px] sm:min-h-[260px] max-h-[400px] overflow-y-auto space-y-2">
                {analysis.duplicates.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-4">No duplicate words found. All words are unique!</p>
                ) : (
                  analysis.duplicates.map((d) => (
                    <div key={d.word} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <span className="font-medium">{d.word}</span>
                      <Badge variant="secondary" className="tabular-nums">
                        {d.count}x
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cleaned Text & Actions */}
      {hasText && analysis.duplicates.length > 0 && (
        <>
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <Label className="text-base font-semibold">Text with Duplicates Removed</Label>
              <Textarea
                value={analysis.cleanedText}
                readOnly
                className="min-h-[120px] resize-y text-base leading-relaxed bg-muted/50"
              />
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyCleaned}>
                  <Copy className="size-4 mr-1.5" />
                  {copied ? "Copied!" : "Copy Cleaned Text"}
                </Button>
              </div>
            </CardContent>
          </Card>
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
              All duplicate word detection and text processing operations are performed entirely in your browser. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
