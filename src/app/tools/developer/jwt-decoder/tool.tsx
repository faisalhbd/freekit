"use client"

import { useState, useCallback, useEffect, useRef, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  KeyRound,
  Copy,
  RotateCcw,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Check,
  Eye,
} from "lucide-react"

// --- Types ---

interface DecodedJWT {
  header: Record<string, unknown>
  payload: Record<string, unknown>
  signature: string
}

interface JWTError {
  message: string
}

// --- Special Claims Reference ---

const SPECIAL_CLAIMS: Record<string, string> = {
  iss: "Issuer — the principal that issued the token",
  sub: "Subject — identifies the subject (usually user ID)",
  aud: "Audience — identifies the intended recipients",
  exp: "Expiration Time — Unix timestamp after which the token is invalid",
  nbf: "Not Before — Unix timestamp before which the token is not accepted",
  iat: "Issued At — Unix timestamp when the token was created",
  jti: "JWT ID — unique identifier for the token",
}

// --- Sample JWT ---

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjIsIm5iZiI6MTUxNjIzOTAyMiwiaXNzIjoiYXV0aC5mcmVla2l0Lm9ubGluZSIsImF1ZCI6ImFwaS5mcmVla2l0Lm9ubGluZSIsImp0aSI6ImFiYzEyMy1kZWY0NTYtZ2hpNzg5In0.4Adcj3UFYzP6a2bMz9q3p6Q9rT3vX1wK5L8nM0oP2sE"

// --- Helpers ---

function base64UrlDecode(str: string): string {
  let s = (str || "").replace(/-/g, "+").replace(/_/g, "/")
  const pad = s.length % 4
  if (pad === 2) s += "=="
  else if (pad === 3) s += "="
  return decodeURIComponent(
    atob(s)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  )
}

function decodeJWT(token: string): DecodedJWT {
  const parts = (token || "").trim().split(".")
  if (parts.length !== 3) {
    throw new Error(
      `Invalid JWT structure — expected 3 parts (header.payload.signature) but found ${parts.length} part${parts.length === 1 ? "" : "s"}. Make sure you pasted the complete token.`
    )
  }

  let header: Record<string, unknown>
  let payload: Record<string, unknown>

  try {
    header = JSON.parse(base64UrlDecode(parts[0]))
  } catch {
    throw new Error(
      "Invalid JWT header — the first part could not be decoded as valid Base64URL or JSON. Check that the token is not corrupted."
    )
  }

  try {
    payload = JSON.parse(base64UrlDecode(parts[1]))
  } catch {
    throw new Error(
      "Invalid JWT payload — the second part could not be decoded as valid Base64URL or JSON. Check that the token is not corrupted."
    )
  }

  return {
    header,
    payload,
    signature: parts[2],
  }
}

function formatTimestamp(ts: unknown): string | null {
  if (typeof ts !== "number") return null
  try {
    return new Date(ts * 1000).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    })
  } catch {
    return null
  }
}

function getTokenStatus(exp: unknown): { expired: boolean; date: string | null } {
  if (typeof exp !== "number") return { expired: false, date: null }
  const now = Math.floor(Date.now() / 1000)
  return {
    expired: now > exp,
    date: formatTimestamp(exp),
  }
}

// --- Syntax-Highlighted JSON ---

function JsonHighlight({ json }: { json: string }) {
  const highlighted = useMemo(() => {
    return (json || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /"([^"]*)"(\s*:)/g,
        '<span class="text-purple-700 dark:text-purple-400">"$1"</span>$2'
      )
      .replace(
        /:\s*"([^"]*)"/g,
        ': <span class="text-emerald-700 dark:text-emerald-400">"$1"</span>'
      )
      .replace(
        /:\s*(\d+\.?\d*)/g,
        ': <span class="text-amber-700 dark:text-amber-400">$1</span>'
      )
      .replace(
      /:\s*(true|false)/g,
      ': <span class="text-blue-700 dark:text-blue-400">$1</span>'
      )
    .replace(
      /:\s*(null)/g,
      ': <span class="text-muted-foreground">$1</span>'
    )
  }, [json])
  return (
    <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-all">
      <code dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  )
}

// --- Claim Badge ---

