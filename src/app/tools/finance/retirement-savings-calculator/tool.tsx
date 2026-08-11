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
import { Landmark, CheckCircle, AlertTriangle } from "lucide-react"

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function RetirementSavingsCalculatorTool() {
  const [currentAge, setCurrentAge] = useState("")
  const [retirementAge, setRetirementAge] = useState("")
  const [currentSavings, setCurrentSavings] = useState("")
  const [monthlyContrib, setMonthlyContrib] = useState("")
  const [annualReturn, setAnnualReturn] = useState("")
  const [inflationRate, setInflationRate] = useState("")
  const [desiredIncome, setDesiredIncome] = useState("")
  const [retirementYears, setRetirementYears] = useState("")

  const cAge = parseInt(currentAge) || 0
  const rAge = parseInt(retirementAge) || 0
  const savings = parseFloat(currentSavings) || 0
  const monthly = parseFloat(monthlyContrib) || 0
  const returnRate = (parseFloat(annualReturn) || 0) / 100
  const infRate = (parseFloat(inflationRate) || 0) / 100
  const desired = parseFloat(desiredIncome) || 0
  const rYears = parseInt(retirementYears) || 0

  const results = useMemo(() => {
    if (cAge <= 0 || rAge <= 0 || rAge <= cAge || returnRate <= 0) return null

    const yearsToRetire = rAge - cAge
    const monthlyRate = returnRate / 12
    let balance = savings
    let totalContributions = savings
    let totalGrowth = 0

    const projection: {
      age: number
      balance: number
      contributions: number
      growth: number
    }[] = []

    for (let year = 1; year <= yearsToRetire; year++) {
      let yearGrowth = 0
      for (let month = 1; month <= 12; month++) {
        const monthGrowth = balance * monthlyRate
        yearGrowth += monthGrowth
        balance += monthGrowth + monthly
      }
      totalContributions += monthly * 12
      totalGrowth += yearGrowth
      projection.push({
        age: cAge + year,
        balance,
        contributions: totalContributions,
        growth: totalGrowth,
      })
    }

    const monthlyIncomeInRetirement = rYears > 0 ? balance / (rYears * 12) : 0
    const neededForGoal = desired > 0 && rYears > 0 ? desired * rYears : 0
    const surplus = balance - neededForGoal
    const goalMet = desired <= 0 || surplus >= 0

    return {
      yearsToRetire,
      totalContributions,
      totalGrowth,
      totalAtRetirement: balance,
      monthlyIncomeInRetirement,
      neededForGoal,
      surplus,
      goalMet,
      projection,
    }
  }, [cAge, rAge, savings, monthly, returnRate, desired, rYears])

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Retirement Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="current-age">Current Age</Label>
              <Input
                id="current-age"
                type="number"
                min="18"
                max="80"
                placeholder="e.g., 30"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="retirement-age">Retirement Age</Label>
              <Input
                id="retirement-age"
                type="number"
                min="30"
                max="90"
                placeholder="e.g., 65"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="current-savings">Current Savings ($)</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="current-savings"
                  type="number"
                  min="0"
                  placeholder="e.g., 50000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="monthly-contrib">Monthly Contribution ($)</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="monthly-contrib"
                  type="number"
                  min="0"
                  placeholder="e.g., 1000"
                  value={monthlyContrib}
                  onChange={(e) => setMonthlyContrib(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="annual-return">Expected Annual Return (%)</Label>
              <Input
                id="annual-return"
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g., 7"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">S&P 500 avg ~10%, after inflation ~7%</p>
            </div>
            <div>
              <Label htmlFor="inflation-rate">Inflation Rate (%)</Label>
              <Input
                id="inflation-rate"
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g., 3"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">US average ~3%</p>
            </div>
            <div>
              <Label htmlFor="desired-income">Desired Retirement Income ($/yr)</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="desired-income"
                  type="number"
                  min="0"
                  placeholder="e.g., 60000"
                  value={desiredIncome}
                  onChange={(e) => setDesiredIncome(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="retirement-years">Years in Retirement</Label>
              <Input
                id="retirement-years"
                type="number"
                min="1"
                max="50"
                placeholder="e.g., 25"
                value={retirementYears}
                onChange={(e) => setRetirementYears(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Goal Status */}
          <Card className={results.goalMet ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20" : "border-rose-200 bg-rose-50/50 dark:border-rose-900 dark:bg-rose-950/20"}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {results.goalMet ? (
                  <CheckCircle className="size-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="size-6 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <div>
                  <p className="font-bold text-lg">
                    {results.goalMet ? "On Track!" : "Shortfall Detected"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {results.goalMet
                      ? `You're projected to have ${formatCurrency(results.surplus)} more than needed.`
                      : `You're projected to be ${formatCurrency(Math.abs(results.surplus))} short of your goal.`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Years to Retirement</p>
                <p className="text-2xl font-bold mt-1">{results.yearsToRetire}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Contributions</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.totalContributions)}</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Investment Growth</p>
                <p className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">{formatCurrency(results.totalGrowth)}</p>
              </CardContent>
            </Card>
            <Card className={results.goalMet ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20" : "border-rose-200 bg-rose-50/50 dark:border-rose-900 dark:bg-rose-950/20"}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total at Retirement (Age {rAge})</p>
                <p className={`text-2xl font-bold mt-1 ${results.goalMet ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{formatCurrency(results.totalAtRetirement)}</p>
              </CardContent>
            </Card>
          </div>

          {rYears > 0 && desired > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Monthly Income in Retirement</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(results.monthlyIncomeInRetirement)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Balance ÷ ({rYears} years × 12 months)</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">{results.goalMet ? "Surplus" : "Shortfall"}</p>
                  <p className={`text-2xl font-bold mt-1 ${results.goalMet ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{formatCurrency(Math.abs(results.surplus))}</p>
                  <p className="text-xs text-muted-foreground mt-1">vs. {formatCurrency(results.neededForGoal)} needed</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Year-by-year table */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Year-by-Year Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Age</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead className="text-right">Total Contributions</TableHead>
                      <TableHead className="text-right">Total Growth</TableHead>
                      <TableHead className="text-right">Growth %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.projection.map((row) => (
                      <TableRow key={row.age}>
                        <TableCell className="font-medium">{row.age}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{formatCurrency(row.balance)}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{formatCurrency(row.contributions)}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{formatCurrency(row.growth)}</TableCell>
                        <TableCell className="text-right font-mono text-sm">
                          {row.contributions > 0 ? ((row.growth / row.contributions) * 100).toFixed(1) : "0.0"}%
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
            <Landmark className="size-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Enter your age, savings, and contribution details to project your retirement.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
