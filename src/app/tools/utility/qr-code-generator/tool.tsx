"use client"

import { useState, useCallback, useMemo } from "react"
import QRCode from "qrcode"
import {
  Download,
  Copy,
  Check,
  Link,
  Type,
  Wifi,
  Mail,
  Phone,
  MessageSquare,
  RefreshCw,
  Image as ImageIcon,
  FileCode,
  Palette,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Types ───────────────────────────────────────────────────────────────────

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"

type DataTab = "url" | "text" | "wifi" | "email" | "phone" | "sms"

interface QRSettings {
  size: number
  errorCorrection: ErrorCorrectionLevel
  margin: number
  darkColor: string
  lightColor: string
  format: "png" | "svg"
}

// ─── Default Values ──────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: QRSettings = {
  size: 300,
  errorCorrection: "M",
  margin: 2,
  darkColor: "#000000",
  lightColor: "#ffffff",
  format: "png",
}

const ERROR_CORRECTION_OPTIONS: { value: ErrorCorrectionLevel; label: string; desc: string }[] = [
  { value: "L", label: "Low", desc: "7% recovery" },
  { value: "M", label: "Medium", desc: "15% recovery" },
  { value: "Q", label: "Quartile", desc: "25% recovery" },
  { value: "H", label: "High", desc: "30% recovery" },
]

// ─── QR Code Generation ───────────────────────────────────────────────────────

function buildQRData(tab: DataTab, formData: Record<string, string>): string {
  switch (tab) {
    case "url":
      return formData.url || ""
    case "text":
      return formData.text || ""
    case "wifi":
      return `WIFI:T:${formData.wifiEnc || "WPA"};S:${formData.wifiSsid || ""};P:${formData.wifiPass || ""};;`
    case "email":
      return `mailto:${formData.email || ""}?subject=${encodeURIComponent(formData.emailSubject || "")}&body=${encodeURIComponent(formData.emailBody || "")}`
    case "phone":
      return `tel:${formData.phone || ""}`
    case "sms":
      return `smsto:${formData.smsPhone || ""}:${formData.smsMessage || ""}`
    default:
      return ""
  }
}

async function generateQRCode(data: string, settings: QRSettings): Promise<string> {
  if (!data.trim()) return ""

  if (settings.format === "svg") {
    return await QRCode.toString(data, {
      type: "svg",
      width: settings.size,
      margin: settings.margin,
      errorCorrectionLevel: settings.errorCorrection,
      color: {
        dark: settings.darkColor,
        light: settings.lightColor,
      },
    })
  }

  return await QRCode.toDataURL(data, {
    type: "image/png",
    width: settings.size,
    margin: settings.margin,
    errorCorrectionLevel: settings.errorCorrection,
    color: {
      dark: settings.darkColor,
      light: settings.lightColor,
    },
  })
}

