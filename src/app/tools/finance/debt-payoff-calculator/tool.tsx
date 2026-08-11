"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreditCard, Plus, Trash2, Trophy, TrendingDown } from "lucide-react"

interface Debt {
  id: string
  name: string
  balance: number
  rate: number
  minimum: number
}

interface PayoffResult {
  totalInterest: number
  totalMonths: number
  totalPaid: number
  schedule: {
    month: number
    payments: { name: string; paid: number; interest: number; remaining: number }[]
  }[]
}

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function calculatePayoff(
  debts: Debt[],
  extraPayment: number,
  sortBy: "balance" | "rate"
): PayoffResult {
  const sorted = [...debts].sort((a, b) =>
    sortBy === "balance" ? a.balance - b.balance : b.rate - a.rate
  )

  const balances = sorted.map((d) => ({ ...d, currentBalance: d.balance }))
  let totalInterest = 0
  let month = 0
  const schedule: PayoffResult["schedule"] = []

  while (balances.some((d) => d.currentBalance > 0)) {
    month++
    if (month > 600) break // safety limit

    let extra = extraPayment
    const monthPayments: PayoffResult["schedule"][0]["payments"] = []

    for (const debt of balances) {
      if (debt.currentBalance <= 0) {
        monthPayments.push({ name: debt.name, paid: 0, interest: 0, remaining: 0 })
        continue
      }

      const monthlyRate = debt.rate / 100 / 12
      const interest = debt.currentBalance * monthlyRate
      let payment = debt.minimum

      if (extra > 0) {
        payment += extra
        extra = 0
      }

      const totalOwed = debt.currentBalance + interest
      if (payment >= totalOwed) {
        payment = totalOwed
        const actualExtra = payment - interest - debt.minimum
        if (actualExtra > 0) extra += actualExtra
      }

      const principal = payment - interest
      debt.currentBalance = Math.max(0, debt.currentBalance - principal)
      totalInterest += interest

      monthPayments.push({
        name: debt.name,
        paid: payment,
        interest,
        remaining: debt.currentBalance,
      })
    }

    schedule.push({ month, payments: monthPayments })
  }

  const totalPaid =
    debts.reduce((s, d) => s + d.balance, 0) + totalInterest

  return { totalInterest, totalMonths: month, totalPaid, schedule }
}

