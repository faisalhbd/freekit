"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { QrCode, Upload, Copy, Check, ExternalLink, ImageIcon, AlertTriangle, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// ─── BarcodeDetector type ───────────────────────────────────────────────────

type BarcodeFormat = "qr_code"

interface DetectedBarcode {
  rawValue: string
  format: string
  cornerPoints: Array<{ x: number; y: number }>
}

interface BarcodeDetectorConstructor {
  new (options: { formats: BarcodeFormat[] }): {
    detect(image: CanvasImageSource): Promise<DetectedBarcode[]>
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function isUrl(text: string): boolean {
  try {
    new URL(text)
    return true
  } catch {
    return false
  }
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function QRCodeScannerTool() {
  const [imagePreview, setImagePreview] = useState("")
  const [results, setResults] = useState<DetectedBarcode[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState<string | null>(null)
  const [supported, setSupported] = useState<boolean | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSupported("BarcodeDetector" in window)
    }
  }, [])

  const scanImage = useCallback(async (file: File) => {
    if (supported === false) return
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, WebP, etc.)")
      return
    }

    setLoading(true)
    setError("")
    setResults([])

    try {
      const url = URL.createObjectURL(file)
      setImagePreview(url)

      const img = new Image()
      img.onload = async () => {
        try {
          const canvas = canvasRef.current!
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight
          const ctx = canvas.getContext("2d")!
          ctx.drawImage(img, 0, 0)

          const detector = new (window as unknown as { BarcodeDetector: BarcodeDetectorConstructor }).BarcodeDetector({
            formats: ["qr_code"],
          })
          const barcodes = await detector.detect(canvas)

          if (barcodes.length === 0) {
            setError("No QR code found in this image. Make sure the QR code is clearly visible and not blurry.")
          } else {
            setResults(barcodes)
          }
        } catch {
          setError("Failed to scan the image. Please try a different image.")
        } finally {
          setLoading(false)
          URL.revokeObjectURL(url)
        }
      }
      img.onerror = () => {
        setError("Failed to load the image. The file may be corrupted.")
        setLoading(false)
        URL.revokeObjectURL(url)
      }
      img.src = url
    } catch {
      setError("Failed to process the image.")
      setLoading(false)
    }
  }, [supported])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) scanImage(file)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  // Not supported
  if (supported === false) {
    return (
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
                <QrCode className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">QR Code Scanner</h3>
                <p className="text-sm text-muted-foreground">Decode QR codes from images</p>
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-center space-y-3">
              <AlertTriangle className="mx-auto size-10 text-amber-600 dark:text-amber-400" />
              <h4 className="font-semibold text-amber-700 dark:text-amber-300">Browser Not Supported</h4>
              <p className="text-sm text-amber-600/80 dark:text-amber-400/80 max-w-md mx-auto">
                The QR Code Scanner uses the BarcodeDetector API, which is not available in your browser.
                Please use <span className="font-semibold">Google Chrome</span> or <span className="font-semibold">Microsoft Edge</span> for the best experience.
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <QrCode className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">QR Code Scanner</h3>
              <p className="text-sm text-muted-foreground">Upload an image containing a QR code to decode it</p>
            </div>
          </div>

          {/* Hidden canvas for processing */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              imagePreview
                ? "border-emerald-500/50 bg-emerald-500/5"
                : dragOver
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) scanImage(file)
              }}
            />
            {imagePreview ? (
              <div className="space-y-3">
                <img
                  src={imagePreview}
                  alt="Uploaded QR code"
                  className="mx-auto max-h-64 rounded-lg border border-border"
                />
                <p className="text-xs text-muted-foreground">Click to upload a different image</p>
              </div>
            ) : (
              <>
                <Upload className="mx-auto size-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium">Drop an image here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Supports JPEG, PNG, WebP, GIF, and more</p>
              </>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2 py-4 text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
              <span className="text-sm">Scanning for QR codes...</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
              <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700 dark:text-amber-300">{error}</p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && !loading && (
            <div className="mt-6 space-y-4">
              <h4 className="text-sm font-semibold">
                Decoded Content {results.length > 1 ? `(${results.length} QR codes found)` : ""}
              </h4>
              {results.map((barcode, i) => {
                const url = isUrl(barcode.rawValue)
                const isCopied = copied === barcode.rawValue
                return (
                  <div key={i} className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          {url ? "URL Detected" : "Text Content"} · Format: {barcode.format}
                        </p>
                        <p className={`text-sm font-mono break-all ${url ? "text-primary" : ""}`}>{
                          barcode.rawValue
                        }</p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5"
                          onClick={() => handleCopy(barcode.rawValue)}
                        >
                          {isCopied ? (
                            <Check className="size-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                          {isCopied ? "Copied" : "Copy"}
                        </Button>
                        {url && (
                          <Button variant="ghost" size="sm" className="h-8 gap-1.5" asChild>
                            <a href={barcode.rawValue} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="size-3.5" /> Open
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <ImageIcon className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Scanned in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              Your image is processed using the browser's BarcodeDetector API. The image is never uploaded to any server.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}