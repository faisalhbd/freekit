"use client"

import { useState, useCallback, useRef } from "react"
import { Fingerprint, Upload, Copy, Check, X, CheckCircle2, Loader2, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// ─── MD5 Implementation (compact) ───────────────────────────────────────────

function md5(input: Uint8Array): string {
  // Pre-computed S-box
  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ]

  // Pre-computed K constants
  const K = new Uint32Array(64)
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000)
  }

  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff)
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  function bitRotateLeft(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }

  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
  }

  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }

  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }

  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  // Pre-processing: adding padding bits
  const msgLen = input.length
  const bitLen = msgLen * 8
  const padLen = ((56 - (msgLen + 1) % 64) + 64) % 64
  const buf = new Uint8Array(msgLen + 1 + padLen + 8)
  buf.set(input)
  buf[msgLen] = 0x80
  // Append length in bits as 64-bit little-endian
  const view = new DataView(buf.buffer)
  // Use two 32-bit writes for 64-bit length (little-endian)
  const lo = bitLen >>> 0
  const hi = Math.floor(bitLen / 0x100000000)
  view.setUint32(buf.length - 8, lo, true)
  view.setUint32(buf.length - 4, hi, true)

  // Initialize hash values
  let a0 = 0x67452301
  let b0 = 0xefcdab89
  let c0 = 0x98badcfe
  let d0 = 0x10325476

  // Process each 512-bit (64-byte) chunk
  for (let offset = 0; offset < buf.length; offset += 64) {
    const M = new Uint32Array(16)
    const chunkView = new DataView(buf.buffer, offset, 64)
    for (let j = 0; j < 16; j++) {
      M[j] = chunkView.getUint32(j * 4, true)
    }

    let A = a0, B = b0, C = c0, D = d0

    for (let i = 0; i < 64; i++) {
      let F: number, g: number
      if (i < 16) { F = (B & C) | (~B & D); g = i }
      else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16 }
      else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16 }
      else { F = C ^ (B | ~D); g = (7 * i) % 16 }

      F = safeAdd(safeAdd(A, F), safeAdd(K[i], M[g]))
      A = D
      D = C
      C = B
      B = safeAdd(B, bitRotateLeft(F, S[i]))
    }

    a0 = safeAdd(a0, A)
    b0 = safeAdd(b0, B)
    c0 = safeAdd(c0, C)
    d0 = safeAdd(d0, D)
  }

  // Output as hex
  const toHex = (n: number) => (n >>> 0).toString(16).padStart(8, "0")
  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0)
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB"
}

async function computeHash(algo: string, data: Uint8Array): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(algo, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

interface HashResults {
  md5: string
  sha1: string
  sha256: string
  sha512: string
}

// ─── Hash Block ─────────────────────────────────────────────────────────────

function HashBlock({ label, value, onCopy }: { label: string; value: string; onCopy: (v: string) => void }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy(value)
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs" onClick={handleCopy}>
          {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <p className="font-mono text-xs break-all leading-relaxed select-all">{value || "—"}</p>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function FileChecksumVerifierTool() {
  const [file, setFile] = useState<File | null>(null)
  const [hashes, setHashes] = useState<HashResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [verifyHash, setVerifyHash] = useState("")
  const [verifyResult, setVerifyResult] = useState<{ match: boolean; algo: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (f: File) => {
    setFile(f)
    setHashes(null)
    setVerifyResult(null)
    setLoading(true)

    try {
      const buffer = await f.arrayBuffer()
      const data = new Uint8Array(buffer)

      // MD5 is computed with our inline implementation (sync)
      const md5Hash = md5(data)

      // SHA-1, SHA-256, SHA-512 via Web Crypto API (async, parallel)
      const [sha1, sha256, sha512] = await Promise.all([
        computeHash("SHA-1", data),
        computeHash("SHA-256", data),
        computeHash("SHA-512", data),
      ])

      setHashes({ md5: md5Hash, sha1, sha256, sha512 })
    } catch {
      setHashes(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleVerify = () => {
    if (!hashes || !verifyHash.trim()) {
      setVerifyResult(null)
      return
    }
    const normalized = verifyHash.trim().toLowerCase().replace(/\s/g, "")
    const entries: [string, string][] = [
      ["MD5", hashes.md5],
      ["SHA-1", hashes.sha1],
      ["SHA-256", hashes.sha256],
      ["SHA-512", hashes.sha512],
    ]
    const match = entries.find(([, h]) => h === normalized)
    setVerifyResult(match ? { match: true, algo: match[0] } : { match: false, algo: "" })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) processFile(f)
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Fingerprint className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">File Checksum Verifier</h3>
              <p className="text-sm text-muted-foreground">
                Calculate and verify MD5, SHA-1, SHA-256, SHA-512 hashes
              </p>
            </div>
          </div>

          {/* Upload */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              file ? "border-emerald-500/50 bg-emerald-500/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) processFile(f)
              }}
            />
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="size-8 text-emerald-600 dark:text-emerald-400" />
                <div className="text-left">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatSize(file.size)}
                    {file.type ? ` · ${file.type}` : ""}
                    {file.lastModified ? ` · Modified: ${new Date(file.lastModified).toLocaleDateString()}` : ""}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Upload className="mx-auto size-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium">Drop a file here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Any file type is supported</p>
              </>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2 py-6 text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
              <span className="text-sm">Calculating hashes...</span>
            </div>
          )}

          {/* Hash Results */}
          {hashes && !loading && (
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold">Calculated Hashes</h4>
              <div className="space-y-3">
                <HashBlock label="MD5" value={hashes.md5} onCopy={() => {}} />
                <HashBlock label="SHA-1" value={hashes.sha1} onCopy={() => {}} />
                <HashBlock label="SHA-256" value={hashes.sha256} onCopy={() => {}} />
                <HashBlock label="SHA-512" value={hashes.sha512} onCopy={() => {}} />
              </div>
            </div>
          )}

          {/* Verify Section */}
          {hashes && !loading && (
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold">Verify Hash</h4>
              <p className="text-xs text-muted-foreground">Paste a known hash to compare against the calculated values.</p>
              <div className="flex gap-2">
                <Input
                  value={verifyHash}
                  onChange={(e) => {
                    setVerifyHash(e.target.value)
                    setVerifyResult(null)
                  }}
                  placeholder="Paste expected hash here..."
                  className="font-mono text-sm"
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                />
                <Button onClick={handleVerify} variant="outline" className="shrink-0">
                  Verify
                </Button>
              </div>

              {verifyResult && (
                <div
                  className={`flex items-center gap-2 rounded-lg p-3 ${
                    verifyResult.match
                      ? "border border-emerald-500/30 bg-emerald-500/10"
                      : "border border-red-500/30 bg-red-500/10"
                  }`}
                >
                  {verifyResult.match ? (
                    <>
                      <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        Match! The hash matches <span className="font-mono">{verifyResult.algo}</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <X className="size-5 text-red-600 dark:text-red-400 shrink-0" />
                      <p className="text-sm font-medium text-red-700 dark:text-red-300">
                        Mismatch — the hash does not match any calculated value
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Fingerprint className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Hashes Calculated in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              Your file is read into memory and all hash calculations use the Web Crypto API. Nothing is transmitted to any server.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}