export function DebtPayoffCalculatorTool() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: generateId(), name: "Credit Card", balance: 5000, rate: 22, minimum: 125 },
    { id: generateId(), name: "Car Loan", balance: 15000, rate: 5.5, minimum: 300 },
    { id: generateId(), name: "Student Loan", balance: 25000, rate: 6.8, minimum: 280 },
  ])
  const [extraPayment, setExtraPayment] = useState("200")
  const [newName, setNewName] = useState("")
  const [newBalance, setNewBalance] = useState("")
  const [newRate, setNewRate] = useState("")
  const [newMin, setNewMin] = useState("")

  const extra = parseFloat(extraPayment) || 0

  const validDebts = debts.filter((d) => d.balance > 0 && d.minimum > 0)

  const snowball = useMemo(
    () =>
      validDebts.length > 0 ? calculatePayoff(validDebts, extra, "balance") : null,
    [validDebts, extra]
  )

  const avalanche = useMemo(
    () =>
      validDebts.length > 0 ? calculatePayoff(validDebts, extra, "rate") : null,
    [validDebts, extra]
  )

  const addDebt = () => {
    const name = (newName || "").trim()
    const balance = parseFloat(newBalance) || 0
    const rate = parseFloat(newRate) || 0
    const min = parseFloat(newMin) || 0
    if (!name || balance <= 0 || min <= 0) return
    setDebts((prev) => [
      ...prev,
      { id: generateId(), name, balance, rate, minimum: min },
    ])
    setNewName("")
    setNewBalance("")
    setNewRate("")
    setNewMin("")
  }

  const removeDebt = (id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id))
  }

  const updateDebt = (id: string, field: keyof Debt, value: string) => {
    setDebts((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d
        const num = parseFloat(value) || 0
        return { ...d, [field]: field === "name" ? value : num }
      })
    )
  }

  const totalDebt = debts.reduce((s, d) => s + d.balance, 0)
  const totalMin = debts.reduce((s, d) => s + d.minimum, 0)
  const savings =
    snowball && avalanche
      ? snowball.totalInterest - avalanche.totalInterest
      : 0

  return (
    <div className="space-y-6">
      {/* Debts List */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Your Debts ({debts.length})</CardTitle>
            <div className="text-sm text-muted-foreground">
              Total: <span className="font-semibold text-foreground">{formatCurrency(totalDebt)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-64 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Rate %</TableHead>
                  <TableHead className="text-right">Min Payment</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {debts.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatCurrency(d.balance)}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{d.rate}%</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatCurrency(d.minimum)}/mo</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => removeDebt(d.id)}
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Debt + Extra Payment */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Add New Debt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <Label htmlFor="debt-name">Name</Label>
              <Input id="debt-name" placeholder="e.g., Personal Loan" value={newName} onChange={(e) => setNewName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="debt-balance">Balance ($)</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="debt-balance" type="number" min="0" placeholder="e.g., 8000" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} className="pl-7" />
              </div>
            </div>
            <div>
              <Label htmlFor="debt-rate">Interest Rate (%)</Label>
              <Input id="debt-rate" type="number" step="0.1" min="0" placeholder="e.g., 18" value={newRate} onChange={(e) => setNewRate(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="debt-min">Min Payment ($)</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="debt-min" type="number" min="0" placeholder="e.g., 150" value={newMin} onChange={(e) => setNewMin(e.target.value)} className="pl-7" />
              </div>
            </div>
            <div className="flex items-end">
              <Button onClick={addDebt} variant="secondary" className="w-full">
                <Plus className="size-4 mr-1" />
                Add
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="max-w-xs">
            <Label htmlFor="extra-payment">Extra Monthly Payment ($)</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="extra-payment"
                type="number"
                min="0"
                placeholder="e.g., 200"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                className="pl-7"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Min payments total: {formatCurrency(totalMin)}/mo
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {snowball && avalanche && (
        <>
          {/* Side-by-side comparison */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Snowball vs Avalanche Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
                  <CardContent className="pt-4 text-center">
                    <Badge variant="outline" className="mb-2">Snowball</Badge>
                    <p className="text-xs text-muted-foreground">Total Interest</p>
                    <p className="text-xl font-bold">{formatCurrency(snowball.totalInterest)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{snowball.totalMonths} months ({(snowball.totalMonths / 12).toFixed(1)} yrs)</p>
                  </CardContent>
                </Card>
                <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20">
                  <CardContent className="pt-4 text-center">
                    <Badge variant="outline" className="mb-2">Avalanche</Badge>
                    <p className="text-xs text-muted-foreground">Total Interest</p>
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(avalanche.totalInterest)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{avalanche.totalMonths} months ({(avalanche.totalMonths / 12).toFixed(1)} yrs)</p>
                  </CardContent>
                </Card>
                <Card className={savings >= 0 ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20" : "border-rose-200 bg-rose-50/50 dark:border-rose-900 dark:bg-rose-950/20"}>
                  <CardContent className="pt-4 text-center">
                    <Trophy className={`size-5 mx-auto mb-1 ${savings > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`} />
                    <p className="text-xs text-muted-foreground">Avalanche Saves</p>
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(savings)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{snowball.totalMonths - avalanche.totalMonths > 0 ? `${snowball.totalMonths - avalanche.totalMonths} fewer months` : "Same timeline"}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Schedules */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Month-by-Month Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="snowball">
                <TabsList className="mb-4">
                  <TabsTrigger value="snowball">Snowball (Smallest First)</TabsTrigger>
                  <TabsTrigger value="avalanche">Avalanche (Highest Rate)</TabsTrigger>
                </TabsList>
                <TabsContent value="snowball">
                  <ScheduleTable schedule={snowball.schedule} debtNames={validDebts.map((d) => d.name)} />
                </TabsContent>
                <TabsContent value="avalanche">
                  <ScheduleTable schedule={avalanche.schedule} debtNames={validDebts.map((d) => d.name)} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}

      {!snowball && !avalanche && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center py-12">
            <CreditCard className="size-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Add at least one debt with valid balance and minimum payment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ScheduleTable({
  schedule,
  debtNames,
}: {
  schedule: PayoffResult["schedule"]
  debtNames: string[]
}) {
  const displaySchedule = schedule.filter(
    (m) => m.month <= 60 || m === schedule[schedule.length - 1]
  )
  const truncated = schedule.length > displaySchedule.length

  return (
    <div className="max-h-96 overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            {debtNames.map((name) => (
              <TableHead key={name} className="text-right">{name} Remaining</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {displaySchedule.map((m) => (
            <TableRow key={m.month}>
              <TableCell className="font-medium">{m.month}</TableCell>
              {m.payments.map((p) => (
                <TableCell
                  key={p.name}
                  className={`text-right font-mono text-sm ${p.remaining <= 0 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : ""}`}
                >
                  {p.remaining <= 0 ? "Paid Off" : formatCurrency(p.remaining)}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {truncated && (
            <TableRow>
              <TableCell colSpan={debtNames.length + 1} className="text-center text-muted-foreground text-sm">
                ... showing first 60 months of {schedule.length} total ...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
