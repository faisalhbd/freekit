"use client"

import { useState, useCallback } from "react"
import QRCode from "qrcode"
import { Link, Download, RefreshCw, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

// ─── Types ───────────────────────────────────────────────────────────────────

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"

type SizePreset = { label: string; size: number; description: string }

const SIZE_PRESETS: Record<string, SizePreset> = {
  "256": { label: "Business Card", size: 256, description: "256 × 256px — Small prints, business cards, email signatures" },
  "512": { label: "Poster", size: 512, description: "512 × 512px — Flyers, brochures, posters" },
  "1024": { label: "Billboard", size: 1024, description: "1024 × 1024px — Large format, billboards, banners" },
}

const ERROR_LEVELS: { value: ErrorCorrectionLevel; label: string; description: string }[] = [
  { value: "L", label: "Low (L)", description: "7% recovery — Smallest QR code" },
  { value: "M", label: "Medium (M)", description: "15% recovery — Recommended default" },
  { value: "Q", label: "Quartile (Q)", description: "25% recovery — Good for decorations" },
  { value: "H", label: "High (H)", description: "30% recovery — Best for logo overlays" },
]

// ─── Main Component ──────────────────────────────────────────────────────────

export function UrlQrGeneratorTool() {
  const [url, setUrl] = useState("")
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [size, setSize] = useState(512)
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>("M")

  const [qrDataUrl, setQrDataUrl] = useState("")
  const [error, setError] = useState("")
  const [urlError, setUrlError] = useState("")

  const validateUrl = useCallback((input: string): boolean => {
    const trimmed = (input || "").trim()
    if (!trimmed) {
      setUrlError("")
      return false
    }
    if (!/^https?:\/\//i.test(trimmed)) {
      setUrlError("URL must start with http:// or https://")
      return false
    }
    setUrlError("")
    return true
  }, [])

  const handleGenerate = useCallback(() => {
    const trimmed = (url || "").trim()
    if (!trimmed) {
      setError("Please enter a URL.")
      setQrDataUrl("")
      return
    }
    if (!validateUrl(trimmed)) {
      setError("Please enter a valid URL starting with http:// or https://")
      setQrDataUrl("")
      return
    }

    QRCode.toDataURL(trimmed, {
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: errorLevel,
    })
      .then((dataUrl) => {
        setQrDataUrl(dataUrl)
        setError("")
      })
      .catch(() => {
        setError("Failed to generate QR code. The URL may be too long.")
        setQrDataUrl("")
      })
  }, [url, size, fgColor, bgColor, errorLevel, validateUrl])

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return
    const a = document.createElement("a")
    a.href = qrDataUrl
    a.download = `url-qr-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success("QR code downloaded!")
  }, [qrDataUrl])

  const handlePreset = useCallback((presetKey: string) => {
    const preset = SIZE_PRESETS[presetKey]
    if (preset) {
      setSize(preset.size)
      toast.success(`Size set to ${preset.label} (${preset.size}px)`)
    }
  }, [])

  const handleReset = useCallback(() => {
    setUrl("")
    setFgColor("#000000")
    setBgColor("#ffffff")
    setSize(512)
    setErrorLevel("M")
    setQrDataUrl("")
    setError("")
    setUrlError("")
  }, [])

  const handleUrlChange = useCallback((value: string) => {
    setUrl(value)
    if ((value || "").trim()) {
      validateUrl(value)
    } else {
      setUrlError("")
    }
  }, [validateUrl])

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Link className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">URL QR Code Generator</h3>
              <p className="text-sm text-muted-foreground">
                Convert any web URL into a scannable QR code
              </p>
            </div>
          </div>

          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="url-input">Website URL</Label>
            <Input
              id="url-input"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              className={urlError ? "border-red-500" : ""}
            />
            {urlError && (
              <p className="text-xs text-red-500">{urlError}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Enter the full URL including https:// or http://
            </p>
          </div>

          {/* Quick Size Presets */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-3 flex items-center gap-2">
              <Zap className="size-4" /> Quick Presets
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(SIZE_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => handlePreset(key)}
                  className={`rounded-lg border p-3 text-left transition-colors hover:bg-accent ${
                    size === preset.size ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <p className="text-sm font-medium">{preset.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{preset.size}px</p>
                </button>
              ))}
            </div>
          </div>

          {/* Customization */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-3">Customization</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="url-fg" className="flex items-center gap-2">
                  Foreground
                  <input
                    id="url-fg"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="size-6 rounded border cursor-pointer"
                  />
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url-bg" className="flex items-center gap-2">
                  Background
                  <input
                    id="url-bg"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="size-6 rounded border cursor-pointer"
                  />
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url-size">Size (px)</Label>
                <Select value={String(size)} onValueChange={(v) => setSize(Number(v))}>
                  <SelectTrigger id="url-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="256">256</SelectItem>
                    <SelectItem value="512">512</SelectItem>
                    <SelectItem value="1024">1024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url-ec">Error Correction</Label>
                <Select value={errorLevel} onValueChange={(v) => setErrorLevel(v as ErrorCorrectionLevel)}>
                  <SelectTrigger id="url-ec">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ERROR_LEVELS.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {ERROR_LEVELS.find((l) => l.value === errorLevel)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <Button onClick={handleGenerate} className="gap-2 flex-1">
              <Link className="size-4" /> Generate QR Code
            </Button>
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RefreshCw className="size-4" /> Reset
            </Button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* QR Code Preview */}
          {qrDataUrl && (
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center gap-4">
                <img
                  src={qrDataUrl}
                  alt="URL QR Code"
                  className="max-w-full rounded-lg"
                  style={{ maxWidth: Math.min(size, 400) }}
                />
                <div className="text-center">
                  <p className="text-xs text-muted-foreground max-w-sm truncate">
                    {(url || "").trim()}
                  </p>
                </div>
                <Button onClick={handleDownload} variant="outline" className="gap-2">
                  <Download className="size-4" /> Download as PNG
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Shield className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Client-Side — No Server Contact</p>
            <p className="text-sm text-muted-foreground">
              QR codes are generated in your browser. Your URLs are never sent to any server.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
