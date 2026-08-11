"use client"

import { useState, useMemo } from "react"
import { Heart, Ruler, Scale, Info, ArrowRight, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// ─── Types ──────────────────────────────────────────────────────────────────

type UnitSystem = "metric" | "imperial"

type BMICategory = "underweight" | "normal" | "overweight" | "obese" | "none"

interface BMIResult {
  bmi: number
  category: BMICategory
  label: string
  color: string
  bgColor: string
  borderColor: string
  badgeVariant: "default" | "secondary" | "destructive" | "outline"
  healthyMinKg: number
  healthyMaxKg: number
  healthyMinLbs: number
  healthyMaxLbs: number
  tips: string[]
}

// ─── Constants ──────────────────────────────────────────────────────────────

const BMI_CATEGORIES: {
  min: number
  max: number
  category: BMICategory
  label: string
  color: string
  bgColor: string
  borderColor: string
  badgeVariant: "default" | "secondary" | "destructive" | "outline"
  tips: string[]
}[] = [
  {
    min: 0,
    max: 18.5,
    category: "underweight",
    label: "Underweight",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    badgeVariant: "outline",
    tips: [
      "Consider consulting a healthcare provider to rule out underlying conditions.",
      "Focus on nutrient-dense foods like whole grains, lean proteins, and healthy fats.",
      "Incorporate strength training to build healthy muscle mass.",
      "Aim for gradual weight gain of 0.25–0.5 kg (0.5–1 lb) per week.",
    ],
  },
  {
    min: 18.5,
    max: 25,
    category: "normal",
    label: "Normal Weight",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    badgeVariant: "default",
    tips: [
      "Maintain your current lifestyle with balanced nutrition and regular exercise.",
      "Aim for at least 150 minutes of moderate aerobic activity per week.",
      "Continue regular health check-ups to stay on track.",
      "Prioritize sleep (7–9 hours) and stress management for overall wellness.",
    ],
  },
  {
    min: 25,
    max: 30,
    category: "overweight",
    label: "Overweight",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-800",
    badgeVariant: "secondary",
    tips: [
      "Small dietary changes can make a big difference over time.",
      "Increase physical activity gradually — even walking 30 minutes daily helps.",
      "Monitor portion sizes and limit sugary drinks and processed foods.",
      "Set realistic goals: losing 5–10% of body weight can significantly improve health.",
    ],
  },
  {
    min: 30,
    max: Infinity,
    category: "obese",
    label: "Obese",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    badgeVariant: "destructive",
    tips: [
      "Consult a healthcare professional for a personalized weight management plan.",
      "Consider working with a registered dietitian for tailored nutritional guidance.",
      "Start with low-impact exercises like swimming, cycling, or walking.",
      "Focus on sustainable habit changes rather than crash diets.",
    ],
  },
]

const GAUGE_SEGMENTS = [
  { label: "Underweight", range: "< 18.5", color: "bg-amber-400 dark:bg-amber-500", pct: 18.5 },
  { label: "Normal", range: "18.5 – 24.9", color: "bg-emerald-400 dark:bg-emerald-500", pct: 6.4 },
  { label: "Overweight", range: "25 – 29.9", color: "bg-orange-400 dark:bg-orange-500", pct: 5.0 },
  { label: "Obese", range: "30+", color: "bg-red-400 dark:bg-red-500", pct: 10.1 },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

function calculateBMI(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0
  const heightM = heightCm / 100
  return weightKg / (heightM * heightM)
}

function getBMICategory(bmi: number): (typeof BMI_CATEGORIES)[number] {
  for (const cat of BMI_CATEGORIES) {
    if (bmi >= cat.min && bmi < cat.max) return cat
  }
  return BMI_CATEGORIES[BMI_CATEGORIES.length - 1]
}

function getHealthyWeightRange(heightCm: number): {
  minKg: number
  maxKg: number
  minLbs: number
  maxLbs: number
} {
  if (heightCm <= 0) return { minKg: 0, maxKg: 0, minLbs: 0, maxLbs: 0 }
  const heightM = heightCm / 100
  const minKg = 18.5 * heightM * heightM
  const maxKg = 24.9 * heightM * heightM
  const KG_TO_LBS = 2.20462
  return {
    minKg: Math.round(minKg * 10) / 10,
    maxKg: Math.round(maxKg * 10) / 10,
    minLbs: Math.round(minKg * KG_TO_LBS * 10) / 10,
    maxLbs: Math.round(maxKg * KG_TO_LBS * 10) / 10,
  }
}

function computeResult(
  heightCm: number,
  weightKg: number
): BMIResult | null {
  if (heightCm <= 0 || weightKg <= 0) return null
  const bmi = calculateBMI(heightCm, weightKg)
  const cat = getBMICategory(bmi)
  const range = getHealthyWeightRange(heightCm)
  return {
    bmi: Math.round(bmi * 10) / 10,
    category: cat.category,
    label: cat.label,
    color: cat.color,
    bgColor: cat.bgColor,
    borderColor: cat.borderColor,
    badgeVariant: cat.badgeVariant,
    healthyMinKg: range.minKg,
    healthyMaxKg: range.maxKg,
    healthyMinLbs: range.minLbs,
    healthyMaxLbs: range.maxLbs,
    tips: cat.tips,
  }
}

// ─── Gauge Component ───────────────────────────────────────────────────────

function BMIGauge({ bmi }: { bmi: number }) {
  // Map BMI to a position on the gauge (0-40 range → 0-100%)
  const clampedBmi = Math.min(Math.max(bmi, 10), 40)
  const position = ((clampedBmi - 10) / 30) * 100

  return (
    <div className="mt-6 space-y-3">
      <p className="text-sm font-medium text-muted-foreground">BMI Scale</p>
      <div className="relative">
        {/* Color bar */}
        <div className="flex h-4 w-full overflow-hidden rounded-full">
          {GAUGE_SEGMENTS.map((seg) => (
            <div
              key={seg.label}
              className={`${seg.color} relative`}
              style={{ width: `${(seg.pct / 40) * 100}%` }}
            />
          ))}
        </div>

        {/* Pointer */}
        <div
          className="absolute -top-1.5 flex flex-col items-center transition-all duration-500 ease-out"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="size-3 rounded-full border-2 border-background bg-foreground shadow-sm" />
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        {GAUGE_SEGMENTS.map((seg) => (
          <div key={seg.label} className="text-center">
            <span className="font-medium">{seg.label}</span>
            <br />
            <span className="text-[10px]">{seg.range}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function BMICalculatorTool() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric")
  const [heightCm, setHeightCm] = useState("")
  const [heightFt, setHeightFt] = useState("")
  const [heightIn, setHeightIn] = useState("")
  const [weight, setWeight] = useState("")
  const [result, setResult] = useState<BMIResult | null>(null)

  // ── Computed total height in cm ──
  const totalHeightCm = useMemo((): number => {
    if (unitSystem === "metric") {
      return parseInput(heightCm)
    }
    // Imperial: feet + inches → cm
    const ft = parseInput(heightFt)
    const inches = parseInput(heightIn)
    return (ft * 12 + inches) * 2.54
  }, [unitSystem, heightCm, heightFt, heightIn])

  // ── Computed weight in kg ──
  const weightKg = useMemo((): number => {
    if (unitSystem === "metric") {
      return parseInput(weight)
    }
    return parseInput(weight) / 2.20462
  }, [unitSystem, weight])

  // ── Handle calculate ──
  function handleCalculate() {
    const res = computeResult(totalHeightCm, weightKg)
    setResult(res)
  }

  // ── Handle reset ──
  function handleReset() {
    setHeightCm("")
    setHeightFt("")
    setHeightIn("")
    setWeight("")
    setResult(null)
  }

  // ── Handle unit toggle ──
  function handleUnitToggle() {
    const next = unitSystem === "metric" ? "imperial" : "metric"
    setUnitSystem(next)
    setResult(null)
    setHeightCm("")
    setHeightFt("")
    setHeightIn("")
    setWeight("")
  }

  const hasInputs =
    (unitSystem === "metric" ? (heightCm || "") !== "" : (heightFt || "") !== "" || (heightIn || "") !== "") &&
    (weight || "") !== ""

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Heart className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">BMI Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Enter your height and weight to calculate your Body Mass Index
              </p>
            </div>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4 mb-6">
            <div className="flex items-center gap-2">
              <Ruler className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Unit System</span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium transition-colors ${
                  unitSystem === "metric" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Metric (cm/kg)
              </span>
              <Switch
                checked={unitSystem === "imperial"}
                onCheckedChange={handleUnitToggle}
                aria-label="Toggle unit system"
              />
              <span
                className={`text-sm font-medium transition-colors ${
                  unitSystem === "imperial" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Imperial (ft/lbs)
              </span>
            </div>
          </div>

          {/* Height Input */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2">
              <Ruler className="size-4 text-primary" />
              <Label className="text-sm font-semibold">Height</Label>
            </div>

            {unitSystem === "metric" ? (
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="height-cm"
                    type="text"
                    inputMode="decimal"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="e.g. 175"
                    className="font-mono text-base pr-16"
                    aria-label="Height in centimeters"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    cm
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="height-ft"
                      type="text"
                      inputMode="decimal"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      placeholder="e.g. 5"
                      className="font-mono text-base pr-10"
                      aria-label="Height feet"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                      ft
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="height-in"
                      type="text"
                      inputMode="decimal"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      placeholder="e.g. 9"
                      className="font-mono text-base pr-10"
                      aria-label="Height inches"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                      in
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Weight Input */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2">
              <Scale className="size-4 text-primary" />
              <Label className="text-sm font-semibold">Weight</Label>
            </div>
            <div className="relative">
              <Input
                id="weight"
                type="text"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unitSystem === "metric" ? "e.g. 70" : "e.g. 154"}
                className="font-mono text-base pr-16"
                aria-label={`Weight in ${unitSystem === "metric" ? "kilograms" : "pounds"}`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                {unitSystem === "metric" ? "kg" : "lbs"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleCalculate}
              disabled={!hasInputs}
              className="flex-1"
              size="lg"
            >
              Calculate BMI
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="lg"
              aria-label="Reset calculator"
            >
              <RotateCcw className="size-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Result Card */}
      {result && (
        <Card className={`overflow-hidden border-2 ${result.borderColor}`}>
          <div className={`${result.bgColor} p-6 sm:p-8`}>
            {/* BMI Value + Category Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Your BMI
                </p>
                <p className={`text-5xl sm:text-6xl font-bold tabular-nums ${result.color}`}>
                  {result.bmi}
                </p>
              </div>
              <Badge
                variant={result.badgeVariant}
                className="text-sm px-4 py-1.5 text-base font-semibold self-start sm:self-auto"
              >
                {result.label}
              </Badge>
            </div>

            <Separator className="my-4" />

            {/* BMI Gauge */}
            <BMIGauge bmi={result.bmi} />

            <Separator className="my-4" />

            {/* Healthy Weight Range */}
            <div className="rounded-lg border border-border bg-background/60 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Info className="size-4 text-primary" />
                <span className="text-sm font-semibold">Healthy Weight Range for Your Height</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on your height, a healthy BMI (18.5–24.9) corresponds to a weight between:
              </p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="rounded-md bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground font-medium">Metric</p>
                  <p className="text-lg font-bold tabular-nums">
                    {result.healthyMinKg} – {result.healthyMaxKg} kg
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-3 text-center">
                  <p className="text-xs text-muted-foreground font-medium">Imperial</p>
                  <p className="text-lg font-bold tabular-nums">
                    {result.healthyMinLbs} – {result.healthyMaxLbs} lbs
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Health Tips */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="size-4 text-primary" />
                <span className="text-sm font-semibold">Health Tips</span>
              </div>
              <ul className="space-y-2">
                {result.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Heart className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All BMI calculations happen locally using JavaScript. Your height, weight,
              and results are never sent to any server, stored, or shared. Close the tab
              and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}