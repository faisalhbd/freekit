"use client"

import { useState, useRef, useCallback, useMemo, type DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Copy,
  Download,
  FileText,
  Loader2,
  RotateCcw,
  Check,
} from "lucide-react"

interface PageText {
  pageNumber: number
  text: string
}

interface ExtractionStats {
  totalPages: number
  totalCharacters: number
  totalWords: number
  totalLines: number
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function computeStats(pages: PageText[]): ExtractionStats {
  const allText = pages.map((p) => p.text).join("\n")
  return {
    totalPages: pages.length,
    totalCharacters: allText.length,
    totalWords: allText
      .split(/\s+/)
      .filter((w) => w.length > 0).length,
    totalLines: allText.split("\n").length,
  }
}

export function PdfToTextTool() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [extracting, setExtracting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [pageTexts, setPageTexts] = useState<PageText[]>([])
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [viewMode, setViewMode] = useState("all")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      return
    }
    try {
      const pdfjsLib = await import("pdfjs-dist")
      // Versioned CDN worker — empty workerSrc broke PDF loading in Next.js.
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
      const arrayBuffer = await selectedFile.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      setFile(selectedFile)
      setFileName(selectedFile.name)
      setFileSize(selectedFile.size)
      setPageCount(pdf.numPages)
      setPageTexts([])
      setError("")
      setProgress(0)
      setCopied(false)
      setViewMode("all")
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
    setFile(null)
    setFileName("")
    setFileSize(0)
    setPageCount(0)
    setPageTexts([])
    setError("")
    setProgress(0)
    setCopied(false)
    setViewMode("all")
  }, [])

  const extractText = useCallback(async () => {
    if (!file || extracting) return

    setError("")
    setExtracting(true)
    setProgress(0)
    setCopied(false)
    setPageTexts([])

    try {
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const totalPages = pdf.numPages
      const results: PageText[] = []

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()

        let lastY: number | null = null
        let pageText = ""

        for (const item of textContent.items) {
          const textItem = item as { str: string; transform: number[] }
          if (textItem.str === undefined) continue

          const y = textItem.transform[5]

          if (lastY !== null && Math.abs(y - lastY) > 2) {
            pageText += "\n"
          } else if (pageText.length > 0 && !pageText.endsWith("\n")) {
            pageText += " "
          }

          pageText += textItem.str
          lastY = y
        }

        results.push({ pageNumber: i, text: pageText })
        setProgress(Math.round((i / totalPages) * 100))
      }

      setPageTexts(results)
    } catch {
      setError("An error occurred while extracting text. The PDF may be corrupted or password-protected.")
    } finally {
      setExtracting(false)
    }
  }, [file, extracting])

  const allText = useMemo(() => {
    return pageTexts.map((p) => p.text).join("\n")
  }, [pageTexts])

  const stats = useMemo(() => {
    if (pageTexts.length === 0) return null
    return computeStats(pageTexts)
  }, [pageTexts])

  const handleCopy = useCallback(async () => {
    const textToCopy = viewMode === "all" ? allText : pageTexts.find((p) => p.pageNumber.toString() === viewMode)?.text ?? allText
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError("Failed to copy to clipboard.")
    }
  }, [viewMode, allText, pageTexts])

  const handleDownload = useCallback(() => {
    const textToDownload = viewMode === "all" ? allText : pageTexts.find((p) => p.pageNumber.toString() === viewMode)?.text ?? allText
    const blob = new Blob([textToDownload], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    const baseName = fileName ? fileName.replace(/\.pdf$/i, "") : "document"
    const pageSuffix = viewMode !== "all" ? `-page-${viewMode}` : ""
    link.download = `${baseName}${pageSuffix}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [viewMode, allText, pageTexts, fileName])

  const hasResults = pageTexts.length > 0 && !extracting

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

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Progress Bar */}
      {extracting && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Extracting text…
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

      {/* Extract Button */}
      {file && !extracting && !hasResults && (
        <Button onClick={extractText} size="lg" className="w-full gap-2">
          <FileText className="w-4 h-4" />
          Extract Text
        </Button>
      )}

      {/* Results Section */}
      {hasResults && (
        <div className="space-y-4">
          {/* Stats Bar */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{stats.totalPages}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Total Pages</p>
              </Card>
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{stats.totalCharacters.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Characters</p>
              </Card>
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{stats.totalWords.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Words</p>
              </Card>
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{stats.totalLines.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Lines</p>
              </Card>
            </div>
          )}

          {/* View Mode Tabs & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <Tabs value={viewMode} onValueChange={setViewMode}>
              <TabsList>
                <TabsTrigger value="all" className="text-xs sm:text-sm gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  All Pages
                </TabsTrigger>
                <TabsTrigger value="pages" className="text-xs sm:text-sm gap-1.5">
                  Page by Page
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-1.5"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download TXT
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-muted-foreground hover:text-destructive gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Start Over</span>
              </Button>
            </div>
          </div>

          {/* Text Output */}
          {viewMode === "all" && (
            <Card className="p-0 overflow-hidden">
              <Textarea
                readOnly
                value={allText}
                className="min-h-[300px] max-h-[500px] resize-y rounded-none border-0 focus-visible:ring-0 font-mono text-sm leading-relaxed"
              />
            </Card>
          )}

          {viewMode === "pages" && (
            <Card className="p-0 overflow-hidden">
              <Tabs defaultValue="1" className="w-full">
                <div className="border-b px-2 overflow-x-auto custom-scrollbar">
                  <TabsList className="h-auto bg-transparent p-0 gap-0">
                    {pageTexts.map((pt) => (
                      <TabsTrigger
                        key={pt.pageNumber}
                        value={pt.pageNumber.toString()}
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs px-3 py-2.5 whitespace-nowrap"
                      >
                        Page {pt.pageNumber}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {pageTexts.map((pt) => (
                  <TabsContent key={pt.pageNumber} value={pt.pageNumber.toString()} className="mt-0">
                    <Textarea
                      readOnly
                      value={pt.text}
                      className="min-h-[250px] max-h-[400px] resize-y rounded-none border-0 focus-visible:ring-0 font-mono text-sm leading-relaxed"
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </Card>
          )}

          {/* Success Banner */}
          <Card className="p-4 border-primary/30 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 shrink-0">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Text Extracted Successfully!</p>
                <p className="text-sm text-muted-foreground">
                  {pageCount} {pageCount === 1 ? "page" : "pages"} processed from {fileName}. {stats?.totalWords.toLocaleString()} words extracted.
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
          height: 6px;
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
