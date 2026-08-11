"use client"

import { useState, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Hash,
  Copy,
  RotateCcw,
  RefreshCw,
  Shield,
  Dice1,
  Check,
} from "lucide-react"

// --- Generate a single UUID v4 using Web Crypto API ---

function generateUUID(): string {
  return crypto.randomUUID()
}

// --- Format a UUID based on options ---

function formatUUID(uuid: string, uppercase: boolean, withHyphens: boolean): string {
  let formatted = uuid
  if (!withHyphens) {
    formatted = formatted.replace(/-/g, "")
  }
  if (uppercase) {
    formatted = formatted.toUpperCase()
  }
  return formatted
}

// --- Component ---

export function UUIDGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([])
  const [uppercase, setUppercase] = useState(false)
  const [withHyphens, setWithHyphens] = useState(true)
  const [count, setCount] = useState("1")
  const [copiedAll, setCopiedAll] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [totalGenerated, setTotalGenerated] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  // --- Generate UUIDs ---

  const handleGenerate = useCallback(() => {
    const rawCount = parseInt((count || "").trim(), 10)
    const safeCount = Number.isNaN(rawCount) ? 1 : Math.max(1, Math.min(100, rawCount))

    const newUuids: string[] = []
    for (let i = 0; i < safeCount; i++) {
      newUuids.push(generateUUID())
    }

    setUuids(newUuids)
    setTotalGenerated((prev) => prev + safeCount)
    setCopiedAll(false)
    setCopiedIndex(null)

    // Scroll to results
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [count])

  // --- Copy single UUID ---

  const handleCopySingle = useCallback(async (index: number) => {
    if (index < 0 || index >= uuids.length) return
    const formatted = formatUUID(uuids[index], uppercase, withHyphens)
    try {
      await navigator.clipboard.writeText(formatted)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      // fallback - do nothing
    }
  }, [uuids, uppercase, withHyphens])

  // --- Copy all UUIDs ---

  const handleCopyAll = useCallback(async () => {
    if (uuids.length === 0) return
    const formatted = uuids
      .map((u) => formatUUID(u, uppercase, withHyphens))
      .join("\n")
    try {
      await navigator.clipboard.writeText(formatted)
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 2000)
    } catch {
      // fallback - do nothing
    }
  }, [uuids, uppercase, withHyphens])

  // --- Clear ---

  const handleClear = useCallback(() => {
    setUuids([])
    setCopiedAll(false)
    setCopiedIndex(null)
  }, [])

  // --- Handle count input change ---

  const handleCountChange = useCallback((v: string) => {
    const trimmed = (v || "").trim()
    // Allow only digits
    const digitsOnly = trimmed.replace(/[^0-9]/g, "")
    const num = parseInt(digitsOnly, 10)
    if (digitsOnly === "" || Number.isNaN(num)) {
      setCount("")
    } else {
      setCount(num.toString())
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Options Card */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-5">
          {/* Format toggles row */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-3">
              <Switch
                id="uppercase-toggle"
                checked={uppercase}
                onCheckedChange={setUppercase}
              />
              <Label htmlFor="uppercase-toggle" className="text-sm font-medium cursor-pointer select-none">
                Uppercase
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="hyphens-toggle"
                checked={withHyphens}
                onCheckedChange={setWithHyphens}
              />
              <Label htmlFor="hyphens-toggle" className="text-sm font-medium cursor-pointer select-none">
                With Hyphens
              </Label>
            </div>
          </div>

          <Separator />

          {/* Count input + Generate button row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="w-full sm:w-48 space-y-2">
              <Label htmlFor="uuid-count" className="text-sm font-medium">
                Number of UUIDs
              </Label>
              <div className="relative">
                <Dice1 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="uuid-count"
                  type="text"
                  inputMode="numeric"
                  placeholder="1 – 100"
                  value={count}
                  onChange={(e) => handleCountChange(e.target.value)}
                  className="pl-10 tabular-nums"
                />
              </div>
              <p className="text-xs text-muted-foreground">Generate 1 to 100 UUIDs at once</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleGenerate}
                size="lg"
                className="gap-2 px-8"
              >
                <RefreshCw className="size-4" />
                Generate
              </Button>
              <Button
                onClick={handleCopyAll}
                variant="outline"
                size="lg"
                className="gap-2"
                disabled={uuids.length === 0}
              >
                {copiedAll ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copiedAll ? "Copied!" : "Copy All"}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="lg"
                className="gap-2"
                disabled={uuids.length === 0}
              >
                <RotateCcw className="size-4" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Bar */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Stats:</span>
            <Badge variant="outline" className="tabular-nums text-xs">
              This batch: {uuids.length} UUID{uuids.length !== 1 ? "s" : ""}
            </Badge>
            <Badge variant="outline" className="tabular-nums text-xs">
              Total generated: {totalGenerated.toLocaleString()}
            </Badge>
            <Badge variant="outline" className="tabular-nums text-xs">
              Format: {uppercase ? "UPPERCASE" : "lowercase"} {withHyphens ? "with hyphens" : "no hyphens"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* UUID Results */}
      <div ref={listRef}>
        {uuids.length === 0 ? (
          <Card>
            <CardContent className="p-12 sm:p-16 flex flex-col items-center justify-center text-center gap-3">
              <div className="rounded-full bg-muted p-4">
                <Hash className="size-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">No UUIDs generated yet</p>
              <p className="text-sm text-muted-foreground/70">Click the Generate button to create UUIDs</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Hash className="size-4 text-primary" />
                  Generated UUIDs
                </h3>
                <Badge variant="secondary" className="tabular-nums text-xs">
                  {uuids.length} UUID{uuids.length !== 1 ? "s" : ""}
                </Badge>
              </div>
              <div className="max-h-96 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {uuids.map((uuid, index) => {
                  const formatted = formatUUID(uuid, uppercase, withHyphens)
                  const isCopied = copiedIndex === index
                  return (
                    <div
                      key={uuid}
                      className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors px-3 py-2.5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs text-muted-foreground tabular-nums w-7 shrink-0 text-right">
                          {index + 1}.
                        </span>
                        <code className="text-sm font-mono break-all leading-relaxed text-foreground">
                          {formatted}
                        </code>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="shrink-0 gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCopySingle(index)}
                        aria-label={`Copy UUID ${index + 1}`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-xs text-emerald-600 dark:text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            <span className="text-xs">Copy</span>
                          </>
                        )}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Generated in Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All UUIDs are generated using the Web Crypto API (crypto.randomUUID()) entirely in your browser. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
