"use client"

import { useState, useCallback } from "react"
import QRCode from "qrcode"
import { Wifi, Download, Eye, EyeOff, RefreshCw, Info, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

// ─── Types ───────────────────────────────────────────────────────────────────

type SecurityType = "WPA" | "WEP" | "nopass"

// ─── Helper: Build WIFI String ───────────────────────────────────────────────

function buildWifiString(
  ssid: string,
  password: string,
  security: SecurityType,
  hidden: boolean
): string {
  const parts: string[] = ["WIFI"]
  parts.push(`T:${security}`)
  parts.push(`S:${ssid}`)
  if (security !== "nopass" && password) {
    parts.push(`P:${password}`)
  }
  if (hidden) {
    parts.push("H:true")
  }
  parts.push("")
  return parts.join(";")
}

function buildSafeDisplayString(
  ssid: string,
  security: SecurityType,
  hidden: boolean
): string {
  const parts: string[] = ["WIFI"]
  parts.push(`T:${security}`)
  parts.push(`S:${ssid}`)
  if (hidden) {
    parts.push("H:true")
  }
  parts.push("P:••••••••")
  parts.push("")
  return parts.join(";")
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function WifiQrGeneratorTool() {
  const [ssid, setSsid] = useState("")
  const [password, setPassword] = useState("")
  const [security, setSecurity] = useState<SecurityType>("WPA")
  const [hidden, setHidden] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [size, setSize] = useState(512)

  const [qrDataUrl, setQrDataUrl] = useState("")
  const [error, setError] = useState("")
  const [wifiString, setWifiString] = useState("")
  const [safeString, setSafeString] = useState("")

  const handleGenerate = useCallback(() => {
    const trimmedSsid = (ssid || "").trim()
    if (!trimmedSsid) {
      setError("Network name (SSID) is required.")
      setQrDataUrl("")
      setWifiString("")
      setSafeString("")
      return
    }

    if (security !== "nopass" && !(password || "").trim()) {
      setError("Password is required for encrypted networks.")
      setQrDataUrl("")
      setWifiString("")
      setSafeString("")
      return
    }

    // Escape special characters in SSID and password
    const escapedSsid = trimmedSsid
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/;/g, "\\;")
      .replace(/:/g, "\\:")
      .replace(/,/g, "\\,")

    const escapedPassword = (password || "")
      .trim()
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/;/g, "\\;")
      .replace(/:/g, "\\:")
      .replace(/,/g, "\\,")

    const fullString = buildWifiString(escapedSsid, escapedPassword, security, hidden)
    const displayString = buildSafeDisplayString(trimmedSsid, security, hidden)

    QRCode.toDataURL(fullString, {
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        setQrDataUrl(url)
        setWifiString(fullString)
        setSafeString(displayString)
        setError("")
      })
      .catch(() => {
        setError("Failed to generate QR code. The data may be too long.")
        setQrDataUrl("")
      })
  }, [ssid, password, security, hidden, fgColor, bgColor, size])

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return
    const a = document.createElement("a")
    a.href = qrDataUrl
    a.download = `wifi-qr-${(ssid || "network").replace(/[^a-zA-Z0-9]/g, "_")}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    toast.success("QR code downloaded!")
  }, [qrDataUrl, ssid])

  const handleReset = useCallback(() => {
    setSsid("")
    setPassword("")
    setSecurity("WPA")
    setHidden(false)
    setQrDataUrl("")
    setError("")
    setWifiString("")
    setSafeString("")
  }, [])

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Wifi className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">WiFi Network Details</h3>
              <p className="text-sm text-muted-foreground">
                Enter your network information to generate a scannable QR code
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
              <Input
                id="wifi-ssid"
                placeholder="e.g., MyHomeWiFi"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="wifi-password">Password</Label>
              <div className="relative">
                <Input
                  id="wifi-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter WiFi password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={security === "nopass"}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {security === "nopass" && (
                <p className="text-xs text-muted-foreground">Password is not required for open networks.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="wifi-security">Security Type</Label>
              <Select value={security} onValueChange={(v) => setSecurity(v as SecurityType)}>
                <SelectTrigger id="wifi-security">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA / WPA2 / WPA3</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">None / Open</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wifi-hidden" className="flex items-center gap-2">
                Hidden Network
                <Switch
                  id="wifi-hidden"
                  checked={hidden}
                  onCheckedChange={setHidden}
                />
              </Label>
              <p className="text-xs text-muted-foreground">
                Enable if the network does not broadcast its name
              </p>
            </div>
          </div>

          {/* Customization */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-3">QR Code Customization</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="wifi-fg" className="flex items-center gap-2">
                  Foreground Color
                  <input
                    id="wifi-fg"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="size-6 rounded border cursor-pointer"
                  />
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wifi-bg" className="flex items-center gap-2">
                  Background Color
                  <input
                    id="wifi-bg"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="size-6 rounded border cursor-pointer"
                  />
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wifi-size">Size</Label>
                <Select value={String(size)} onValueChange={(v) => setSize(Number(v))}>
                  <SelectTrigger id="wifi-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="256">256 × 256px</SelectItem>
                    <SelectItem value="512">512 × 512px</SelectItem>
                    <SelectItem value="1024">1024 × 1024px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <Button onClick={handleGenerate} className="gap-2 flex-1">
              <Wifi className="size-4" /> Generate QR Code
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
                  alt="WiFi QR Code"
                  className="max-w-full rounded-lg"
                  style={{ maxWidth: Math.min(size, 400) }}
                />
                <Button onClick={handleDownload} variant="outline" className="gap-2">
                  <Download className="size-4" /> Download as PNG
                </Button>
              </div>

              {/* WIFI String Display */}
              {safeString && (
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="size-4 text-muted-foreground" />
                    <p className="text-sm font-medium">WIFI String (password hidden)</p>
                  </div>
                  <code className="block text-xs bg-background rounded-md p-3 overflow-x-auto font-mono">
                    {safeString}
                  </code>
                </div>
              )}
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
            <p className="text-sm font-medium">100% Client-Side — Your Password Never Leaves Your Device</p>
            <p className="text-sm text-muted-foreground">
              The QR code is generated entirely in your browser. No network credentials are sent to any server.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
