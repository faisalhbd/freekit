"use client"

import { useState, useMemo } from "react"
import { ShieldCheck, Eye, EyeOff, Check, X, Lightbulb } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// ─── Common passwords list (top ~50) ─────────────────────────────────────────
const COMMON_PASSWORDS = new Set([
  "password", "123456", "12345678", "qwerty", "abc123", "monkey", "master",
  "dragon", "111111", "baseball", "iloveyou", "trustno1", "sunshine",
  "ashley", "football", "shadow", "123123", "654321", "superman",
  "qazwsx", "michael", "password1", "password123", "letmein", "admin",
  "welcome", "login", "princess", "starwars", "passw0rd", "hello",
  "000000", "charlie", "donald", "access", "flower", "whatever",
  "cheese", "pepper", "summer", "winter", "spring", "autumn",
  "batman", "robert", "jennifer", "hunter", "thomas", "soccer",
  "hockey", "ranger", "daniel", "starwars", "klaster", "george",
  "computer", "michelle", "jessica", "zxcvbn", "1q2w3e", "1qaz2wsx",
])

// ─── Analysis functions ───────────────────────────────────────────────────────

function hasSequential(pwd: string): boolean {
  const seqs = ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba", "0123456789", "9876543210"]
  const lower = pwd.toLowerCase()
  for (const seq of seqs) {
    for (let i = 0; i <= seq.length - 3; i++) {
      if (lower.includes(seq.slice(i, i + 3))) return true
    }
  }
  return false
}

function hasRepeated(pwd: string): boolean {
  return /(.)\1{2,}/.test(pwd)
}

function getCharsetSize(pwd: string): number {
  let size = 0
  if (/[a-z]/.test(pwd)) size += 26
  if (/[A-Z]/.test(pwd)) size += 26
  if (/[0-9]/.test(pwd)) size += 10
  if (/[^a-zA-Z0-9]/.test(pwd)) size += 32
  return size
}

