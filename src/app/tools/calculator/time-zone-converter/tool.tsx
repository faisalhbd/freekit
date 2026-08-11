"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import {
  Globe,
  Clock,
  ArrowRightLeft,
  Plus,
  MapPin,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Time Zone Data ─────────────────────────────────────────────────────────

interface TimeZoneOption {
  iana: string
  label: string
  group: string
}

const TIME_ZONES: TimeZoneOption[] = [
  { iana: "UTC", label: "UTC (Coordinated Universal Time)", group: "Reference" },
  { iana: "America/New_York", label: "EST/EDT (New York)", group: "Americas" },
  { iana: "America/Chicago", label: "CST/CDT (Chicago)", group: "Americas" },
  { iana: "America/Denver", label: "MST/MDT (Denver)", group: "Americas" },
  { iana: "America/Los_Angeles", label: "PST/PDT (Los Angeles)", group: "Americas" },
  { iana: "America/Anchorage", label: "AKST/AKDT (Anchorage)", group: "Americas" },
  { iana: "America/Sao_Paulo", label: "BRT (São Paulo)", group: "Americas" },
  { iana: "America/Argentina/Buenos_Aires", label: "ART (Buenos Aires)", group: "Americas" },
  { iana: "Europe/London", label: "GMT/BST (London)", group: "Europe" },
  { iana: "Europe/Paris", label: "CET/CEST (Paris)", group: "Europe" },
  { iana: "Europe/Berlin", label: "CET/CEST (Berlin)", group: "Europe" },
  { iana: "Europe/Moscow", label: "MSK (Moscow)", group: "Europe" },
  { iana: "Asia/Dubai", label: "GST (Dubai)", group: "Asia" },
  { iana: "Asia/Kolkata", label: "IST (India)", group: "Asia" },
  { iana: "Asia/Dhaka", label: "BST (Dhaka)", group: "Asia" },
  { iana: "Asia/Bangkok", label: "ICT (Bangkok)", group: "Asia" },
  { iana: "Asia/Singapore", label: "SGT (Singapore)", group: "Asia" },
  { iana: "Asia/Shanghai", label: "CST (Shanghai)", group: "Asia" },
  { iana: "Asia/Tokyo", label: "JST (Tokyo)", group: "Asia" },
  { iana: "Asia/Seoul", label: "KST (Seoul)", group: "Asia" },
  { iana: "Australia/Sydney", label: "AEST/AEDT (Sydney)", group: "Oceania" },
  { iana: "Pacific/Auckland", label: "NZST/NZDT (Auckland)", group: "Oceania" },
  { iana: "Pacific/Honolulu", label: "HST (Honolulu)", group: "Oceania" },
  { iana: "Africa/Cairo", label: "EET (Cairo)", group: "Africa" },
  { iana: "Africa/Lagos", label: "WAT (Lagos)", group: "Africa" },
]

const QUICK_COMPARE_ZONES = [
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
  "Australia/Sydney",
]

// ─── Helper Functions ───────────────────────────────────────────────────────

function getUTCOffset(iana: string, date: Date): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: iana,
      timeZoneName: "shortOffset",
    }).formatToParts(date)
    const offsetPart = parts.find((p) => p.type === "timeZoneName")
    return offsetPart ? (offsetPart.value || "") : ""
  } catch {
    return ""
  }
}

function getTimeInZone(iana: string, date: Date): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: iana,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date)
  } catch {
    return "Invalid"
  }
}

