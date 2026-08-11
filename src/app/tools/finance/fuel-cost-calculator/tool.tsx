"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fuel, MapPin, Gauge, DollarSign, ArrowRightLeft } from "lucide-react"

type UnitSystem = "us" | "metric"

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function mpgToLPer100km(mpg: number): number {
  return 235.215 / mpg
}

function lPer100kmToMpg(l: number): number {
  return 235.215 / l
}

export function FuelCostCalculatorTool() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us")
  const [distance, setDistance] = useState("")
  const [efficiency, setEfficiency] = useState("")
  const [fuelPrice, setFuelPrice] = useState("")

  const dist = parseFloat(distance) || 0
  const eff = parseFloat(efficiency) || 0
  const price = parseFloat(fuelPrice) || 0

  const results = useMemo(() => {
    if (dist <= 0 || eff <= 0 || price <= 0) return null

    let fuelNeeded: number
    let totalCost: number
    let costPerUnit: number
    let distLabel: string
    let fuelLabel: string
    let effLabel: string

    if (unitSystem === "us") {
      fuelNeeded = dist / eff
      totalCost = fuelNeeded * price
      costPerUnit = totalCost / dist
      distLabel = "miles"
      fuelLabel = "gallons"
      effLabel = "MPG"
    } else {
      fuelNeeded = (dist * eff) / 100
      totalCost = fuelNeeded * price
      costPerUnit = totalCost / dist
      distLabel = "km"
      fuelLabel = "liters"
      effLabel = "L/100km"
    }

    return { fuelNeeded, totalCost, costPerUnit, distLabel, fuelLabel, effLabel }
  }, [dist, eff, price, unitSystem])

  const handleSwitchSystem = (newSystem: UnitSystem) => {
    if (newSystem === unitSystem) return
    const curDist = parseFloat(distance) || 0
    const curEff = parseFloat(efficiency) || 0
    const curPrice = parseFloat(fuelPrice) || 0

    if (newSystem === "metric" && unitSystem === "us") {
      setDistance(curDist > 0 ? (curDist * 1.60934).toFixed(1) : "")
      setEfficiency(curEff > 0 ? mpgToLPer100km(curEff).toFixed(1) : "")
      setFuelPrice(curPrice > 0 ? (curPrice / 3.78541).toFixed(3) : "")
    } else {
      setDistance(curDist > 0 ? (curDist / 1.60934).toFixed(1) : "")
      setEfficiency(curEff > 0 ? lPer100kmToMpg(curEff).toFixed(1) : "")
      setFuelPrice(curPrice > 0 ? (curPrice * 3.78541).toFixed(2) : "")
    }
    setUnitSystem(newSystem)
  }

  const isUS = unitSystem === "us"

  return (
    <div className="space-y-6">
      {/* Unit System Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <Label className="text-base font-medium">Unit System</Label>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isUS
                  ? "Distance in miles, efficiency in MPG, price per gallon"
                  : "Distance in km, efficiency in L/100km, price per liter"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isUS ? "default" : "outline"}>US</Badge>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => handleSwitchSystem(isUS ? "metric" : "us")}
              >
                <ArrowRightLeft className="size-4" />
              </Button>
              <Badge variant={!isUS ? "default" : "outline"}>Metric</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inputs */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Trip Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="distance" className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                Distance ({isUS ? "miles" : "km"})
              </Label>
              <Input
                id="distance"
                type="number"
                min="1"
                placeholder={isUS ? "e.g., 500" : "e.g., 800"}
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="efficiency" className="flex items-center gap-1.5">
                <Gauge className="size-4" />
                Fuel Efficiency ({isUS ? "MPG" : "L/100km"})
              </Label>
              <Input
                id="efficiency"
                type="number"
                step="0.1"
                min="0.1"
                placeholder={isUS ? "e.g., 30" : "e.g., 7.8"}
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fuel-price" className="flex items-center gap-1.5">
                <DollarSign className="size-4" />
                Fuel Price (per {isUS ? "gallon" : "liter"})
              </Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="fuel-price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder={isUS ? "e.g., 3.50" : "e.g., 1.50"}
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Fuel className="size-5 text-emerald-600 dark:text-emerald-400" />
              Trip Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-background/80">
                <p className="text-sm text-muted-foreground">Fuel Needed</p>
                <p className="text-3xl font-bold mt-2">
                  {results.fuelNeeded.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{results.fuelLabel}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/80">
                <p className="text-sm text-muted-foreground">Total Fuel Cost</p>
                <p className="text-3xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(results.totalCost)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{results.fuelLabel} × ${price.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/80">
                <p className="text-sm text-muted-foreground">Cost per {results.distLabel.replace(/s$/, "")}</p>
                <p className="text-3xl font-bold mt-2">
                  {formatCurrency(results.costPerUnit)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">per {results.distLabel.replace(/s$/, "")}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Distance</p>
                <p className="font-semibold">{dist.toLocaleString()} {results.distLabel}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Efficiency</p>
                <p className="font-semibold">{eff} {results.effLabel}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Fuel Price</p>
                <p className="font-semibold">{formatCurrency(price)}/{results.fuelLabel.replace(/s$/, "")}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Unit System</p>
                <p className="font-semibold">{isUS ? "US (Imperial)" : "Metric"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!results && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center py-12">
            <Fuel className="size-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Enter distance, fuel efficiency, and fuel price to calculate your trip cost.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
