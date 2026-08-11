"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Lock,
  Copy,
  RotateCcw,
  Shield,
  Check,
} from "lucide-react"

// ─── MD5 Implementation (RFC 1321) ──────────────────────────────────────────

function md5(input: string): string {
  // Pre-processing: adding padding bits
  const msg = (input || "")
  const bytes: number[] = []
  for (let i = 0; i < msg.length; i++) {
    const c = msg.charCodeAt(i)
    if (c < 128) {
      bytes.push(c)
    } else if (c < 2048) {
      bytes.push(192 | (c >> 6), 128 | (c & 63))
    } else if (c < 55296 || c >= 57344) {
      bytes.push(224 | (c >> 12), 128 | ((c >> 6) & 63), 128 | (c & 63))
    } else {
      i++
      const c2 = msg.charCodeAt(i)
      const cp = ((c - 55296) << 10) + (c2 - 56320) + 65536
      bytes.push(
        240 | (cp >> 18),
        128 | ((cp >> 12) & 63),
        128 | ((cp >> 6) & 63),
        128 | (cp & 63)
      )
    }
  }

  const len = bytes.length
  bytes.push(128)
  while ((bytes.length % 64) !== 56) bytes.push(0)

  // Append original length in bits as 64-bit little-endian
  const bitLen = len * 8
  bytes.push(
    bitLen & 0xff,
    (bitLen >>> 8) & 0xff,
    (bitLen >>> 16) & 0xff,
    (bitLen >>> 24) & 0xff,
    0, 0, 0, 0
  )

  // Initialize hash values
  let a0 = 0x67452301
  let b0 = 0xefcdab89
  let c0 = 0x98badcfe
  let d0 = 0x10325476

  // Per-round shift amounts
  const s: number[] = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ]

  // Pre-computed T table
  const K: number[] = []
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000)
  }

  // Process each 512-bit (64-byte) chunk
  for (let offset = 0; offset < bytes.length; offset += 64) {
    const M: number[] = []
    for (let j = 0; j < 16; j++) {
      M[j] =
        bytes[offset + j * 4] |
        (bytes[offset + j * 4 + 1] << 8) |
        (bytes[offset + j * 4 + 2] << 16) |
        (bytes[offset + j * 4 + 3] << 24)
    }

    let A = a0
    let B = b0
    let C = c0
    let D = d0

    for (let i = 0; i < 64; i++) {
      let F: number
      let g: number
      if (i < 16) {
        F = (B & C) | (~B & D)
        g = i
      } else if (i < 32) {
        F = (D & B) | (~D & C)
        g = (5 * i + 1) % 16
      } else if (i < 48) {
        F = B ^ C ^ D
        g = (3 * i + 5) % 16
      } else {
        F = C ^ (B | ~D)
        g = (7 * i) % 16
      }
      F = (F + A + K[i] + (M[g] || 0)) | 0
      A = D
      D = C
      C = B
      B = (B + ((F << s[i]) | (F >>> (32 - s[i])))) | 0
    }

    a0 = (a0 + A) | 0
    b0 = (b0 + B) | 0
    c0 = (c0 + C) | 0
    d0 = (d0 + D) | 0
  }

  // Produce the final hash value (little-endian)
  const toHex = (n: number): string => {
    const h = (n >>> 0).toString(16)
    return "00000000".slice(h.length) + h
  }
  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0)
}

// ─── SHA Hash via Web Crypto API ────────────────────────────────────────────

type SHAAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512"

