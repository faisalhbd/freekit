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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Download,
  FileImage,
  Loader2,
  RotateCcw,
  Code,
  ImageIcon,
  Maximize2,
} from "lucide-react"

type ScaleOption = "1x" | "2x" | "3x" | "4x" | "custom"
type BgOption = "transparent" | "white" | "custom"
type FormatOption = "png" | "jpg"

interface SVGFile {
  id: string
  name: string
  svgText: string
  originalSize: number
  svgUrl: string
  naturalWidth: number
  naturalHeight: number
  converted: boolean
  convertedBlob: Blob | null
  convertedUrl: string | null
  convertedSize: number
  error: string | null
}

function parseSvgDimensions(
  svgText: string
): { width: number; height: number } {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgText, "image/svg+xml")
  const svgEl = doc.querySelector("svg")
  if (!svgEl) return { width: 300, height: 150 }

  let w = parseFloat(svgEl.getAttribute("width") || "")
  let h = parseFloat(svgEl.getAttribute("height") || "")

  if ((!w || !h) && svgEl.hasAttribute("viewBox")) {
    const vb = svgEl.getAttribute("viewBox")
    if (vb) {
      const parts = vb.split(/[\s,]+/).map(Number)
      if (parts.length === 4 && !isNaN(parts[2]) && !isNaN(parts[3])) {
        if (!w) w = parts[2]
        if (!h) h = parts[3]
      }
    }
  }

  if (!w || isNaN(w)) w = 300
  if (!h || isNaN(h)) h = 150

  return { width: Math.round(w), height: Math.round(h) }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

function convertSvgToImage(
  svgText: string,
  width: number,
  height: number,
  bgOption: BgOption,
  bgColor: string,
  format: FormatOption
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const img = new window.Image()

    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        URL.revokeObjectURL(url)
        reject(new Error("Canvas context not available"))
        return
      }

      // Draw background
      if (bgOption === "white" || format === "jpg") {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, width, height)
      } else if (bgOption === "custom" && bgColor) {
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, width, height)
      }

      // Draw SVG image
      ctx.drawImage(img, 0, 0, width, height)
      URL.revokeObjectURL(url)

      const mimeType = format === "jpg" ? "image/jpeg" : "image/png"
      const quality = format === "jpg" ? 0.92 : undefined

      canvas.toBlob(
        (result) => {
          if (result) resolve(result)
          else reject(new Error("Failed to create image blob"))
        },
        mimeType,
        quality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Failed to load SVG"))
    }

    img.src = url
  })
}