function estimateCrackTime(pwd: string): string {
  const len = pwd.length
  if (len === 0) return "Instant"
  const charset = getCharsetSize(pwd)
  if (charset === 0) return "Instant"
  // If it's a common password, crack time is instant
  if (COMMON_PASSWORDS.has(pwd.toLowerCase())) return "Instant"
  const combinations = Math.pow(charset, len)
  const guessesPerSecond = 1e10 // 10 billion
  const seconds = combinations / guessesPerSecond / 2 // average case
  if (seconds < 1) return "Less than 1 second"
  if (seconds < 60) return `${Math.round(seconds)} seconds`
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`
  if (seconds < 86400 * 30) return `${Math.round(seconds / 86400)} days`
  if (seconds < 86400 * 365) return `${Math.round(seconds / 86400 / 30)} months`
  if (seconds < 86400 * 365 * 100) return `${Math.round(seconds / 86400 / 365)} years`
  if (seconds < 86400 * 365 * 1e6) return `${Math.round(seconds / 86400 / 365 / 1000)} thousand years`
  if (seconds < 86400 * 365 * 1e9) return `${Math.round(seconds / 86400 / 365 / 1e6)} million years`
  if (seconds < 86400 * 365 * 1e12) return `${Math.round(seconds / 86400 / 365 / 1e9)} billion years`
  return "Centuries+"
}

interface AnalysisResult {
  score: number
  label: string
  color: string
  bgColor: string
  barColor: string
  lengthScore: number
  lengthLabel: string
  uppercaseScore: number
  uppercaseLabel: string
  lowercaseScore: number
  lowercaseLabel: string
  numbersScore: number
  numbersLabel: string
  specialScore: number
  specialLabel: string
  patternScore: number
  patternLabel: string
  crackTime: string
  suggestions: string[]
}

function analyze(pwd: string): AnalysisResult {
  const len = pwd.length

  // Length score (0-25)
  let lengthScore = 0
  let lengthLabel = ""
  if (len === 0) { lengthScore = 0; lengthLabel = "No password entered" }
  else if (len < 8) { lengthScore = 0; lengthLabel = "Too short (" + len + " chars)" }
  else if (len <= 11) { lengthScore = 10; lengthLabel = "Short (" + len + " chars)" }
  else if (len <= 15) { lengthScore = 18; lengthLabel = "Good (" + len + " chars)" }
  else { lengthScore = 25; lengthLabel = "Excellent (" + len + " chars)" }

  // Uppercase (0-15)
  const hasUpper = /[A-Z]/.test(pwd)
  const upperCount = (pwd.match(/[A-Z]/g) || []).length
  let uppercaseScore = 0
  let uppercaseLabel = ""
  if (len === 0) { uppercaseScore = 0; uppercaseLabel = "No password" }
  else if (!hasUpper) { uppercaseScore = 0; uppercaseLabel = "No uppercase letters" }
  else if (upperCount <= 1) { uppercaseScore = 8; uppercaseLabel = "1 uppercase letter" }
  else { uppercaseScore = 15; uppercaseLabel = upperCount + " uppercase letters" }

  // Lowercase (0-15)
  const hasLower = /[a-z]/.test(pwd)
  const lowerCount = (pwd.match(/[a-z]/g) || []).length
  let lowercaseScore = 0
  let lowercaseLabel = ""
  if (len === 0) { lowercaseScore = 0; lowercaseLabel = "No password" }
  else if (!hasLower) { lowercaseScore = 0; lowercaseLabel = "No lowercase letters" }
  else if (lowerCount <= 1) { lowercaseScore = 8; lowercaseLabel = "1 lowercase letter" }
  else { lowercaseScore = 15; lowercaseLabel = lowerCount + " lowercase letters" }

  // Numbers (0-15)
  const hasNum = /[0-9]/.test(pwd)
  const numCount = (pwd.match(/[0-9]/g) || []).length
  let numbersScore = 0
  let numbersLabel = ""
  if (len === 0) { numbersScore = 0; numbersLabel = "No password" }
  else if (!hasNum) { numbersScore = 0; numbersLabel = "No numbers" }
  else if (numCount <= 1) { numbersScore = 8; numbersLabel = "1 number" }
  else { numbersScore = 15; numbersLabel = numCount + " numbers" }

  // Special chars (0-15)
  const hasSpecial = /[^a-zA-Z0-9]/.test(pwd)
  const specCount = (pwd.match(/[^a-zA-Z0-9]/g) || []).length
  let specialScore = 0
  let specialLabel = ""
  if (len === 0) { specialScore = 0; specialLabel = "No password" }
  else if (!hasSpecial) { specialScore = 0; specialLabel = "No special characters" }
  else if (specCount <= 1) { specialScore = 8; specialLabel = "1 special character" }
  else { specialScore = 15; specialLabel = specCount + " special characters" }

  // Pattern bonus (0-15)
  let patternScore = 0
  let patternLabel = ""
  const isCommon = COMMON_PASSWORDS.has(pwd.toLowerCase())
  const isSeq = hasSequential(pwd)
  const isRept = hasRepeated(pwd)
  if (len === 0) { patternScore = 0; patternLabel = "No password" }
  else if (isCommon) { patternScore = 0; patternLabel = "Common password detected!" }
  else if (isSeq && isRept) { patternScore = 3; patternLabel = "Sequential + repeated chars" }
  else if (isSeq) { patternScore = 5; patternLabel = "Sequential characters found" }
  else if (isRept) { patternScore = 5; patternLabel = "Repeated characters found" }
  else { patternScore = 15; patternLabel = "No common patterns" }

  const score = Math.min(100, lengthScore + uppercaseScore + lowercaseScore + numbersScore + specialScore + patternScore)

  // Label & color
  let label = ""
  let color = ""
  let bgColor = ""
  let barColor = ""
  if (len === 0) { label = "Enter a password"; color = "text-muted-foreground"; bgColor = "bg-muted"; barColor = "bg-muted-foreground" }
  else if (score <= 20) { label = "Very Weak"; color = "text-red-600 dark:text-red-400"; bgColor = "bg-red-500/10"; barColor = "bg-red-500" }
  else if (score <= 40) { label = "Weak"; color = "text-orange-600 dark:text-orange-400"; bgColor = "bg-orange-500/10"; barColor = "bg-orange-500" }
  else if (score <= 60) { label = "Fair"; color = "text-yellow-600 dark:text-yellow-400"; bgColor = "bg-yellow-500/10"; barColor = "bg-yellow-500" }
  else if (score <= 80) { label = "Strong"; color = "text-lime-600 dark:text-lime-400"; bgColor = "bg-lime-500/10"; barColor = "bg-lime-500" }
  else { label = "Very Strong"; color = "text-green-600 dark:text-green-400"; bgColor = "bg-green-500/10"; barColor = "bg-green-500" }

  // Suggestions
  const suggestions: string[] = []
  if (len > 0 && len < 12) suggestions.push("Use at least 12 characters for better security")
  if (!hasUpper) suggestions.push("Add uppercase letters (A-Z)")
  if (!hasLower) suggestions.push("Add lowercase letters (a-z)")
  if (!hasNum) suggestions.push("Add numbers (0-9)")
  if (!hasSpecial) suggestions.push("Add special characters (!@#$%^&*)")
  if (isCommon) suggestions.push("This is a commonly used password — choose something unique")
  if (isSeq) suggestions.push("Avoid sequential characters like abc or 123")
  if (isRept) suggestions.push("Avoid repeated characters like aaa or 111")
  if (len > 0 && score > 80) suggestions.push("Excellent! This is a very strong password.")

  return {
    score, label, color, bgColor, barColor,
    lengthScore, lengthLabel,
    uppercaseScore, uppercaseLabel,
    lowercaseScore, lowercaseLabel,
    numbersScore, numbersLabel,
    specialScore, specialLabel,
    patternScore, patternLabel,
    crackTime: estimateCrackTime(pwd),
    suggestions,
  }
}

// ─── Checklist Item ───────────────────────────────────────────────────────────

function CheckItem({ passed, label, points }: { passed: boolean; label: string; points: number }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="flex items-center gap-2 min-w-0">
        {passed ? (
          <div className="flex items-center justify-center rounded-full bg-emerald-500/20 p-0.5 shrink-0">
            <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-full bg-red-500/20 p-0.5 shrink-0">
            <X className="size-3.5 text-red-600 dark:text-red-400" />
          </div>
        )}
        <span className="text-sm truncate">{label}</span>
      </div>
      <span className={`text-xs font-mono shrink-0 ${points > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
        +{points}pts
      </span>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PasswordStrengthCheckerTool() {
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd] = useState(false)

  const result = useMemo(() => analyze(password), [password])

  const checklistItems = [
    { passed: result.lengthScore > 0, label: result.lengthLabel, points: result.lengthScore },
    { passed: result.uppercaseScore > 0, label: result.uppercaseLabel, points: result.uppercaseScore },
    { passed: result.lowercaseScore > 0, label: result.lowercaseLabel, points: result.lowercaseScore },
    { passed: result.numbersScore > 0, label: result.numbersLabel, points: result.numbersScore },
    { passed: result.specialScore > 0, label: result.specialLabel, points: result.specialScore },
    { passed: result.patternScore >= 15, label: result.patternLabel, points: result.patternScore },
  ]

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <ShieldCheck className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Password Strength Checker</h3>
              <p className="text-sm text-muted-foreground">
                Enter a password to check its strength — nothing is sent anywhere
              </p>
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="pwd-input" className="sr-only">Password</Label>
            <div className="relative">
              <Input
                id="pwd-input"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password here..."
                className="pr-10 font-mono text-base"
                autoComplete="off"
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 size-8"
                onClick={() => setShowPwd(!showPwd)}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`rounded-lg ${result.bgColor} p-4 space-y-3`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold ${result.color}`}>{result.label}</span>
              <span className={`text-2xl font-bold tabular-nums font-mono ${result.color}`}>{password.length === 0 ? "—" : result.score}</span>
            </div>
            <div className="h-3 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${result.barColor}`}
                style={{ width: `${password.length === 0 ? 0 : result.score}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>60</span>
              <span>80</span>
              <span>100</span>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Two-column: Checklist + Info */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Checklist */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Detailed Checklist</h4>
              <div className="divide-y divide-border">
                {checklistItems.map((item, i) => (
                  <CheckItem key={i} passed={item.passed} label={item.label} points={item.points} />
                ))}
              </div>
            </div>

            {/* Crack Time + Suggestions */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Estimated Crack Time</h4>
                <p className={`text-lg font-bold font-mono ${result.color}`}>{
                  password.length === 0 ? "—" : result.crackTime
                }</p>
                <p className="text-xs text-muted-foreground mt-0.5">Based on 10 billion guesses/second (GPU attack)</p>
              </div>

              {result.suggestions.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <Lightbulb className="size-3.5" /> Suggestions
                  </h4>
                  <ul className="space-y-1.5">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Nothing Leaves Your Browser</p>
            <p className="text-sm text-muted-foreground">
              Your password is analyzed entirely in JavaScript. It is never transmitted, stored, or logged. Close this tab and it is gone forever.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