async function computeSHA(algorithm: SHAAlgorithm, text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

// ─── Algorithm Config ───────────────────────────────────────────────────────

interface HashResult {
  algorithm: string
  label: string
  bits: number
  hash: string
  color: string
}

const ALGORITHMS: { algorithm: string; label: string; bits: number; color: string }[] = [
  { algorithm: "MD5", label: "MD5", bits: 128, color: "text-red-600 dark:text-red-400" },
  { algorithm: "SHA-1", label: "SHA-1", bits: 160, color: "text-amber-600 dark:text-amber-400" },
  { algorithm: "SHA-256", label: "SHA-256", bits: 256, color: "text-emerald-600 dark:text-emerald-400" },
  { algorithm: "SHA-384", label: "SHA-384", bits: 384, color: "text-sky-600 dark:text-sky-400" },
  { algorithm: "SHA-512", label: "SHA-512", bits: 512, color: "text-violet-600 dark:text-violet-400" },
]

// ─── Component ──────────────────────────────────────────────────────────────

export function HashGeneratorTool() {
  const [input, setInput] = useState("")
  const [results, setResults] = useState<HashResult[]>([])
  const [uppercase, setUppercase] = useState(false)
  const [autoHash, setAutoHash] = useState(true)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const [isComputing, setIsComputing] = useState(false)
  const computeRef = useRef(false)

  const computeHashes = useCallback(
    async (text: string) => {
      const trimmed = (text || "").trim()
      if (trimmed.length === 0) {
        setResults([])
        return
      }
      setIsComputing(true)
      try {
        const hashPromises = ALGORITHMS.map(async (alg) => {
          let hash: string
          if (alg.algorithm === "MD5") {
            hash = md5(trimmed)
          } else {
            hash = await computeSHA(alg.algorithm as SHAAlgorithm, trimmed)
          }
          return {
            ...alg,
            hash,
          } as HashResult
        })
        const computed = await Promise.all(hashPromises)
        setResults(computed)
      } catch {
        setResults([])
      } finally {
        setIsComputing(false)
      }
    },
    []
  )

  // Auto-hash effect
  useEffect(() => {
    if (!autoHash) return
    if (computeRef.current) return
    computeRef.current = true
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      setResults([])
      computeRef.current = false
      return
    }
    let cancelled = false
    ;(async () => {
      await computeHashes(trimmed)
      if (!cancelled) {
        computeRef.current = false
      }
    })()
    return () => {
      cancelled = true
      computeRef.current = false
    }
  }, [input, autoHash, computeHashes])

  const handleInputChange = useCallback(
    (v: string) => {
      setInput(v)
      if (!autoHash) {
        setResults([])
      }
    },
    [autoHash]
  )

  const handleGenerate = useCallback(() => {
    computeHashes((input || "").trim())
  }, [input, computeHashes])

  const handleClear = useCallback(() => {
    setInput("")
    setResults([])
    setCopiedIdx(null)
  }, [])

  const handleCopy = useCallback(
    async (hash: string, idx: number) => {
      const text = uppercase ? hash.toUpperCase() : hash
      try {
        await navigator.clipboard.writeText(text)
        setCopiedIdx(idx)
        setTimeout(() => setCopiedIdx(null), 2000)
      } catch {
        // fallback
      }
    },
    [uppercase]
  )

  const displayHash = useCallback(
    (hash: string) => {
      if ((hash || "").length === 0) return ""
      return uppercase ? hash.toUpperCase() : hash
    },
    [uppercase]
  )

  const inputLength = (input || "").length

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Actions row */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={handleGenerate}
              size="sm"
              className="gap-1.5"
            >
              <Lock className="size-4" />
              Generate Hashes
            </Button>

            <Separator orientation="vertical" className="hidden sm:block h-6" />

            <Button
              onClick={handleClear}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              <RotateCcw className="size-4" />
              Clear
            </Button>
          </div>

          {/* Toggle row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="auto-hash"
                checked={autoHash}
                onCheckedChange={setAutoHash}
              />
              <Label htmlFor="auto-hash" className="text-sm font-medium text-muted-foreground cursor-pointer">
                Auto-hash as you type
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="uppercase"
                checked={uppercase}
                onCheckedChange={setUppercase}
              />
              <Label htmlFor="uppercase" className="text-sm font-medium text-muted-foreground cursor-pointer">
                Uppercase output
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="hash-input" className="text-base font-semibold flex items-center gap-2">
              <Lock className="size-4" />
              Input Text
            </Label>
            <Badge variant="secondary" className="tabular-nums text-xs">
              {inputLength.toLocaleString()} chars
            </Badge>
          </div>
          <Textarea
            id="hash-input"
            placeholder="Enter text to generate hash values..."
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-[140px] resize-y font-mono text-sm leading-relaxed"
            spellCheck={false}
          />
        </CardContent>
      </Card>

      {/* Hash Results */}
      {isComputing && (input || "").trim().length > 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm">Computing hashes...</span>
          </div>
        </div>
      )}

      {!isComputing && results.length > 0 && (
        <div className="space-y-3">
          {results.map((result, idx) => (
            <Card key={result.algorithm}>
              <CardContent className="p-4 sm:p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Shield className={`size-4 ${result.color}`} />
                    <span className={`font-semibold ${result.color}`}>{result.label}</span>
                    <Badge variant="outline" className="text-xs tabular-nums">
                      {result.bits}-bit
                    </Badge>
                    <Badge variant="secondary" className="text-xs tabular-nums">
                      {displayHash(result.hash).length} chars
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleCopy(result.hash, idx)}
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                  >
                    {copiedIdx === idx ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                    {copiedIdx === idx ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <div className="rounded-md bg-muted/60 p-3 overflow-x-auto">
                  <code className="block text-xs sm:text-sm font-mono break-all leading-relaxed text-foreground/90">
                    {displayHash(result.hash)}
                  </code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isComputing && results.length === 0 && (input || "").trim().length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="mx-auto size-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">
              Enter text above to generate hash values using MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms.
            </p>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your Data Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All hashing is performed entirely in your browser using the Web Crypto API and a local MD5 implementation. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
