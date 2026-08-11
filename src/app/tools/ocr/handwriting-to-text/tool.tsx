"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Upload,
  Copy,
  Download,
  PenTool,
  Loader2,
  RotateCcw,
  Check,
  Image as ImageIcon,
  Wand2,
} from "lucide-react"

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
  "image/gif",
]

const LANGUAGES = [
  { label: "English", value: "eng" },
  { label: "Bengali", value: "ben" },
  { label: "Spanish", value: "spa" },
  { label: "French", value: "fra" },
  { label: "German", value: "deu" },
  { label: "Chinese (Simplified)", value: "chi_sim" },
  { label: "Japanese", value: "jpn" },
  { label: "Arabic", value: "ara" },
  { label: "Hindi", value: "hin" },
]

function preprocessImage(
  file: File,
  options: { grayscale: boolean; contrast: boolean; threshold: boolean }
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0)
      if (options.grayscale || options.contrast || options.threshold) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          let r = data[i],
            g = data[i + 1],
            b = data[i + 2]
          if (options.grayscale) {
            const gray = 0.299 * r + 0.587 * g + 0.114 * b
            r = g = b = gray
          }
          if (options.contrast) {
            const factor = 1.5
            r = Math.min(255, Math.max(0, factor * (r - 128) + 128))
            g = Math.min(255, Math.max(0, factor * (g - 128) + 128))
            b = Math.min(255, Math.max(0, factor * (b - 128) + 128))
          }
          if (options.threshold) {
            const avg = (r + g + b) / 3
            const val = avg > 128 ? 255 : 0
            r = g = b = val
          }
          data[i] = r
          data[i + 1] = g
          data[i + 2] = b
        }
        ctx.putImageData(imageData, 0, 0)
      }
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Failed"))),
        "image/png"
      )
    }
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = URL.createObjectURL(file)
  })
}

