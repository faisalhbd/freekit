"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Copy,
  Check,
  ArrowRightLeft,
  Clock,
  RefreshCw,
  Info,
  Calendar,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Utility Functions ───────────────────────────────────────────────────────

function isLikelyMilliseconds(ts: number): boolean {
  // 13 digits = milliseconds (after ~2001), 10 digits = seconds (before ~2286)
  if (ts > 1e12) return true
  if (ts < 1e10) return false
  // 10-12 digits: check if it makes sense as seconds (before year 2286)
  if (ts < 1e12) return false // seconds
  return true
}

function timestampToDate(ts: number): {
  iso: string
  rfc2822: string
  utc: string
  local: string
  relative: string
  year: number
  month: string
  day: string
  hours: string
  minutes: string
  seconds: string
  dayOfWeek: string
  isValid: boolean
} {
  const ms = isLikelyMilliseconds(ts) ? ts : ts * 1000
  const date = new Date(ms)

  if (isNaN(date.getTime())) {
    return {
      iso: "Invalid Date",
      rfc2822: "Invalid Date",
      utc: "Invalid Date",
      local: "Invalid Date",
      relative: "Invalid",
      year: 0,
      month: "",
      day: "",
      hours: "",
      minutes: "",
      seconds: "",
      dayOfWeek: "",
      isValid: false,
    }
  }

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(Math.abs(diffSec) / 60)
  const diffHour = Math.floor(Math.abs(diffSec) / 3600)
  const diffDay = Math.floor(Math.abs(diffSec) / 86400)
  const diffMonth = Math.floor(Math.abs(diffSec) / (86400 * 30))
  const diffYear = Math.floor(Math.abs(diffSec) / (86400 * 365))

  let relative: string
  if (diffSec === 0) {
    relative = "just now"
  } else if (Math.abs(diffSec) < 60) {
    relative = `${diffSec > 0 ? diffSec + " seconds ago" : "in " + Math.abs(diffSec) + " seconds"}`
  } else if (diffMin < 60) {
    relative = `${diffMin} minute${diffMin !== 1 ? "s" : ""} ${diffSec > 0 ? "ago" : "from now"}`
  } else if (diffHour < 24) {
    relative = `${diffHour} hour${diffHour !== 1 ? "s" : ""} ${diffSec > 0 ? "ago" : "from now"}`
  } else if (diffDay < 30) {
    relative = `${diffDay} day${diffDay !== 1 ? "s" : ""} ${diffSec > 0 ? "ago" : "from now"}`
  } else if (diffMonth < 12) {
    relative = `${diffMonth} month${diffMonth !== 1 ? "s" : ""} ${diffSec > 0 ? "ago" : "from now"}`
  } else {
    relative = `${diffYear} year${diffYear !== 1 ? "s" : ""} ${diffSec > 0 ? "ago" : "from now"}`
  }

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return {
    iso: date.toISOString(),
    rfc2822: date.toUTCString(),
    utc: date.toUTCString().replace("GMT", "UTC"),
    local: date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    relative,
    year: date.getFullYear(),
    month: months[date.getMonth()],
    day: date.getDate().toString(),
    hours: date.getHours().toString().padStart(2, "0"),
    minutes: date.getMinutes().toString().padStart(2, "0"),
    seconds: date.getSeconds().toString().padStart(2, "0"),
    dayOfWeek: days[date.getDay()],
    isValid: true,
  }
}

