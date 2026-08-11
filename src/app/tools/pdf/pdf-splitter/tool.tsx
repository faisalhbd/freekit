"use client"

import { useState, useRef, useCallback, useMemo, type DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Download,
  Scissors,
  FileText,
  Loader2,
  RotateCcw,
  Layers,
} from "lucide-react"

interface SplitResult {
  name: string
  url: string
  pageCount: number
  size: number
  pages: number[]
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function parsePageRanges(input: string, maxPage: number): number[] {
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
  return Array.from(pages).sort((a, b) => a - b)
}

export function PdfSplitterTool() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null)
  const [splitting, setSplitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [results, setResults] = useState<SplitResult[]>([])

  // Split mode state
  const [rangeInput, setRangeInput] = useState("")
  const [chunkSize, setChunkSize] = useState("")
  const [singlePage, setSinglePage] = useState("")
  const [activeTab, setActiveTab] = useState("range")
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
      setResults([])
      setRangeInput("")
      setChunkSize("")
      setSinglePage("")
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

  const clearAll = useCallback(() => {
    for (const r of results) {
      URL.revokeObjectURL(r.url)
    }
    setFile(null)
    setFileName("")
    setFileSize(0)
    setPageCount(0)
    setPdfBytes(null)
    setResults([])
    setRangeInput("")
    setChunkSize("")
    setSinglePage("")
    setError("")
    setProgress(0)
  }, [results])

  const baseName = useMemo(() => {
    if (!fileName) return "document"
    return fileName.replace(/\.pdf$/i, "")
  }, [fileName])

  const splitPdf = useCallback(async () => {
    if (!pdfBytes || splitting) return

    let pagesToExtract: number[][] = []

    if (activeTab === "range") {
      const parsed = parsePageRanges(rangeInput, pageCount)
      if (parsed.length === 0) {
        setError("Please enter valid page ranges, e.g. 1-3, 5, 7-10")
        return
      }
      pagesToExtract = [parsed]
    } else if (activeTab === "chunk") {
      const n = parseInt(chunkSize, 10)
      if (isNaN(n) || n < 1) {
        setError("Please enter a valid number of pages per chunk.")
        return
      }
      for (let i = 0; i < pageCount; i += n) {
        const chunk: number[] = []
        for (let j = i; j < Math.min(i + n, pageCount); j++) {
          chunk.push(j + 1)
        }
        pagesToExtract.push(chunk)
      }
    } else if (activeTab === "single") {
      const p = parseInt(singlePage, 10)
      if (isNaN(p) || p < 1 || p > pageCount) {
        setError(`Please enter a valid page number between 1 and ${pageCount}.`)
        return
      }
      pagesToExtract = [[p]]
    }

    setError("")
    setSplitting(true)
    setProgress(0)

    // Revoke previous result URLs
    for (const r of results) {
      URL.revokeObjectURL(r.url)
    }
    setResults([])

    try {
      const { PDFDocument } = await import("pdf-lib")
      const srcDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
      const newResults: SplitResult[] = []

      for (let i = 0; i < pagesToExtract.length; i++) {
        const pageIndices = pagesToExtract[i].map((p) => p - 1)
        const newPdf = await PDFDocument.create()
        const copiedPages = await newPdf.copyPages(srcDoc, pageIndices)
        copiedPages.forEach((page) => {
          newPdf.addPage(page)
        })

        const savedBytes = await newPdf.save()
        const blob = new Blob([savedBytes], { type: "application/pdf" })
        const url = URL.createObjectURL(blob)

        let name: string
        if (pagesToExtract.length === 1) {
          if (activeTab === "single") {
            name = `${baseName}-page-${pagesToExtract[0][0]}.pdf`
          } else {
            name = `${baseName}-split.pdf`
          }
        } else {
          name = `${baseName}-part-${i + 1}.pdf`
        }

        newResults.push({
          name,
          url,
          pageCount: pagesToExtract[i].length,
          size: savedBytes.length,
          pages: pagesToExtract[i],
        })

        setProgress(Math.round(((i + 1) / pagesToExtract.length) * 100))
      }

      setResults(newResults)
    } catch {
      setError("An error occurred while splitting the PDF. Please try again.")
    } finally {
      setSplitting(false)
    }
  }, [pdfBytes, splitting, activeTab, rangeInput, chunkSize, singlePage, pageCount, baseName, results])

  const downloadFile = useCallback((result: SplitResult) => {
    const link = document.createElement("a")
    link.href = result.url
    link.download = result.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const downloadAll = useCallback(() => {
    for (const r of results) {
      downloadFile(r)
    }
  }, [results, downloadFile])

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

      {/* Page Cards Grid */}
      {file && pageCount > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground text-sm">
              Document Pages ({pageCount})
            </h3>
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <div
                key={p}
                className="flex items-center justify-center h-10 rounded-lg border border-border bg-card text-xs font-medium text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Split Mode Tabs */}
      {file && (
        <Card className="p-4 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="range" className="text-xs sm:text-sm gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">By Page Range</span>
                <span className="sm:hidden">Range</span>
              </TabsTrigger>
              <TabsTrigger value="chunk" className="text-xs sm:text-sm gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Every N Pages</span>
                <span className="sm:hidden">Chunks</span>
              </TabsTrigger>
              <TabsTrigger value="single" className="text-xs sm:text-sm gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Single Page</span>
                <span className="sm:hidden">One Page</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="range" className="mt-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Page Ranges
                </label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Enter ranges like 1-3, 5, 7-10 to extract specific pages
                </p>
              </div>
              <Input
                type="text"
                placeholder="e.g. 1-3, 5, 7-10"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                className="font-mono"
              />
              {rangeInput && (
                <p className="text-xs text-muted-foreground">
                  {(() => {
                    const parsed = parsePageRanges(rangeInput, pageCount)
                    if (parsed.length === 0) return "No valid pages found"
                    return `${parsed.length} page${parsed.length !== 1 ? "s" : ""} selected: ${parsed.join(", ")}`
                  })()}
                </p>
              )}
            </TabsContent>

            <TabsContent value="chunk" className="mt-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Pages per Chunk
                </label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Split the document into chunks of N pages each
                </p>
              </div>
              <Input
                type="number"
                min="1"
                max={pageCount}
                placeholder="e.g. 5"
                value={chunkSize}
                onChange={(e) => setChunkSize(e.target.value)}
                className="font-mono max-w-xs"
              />
              {chunkSize && !isNaN(parseInt(chunkSize, 10)) && parseInt(chunkSize, 10) >= 1 && (
                <p className="text-xs text-muted-foreground">
                  Will produce {Math.ceil(pageCount / parseInt(chunkSize, 10))} file{Math.ceil(pageCount / parseInt(chunkSize, 10)) !== 1 ? "s" : ""}
                </p>
              )}
            </TabsContent>

            <TabsContent value="single" className="mt-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Page Number
                </label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select a single page to extract (1 – {pageCount})
                </p>
              </div>
              <Input
                type="number"
                min="1"
                max={pageCount}
                placeholder={`e.g. 3 (1-${pageCount})`}
                value={singlePage}
                onChange={(e) => setSinglePage(e.target.value)}
                className="font-mono max-w-xs"
              />
            </TabsContent>
          </Tabs>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Progress Bar */}
      {splitting && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Splitting PDF…
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

      {/* Split Button */}
      {file && !splitting && !results.length && (
        <Button
          onClick={splitPdf}
          size="lg"
          className="w-full gap-2"
          disabled={
            (activeTab === "range" && !rangeInput) ||
            (activeTab === "chunk" && !chunkSize) ||
            (activeTab === "single" && !singlePage)
          }
        >
          <Scissors className="w-4 h-4" />
          Split PDF
        </Button>
      )}

      {/* Results */}
      {results.length > 0 && !splitting && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              Split Results ({results.length} {results.length === 1 ? "file" : "files"})
            </h3>
            <div className="flex gap-2">
              {results.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadAll}
                  className="gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download All
                </Button>
              )}
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
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {results.map((result, index) => (
              <Card
                key={index}
                className="flex items-center gap-3 p-3 border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 shrink-0">
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {result.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {result.pageCount} {result.pageCount === 1 ? "page" : "pages"} · {formatFileSize(result.size)}
                    <span className="ml-2">
                      (Pages: {result.pages.join(", ")})
                    </span>
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadFile(result)}
                  className="gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </Card>
            ))}
          </div>

          <Card className="p-4 border-primary/30 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 shrink-0">
                <Scissors className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Split Complete!</p>
                <p className="text-sm text-muted-foreground">
                  {fileName} has been split into {results.length} {results.length === 1 ? "file" : "files"}. Total output size: {formatFileSize(results.reduce((sum, r) => sum + r.size, 0))}
                </p>
              </div>
            </div>
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
