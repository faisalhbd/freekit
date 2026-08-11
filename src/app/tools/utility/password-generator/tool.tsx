"use client"

import { useState, useCallback, useMemo } from "react"
import {
  Copy,
  Check,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Shield,
  ShieldX,
  KeyRound,
  Clock,
  Trash2,
  Download,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Character Sets ───────────────────────────────────────────────────────────

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
}

const AMBIGUOUS_CHARS = new Set([
  "I", "l", "1", "O", "0", "o",
  "|", "`", "'", '"', "\\",
  "(", ")", "[", "]", "{", "}",
  ",", ".", ";", ":", "<", ">",
  "/", "-", "_", "+", "=",
])

// ─── Strength Config ──────────────────────────────────────────────────────────

type StrengthLevel = "very-weak" | "weak" | "fair" | "strong" | "very-strong"

interface StrengthInfo {
  level: StrengthLevel
  label: string
  color: string
  bgColor: string
  textColor: string
  percent: number
  icon: typeof ShieldX
  crackTime: string
}

function getStrength(length: number, enabledCount: number): StrengthInfo {
  const poolSize = getPoolSize(enabledCount)
  const entropy = poolSize > 0 ? Math.log2(Math.pow(poolSize, length)) : 0

  if (entropy < 28) return { level: "very-weak", label: "Very Weak", color: "bg-red-500", bgColor: "bg-red-500/10", textColor: "text-red-600 dark:text-red-400", percent: 10, icon: ShieldX, crackTime: "< 1 second" }
  if (entropy < 36) return { level: "weak", label: "Weak", color: "bg-orange-500", bgColor: "bg-orange-500/10", textColor: "text-orange-600 dark:text-orange-400", percent: 25, icon: ShieldAlert, crackTime: "Seconds to minutes" }
  if (entropy < 60) return { level: "fair", label: "Fair", color: "bg-amber-500", bgColor: "bg-amber-500/10", textColor: "text-amber-600 dark:text-amber-400", percent: 50, icon: Shield, crackTime: "Hours to days" }
  if (entropy < 80) return { level: "strong", label: "Strong", color: "bg-emerald-500", bgColor: "bg-emerald-500/10", textColor: "text-emerald-600 dark:text-emerald-400", percent: 75, icon: ShieldCheck, crackTime: "Years to centuries" }
  return { level: "very-strong", label: "Very Strong", color: "bg-emerald-600", bgColor: "bg-emerald-600/10", textColor: "text-emerald-600 dark:text-emerald-400", percent: 100, icon: ShieldCheck, crackTime: "Millions of years+" }
}

function getPoolSize(enabledCount: number): number {
  if (enabledCount === 0) return 0
  let pool = 0
  if (enabledCount >= 1) pool += 26 // uppercase
  if (enabledCount >= 2) pool += 26 // lowercase
  if (enabledCount >= 3) pool += 10 // numbers
  if (enabledCount >= 4) pool += 28 // symbols
  return pool
}

// ─── Password Generation ─────────────────────────────────────────────────────

