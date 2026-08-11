"use client"

import { useState, useMemo } from "react"
import { BookOpen, DollarSign, Calendar, Users, Globe, Info, Shield, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(num: number): string {
  if (!isFinite(num)) return "$0.00"
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

// ─── Country Data ───────────────────────────────────────────────────────────

interface CountryConfig {
  dailyBudget: { budget: number; moderate: number; luxury: number }
  balanceMultiplier: number // x trip cost
  minStatementMonths: number
  notes: string
  currency: string
  extraRequirements: string[]
}

const COUNTRIES: Record<string, CountryConfig> = {
  schengen: {
    dailyBudget: { budget: 60, moderate: 120, luxury: 300 },
    balanceMultiplier: 1.5,
    minStatementMonths: 3,
    notes: "Schengen area (26 European countries). Minimum €50/day recommended by many embassies.",
    currency: "EUR",
    extraRequirements: [
      "Travel insurance with €30,000 minimum coverage",
      "Proof of accommodation for each night",
      "Return flight reservation",
      "Cover letter explaining trip purpose",
    ],
  },
  usa: {
    dailyBudget: { budget: 70, moderate: 150, luxury: 400 },
    balanceMultiplier: 2.0,
    minStatementMonths: 6,
    notes: "No fixed minimum. Focus on demonstrating strong ties to home country.",
    currency: "USD",
    extraRequirements: [
      "Strong employment letter with salary",
      "Property or asset ownership proof",
      "Family ties documentation",
      "Previous travel history helps",
    ],
  },
  uk: {
    dailyBudget: { budget: 65, moderate: 140, luxury: 350 },
    balanceMultiplier: 1.5,
    minStatementMonths: 6,
    notes: "Must show sufficient funds to cover trip without working in the UK.",
    currency: "GBP",
    extraRequirements: [
      "Employment letter with role and salary",
      "Leave approval from employer",
      "Accommodation details or booking",
      "Tuberculosis test certificate (some countries)",
    ],
  },
  canada: {
    dailyBudget: { budget: 60, moderate: 130, luxury: 300 },
    balanceMultiplier: 1.5,
    minStatementMonths: 6,
    notes: "Must meet minimum settlement funds if applicable to visa type.",
    currency: "CAD",
    extraRequirements: [
      "Letter of explanation (purpose of visit)",
      "Proof of ties to home country",
      "Employment verification letter",
      "Travel history (previous visas help)",
    ],
  },
  australia: {
    dailyBudget: { budget: 65, moderate: 140, luxury: 350 },
    balanceMultiplier: 1.5,
    minStatementMonths: 3,
    notes: "Specific fund requirements depend on visa subclass.",
    currency: "AUD",
    extraRequirements: [
      "Evidence of employment or studies",
      "Statement of purpose",
      "Health insurance (Overseas Visitor Health Cover)",
      "Character certificate may be required",
    ],
  },
  japan: {
    dailyBudget: { budget: 50, moderate: 100, luxury: 250 },
    balanceMultiplier: 2.0,
    minStatementMonths: 6,
    notes: "Bank certificate (not just statements) may be required.",
    currency: "JPY",
    extraRequirements: [
      "Bank certificate from your bank",
      "Employment certificate",
      "Detailed itinerary",
      "Guarantor letter if applicable",
    ],
  },
  uae: {
    dailyBudget: { budget: 55, moderate: 120, luxury: 350 },
    balanceMultiplier: 1.5,
    minStatementMonths: 3,
    notes: "Some nationalities get visa on arrival; others need sponsorship.",
    currency: "AED",
    extraRequirements: [
      "Hotel booking confirmation",
      "Return flight ticket",
      "Passport photos (specific size)",
      "Employer NOC letter with salary",
    ],
  },
  other: {
    dailyBudget: { budget: 50, moderate: 110, luxury: 250 },
    balanceMultiplier: 2.0,
    minStatementMonths: 3,
    notes: "Requirements vary. Check the specific embassy website for current rules.",
    currency: "USD",
    extraRequirements: [
      "Check specific embassy requirements",
      "Bank statements (3-6 months)",
      "Proof of accommodation",
      "Return/onward flight reservation",
    ],
  },
}

const DESTINATIONS = [
  { value: "schengen", label: "Schengen / Europe" },
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "japan", label: "Japan" },
  { value: "uae", label: "UAE" },
  { value: "other", label: "Other" },
]

type TravelStyle = "budget" | "moderate" | "luxury"

// ─── Main Component ─────────────────────────────────────────────────────────

export function VisaFinancialProofCalculatorTool() {
  const [destination, setDestination] = useState("schengen")
  const [daysStr, setDaysStr] = useState("")
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("moderate")
  const [travelersStr, setTravelersStr] = useState("1")

  const days = Math.max(1, Math.round(parseInput(daysStr)))
  const travelers = Math.max(1, Math.round(parseInput(travelersStr)) || 1)

  const result = useMemo(() => {
    if (days <= 0) return null

    const config = COUNTRIES[destination]
    if (!config) return null

    const dailyCost = config.dailyBudget[travelStyle]
    // Scale for multiple travelers (0.75 factor for shared costs after first person)
    const perPersonDaily = dailyCost
    const totalDaily = perPersonDaily * (1 + (travelers - 1) * 0.75)
    const totalTripCost = totalDaily * days
    const requiredBalance = totalTripCost * config.balanceMultiplier

    return {
      config,
      dailyCost,
      totalDaily,
      totalTripCost,
      requiredBalance,
      perPersonDaily,
      perPersonTrip: perPersonDaily * days,
    }
  }, [destination, days, travelStyle, travelers])

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <BookOpen className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Visa Financial Proof Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Estimate the bank balance needed for your visa application
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Destination */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Globe className="size-4" />
                Destination
              </Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DESTINATIONS.map((d) => (
                    <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Days + Travelers + Style */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="vfp-days" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="size-4" />
                  Trip Duration (days)
                </Label>
                <Input
                  id="vfp-days"
                  type="text"
                  inputMode="numeric"
                  value={daysStr}
                  onChange={(e) => setDaysStr(e.target.value)}
                  placeholder="e.g. 14"
                  className="font-mono text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Users className="size-4" />
                  Number of Travelers
                </Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={travelersStr}
                  onChange={(e) => setTravelersStr(e.target.value)}
                  placeholder="1"
                  className="font-mono text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Travel Style</Label>
                <Select value={travelStyle} onValueChange={(v) => setTravelStyle(v as TravelStyle)}>
                  <SelectTrigger className="font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Country Note */}
            {result && (
              <div className="rounded-lg bg-muted/50 border border-border p-3 flex items-start gap-2">
                <Info className="size-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">{result.config.notes}</p>
              </div>
            )}
          </div>

          {/* Results */}
          {result && days > 0 && (
            <div className="mt-8 space-y-6">
              <Separator />

              {/* Main Result */}
              <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Required Bank Balance</p>
                <p className="text-4xl font-bold tabular-nums text-primary">{formatCurrency(result.requiredBalance)}</p>
                <p className="text-xs text-muted-foreground">{result.config.balanceMultiplier}× total trip cost ({DESTINATIONS.find(d => d.value === destination)?.label})</p>
              </div>

              {/* Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-border p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Daily Budget</p>
                  <p className="text-lg font-bold tabular-nums">{formatCurrency(result.totalDaily)}</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(result.perPersonDaily)}/person</p>
                </div>
                <div className="rounded-lg border border-border p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total Trip Cost</p>
                  <p className="text-lg font-bold tabular-nums">{formatCurrency(result.totalTripCost)}</p>
                  <p className="text-xs text-muted-foreground">{days} days × {travelers} traveler(s)</p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">Per Person Trip Cost</p>
                  <p className="text-lg font-bold tabular-nums">{formatCurrency(result.perPersonTrip)}</p>
                  <p className="text-xs text-muted-foreground">each traveler</p>
                </div>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Required Per Person</p>
                  <p className="text-lg font-bold tabular-nums">{formatCurrency(result.requiredBalance / travelers)}</p>
                  <p className="text-xs text-muted-foreground">if showing individual accounts</p>
                </div>
              </div>

              {/* Country Requirements */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="px-4 py-3 bg-muted/50 border-b flex items-center gap-2">
                    <Shield className="size-4 text-muted-foreground" />
                    <h4 className="font-semibold text-sm">Requirements for {DESTINATIONS.find(d => d.value === destination)?.label}</h4>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-border p-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Bank Statement Duration</p>
                        <p className="text-lg font-bold">{result.config.minStatementMonths} months</p>
                      </div>
                      <div className="rounded-lg border border-border p-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Balance Multiplier</p>
                        <p className="text-lg font-bold">{result.config.balanceMultiplier}× trip cost</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Additional Requirements</p>
                      <ul className="space-y-1.5">
                        {result.config.extraRequirements.map((req, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2">
                      <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong>Important:</strong> These are estimates based on common requirements. Always verify with the specific embassy or consulate website before applying, as requirements change frequently.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* All Destinations Quick Reference */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="px-4 py-3 bg-muted/50 border-b">
                    <h4 className="font-semibold text-sm">Quick Reference: All Destinations</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/30">
                          <th className="px-4 py-2.5 text-left font-medium">Destination</th>
                          <th className="px-4 py-2.5 text-right font-medium">Budget/Day</th>
                          <th className="px-4 py-2.5 text-right font-medium">Moderate/Day</th>
                          <th className="px-4 py-2.5 text-right font-medium">Luxury/Day</th>
                          <th className="px-4 py-2.5 text-right font-medium">Balance ×</th>
                          <th className="px-4 py-2.5 text-right font-medium">Statements</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {DESTINATIONS.map((d) => {
                          const c = COUNTRIES[d.value]
                          return (
                            <tr key={d.value} className={d.value === destination ? "bg-primary/5" : ""}>
                              <td className="px-4 py-2.5 font-medium">{d.label}</td>
                              <td className="px-4 py-2.5 text-right font-mono text-xs">{formatCurrency(c.dailyBudget.budget)}</td>
                              <td className="px-4 py-2.5 text-right font-mono text-xs">{formatCurrency(c.dailyBudget.moderate)}</td>
                              <td className="px-4 py-2.5 text-right font-mono text-xs">{formatCurrency(c.dailyBudget.luxury)}</td>
                              <td className="px-4 py-2.5 text-right font-mono text-xs">{c.balanceMultiplier}×</td>
                              <td className="px-4 py-2.5 text-right font-mono text-xs">{c.minStatementMonths}mo</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Shield className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">All calculations happen locally. Your data is never sent to any server.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
