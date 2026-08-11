"use client"

import { useState, useRef, useCallback, useEffect, type DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Upload,
  Download,
  ImageDown,
  FileText,
  Loader2,
  RotateCcw,
  Settings,
  Check,
} from "lucide-react"

interface ConvertedPage {
  pageNumber: number
  url: string
  blob: Blob
  width: number
  height: number
  size: number
}

type ScaleOption = "1" | "1.5" | "2" | "3"
type ImageFormat = "jpg" | "png"

const SCALE_LABELS: Record<ScaleOption, string> = {
  "1": "1x (72 DPI)",
  "1.5": "1.5x (108 DPI)",
  "2": "2x (144 DPI)",
  "3": "3x (216 DPI)",
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function parsePageSelection(input: string, maxPage: number): number[] {
  const pages = new Set<number>()
  const parts = input.split(",")
  for (const part of parts) {
    const trimmed = part.replace(/\s/g, "")
    if (!trimmed) continue
    const rangeMatch = trimmed.match(/^(\d+)-(\d+)$/)
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10)
      const end = parseInt(rangeMatch[2], 10)
      if (start >= 1 && end <= maxPage && start <= end) {
        for (let i = start; i <= end; i++) pages.add(i)
      }
    } else {
      const num = parseInt(trimmed, 10)
      if (num >= 1 && num <= maxPage) pages.add(num)
    }
  }
  return Array.from(pages).sort((a, b) => a - b)
}