export function HandwritingToTextTool() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [language, setLanguage] = useState("eng")
  const [preprocessGrayscale, setPreprocessGrayscale] = useState(false)
  const [preprocessContrast, setPreprocessContrast] = useState(false)
  const [preprocessThreshold, setPreprocessThreshold] = useState(false)
  const [extractedText, setExtractedText] = useState("")
  const [confidence, setConfidence] = useState<number>(0)
  const [progress, setProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((f: File) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      return
    }
    setFile(f)
    setExtractedText("")
    setConfidence(0)
    setProgress(0)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(f)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) handleFile(droppedFile)
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleExtract = async () => {
    if (!file) return
    setIsProcessing(true)
    setExtractedText("")
    setProgress(0)
    setConfidence(0)
    try {
      const hasPreprocessing =
        preprocessGrayscale || preprocessContrast || preprocessThreshold
      const inputBlob = hasPreprocessing
        ? await preprocessImage(file, {
            grayscale: preprocessGrayscale,
            contrast: preprocessContrast,
            threshold: preprocessThreshold,
          })
        : file

      const Tesseract = (await import("tesseract.js")).default
      const { data } = await Tesseract.recognize(inputBlob, language, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(m.progress)
          }
        },
      })
      setExtractedText(data.text)
      setConfidence(data.confidence)
    } catch {
      setExtractedText(
        "Error: Failed to extract text. Please try again with a clearer image."
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCopy = async () => {
    if (!extractedText) return
    await navigator.clipboard.writeText(extractedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!extractedText) return
    const blob = new Blob([extractedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "handwriting-text.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setZoomed(false)
    setExtractedText("")
    setConfidence(0)
    setProgress(0)
    setIsProcessing(false)
    setCopied(false)
    setPreprocessGrayscale(false)
    setPreprocessContrast(false)
    setPreprocessThreshold(false)
    if (inputRef.current) inputRef.current.value = ""
  }

  const charCount = extractedText.length
  const wordCount = extractedText
    ? extractedText.split(/\s+/).filter(Boolean).length
    : 0
  const lineCount = extractedText
    ? extractedText.split("\n").filter((l) => l.length > 0).length
    : 0

  const hasPreprocessing =
    preprocessGrayscale || preprocessContrast || preprocessThreshold

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!preview && (
        <Card>
          <CardContent className="p-6">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => inputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <PenTool className="size-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">
                Drop your handwriting image here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Supports JPG, PNG, WebP, BMP, and GIF
              </p>
              <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.bmp,.gif"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleFile(f)
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Preview + Controls */}
      {preview && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="size-5 text-muted-foreground" />
                  <span className="text-sm font-medium truncate max-w-48">
                    {file?.name}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="size-4 mr-1" />
                  Reset
                </Button>
              </div>

              {/* Image Preview with Zoom */}
              <div
                className="rounded-lg border border-border overflow-hidden bg-muted/30 relative cursor-zoom-in"
                onClick={() => setZoomed(!zoomed)}
              >
                <img
                  src={preview}
                  alt="Handwriting image preview"
                  className={`w-full h-auto object-contain transition-transform duration-300 ${
                    zoomed ? "max-h-none scale-150 cursor-zoom-out" : "max-h-80"
                  }`}
                />
                {zoomed && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      Click to zoom out
                    </Badge>
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-3">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preprocessing Options */}
              <div className="space-y-3 rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Wand2 className="size-4 text-muted-foreground" />
                  Image Preprocessing
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="grayscale"
                      checked={preprocessGrayscale}
                      onCheckedChange={(checked) =>
                        setPreprocessGrayscale(checked === true)
                      }
                    />
                    <Label
                      htmlFor="grayscale"
                      className="text-sm cursor-pointer"
                    >
                      Grayscale
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      Reduces color noise
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="contrast"
                      checked={preprocessContrast}
                      onCheckedChange={(checked) =>
                        setPreprocessContrast(checked === true)
                      }
                    />
                    <Label
                      htmlFor="contrast"
                      className="text-sm cursor-pointer"
                    >
                      Increase Contrast
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      Enhances text visibility
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="threshold"
                      checked={preprocessThreshold}
                      onCheckedChange={(checked) =>
                        setPreprocessThreshold(checked === true)
                      }
                    />
                    <Label
                      htmlFor="threshold"
                      className="text-sm cursor-pointer"
                    >
                      Threshold (B&W)
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      Best for handwriting OCR
                    </span>
                  </div>
                </div>
                {hasPreprocessing && (
                  <p className="text-xs text-muted-foreground">
                    Preprocessing will be applied before OCR recognition to
                    improve accuracy.
                  </p>
                )}
              </div>

              {/* Extract Button */}
              <Button
                onClick={handleExtract}
                disabled={isProcessing || !file}
                className="w-full gap-2"
              >
                {isProcessing ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <PenTool className="size-4" />
                )}
                {isProcessing ? "Recognizing..." : "Recognize Handwriting"}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Extracted Text</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!extractedText}
                  >
                    {copied ? (
                      <Check className="size-4 mr-1 text-emerald-500" />
                    ) : (
                      <Copy className="size-4 mr-1" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    disabled={!extractedText}
                  >
                    <Download className="size-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Recognizing handwriting...
                    </span>
                    <span className="font-medium">
                      {Math.round(progress * 100)}%
                    </span>
                  </div>
                  <Progress value={progress * 100} className="h-2" />
                </div>
              )}

              {extractedText && !isProcessing && (
                <>
                  <Textarea
                    value={extractedText}
                    readOnly
                    className="min-h-48 resize-y font-mono text-sm"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {charCount.toLocaleString()} characters
                    </Badge>
                    <Badge variant="secondary">
                      {wordCount.toLocaleString()} words
                    </Badge>
                    <Badge variant="secondary">
                      {lineCount.toLocaleString()} lines
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={
                        confidence >= 80
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : confidence >= 50
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }
                    >
                      {confidence.toFixed(1)}% confidence
                    </Badge>
                  </div>
                </>
              )}

              {!extractedText && !isProcessing && (
                <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                  <Upload className="size-10 mb-3 opacity-40" />
                  <p className="text-sm">
                    Upload a handwriting image, select preprocessing options,
                    and click &quot;Recognize Handwriting&quot; to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
