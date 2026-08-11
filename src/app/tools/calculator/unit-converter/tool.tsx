"use client"

import { useState, useMemo, useCallback } from "react"
import {
  ArrowLeftRight,
  ArrowRightLeft,
  Ruler,
  Thermometer,
  Weight,
  FlaskConical,
  LayoutGrid,
  Gauge,
  HardDrive,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Types ──────────────────────────────────────────────────────────────────

type CategoryId =
  | "length"
  | "weight"
  | "temperature"
  | "volume"
  | "area"
  | "speed"
  | "data"

interface UnitDef {
  id: string
  label: string
  /** Factor relative to the base unit of its category. For temperature, this is unused. */
  factor?: number
  /** Offset from base unit (only used for temperature). */
  offset?: number
}

interface CategoryDef {
  id: CategoryId
  label: string
  icon: React.ReactNode
  units: UnitDef[]
}

// ─── Category & Unit Definitions ─────────────────────────────────────────────

const categories: CategoryDef[] = [
  {
    id: "length",
    label: "Length",
    icon: <Ruler className="size-4" />,
    units: [
      { id: "mm", label: "Millimeter (mm)", factor: 0.001 },
      { id: "cm", label: "Centimeter (cm)", factor: 0.01 },
      { id: "m", label: "Meter (m)", factor: 1 },
      { id: "km", label: "Kilometer (km)", factor: 1000 },
      { id: "in", label: "Inch (in)", factor: 0.0254 },
      { id: "ft", label: "Foot (ft)", factor: 0.3048 },
      { id: "yd", label: "Yard (yd)", factor: 0.9144 },
      { id: "mi", label: "Mile (mi)", factor: 1609.344 },
    ],
  },
  {
    id: "weight",
    label: "Weight / Mass",
    icon: <Weight className="size-4" />,
    units: [
      { id: "mg", label: "Milligram (mg)", factor: 0.001 },
      { id: "g", label: "Gram (g)", factor: 1 },
      { id: "kg", label: "Kilogram (kg)", factor: 1000 },
      { id: "oz", label: "Ounce (oz)", factor: 28.349523125 },
      { id: "lb", label: "Pound (lb)", factor: 453.59237 },
      { id: "st", label: "Stone (st)", factor: 6350.29318 },
      { id: "ton_us", label: "US Ton (short ton)", factor: 907184.74 },
      { id: "ton_metric", label: "Metric Ton (tonne)", factor: 1000000 },
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    icon: <Thermometer className="size-4" />,
    units: [
      { id: "c", label: "Celsius (\u00b0C)", factor: 1, offset: 0 },
      { id: "f", label: "Fahrenheit (\u00b0F)", factor: 5 / 9, offset: -32 },
      { id: "k", label: "Kelvin (K)", factor: 1, offset: -273.15 },
      { id: "ra", label: "Rankine (\u00b0Ra)", factor: 5 / 9, offset: -491.67 },
    ],
  },
  {
    id: "volume",
    label: "Volume",
    icon: <FlaskConical className="size-4" />,
    units: [
      { id: "ml", label: "Milliliter (mL)", factor: 0.001 },
      { id: "l", label: "Liter (L)", factor: 1 },
      { id: "gal_us", label: "US Gallon (gal)", factor: 3.785411784 },
      { id: "qt", label: "US Quart (qt)", factor: 0.946352946 },
      { id: "pt", label: "US Pint (pt)", factor: 0.473176473 },
      { id: "cup", label: "US Cup", factor: 0.2365882365 },
      { id: "fl_oz", label: "US Fluid Ounce (fl oz)", factor: 0.0295735295625 },
      { id: "tbsp", label: "Tablespoon (tbsp)", factor: 0.01478676478125 },
    ],
  },
  {
    id: "area",
    label: "Area",
    icon: <LayoutGrid className="size-4" />,
    units: [
      { id: "mm2", label: "Square Millimeter (mm\u00b2)", factor: 0.000001 },
      { id: "cm2", label: "Square Centimeter (cm\u00b2)", factor: 0.0001 },
      { id: "m2", label: "Square Meter (m\u00b2)", factor: 1 },
      { id: "km2", label: "Square Kilometer (km\u00b2)", factor: 1000000 },
      { id: "in2", label: "Square Inch (in\u00b2)", factor: 0.00064516 },
      { id: "ft2", label: "Square Foot (ft\u00b2)", factor: 0.09290304 },
      { id: "yd2", label: "Square Yard (yd\u00b2)", factor: 0.83612736 },
      { id: "acre", label: "Acre", factor: 4046.8564224 },
      { id: "ha", label: "Hectare (ha)", factor: 10000 },
    ],
  },
  {
    id: "speed",
    label: "Speed",
    icon: <Gauge className="size-4" />,
    units: [
      { id: "ms", label: "Meters per second (m/s)", factor: 1 },
      { id: "kmh", label: "Kilometers per hour (km/h)", factor: 1 / 3.6 },
      { id: "mph", label: "Miles per hour (mph)", factor: 0.44704 },
      { id: "kn", label: "Knots (kn)", factor: 0.514444 },
      { id: "fts", label: "Feet per second (ft/s)", factor: 0.3048 },
      { id: "mach", label: "Mach", factor: 343 },
    ],
  },
  {
    id: "data",
    label: "Data Storage",
    icon: <HardDrive className="size-4" />,
    units: [
      { id: "bit", label: "Bit (b)", factor: 1 },
      { id: "byte", label: "Byte (B)", factor: 8 },
      { id: "kb", label: "Kilobyte (KB)", factor: 8000 },
      { id: "mb", label: "Megabyte (MB)", factor: 8000000 },
      { id: "gb", label: "Gigabyte (GB)", factor: 8000000000 },
      { id: "tb", label: "Terabyte (TB)", factor: 8000000000000 },
      { id: "pb", label: "Petabyte (PB)", factor: 8e15 },
      { id: "kib", label: "Kibibyte (KiB)", factor: 8192 },
      { id: "mib", label: "Mebibyte (MiB)", factor: 8388608 },
    ],
  },
]

// ─── Conversion Logic ─────────────────────────────────────────────────────────

/**
 * Convert a value from one unit to another within the same category.
 * Temperature uses special offset-based formulas; other categories use ratio-based conversion.
 */
function convert(value: number, fromUnit: UnitDef, toUnit: UnitDef, categoryId: CategoryId): number {
  if (categoryId === "temperature") {
    return convertTemperature(value, fromUnit.id, toUnit.id)
  }
  // Ratio-based: value * (toFactor / fromFactor)
  const fromFactor = fromUnit.factor ?? 1
  const toFactor = toUnit.factor ?? 1
  return value * (toFactor / fromFactor)
}

/**
 * Temperature conversion — each scale has a different zero point.
 * Strategy: convert source to Celsius first, then Celsius to target.
 */
function convertTemperature(value: number, fromId: string, toId: string): number {
  // Convert to Celsius
  let celsius: number
  switch (fromId) {
    case "c":
      celsius = value
      break
    case "f":
      celsius = (value - 32) * (5 / 9)
      break
    case "k":
      celsius = value - 273.15
      break
    case "ra":
      celsius = (value - 491.67) * (5 / 9)
      break
    default:
      celsius = value
  }

  // Convert from Celsius to target
  switch (toId) {
    case "c":
      return celsius
    case "f":
      return celsius * (9 / 5) + 32
    case "k":
      return celsius + 273.15
    case "ra":
      return (celsius + 273.15) * (9 / 5)
    default:
      return celsius
  }
}

// ─── Formatting ──────────────────────────────────────────────────────────────

function formatResult(num: number): string {
  if (!isFinite(num)) return "—"
  // For very large or very small numbers, use scientific notation
  const absNum = Math.abs(num)
  if (absNum === 0) return "0"

  if (absNum >= 1e15 || (absNum < 1e-6 && absNum > 0)) {
    return num.toExponential(6)
  }

  // Up to 10 decimal places, strip trailing zeros
  const str = num.toFixed(10)
  const parts = str.split(".")
  if (parts[1]) {
    parts[1] = parts[1].replace(/0+$/, "")
  }
  const cleaned = parts[1] && parts[1].length > 0 ? `${parts[0]}.${parts[1]}` : parts[0]
  // Add locale formatting for readability
  return Number(cleaned).toLocaleString("en-US", {
    maximumFractionDigits: 10,
  })
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

// ─── Quick Reference Tables ──────────────────────────────────────────────────

interface RefEntry {
  from: string
  to: string
  factor: string
}

const quickReferenceMap: Record<CategoryId, RefEntry[]> = {
  length: [
    { from: "1 km", to: "0.6214 mi", factor: "1.60934" },
    { from: "1 mi", to: "1.60934 km", factor: "0.62137" },
    { from: "1 m", to: "3.28084 ft", factor: "0.3048" },
    { from: "1 ft", to: "30.48 cm", factor: "0.03281" },
    { from: "1 in", to: "2.54 cm", factor: "0.3937" },
    { from: "1 yd", to: "0.9144 m", factor: "1.09361" },
  ],
  weight: [
    { from: "1 kg", to: "2.20462 lb", factor: "0.45359" },
    { from: "1 lb", to: "453.59 g", factor: "0.002205" },
    { from: "1 oz", to: "28.35 g", factor: "0.03527" },
    { from: "1 st", to: "6.35 kg", factor: "0.15747" },
    { from: "1 tonne", to: "1.10231 US tons", factor: "0.90718" },
    { from: "1 g", to: "1000 mg", factor: "0.001" },
  ],
  temperature: [
    { from: "0\u00b0C", to: "32\u00b0F", factor: "C\u00d7(9/5)+32" },
    { from: "100\u00b0C", to: "212\u00b0F", factor: "C\u00d7(9/5)+32" },
    { from: "0\u00b0C", to: "273.15 K", factor: "C+273.15" },
    { from: "-40\u00b0C", to: "-40\u00b0F", factor: "Same!" },
    { from: "37\u00b0C", to: "98.6\u00b0F", factor: "Body temp" },
    { from: "0 K", to: "-273.15\u00b0C", factor: "Absolute zero" },
  ],
  volume: [
    { from: "1 gal (US)", to: "3.785 L", factor: "0.26417" },
    { from: "1 L", to: "1.0567 qt", factor: "0.94635" },
    { from: "1 cup", to: "236.6 mL", factor: "0.004227" },
    { from: "1 fl oz", to: "29.57 mL", factor: "0.03381" },
    { from: "1 tbsp", to: "14.79 mL", factor: "0.06763" },
    { from: "1 pt", to: "473.2 mL", factor: "0.002113" },
  ],
  area: [
    { from: "1 m\u00b2", to: "10.764 ft\u00b2", factor: "0.0929" },
    { from: "1 acre", to: "4,046.86 m\u00b2", factor: "0.000247" },
    { from: "1 hectare", to: "2.471 acres", factor: "0.40469" },
    { from: "1 km\u00b2", to: "0.3861 mi\u00b2", factor: "2.58999" },
    { from: "1 ft\u00b2", to: "929.03 cm\u00b2", factor: "0.001076" },
    { from: "1 yd\u00b2", to: "0.8361 m\u00b2", factor: "1.19599" },
  ],
  speed: [
    { from: "1 mph", to: "1.60934 km/h", factor: "0.62137" },
    { from: "1 km/h", to: "0.27778 m/s", factor: "3.6" },
    { from: "1 knot", to: "1.852 km/h", factor: "0.53996" },
    { from: "Mach 1", to: "1,235 km/h", factor: "343 m/s" },
    { from: "1 m/s", to: "3.28084 ft/s", factor: "0.3048" },
    { from: "60 mph", to: "88 ft/s", factor: "0.68182" },
  ],
  data: [
    { from: "1 Byte", to: "8 Bits", factor: "0.125 B/bit" },
    { from: "1 KB", to: "1,000 Bytes", factor: "0.001 KB/B" },
    { from: "1 MB", to: "1,000 KB", factor: "0.001 MB/KB" },
    { from: "1 GB", to: "1,000 MB", factor: "0.001 GB/MB" },
    { from: "1 TB", to: "1,000 GB", factor: "0.001 TB/GB" },
    { from: "1 GiB", to: "1,073,741,824 B", factor: "Binary" },
  ],
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function UnitConverterTool() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("length")
  const [fromUnitId, setFromUnitId] = useState<string>("m")
  const [toUnitId, setToUnitId] = useState<string>("ft")
  const [inputValue, setInputValue] = useState("")

  const currentCategory = useMemo(
    () => categories.find((c) => c.id === activeCategory) ?? categories[0],
    [activeCategory],
  )

  // Reset unit selections when category changes
  const handleCategoryChange = useCallback(
    (newCategory: CategoryId) => {
      setActiveCategory(newCategory)
      setInputValue("")
      const cat = categories.find((c) => c.id === newCategory)
      if (cat && cat.units.length >= 2) {
        setFromUnitId(cat.units[0].id)
        setToUnitId(cat.units[1].id)
      }
    },
    [],
  )

  // Swap from/to
  const handleSwap = useCallback(() => {
    const prevFrom = fromUnitId
    const prevTo = toUnitId
    setFromUnitId(prevTo)
    setToUnitId(prevFrom)
    // Also swap the input value with the result
    const fromUnit = currentCategory.units.find((u) => u.id === prevFrom)
    const toUnit = currentCategory.units.find((u) => u.id === prevTo)
    if (fromUnit && toUnit && inputValue) {
      const parsed = parseInput(inputValue)
      const result = convert(parsed, fromUnit, toUnit, activeCategory)
      setInputValue(formatResult(result))
    }
  }, [fromUnitId, toUnitId, inputValue, currentCategory, activeCategory])

  // Real-time conversion result
  const result = useMemo(() => {
    if (!inputValue || (inputValue || "") === "") return null
    const parsed = parseInput(inputValue)
    const fromUnit = currentCategory.units.find((u) => u.id === fromUnitId)
    const toUnit = currentCategory.units.find((u) => u.id === toUnitId)
    if (!fromUnit || !toUnit) return null
    const converted = convert(parsed, fromUnit, toUnit, activeCategory)
    return {
      value: converted,
      formatted: formatResult(converted),
      fromLabel: fromUnit.label,
      toLabel: toUnit.label,
    }
  }, [inputValue, fromUnitId, toUnitId, currentCategory, activeCategory])

  const fromUnit = currentCategory.units.find((u) => u.id === fromUnitId)
  const toUnit = currentCategory.units.find((u) => u.id === toUnitId)

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Main Converter Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <ArrowLeftRight className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Unit Converter</h3>
              <p className="text-sm text-muted-foreground">
                Select a category and convert between units instantly
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs
            value={activeCategory}
            onValueChange={(v) => handleCategoryChange(v as CategoryId)}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-4 sm:grid-cols-7 h-auto gap-1 p-1">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="text-xs sm:text-sm py-2 px-1 sm:px-2"
                >
                  <span className="flex items-center gap-1.5 justify-center">
                    {cat.icon}
                    <span className="hidden sm:inline truncate">{cat.label.split(" / ")[0]}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Converter content (same for all tabs, we render it once below) */}
          </Tabs>
        </div>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* From Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">FROM</Badge>
              <span className="text-sm text-muted-foreground">
                Enter a value and select the source unit
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
              <div className="space-y-2">
                <Label htmlFor="converter-value" className="text-sm font-medium">
                  Value
                </Label>
                <Input
                  id="converter-value"
                  type="text"
                  inputMode="decimal"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a number..."
                  className="font-mono text-base"
                  aria-label="Value to convert"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-unit" className="text-sm font-medium">
                  Unit
                </Label>
                <Select value={fromUnitId} onValueChange={setFromUnitId}>
                  <SelectTrigger id="from-unit" className="w-full">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCategory.units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwap}
              className="rounded-full px-4 gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Swap from and to units"
            >
              <ArrowRightLeft className="size-4" />
              Swap Units
            </Button>
          </div>

          <Separator />

          {/* To Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">TO</Badge>
              <span className="text-sm text-muted-foreground">
                Converted result
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Result</Label>
                <div
                  className="flex h-9 w-full items-center rounded-md border border-input bg-muted/50 px-3 font-mono text-base tabular-nums"
                  aria-live="polite"
                  aria-label="Conversion result"
                >
                  {result ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {result.formatted}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Type a value to convert</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="to-unit" className="text-sm font-medium">
                  Unit
                </Label>
                <Select value={toUnitId} onValueChange={setToUnitId}>
                  <SelectTrigger id="to-unit" className="w-full">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCategory.units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Conversion formula display */}
          {result && fromUnit && toUnit && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Conversion Details
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
                  {formatResult(parseInput(inputValue))} {result.fromLabel} ={" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {result.formatted}
                  </span>{" "}
                  {result.toLabel}
                </code>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Reference Table */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2">
              <Thermometer className="size-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">
                Quick Reference: {currentCategory.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                Common conversions for {currentCategory.label.toLowerCase()}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-medium text-muted-foreground">
                    From
                  </th>
                  <th className="text-left py-2 pr-4 font-medium text-muted-foreground">
                    Equals
                  </th>
                  <th className="text-left py-2 font-medium text-muted-foreground">
                    Factor
                  </th>
                </tr>
              </thead>
              <tbody>
                {quickReferenceMap[activeCategory]?.map((entry, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-muted/20" : ""}
                  >
                    <td className="py-2 pr-4 font-mono text-xs">{entry.from}</td>
                    <td className="py-2 pr-4 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {entry.to}
                    </td>
                    <td className="py-2 font-mono text-xs text-muted-foreground">
                      {entry.factor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <ArrowLeftRight className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private &mdash; Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All unit conversions happen locally using JavaScript. Your numbers are never sent
              to any server, stored, or shared. Close the tab and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
