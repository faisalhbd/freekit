"use client"

import { useState, useRef, useCallback, useMemo, type DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Download,
  RotateCw,
  RotateCcw,
  FileText,
  Loader2,
  RefreshCw,
} from "lucide-react"

type RotationAngle = 90 | -90 | 180

type RotationMode = "all" | "selected"

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function getAngleLabel(angle: RotationAngle): string {
  if (angle === 90) return "90° CW"
  if (angle === -90) return "90° CCW"
  return "180°"
}

export function PdfRotatorTool() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null)
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set())
  const [rotationAngle, setRotationAngle] = useState<RotationAngle>(90)
  const [rotationMode, setRotationMode] = useState<RotationMode>("all")
  const [rotating, setRotating] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState<number>(0)
  const [error, setError] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      return
    }
    try {
      const { PDFDocument } = await import("pdf-lib")
      const arrayBuffer = await selectedFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
      const pages = pdfDoc.getPageCount()
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setFileSize(selectedFile.size)
      setPageCount(pages)
      setPdfBytes(new Uint8Array(arrayBuffer))
      setSelectedPages(new Set())
      setRotationMode("all")
      setResultUrl(null)
      setResultSize(0)
      setError("")
    } catch {
      setError("Failed to read the PDF. The file may be corrupted or password-protected.")
    }
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)
      if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0])
      }
    },
    [handleFile]
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
        handleFile(e.target.files[0])
        e.target.value = ""
      }
    },
    [handleFile]
  )

  const togglePage = useCallback((pageNum: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev)
      if (next.has(pageNum)) {
        next.delete(pageNum)
      } else {
        next.add(pageNum)
      }
      return next
    })
  }, [])

  const selectAllPages = useCallback(() => {
    setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i + 1)))
  }, [pageCount])

  const deselectAllPages = useCallback(() => {
    setSelectedPages(new Set())
  }, [])

  const clearAll = useCallback(() => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl)
    }
    setFile(null)
    setFileName("")
    setFileSize(0)
    setPageCount(0)
    setPdfBytes(null)
    setSelectedPages(new Set())
    setRotationMode("all")
    setRotationAngle(90)
    setResultUrl(null)
    setResultSize(0)
    setError("")
  }, [resultUrl])

  const baseName = useMemo(() => {
    if (!fileName) return "document"
    return fileName.replace(/\.pdf$/i, "")
  }, [fileName])

  const canRotate = useMemo(() => {
    if (!pdfBytes) return false
    if (rotationMode === "all") return true
    return selectedPages.size > 0
  }, [pdfBytes, rotationMode, selectedPages.size])

  const rotatePdf = useCallback(async () => {
    if (!pdfBytes || rotating || !canRotate) return

    setError("")
    setRotating(true)

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl)
      setResultUrl(null)
    }

    try {
      const { PDFDocument, degrees } = await import("pdf-lib")
      const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
      const pages = pdfDoc.getPages()

      const targetPages = rotationMode === "all"
        ? pages
        : pages.filter((_, i) => selectedPages.has(i + 1))

      for (const page of targetPages) {
        const currentRotation = page.getRotation().angle
        const newRotation = currentRotation + rotationAngle
        page.setRotation(degrees(newRotation))
      }

      const savedBytes = await pdfDoc.save()
      const blob = new Blob([savedBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      setResultUrl(url)
      setResultSize(savedBytes.length)
    } catch {
      setError("An error occurred while rotating the PDF. Please try again.")
    } finally {
      setRotating(false)
    }
  }, [pdfBytes, rotating, canRotate, rotationMode, selectedPages, rotationAngle, resultUrl])

  const downloadResult = useCallback(() => {
    if (!resultUrl) return
    const link = document.createElement("a")
    link.href = resultUrl
    link.download = `${baseName}-rotated.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [resultUrl, baseName])

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card className="p-0 overflow-hidden">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !file && fileInputRef.current?.click()}
          className={
            `relative flex flex-col items-center justify-center gap-3 p-8 sm:p-12 transition-colors border-2 border-dashed rounded-xl m-0 `
          }
          style={{
            borderColor: isDragOver ? "hsl(var(--primary))" : file ? "hsl(var(--border))" : "hsl(var(--border))",
            backgroundColor: isDragOver ? "hsl(var(--primary) / 0.05)" : "transparent",
            cursor: file ? "default" : "pointer",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInput}
            className="hidden"
          />

          {!file ? (
            <>
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">
                  {isDragOver ? "Drop your PDF file here" : "Drag & drop a PDF file here"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse from your device
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                PDF files only
              </Badge>
            </>
          ) : (
            <div className="flex items-center gap-4 w-full">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 dark:bg-red-950/40 shrink-0">
                <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-medium text-foreground truncate">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  {pageCount} {pageCount === 1 ? "page" : "pages"} · {formatFileSize(fileSize)}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  clearAll()
                }}
                className="text-muted-foreground hover:text-destructive shrink-0"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                Change File
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Page Selection Grid & Controls (hidden when result shown) */}
      {file && !resultUrl && (
        <>
          {/* Page Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground text-sm">
                  Select Pages to Rotate ({pageCount})
                </h3>
              </div>
              <div className="flex gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllPages}
                  className="text-xs h-7"
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deselectAllPages}
                  className="text-xs h-7"
                >
                  Clear
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => {
                const isSelected = selectedPages.has(p)
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePage(p)}
                    className={
                      `flex items-center justify-center h-10 rounded-lg border text-xs font-medium transition-colors cursor-pointer `
                      + (isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground")
                    }
                  >
                    {p}
                  </button>
                )
              })}
            </div>
            {selectedPages.size > 0 && (
              <p className="text-xs text-muted-foreground">
                {selectedPages.size} page{selectedPages.size !== 1 ? "s" : ""} selected: {" "}
                {Array.from(selectedPages).sort((a, b) => a - b).join(", ")}
              </p>
            )}
          </div>

          {/* Rotation Controls */}
          <Card className="p-4 sm:p-6">
            <div className="space-y-4">
              {/* Rotation Mode */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Rotation Scope</label>
                <div className="flex gap-2">
                  <Button
                    variant={rotationMode === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRotationMode("all")}
                    className="gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    Rotate All Pages
                  </Button>
                  <Button
                    variant={rotationMode === "selected" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRotationMode("selected")}
                    className="gap-1.5"
                    disabled={selectedPages.size === 0}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Rotate Selected ({selectedPages.size})
                  </Button>
                </div>
              </div>

              {/* Rotation Angle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Rotation Angle</label>
                <div className="flex gap-2">
                  <Button
                    variant={rotationAngle === 90 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRotationAngle(90)}
                    className="gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    90° CW
                  </Button>
                  <Button
                    variant={rotationAngle === -90 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRotationAngle(-90)}
                    className="gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    90° CCW
                  </Button>
                  <Button
                    variant={rotationAngle === 180 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRotationAngle(180)}
                    className="gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    180°
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Progress / Rotating */}
          {rotating && (
            <div className="flex items-center justify-center gap-3 py-4">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Rotating PDF pages…</span>
            </div>
          )}

          {/* Rotate Button */}
          {!rotating && (
            <Button
              onClick={rotatePdf}
              size="lg"
              className="w-full gap-2"
              disabled={!canRotate}
            >
              <RotateCw className="w-4 h-4" />
              Rotate PDF
            </Button>
          )}
        </>
      )}

      {/* Result */}
      {resultUrl && !rotating && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Rotation Complete</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-muted-foreground hover:text-destructive gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Start Over
            </Button>
          </div>

          <Card className="flex items-center gap-4 p-4 border-primary/30 bg-primary/5">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 shrink-0">
              <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{baseName}-rotated.pdf</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(resultSize)}
                {rotationMode === "selected" && (
                  <span className="ml-2">
                    ({selectedPages.size} page{selectedPages.size !== 1 ? "s" : ""} rotated by {getAngleLabel(rotationAngle)})
                  </span>
                )}
                {rotationMode === "all" && (
                  <span className="ml-2">
                    (All {pageCount} pages rotated by {getAngleLabel(rotationAngle)})
                  </span>
                )}
              </p>
            </div>
            <Button
              onClick={downloadResult}
              className="gap-1.5 shrink-0"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </Card>
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
