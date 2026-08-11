"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Plane, Users, Calendar, Info } from "lucide-react"

const BAR_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-teal-500",
]

function fmtCurrency(value: number): string {
  return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface ExpenseCategory {
  key: string
  label: string
  perPerson?: boolean
  perDay?: boolean
  icon: string
  placeholder: string
}

const CATEGORIES: ExpenseCategory[] = [
  { key: "flights", label: "Flights", perPerson: true, icon: "Plane", placeholder: "e.g., 500" },
  { key: "accommodation", label: "Accommodation", perDay: true, icon: "Home", placeholder: "e.g., 120" },
  { key: "food", label: "Food & Dining", perPerson: true, perDay: true, icon: "UtensilsCrossed", placeholder: "e.g., 40" },
  { key: "transport", label: "Local Transport", perDay: true, icon: "Car", placeholder: "e.g., 15" },
  { key: "activities", label: "Activities & Attractions", perDay: true, icon: "Ticket", placeholder: "e.g., 30" },
  { key: "shopping", label: "Shopping", icon: "ShoppingBag", placeholder: "e.g., 200" },
  { key: "insurance", label: "Travel Insurance", icon: "Shield", placeholder: "e.g., 75" },
  { key: "visa", label: "Visa & Fees", icon: "FileText", placeholder: "e.g., 50" },
]

export function TravelBudgetCalculatorTool() {
  const [duration, setDuration] = useState("")
  const [travelers, setTravelers] = useState("")
  const [buffer, setBuffer] = useState("10")
  const [expenses, setExpenses] = useState<Record<string, string>>({})

  const days = parseInt(duration) || 0
  const numTravelers = parseInt(travelers) || 0
  const bufferPct = parseFloat(buffer) || 0

  const updateExpense = (key: string, value: string) => {
    setExpenses((prev) => ({ ...prev, [key]: value }))
  }

  const results = useMemo(() => {
    if (days <= 0 || numTravelers <= 0) return null

    const breakdown: { key: string; label: string; amount: number; note: string }[] = []
    let subtotal = 0

    for (const cat of CATEGORIES) {
      const raw = parseFloat(expenses[cat.key] || "0")
      let amount = 0
      let note = ""

      if (cat.perPerson && cat.perDay) {
        amount = raw * numTravelers * days
        note = fmtCurrency(raw) + " x " + numTravelers + " travelers x " + days + " days"
      } else if (cat.perPerson) {
        amount = raw * numTravelers
        note = fmtCurrency(raw) + " x " + numTravelers + " travelers"
      } else if (cat.perDay) {
        amount = raw * days
        note = fmtCurrency(raw) + " x " + days + " days"
      } else {
        amount = raw
        note = "Total"
      }

      subtotal += amount
      breakdown.push({ key: cat.key, label: cat.label, amount, note })
    }

    const bufferAmount = subtotal * (bufferPct / 100)
    const grandTotal = subtotal + bufferAmount
    const perPerson = numTravelers > 0 ? grandTotal / numTravelers : 0
    const perDay = days > 0 ? grandTotal / days : 0
    const perPersonPerDay = days > 0 && numTravelers > 0 ? grandTotal / (days * numTravelers) : 0

    return { breakdown, subtotal, bufferAmount, grandTotal, perPerson, perDay, perPersonPerDay }
  }, [days, numTravelers, bufferPct, expenses])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Trip Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="duration" className="flex items-center gap-1.5">
                <Calendar className="size-4" /> Duration (days)
              </Label>
              <Input id="duration" type="number" min="1" placeholder="e.g., 7" value={duration} onChange={(e) => setDuration(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="travelers" className="flex items-center gap-1.5">
                <Users className="size-4" /> Number of Travelers
              </Label>
              <Input id="travelers" type="number" min="1" placeholder="e.g., 2" value={travelers} onChange={(e) => setTravelers(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="buffer" className="flex items-center gap-1.5">
                <Info className="size-4" /> Emergency Buffer (%)
              </Label>
              <Input id="buffer" type="number" min="0" max="100" placeholder="e.g., 10" value={buffer} onChange={(e) => setBuffer(e.target.value)} className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {CATEGORIES.map((cat, idx) => {
              const tag: string[] = []
              if (cat.perPerson) tag.push("per person")
              if (cat.perDay) tag.push("per day")
              const colorClass = BAR_COLORS[idx] || "bg-gray-500"
              return (
                <div key={cat.key}>
                  <Label htmlFor={cat.key} className="flex items-center gap-2">
                    <span className={"w-3 h-3 rounded-sm shrink-0 " + colorClass} />
                    {cat.label}
                    {tag.length > 0 && (
                      <span className="text-xs text-muted-foreground font-normal ml-1">
                        ({tag.join(", ")})
                      </span>
                    )}
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id={cat.key}
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder={cat.placeholder}
                      value={expenses[cat.key] || ""}
                      onChange={(e) => updateExpense(cat.key, e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {results && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="text-2xl font-bold mt-1">{fmtCurrency(results.subtotal)}</p>
              </CardContent>
            </Card>
            <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Buffer ({bufferPct}%)</p>
                <p className="text-2xl font-bold mt-1">{fmtCurrency(results.bufferAmount)}</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Grand Total</p>
                <p className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">{fmtCurrency(results.grandTotal)}</p>
              </CardContent>
            </Card>
            <Card className="border-violet-200 bg-violet-50/50 dark:border-violet-900 dark:bg-violet-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Per Person / Day</p>
                <p className="text-2xl font-bold mt-1">{fmtCurrency(results.perPersonPerDay)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.breakdown.map((item, idx) => {
                  const pct = results.subtotal > 0 ? (item.amount / results.subtotal) * 100 : 0
                  const colorClass = BAR_COLORS[idx] || "bg-gray-500"
                  return (
                    <div key={item.key}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium flex items-center gap-2">
                          <span className={"w-3 h-3 rounded-sm " + colorClass} />
                          {item.label}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground hidden sm:inline">{item.note}</span>
                          <span className="font-mono font-semibold">{fmtCurrency(item.amount)}</span>
                          <span className="text-xs text-muted-foreground w-12 text-right">{pct.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className={"h-full rounded-full " + colorClass} style={{ width: Math.min(pct, 100) + "%" }} />
                      </div>
                    </div>
                  )
                })}
                <Separator />
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Emergency Buffer</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono">{fmtCurrency(results.bufferAmount)}</span>
                    <span className="text-xs text-muted-foreground w-12 text-right">{bufferPct}%</span>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span>Total for {numTravelers} Traveler{numTravelers > 1 ? "s" : ""}</span>
                  <span className="text-lg font-mono">{fmtCurrency(results.grandTotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Per person total</span>
                  <span className="font-mono">{fmtCurrency(results.perPerson)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Per day total</span>
                  <span className="font-mono">{fmtCurrency(results.perDay)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!results && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center py-12">
            <Plane className="size-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Enter trip duration and number of travelers to start planning your budget.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
