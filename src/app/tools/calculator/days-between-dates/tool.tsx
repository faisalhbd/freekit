"use client"

import { useState, useMemo, useCallback } from "react"
import {
  CalendarDays,
  Calendar,
  Clock,
  Briefcase,
  ArrowRight,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// ─── Types ──────────────────────────────────────────────────────────────────

interface DateResult {
  totalDays: number
  totalWeeks: number
  remainderDays: number
  months: number
  remainderDaysAfterMonths: number
  years: number
  monthsAfterYears: number
  daysAfterYears: number
  businessDays: number
  weekendDays: number
  weekdayDays: number
  startDateFormatted: string
  endDateFormatted: string
  startDayOfWeek: string
  endDayOfWeek: string
}

// ─── Helper Functions ───────────────────────────────────────────────────────

function formatDateLong(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function getDayOfWeek(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" })
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function calculateDaysBetween(
  startDate: Date,
  endDate: Date,
  excludeWeekends: boolean
): DateResult | null {
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return null
  if (startDate > endDate) return null

  const diffMs = endDate.getTime() - startDate.getTime()
  const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  // Weeks breakdown
  const totalWeeks = Math.floor(totalDays / 7)
  const remainderDays = totalDays % 7

  // Months and remaining days breakdown (calendar-aware)
  let months = 0
  let tempDate = new Date(startDate)
  while (true) {
    const nextMonth = new Date(tempDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    if (nextMonth > endDate) break
    months++
    tempDate = nextMonth
  }
  const remainderDaysAfterMonths = Math.round(
    (endDate.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Years, months, days breakdown (calendar-aware)
  let years = 0
  let monthsAfterYears = 0
  let daysAfterYears = 0
  tempDate = new Date(startDate)

  // Count full years
  while (true) {
    const nextYear = new Date(tempDate)
    nextYear.setFullYear(nextYear.getFullYear() + 1)
    if (nextYear > endDate) break
    years++
    tempDate = nextYear
  }

  // Count full months within the remaining
  while (true) {
    const nextMonth = new Date(tempDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    if (nextMonth > endDate) break
    monthsAfterYears++
    tempDate = nextMonth
  }

  daysAfterYears = Math.round(
    (endDate.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Count business days (Mon-Fri) and weekend days (Sat-Sun)
  let businessDays = 0
  let weekendDays = 0
  const checkDate = new Date(startDate)
  for (let i = 0; i < totalDays; i++) {
    const dayOfWeek = checkDate.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDays++
    } else {
      businessDays++
    }
    checkDate.setDate(checkDate.getDate() + 1)
  }

  const weekdayDays = totalDays - weekendDays

  return {
    totalDays,
    totalWeeks,
    remainderDays,
    months,
    remainderDaysAfterMonths,
    years,
    monthsAfterYears,
    daysAfterYears,
    businessDays,
    weekendDays,
    weekdayDays,
    startDateFormatted: formatDateLong(startDate),
    endDateFormatted: formatDateLong(endDate),
    startDayOfWeek: getDayOfWeek(startDate),
    endDayOfWeek: getDayOfWeek(endDate),
  }
}

function formatNumber(num: number): string {
  return num.toLocaleString("en-US")
}

// ─── Result Card Sub-Component ──────────────────────────────────────────────

function ResultCard({
  icon,
  label,
  value,
  sublabel,
  highlight,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sublabel: string
  highlight?: boolean
}) {
  return (
    <Card className={highlight ? "border-primary/30 bg-primary/5" : ""}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
        </div>
        <p
          className={`text-2xl font-bold tabular-nums ${
            highlight ? "text-primary" : ""
          }`}
        >
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
      </CardContent>
    </Card>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function DaysBetweenDatesTool() {
  const todayStr = useMemo(() => {
    const now = new Date()
    return now.toISOString().split("T")[0]
  }, [])

  const [startDateStr, setStartDateStr] = useState("")
  const [endDateStr, setEndDateStr] = useState("")
  const [excludeWeekends, setExcludeWeekends] = useState(false)
  const [result, setResult] = useState<DateResult | null>(null)
  const [error, setError] = useState("")

  const handleSetToday = useCallback(() => {
    setEndDateStr(todayStr)
  }, [todayStr])

  const handlePreset = useCallback((days: number) => {
    const start = new Date()
    const end = addDays(start, days)
    setStartDateStr(todayStr)
    setEndDateStr(end.toISOString().split("T")[0])
  }, [todayStr])

  const handleSwapDates = useCallback(() => {
    setStartDateStr(endDateStr)
    setEndDateStr(startDateStr)
    setResult(null)
    setError("")
  }, [startDateStr, endDateStr])

  const handleCalculate = useCallback(() => {
    setError("")
    setResult(null)

    if (!startDateStr || !endDateStr) {
      setError("Please enter both a start date and an end date.")
      return
    }

    const start = new Date(startDateStr + "T00:00:00")
    const end = new Date(endDateStr + "T00:00:00")

    if (isNaN(start.getTime())) {
      setError("Please enter a valid start date.")
      return
    }

    if (isNaN(end.getTime())) {
      setError("Please enter a valid end date.")
      return
    }

    if (start > end) {
      setError("Start date cannot be after the end date. Use the swap button to reverse them.")
      return
    }

    const dateResult = calculateDaysBetween(start, end, excludeWeekends)
    if (!dateResult) {
      setError("Could not calculate the difference. Please check your dates.")
      return
    }

    setResult(dateResult)
  }, [startDateStr, endDateStr, excludeWeekends])

  const handleReset = useCallback(() => {
    setStartDateStr("")
    setEndDateStr("")
    setExcludeWeekends(false)
    setResult(null)
    setError("")
  }, [])

  // Percentage for visual breakdown bar
  const weekdayPercent = useMemo(() => {
    if (!result || result.totalDays === 0) return 0
    return Math.round((result.weekdayDays / result.totalDays) * 100)
  }, [result])

  const weekendPercent = useMemo(() => {
    if (!result || result.totalDays === 0) return 0
    return Math.round((result.weekendDays / result.totalDays) * 100)
  }, [result])

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <CalendarDays className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Calculate Days Between Dates</h3>
              <p className="text-sm text-muted-foreground">
                Select two dates to find the exact difference in days, weeks, months, and years
              </p>
            </div>
          </div>

          {/* Date Inputs */}
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] items-end">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-primary" />
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDateStr}
                onChange={(e) => setStartDateStr(e.target.value)}
                className="font-mono"
                aria-label="Start date"
              />
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwapDates}
                className="rounded-full"
                aria-label="Swap dates"
                title="Swap start and end dates"
              >
                <ArrowRight className="size-4 rotate-90 sm:rotate-0" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date" className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5 text-primary" />
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDateStr}
                onChange={(e) => setEndDateStr(e.target.value)}
                className="font-mono"
                aria-label="End date"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Button variant="outline" size="sm" onClick={handleSetToday}>
              <Calendar className="size-3.5 mr-1" />
              End: Today
            </Button>
            <Button variant="outline" size="sm" onClick={() => handlePreset(30)}>
              <Clock className="size-3.5 mr-1" />
              30 Days
            </Button>
            <Button variant="outline" size="sm" onClick={() => handlePreset(90)}>
              <Clock className="size-3.5 mr-1" />
              90 Days
            </Button>
            <Button variant="outline" size="sm" onClick={() => handlePreset(365)}>
              <CalendarDays className="size-3.5 mr-1" />
              1 Year
            </Button>
          </div>

          {/* Weekend Toggle */}
          <div className="flex items-center gap-3 mt-6 p-3 rounded-lg bg-muted/50 border border-border">
            <Switch
              id="exclude-weekends"
              checked={excludeWeekends}
              onCheckedChange={setExcludeWeekends}
              aria-label="Exclude weekends from business days calculation"
            />
            <Label htmlFor="exclude-weekends" className="cursor-pointer">
              <span className="font-medium">Business Days Mode</span>
              <span className="text-sm text-muted-foreground ml-1">
                — Highlight working days (Mon–Fri) in results
              </span>
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button onClick={handleCalculate} className="gap-1.5">
              <CalendarDays className="size-4" />
              Calculate Difference
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="size-3.5" />
              Reset
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/5 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Summary Banner */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {result.startDateFormatted} ({result.startDayOfWeek})
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-4xl sm:text-5xl font-bold tabular-nums">
                    {formatNumber(result.totalDays)}
                  </span>
                  <span className="text-xl text-muted-foreground">
                    {result.totalDays === 1 ? "day" : "days"}
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mt-2">
                  until {result.endDateFormatted} ({result.endDayOfWeek})
                </p>
              </div>
            </div>
          </Card>

          {/* Primary Results Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard
              icon={<CalendarDays className="size-4" />}
              label="Total Days"
              value={formatNumber(result.totalDays)}
              sublabel={result.totalDays === 1 ? "calendar day" : "calendar days"}
              highlight
            />
            <ResultCard
              icon={<Calendar className="size-4" />}
              label="Weeks + Days"
              value={`${formatNumber(result.totalWeeks)}w ${result.remainderDays}d`}
              sublabel={`${result.totalWeeks} full ${result.totalWeeks === 1 ? "week" : "weeks"} + ${result.remainderDays} ${result.remainderDays === 1 ? "day" : "days"}`}
            />
            <ResultCard
              icon={<Calendar className="size-4" />}
              label="Months + Days"
              value={`${formatNumber(result.months)}m ${result.remainderDaysAfterMonths}d`}
              sublabel={`${result.months} full ${result.months === 1 ? "month" : "months"} + ${result.remainderDaysAfterMonths} ${result.remainderDaysAfterMonths === 1 ? "day" : "days"}`}
            />
            <ResultCard
              icon={<CalendarDays className="size-4" />}
              label="Years + Months + Days"
              value={`${result.years}y ${result.monthsAfterYears}m ${result.daysAfterYears}d`}
              sublabel={`${result.years === 0 ? "" : `${result.years} ${result.years === 1 ? "year" : "years"}, `}${result.monthsAfterYears} ${result.monthsAfterYears === 1 ? "month" : "months"}, ${result.daysAfterYears} ${result.daysAfterYears === 1 ? "day" : "days"}`}
            />
            <ResultCard
              icon={<Briefcase className="size-4" />}
              label="Business Days"
              value={formatNumber(result.businessDays)}
              sublabel={`Mon–Fri working days`}
            />
            <ResultCard
              icon={<Clock className="size-4" />}
              label="Weekend Days"
              value={formatNumber(result.weekendDays)}
              sublabel={`Sat–Sun weekend days`}
            />
          </div>

          {/* Visual Breakdown Bar */}
          <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Calendar className="size-4 text-primary" />
                Day Type Breakdown
              </h3>
              <div className="relative w-full h-10 rounded-full overflow-hidden bg-muted">
                {/* Weekday portion */}
                <div
                  className="absolute inset-y-0 left-0 bg-primary flex items-center justify-center transition-all duration-500"
                  style={{ width: `${weekdayPercent}%` }}
                >
                  {weekdayPercent > 15 && (
                    <span className="text-xs font-semibold text-primary-foreground">
                      {weekdayPercent}% Weekdays
                    </span>
                  )}
                </div>
                {/* Weekend portion */}
                <div
                  className="absolute inset-y-0 right-0 bg-muted-foreground/20 flex items-center justify-center transition-all duration-500"
                  style={{ width: `${weekendPercent}%` }}
                >
                  {weekendPercent > 15 && (
                    <span className="text-xs font-semibold text-muted-foreground">
                      {weekendPercent}% Weekends
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-primary" />
                  <span>
                    {formatNumber(result.weekdayDays)} weekdays
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-muted-foreground/20" />
                  <span>
                    {formatNumber(result.weekendDays)} weekend days
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Additional Stats Row */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="size-4 text-primary" />
                  <span className="text-sm font-medium">Total Hours</span>
                </div>
                <p className="text-2xl font-bold tabular-nums">
                  {formatNumber(result.totalDays * 24)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    hours
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on 24 hours per day
                </p>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="size-4 text-primary" />
                  <span className="text-sm font-medium">Total Minutes</span>
                </div>
                <p className="text-2xl font-bold tabular-nums">
                  {formatNumber(result.totalDays * 24 * 60)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    min
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on 60 minutes per hour
                </p>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="size-4 text-primary" />
                  <span className="text-sm font-medium">Business Hours</span>
                </div>
                <p className="text-2xl font-bold tabular-nums">
                  {formatNumber(result.businessDays * 8)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    hours
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on 8-hour workday (excl. weekends)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Summary Badges */}
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {result.totalWeeks} {result.totalWeeks === 1 ? "week" : "weeks"} &amp; {result.remainderDays} {result.remainderDays === 1 ? "day" : "days"}
                </Badge>
                <Badge variant="secondary">
                  ~{formatNumber(Math.round(result.totalDays / 30))} months
                </Badge>
                <Badge variant="secondary">
                  ~{formatNumber(Math.round(result.totalDays / 365 * 10) / 10)} years
                </Badge>
                <Badge variant="outline">
                  {formatNumber(result.businessDays)} business days
                </Badge>
                <Badge variant="outline">
                  {formatNumber(result.weekendDays)} weekend days
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
                <CalendarDays className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
                <p className="text-sm text-muted-foreground">
                  All calculations happen locally using JavaScript. Your dates are never sent to any
                  server, stored, or shared. Close the tab and your data is gone.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