function ClaimBadge({ claim }: { claim: string }) {
  const info = SPECIAL_CLAIMS[claim]
  if (!info) return null
  return (
    <Badge
      variant="outline"
      title={info}
      className="ml-2 text-xs cursor-help shrink-0"
    >
      {claim}
    </Badge>
  )
}

// --- Component ---

export function JwtDecoderTool() {
  const [input, setInput] = useState("")
  const [autoDecode, setAutoDecode] = useState(false)
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null)
  const [error, setError] = useState<JWTError | null>(null)
  const [copiedHeader, setCopiedHeader] = useState(false)
  const [copiedPayload, setCopiedPayload] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const doDecode = useCallback((value: string) => {
    const trimmed = (value || "").trim()
    if (trimmed.length === 0) {
      setDecoded(null)
      setError(null)
      return
    }
    try {
      const result = decodeJWT(trimmed)
      setDecoded(result)
      setError(null)
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Unknown error") : "Unknown error"
      setDecoded(null)
      setError({ message: msg })
    }
  }, [])

  useEffect(() => {
    if (!autoDecode) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      doDecode(input)
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [input, autoDecode, doDecode])

  const handleDecode = useCallback(() => {
    doDecode(input)
  }, [input, doDecode])

  const handleClear = useCallback(() => {
    setInput("")
    setDecoded(null)
    setError(null)
    setCopiedHeader(false)
    setCopiedPayload(false)
  }, [])

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_JWT)
    setDecoded(null)
    setError(null)
    setCopiedHeader(false)
    setCopiedPayload(false)
  }, [])

  const handleInputChange = useCallback(
    (v: string) => {
      setInput(v)
      if (!autoDecode) {
        setDecoded(null)
        setError(null)
      }
      setCopiedHeader(false)
      setCopiedPayload(false)
    },
    [autoDecode]
  )

  const copyToClipboard = useCallback(
    async (text: string, setCopied: (v: boolean) => void) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // ignore
      }
    },
    []
  )

  const headerJson = useMemo(
    () => (decoded ? JSON.stringify(decoded.header, null, 2) : ""),
    [decoded]
  )
  const payloadJson = useMemo(
    () => (decoded ? JSON.stringify(decoded.payload, null, 2) : ""),
    [decoded]
  )

  const tokenStatus = useMemo(() => {
    if (!decoded) return null
    return getTokenStatus(decoded.payload.exp)
  }, [decoded])

  const issuedAt = useMemo(() => {
    if (!decoded) return null
    return formatTimestamp(decoded.payload.iat)
  }, [decoded])

  return (
    <div className="space-y-6">
      {/* Input Area */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="jwt-input" className="text-base font-semibold">
              Paste Your JWT Token
            </Label>
            <Badge variant="secondary" className="tabular-nums text-xs">
              {(input || "").length.toLocaleString()} chars
            </Badge>
          </div>
          <Textarea
            id="jwt-input"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-[120px] sm:min-h-[140px] resize-y font-mono text-sm leading-relaxed"
            spellCheck={false}
          />
        </CardContent>
      </Card>

      {/* Decode Button (primary, centered) */}
      <div className="flex justify-center">
        <Button
          onClick={handleDecode}
          size="lg"
          className="gap-2 px-8 text-base"
        >
          <KeyRound className="size-5" />
          Decode JWT
        </Button>
      </div>

      {/* Action buttons row */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          onClick={handleClear}
          variant="outline"
          size="sm"
          disabled={(input || "").trim().length === 0}
          className="gap-1.5"
        >
          <RotateCcw className="size-4" />
          Clear
        </Button>
        <Button
          onClick={handleLoadSample}
          variant="ghost"
          size="sm"
          className="gap-1.5"
        >
          <KeyRound className="size-4 text-primary" />
          Load Sample JWT
        </Button>
        <Separator orientation="vertical" className="hidden sm:block h-6" />
        <div className="flex items-center gap-2">
          <Switch
            id="auto-decode"
            checked={autoDecode}
            onCheckedChange={setAutoDecode}
          />
          <Label
            htmlFor="auto-decode"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Auto-decode
          </Label>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
          <CardContent className="p-4 sm:p-6 space-y-2">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 dark:text-red-300">
                  Invalid JWT Token
                </p>
                <p className="mt-1 text-sm text-red-700/80 dark:text-red-400/80">
                  {error.message}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Decoded Results */}
      {decoded && (
        <div className="space-y-6">
          {/* Token Status Banner */}
          {(tokenStatus || issuedAt) && (
            <Card className="border-border">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  {tokenStatus && tokenStatus.date && (
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 shrink-0" />
                      {tokenStatus.expired ? (
                        <Badge
                          variant="destructive"
                          className="gap-1 text-sm"
                        >
                          <AlertTriangle className="size-3.5" />
                          Expired
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="gap-1 text-sm border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400"
                        >
                          <CheckCircle className="size-3.5" />
                          Valid until {tokenStatus.date}
                        </Badge>
                      )}
                    </div>
                  )}
                  {issuedAt && (
                    <div className="flex items-center gap-2">
                      <Eye className="size-4 shrink-0 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Issued at {issuedAt}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* HEADER Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <KeyRound className="size-4 text-primary" />
                  HEADER
                </CardTitle>
                <Button
                  onClick={() =>
                    copyToClipboard(headerJson, setCopiedHeader)
                  }
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs"
                >
                  {copiedHeader ? (
                    <Check className="size-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copiedHeader ? "Copied" : "Copy"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="rounded-lg bg-muted/50 border border-border p-4 overflow-x-auto max-h-96 overflow-y-auto">
                <JsonHighlight json={headerJson} />
              </div>
            </CardContent>
          </Card>

          {/* PAYLOAD Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Eye className="size-4 text-primary" />
                  PAYLOAD
                </CardTitle>
                <Button
                  onClick={() =>
                    copyToClipboard(payloadJson, setCopiedPayload)
                  }
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs"
                >
                  {copiedPayload ? (
                    <Check className="size-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copiedPayload ? "Copied" : "Copy"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {/* Special Claims Badges */}
              {Object.keys(decoded.payload).filter((k) => SPECIAL_CLAIMS[k]).length >
                0 && (
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(decoded.payload)
                    .filter((k) => SPECIAL_CLAIMS[k])
                    .map((claim) => (
                      <ClaimBadge key={claim} claim={claim} />
                    ))}
                </div>
              )}
              <div className="rounded-lg bg-muted/50 border border-border p-4 overflow-x-auto max-h-96 overflow-y-auto">
                <JsonHighlight json={payloadJson} />
              </div>
            </CardContent>
          </Card>

          {/* SIGNATURE Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Shield className="size-4 text-primary" />
                SIGNATURE
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="rounded-lg bg-muted/50 border border-border p-4 overflow-x-auto">
                <p className="text-sm font-mono break-all text-muted-foreground">
                  {decoded.signature}
                </p>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 p-3">
                <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  This tool displays the signature but does not verify it.
                  Signature verification requires the secret key (for HMAC) or
                  public key (for RSA/ECDSA) used when the token was signed.
                  Always verify signatures on your server before trusting token
                  claims.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Claim Reference Table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                JWT Claim Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-semibold text-muted-foreground">
                        Claim
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-muted-foreground">
                        Full Name
                      </th>
                      <th className="text-left py-2 font-semibold text-muted-foreground">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(SPECIAL_CLAIMS).map(([claim, desc]) => {
                      const parts = desc.split(" — ")
                      const fullName = (parts[0] || "").trim()
                      const description = (parts[1] || "").trim()
                      const isPresent = claim in decoded.payload
                      return (
                        <tr
                          key={claim}
                          className="border-b border-border/50 last:border-0"
                        >
                          <td className="py-2.5 pr-4">
                            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                              {claim}
                            </code>
                            {isPresent && (
                              <Badge
                                variant="outline"
                                className="ml-1.5 text-[10px] border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400"
                              >
                                present
                              </Badge>
                            )}
                          </td>
                          <td className="py-2.5 pr-4 text-muted-foreground">
                            {fullName}
                          </td>
                          <td className="py-2.5 text-muted-foreground">
                            {description}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  100% Private — Your Tokens Never Leave Your Browser
                </p>
                <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
                  All JWT decoding is performed entirely in your browser using
                  client-side JavaScript. No tokens or decoded data are sent to
                  any server, stored, or tracked.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
