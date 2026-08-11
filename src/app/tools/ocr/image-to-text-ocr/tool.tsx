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
import {
  Upload,
  Copy,
  Download,
  ScanText,
  Loader2,
  RotateCcw,
  Check,
  FileText,
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

export function ImageToTextOcrTool() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [language, setLanguage] = useState("eng")
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
      const Tesseract = (await import("tesseract.js")).default
      const { data } = await Tesseract.recognize(file, language, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(m.progress)
          }
        },
      })
      setExtractedText(data.text)
      setConfidence(data.confidence)
    } catch {
      setExtractedText("Error: Failed to extract text. Please try again.")
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
    a.download = "extracted-text.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setExtractedText("")
    setConfidence(0)
    setProgress(0)
    setIsProcessing(false)
    setCopied(false)
    if (inputRef.current) inputRef.current.value = ""
  }

  const charCount = extractedText.length
  const wordCount = extractedText
    ? extractedText.split(/\s+/).filter(Boolean).length
    : 0
  const lineCount = extractedText
    ? extractedText.split("\n").filter((l) => l.length > 0).length
    : 0

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
              <Upload className="size-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">
                Drop your image here, or click to browse
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
                  <FileText className="size-5 text-muted-foreground" />
                  <span className="text-sm font-medium truncate max-w-48">
                    {file?.name}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="size-4 mr-1" />
                  Reset
                </Button>
              </div>
              <div className="rounded-lg border border-border overflow-hidden bg-muted/30">
                <img
                  src={preview}
                  alt="Uploaded image preview"
                  className="w-full h-auto max-h-80 object-contain"
                />
              </div>
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
                <Button
                  onClick={handleExtract}
                  disabled={isProcessing || !file}
                  className="gap-2"
                >
                  {isProcessing ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ScanText className="size-4" />
                  )}
                  {isProcessing ? "Extracting..." : "Extract Text"}
                </Button>
              </div>
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
                      Processing image...
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
                  <ScanText className="size-10 mb-3 opacity-40" />
                  <p className="text-sm">
                    Upload an image and click &quot;Extract Text&quot; to get
                    started
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
