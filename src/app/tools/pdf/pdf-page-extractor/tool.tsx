"use client"

import { useState, useRef, useCallback, useMemo, type DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Upload,
  Download,
  FileOutput,
  FileText,
  Loader2,
  RotateCcw,
  CheckSquare,
  Square,
} from "lucide-react"

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function parsePageRanges(input: string, maxPage: number): Set<number> {
  const pages = new Set<number>()
  const parts = input.split(",")
  for (const part of parts) {
    const trimmed = part.replace(/\s/g, "")
    if (!trimmed) continue
    if (trimmed.includes("-")) {
      const [startStr, endStr] = trimmed.split("-")
      const start = parseInt(startStr, 10)
      const end = parseInt(endStr, 10)
      if (!isNaN(start) && !isNaN(end) && start >= 1 && end <= maxPage && start <= end) {
        for (let i = start; i <= end; i++) {
          pages.add(i)
        }
      }
    } else {
      const num = parseInt(trimmed, 10)
      if (!isNaN(num) && num >= 1 && num <= maxPage) {
        pages.add(num)
      }
    }
  }
  return pages
}

export function PdfPageExtractorTool() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null)
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set())
  const [extracting, setExtracting] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [rangeInput, setRangeInput] = useState("")
  const [error, setError] = useState("")
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [resultName, setResultName] = useState("")
  const [resultSize, setResultSize] = useState(0)

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
      setRangeInput("")
      setError("")
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl)
      }
      setResultUrl(null)
      setResultName("")
      setResultSize(0)
    } catch {
      setError("Failed to read the PDF. The file may be corrupted or password-protected.")
    }
  }, [resultUrl])

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

  const togglePage = useCallback((page: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev)
      if (next.has(page)) {
        next.delete(page)
      } else {
        next.add(page)
      }
      return next
    })
  }, [])

  const selectAll = useCallback(() => {
    setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i + 1)))
  }, [pageCount])

  const deselectAll = useCallback(() => {
    setSelectedPages(new Set())
  }, [])

  const applyRangeInput = useCallback(() => {
    if (!rangeInput || pageCount === 0) return
    const parsed = parsePageRanges(rangeInput, pageCount)
    if (parsed.size > 0) {
      setSelectedPages(parsed)
      setError("")
    } else {
      setError(`No valid pages found. Please enter numbers between 1 and ${pageCount}.`)
    }
  }, [rangeInput, pageCount])

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
    setRangeInput("")
    setError("")
    setResultUrl(null)
    setResultName("")
    setResultSize(0)
  }, [resultUrl])

  const baseName = useMemo(() => {
    if (!fileName) return "document"
    return fileName.replace(/\.pdf$/i, "")
  }, [fileName])

  const extractPages = useCallback(async () => {
    if (!pdfBytes || extracting || selectedPages.size === 0) return

    setError("")
    setExtracting(true)

    // Revoke previous result URL
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl)
      setResultUrl(null)
    }

    try {
      const { PDFDocument } = await import("pdf-lib")
      const srcDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
      const sortedPages = Array.from(selectedPages).sort((a, b) => a - b)
      const selectedIndices = sortedPages.map((p) => p - 1)

      const newPdf = await PDFDocument.create()
      const copiedPages = await newPdf.copyPages(srcDoc, selectedIndices)
      copiedPages.forEach((page) => {
        newPdf.addPage(page)
      })

      const savedBytes = await newPdf.save()
      const blob = new Blob([savedBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      setResultUrl(url)
      setResultName(`${baseName}-extracted.pdf`)
      setResultSize(savedBytes.length)
    } catch {
      setError("An error occurred while extracting pages. Please try again.")
    } finally {
      setExtracting(false)
    }
  }, [pdfBytes, extracting, selectedPages, resultUrl, baseName])

  const downloadResult = useCallback(() => {
    if (!resultUrl) return
    const link = document.createElement("a")
    link.href = resultUrl
    link.download = resultName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [resultUrl, resultName])

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

      {/* Page Selection Controls */}
      {file && pageCount > 0 && (
        <Card className="p-4 sm:p-6 space-y-4">
          {/* Header with Select All / Deselect All */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <FileOutput className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground text-sm">
                Select Pages to Extract
              </h3>
              <Badge variant="secondary" className="text-xs">
                {selectedPages.size} of {pageCount} selected
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={selectAll}
                className="gap-1.5 text-xs"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={deselectAll}
                className="gap-1.5 text-xs"
              >
                <Square className="w-3.5 h-3.5" />
                Deselect All
              </Button>
            </div>
          </div>

          {/* Quick Range Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Quick Range Input
            </label>
            <p className="text-xs text-muted-foreground">
              Enter page numbers or ranges like 1-5, 8, 10-12, then click Apply
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="e.g. 1-5, 8, 10-12"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    applyRangeInput()
                  }
                }}
                className="font-mono flex-1"
              />
              <Button
                variant="secondary"
                size="default"
                onClick={applyRangeInput}
                disabled={!rangeInput}
                className="shrink-0"
              >
                Apply
              </Button>
            </div>
            {rangeInput && (
              <p className="text-xs text-muted-foreground">
                {(() => {
                  const parsed = parsePageRanges(rangeInput, pageCount)
                  if (parsed.size === 0) return "No valid pages found"
                  return `${parsed.size} page${parsed.size !== 1 ? "s" : ""} will be selected: ${Array.from(parsed).sort((a, b) => a - b).join(", ")}`
                })()}
              </p>
            )}
          </div>

          {/* Page Cards Grid */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Click pages to select or deselect them
            </p>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => {
                const isSelected = selectedPages.has(p)
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePage(p)}
                    className={
                      `flex items-center justify-center h-10 rounded-lg border text-xs font-medium transition-all duration-150 ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`
                    }
                  >
                    {isSelected ? (
                      <CheckSquare className="w-3 h-3 mr-1" />
                    ) : null}
                    {p}
                  </button>
                )
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Extract Button */}
      {file && !extracting && !resultUrl && (
        <Button
          onClick={extractPages}
          size="lg"
          className="w-full gap-2"
          disabled={selectedPages.size === 0}
        >
          <FileOutput className="w-4 h-4" />
          Extract {selectedPages.size} {selectedPages.size === 1 ? "Page" : "Pages"}
        </Button>
      )}

      {/* Loading State */}
      {extracting && (
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 py-4">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm font-medium text-foreground">Extracting pages…</span>
          </div>
        </div>
      )}

      {/* Result */}
      {resultUrl && !extracting && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-semibold text-foreground">Extraction Complete</h3>
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
              <FileOutput className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{resultName}</p>
              <p className="text-sm text-muted-foreground">
                {selectedPages.size} {selectedPages.size === 1 ? "page" : "pages"} extracted · {formatFileSize(resultSize)}
              </p>
            </div>
            <Button
              variant="default"
              size="default"
              onClick={downloadResult}
              className="gap-2 shrink-0"
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
