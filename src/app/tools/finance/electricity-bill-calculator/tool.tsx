"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Zap, Plus, Trash2, RotateCcw, Lightbulb, AlertTriangle } from "lucide-react"

interface Appliance {
  id: string
  name: string
  wattage: number
  hoursPerDay: number
  quantity: number
}

const PREDEFINED_APPLIANCES: Omit<Appliance, "id">[] = [
  { name: "Air Conditioner", wattage: 1500, hoursPerDay: 8, quantity: 1 },
  { name: "Refrigerator", wattage: 150, hoursPerDay: 24, quantity: 1 },
  { name: "Washing Machine", wattage: 500, hoursPerDay: 1, quantity: 1 },
  { name: "TV", wattage: 100, hoursPerDay: 5, quantity: 1 },
  { name: "Laptop", wattage: 65, hoursPerDay: 8, quantity: 1 },
  { name: "LED Bulb", wattage: 10, hoursPerDay: 8, quantity: 5 },
  { name: "Ceiling Fan", wattage: 75, hoursPerDay: 10, quantity: 1 },
  { name: "Iron", wattage: 1000, hoursPerDay: 0.5, quantity: 1 },
  { name: "Microwave", wattage: 1000, hoursPerDay: 0.25, quantity: 1 },
  { name: "Water Heater", wattage: 2000, hoursPerDay: 1, quantity: 1 },
]

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function ElectricityBillCalculatorTool() {
  const [appliances, setAppliances] = useState<Appliance[]>([])
  const [tariff, setTariff] = useState<string>("0.12")
  const [customName, setCustomName] = useState("")
  const [customWattage, setCustomWattage] = useState("")
  const [customHours, setCustomHours] = useState("")
  const [customQty, setCustomQty] = useState("1")
  const [addedPresets, setAddedPresets] = useState<Set<string>>(new Set())

  const tariffRate = parseFloat(tariff) || 0

  const addPreset = (preset: Omit<Appliance, "id">) => {
    if (addedPresets.has(preset.name)) return
    setAddedPresets((prev) => new Set(prev).add(preset.name))
    setAppliances((prev) => [...prev, { ...preset, id: generateId() }])
  }

  const removeAppliance = (id: string) => {
    setAppliances((prev) => {
      const appliance = prev.find((a) => a.id === id)
      if (appliance) {
        setAddedPresets((prevSet) => {
          const next = new Set(prevSet)
          next.delete(appliance.name)
          return next
        })
      }
      return prev.filter((a) => a.id !== id)
    })
  }

  const addCustomAppliance = () => {
    const name = (customName || "").trim()
    const wattage = parseFloat(customWattage) || 0
    const hours = parseFloat(customHours) || 0
    const qty = parseInt(customQty) || 1
    if (!name || wattage <= 0 || hours <= 0) return
    setAppliances((prev) => [
      ...prev,
      { id: generateId(), name, wattage, hoursPerDay: hours, quantity: qty },
    ])
    setCustomName("")
    setCustomWattage("")
    setCustomHours("")
    setCustomQty("1")
  }

  const resetAll = () => {
    setAppliances([])
    setAddedPresets(new Set())
  }

  const results = useMemo(() => {
    if (appliances.length === 0 || tariffRate <= 0) return null

    const breakdown = appliances.map((a) => {
      const dailyKwh = (a.wattage * a.hoursPerDay * a.quantity) / 1000
      const monthlyKwh = dailyKwh * 30
      const yearlyKwh = dailyKwh * 365
      const monthlyCost = monthlyKwh * tariffRate
      const yearlyCost = yearlyKwh * tariffRate
      return { ...a, dailyKwh, monthlyKwh, yearlyKwh, monthlyCost, yearlyCost }
    })

    breakdown.sort((a, b) => b.monthlyCost - a.monthlyCost)

    const totalMonthlyKwh = breakdown.reduce((s, a) => s + a.monthlyKwh, 0)
    const totalYearlyKwh = breakdown.reduce((s, a) => s + a.yearlyKwh, 0)
    const totalMonthlyCost = breakdown.reduce((s, a) => s + a.monthlyCost, 0)
    const totalYearlyCost = breakdown.reduce((s, a) => s + a.yearlyCost, 0)

    return {
      breakdown,
      totalMonthlyKwh,
      totalYearlyKwh,
      totalMonthlyCost,
      totalYearlyCost,
    }
  }, [appliances, tariffRate])

  const availablePresets = PREDEFINED_APPLIANCES.filter(
    (p) => !addedPresets.has(p.name)
  )

  return (
    <div className="space-y-6">
      {/* Tariff Input */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="size-5 text-amber-500" />
            Electricity Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
            <div className="flex-1 w-full">
              <Label htmlFor="tariff">Tariff Rate (per kWh)</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="tariff"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={tariff}
                  onChange={(e) => setTariff(e.target.value)}
                  className="pl-7"
                  placeholder="0.12"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">US average: $0.12–$0.16/kWh</p>
          </div>
        </CardContent>
      </Card>

      {/* Common Appliances */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="size-5 text-amber-500" />
            Common Appliances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availablePresets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => addPreset(preset)}
                className="text-xs"
              >
                <Plus className="size-3 mr-1" />
                {preset.name} ({preset.wattage}W)
              </Button>
            ))}
            {availablePresets.length === 0 && (
              <p className="text-sm text-muted-foreground">All common appliances have been added.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Custom Appliance */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Add Custom Appliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <Label htmlFor="custom-name">Name</Label>
              <Input
                id="custom-name"
                placeholder="e.g., Desktop PC"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="custom-wattage">Wattage (W)</Label>
              <Input
                id="custom-wattage"
                type="number"
                placeholder="e.g., 300"
                value={customWattage}
                onChange={(e) => setCustomWattage(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="custom-hours">Hours/Day</Label>
              <Input
                id="custom-hours"
                type="number"
                step="0.5"
                placeholder="e.g., 8"
                value={customHours}
                onChange={(e) => setCustomHours(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="custom-qty">Quantity</Label>
              <Input
                id="custom-qty"
                type="number"
                min="1"
                placeholder="1"
                value={customQty}
                onChange={(e) => setCustomQty(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={addCustomAppliance}
                className="w-full"
                variant="secondary"
              >
                <Plus className="size-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Appliances */}
      {appliances.length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Active Appliances ({appliances.length})
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAll}
                className="text-destructive hover:text-destructive"
              >
                <RotateCcw className="size-4 mr-1" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Wattage</TableHead>
                    <TableHead className="text-right">Hrs/Day</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Daily kWh</TableHead>
                    <TableHead className="text-right">Monthly kWh</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appliances.map((a) => {
                    const dailyKwh = (a.wattage * a.hoursPerDay * a.quantity) / 1000
                    return (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">{a.name}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{a.wattage}W</TableCell>
                        <TableCell className="text-right font-mono text-sm">{a.hoursPerDay}h</TableCell>
                        <TableCell className="text-right">{a.quantity}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{dailyKwh.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{(dailyKwh * 30).toFixed(1)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            onClick={() => removeAppliance(a.id)}
                          >
                            <Trash2 className="size-3.5 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Monthly kWh</p>
                <p className="text-2xl font-bold mt-1">{results.totalMonthlyKwh.toFixed(1)}</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Monthly Cost</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.totalMonthlyCost)}</p>
              </CardContent>
            </Card>
            <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Yearly kWh</p>
                <p className="text-2xl font-bold mt-1">{results.totalYearlyKwh.toFixed(1)}</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Yearly Cost</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.totalYearlyCost)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Breakdown Table */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Cost Breakdown (Sorted by Cost)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Appliance</TableHead>
                      <TableHead className="text-right">Daily kWh</TableHead>
                      <TableHead className="text-right">Monthly kWh</TableHead>
                      <TableHead className="text-right">Monthly Cost</TableHead>
                      <TableHead className="text-right">Yearly Cost</TableHead>
                      <TableHead className="text-right">% of Bill</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.breakdown.map((a) => {
                      const pct =
                        results.totalMonthlyCost > 0
                          ? (a.monthlyCost / results.totalMonthlyCost) * 100
                          : 0
                      return (
                        <TableRow key={a.id}>
                          <TableCell className="font-medium">
                            {a.name}
                            {a.quantity > 1 && (
                              <Badge variant="secondary" className="ml-2 text-xs">×{a.quantity}</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm">{a.dailyKwh.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-mono text-sm">{a.monthlyKwh.toFixed(1)}</TableCell>
                          <TableCell className="text-right font-mono text-sm font-semibold">{formatCurrency(a.monthlyCost)}</TableCell>
                          <TableCell className="text-right font-mono text-sm">{formatCurrency(a.yearlyCost)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-500 rounded-full"
                                  style={{ width: `${Math.min(pct, 100)}%` }}
                                />
                              </div>
                              <span className="font-mono text-xs w-10 text-right">{pct.toFixed(1)}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-end gap-6 text-sm font-semibold">
                <span>Monthly: {formatCurrency(results.totalMonthlyCost)}</span>
                <span>Yearly: {formatCurrency(results.totalYearlyCost)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Tip */}
          <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertTriangle className="size-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Tip:</span> The top 2-3 appliances typically account for 60-80% of your electricity bill. Focus on reducing usage or upgrading those first for maximum savings.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {appliances.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center py-12">
            <Zap className="size-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Add appliances above to calculate your electricity bill.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
