"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TrendingDown, DollarSign } from "lucide-react"

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function InflationCalculatorTool() {
  const [amount, setAmount] = useState("")
  const [startYear, setStartYear] = useState("")
  const [endYear, setEndYear] = useState("")
  const [useCustom, setUseCustom] = useState(true)
  const [customRate, setCustomRate] = useState("3")

  const amt = parseFloat(amount) || 0
  const start = parseInt(startYear) || 0
  const end = parseInt(endYear) || 0
  const rate = (parseFloat(customRate) || 0) / 100

  const results = useMemo(() => {
    if (amt <= 0 || start <= 0 || end <= 0 || end <= start || rate <= 0) return null

    const years = end - start
    const equivalentAmount = amt * Math.pow(1 + rate, years)
    const totalInflation = ((equivalentAmount - amt) / amt) * 100
    const purchasingPower = (amt / equivalentAmount) * 100

    const yearByYear: {
      year: number
      value: number
      lostPurchasingPower: number
      cumulativeInflation: number
    }[] = []

    for (let y = start; y <= end; y++) {
      const elapsed = y - start
      const val = amt * Math.pow(1 + rate, elapsed)
      const cumInflation = ((val - amt) / amt) * 100
      const pp = (amt / val) * 100
      yearByYear.push({
        year: y,
        value: val,
        lostPurchasingPower: 100 - pp,
        cumulativeInflation: cumInflation,
      })
    }

    return {
      years,
      equivalentAmount,
      totalInflation,
      purchasingPower,
      yearByYear,
    }
  }, [amt, start, end, rate])

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Inflation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="amount" className="flex items-center gap-1.5">
                <DollarSign className="size-4" /> Amount ($)
              </Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  placeholder="e.g., 10000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="start-year">Start Year</Label>
              <Input
                id="start-year"
                type="number"
                min="1900"
                max="2100"
                placeholder="e.g., 2010"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="end-year">End Year</Label>
              <Input
                id="end-year"
                type="number"
                min="1900"
                max="2100"
                placeholder="e.g., 2025"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="rate">Annual Inflation Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                min="0.1"
                placeholder="e.g., 3"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">US long-term average ~3%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Equivalent Amount in {end}</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.equivalentAmount)}</p>
                <p className="text-xs text-muted-foreground mt-1">What {formatCurrency(amt)} from {start} would need to be</p>
              </CardContent>
            </Card>
            <Card className="border-rose-200 bg-rose-50/50 dark:border-rose-900 dark:bg-rose-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Inflation</p>
                <p className="text-2xl font-bold mt-1 text-rose-600 dark:text-rose-400">{results.totalInflation.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">Over {results.years} years</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Purchasing Power Remaining</p>
                <p className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">{results.purchasingPower.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">Of original {formatCurrency(amt)}</p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Purchasing Power Lost</p>
                <p className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">{(100 - results.purchasingPower).toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">{(100 - results.purchasingPower) * amt / 100 > 0 ? formatCurrency((100 - results.purchasingPower) * amt / 100) : "$0.00"} lost in value</p>
              </CardContent>
            </Card>
          </div>

          {/* Visual Purchasing Power Bar */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Purchasing Power Shrinkage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{formatCurrency(amt)} in {start}</span>
                  <span className="font-medium">{formatCurrency(results.equivalentAmount)} needed in {end}</span>
                </div>
                <div className="relative w-full h-10 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-emerald-500 rounded-lg transition-all duration-500"
                    style={{ width: `${Math.max(results.purchasingPower, 1)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold drop-shadow-sm">
                      {results.purchasingPower.toFixed(1)}% of original purchasing power
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Year-by-year table */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Year-by-Year Value Erosion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead className="text-right">Equivalent Amount</TableHead>
                      <TableHead className="text-right">Cumulative Inflation</TableHead>
                      <TableHead className="text-right">Purchasing Power</TableHead>
                      <TableHead className="text-right w-32">Power Lost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.yearByYear.map((row) => (
                      <TableRow key={row.year}>
                        <TableCell className="font-medium">{row.year}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{formatCurrency(row.value)}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{row.cumulativeInflation.toFixed(1)}%</TableCell>
                        <TableCell className="text-right font-mono text-sm">{row.value > 0 ? (100 / (row.cumulativeInflation + 100) * 100).toFixed(1) : "0.0"}%</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-rose-500 rounded-full"
                                style={{ width: `${Math.min(row.lostPurchasingPower, 100)}%` }}
                              />
                            </div>
                            <span className="font-mono text-xs w-12 text-right">{row.lostPurchasingPower.toFixed(1)}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!results && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center py-12">
            <TrendingDown className="size-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Enter an amount, year range, and inflation rate to see how purchasing power changes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
