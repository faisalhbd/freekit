"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ListOrdered, Copy, RotateCcw, ArrowLeftRight, Shield, Sparkles } from "lucide-react"

export function ListCleanerTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const [removeEmptyLines, setRemoveEmptyLines] = useState(true)
  const [removeDuplicates, setRemoveDuplicates] = useState(false)
  const [trimWhitespace, setTrimWhitespace] = useState(true)
  const [sortAZ, setSortAZ] = useState(false)
  const [sortZA, setSortZA] = useState(false)
  const [removeNumbering, setRemoveNumbering] = useState(false)
  const [removeBulletPoints, setRemoveBulletPoints] = useState(false)
  const [addNumbering, setAddNumbering] = useState(false)
  const [addBulletPoints, setAddBulletPoints] = useState(false)

  const processList = useCallback(() => {
    const raw = input || ""
    if (raw.length === 0) return

    let lines = raw.split("\n")

    // Trim whitespace per line
    if (trimWhitespace) {
      lines = lines.map((l) => (l || "").trim())
    }

    // Remove empty lines
    if (removeEmptyLines) {
      lines = lines.filter((l) => (l || "").trim().length > 0)
    }

    // Remove numbering (1. 2. 3. or 1) 2) 3))
    if (removeNumbering) {
      lines = lines.map((l) => (l || "").replace(/^\d+[.)]\s*/, ""))
    }

    // Remove bullet points (- * •)
    if (removeBulletPoints) {
      lines = lines.map((l) => (l || "").replace(/^[\-\*•]\s*/, ""))
    }

    // Remove duplicates (case-insensitive)
    if (removeDuplicates) {
      const seen = new Set<string>()
      lines = lines.filter((l) => {
        const key = (l || "").toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    }

    // Sort
    if (sortAZ) {
      lines = [...lines].sort((a, b) => (a || "").localeCompare(b || ""))
    } else if (sortZA) {
      lines = [...lines].sort((a, b) => (b || "").localeCompare(a || ""))
    }

    // Add numbering
    if (addNumbering) {
      lines = lines.map((l, i) => `${i + 1}. ${l || ""}`)
    }

    // Add bullet points
    if (addBulletPoints && !addNumbering) {
      lines = lines.map((l) => `- ${l || ""}`)
    }

    setOutput(lines.join("\n"))
  }, [input, removeEmptyLines, removeDuplicates, trimWhitespace, sortAZ, sortZA, removeNumbering, removeBulletPoints, addNumbering, addBulletPoints])

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
  }, [])

  const handleSwap = useCallback(() => {
    setInput(output)
    setOutput("")
  }, [output])

  const inputLineCount = (input || "").length === 0 ? 0 : (input || "").split("\n").length
  const outputLineCount = (output || "").length === 0 ? 0 : (output || "").split("\n").length

  const options = [
    { id: "remove-empty", label: "Remove empty lines", checked: removeEmptyLines, setter: setRemoveEmptyLines },
    { id: "remove-dupes", label: "Remove duplicates", checked: removeDuplicates, setter: setRemoveDuplicates },
    { id: "trim-ws", label: "Trim whitespace", checked: trimWhitespace, setter: setTrimWhitespace },
    { id: "sort-az", label: "Sort A-Z", checked: sortAZ, setter: setSortAZ },
    { id: "sort-za", label: "Sort Z-A", checked: sortZA, setter: setSortZA },
    { id: "remove-num", label: "Remove numbering (1. 2. 3.)", checked: removeNumbering, setter: setRemoveNumbering },
    { id: "remove-bullets", label: "Remove bullet points (- * •)", checked: removeBulletPoints, setter: setRemoveBulletPoints },
    { id: "add-num", label: "Add numbering", checked: addNumbering, setter: setAddNumbering },
    { id: "add-bullets", label: "Add bullet points", checked: addBulletPoints, setter: setAddBulletPoints },
  ]

  return (
    <div className="space-y-6">
      {/* Options */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <Label className="text-base font-semibold flex items-center gap-2">
            <ListOrdered className="size-4" />
            Cleanup Options
          </Label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((opt) => (
              <div key={opt.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Checkbox
                  id={opt.id}
                  checked={opt.checked}
                  onCheckedChange={(v) => {
                    opt.setter(!!v)
                    // Mutually exclusive: sort A-Z vs Z-A
                    if (opt.id === "sort-az" && v) setSortZA(false)
                    if (opt.id === "sort-za" && v) setSortAZ(false)
                  }}
                />
                <Label htmlFor={opt.id} className="text-sm cursor-pointer">
                  {opt.label}
                </Label>
              </div>
            ))}
          </div>
          <Button onClick={processList} disabled={(input || "").trim().length === 0} className="w-full" size="lg">
            <Sparkles className="size-4 mr-2" />
            Clean List
          </Button>
        </CardContent>
      </Card>

      {/* Input + Output */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lc-input" className="text-base font-semibold">Input List</Label>
              <Badge variant="secondary" className="tabular-nums">
                {inputLineCount} item{inputLineCount !== 1 ? "s" : ""}
              </Badge>
            </div>
            <Textarea
              id="lc-input"
              placeholder={"Paste your list here, one item per line...\n\nApple\nBanana\n  Orange  \n\n1. Mango\n2. Grape"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[280px] sm:min-h-[340px] resize-y text-base leading-relaxed"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lc-output" className="text-base font-semibold">Cleaned Output</Label>
              <Badge variant="secondary" className="tabular-nums">
                {outputLineCount} item{outputLineCount !== 1 ? "s" : ""}
              </Badge>
            </div>
            <Textarea
              id="lc-output"
              value={output}
              readOnly
              placeholder="Cleaned list will appear here..."
              className="min-h-[280px] sm:min-h-[340px] resize-y text-base leading-relaxed bg-muted/50"
            />
          </CardContent>
        </Card>
      </div>

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
              100% Private — Your List Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All list cleaning, sorting, and formatting operations are performed entirely in your browser. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
