"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Timer,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

// --- Types ---

interface FieldInfo {
  label: string
  raw: string
  description: string
  range: string
  valid: boolean
  error?: string
}

interface ParseResult {
  valid: boolean
  description: string
  fields: FieldInfo[]
  errors: string[]
  nextTimes: string[]
}

// --- Month & Day names ---

const MONTH_NAMES: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
}

const DOW_NAMES: Record<string, number> = {
  SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6,
}

const MONTH_NUMS: Record<number, string> = {
  1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
  7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December",
}

const DOW_NUMS: Record<number, string> = {
  0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday",
}

// --- Parse a single field value into a set of numbers ---

function parseField(
  value: string,
  min: number,
  max: number,
  names?: Record<string, number>
): { values: Set<number>; error?: string } {
  const v = (value || "").trim()
  if (v === "*") {
    const values = new Set<number>()
    for (let i = min; i <= max; i++) values.add(i)
    return { values }
  }

  // Replace names with numbers
  let normalized = v
  if (names) {
    for (const [name, num] of Object.entries(names)) {
      normalized = normalized.replace(new RegExp(`\\b${name}\\b`, "gi"), String(num))
    }
  }

  // Split by comma for multiple parts
  const parts = normalized.split(",")
  const values = new Set<number>()

  for (const part of parts) {
    const trimmed = part.trim()
    if (trimmed.length === 0) continue

    // Step: */n or n-m/s or n/s
    if (trimmed.includes("/")) {
      const [rangeStr, stepStr] = trimmed.split("/")
      const step = parseInt((stepStr || "").trim(), 10)
      if (isNaN(step) || step <= 0) return { values: new Set(), error: `Invalid step value: "${stepStr}"` }

      let start = min
      let end = max

      if ((rangeStr || "").trim() !== "*") {
        const range = (rangeStr || "").trim()
        if (range.includes("-")) {
          const [s, e] = range.split("-")
          start = parseInt((s || "").trim(), 10)
          end = parseInt((e || "").trim(), 10)
          if (isNaN(start) || isNaN(end)) return { values: new Set(), error: `Invalid range: "${range}"` }
        } else {
          start = parseInt(range, 10)
          if (isNaN(start)) return { values: new Set(), error: `Invalid value: "${range}"` }
          end = max
        }
      }

      if (start < min) start = min
      if (end > max) end = max

      for (let i = start; i <= end; i += step) values.add(i)
    }
    // Range: n-m
    else if (trimmed.includes("-")) {
      const [s, e] = trimmed.split("-")
      const start = parseInt((s || "").trim(), 10)
      const end = parseInt((e || "").trim(), 10)
      if (isNaN(start) || isNaN(end)) return { values: new Set(), error: `Invalid range: "${trimmed}"` }
      for (let i = start; i <= end; i++) values.add(i)
    }
    // Single value
    else {
      const num = parseInt(trimmed, 10)
      if (isNaN(num)) return { values: new Set(), error: `Invalid value: "${trimmed}"` }
      values.add(num)
    }
  }

  // Validate range
  for (const val of values) {
    if (val < min || val > max) {
      return { values, error: `Value ${val} is out of range (${min}-${max})` }
    }
  }

  return { values }
}

// --- Describe a field ---

function describeMinute(values: Set<number>): string {
  if (values.size === 60) return "Every minute"
  if (values.size === 1) {
    const v = Array.from(values)[0]
    return v === 0 ? "At minute 0 (top of the hour)" : `At minute ${v}`
  }
  const sorted = Array.from(values).sort((a, b) => a - b)
  // Check for step pattern
  if (sorted.length > 2 && sorted[1] - sorted[0] === sorted[2] - sorted[1]) {
    const step = sorted[1] - sorted[0]
    return `Every ${step} minute${step !== 1 ? "s" : ""} (starting at ${sorted[0]})`
  }
  return `At minutes: ${sorted.join(", ")}`
}

function describeHour(values: Set<number>): string {
  if (values.size === 24) return "Every hour"
  if (values.size === 1) {
    const v = Array.from(values)[0]
    return v === 0 ? "At midnight (00:00)" : `At hour ${v}:00 (${formatHour(v)})`
  }
  const sorted = Array.from(values).sort((a, b) => a - b)
  return `At hours: ${sorted.map(h => `${h}:00`).join(", ")}`
}

function formatHour(h: number): string {
  if (h === 0) return "12:00 AM"
  if (h === 12) return "12:00 PM"
  if (h > 12) return `${h - 12}:00 PM`
  return `${h}:00 AM`
}

function describeDayOfMonth(values: Set<number>): string {
  if (values.size === 31) return "Every day of the month"
  if (values.size === 1) {
    const v = Array.from(values)[0]
    const suffix = v === 1 || v === 21 || v === 31 ? "st" : v === 2 || v === 22 ? "nd" : v === 3 || v === 23 ? "rd" : "th"
    return `On the ${v}${suffix} of the month`
  }
  const sorted = Array.from(values).sort((a, b) => a - b)
  return `On days: ${sorted.join(", ")} of the month`
}