export function SvgToPngTool() {
  const [files, setFiles] = useState<SVGFile[]>([])
  const [svgCode, setSvgCode] = useState("")
  const [svgCodePreview, setSvgCodePreview] = useState<string | null>(null)
  const [svgCodeName, setSvgCodeName] = useState<string>("pasted-svg")
  const [scale, setScale] = useState<ScaleOption>("2x")
  const [customWidth, setCustomWidth] = useState("")
  const [customHeight, setCustomHeight] = useState("")
  const [bgOption, setBgOption] = useState<BgOption>("transparent")
  const [bgColor, setBgColor] = useState("#000000")
  const [format, setFormat] = useState<FormatOption>("png")
  const [isConverting, setIsConverting] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const computeOutputSize = useCallback(
    (baseW: number, baseH: number) => {
      if (scale === "custom") {
        const w = parseInt(customWidth) || baseW * 2
        const h = parseInt(customHeight) || baseH * 2
        return { width: w, height: h }
      }
      const multiplier = parseInt(scale)
      return { width: baseW * multiplier, height: baseH * multiplier }
    },
    [scale, customWidth, customHeight]
  )

  const createSvgUrl = useCallback((svgText: string) => {
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" })
    return URL.createObjectURL(blob)
  }, [])

  const handleSvgFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const newFiles: SVGFile[] = []
      for (const file of Array.from(fileList)) {
        if (
          file.type !== "image/svg+xml" &&
          !file.name.toLowerCase().endsWith(".svg")
        )
          continue
        const svgText = await file.text()
        const { width, height } = parseSvgDimensions(svgText)
        const id = generateId()
        newFiles.push({
          id,
          name: file.name,
          svgText,
          originalSize: file.size,
          svgUrl: createSvgUrl(svgText),
          naturalWidth: width,
          naturalHeight: height,
          converted: false,
          convertedBlob: null,
          convertedUrl: null,
          convertedSize: 0,
          error: null,
        })
      }
      setFiles((prev) => [...prev, ...newFiles])
    },
    [createSvgUrl]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      if (e.dataTransfer.files.length > 0) {
        handleSvgFiles(e.dataTransfer.files)
      }
    },
    [handleSvgFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleSvgFiles(e.target.files)
      e.target.value = ""
    }
  }

  const handleSvgCodeChange = (value: string) => {
    setSvgCode(value)
    if (value.includes("<svg")) {
      const blob = new Blob([value], { type: "image/svg+xml;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      if (svgCodePreview) URL.revokeObjectURL(svgCodePreview)
      setSvgCodePreview(url)
    } else {
      if (svgCodePreview) URL.revokeObjectURL(svgCodePreview)
      setSvgCodePreview(null)
    }
  }

  const convertSingleFile = async (
    f: SVGFile,
    outW: number,
    outH: number
  ): Promise<Partial<SVGFile>> => {
    try {
      const blob = await convertSvgToImage(
        f.svgText,
        outW,
        outH,
        bgOption,
        bgColor,
        format
      )
      const url = URL.createObjectURL(blob)
      return {
        converted: true,
        convertedBlob: blob,
        convertedUrl: url,
        convertedSize: blob.size,
        error: null,
      }
    } catch (err) {
      return {
        converted: false,
        convertedBlob: null,
        convertedUrl: null,
        convertedSize: 0,
        error: err instanceof Error ? err.message : "Conversion failed",
      }
    }
  }

  const convertAll = async () => {
    setIsConverting(true)
    try {
      const updates = await Promise.all(
        files.map(async (f) => {
          if (f.converted) return f
          const { width, height } = computeOutputSize(
            f.naturalWidth,
            f.naturalHeight
          )
          const result = await convertSingleFile(f, width, height)
          return { ...f, ...result }
        })
      )
      setFiles(updates)
    } catch {
      // handled per-file
    } finally {
      setIsConverting(false)
    }
  }

  const convertCode = async () => {
    if (!svgCode.includes("<svg")) return
    setIsConverting(true)
    try {
      const { width, height } = parseSvgDimensions(svgCode)
      const { width: outW, height: outH } = computeOutputSize(width, height)
      const blob = await convertSvgToImage(
        svgCode,
        outW,
        outH,
        bgOption,
        bgColor,
        format
      )
      const url = URL.createObjectURL(blob)
      const newFile: SVGFile = {
        id: generateId(),
        name: svgCodeName.endsWith(".svg") ? svgCodeName : svgCodeName + ".svg",
        svgText: svgCode,
        originalSize: new Blob([svgCode]).size,
        svgUrl: svgCodePreview || createSvgUrl(svgCode),
        naturalWidth: width,
        naturalHeight: height,
        converted: true,
        convertedBlob: blob,
        convertedUrl: url,
        convertedSize: blob.size,
        error: null,
      }
      setFiles((prev) => [...prev, newFile])
    } catch (err) {
      // silently fail for code mode
    } finally {
      setIsConverting(false)
    }
  }

  const downloadFile = (f: SVGFile) => {
    if (!f.convertedBlob) return
    const ext = format
    const baseName = f.name.replace(/\.svg$/i, "")
    const url = f.convertedUrl || URL.createObjectURL(f.convertedBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${baseName}.${ext}`
    a.click()
    if (!f.convertedUrl) URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    files.filter((f) => f.converted && f.convertedBlob).forEach(downloadFile)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.svgUrl)
        if (file.convertedUrl) URL.revokeObjectURL(file.convertedUrl)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  const resetAll = () => {
    files.forEach((f) => {
      URL.revokeObjectURL(f.svgUrl)
      if (f.convertedUrl) URL.revokeObjectURL(f.convertedUrl)
    })
    setFiles([])
    setSvgCode("")
    if (svgCodePreview) URL.revokeObjectURL(svgCodePreview)
    setSvgCodePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const allConverted =
    files.length > 0 && files.every((f) => f.converted || !!f.error)
  const hasCode = svgCode.includes("<svg")

  return (
    <div className="space-y-6">
      {/* Tabs for input modes */}
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload SVG File
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-2">
            <Code className="h-4 w-4" />
            Paste SVG Code
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="mt-4">
          <div
            role="button"
            tabIndex={0}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                fileInputRef.current?.click()
            }}
            className={`
              relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 sm:p-12
              transition-colors cursor-pointer
              ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg,image/svg+xml"
              multiple
              onChange={handleFileInput}
              className="hidden"
              aria-label="Upload SVG files"
            />
            <div
              className={`
                flex h-14 w-14 items-center justify-center rounded-full transition-colors
                ${
                  isDragOver
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }
              `}
            >
              <FileImage className="h-6 w-6" />
            </div>
            <div className="text-center">
              <p className="font-medium">
                Drag & drop SVG files here, or click to browse
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Supports .svg files — multiple files allowed
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Code Tab */}
        <TabsContent value="code" className="mt-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">SVG Markup</label>
            <Textarea
              value={svgCode}
              onChange={(e) => handleSvgCodeChange(e.target.value)}
              placeholder={`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">\n  <circle cx="50" cy="50" r="40" fill="#ff6b6b" />\n</svg>`}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
          {svgCodePreview && (
            <Card>
              <CardContent className="p-4">
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  SVG Preview
                </p>
                <div className="flex items-center justify-center rounded-lg border border-border bg-[repeating-conic-gradient(#80808020_0%_25%,transparent_0%_50%)]_50%_/20px_20px p-4">
                  <img
                    src={svgCodePreview}
                    alt="SVG preview"
                    className="max-h-48 max-w-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Settings */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Output Size */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Size</label>
              <Select
                value={scale}
                onValueChange={(v) => setScale(v as ScaleOption)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1x">1x (Original)</SelectItem>
                  <SelectItem value="2x">2x (Retina)</SelectItem>
                  <SelectItem value="3x">3x (High DPI)</SelectItem>
                  <SelectItem value="4x">4x (Ultra HD)</SelectItem>
                  <SelectItem value="custom">Custom Size</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Dimensions */}
            {scale === "custom" && (
              <div className="space-y-2 sm:col-span-2 lg:col-span-2">
                <label className="text-sm font-medium">
                  Custom Dimensions (px)
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Width"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="flex-1"
                    min={1}
                  />
                  <Maximize2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Height"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    className="flex-1"
                    min={1}
                  />
                </div>
              </div>
            )}

            {/* Background */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Background</label>
              <Select
                value={bgOption}
                onValueChange={(v) => setBgOption(v as BgOption)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transparent">Transparent</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="custom">Custom Color</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Background Color */}
            {bgOption === "custom" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-9 w-12 cursor-pointer rounded border border-border"
                  />
                  <Input
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>
            )}

            {/* Output Format */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Format</label>
              <Select
                value={format}
                onValueChange={(v) => setFormat(v as FormatOption)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {files.length > 0 && (
          <Button
            onClick={convertAll}
            disabled={isConverting || files.every((f) => f.converted)}
          >
            {isConverting ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : (
              <ImageIcon className="mr-1.5 h-4 w-4" />
            )}
            {files.every((f) => f.converted) ? "All Converted" : "Convert All"}
          </Button>
        )}
        {hasCode && (
          <Button
            variant="outline"
            onClick={convertCode}
            disabled={isConverting}
          >
            {isConverting ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : (
              <ImageIcon className="mr-1.5 h-4 w-4" />
            )}
            Convert SVG Code
          </Button>
        )}
        {allConverted && (
          <Button variant="default" onClick={downloadAll}>
            <Download className="mr-1.5 h-4 w-4" />
            Download All
          </Button>
        )}
        {(files.length > 0 || svgCode) && (
          <Button variant="ghost" onClick={resetAll}>
            <RotateCcw className="mr-1.5 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="grid gap-4 max-h-[500px] overflow-y-auto">
          {files.map((f) => {
            const { width: outW, height: outH } = computeOutputSize(
              f.naturalWidth,
              f.naturalHeight
            )
            return (
              <Card key={f.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                    {/* SVG Preview */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-[repeating-conic-gradient(#80808020_0%_25%,transparent_0%_50%)]_50%_/16px_16px">
                        <img
                          src={f.svgUrl}
                          alt={f.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {f.naturalWidth}×{f.naturalHeight}
                      </Badge>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium truncate">{f.name}</p>
                        <div className="flex items-center gap-2 shrink-0">
                          {f.converted ? (
                            <Badge
                              variant="outline"
                              className="text-xs text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
                            >
                              Converted
                            </Badge>
                          ) : f.error ? (
                            <Badge
                              variant="outline"
                              className="text-xs text-red-600 border-red-300 bg-red-50 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
                            >
                              Error
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>SVG: {formatBytes(f.originalSize)}</span>
                        {f.converted && (
                          <>
                            <span>→</span>
                            <span className="text-emerald-600 dark:text-emerald-400">
                              {format.toUpperCase()}: {formatBytes(f.convertedSize)}
                            </span>
                            <span className="text-xs">
                              ({outW}×{outH})
                            </span>
                          </>
                        )}
                      </div>

                      {f.error && (
                        <p className="text-xs text-red-500">{f.error}</p>
                      )}

                      {/* Converted Preview */}
                      {f.converted && f.convertedUrl && (
                        <div className="flex flex-col items-start gap-2">
                          <div className="relative max-h-32 overflow-hidden rounded-lg border border-border bg-[repeating-conic-gradient(#80808020_0%_25%,transparent_0%_50%)]_50%_/16px_16px">
                            <img
                              src={f.convertedUrl}
                              alt={`Converted ${f.name}`}
                              className="max-h-32 w-auto object-contain"
                            />
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadFile(f)}
                          >
                            <Download className="mr-1.5 h-3.5 w-3.5" />
                            Download {format.toUpperCase()}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Remove button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(f.id)}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {files.length === 0 && !hasCode && (
        <div className="flex flex-col items-center gap-3 py-8 text-center text-muted-foreground">
          <FileImage className="h-10 w-10 opacity-40" />
          <p className="text-sm max-w-md">
            Upload SVG files or paste SVG code to convert them to high-quality
            PNG or JPG images. All processing is done locally in your browser.
          </p>
        </div>
      )}
    </div>
  )
}