function dateToTimestamp(dateStr: string, timeStr: string): {
  seconds: number
  milliseconds: number
  isValid: boolean
} {
  try {
    // Parse the date and time
    let parsed: Date
    if (timeStr) {
      parsed = new Date(`${dateStr}T${timeStr}:00`)
    } else {
      parsed = new Date(dateStr + "T00:00:00")
    }

    if (isNaN(parsed.getTime())) {
      return { seconds: 0, milliseconds: 0, isValid: false }
    }

    return {
      seconds: Math.floor(parsed.getTime() / 1000),
      milliseconds: parsed.getTime(),
      isValid: true,
    }
  } catch {
    return { seconds: 0, milliseconds: 0, isValid: false }
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function TimestampConverterTool() {
  // Current timestamp (live)
  const [currentTs, setCurrentTs] = useState(() => Math.floor(Date.now() / 1000))

  // Tab state
  const [activeTab, setActiveTab] = useState<string>("ts-to-date")

  // Timestamp to Date
  const [tsInput, setTsInput] = useState("")
  const [tsCopied, setTsCopied] = useState<string | null>(null)

  // Date to Timestamp
  const [dateInput, setDateInput] = useState(() => {
    const now = new Date()
    return now.toISOString().split("T")[0]
  })
  const [timeInput, setTimeInput] = useState(() => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
  })
  const [dtCopied, setDtCopied] = useState<string | null>(null)

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTs(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // ─── Computed values ──────────────────────────────────────────────────────

  const parsedTs = tsInput.trim() ? parseInt(tsInput.trim(), 10) : null
  const tsResult = parsedTs !== null ? timestampToDate(parsedTs) : null
  const detectedUnit = parsedTs !== null && parsedTs > 0 ? (isLikelyMilliseconds(parsedTs) ? "milliseconds" : "seconds") : null

  const dtResult = dateToTimestamp(dateInput, timeInput)

  // ─── Copy Function ───────────────────────────────────────────────────────

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setTsCopied(id)
      setTimeout(() => setTsCopied(null), 2000)
    } catch {
      // fallback
    }
  }, [])

  const copyDtToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setDtCopied(id)
      setTimeout(() => setDtCopied(null), 2000)
    } catch {
      // fallback
    }
  }, [])

  // ─── Quick Actions ────────────────────────────────────────────────────────

  const setCurrentTimestamp = useCallback(() => {
    setTsInput(Math.floor(Date.now() / 1000).toString())
  }, [])

  const setCurrentDate = useCallback(() => {
    const now = new Date()
    setDateInput(now.toISOString().split("T")[0])
    setTimeInput(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`)
  }, [])

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        {/* Live Current Timestamp */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
                  <Zap className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Unix Timestamp</p>
                  <p className="text-2xl sm:text-3xl font-mono font-bold tracking-wider tabular-nums">
                    {currentTs}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(currentTs.toString(), "current-s")}
                    >
                      {tsCopied === "current-s" ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                      Seconds
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy in seconds</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard((currentTs * 1000).toString(), "current-ms")}
                    >
                      {tsCopied === "current-ms" ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                      Milliseconds
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy in milliseconds</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground font-mono">
              {(currentTs * 1000)} ms • Updates every second
            </p>
          </div>
        </Card>

        {/* Main Converter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="ts-to-date" className="gap-1.5">
              <ArrowRightLeft className="size-3.5" />
              Timestamp → Date
            </TabsTrigger>
            <TabsTrigger value="date-to-ts" className="gap-1.5">
              <ArrowRightLeft className="size-3.5" />
              Date → Timestamp
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Timestamp to Date */}
          <TabsContent value="ts-to-date" className="mt-6 space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                <h3 className="font-semibold">Unix Timestamp</h3>
              </div>

              <div className="flex gap-2">
                <Input
                  type="text"
                  value={tsInput}
                  onChange={(e) => setTsInput(e.target.value.replace(/[^0-9\-]/g, ""))}
                  placeholder="e.g. 1700000000"
                  className="font-mono text-lg tabular-nums"
                  aria-label="Enter Unix timestamp"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={setCurrentTimestamp}>
                      <Clock className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Use current timestamp</TooltipContent>
                </Tooltip>
              </div>

              {detectedUnit && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Detected: {detectedUnit}
                  </Badge>
                  {parsedTs !== null && parsedTs > 1e12 && (
                    <span className="text-xs text-muted-foreground">
                      Also equals {parsedTs / 1000} in seconds
                    </span>
                  )}
                </div>
              )}
            </Card>

            {/* Conversion Results */}
            {tsResult && tsResult.isValid && (
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold">Converted Date &amp; Time</h3>

                <div className="space-y-3">
                  <ResultRow
                    label="ISO 8601"
                    value={tsResult.iso}
                    id="ts-iso"
                    copied={tsCopied}
                    onCopy={copyToClipboard}
                    mono
                  />
                  <ResultRow
                    label="UTC"
                    value={tsResult.utc}
                    id="ts-utc"
                    copied={tsCopied}
                    onCopy={copyToClipboard}
                    mono
                  />
                  <ResultRow
                    label="Local Time"
                    value={tsResult.local}
                    id="ts-local"
                    copied={tsCopied}
                    onCopy={copyToClipboard}
                  />
                  <Separator />
                  <ResultRow
                    label="Relative"
                    value={tsResult.relative}
                    id="ts-relative"
                    copied={tsCopied}
                    onCopy={copyToClipboard}
                    highlight
                  />
                </div>

                <Separator />

                {/* Date Components */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Date Components</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Year</p>
                      <p className="text-lg font-bold font-mono tabular-nums">{tsResult.year}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Month</p>
                      <p className="text-lg font-bold">{tsResult.month}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Day</p>
                      <p className="text-lg font-bold font-mono tabular-nums">{tsResult.day}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Day of Week</p>
                      <p className="text-lg font-bold">{tsResult.dayOfWeek.slice(0, 3)}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Hours</p>
                      <p className="text-lg font-bold font-mono tabular-nums">{tsResult.hours}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Minutes</p>
                      <p className="text-lg font-bold font-mono tabular-nums">{tsResult.minutes}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Seconds</p>
                      <p className="text-lg font-bold font-mono tabular-nums">{tsResult.seconds}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                      <p className="text-xs text-muted-foreground">Unit</p>
                      <p className="text-sm font-bold text-primary">{detectedUnit}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {tsResult && !tsResult.isValid && (
              <Card className="p-6">
                <div className="flex items-center gap-2 text-destructive">
                  <Info className="size-4" />
                  <p className="text-sm">Invalid timestamp. Please enter a valid number.</p>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Tab 2: Date to Timestamp */}
          <TabsContent value="date-to-ts" className="mt-6 space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-primary" />
                <h3 className="font-semibold">Date &amp; Time</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date-input">Date</Label>
                  <Input
                    id="date-input"
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-input">Time (optional)</Label>
                  <Input
                    id="time-input"
                    type="time"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={setCurrentDate}>
                    <RefreshCw className="size-3.5 mr-1.5" />
                    Use Current Date &amp; Time
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Set to current date and time</TooltipContent>
              </Tooltip>
            </Card>

            {/* Timestamp Results */}
            {dtResult.isValid && (
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold">Unix Timestamps</h3>

                <div className="space-y-3">
                  <ResultRow
                    label="Seconds (10 digits)"
                    value={dtResult.seconds.toString()}
                    id="dt-seconds"
                    copied={dtCopied}
                    onCopy={copyDtToClipboard}
                    mono
                    highlight
                  />
                  <ResultRow
                    label="Milliseconds (13 digits)"
                    value={dtResult.milliseconds.toString()}
                    id="dt-ms"
                    copied={dtCopied}
                    onCopy={copyDtToClipboard}
                    mono
                  />
                  <ResultRow
                    label="ISO 8601"
                    value={new Date(dtResult.milliseconds).toISOString()}
                    id="dt-iso"
                    copied={dtCopied}
                    onCopy={copyDtToClipboard}
                    mono
                  />
                </div>
              </Card>
            )}

            {!dtResult.isValid && dateInput && (
              <Card className="p-6">
                <div className="flex items-center gap-2 text-destructive">
                  <Info className="size-4" />
                  <p className="text-sm">Invalid date. Please enter a valid date.</p>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Banner */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
              <Check className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">All Conversions in Your Browser</p>
              <p className="text-sm text-muted-foreground">
                All timestamp conversions happen locally using JavaScript&apos;s Date API. No data is sent to
                any server. The Unix timestamp is timezone-independent (always UTC), making it ideal
                for storing and comparing dates across different time zones.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}

// ─── Result Row Component ─────────────────────────────────────────────────────

interface ResultRowProps {
  label: string
  value: string
  id: string
  copied: string | null
  onCopy: (text: string, id: string) => void
  mono?: boolean
  highlight?: boolean
}

function ResultRow({ label, value, id, copied, onCopy, mono, highlight }: ResultRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 p-3 group">
      <div className="space-y-0.5 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-sm break-all ${mono ? "font-mono" : ""} ${highlight ? "font-medium text-foreground" : "text-muted-foreground"}`}>
          {value}
        </p>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onCopy(value, id)}
            aria-label={`Copy ${label}`}
          >
            {copied === id ? (
              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy</TooltipContent>
      </Tooltip>
    </div>
  )
}