function generatePassword(
  length: number,
  options: {
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    symbols: boolean
    excludeAmbiguous: boolean
    excludeCustom: string
  }
): string {
  let pool = ""

  if (options.uppercase) pool += CHAR_SETS.uppercase
  if (options.lowercase) pool += CHAR_SETS.lowercase
  if (options.numbers) pool += CHAR_SETS.numbers
  if (options.symbols) pool += CHAR_SETS.symbols

  if (options.excludeAmbiguous) {
    pool = pool.split("").filter((c) => !AMBIGUOUS_CHARS.has(c)).join("")
  }
  if (options.excludeCustom) {
    const excludeSet = new Set(options.excludeCustom.split(""))
    pool = pool.split("").filter((c) => !excludeSet.has(c)).join("")
  }

  if (pool.length === 0) return ""

  // Use crypto.getRandomValues for cryptographic randomness
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)

  let password = ""
  for (let i = 0; i < length; i++) {
    password += pool[array[i] % pool.length]
  }

  // Ensure at least one character from each enabled set
  const requiredChars: string[] = []
  if (options.uppercase) requiredChars.push(CHAR_SETS.uppercase)
  if (options.lowercase) requiredChars.push(CHAR_SETS.lowercase)
  if (options.numbers) requiredChars.push(CHAR_SETS.numbers)
  if (options.symbols) requiredChars.push(CHAR_SETS.symbols)

  // Filter required chars by exclusion rules
  const pChars = password.split("")
  for (const reqSet of requiredChars) {
    let filteredSet = reqSet
    if (options.excludeAmbiguous) {
      filteredSet = filteredSet.split("").filter((c) => !AMBIGUOUS_CHARS.has(c)).join("")
    }
    if (options.excludeCustom) {
      const excludeSet = new Set(options.excludeCustom.split(""))
      filteredSet = filteredSet.split("").filter((c) => !excludeSet.has(c)).join("")
    }
    if (filteredSet.length > 0 && length >= requiredChars.length) {
      // Find a position we can replace
      const idx = requiredChars.indexOf(reqSet)
      const randomPos = new Uint32Array(1)
      crypto.getRandomValues(randomPos)
      const pos = randomPos[0] % length
      const randomChar = new Uint32Array(1)
      crypto.getRandomValues(randomChar)
      pChars[pos] = filteredSet[randomChar[0] % filteredSet.length]
    }
  }

  return pChars.join("")
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PasswordGeneratorTool() {
  // Password options
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [excludeCustom, setExcludeCustom] = useState("")
  const [passwordCount, setPasswordCount] = useState(5)

  // Generated passwords — initialize with a default password on mount
  const defaultOptions = { uppercase: true, lowercase: true, numbers: true, symbols: true, excludeAmbiguous: false, excludeCustom: "" }
  const [primaryPassword, setPrimaryPassword] = useState<string>(() => generatePassword(16, defaultOptions))
  const [additionalPasswords, setAdditionalPasswords] = useState<string[]>(() => {
    const passwords: string[] = []
    for (let i = 0; i < 4; i++) {
      passwords.push(generatePassword(16, defaultOptions))
    }
    return passwords
  })

  // UI state
  const [copiedPrimary, setCopiedPrimary] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  // Computed values
  const enabledCount = [uppercase, lowercase, numbers, symbols].filter(Boolean).length
  const strength = useMemo(() => getStrength(length, enabledCount), [length, enabledCount])
  const StrengthIcon = strength.icon
  const canGenerate = enabledCount > 0 && length > 0

  // ─── Generate Passwords ──────────────────────────────────────────────────

  const generatePasswords = useCallback(() => {
    if (!canGenerate) return

    const options = { uppercase, lowercase, numbers, symbols, excludeAmbiguous, excludeCustom }
    const primary = generatePassword(length, options)
    setPrimaryPassword(primary)

    const additional: string[] = []
    for (let i = 1; i < passwordCount; i++) {
      additional.push(generatePassword(length, options))
    }
    setAdditionalPasswords(additional)

    // Add to history (max 20)
    setHistory((prev) => [primary, ...prev.slice(0, 19)])
  }, [canGenerate, uppercase, lowercase, numbers, symbols, excludeAmbiguous, excludeCustom, length, passwordCount])

  // ─── Copy Functions ───────────────────────────────────────────────────────

  const copyPrimary = useCallback(async () => {
    if (!primaryPassword) return
    try {
      await navigator.clipboard.writeText(primaryPassword)
      setCopiedPrimary(true)
      setTimeout(() => setCopiedPrimary(false), 2000)
    } catch {
      // fallback
    }
  }, [primaryPassword])

  const copyPassword = useCallback(async (password: string, index: number) => {
    try {
      await navigator.clipboard.writeText(password)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      // fallback
    }
  }, [])

  const copyAllPasswords = useCallback(async () => {
    const allPasswords = [primaryPassword, ...additionalPasswords].filter(Boolean)
    if (allPasswords.length === 0) return
    try {
      await navigator.clipboard.writeText(allPasswords.join("\n"))
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 2000)
    } catch {
      // fallback
    }
  }, [primaryPassword, additionalPasswords])

  const downloadPasswords = useCallback(() => {
    const allPasswords = [primaryPassword, ...additionalPasswords].filter(Boolean)
    if (allPasswords.length === 0) return
    const content = allPasswords.map((p, i) => `Password ${i + 1}: ${p}`).join("\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "passwords.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [primaryPassword, additionalPasswords])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const applyFromHistory = useCallback((password: string) => {
    setPrimaryPassword(password)
    setAdditionalPasswords([])
  }, [])

  // ─── Entropy calculation ─────────────────────────────────────────────────

  const entropy = useMemo(() => {
    const pool = getPoolSize(enabledCount)
    return pool > 0 ? Math.log2(Math.pow(pool, length)) : 0
  }, [length, enabledCount])

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        {/* 1. Main Password Display */}
        <Card className="overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <KeyRound className="size-5 text-primary" />
              <h2 className="font-semibold">Generated Password</h2>
            </div>

            {/* Password Display */}
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-lg border border-border bg-muted/50 px-4 py-3.5 font-mono text-lg sm:text-xl tracking-wider break-all min-h-[52px] flex items-center">
                {primaryPassword || (
                  <span className="text-muted-foreground text-base italic">Click Generate to create a password</span>
                )}
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="shrink-0 size-11"
                    onClick={copyPrimary}
                    disabled={!primaryPassword}
                    aria-label="Copy password"
                  >
                    {copiedPrimary ? (
                      <Check className="size-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="size-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{copiedPrimary ? "Copied!" : "Copy password"}</TooltipContent>
              </Tooltip>
            </div>

            {/* Strength Meter */}
            {primaryPassword && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StrengthIcon className={`size-4 ${strength.textColor}`} />
                    <span className={`text-sm font-medium ${strength.textColor}`}>{strength.label}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{entropy.toFixed(1)} bits entropy</span>
                    <span>•</span>
                    <span>Crack time: ~{strength.crackTime}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                    style={{ width: `${strength.percent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* 2. Settings Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Character Options */}
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <KeyRound className="size-4 text-primary" />
                Password Settings
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Configure your password preferences</p>
            </div>

            <Separator />

            {/* Password Length */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password-length" className="text-sm font-medium">
                  Password Length
                </Label>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-lg border border-border bg-muted px-2.5 py-0.5 text-sm font-mono font-medium tabular-nums">
                    {length}
                  </span>
                </div>
              </div>
              <Slider
                id="password-length"
                value={[length]}
                onValueChange={([val]) => setLength(val)}
                min={4}
                max={128}
                step={1}
                className="w-full"
                aria-label="Password length"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4</span>
                <div className="flex gap-2">
                  {[
                    { label: "PIN", len: 4 },
                    { label: "Short", len: 8 },
                    { label: "Standard", len: 12 },
                    { label: "Strong", len: 16 },
                    { label: "Ultra", len: 24 },
                    { label: "Max", len: 64 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setLength(preset.len)}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                        length === preset.len
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <span>128</span>
              </div>
            </div>

            <Separator />

            {/* Character Types */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Character Types</Label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer transition-colors hover:bg-muted/50 has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5">
                  <Checkbox
                    checked={uppercase}
                    onCheckedChange={(v) => setUppercase(!!v)}
                    aria-label="Include uppercase letters"
                  />
                  <div className="space-y-0.5">
                    <span className="text-sm font-medium">Uppercase</span>
                    <span className="block text-[10px] text-muted-foreground font-mono">A-Z (26 chars)</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer transition-colors hover:bg-muted/50 has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5">
                  <Checkbox
                    checked={lowercase}
                    onCheckedChange={(v) => setLowercase(!!v)}
                    aria-label="Include lowercase letters"
                  />
                  <div className="space-y-0.5">
                    <span className="text-sm font-medium">Lowercase</span>
                    <span className="block text-[10px] text-muted-foreground font-mono">a-z (26 chars)</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer transition-colors hover:bg-muted/50 has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5">
                  <Checkbox
                    checked={numbers}
                    onCheckedChange={(v) => setNumbers(!!v)}
                    aria-label="Include numbers"
                  />
                  <div className="space-y-0.5">
                    <span className="text-sm font-medium">Numbers</span>
                    <span className="block text-[10px] text-muted-foreground font-mono">0-9 (10 chars)</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer transition-colors hover:bg-muted/50 has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5">
                  <Checkbox
                    checked={symbols}
                    onCheckedChange={(v) => setSymbols(!!v)}
                    aria-label="Include symbols"
                  />
                  <div className="space-y-0.5">
                    <span className="text-sm font-medium">Symbols</span>
                    <span className="block text-[10px] text-muted-foreground font-mono">!@#$%... (28 chars)</span>
                  </div>
                </label>
              </div>

              {enabledCount === 0 && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <Info className="size-3" />
                  Select at least one character type
                </p>
              )}
            </div>

            <Separator />

            {/* Exclusion Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Exclusion Options</Label>
              <label className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-pointer transition-colors hover:bg-muted/50 has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5">
                <Checkbox
                  checked={excludeAmbiguous}
                  onCheckedChange={(v) => setExcludeAmbiguous(!!v)}
                  aria-label="Exclude ambiguous characters"
                />
                <div className="space-y-0.5">
                  <span className="text-sm font-medium">Exclude Ambiguous Characters</span>
                  <span className="block text-[10px] text-muted-foreground">
                    Removes: I, l, 1, O, 0, o, |, `, &quot;, and similar
                  </span>
                </div>
              </label>
              <div className="space-y-1.5">
                <Label htmlFor="exclude-custom" className="text-xs text-muted-foreground">
                  Custom characters to exclude
                </Label>
                <Input
                  id="exclude-custom"
                  type="text"
                  value={excludeCustom}
                  onChange={(e) => setExcludeCustom(e.target.value)}
                  placeholder="e.g. {}[]|\\"
                  className="font-mono text-sm"
                  aria-label="Characters to exclude from password"
                />
              </div>
            </div>
          </Card>

          {/* Right Column: Generation Controls + Results */}
          <div className="space-y-6">
            {/* Generation Controls */}
            <Card className="p-6 space-y-5">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <RefreshCw className="size-4 text-primary" />
                  Generate
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Generate single or multiple passwords</p>
              </div>

              <Separator />

              {/* Number of Passwords */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-count" className="text-sm font-medium">
                    Number of Passwords
                  </Label>
                  <span className="rounded-lg border border-border bg-muted px-2.5 py-0.5 text-sm font-mono font-medium tabular-nums">
                    {passwordCount}
                  </span>
                </div>
                <Slider
                  id="password-count"
                  value={[passwordCount]}
                  onValueChange={([val]) => setPasswordCount(val)}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                  aria-label="Number of passwords to generate"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={generatePasswords}
                disabled={!canGenerate}
              >
                <RefreshCw className="size-4 mr-2" />
                Generate {passwordCount > 1 ? `${passwordCount} Passwords` : "Password"}
              </Button>

              {!canGenerate && (
                <p className="text-xs text-destructive text-center">
                  Select at least one character type to generate passwords
                </p>
              )}
            </Card>

            {/* Additional Passwords */}
            {additionalPasswords.length > 0 && (
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">
                    Additional Passwords ({additionalPasswords.length})
                  </h3>
                  <div className="flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={copyAllPasswords}
                          aria-label="Copy all passwords"
                        >
                          {copiedAll ? (
                            <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy all passwords</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={downloadPasswords}
                          aria-label="Download passwords as text file"
                        >
                          <Download className="size-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Download as .txt</TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {additionalPasswords.map((password, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-2.5 group"
                    >
                      <span className="shrink-0 text-[10px] text-muted-foreground w-6 text-right font-mono">
                        {index + 2}
                      </span>
                      <code className="flex-1 text-sm font-mono break-all text-foreground">
                        {password}
                      </code>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => copyPassword(password, index)}
                            aria-label={`Copy password ${index + 2}`}
                          >
                            {copiedIndex === index ? (
                              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy password</TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* History */}
            {history.length > 0 && (
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Clock className="size-4 text-muted-foreground" />
                    Recent Passwords
                  </h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={clearHistory}
                        aria-label="Clear password history"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Clear history</TooltipContent>
                  </Tooltip>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {history.map((password, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-mono hover:bg-muted/50 transition-colors cursor-pointer group"
                      onClick={() => applyFromHistory(password)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter") applyFromHistory(password) }}
                      aria-label="Use this password"
                    >
                      <span className="truncate flex-1 text-muted-foreground">{password}</span>
                      <span className="shrink-0 text-[9px] text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        click to use
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* 3. Security Info Banner */}
        <Card className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
              <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">100% Private &amp; Secure</p>
              <p className="text-sm text-muted-foreground">
                All passwords are generated in your browser using the Web Crypto API with cryptographically
                secure random values. Nothing is ever sent to a server, stored, or tracked. Your passwords
                exist only in your browser memory and disappear when you close this tab.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}
