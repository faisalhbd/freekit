"use client"

import { useState, useCallback, useRef } from "react"
import {
  Download,
  RotateCcw,
  Upload,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Globe,
  CircleOff,
  Palette,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Types ──────────────────────────────────────────────────────────────────

type DeviceType = "iphone" | "samsung" | "ipad" | "laptop" | "desktop" | "browser"
type FrameColor = "black" | "white" | "space-gray" | "rose-gold"

type DeviceOption = {
  value: DeviceType
  label: string
  icon: React.ComponentType<{ className?: string }>
  screenW: number
  screenH: number
  aspectRatio: string
}

// ─── Device Definitions ─────────────────────────────────────────────────────

const DEVICES: Record<DeviceType, DeviceOption> = {
  iphone: {
    value: "iphone",
    label: "iPhone",
    icon: Smartphone,
    screenW: 375,
    screenH: 812,
    aspectRatio: "375 / 812",
  },
  samsung: {
    value: "samsung",
    label: "Samsung Galaxy",
    icon: Smartphone,
    screenW: 360,
    screenH: 800,
    aspectRatio: "360 / 800",
  },
  ipad: {
    value: "ipad",
    label: "iPad",
    icon: Tablet,
    screenW: 810,
    screenH: 1080,
    aspectRatio: "810 / 1080",
  },
  laptop: {
    value: "laptop",
    label: "Laptop",
    icon: Laptop,
    screenW: 960,
    screenH: 600,
    aspectRatio: "960 / 600",
  },
  desktop: {
    value: "desktop",
    label: "Desktop Monitor",
    icon: Monitor,
    screenW: 1200,
    screenH: 750,
    aspectRatio: "1200 / 750",
  },
  browser: {
    value: "browser",
    label: "Browser Window",
    icon: Globe,
    screenW: 1000,
    screenH: 650,
    aspectRatio: "1000 / 650",
  },
}

const FRAME_COLORS: Record<FrameColor, { label: string; hex: string; border: string; bg: string }> = {
  black: { label: "Black", hex: "#1a1a1a", border: "#0a0a0a", bg: "#2a2a2a" },
  white: { label: "White", hex: "#f5f5f5", border: "#d4d4d4", bg: "#ffffff" },
  "space-gray": { label: "Space Gray", hex: "#8e8e93", border: "#636366", bg: "#a8a8ad" },
  "rose-gold": { label: "Rose Gold", hex: "#e8c4b8", border: "#d4a898", bg: "#f0d4c8" },
}

// ─── Component ──────────────────────────────────────────────────────────────

export function DeviceMockupGeneratorTool() {
  const [device, setDevice] = useState<DeviceType>("iphone")
  const [frameColor, setFrameColor] = useState<FrameColor>("black")
  const [shadowEnabled, setShadowEnabled] = useState(true)
  const [bgColor, setBgColor] = useState("#e5e7eb")
  const [bgTransparent, setBgTransparent] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null)
  const [imageSrc, setImageSrc] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const deviceDef = DEVICES[device]
  const frameColorDef = FRAME_COLORS[frameColor]

  // ── Upload ───────────────────────────────────────────────────────────
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      setImageSrc(result)
      const img = new Image()
      img.onload = () => setUploadedImage(img)
      img.src = result
    }
    reader.readAsDataURL(file)
  }, [])

  const clearImage = useCallback(() => {
    setUploadedImage(null)
    setImageSrc("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  // ── Reset ───────────────────────────────────────────────────────────
  const resetToDefault = useCallback(() => {
    setDevice("iphone")
    setFrameColor("black")
    setShadowEnabled(true)
    setBgColor("#e5e7eb")
    setBgTransparent(false)
    setUploadedImage(null)
    setImageSrc("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  // ── Download via Canvas ─────────────────────────────────────────────
  const handleDownload = useCallback(() => {
    if (!uploadedImage) return

    const dev = DEVICES[device]
    const fc = FRAME_COLORS[frameColor]
    const scale = 2 // export at 2x for crisp output

    let canvasW: number, canvasH: number
    let drawScreen: (ctx: CanvasRenderingContext2D, img: HTMLImageElement, s: number) => void

    const isPhone = device === "iphone" || device === "samsung"
    const isTablet = device === "ipad"
    const isLaptop = device === "laptop"
    const isDesktop = device === "desktop"
    const isBrowser = device === "browser"

    if (isPhone) {
      const screenW = dev.screenW * scale
      const screenH = dev.screenH * scale
      const bezel = 14 * scale
      canvasW = screenW + bezel * 2
      canvasH = screenH + bezel * 2 + 28 * scale // extra for notch area top + home bar bottom
      drawScreen = (ctx, img, _s) => {
        // Frame
        ctx.fillStyle = fc.hex
        roundRect(ctx, 0, 0, canvasW, canvasH, 40 * scale)
        ctx.fill()
        // Inner bezel
        ctx.fillStyle = fc.border
        roundRect(ctx, bezel - 4 * scale, bezel - 4 * scale, screenW + 8 * scale, screenH + 8 * scale, 28 * scale)
        ctx.fill()
        // Screen background
        ctx.fillStyle = "#000000"
        ctx.fillRect(bezel, bezel, screenW, screenH)
        // Image
        const imgRatio = img.width / img.height
        const screenRatio = screenW / screenH
        let sx = 0, sy = 0, sw = img.width, sh = img.height
        if (imgRatio > screenRatio) {
          sw = img.height * screenRatio
          sx = (img.width - sw) / 2
        } else {
          sh = img.width / screenRatio
          sy = (img.height - sh) / 2
        }
        ctx.drawImage(img, sx, sy, sw, sh, bezel, bezel, screenW, screenH)
        // Notch / Dynamic Island
        const notchW = isPhone ? 120 * scale : 90 * scale
        const notchH = isPhone ? 28 * scale : 24 * scale
        const notchX = (canvasW - notchW) / 2
        const notchY = bezel - 2 * scale
        ctx.fillStyle = fc.hex
        roundRect(ctx, notchX, notchY, notchW, notchH, 14 * scale)
        ctx.fill()
        // Camera dot
        ctx.beginPath()
        ctx.arc(canvasW / 2 + notchW * 0.25, notchY + notchH / 2, 5 * scale, 0, Math.PI * 2)
        ctx.fillStyle = "#1a1a2e"
        ctx.fill()
        // Home indicator
        ctx.beginPath()
        const barW = 100 * scale
        const barH = 4 * scale
        ctx.fillStyle = fc.border
        roundRect(ctx, (canvasW - barW) / 2, canvasH - 16 * scale, barW, barH, 2 * scale)
        ctx.fill()
      }
    } else if (isTablet) {
      const screenW = dev.screenW * scale
      const screenH = dev.screenH * scale
      const bezel = 20 * scale
      canvasW = screenW + bezel * 2
      canvasH = screenH + bezel * 2
      drawScreen = (ctx, img, _s) => {
        ctx.fillStyle = fc.hex
        roundRect(ctx, 0, 0, canvasW, canvasH, 32 * scale)
        ctx.fill()
        ctx.fillStyle = fc.border
        roundRect(ctx, bezel - 3 * scale, bezel - 3 * scale, screenW + 6 * scale, screenH + 6 * scale, 20 * scale)
        ctx.fill()
        ctx.fillStyle = "#000000"
        ctx.fillRect(bezel, bezel, screenW, screenH)
        // Image
        const imgRatio = img.width / img.height
        const screenRatio = screenW / screenH
        let sx = 0, sy = 0, sw = img.width, sh = img.height
        if (imgRatio > screenRatio) { sw = img.height * screenRatio; sx = (img.width - sw) / 2 }
        else { sh = img.width / screenRatio; sy = (img.height - sh) / 2 }
        ctx.drawImage(img, sx, sy, sw, sh, bezel, bezel, screenW, screenH)
        // Camera dot at top center
        ctx.beginPath()
        ctx.arc(canvasW / 2, bezel / 2, 5 * scale, 0, Math.PI * 2)
        ctx.fillStyle = fc.border
        ctx.fill()
      }
    } else if (isLaptop) {
      const screenW = dev.screenW * scale
      const screenH = dev.screenH * scale
      const bezel = 12 * scale
      const keyboardH = 80 * scale
      canvasW = screenW + bezel * 2 + 40 * scale
      canvasH = screenH + bezel * 2 + keyboardH
      drawScreen = (ctx, img, _s) => {
        // Screen lid
        ctx.fillStyle = fc.hex
        roundRect(ctx, 0, 0, canvasW, screenH + bezel * 2, 12 * scale)
        ctx.fill()
        // Screen bezel
        ctx.fillStyle = "#0a0a0a"
        roundRect(ctx, bezel, bezel, screenW, screenH, 4 * scale)
        ctx.fill()
        // Image on screen
        const imgRatio = img.width / img.height
        const screenRatio = screenW / screenH
        let sx = 0, sy = 0, sw = img.width, sh = img.height
        if (imgRatio > screenRatio) { sw = img.height * screenRatio; sx = (img.width - sw) / 2 }
        else { sh = img.width / screenRatio; sy = (img.height - sh) / 2 }
        ctx.drawImage(img, sx, sy, sw, sh, bezel, bezel, screenW, screenH)
        // Camera dot
        ctx.beginPath()
        ctx.arc(canvasW / 2, bezel / 2, 3 * scale, 0, Math.PI * 2)
        ctx.fillStyle = "#333"
        ctx.fill()
        // Keyboard base
        const baseY = screenH + bezel * 2
        ctx.fillStyle = fc.bg
        roundRect(ctx, -10 * scale, baseY, canvasW + 20 * scale, keyboardH, [0, 0, 8 * scale, 8 * scale] as unknown as number)
        ctx.fill()
        ctx.fillStyle = fc.border
        roundRect(ctx, -10 * scale, baseY, canvasW + 20 * scale, 6 * scale, [0, 0, 0, 0] as unknown as number)
        ctx.fill()
        // Trackpad
        ctx.fillStyle = fc.border
        roundRect(ctx, canvasW / 2 - 80 * scale, baseY + 30 * scale, 160 * scale, 36 * scale, 6 * scale)
        ctx.fill()
      }
    } else if (isDesktop) {
      const screenW = dev.screenW * scale
      const screenH = dev.screenH * scale
      const bezel = 16 * scale
      const standH = 120 * scale
      const standW = 100 * scale
      canvasW = screenW + bezel * 2
      canvasH = screenH + bezel * 2 + standH + 20 * scale
      drawScreen = (ctx, img, _s) => {
        // Monitor body
        ctx.fillStyle = fc.hex
        roundRect(ctx, 0, 0, canvasW, screenH + bezel * 2, 12 * scale)
        ctx.fill()
        // Screen bezel
        ctx.fillStyle = "#0a0a0a"
        ctx.fillRect(bezel, bezel, screenW, screenH)
        // Image
        const imgRatio = img.width / img.height
        const screenRatio = screenW / screenH
        let sx = 0, sy = 0, sw = img.width, sh = img.height
        if (imgRatio > screenRatio) { sw = img.height * screenRatio; sx = (img.width - sw) / 2 }
        else { sh = img.width / screenRatio; sy = (img.height - sh) / 2 }
        ctx.drawImage(img, sx, sy, sw, sh, bezel, bezel, screenW, screenH)
        // Chin logo area
        ctx.fillStyle = fc.bg
        roundRect(ctx, canvasW / 2 - 20 * scale, screenH + bezel * 2 - 12 * scale, 40 * scale, 4 * scale, 2 * scale)
        ctx.fill()
        // Stand neck
        const neckW = 20 * scale
        ctx.fillStyle = fc.hex
        ctx.fillRect(canvasW / 2 - neckW / 2, screenH + bezel * 2, neckW, standH - 30 * scale)
        // Stand base
        ctx.fillStyle = fc.hex
        ctx.beginPath()
        ctx.ellipse(canvasW / 2, screenH + bezel * 2 + standH - 10 * scale, standW, 16 * scale, 0, 0, Math.PI * 2)
        ctx.fill()
      }
    } else {
      // browser
      const screenW = dev.screenW * scale
      const screenH = dev.screenH * scale
      const titleBarH = 36 * scale
      const addrBarH = 28 * scale
      const borderW = 2 * scale
      canvasW = screenW + borderW * 2
      canvasH = screenH + titleBarH + addrBarH + borderW * 2
      drawScreen = (ctx, img, _s) => {
        // Window frame
        ctx.fillStyle = fc.hex
        roundRect(ctx, 0, 0, canvasW, canvasH, 10 * scale)
        ctx.fill()
        // Title bar background
        ctx.fillStyle = fc.bg
        roundRect(ctx, borderW, borderW, canvasW - borderW * 2, titleBarH, [8 * scale, 8 * scale, 0, 0] as unknown as number)
        ctx.fill()
        // Traffic lights
        const dotR = 5 * scale
        const dotY = borderW + titleBarH / 2
        ctx.fillStyle = "#ff5f57"
        ctx.beginPath(); ctx.arc(16 * scale, dotY, dotR, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "#febc2e"
        ctx.beginPath(); ctx.arc(32 * scale, dotY, dotR, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = "#28c840"
        ctx.beginPath(); ctx.arc(48 * scale, dotY, dotR, 0, Math.PI * 2); ctx.fill()
        // Title text
        ctx.fillStyle = frameColor === "black" ? "#999" : "#666"
        ctx.font = `${12 * scale}px -apple-system, sans-serif`
        ctx.textAlign = "center"
        ctx.fillText("My Website", canvasW / 2, dotY + 4 * scale)
        // Address bar
        ctx.fillStyle = frameColor === "black" ? "#2a2a2a" : "#e5e5e5"
        ctx.fillRect(borderW, borderW + titleBarH, canvasW - borderW * 2, addrBarH)
        ctx.fillStyle = frameColor === "black" ? "#888" : "#999"
        ctx.font = `${11 * scale}px -apple-system, sans-serif`
        ctx.textAlign = "left"
        ctx.fillText("🔒 https://mywebsite.com", 14 * scale, borderW + titleBarH + addrBarH / 2 + 4 * scale)
        // Screen area
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(borderW, borderW + titleBarH + addrBarH, screenW, screenH)
        // Image
        const imgRatio = img.width / img.height
        const screenRatio = screenW / screenH
        let sx = 0, sy = 0, sw = img.width, sh = img.height
        if (imgRatio > screenRatio) { sw = img.height * screenRatio; sx = (img.width - sw) / 2 }
        else { sh = img.width / screenRatio; sy = (img.height - sh) / 2 }
        ctx.drawImage(img, sx, sy, sw, sh, borderW, borderW + titleBarH + addrBarH, screenW, screenH)
      }
    }

    const canvas = document.createElement("canvas")
    const padding = 60 * scale
    canvas.width = canvasW + padding * 2
    canvas.height = canvasH + padding * 2
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Background
    if (!bgTransparent) {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Shadow
    if (shadowEnabled) {
      ctx.shadowColor = "rgba(0,0,0,0.3)"
      ctx.shadowBlur = 40 * scale
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 10 * scale
    }

    // Draw device
    ctx.save()
    ctx.translate(padding, padding)
    drawScreen(ctx, uploadedImage, scale)
    ctx.restore()

    // Download
    const link = document.createElement("a")
    link.download = `device-mockup-${device}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [uploadedImage, device, frameColor, shadowEnabled, bgColor, bgTransparent])

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* ── Preview Area ── */}
        <Card className="overflow-hidden p-4">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              <Eye className="size-3.5" />
              Preview
            </Label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px]">
                {deviceDef.label}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {deviceDef.screenW}×{deviceDef.screenH} screen
              </Badge>
            </div>
          </div>
          <div
            className="w-full flex items-center justify-center rounded-lg overflow-hidden p-8"
            style={{
              background: bgTransparent ? "repeating-conic-gradient(#d4d4d4 0% 25%, #ffffff 0% 50%) 50% / 20px 20px" : bgColor,
              minHeight: 320,
            }}
          >
            <DevicePreview
              device={device}
              frameColor={frameColorDef}
              imageSrc={imageSrc}
              shadowEnabled={shadowEnabled}
            />
          </div>
        </Card>

        {/* ── Controls ── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Device & Frame */}
          <Card className="p-6 space-y-5">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Monitor className="size-4" />
              Device Selection
            </h3>

            {/* Image Upload */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Upload Screenshot / Image</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-xs"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="size-3.5" />
                  {uploadedImage ? "Change Image" : "Upload Image"}
                </Button>
                {uploadedImage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-3"
                    onClick={clearImage}
                  >
                    <CircleOff className="size-3.5 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                aria-label="Upload screenshot"
              />
            </div>

            <Separator />

            {/* Device Type Grid */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Device Frame</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.values(DEVICES) as DeviceOption[]).map((d) => (
                  <Button
                    key={d.value}
                    variant={device === d.value ? "default" : "outline"}
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => setDevice(d.value)}
                  >
                    <d.icon className="size-3.5" />
                    {d.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Frame Color */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Frame Color</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.entries(FRAME_COLORS) as [FrameColor, typeof FRAME_COLORS[FrameColor]][]).map(
                  ([key, val]) => (
                    <Button
                      key={key}
                      variant={frameColor === key ? "default" : "outline"}
                      size="sm"
                      className="gap-1.5 text-xs"
                      onClick={() => setFrameColor(key)}
                    >
                      <span
                        className="size-3.5 rounded-full border border-border shrink-0"
                        style={{ backgroundColor: val.hex }}
                      />
                      {val.label}
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* Shadow Toggle */}
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Screen Shadow</Label>
              <Button
                variant={shadowEnabled ? "default" : "outline"}
                size="sm"
                className="text-xs h-7 px-3"
                onClick={() => setShadowEnabled(!shadowEnabled)}
              >
                {shadowEnabled ? "On" : "Off"}
              </Button>
            </div>
          </Card>

          {/* Right: Background & Actions */}
          <Card className="p-6 space-y-5">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Palette className="size-4" />
              Background
            </h3>

            {/* Background Color */}
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Transparent Background</Label>
              <Button
                variant={bgTransparent ? "default" : "outline"}
                size="sm"
                className="text-xs h-7 px-3"
                onClick={() => setBgTransparent(!bgTransparent)}
              >
                {bgTransparent ? "On" : "Off"}
              </Button>
            </div>

            {!bgTransparent && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Background Color</Label>
                <div className="flex items-center gap-3">
                  <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="absolute inset-0 size-full cursor-pointer opacity-0"
                      aria-label="Background color"
                    />
                    <div className="size-full rounded-md" style={{ backgroundColor: bgColor }} />
                  </div>
                  <Input
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-28 font-mono text-xs"
                    maxLength={7}
                  />
                </div>
              </div>
            )}

            <Separator />

            {/* Device Info */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Device Specifications</Label>
              <div className="rounded-lg border border-border bg-muted/50 p-3 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Device</span>
                  <span className="text-foreground font-medium">{deviceDef.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Screen Size</span>
                  <span className="text-foreground font-medium">{deviceDef.screenW} × {deviceDef.screenH}px</span>
                </div>
                <div className="flex justify-between">
                  <span>Frame Color</span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: frameColorDef.hex }} />
                    <span className="text-foreground font-medium">{frameColorDef.label}</span>
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1 gap-2"
                onClick={handleDownload}
                disabled={!uploadedImage}
              >
                <Download className="size-4" />
                Download PNG
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={resetToDefault}>
                    <RotateCcw className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset to defaults</TooltipContent>
              </Tooltip>
            </div>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}

// ─── Device Preview Component (HTML/CSS) ────────────────────────────────────

function DevicePreview({
  device,
  frameColor,
  imageSrc,
  shadowEnabled,
}: {
  device: DeviceType
  frameColor: { hex: string; border: string; bg: string }
  imageSrc: string
  shadowEnabled: boolean
}) {
  const placeholder = (
    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="text-center text-gray-400 dark:text-gray-500">
        <Upload className="size-8 mx-auto mb-2 opacity-50" />
        <p className="text-xs">Upload an image</p>
      </div>
    </div>
  )

  const screenContent = imageSrc ? (
    <img src={imageSrc} alt="" className="w-full h-full object-cover" />
  ) : placeholder

  const isPhone = device === "iphone" || device === "samsung"
  const isTablet = device === "ipad"
  const isLaptop = device === "laptop"
  const isDesktop = device === "desktop"
  const isBrowser = device === "browser"

  const shadowClass = shadowEnabled ? "shadow-2xl" : ""

  if (isPhone) {
    const w = 160
    const h = isPhone && device === "iphone" ? 346 : 342
    return (
      <div className={shadowClass}>
        <div
          className="relative rounded-[28px] p-2"
          style={{
            backgroundColor: frameColor.hex,
            width: w + 16,
            height: h + 16,
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 rounded-full z-10"
            style={{
              width: 52,
              height: 16,
              backgroundColor: frameColor.hex,
            }}
          />
          {/* Camera dot */}
          <div
            className="absolute top-[10px] z-20 rounded-full"
            style={{
              left: "calc(50% + 14px)",
              width: 6,
              height: 6,
              backgroundColor: "#1a1a2e",
            }}
          />
          {/* Screen */}
          <div
            className="w-full h-full overflow-hidden rounded-[20px]"
            style={{
              backgroundColor: "#000",
              width: w,
              height: h,
              marginTop: 8,
            }}
          >
            {screenContent}
          </div>
          {/* Home indicator */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 40,
              height: 4,
              backgroundColor: frameColor.border,
            }}
          />
        </div>
      </div>
    )
  }

  if (isTablet) {
    const w = 280
    const h = 373
    return (
      <div className={shadowClass}>
        <div
          className="relative rounded-[24px] p-3"
          style={{
            backgroundColor: frameColor.hex,
            width: w + 24,
            height: h + 24,
          }}
        >
          {/* Camera */}
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 z-10 rounded-full"
            style={{
              width: 6,
              height: 6,
              backgroundColor: frameColor.border,
            }}
          />
          {/* Screen */}
          <div
            className="w-full h-full overflow-hidden rounded-[16px]"
            style={{
              backgroundColor: "#000",
              width: w,
              height: h,
            }}
          >
            {screenContent}
          </div>
        </div>
      </div>
    )
  }

  if (isLaptop) {
    const screenW = 300
    const screenH = 188
    return (
      <div className={shadowClass}>
        {/* Screen lid */}
        <div
          className="rounded-t-xl p-2"
          style={{
            backgroundColor: frameColor.hex,
            width: screenW + 24,
          }}
        >
          {/* Camera */}
          <div
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              backgroundColor: "#333",
              left: "calc(50% - 2px)",
              top: 6,
              position: "relative",
              margin: "0 auto",
              marginBottom: 2,
            }}
          />
          <div
            className="rounded-md overflow-hidden"
            style={{
              backgroundColor: "#0a0a0a",
              width: screenW,
              height: screenH,
            }}
          >
            {screenContent}
          </div>
        </div>
        {/* Keyboard base */}
        <div
          className="rounded-b-lg"
          style={{
            backgroundColor: frameColor.bg,
            width: screenW + 40,
            marginLeft: -8,
            height: 24,
          }}
        >
          <div
            style={{
              backgroundColor: frameColor.border,
              height: 2,
              borderRadius: 0,
            }}
          />
          {/* Trackpad */}
          <div
            className="mx-auto mt-1.5 rounded"
            style={{
              backgroundColor: frameColor.border,
              width: 60,
              height: 12,
            }}
          />
        </div>
      </div>
    )
  }

  if (isDesktop) {
    const screenW = 360
    const screenH = 225
    return (
      <div className={shadowClass}>
        {/* Monitor */}
        <div
          className="rounded-xl p-3 relative"
          style={{
            backgroundColor: frameColor.hex,
            width: screenW + 24,
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: "#0a0a0a",
              width: screenW,
              height: screenH,
            }}
          >
            {screenContent}
          </div>
          {/* Chin logo */}
          <div
            className="mx-auto mt-2 rounded-sm"
            style={{
              backgroundColor: frameColor.bg,
              width: 16,
              height: 2,
            }}
          />
        </div>
        {/* Stand neck */}
        <div
          className="mx-auto"
          style={{
            backgroundColor: frameColor.hex,
            width: 12,
            height: 28,
          }}
        />
        {/* Stand base */}
        <div
          className="mx-auto"
          style={{
            backgroundColor: frameColor.hex,
            width: 70,
            height: 8,
            borderRadius: 8,
          }}
        />
      </div>
    )
  }

  // Browser
  {
    const screenW = 320
    const screenH = 208
    return (
      <div className={shadowClass}>
        <div
          className="rounded-lg overflow-hidden"
          style={{
            backgroundColor: frameColor.hex,
            width: screenW + 4,
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center px-3 py-1.5"
            style={{ backgroundColor: frameColor.bg }}
          >
            {/* Traffic lights */}
            <div className="flex gap-1.5 mr-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[10px] text-center flex-1 opacity-60" style={{ color: frameColor === FRAME_COLORS["black"] ? "#999" : "#666" }}>
              My Website
            </span>
          </div>
          {/* Address bar */}
          <div
            className="px-3 py-1 flex items-center gap-1.5"
            style={{ backgroundColor: frameColor === FRAME_COLORS["black"] ? "#2a2a2a" : "#e5e5e5" }}
          >
            <span className="text-[10px]" style={{ color: frameColor === FRAME_COLORS["black"] ? "#888" : "#999" }}>
              🔒 https://mywebsite.com
            </span>
          </div>
          {/* Screen content */}
          <div
            className="overflow-hidden bg-white"
            style={{
              width: screenW,
              height: screenH,
            }}
          >
            {screenContent}
          </div>
        </div>
      </div>
    )
  }
}

// ─── Canvas Helpers ─────────────────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | number[]
) {
  if (typeof r === "number") {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  } else {
    // Array of [topLeft, topRight, bottomRight, bottomLeft]
    const [tl, tr, br, bl] = r
    ctx.beginPath()
    ctx.moveTo(x + tl, y)
    ctx.lineTo(x + w - tr, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + tr)
    ctx.lineTo(x + w, y + h - br)
    ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h)
    ctx.lineTo(x + bl, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - bl)
    ctx.lineTo(x, y + tl)
    ctx.quadraticCurveTo(x, y, x + tl, y)
    ctx.closePath()
  }
}
