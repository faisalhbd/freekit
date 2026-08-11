"use client"

import { useState, useCallback } from "react"
import {
  Wallet,
  DollarSign,
  Clock,
  Calendar,
  Copy,
  Check,
  ArrowRightLeft,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ─── Helpers ───────────────────────────────────────────────────

function formatCurrency(num: number): string {
  if (!isFinite(num)) return "—"
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  })
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$%]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

// ─── Copy Button ─────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 h-7 text-xs">
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

// ─── Rate Row ────────────────────────────────────────────────────

function RateRow({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
      <p className="text-lg font-bold tabular-nums font-mono">{value}</p>
    </div>
  )
}

// ─── Salary to Hourly Mode ────────────────────────────────────────

function SalaryToHourlyMode() {
  const [salaryStr, setSalaryStr] = useState("")
  const [hoursStr, setHoursStr] = useState("")
  const [weeksStr, setWeeksStr] = useState("")

  const salary = parseInput(salaryStr)
  const hours = parseInput(hoursStr) || 40
  const weeks = parseInput(weeksStr) || 52
  const totalHours = hours * weeks
  const hourly = totalHours > 0 ? salary / totalHours : 0
  const daily = hourly * 8
  const weekly = hourly * hours
  const biweekly = weekly * 2
  const semimonthly = salary / 24
  const monthly = salary / 12

  const hasResult = salary > 0 && hours > 0 && weeks > 0

  const resultsText = hasResult
    ? `Annual: ${formatCurrency(salary)} | Hourly: ${formatCurrency(hourly)} | Daily: ${formatCurrency(daily)} | Weekly: ${formatCurrency(weekly)} | Bi-weekly: ${formatCurrency(biweekly)} | Semi-monthly: ${formatCurrency(semimonthly)} | Monthly: ${formatCurrency(monthly)}`
    : ""

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="sth-salary" className="text-sm font-medium flex items-center gap-2">
          <DollarSign className="size-4" />
          Annual Salary
        </Label>
        <Input
          id="sth-salary"
          type="text"
          inputMode="decimal"
          value={salaryStr}
          onChange={(e) => setSalaryStr(e.target.value)}
          placeholder="e.g. 75000"
          className="font-mono text-base"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sth-hours" className="text-sm font-medium flex items-center gap-2">
            <Clock className="size-4" />
            Working Hours per Week
          </Label>
          <Input
            id="sth-hours"
            type="text"
            inputMode="decimal"
            value={hoursStr}
            onChange={(e) => setHoursStr(e.target.value)}
            placeholder="40"
            className="font-mono text-base"
          />
          <p className="text-xs text-muted-foreground">Standard: 40 hours</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sth-weeks" className="text-sm font-medium flex items-center gap-2">
            <Calendar className="size-4" />
            Weeks Worked per Year
          </Label>
          <Input
            id="sth-weeks"
            type="text"
            inputMode="decimal"
            value={weeksStr}
            onChange={(e) => setWeeksStr(e.target.value)}
            placeholder="52"
            className="font-mono text-base"
          />
          <p className="text-xs text-muted-foreground">Standard: 52 (includes paid holidays)</p>
        </div>
      </div>

      <Separator />

      {hasResult && (
        <>
          <div className="rounded-lg border border-border p-4 space-y-0">
            <RateRow label="Hourly Rate" value={formatCurrency(hourly)} sub={`${totalHours.toLocaleString()} total hours/year`} />
            <RateRow label="Daily Rate (8h)" value={formatCurrency(daily)} sub="Based on 8-hour workday" />
            <RateRow label="Weekly Rate" value={formatCurrency(weekly)} sub={`${hours} hours/week`} />
            <RateRow label="Bi-weekly Rate" value={formatCurrency(biweekly)} sub="Every 2 weeks (26 paychecks/year)" />
            <RateRow label="Semi-monthly Rate" value={formatCurrency(semimonthly)} sub="Twice per month (24 paychecks/year)" />
            <RateRow label="Monthly Rate" value={formatCurrency(monthly)} sub="Annual salary / 12" />
          </div>
          <div className="flex items-center justify-end">
            <CopyButton text={resultsText} />
          </div>
        </>
      )}
    </div>
  )
}

