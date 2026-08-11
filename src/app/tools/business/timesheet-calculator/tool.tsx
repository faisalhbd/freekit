"use client"

import { useState, useMemo } from "react"
import { CalendarDays, Clock, DollarSign, Printer, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const
const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

type DayEntry = { clockIn: string; clockOut: string }

function timeToMinutes(t: string): number {
  if (!t) return 0
  const [h, m] = (t || "").split(":").map(Number)
  if (isNaN(h) || isNaN(m)) return 0
  return h * 60 + m
}

function minutesToHours(m: number): string {
  if (m <= 0) return "0.00"
  const hrs = Math.floor(m / 60)
  const mins = m % 60
  return (hrs + mins / 60).toFixed(2)
}

function fmtMoney(v: number): string {
  return v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2, style: "currency", currency: "USD" })
}

function parseNum(v: string): number {
  return parseFloat((v || "").replace(/[^0-9.]/g, "")) || 0
}

export function TimesheetCalculatorTool() {
  const [days, setDays] = useState<DayEntry[]>(
    Array.from({ length: 7 }, () => ({ clockIn: "", clockOut: "" }))
  )
  const [threshold, setThreshold] = useState("8")
  const [hourlyRate, setHourlyRate] = useState("")

  const updateDay = (idx: number, field: keyof DayEntry, value: string) => {
    setDays((prev) => prev.map((d, i) => (i === idx ? { ...d, [field]: value } : d)))
  }

  const resetAll = () => {
    setDays(Array.from({ length: 7 }, () => ({ clockIn: "", clockOut: "" })))
    setThreshold("8")
    setHourlyRate("")
  }

  const dailyData = useMemo(() => {
    const thresh = parseNum(threshold) || 8
    return days.map((d) => {
      const inMin = timeToMinutes(d.clockIn)
      const outMin = timeToMinutes(d.clockOut)
      let totalMin = outMin - inMin
      if (totalMin < 0) totalMin += 24 * 60 // overnight
      const regularMin = Math.min(totalMin, thresh * 60)
      const overtimeMin = Math.max(0, totalMin - thresh * 60)
      return { totalMin, regularMin, overtimeMin }
    })
  }, [days, threshold])

  const totals = useMemo(() => {
    let totalRegMin = 0
    let totalOtMin = 0
    for (const d of dailyData) {
      totalRegMin += d.regularMin
      totalOtMin += d.overtimeMin
    }
    const totalMin = totalRegMin + totalOtMin
    const rate = parseNum(hourlyRate)
    const regPay = (totalRegMin / 60) * rate
    const otPay = (totalOtMin / 60) * rate * 1.5
    return { totalRegMin, totalOtMin, totalMin, regPay, otPay, grandTotal: regPay + otPay, rate }
  }, [dailyData, hourlyRate])

  const handlePrint = () => window.print()

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <CalendarDays className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Weekly Timesheet</h3>
              <p className="text-sm text-muted-foreground">
                Enter clock-in and clock-out times for each day
              </p>
            </div>
          </div>

          {/* Settings */}
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="space-y-1.5">
              <Label htmlFor="ts-threshold" className="text-sm font-medium flex items-center gap-2">
                <Clock className="size-4" />
                Overtime Threshold (hours/day)
              </Label>
              <Input
                id="ts-threshold"
                type="text"
                inputMode="decimal"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                placeholder="8"
                className="font-mono text-base"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ts-rate" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="size-4" />
                Hourly Rate ($)
              </Label>
              <Input
                id="ts-rate"
                type="text"
                inputMode="decimal"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="25.00"
                className="font-mono text-base"
              />
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Day rows */}
          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-[80px_1fr_1fr_72px_72px_72px] gap-2 text-xs font-medium text-muted-foreground px-1 hidden sm:grid">
              <span>Day</span>
              <span>Clock In</span>
              <span>Clock Out</span>
              <span className="text-right">Regular</span>
              <span className="text-right">Overtime</span>
              <span className="text-right">Total</span>
            </div>
            <div className="grid grid-cols-[60px_1fr_1fr] gap-2 text-xs font-medium text-muted-foreground px-1 sm:hidden">
              <span>Day</span>
              <span>In</span>
              <span>Out</span>
            </div>

            {DAYS.map((day, i) => {
              const data = dailyData[i]
              return (
                <div key={day}>
                  {/* Desktop row */}
                  <div className="hidden sm:grid grid-cols-[80px_1fr_1fr_72px_72px_72px] gap-2 items-center">
                    <span className="text-sm font-medium">{DAY_SHORT[i]}</span>
                    <Input
                      type="time"
                      value={days[i].clockIn}
                      onChange={(e) => updateDay(i, "clockIn", e.target.value)}
                      className="font-mono text-sm"
                    />
                    <Input
                      type="time"
                      value={days[i].clockOut}
                      onChange={(e) => updateDay(i, "clockOut", e.target.value)}
                      className="font-mono text-sm"
                    />
                    <span className="text-right text-sm tabular-nums font-mono text-muted-foreground">
                      {minutesToHours(data.regularMin)}h
                    </span>
                    <span className="text-right text-sm tabular-nums font-mono text-amber-600 dark:text-amber-400">
                      {data.overtimeMin > 0 ? `${minutesToHours(data.overtimeMin)}h` : "—"}
                    </span>
                    <span className="text-right text-sm tabular-nums font-mono font-semibold">
                      {minutesToHours(data.totalMin)}h
                    </span>
                  </div>
                  {/* Mobile row */}
                  <div className="sm:hidden grid grid-cols-[60px_1fr_1fr] gap-2 items-center">
                    <span className="text-sm font-medium">{DAY_SHORT[i]}</span>
                    <Input
                      type="time"
                      value={days[i].clockIn}
                      onChange={(e) => updateDay(i, "clockIn", e.target.value)}
                      className="font-mono text-sm"
                    />
                    <Input
                      type="time"
                      value={days[i].clockOut}
                      onChange={(e) => updateDay(i, "clockOut", e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                  {/* Mobile detail line */}
                  <div className="sm:hidden flex gap-4 pl-[68px] mt-1 mb-1 text-xs text-muted-foreground">
                    <span>Reg: {minutesToHours(data.regularMin)}h</span>
                    <span>OT: {data.overtimeMin > 0 ? `${minutesToHours(data.overtimeMin)}h` : "0h"}</span>
                    <span className="font-semibold">Total: {minutesToHours(data.totalMin)}h</span>
                  </div>
                </div>
              )
            })}
          </div>

          <Separator className="my-6" />

          {/* Weekly Summary */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Weekly Summary</h4>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">Total Regular Hours</p>
                <p className="text-2xl font-bold tabular-nums font-mono">{minutesToHours(totals.totalRegMin)}h</p>
                {totals.rate > 0 && (
                  <p className="text-xs text-muted-foreground">{fmtMoney(totals.regPay)}</p>
                )}
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">Total Overtime Hours</p>
                <p className="text-2xl font-bold tabular-nums font-mono">{minutesToHours(totals.totalOtMin)}h</p>
                {totals.rate > 0 && (
                  <p className="text-xs text-muted-foreground">{fmtMoney(totals.otPay)} (1.5x)</p>
                )}
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Total Hours</p>
                <p className="text-2xl font-bold tabular-nums font-mono">{minutesToHours(totals.totalMin)}h</p>
                {totals.rate > 0 && (
                  <p className="text-xs text-muted-foreground">Grand Total: {fmtMoney(totals.grandTotal)}</p>
                )}
              </div>
            </div>

            {/* Pay breakdown */}
            {totals.rate > 0 && (
              <div className="rounded-lg border bg-card p-4 space-y-2">
                <h5 className="text-sm font-semibold">Pay Breakdown</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Regular Pay ({minutesToHours(totals.totalRegMin)}h × {fmtMoney(totals.rate)})</span>
                  <span className="text-right font-mono font-medium">{fmtMoney(totals.regPay)}</span>
                  {totals.totalOtMin > 0 && (
                    <>
                      <span className="text-muted-foreground">Overtime Pay ({minutesToHours(totals.totalOtMin)}h × {fmtMoney(totals.rate)} × 1.5)</span>
                      <span className="text-right font-mono font-medium">{fmtMoney(totals.otPay)}</span>
                    </>
                  )}
                  <Separator className="col-span-2" />
                  <span className="font-semibold">Grand Total</span>
                  <span className="text-right font-mono font-bold text-lg">{fmtMoney(totals.grandTotal)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 print:hidden">
            <Button onClick={handlePrint} className="flex-1">
              <Printer className="size-4 mr-2" /> Print Timesheet
            </Button>
            <Button variant="outline" onClick={resetAll}>
              <RotateCcw className="size-4 mr-2" /> Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-4 print:hidden">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <CalendarDays className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All timesheet calculations happen locally. Your work hours and pay data are never sent to any server.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