function getDataLength(tab: DataTab, formData: Record<string, string>): number {
  return buildQRData(tab, formData).length
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function QRCodeGeneratorTool() {
  // Data tab and form fields
  const [activeTab, setActiveTab] = useState<DataTab>("url")
  const [formData, setFormData] = useState<Record<string, string>>({
    url: "https://freekit.online",
    text: "",
    wifiSsid: "",
    wifiPass: "",
    wifiEnc: "WPA",
    email: "",
    emailSubject: "",
    emailBody: "",
    phone: "",
    smsPhone: "",
    smsMessage: "",
  })

  // QR settings
  const [settings, setSettings] = useState<QRSettings>(DEFAULT_SETTINGS)

  // Generated QR output
  const [qrOutput, setQrOutput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  // UI state
  const [copiedSvg, setCopiedSvg] = useState(false)

  // Computed
  const qrData = useMemo(() => buildQRData(activeTab, formData), [activeTab, formData])
  const dataLength = getDataLength(activeTab, formData)
  const canGenerate = qrData.trim().length > 0
  const isSvg = settings.format === "svg"

  // ─── Generate QR Code ─────────────────────────────────────────────────────

  const handleGenerate = useCallback(async () => {
    if (!canGenerate) return

    setIsGenerating(true)
    setError("")

    try {
      const result = await generateQRCode(qrData, settings)
      setQrOutput(result)
    } catch {
      setError("Failed to generate QR code. The data may be too long.")
      setQrOutput("")
    }

    setIsGenerating(false)
  }, [canGenerate, qrData, settings])

  // Auto-generate when settings or data change (debounced via manual trigger concept)
  // But for better UX, let's auto-generate on initial load
  const initialGenerated = useMemo(() => {
    if (qrData.trim().length > 0) return true
    return false
  }, [qrData])

  // ─── Download Functions ───────────────────────────────────────────────────

  const downloadPNG = useCallback(() => {
    if (!qrOutput || isSvg) return
    const a = document.createElement("a")
    a.href = qrOutput
    a.download = "qrcode.png"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [qrOutput, isSvg])

  const downloadSVG = useCallback(() => {
    if (!qrOutput || !isSvg) return
    const blob = new Blob([qrOutput], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "qrcode.svg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [qrOutput, isSvg])

  const copySvgCode = useCallback(async () => {
    if (!qrOutput || !isSvg) return
    try {
      await navigator.clipboard.writeText(qrOutput)
      setCopiedSvg(true)
      setTimeout(() => setCopiedSvg(false), 2000)
    } catch {
      // fallback
    }
  }, [qrOutput, isSvg])

  // ─── Form Field Helpers ───────────────────────────────────────────────────

  const updateField = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        {/* Main Layout: Two columns on desktop */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Data Input + Settings */}
          <div className="space-y-6">
            {/* Data Input Tabs */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Data Content</h2>
                <span className="text-xs text-muted-foreground">({dataLength} chars)</span>
              </div>

              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as DataTab)}>
                <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6">
                  <TabsTrigger value="url" className="text-xs sm:text-sm gap-1">
                    <Link className="size-3.5" />
                    <span className="hidden sm:inline">URL</span>
                  </TabsTrigger>
                  <TabsTrigger value="text" className="text-xs sm:text-sm gap-1">
                    <Type className="size-3.5" />
                    <span className="hidden sm:inline">Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="wifi" className="text-xs sm:text-sm gap-1">
                    <Wifi className="size-3.5" />
                    <span className="hidden sm:inline">WiFi</span>
                  </TabsTrigger>
                  <TabsTrigger value="email" className="text-xs sm:text-sm gap-1">
                    <Mail className="size-3.5" />
                    <span className="hidden sm:inline">Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="text-xs sm:text-sm gap-1">
                    <Phone className="size-3.5" />
                    <span className="hidden sm:inline">Phone</span>
                  </TabsTrigger>
                  <TabsTrigger value="sms" className="text-xs sm:text-sm gap-1">
                    <MessageSquare className="size-3.5" />
                    <span className="hidden sm:inline">SMS</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-2 mt-3">
                  <Label htmlFor="qr-url" className="text-sm">Website URL</Label>
                  <Input
                    id="qr-url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => updateField("url", e.target.value)}
                    placeholder="https://example.com"
                    className="font-mono text-sm"
                  />
                </TabsContent>

                <TabsContent value="text" className="space-y-2 mt-3">
                  <Label htmlFor="qr-text" className="text-sm">Plain Text</Label>
                  <textarea
                    id="qr-text"
                    value={formData.text}
                    onChange={(e) => updateField("text", e.target.value)}
                    placeholder="Enter any text..."
                    className="flex min-h-[100px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </TabsContent>

                <TabsContent value="wifi" className="space-y-3 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="qr-wifi-ssid" className="text-sm">Network Name (SSID)</Label>
                    <Input
                      id="qr-wifi-ssid"
                      value={formData.wifiSsid}
                      onChange={(e) => updateField("wifiSsid", e.target.value)}
                      placeholder="MyWiFiNetwork"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qr-wifi-pass" className="text-sm">Password</Label>
                    <Input
                      id="qr-wifi-pass"
                      type="password"
                      value={formData.wifiPass}
                      onChange={(e) => updateField("wifiPass", e.target.value)}
                      placeholder="WiFi password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qr-wifi-enc" className="text-sm">Encryption</Label>
                    <Select
                      value={formData.wifiEnc}
                      onValueChange={(v) => updateField("wifiEnc", v)}
                    >
                      <SelectTrigger id="qr-wifi-enc" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WPA">WPA / WPA2</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">None (Open)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="email" className="space-y-3 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="qr-email" className="text-sm">Email Address</Label>
                    <Input
                      id="qr-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="hello@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qr-email-subject" className="text-sm">Subject (optional)</Label>
                    <Input
                      id="qr-email-subject"
                      value={formData.emailSubject}
                      onChange={(e) => updateField("emailSubject", e.target.value)}
                      placeholder="Email subject line"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qr-email-body" className="text-sm">Body (optional)</Label>
                    <Input
                      id="qr-email-body"
                      value={formData.emailBody}
                      onChange={(e) => updateField("emailBody", e.target.value)}
                      placeholder="Email body text"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="space-y-2 mt-3">
                  <Label htmlFor="qr-phone" className="text-sm">Phone Number</Label>
                  <Input
                    id="qr-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+1234567890"
                  />
                </TabsContent>

                <TabsContent value="sms" className="space-y-3 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="qr-sms-phone" className="text-sm">Phone Number</Label>
                    <Input
                      id="qr-sms-phone"
                      type="tel"
                      value={formData.smsPhone}
                      onChange={(e) => updateField("smsPhone", e.target.value)}
                      placeholder="+1234567890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qr-sms-msg" className="text-sm">Message (optional)</Label>
                    <textarea
                      id="qr-sms-msg"
                      value={formData.smsMessage}
                      onChange={(e) => updateField("smsMessage", e.target.value)}
                      placeholder="Your message here..."
                      className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* QR Settings */}
            <Card className="p-6 space-y-5">
              <h3 className="font-semibold flex items-center gap-2">
                <Palette className="size-4 text-primary" />
                Customization
              </h3>

              <Separator />

              {/* Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Image Size</Label>
                  <span className="rounded-lg border border-border bg-muted px-2.5 py-0.5 text-sm font-mono font-medium tabular-nums">
                    {settings.size}px
                  </span>
                </div>
                <Slider
                  value={[settings.size]}
                  onValueChange={([val]) => setSettings((s) => ({ ...s, size: val }))}
                  min={128}
                  max={1024}
                  step={32}
                  className="w-full"
                  aria-label="QR code image size"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>128px</span>
                  <div className="flex gap-2">
                    {[
                      { label: "Web", len: 256 },
                      { label: "Print", len: 512 },
                      { label: "Large", len: 768 },
                      { label: "XL", len: 1024 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => setSettings((s) => ({ ...s, size: preset.len }))}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                          settings.size === preset.len
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <span>1024px</span>
                </div>
              </div>

              <Separator />

              {/* Error Correction */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Error Correction</Label>
                <div className="grid grid-cols-4 gap-2">
                  {ERROR_CORRECTION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSettings((s) => ({ ...s, errorCorrection: opt.value }))}
                      className={`rounded-lg border p-2.5 text-center transition-colors ${
                        settings.errorCorrection === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <span className="block text-sm font-medium">{opt.label}</span>
                      <span className="block text-[10px] text-muted-foreground">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Margin */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Margin (quiet zone)</Label>
                  <span className="rounded-lg border border-border bg-muted px-2.5 py-0.5 text-sm font-mono font-medium tabular-nums">
                    {settings.margin}
                  </span>
                </div>
                <Slider
                  value={[settings.margin]}
                  onValueChange={([val]) => setSettings((s) => ({ ...s, margin: val }))}
                  min={0}
                  max={8}
                  step={1}
                  className="w-full"
                  aria-label="QR code margin"
                />
              </div>

              <Separator />

              {/* Colors */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Colors</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="qr-dark-color" className="text-xs text-muted-foreground">
                      Foreground (dark)
                    </Label>
                    <div className="flex items-center gap-2">
                      <input
                        id="qr-dark-color"
                        type="color"
                        value={settings.darkColor}
                        onChange={(e) => setSettings((s) => ({ ...s, darkColor: e.target.value }))}
                        className="h-9 w-9 cursor-pointer rounded-lg border border-border"
                      />
                      <Input
                        value={settings.darkColor}
                        onChange={(e) => setSettings((s) => ({ ...s, darkColor: e.target.value }))}
                        className="font-mono text-sm h-9"
                        maxLength={7}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="qr-light-color" className="text-xs text-muted-foreground">
                      Background (light)
                    </Label>
                    <div className="flex items-center gap-2">
                      <input
                        id="qr-light-color"
                        type="color"
                        value={settings.lightColor}
                        onChange={(e) => setSettings((s) => ({ ...s, lightColor: e.target.value }))}
                        className="h-9 w-9 cursor-pointer rounded-lg border border-border"
                      />
                      <Input
                        value={settings.lightColor}
                        onChange={(e) => setSettings((s) => ({ ...s, lightColor: e.target.value }))}
                        className="font-mono text-sm h-9"
                        maxLength={7}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Output Format */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Output Format</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSettings((s) => ({ ...s, format: "png" }))}
                    className={`flex items-center justify-center gap-2 rounded-lg border p-3 transition-colors ${
                      settings.format === "png"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <ImageIcon className="size-4" />
                    <span className="text-sm font-medium">PNG</span>
                    <span className="text-[10px] text-muted-foreground">Raster</span>
                  </button>
                  <button
                    onClick={() => setSettings((s) => ({ ...s, format: "svg" }))}
                    className={`flex items-center justify-center gap-2 rounded-lg border p-3 transition-colors ${
                      settings.format === "svg"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <FileCode className="size-4" />
                    <span className="text-sm font-medium">SVG</span>
                    <span className="text-[10px] text-muted-foreground">Vector</span>
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Preview + Actions */}
          <div className="space-y-6">
            {/* Generate Button */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="size-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="size-4 mr-2" />
                  Generate QR Code
                </>
              )}
            </Button>

            {/* QR Code Preview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">QR Code Preview</h3>
                {qrOutput && (
                  <span className="text-xs text-muted-foreground">
                    {settings.size}×{settings.size}px • {settings.format.toUpperCase()}
                  </span>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/5 p-3 mb-4">
                  <Info className="size-4 text-destructive shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-6 min-h-[300px]">
                {qrOutput ? (
                  isSvg ? (
                    <div
                      className="flex items-center justify-center [&_svg]:max-w-full [&_svg]:h-auto"
                      style={{ width: Math.min(settings.size, 400), height: Math.min(settings.size, 400) }}
                      dangerouslySetInnerHTML={{ __html: qrOutput }}
                    />
                  ) : (
                    <img
                      src={qrOutput}
                      alt="Generated QR Code"
                      className="max-w-full h-auto rounded-lg"
                      style={{ maxWidth: Math.min(settings.size, 400) }}
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <div className="rounded-full bg-muted p-4">
                      <Link className="size-8" />
                    </div>
                    <p className="text-sm">Enter data and click Generate</p>
                  </div>
                )}
              </div>

              {/* Data Preview */}
              {qrData && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-1">Encoded data:</p>
                  <p className="truncate font-mono text-xs text-muted-foreground bg-muted/50 rounded-md px-3 py-2">
                    {qrData}
                  </p>
                </div>
              )}
            </Card>

            {/* Download Actions */}
            {qrOutput && (
              <Card className="p-6 space-y-3">
                <h3 className="font-semibold">Download</h3>
                <div className="grid grid-cols-2 gap-3">
                  {isSvg ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={downloadSVG}
                      >
                        <Download className="size-4 mr-2" />
                        Download SVG
                      </Button>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={copySvgCode}
                          >
                            {copiedSvg ? (
                              <Check className="size-4 mr-2 text-emerald-600" />
                            ) : (
                              <Copy className="size-4 mr-2" />
                            )}
                            Copy SVG Code
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{copiedSvg ? "Copied!" : "Copy SVG markup to clipboard"}</TooltipContent>
                      </Tooltip>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full col-span-2"
                      onClick={downloadPNG}
                    >
                      <Download className="size-4 mr-2" />
                      Download PNG ({settings.size}×{settings.size})
                    </Button>
                  )}
                </div>
              </Card>
            )}

            {/* Security Info */}
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
                  <Check className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">100% Private</p>
                  <p className="text-xs text-muted-foreground">
                    All QR codes are generated in your browser. Your data (URLs, WiFi passwords, email addresses)
                    is never sent to any server. When you close this tab, all data is gone.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
