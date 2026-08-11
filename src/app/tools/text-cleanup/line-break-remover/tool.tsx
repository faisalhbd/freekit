"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { WrapText, Copy, RotateCcw, ArrowLeftRight, Shield } from "lucide-react"

type Mode = "remove-all" | "remove-double" | "to-spaces" | "to-comma"

export function LineBreakRemoverTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<Mode>("remove-all")
  const [breaksProcessed, setBreaksProcessed] = useState(0)

  const processText = useCallback(() => {
    const raw = (input || "")
    if (raw.length === 0) return

    let result = raw
    let count = 0

    // Normalize all line breaks to \n first
    const normalized = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n")

    switch (mode) {
      case "remove-all": {
        const matches = normalized.match(/\n/g)
        count = matches ? matches.length : 0
        result = normalized.replace(/\n/g, "")
        break
      }
      case "remove-double": {
        const before = normalized.split("\n").length
        result = normalized.replace(/\n{2,}/g, "\n")
        const after = result.split("\n").length
        count = Math.max(0, before - after)
        break
      }
      case "to-spaces": {
        const matches = normalized.match(/\n/g)
        count = matches ? matches.length : 0
        result = normalized.replace(/\n/g, " ")
        break
      }
      case "to-comma": {
        const lines = normalized.split("\n")
        const nonEmpty = lines.filter((l) => (l || "").trim().length > 0)
        count = nonEmpty.length - 1
        result = nonEmpty.join(", ")
        break
      }
    }

    setOutput(result)
    setBreaksProcessed(Math.max(0, count))
  }, [input, mode])

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
    setBreaksProcessed(0)
  }, [])

  const handleSwap = useCallback(() => {
    setInput(output)
    setOutput("")
    setBreaksProcessed(0)
  }, [output])

  const liveInputLines = (input || "").length === 0 ? 0 : (input || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").length

  const options: { value: Mode; label: string; desc: string }[] = [
    { value: "remove-all", label: "Remove all line breaks", desc: "Join all lines into one continuous block" },
    { value: "remove-double", label: "Remove double line breaks", desc: "Keep single breaks, collapse multiple" },
    { value: "to-spaces", label: "Convert to spaces", desc: "Replace each line break with a space" },
    { value: "to-comma", label: "Convert to comma-separated", desc: "Join lines with commas" },
  ]

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <Label className="text-base font-semibold flex items-center gap-2">
            <WrapText className="size-4" />
            Line Break Mode
          </Label>
          <RadioGroup value={mode} onValueChange={(v) => setMode(v as Mode)} className="space-y-3">
            {options.map((opt) => (
              <div key={opt.value} className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem id={opt.value} value={opt.value} className="mt-0.5" />
                <Label htmlFor={opt.value} className="cursor-pointer">
                  <span className="text-sm font-medium">{opt.label}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{opt.desc}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Button onClick={processText} disabled={(input || "").trim().length === 0} className="w-full" size="lg">
            <WrapText className="size-4 mr-2" />
            Process Text
          </Button>
        </CardContent>
      </Card>

      {/* Input + Output */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lbr-input" className="text-base font-semibold">Input Text</Label>
              <Badge variant="secondary" className="tabular-nums">
                {liveInputLines} line{liveInputLines !== 1 ? "s" : ""}
              </Badge>
            </div>
            <Textarea
              id="lbr-input"
              placeholder="Paste or type your text with line breaks here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[280px] sm:min-h-[340px] resize-y text-base leading-relaxed"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lbr-output" className="text-base font-semibold">Output</Label>
              <Badge variant="secondary" className="tabular-nums">
                {(output || "").length} chars
              </Badge>
            </div>
            <Textarea
              id="lbr-output"
              value={output}
              readOnly
              placeholder="Processed text will appear here..."
              className="min-h-[280px] sm:min-h-[340px] resize-y text-base leading-relaxed bg-muted/50"
            />
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      {breaksProcessed > 0 && (
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="text-sm px-3 py-1 text-emerald-600 dark:text-emerald-400">
            {breaksProcessed} line break{breaksProcessed !== 1 ? "s" : ""} processed
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
              All line break removal and conversion operations are performed entirely in your browser. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