// ─── Hourly to Salary Mode ─────────────────────────────────────────

function HourlyToSalaryMode() {
  const [hourlyStr, setHourlyStr] = useState("")
  const [hoursStr, setHoursStr] = useState("")
  const [weeksStr, setWeeksStr] = useState("")

  const hourly = parseInput(hourlyStr)
  const hours = parseInput(hoursStr) || 40
  const weeks = parseInput(weeksStr) || 52
  const totalHours = hours * weeks
  const annual = hourly * totalHours
  const daily = hourly * 8
  const weekly = hourly * hours
  const biweekly = weekly * 2
  const semimonthly = annual / 24
  const monthly = annual / 12

  const hasResult = hourly > 0 && hours > 0 && weeks > 0

  const resultsText = hasResult
    ? `Annual: ${formatCurrency(annual)} | Hourly: ${formatCurrency(hourly)} | Weekly: ${formatCurrency(weekly)} | Monthly: ${formatCurrency(monthly)}`
    : ""

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="hts-hourly" className="text-sm font-medium flex items-center gap-2">
          <DollarSign className="size-4" />
          Hourly Rate
        </Label>
        <Input
          id="hts-hourly"
          type="text"
          inputMode="decimal"
          value={hourlyStr}
          onChange={(e) => setHourlyStr(e.target.value)}
          placeholder="e.g. 35"
          className="font-mono text-base"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="hts-hours" className="text-sm font-medium flex items-center gap-2">
            <Clock className="size-4" />
            Working Hours per Week
          </Label>
          <Input
            id="hts-hours"
            type="text"
            inputMode="decimal"
            value={hoursStr}
            onChange={(e) => setHoursStr(e.target.value)}
            placeholder="40"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hts-weeks" className="text-sm font-medium flex items-center gap-2">
            <Calendar className="size-4" />
            Weeks Worked per Year
          </Label>
          <Input
            id="hts-weeks"
            type="text"
            inputMode="decimal"
            value={weeksStr}
            onChange={(e) => setWeeksStr(e.target.value)}
            placeholder="52"
            className="font-mono text-base"
          />
        </div>
      </div>

      <Separator />

      {hasResult && (
        <>
          <div className="rounded-lg border border-border p-4 space-y-0">
            <RateRow label="Annual Salary" value={formatCurrency(annual)} sub={`${totalHours.toLocaleString()} total hours/year`} />
            <RateRow label="Monthly Salary" value={formatCurrency(monthly)} sub="Annual / 12" />
            <RateRow label="Semi-monthly" value={formatCurrency(semimonthly)} sub="24 paychecks/year" />
            <RateRow label="Bi-weekly Pay" value={formatCurrency(biweekly)} sub="26 paychecks/year" />
            <RateRow label="Weekly Pay" value={formatCurrency(weekly)} sub={`${hours} hours/week`} />
            <RateRow label="Daily Pay (8h)" value={formatCurrency(daily)} sub="Based on 8-hour day" />
          </div>
          <div className="flex items-center justify-end">
            <CopyButton text={resultsText} />
          </div>
        </>
      )}
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────

export function SalaryToHourlyCalculatorTool() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Wallet className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Salary to Hourly Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Convert between annual salary and hourly rate with full pay breakdown
              </p>
            </div>
          </div>

          <Tabs defaultValue="salary-to-hourly" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="salary-to-hourly" className="gap-1.5">
                <DollarSign className="size-3.5" />
                Salary to Hourly
              </TabsTrigger>
              <TabsTrigger value="hourly-to-salary" className="gap-1.5">
                <ArrowRightLeft className="size-3.5" />
                Hourly to Salary
              </TabsTrigger>
            </TabsList>

            <TabsContent value="salary-to-hourly" className="mt-6">
              <SalaryToHourlyMode />
            </TabsContent>

            <TabsContent value="hourly-to-salary" className="mt-6">
              <HourlyToSalaryMode />
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Wallet className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All calculations happen locally using JavaScript. Your salary data is never sent to any server, stored, or shared.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