function describeMonth(values: Set<number>): string {
  if (values.size === 12) return "Every month"
  if (values.size === 1) {
    return `In ${MONTH_NUMS[Array.from(values)[0]] || "month " + Array.from(values)[0]}`
  }
  const sorted = Array.from(values).sort((a, b) => a - b)
  return `In months: ${sorted.map(m => MONTH_NUMS[m] || String(m)).join(", ")}`
}

function describeDayOfWeek(values: Set<number>): string {
  if (values.size === 7) return "Every day of the week"
  if (values.size === 1) {
    return `On ${DOW_NUMS[Array.from(values)[0]] || "day " + Array.from(values)[0]}`
  }
  const sorted = Array.from(values).sort((a, b) => a - b)
  return `On: ${sorted.map(d => DOW_NUMS[d] || String(d)).join(", ")}`
}

// --- Calculate next execution times ---

function getNextExecutions(
  minutes: Set<number>,
  hours: Set<number>,
  daysOfMonth: Set<number>,
  months: Set<number>,
  daysOfWeek: Set<number>,
  count: number
): string[] {
  const results: string[] = []
  const now = new Date()
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0)

  const maxIter = 525600 * 4 // ~4 years of minutes
  let iter = 0

  while (results.length < count && iter < maxIter) {
    iter++

    const mo = d.getMonth() + 1
    if (!months.has(mo)) {
      d.setMonth(d.getMonth() + 1, 1)
      d.setHours(0, 0, 0, 0)
      continue
    }

    const dom = d.getDate()
    const dow = d.getDay()
    if (!daysOfMonth.has(dom) || !daysOfWeek.has(dow)) {
      d.setDate(d.getDate() + 1)
      d.setHours(0, 0, 0, 0)
      continue
    }

    const h = d.getHours()
    if (!hours.has(h)) {
      d.setHours(h + 1, 0, 0, 0)
      if (d.getHours() <= h) {
        // Overflow to next day
        d.setDate(d.getDate() + 1)
        d.setHours(0, 0, 0, 0)
      }
      continue
    }

    const mi = d.getMinutes()
    if (!minutes.has(mi)) {
      d.setMinutes(mi + 1)
      if (d.getMinutes() <= mi) {
        d.setHours(d.getHours() + 1, 0, 0, 0)
      }
      continue
    }

    results.push(d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }))

    d.setMinutes(mi + 1)
    if (d.getMinutes() <= mi) {
      d.setHours(d.getHours() + 1, 0, 0, 0)
    }
  }

  return results
}

// --- Generate human-readable description ---