function convertTime(
  fromIana: string,
  toIana: string,
  dateStr: string,
  timeStr: string
): { converted: string; dateDisplay: string; dayOfWeek: string; isDifferentDay: boolean } | null {
  if (!dateStr || !timeStr) return null

  // Parse the local datetime string
  const localDate = new Date(`${dateStr}T${timeStr || "00:00"}:00`)
  if (isNaN(localDate.getTime())) return null

  // Get the UTC offset of the 'from' timezone at the given date
  try {
    const fromFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: fromIana,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })

    // Use a reference date to compute the offset difference
    const refDate = new Date()
    const utcDate = new Date(
      refDate.toLocaleString("en-US", { timeZone: "UTC" })
    )
    const fromDate = new Date(
      refDate.toLocaleString("en-US", { timeZone: fromIana })
    )
    const toDate = new Date(
      refDate.toLocaleString("en-US", { timeZone: toIana })
    )

    const fromOffset = fromDate.getTime() - utcDate.getTime()
    const toOffset = toDate.getTime() - utcDate.getTime()
    const diff = toOffset - fromOffset

    const targetDate = new Date(localDate.getTime() + diff)

    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      timeZone: toIana,
      weekday: "long",
    }).format(targetDate)

    const dateDisplay = new Intl.DateTimeFormat("en-US", {
      timeZone: toIana,
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(targetDate)

    const timeOnly = new Intl.DateTimeFormat("en-US", {
      timeZone: toIana,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(targetDate)

    // Check if the date changed
    const fromDayStr = new Intl.DateTimeFormat("en-US", {
      timeZone: fromIana,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(localDate)

    const toDayStr = new Intl.DateTimeFormat("en-US", {
      timeZone: toIana,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(targetDate)

    return {
      converted: timeOnly,
      dateDisplay,
      dayOfWeek,
      isDifferentDay: fromDayStr !== toDayStr,
    }
  } catch {
    return null
  }
}

function getZoneLabel(iana: string): string {
  const found = TIME_ZONES.find((z) => z.iana === iana)
  return found ? found.label : iana
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function TimeZoneConverterTool() {
  const now = useMemo(() => new Date(), [])
  const [fromZone, setFromZone] = useState("America/New_York")
  const [toZone, setToZone] = useState("Europe/London")
  const [dateStr, setDateStr] = useState(() =>
    now.toISOString().split("T")[0]
  )
  const [timeStr, setTimeStr] = useState(() => {
    const h = String(now.getHours()).padStart(2, "0")
    const m = String(now.getMinutes()).padStart(2, "0")
    return `${h}:${m}`
  })
  const [compareZones, setCompareZones] = useState<string[]>([])
  const [liveTime, setLiveTime] = useState(now)

  // Live clock — update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Conversion result
  const result = useMemo(() => {
    return convertTime(fromZone, toZone, dateStr, timeStr)
  }, [fromZone, toZone, dateStr, timeStr])

  // UTC offsets
  const fromOffset = useMemo(
    () => getUTCOffset(fromZone, liveTime),
    [fromZone, liveTime]
  )
  const toOffset = useMemo(
    () => getUTCOffset(toZone, liveTime),
    [toZone, liveTime]
  )

  // Live current time in both zones
  const fromLiveTime = useMemo(
    () => getTimeInZone(fromZone, liveTime),
    [fromZone, liveTime]
  )
  const toLiveTime = useMemo(
    () => getTimeInZone(toZone, liveTime),
    [toZone, liveTime]
  )

  // Swap handler
  const handleSwap = useCallback(() => {
    setFromZone(toZone)
    setToZone(fromZone)
  }, [fromZone, toZone])

  // Quick compare handlers
  const handleAddCompareZone = useCallback(() => {
    if (compareZones.length >= 4) return
    const available = QUICK_COMPARE_ZONES.filter(
      (z) => z !== fromZone && z !== toZone && !compareZones.includes(z)
    )
    if (available.length > 0) {
      setCompareZones((prev) => [...prev, available[0]])
    }
  }, [compareZones, fromZone, toZone])

  const handleRemoveCompareZone = useCallback((zone: string) => {
    setCompareZones((prev) => prev.filter((z) => z !== zone))
  }, [])

  // Group time zones for the Select component
  const groupedZones = useMemo(() => {
    const groups: Record<string, TimeZoneOption[]> = {}
    for (const tz of TIME_ZONES) {
      if (!groups[tz.group]) groups[tz.group] = []
      groups[tz.group].push(tz)
    }
    return groups
  }, [])

  return (
    <div className="space-y-6">
      {/* Main Converter Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Globe className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Convert Time Between Zones</h3>
              <p className="text-sm text-muted-foreground">
                Select time zones, pick a date and time, and get instant conversions
              </p>
            </div>
          </div>

          {/* From / Swap / To Row */}
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] items-end">
            {/* From Zone */}
            <div className="space-y-2">
              <Label htmlFor="from-zone" className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" />
                From Time Zone
              </Label>
              <Select value={fromZone} onValueChange={setFromZone}>
                <SelectTrigger id="from-zone" className="w-full">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {Object.entries(groupedZones).map(([group, zones]) => (
                    <SelectGroup key={group}>
                      <SelectLabel className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                        {group}
                      </SelectLabel>
                      {zones.map((tz) => (
                        <SelectItem key={tz.iana} value={tz.iana}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwap}
                className="rounded-full"
                aria-label="Swap time zones"
                title="Swap from and to time zones"
              >
                <ArrowRightLeft className="size-4" />
              </Button>
            </div>

            {/* To Zone */}
            <div className="space-y-2">
              <Label htmlFor="to-zone" className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" />
                To Time Zone
              </Label>
              <Select value={toZone} onValueChange={setToZone}>
                <SelectTrigger id="to-zone" className="w-full">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {Object.entries(groupedZones).map(([group, zones]) => (
                    <SelectGroup key={group}>
                      <SelectLabel className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                        {group}
                      </SelectLabel>
                      {zones.map((tz) => (
                        <SelectItem key={tz.iana} value={tz.iana}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date & Time Inputs */}
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <div className="space-y-2">
              <Label htmlFor="tz-date" className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" />
                Date
              </Label>
              <Input
                id="tz-date"
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value || "")}
                className="font-mono"
                aria-label="Date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tz-time" className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" />
                Time
              </Label>
              <Input
                id="tz-time"
                type="time"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value || "")}
                className="font-mono"
                aria-label="Time"
              />
            </div>
          </div>

          {/* Use Current Time Button */}
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const n = new Date()
                setDateStr(n.toISOString().split("T")[0])
                setTimeStr(
                  `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`
                )
              }}
            >
              <Clock className="size-3.5 mr-1" />
              Use Current Time
            </Button>
          </div>
        </div>
      </Card>

      {/* Live Clocks for From / To */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <Clock className="size-3.5" />
                Current Time — {getZoneLabel(fromZone)}
              </span>
              <Badge variant="secondary" className="text-xs font-mono">
                {fromOffset}
              </Badge>
            </div>
            <p className="text-3xl font-bold tabular-nums tracking-tight">
              {fromLiveTime}
            </p>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <Clock className="size-3.5" />
                Current Time — {getZoneLabel(toZone)}
              </span>
              <Badge variant="secondary" className="text-xs font-mono">
                {toOffset}
              </Badge>
            </div>
            <p className="text-3xl font-bold tabular-nums tracking-tight">
              {toLiveTime}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Result */}
      {result && (
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {dateStr} at {timeStr || "00:00"} {getZoneLabel(fromZone)} ({fromOffset})
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-4xl sm:text-5xl font-bold tabular-nums">
                {result.converted}
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {result.dayOfWeek}, {result.dateDisplay} — {getZoneLabel(toZone)} ({toOffset})
            </p>
            {result.isDifferentDay && (
              <Badge variant="outline" className="mt-3">
                <Globe className="size-3 mr-1" />
                Date changed due to time zone difference
              </Badge>
            )}
          </div>
        </Card>
      )}

      <Separator />

      {/* Quick Compare — Multiple Time Zones at Once */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Globe className="size-5 text-primary" />
              Quick Compare
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              View current time in multiple zones simultaneously
            </p>
          </div>
          {compareZones.length < 4 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddCompareZone}
            >
              <Plus className="size-3.5 mr-1" />
              Add Zone
            </Button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {compareZones.map((zone) => (
            <Card key={zone} className="p-4 relative">
              <CardContent className="p-0">
                <button
                  type="button"
                  onClick={() => handleRemoveCompareZone(zone)}
                  className="absolute top-2 right-2 rounded-full p-1 hover:bg-muted transition-colors"
                  aria-label={`Remove ${getZoneLabel(zone)}`}
                >
                  <X className="size-3.5 text-muted-foreground" />
                </button>
                <p className="text-xs font-medium text-muted-foreground truncate pr-6">
                  {getZoneLabel(zone)}
                </p>
                <Badge variant="secondary" className="text-xs font-mono mb-2">
                  {getUTCOffset(zone, liveTime)}
                </Badge>
                <p className="text-2xl font-bold tabular-nums tracking-tight">
                  {getTimeInZone(zone, liveTime)}
                </p>
              </CardContent>
            </Card>
          ))}

          {compareZones.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground text-sm border border-dashed rounded-xl">
              <Globe className="size-8 mx-auto mb-2 opacity-30" />
              <p>Click &ldquo;Add Zone&rdquo; to compare current time across multiple zones</p>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Globe className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All time zone conversions use the built-in Intl.DateTimeFormat API.
              Your date and time selections are never sent to any server, stored, or shared.
              DST transitions are handled automatically by your browser.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}