export function PdfToJpgTool() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState<number>(0)
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [convertedPages, setConvertedPages] = useState<ConvertedPage[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(true)
  const [pageMode, setPageMode] = useState<"all" | "custom">("all")
  const [pageInput, setPageInput] = useState("")
  const [pageError, setPageError] = useState("")
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState<ArrayBuffer | null>(null)

  // Settings
  const [scale, setScale] = useState<ScaleOption>("2")
  const [imageFormat, setImageFormat] = useState<ImageFormat>("jpg")
  const [jpgQuality, setJpgQuality] = useState(85)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const pagesRef = useRef<Set<string>>(new Set())

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      convertedPages.forEach((p) => URL.revokeObjectURL(p.url))
    }
  }, [])

  const loadPdf = useCallback(async (file: File) => {
    try {
      const pdfjsLib = await import("pdfjs-dist")
      // Set workerSrc to a versioned CDN URL — required for pdfjs-dist v6+ in Next.js.
      // An empty string (the previous value) silently broke PDF loading because the
      // worker could not be resolved, so the drag/upload UI appeared to reject PDFs.
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      setPdfFile(file)
      setPdfArrayBuffer(arrayBuffer)
      setPageCount(pdf.numPages)
      setConvertedPages([])
      setProgress(0)
      setPageMode("all")
      setPageInput("")
      setPageError("")
      pagesRef.current.forEach((url) => URL.revokeObjectURL(url))
      pagesRef.current = new Set()
    } catch {
      setPdfFile(null)
      setPdfArrayBuffer(null)
      setPageCount(0)
    }
  }, [])

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList).filter((f) =>
        f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
      )
      if (files.length > 0) {
        await loadPdf(files[0])
      }
    },
    [loadPdf]
  )

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files)
      }
    },
    [processFiles]
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files)
        e.target.value = ""
      }
    },
    [processFiles]
  )

  const clearAll = useCallback(() => {
    pagesRef.current.forEach((url) => URL.revokeObjectURL(url))
    pagesRef.current = new Set()
    convertedPages.forEach((p) => URL.revokeObjectURL(p.url))
    setPdfFile(null)
    setPdfArrayBuffer(null)
    setPageCount(0)
    setConvertedPages([])
    setProgress(0)
    setPageMode("all")
    setPageInput("")
    setPageError("")
  }, [convertedPages])

  const convertToImages = useCallback(async () => {
    if (!pdfArrayBuffer || converting) return

    // Validate page selection
    let pagesToConvert: number[]
    if (pageMode === "all") {
      pagesToConvert = Array.from({ length: pageCount }, (_, i) => i + 1)
    } else {
      pagesToConvert = parsePageSelection(pageInput, pageCount)
      if (pagesToConvert.length === 0) {
        setPageError("Please enter valid page numbers (e.g. 1, 3, 5-8)")
        return
      }
    }

    setConverting(true)
    setProgress(0)
    setPageError("")

    // Clean up previous results
    pagesRef.current.forEach((url) => URL.revokeObjectURL(url))
    pagesRef.current = new Set()
    convertedPages.forEach((p) => URL.revokeObjectURL(p.url))
    setConvertedPages([])

    try {
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
      const pdf = await pdfjsLib.getDocument({ data: pdfArrayBuffer.slice(0) }).promise
      const scaleValue = parseFloat(scale)
      const mimeType = imageFormat === "jpg" ? "image/jpeg" : "image/png"
      const ext = imageFormat === "jpg" ? "jpg" : "png"
      const results: ConvertedPage[] = []

      for (let i = 0; i < pagesToConvert.length; i++) {
        const pageNum = pagesToConvert[i]
        const page = await pdf.getPage(pageNum)
        const viewport = page.getViewport({ scale: scaleValue })

        const canvas = document.createElement("canvas")
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext("2d")

        if (ctx) {
          // White background for JPEG (no transparency)
          if (imageFormat === "jpg") {
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
          }

          await page.render({
            canvasContext: ctx,
            viewport: viewport,
          }).promise

          const blob = await new Promise<Blob>((resolve, reject) => {
            if (imageFormat === "jpg") {
              canvas.toBlob(
                (b) => {
                  if (b) resolve(b)
                  else reject(new Error("Failed to create image"))
                },
                mimeType,
                jpgQuality / 100
              )
            } else {
              canvas.toBlob(
                (b) => {
                  if (b) resolve(b)
                  else reject(new Error("Failed to create image"))
                },
                mimeType
              )
            }
          })

          const url = URL.createObjectURL(blob)
          pagesRef.current.add(url)

          const baseName = pdfFile ? pdfFile.name.replace(/\.pdf$/i, "") : "page"
          results.push({
            pageNumber: pageNum,
            url,
            blob,
            width: canvas.width,
            height: canvas.height,
            size: blob.size,
          })
        }

        setProgress(Math.round(((i + 1) / pagesToConvert.length) * 100))
      }

      setConvertedPages(results)
    } catch {
      // Error handled silently — user can retry
    } finally {
      setConverting(false)
    }
  }, [pdfArrayBuffer, converting, pageCount, pageMode, pageInput, scale, imageFormat, jpgQuality, pdfFile, convertedPages])

  const downloadImage = useCallback((page: ConvertedPage) => {
    const ext = imageFormat === "jpg" ? "jpg" : "png"
    const baseName = pdfFile ? pdfFile.name.replace(/\.pdf$/i, "") : "page"
    const link = document.createElement("a")
    link.href = page.url
    // BUGFIX: previously used page.number which is undefined — interface field is pageNumber.
    link.download = `${baseName}-page-${page.pageNumber}.${ext}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [imageFormat, pdfFile])

  const downloadAll = useCallback(() => {
    const ext = imageFormat === "jpg" ? "jpg" : "png"
    const baseName = pdfFile ? pdfFile.name.replace(/\.pdf$/i, "") : "page"
    convertedPages.forEach((page, idx) => {
      const link = document.createElement("a")
      link.href = page.url
      // BUGFIX: previously used page.number (undefined). Stagger downloads slightly
      // so the browser opens each one instead of dropping the second+ click.
      link.download = `${baseName}-page-${page.pageNumber}.${ext}`
      setTimeout(() => {
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, idx * 200)
    })
  }, [imageFormat, pdfFile, convertedPages])

  const selectedPageCount =
    pageMode === "all"
      ? pageCount
      : parsePageSelection(pageInput, pageCount).length

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card className="p-0 overflow-hidden">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={
            "relative flex flex-col items-center justify-center gap-3 p-8 sm:p-12 cursor-pointer transition-colors border-2 border-dashed rounded-xl m-0 "
          }
          style={{
            borderColor: isDragOver ? "hsl(var(--primary))" : "hsl(var(--border))",
            backgroundColor: isDragOver ? "hsl(var(--primary) / 0.05)" : "transparent",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">
              {isDragOver ? "Drop your PDF here" : pdfFile ? "Drop a new PDF to replace" : "Drag & drop a PDF file here"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse from your device
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            PDF files supported
          </Badge>
        </div>
      </Card>

      {/* PDF Info + Settings */}
      {pdfFile && pageCount > 0 && (
        <div className="space-y-4">
          {/* File Info Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm truncate max-w-[200px] sm:max-w-[400px]">
                  {pdfFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {pageCount} {pageCount === 1 ? "page" : "pages"} · {formatFileSize(pdfFile.size)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="gap-1.5"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                Clear
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {settingsOpen && (
            <Card className="p-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Scale / DPI */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Scale / DPI</label>
                  <Select value={scale} onValueChange={(v) => setScale(v as ScaleOption)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{SCALE_LABELS["1"]}</SelectItem>
                      <SelectItem value="1.5">{SCALE_LABELS["1.5"]}</SelectItem>
                      <SelectItem value="2">{SCALE_LABELS["2"]}</SelectItem>
                      <SelectItem value="3">{SCALE_LABELS["3"]}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Format */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Image Format</label>
                  <Select
                    value={imageFormat}
                    onValueChange={(v) => setImageFormat(v as ImageFormat)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpg">JPG (Smaller file)</SelectItem>
                      <SelectItem value="png">PNG (Lossless)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* JPG Quality */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-foreground">
                    JPG Quality: {jpgQuality}%
                  </label>
                  <Slider
                    value={[jpgQuality]}
                    onValueChange={(v) => setJpgQuality(v[0])}
                    min={10}
                    max={100}
                    step={5}
                    disabled={imageFormat === "png"}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    {imageFormat === "png" ? "PNG uses lossless compression — quality slider is disabled" : "Lower values produce smaller files with reduced quality"}
                  </p>
                </div>
              </div>

              {/* Page Selection */}
              <div className="space-y-2 pt-2 border-t border-border">
                <label className="text-sm font-medium text-foreground">Page Selection</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex gap-2">
                    <Button
                      variant={pageMode === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setPageMode("all"); setPageError("") }}
                      className="gap-1.5"
                    >
                      <Check className={`w-3.5 h-3.5 ${pageMode === "all" ? "opacity-100" : "opacity-0"}`} />
                      All Pages ({pageCount})
                    </Button>
                    <Button
                      variant={pageMode === "custom" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPageMode("custom")}
                      className="gap-1.5"
                    >
                      <Check className={`w-3.5 h-3.5 ${pageMode === "custom" ? "opacity-100" : "opacity-0"}`} />
                      Custom Pages
                    </Button>
                  </div>
                  {pageMode === "custom" && (
                    <div className="flex-1">
                      <input
                        type="text"
                        value={pageInput}
                        onChange={(e) => { setPageInput(e.target.value); setPageError("") }}
                        placeholder={`e.g. 1, 3, 5-${Math.min(pageCount, 10)}`}
                        className={
                          "w-full rounded-md border px-3 py-1.5 text-sm bg-background " +
                          (pageError ? "border-destructive" : "border-border")
                        }
                      />
                      {pageError && (
                        <p className="text-xs text-destructive mt-1">{pageError}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Progress Bar */}
          {converting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Converting page {Math.round(progress / 100 * selectedPageCount)} of {selectedPageCount}…
                </span>
                <span className="font-medium text-foreground">{progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Convert Button */}
          {!converting && (
            <Button
              onClick={convertToImages}
              size="lg"
              className="w-full gap-2"
            >
              <ImageDown className="w-4 h-4" />
              Convert {selectedPageCount} {selectedPageCount === 1 ? "Page" : "Pages"} to {imageFormat.toUpperCase()}
            </Button>
          )}
        </div>
      )}

      {/* Converted Pages Thumbnails */}
      {convertedPages.length > 0 && !converting && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-foreground">
                Converted Pages ({convertedPages.length})
              </h3>
              <span className="text-sm text-muted-foreground">
                {formatFileSize(convertedPages.reduce((sum, p) => sum + p.size, 0))} total
              </span>
            </div>
            <Button onClick={downloadAll} variant="outline" size="sm" className="gap-1.5">
              <Download className="w-4 h-4" />
              Download All
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
            {convertedPages.map((page) => (
              <div
                key={page.pageNumber}
                className="group relative rounded-lg border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-md"
              >
                {/* Thumbnail */}
                <div className="aspect-[3/4] bg-muted relative">
                  <img
                    src={page.url}
                    alt={`Page ${page.pageNumber}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info Bar */}
                <div className="p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-foreground">Page {page.pageNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(page.size)}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {page.width} × {page.height} px
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full h-7 text-xs gap-1 mt-1"
                    onClick={() => downloadImage(page)}
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--border));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  )
}
