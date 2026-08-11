"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Space, Copy, RotateCcw, ArrowLeftRight, Shield } from "lucide-react"

export function RemoveExtraSpacesTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  // Options
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true)
  const [trimLines, setTrimLines] = useState(false)
  const [removeTabs, setRemoveTabs] = useState(false)
  const [removeBlankLines, setRemoveBlankLines] = useState(false)
  const [normalizeBreaks, setNormalizeBreaks] = useState(false)

  // Stats
  const [charsRemoved, setCharsRemoved] = useState(0)
  const [wordsRemoved, setWordsRemoved] = useState(0)
  const [linesRemoved, setLinesRemoved] = useState(0)

  const processText = useCallback(() => {
    const raw = (input || "")
    if (raw.length === 0) return

    const originalChars = raw.length
    const originalWords = raw.split(/\s+/).filter((w) => w.length > 0).length
    const originalLines = raw.split("\n").length

    let result = raw

    // Normalize line breaks first
    if (normalizeBreaks) {
      result = result.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
    }

    // Remove tabs
    if (removeTabs) {
      result = result.replace(/\t/g, " ")
    }

    const lines = result.split("\n")
    const processedLines: string[] = []

    for (const line of lines) {
      let processed = line

      // Trim leading/trailing spaces
      if (trimLines) {
        processed = (processed || "").trim()
      }

      // Remove extra spaces between words
      if (removeExtraSpaces) {
        processed = processed.replace(/ {2,}/g, " ")
      }

      // Skip blank lines
      if (removeBlankLines && (processed || "").trim().length === 0) {
        continue
      }

      processedLines.push(processed)
    }

    const finalResult = processedLines.join("\n")
    setOutput(finalResult)

    const finalChars = finalResult.length
    const finalWords = finalResult.split(/\s+/).filter((w) => w.length > 0).length
    const finalLines = finalResult.split("\n").length

    setCharsRemoved(Math.max(0, originalChars - finalChars))
    setWordsRemoved(Math.max(0, originalWords - finalWords))
    setLinesRemoved(Math.max(0, originalLines - finalLines))
  }, [input, removeExtraSpaces, trimLines, removeTabs, removeBlankLines, normalizeBreaks])

  const handleCopy = useCallback(async () => {
    if ((output || "").trim().length === 0) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setCharsRemoved(0)
    setWordsRemoved(0)
    setLinesRemoved(0)
  }, [])

  const handleSwap = useCallback(() => {
    setInput(output)
    setOutput("")
    setCharsRemoved(0)
    setWordsRemoved(0)
    setLinesRemoved(0)
  }, [output])

  const liveInputLines = (input || "").length === 0 ? 0 : (input || "").split("\n").length
  const hasStats = charsRemoved > 0 || wordsRemoved > 0 || linesRemoved > 0

  return (
    <div className="space-y-6">
      {/* Options */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Space className="size-4" />
            Cleanup Options
          </Label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { id: "extra-spaces", label: "Remove extra spaces", checked: removeExtraSpaces, setter: setRemoveExtraSpaces },
              { id: "trim-lines", label: "Remove leading/trailing spaces", checked: trimLines, setter: setTrimLines },
              { id: "remove-tabs", label: "Remove all tabs", checked: removeTabs, setter: setRemoveTabs },
              { id: "blank-lines", label: "Remove blank lines", checked: removeBlankLines, setter: setRemoveBlankLines },
              { id: "normalize-breaks", label: "Normalize line breaks", checked: normalizeBreaks, setter: setNormalizeBreaks },
            ].map((opt) => (
              <div key={opt.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Checkbox
                  id={opt.id}
                  checked={opt.checked}
                  onCheckedChange={(v) => opt.setter(!!v)}
                />
                <Label htmlFor={opt.id} className="text-sm cursor-pointer">
                  {opt.label}
                </Label>
              </div>
            ))}
          </div>
          <Button onClick={processText} disabled={(input || "").trim().length === 0} className="w-full" size="lg">
            <Space className="size-4 mr-2" />
            Clean Up Text
          </Button>
        </CardContent>
      </Card>

      {/* Input + Output */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="res-input" className="text-base font-semibold">Input Text</Label>
              <Badge variant="secondary" className="tabular-nums">
                {liveInputLines} line{liveInputLines !== 1 ? "s" : ""}
              </Badge>
            </div>
            <Textarea
              id="res-input"
              placeholder="Paste or type your text here — extra spaces, tabs, and blank lines will be cleaned up..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[280px] sm:min-h-[340px] resize-y text-base leading-relaxed"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="res-output" className="text-base font-semibold">Output</Label>
              <Badge variant="secondary" className="tabular-nums">
                {(output || "").length} chars
              </Badge>
            </div>
            <Textarea
              id="res-output"
              value={output}
              readOnly
              placeholder="Cleaned text will appear here..."
              className="min-h-[280px] sm:min-h-[340px] resize-y text-base leading-relaxed bg-muted/50"
            />
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      {hasStats && (
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="text-sm px-3 py-1 text-emerald-600 dark:text-emerald-400">
            {charsRemoved} character{charsRemoved !== 1 ? "s" : ""} removed
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1 text-emerald-600 dark:text-emerald-400">
            {wordsRemoved} word{wordsRemoved !== 1 ? "s" : ""} removed
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1 text-emerald-600 dark:text-emerald-400">
            {linesRemoved} line{linesRemoved !== 1 ? "s" : ""} removed
          </Badge>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy} disabled={(output || "").trim().length === 0}>
          <Copy className="size-4 mr-1.5" />
          {copied ? "Copied!" : "Copy Output"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleClear}>
          <RotateCcw className="size-4 mr-1.5" />
          Clear
        </Button>
        <Button variant="outline" size="sm" onClick={handleSwap} disabled={(output || "").trim().length === 0}>
          <ArrowLeftRight className="size-4 mr-1.5" />
          Swap
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
              All space removal and text cleanup operations are performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
