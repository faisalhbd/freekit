"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Cake, Calendar, Clock, Star, Gift, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// ─── Types ──────────────────────────────────────────────────────────────────

interface AgeResult {
  years: number
  months: number
  days: number
  totalMonths: number
  totalWeeks: number
  totalDays: number
  totalHours: number
  totalMinutes: number
  totalSeconds: number
  dayOfBirth: string
  zodiacSign: ZodiacInfo
  nextBirthday: NextBirthdayInfo
  isBirthdayToday: boolean
}

interface ZodiacInfo {
  name: string
  symbol: string
  element: string
}

interface NextBirthdayInfo {
  days: number
  hours: number
  isToday: boolean
  date: Date
}

// ─── Zodiac Data ────────────────────────────────────────────────────────────

const ZODIAC_SIGNS: Array<{
  name: string
  symbol: string
  element: string
  startMonth: number
  startDay: number
  endMonth: number
  endDay: number
}> = [
  { name: "Capricorn", symbol: "♑", element: "Earth", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: "Aquarius", symbol: "♒", element: "Air", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: "Pisces", symbol: "♓", element: "Water", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: "Aries", symbol: "♈", element: "Fire", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: "Taurus", symbol: "♉", element: "Earth", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: "Gemini", symbol: "♊", element: "Air", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { name: "Cancer", symbol: "♋", element: "Water", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { name: "Leo", symbol: "♌", element: "Fire", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: "Virgo", symbol: "♍", element: "Earth", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: "Libra", symbol: "♎", element: "Air", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { name: "Scorpio", symbol: "♏", element: "Water", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { name: "Sagittarius", symbol: "♐", element: "Fire", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
]

// ─── Helper Functions ───────────────────────────────────────────────────────

function getZodiacSign(month: number, day: number): ZodiacInfo {
  for (const zodiac of ZODIAC_SIGNS) {
    // Handle Capricorn wrapping around year end
    if (zodiac.startMonth === 12 && zodiac.endMonth === 1) {
      if ((month === 12 && day >= zodiac.startDay) || (month === 1 && day <= zodiac.endDay)) {
        return { name: zodiac.name, symbol: zodiac.symbol, element: zodiac.element }
      }
    } else {
      if (
        (month === zodiac.startMonth && day >= zodiac.startDay) ||
        (month === zodiac.endMonth && day <= zodiac.endDay)
      ) {
        return { name: zodiac.name, symbol: zodiac.symbol, element: zodiac.element }
      }
    }
  }
  return { name: "Unknown", symbol: "?", element: "Unknown" }
}

function getDayOfWeek(date: Date): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  return days[date.getDay()]
}

function calculateAge(birthDate: Date, toDate: Date): AgeResult | null {
  if (isNaN(birthDate.getTime()) || isNaN(toDate.getTime())) return null
  if (birthDate > toDate) return null

  // Calculate years, months, days
  let years = toDate.getFullYear() - birthDate.getFullYear()
  let months = toDate.getMonth() - birthDate.getMonth()
  let days = toDate.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    // Get the previous month's days
    const prevMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  // Total calculations
  const diffMs = toDate.getTime() - birthDate.getTime()
  const totalSeconds = Math.floor(diffMs / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months

  // Day of birth
  const dayOfBirth = getDayOfWeek(birthDate)

  // Zodiac sign
  const zodiacSign = getZodiacSign(birthDate.getMonth() + 1, birthDate.getDate())

  // Next birthday
  const birthMonth = birthDate.getMonth()
  const birthDay = birthDate.getDate()
  const today = new Date()

  let nextBdayYear = today.getFullYear()
  let nextBday = new Date(nextBdayYear, birthMonth, birthDay)

  // If Feb 29 birthday and next year is not a leap year, use Feb 28
  if (birthMonth === 1 && birthDay === 29) {
    const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
    if (!isLeapYear(nextBdayYear)) {
      nextBday = new Date(nextBdayYear, 1, 28)
    }
  }

  if (nextBday <= today) {
    nextBdayYear++
    nextBday = new Date(nextBdayYear, birthMonth, birthDay)
    if (birthMonth === 1 && birthDay === 29) {
      const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
      if (!isLeapYear(nextBdayYear)) {
        nextBday = new Date(nextBdayYear, 1, 28)
      }
    }
  }

  const nowMs = today.getTime()
  const nextBdayMs = nextBday.getTime()
  const diffBdayMs = nextBdayMs - nowMs
  const daysUntilBirthday = Math.max(0, Math.ceil(diffBdayMs / (1000 * 60 * 60 * 24)))
  const hoursUntilBirthday = Math.max(0, Math.floor((diffBdayMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))

  // Check if today is birthday
  const isBirthdayToday =
    today.getMonth() === birthMonth && today.getDate() === birthDay

  const nextBirthday: NextBirthdayInfo = {
    days: daysUntilBirthday,
    hours: hoursUntilBirthday,
    isToday: isBirthdayToday,
    date: nextBday,
  }

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    dayOfBirth,
    zodiacSign,
    nextBirthday,
    isBirthdayToday,
  }
}

function formatNumber(num: number): string {
  return num.toLocaleString("en-US")
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function AgeCalculatorTool() {
  const todayStr = useMemo(() => {
    const now = new Date()
    return now.toISOString().split("T")[0]
  }, [])

  const [birthDateStr, setBirthDateStr] = useState("")
  const [toDateStr, setToDateStr] = useState(todayStr)
  const [result, setResult] = useState<AgeResult | null>(null)
  const [error, setError] = useState("")

  // Live seconds ticker for countdown feel
  const [ticker, setTicker] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((t) => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Recalculate when ticker ticks (for live seconds in result)
  const liveResult = useMemo(() => {
    if (!result) return null
    const birth = new Date(birthDateStr + "T00:00:00")
    const to = new Date(toDateStr + "T00:00:00")
    if (toDateStr === todayStr) {
      // Recalculate with current time for live seconds
      const now = new Date()
      const liveAge = calculateAge(birth, now)
      if (liveAge) {
        return { ...liveAge, years: result.years, months: result.months, days: result.days, totalMonths: result.totalMonths, totalWeeks: result.totalWeeks, totalDays: result.totalDays }
      }
    }
    return result
  }, [result, birthDateStr, toDateStr, todayStr, ticker])

  const handleCalculate = useCallback(() => {
    setError("")
    setResult(null)

    if (!birthDateStr) {
      setError("Please enter your date of birth.")
      return
    }

    const birth = new Date(birthDateStr + "T00:00:00")
    const to = toDateStr ? new Date(toDateStr + "T00:00:00") : new Date()

    if (isNaN(birth.getTime())) {
      setError("Please enter a valid date of birth.")
      return
    }

    if (isNaN(to.getTime())) {
      setError("Please enter a valid target date.")
      return
    }

    if (birth > to) {
      setError("Date of birth cannot be after the target date.")
      return
    }

    const ageResult = calculateAge(birth, to)
    if (!ageResult) {
      setError("Could not calculate age. Please check your dates.")
      return
    }

    setResult(ageResult)
  }, [birthDateStr, toDateStr])

  const handleReset = useCallback(() => {
    setBirthDateStr("")
    setToDateStr(todayStr)
    setResult(null)
    setError("")
  }, [todayStr])

  const displayResult = liveResult || result

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Cake className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Calculate Your Age</h3>
              <p className="text-sm text-muted-foreground">
                Enter your date of birth to find out your exact age
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="birth-date" className="flex items-center gap-1.5">
                <Cake className="size-3.5 text-primary" />
                Date of Birth
              </Label>
              <Input
                id="birth-date"
                type="date"
                value={birthDateStr}
                onChange={(e) => setBirthDateStr(e.target.value)}
                max={todayStr}
                className="font-mono"
                aria-label="Date of birth"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-date" className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-primary" />
                Calculate to (optional)
              </Label>
              <Input
                id="to-date"
                type="date"
                value={toDateStr}
                onChange={(e) => setToDateStr(e.target.value)}
                max={todayStr}
                className="font-mono"
                aria-label="Target date for age calculation"
              />
              <p className="text-xs text-muted-foreground">
                Defaults to today if left empty
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button onClick={handleCalculate} className="gap-1.5">
              <Calendar className="size-4" />
              Calculate Age
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/5 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Results Section */}
      {displayResult && (
        <div className="space-y-6">
          {/* Birthday Today Banner */}
          {displayResult.isBirthdayToday && (
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-500/10 p-6">
                <div className="flex items-center gap-3">
                  <PartyPopper className="size-8 text-amber-500" />
                  <div>
                    <h3 className="font-bold text-lg">Happy Birthday!</h3>
                    <p className="text-sm text-muted-foreground">
                      Today is your birthday! You are now {displayResult.years} years old.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Primary Age Display */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Your Age</p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {displayResult.years > 0 && (
                    <>
                      <span className="text-4xl sm:text-5xl font-bold tabular-nums">
                        {displayResult.years}
                      </span>
                      <span className="text-xl text-muted-foreground">
                        {displayResult.years === 1 ? "year" : "years"}
                      </span>
                    </>
                  )}
                  {displayResult.months > 0 && (
                    <>
                      <span className="text-4xl sm:text-5xl font-bold tabular-nums">
                        {displayResult.months}
                      </span>
                      <span className="text-xl text-muted-foreground">
                        {displayResult.months === 1 ? "month" : "months"}
                      </span>
                    </>
                  )}
                  <>
                    <span className="text-4xl sm:text-5xl font-bold tabular-nums">
                      {displayResult.days}
                    </span>
                    <span className="text-xl text-muted-foreground">
                      {displayResult.days === 1 ? "day" : "days"}
                    </span>
                  </>
                </div>
              </div>
            </div>
          </Card>

          {/* Detailed Results Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard
              icon={<Calendar className="size-4" />}
              label="Total Months"
              value={formatNumber(displayResult.totalMonths)}
              sublabel={displayResult.totalMonths === 1 ? "month" : "months"}
            />
            <ResultCard
              icon={<Calendar className="size-4" />}
              label="Total Weeks"
              value={formatNumber(displayResult.totalWeeks)}
              sublabel={displayResult.totalWeeks === 1 ? "week" : "weeks"}
            />
            <ResultCard
              icon={<Calendar className="size-4" />}
              label="Total Days"
              value={formatNumber(displayResult.totalDays)}
              sublabel={displayResult.totalDays === 1 ? "day" : "days"}
            />
            <ResultCard
              icon={<Clock className="size-4" />}
              label="Total Hours"
              value={formatNumber(displayResult.totalHours)}
              sublabel={displayResult.totalHours === 1 ? "hour" : "hours"}
            />
            <ResultCard
              icon={<Clock className="size-4" />}
              label="Total Minutes"
              value={formatNumber(displayResult.totalMinutes)}
              sublabel={displayResult.totalMinutes === 1 ? "minute" : "minutes"}
            />
            <ResultCard
              icon={<Clock className="size-4" />}
              label="Total Seconds"
              value={formatNumber(displayResult.totalSeconds)}
              sublabel={displayResult.totalSeconds === 1 ? "second" : "seconds"}
              highlight
            />
          </div>

          <Separator />

          {/* Additional Info Row */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Next Birthday */}
            <Card className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="size-4 text-primary" />
                  <span className="text-sm font-medium">Next Birthday</span>
                </div>
                {displayResult.nextBirthday.isToday ? (
                  <div className="flex items-center gap-2">
                    <PartyPopper className="size-5 text-amber-500" />
                    <span className="text-lg font-bold">Today!</span>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl font-bold tabular-nums">
                      {displayResult.nextBirthday.days}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        days
                      </span>
                      {displayResult.nextBirthday.hours > 0 && (
                        <span className="text-sm font-normal text-muted-foreground">
                          {" "}{displayResult.nextBirthday.hours} hrs
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {displayResult.nextBirthday.date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Zodiac Sign */}
            <Card className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="size-4 text-primary" />
                  <span className="text-sm font-medium">Zodiac Sign</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{displayResult.zodiacSign.symbol}</span>
                  <div>
                    <p className="text-lg font-bold">{displayResult.zodiacSign.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      {displayResult.zodiacSign.element}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Born On */}
            <Card className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="size-4 text-primary" />
                  <span className="text-sm font-medium">Born On</span>
                </div>
                <p className="text-lg font-bold">{displayResult.dayOfBirth}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(birthDateStr + "T00:00:00").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
                <Cake className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
                <p className="text-sm text-muted-foreground">
                  All calculations happen locally using JavaScript. Your date of birth is never sent to any
                  server, stored, or shared. Close the tab and your data is gone.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

// ─── Result Card Component ───────────────────────────────────────────────────

function ResultCard({
  icon,
  label,
  value,
  sublabel,
  highlight,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sublabel: string
  highlight?: boolean
}) {
  return (
    <Card className={highlight ? "border-primary/30 bg-primary/5" : ""}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
        </div>
        <p className={`text-2xl font-bold tabular-nums ${highlight ? "text-primary" : ""}`}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
      </CardContent>
    </Card>
  )
}