function generateDescription(
  min: Set<number>,
  hour: Set<number>,
  dom: Set<number>,
  month: Set<number>,
  dow: Set<number>
): string {
  const parts: string[] = []

  // Time part
  if (hour.size === 24 && min.size === 60) {
    parts.push("Every minute")
  } else if (hour.size === 1 && min.size === 1) {
    const h = Array.from(hour)[0]
    const m = Array.from(min)[0]
    parts.push(`At ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
  } else if (hour.size === 24) {
    parts.push(`Every hour at minute ${describeMinute(min).toLowerCase().replace("at minute ", "")}`)
  } else if (min.size === 60) {
    parts.push(`Every minute during ${describeHour(hour).toLowerCase().replace("at hours: ", "").replace("at ", "")}`)
  } else {
    const hourDesc = hour.size === 1 ? formatHour(Array.from(hour)[0]) : describeHour(hour)
    parts.push(`${hourDesc}, at minute${min.size === 1 ? "" : "s"} ${Array.from(min).sort((a, b) => a - b).join(", ")}`)
  }

  // Date part
  if (dom.size < 31) parts.push(describeDayOfMonth(dom).toLowerCase())
  if (dow.size < 7) parts.push(describeDayOfWeek(dow).toLowerCase())
  if (month.size < 12) parts.push(describeMonth(month).toLowerCase())

  return parts.join(", ")
}

// --- Main parse function ---

function parseCron(expr: string): ParseResult {
  const trimmed = (expr || "").trim()
  const fields = trimmed.split(/\s+/)

  if (fields.length !== 5) {
    return {
      valid: false,
      description: "",
      fields: [],
      errors: [`Expected 5 fields but got ${fields.length}. A cron expression has the format: minute hour day-of-month month day-of-week`],
      nextTimes: [],
    }
  }

  const [minStr, hourStr, domStr, monthStr, dowStr] = fields
  const errors: string[] = []

  const minuteResult = parseField(minStr, 0, 59)
  const hourResult = parseField(hourStr, 0, 23)
  const domResult = parseField(domStr, 1, 31)
  const monthResult = parseField(monthStr, 1, 12, MONTH_NAMES)
  const dowResult = parseField(dowStr, 0, 7, DOW_NAMES)

  // Normalize dow: 7 = 0 (Sunday)
  const dowValues = new Set<number>()
  for (const v of dowResult.values) {
    dowValues.add(v === 7 ? 0 : v)
  }

  if (minuteResult.error) errors.push(`Minute: ${minuteResult.error}`)
  if (hourResult.error) errors.push(`Hour: ${hourResult.error}`)
  if (domResult.error) errors.push(`Day of month: ${domResult.error}`)
  if (monthResult.error) errors.push(`Month: ${monthResult.error}`)
  if (dowResult.error) errors.push(`Day of week: ${dowResult.error}`)

  const fieldInfos: FieldInfo[] = [
    {
      label: "Minute",
      raw: minStr,
      description: describeMinute(minuteResult.values),
      range: "0-59",
      valid: !minuteResult.error,
      error: minuteResult.error,
    },
    {
      label: "Hour",
      raw: hourStr,
      description: describeHour(hourResult.values),
      range: "0-23",
      valid: !hourResult.error,
      error: hourResult.error,
    },
    {
      label: "Day of Month",
      raw: domStr,
      description: describeDayOfMonth(domResult.values),
      range: "1-31",
      valid: !domResult.error,
      error: domResult.error,
    },
    {
      label: "Month",
      raw: monthStr,
      description: describeMonth(monthResult.values),
      range: "1-12",
      valid: !monthResult.error,
      error: monthResult.error,
    },
    {
      label: "Day of Week",
      raw: dowStr,
      description: describeDayOfWeek(dowValues),
      range: "0-6 (0=Sunday)",
      valid: !dowResult.error,
      error: dowResult.error,
    },
  ]

  const isValid = errors.length === 0
  const description = isValid
    ? generateDescription(minuteResult.values, hourResult.values, domResult.values, monthResult.values, dowValues)
    : ""

  const nextTimes = isValid
    ? getNextExecutions(minuteResult.values, hourResult.values, domResult.values, monthResult.values, dowValues, 10)
    : []

  return { valid: isValid, description, fields: fieldInfos, errors, nextTimes }
}

// --- Presets ---

const PRESETS = [
  { expr: "*/5 * * * *", label: "Every 5 min" },
  { expr: "0 * * * *", label: "Hourly" },
  { expr: "0 0 * * *", label: "Daily midnight" },
  { expr: "0 0 * * 0", label: "Weekly Sunday" },
  { expr: "0 0 1 * *", label: "Monthly 1st" },
  { expr: "0 9-17 * * 1-5", label: "Weekdays 9-5" },
]

// --- Component ---

export function CronExpressionParserTool() {
  const [input, setInput] = useState("")

  const result = useMemo(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) return null
    return parseCron(trimmed)
  }, [input])

  const handlePreset = useCallback((expr: string) => {
    setInput(expr)
  }, [])

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <Label htmlFor="cron-input" className="text-base font-semibold flex items-center gap-2">
            <Timer className="size-4" />
            Cron Expression
          </Label>
          <input
            id="cron-input"
            type="text"
            placeholder="Enter cron expression, e.g. */5 * * * *"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 font-mono text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Presets:</span>
            {PRESETS.map((preset) => (
              <Button
                key={preset.expr}
                variant={input === preset.expr ? "default" : "outline"}
                size="sm"
                onClick={() => handlePreset(preset.expr)}
                className="text-xs gap-1"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          {/* Validation Status + Description */}
          <Card className={result.valid ? "border-emerald-200 dark:border-emerald-900/40" : "border-red-200 dark:border-red-900/40"}>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <div className="flex items-center gap-2">
                {result.valid ? (
                  <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertCircle className="size-5 text-red-600 dark:text-red-400" />
                )}
                <span className={`text-sm font-semibold ${result.valid ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
                  {result.valid ? "Valid Expression" : "Invalid Expression"}
                </span>
              </div>
              {result.valid && result.description && (
                <p className="text-sm text-foreground pl-7">{result.description}</p>
              )}
              {!result.valid && result.errors.length > 0 && (
                <ul className="space-y-1 pl-7">
                  {result.errors.map((err, idx) => (
                    <li key={idx} className="text-sm text-red-600 dark:text-red-400">{err}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Field Breakdown */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Timer className="size-4" />
                Field Breakdown
              </Label>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {result.fields.map((field) => (
                  <div
                    key={field.label}
                    className={`rounded-lg border p-3 space-y-1 ${
                      field.valid
                        ? "border-border bg-card"
                        : "border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">{field.label}</span>
                      <Badge variant="outline" className="text-[10px] tabular-nums">{field.range}</Badge>
                    </div>
                    <p className="font-mono text-sm font-medium text-primary">{field.raw}</p>
                    <p className="text-xs text-muted-foreground">{field.description}</p>
                    {field.error && (
                      <p className="text-xs text-red-600 dark:text-red-400">{field.error}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Executions */}
          {result.valid && result.nextTimes.length > 0 && (
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Clock className="size-4" />
                  Next 10 Executions
                </Label>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {result.nextTimes.map((time, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2"
                    >
                      <span className="text-xs font-medium text-muted-foreground tabular-nums w-5">{idx + 1}.</span>
                      <span className="text-sm font-mono tabular-nums">{time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {(input || "").trim().length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <Timer className="size-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Enter a cron expression above or click a preset to see its human-readable description and next execution times.</p>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your Cron Expressions Never Leave Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All parsing and time calculation happen entirely in your browser. No expressions are sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}