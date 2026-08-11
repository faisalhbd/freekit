"use client"

import { useState, useRef, useCallback, useMemo, type DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Upload,
  Copy,
  Download,
  FileText,
  Loader2,
  RotateCcw,
  Check,
  Heading,
  List,
  Type,
  File,
} from "lucide-react"

interface PageData {
  pageNumber: number
  text: string
  markdown: string
}

interface ExtractionStats {
  totalPages: number
  headingsFound: number
  listsFound: number
  paragraphsFound: number
  totalCharacters: number
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function convertPageTextToMarkdown(textItems: { str: string; fontSize: number; height: number }[]): string {
  if (textItems.length === 0) return ""

  const fontSizeThresholds = textItems.map((item) => item.fontSize).sort((a, b) => b - a)
  const maxFontSize = fontSizeThresholds[0] || 12
  const medianFontSize = fontSizeThresholds[Math.floor(fontSizeThresholds.length / 3)] || 10

  const lines: string[] = []
  let currentLine = ""
  let lastY: number | null = null
  let lineFontSizes: number[] = []

  for (const item of textItems) {
    const trimmedStr = (item.str || "").trim()
    if (!trimmedStr) continue

    if (lastY !== null && Math.abs(item.height - lastY) > 3) {
      if (currentLine) {
        const avgFontSize = lineFontSizes.length > 0
          ? lineFontSizes.reduce((sum, s) => sum + s, 0) / lineFontSizes.length
          : 0
        lines.push({ text: currentLine, avgFontSize })
      }
      currentLine = trimmedStr
      lineFontSizes = [item.fontSize]
    } else {
      if (currentLine) currentLine += " "
      currentLine += trimmedStr
      lineFontSizes.push(item.fontSize)
    }
    lastY = item.height
  }

  if (currentLine) {
    const avgFontSize = lineFontSizes.length > 0
      ? lineFontSizes.reduce((sum, s) => sum + s, 0) / lineFontSizes.length
      : 0
    lines.push({ text: currentLine, avgFontSize })
  }

  let markdown = ""
  let prevLineHeading = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = (line.text || "").trim()
    if (!trimmed) continue

    const isLargeHeading = line.avgFontSize >= maxFontSize * 0.85 && maxFontSize > medianFontSize * 1.2
    const isMediumHeading = !isLargeHeading && line.avgFontSize >= medianFontSize * 1.15
    const isListBullet = /^[•\-–—]\s/.test(trimmed) || /^\d+[\.\)]\s/.test(trimmed)

    if (prevLineHeading) markdown += "\n"

    if (isLargeHeading) {
      markdown += `# ${trimmed.replace(/^[•\-–—]\s*/, "")}\n\n`
      prevLineHeading = true
    } else if (isMediumHeading) {
      markdown += `## ${trimmed.replace(/^[•\-–—]\s*/, "")}\n\n`
      prevLineHeading = true
    } else if (isListBullet) {
      const cleanedBullet = trimmed.replace(/^[•\-–—]\s*/, "- ")
      markdown += `${cleanedBullet}\n`
      prevLineHeading = false
    } else {
      markdown += `${trimmed}\n`
      prevLineHeading = false
    }
  }

  return (markdown || "").trim()
}

export function PdfToMarkdownTool() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [extracting, setExtracting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [pageData, setPageData] = useState<PageData[]>([])
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Please upload a valid PDF file.")
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
      setPageData([])
      setError("")
      setProgress(0)
      setCopied(false)
    } catch {
      setError("Failed to read the PDF. The file may be corrupted or password-protected.")
      toast.error("Failed to read the PDF file.")
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
    setPageData([])
    setError("")
    setProgress(0)
    setCopied(false)
  }, [])

  const extractAndConvert = useCallback(async () => {
    if (!file || extracting) return

    setError("")
    setExtracting(true)
    setProgress(0)
    setCopied(false)
    setPageData([])

    try {
      const pdfjsLib = await import("pdfjs-dist")
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const totalPages = pdf.numPages
      const results: PageData[] = []

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()

        const textItems: { str: string; fontSize: number; height: number }[] = []
        for (const item of textContent.items) {
          const textItem = item as { str: string; transform: number[] }
          if (textItem.str === undefined) continue
          const trimmed = (textItem.str || "").trim()
          if (!trimmed) continue
          textItems.push({
            str: trimmed,
            fontSize: Math.abs(textItem.transform[0]) || 12,
            height: textItem.transform[5],
          })
        }

        const rawText = textItems.map((t) => t.str).join(" ")
        const markdown = convertPageTextToMarkdown(textItems)

        results.push({ pageNumber: i, text: rawText, markdown })
        setProgress(Math.round((i / totalPages) * 100))
      }

      setPageData(results)
      toast.success(`Successfully converted ${totalPages} pages to Markdown!`)
    } catch {
      setError("An error occurred during conversion. The PDF may be corrupted or password-protected.")
      toast.error("Conversion failed. Please try another file.")
    } finally {
      setExtracting(false)
    }
  }, [file, extracting])

  const allMarkdown = useMemo(() => {
    return pageData.map((p) => p.markdown).join("\n\n")
  }, [pageData])

  const stats = useMemo((): ExtractionStats | null => {
    if (pageData.length === 0) return null
    const fullMd = allMarkdown
    const headings = (fullMd.match(/^#{1,2}\s/mg) || []).length
    const lists = (fullMd.match(/^- /mg) || []).length
    const paragraphs = fullMd.split(/\n\n+/).filter((p) => (p || "").trim().length > 0 && !p.startsWith("#")).length
    return {
      totalPages: pageData.length,
      headingsFound: headings,
      listsFound: lists,
      paragraphsFound: paragraphs,
      totalCharacters: fullMd.length,
    }
  }, [pageData, allMarkdown])

  const handleCopy = useCallback(async () => {
    if (!allMarkdown) return
    try {
      await navigator.clipboard.writeText(allMarkdown)
      setCopied(true)
      toast.success("Markdown copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy to clipboard.")
    }
  }, [allMarkdown])

  const handleDownload = useCallback(() => {
    if (!allMarkdown) return
    const blob = new Blob([allMarkdown], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    const baseName = fileName ? fileName.replace(/\.pdf$/i, "") : "document"
    link.download = `${baseName}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Markdown file downloaded!")
  }, [allMarkdown, fileName])

  const hasResults = pageData.length > 0 && !extracting

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card className="p-0 overflow-hidden">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !file && fileInputRef.current?.click()}
          className="relative flex flex-col items-center justify-center gap-3 p-8 sm:p-12 transition-colors border-2 border-dashed rounded-xl m-0"
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
                Change
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Progress */}
      {extracting && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Converting PDF to Markdown… Page {Math.round((progress / 100) * pageCount)} of {pageCount}
            </span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Extract Button */}
      {file && !extracting && !hasResults && (
        <Button onClick={extractAndConvert} size="lg" className="w-full gap-2">
          <FileText className="w-4 h-4" />
          Convert to Markdown
        </Button>
      )}

      {/* Results */}
      {hasResults && (
        <div className="space-y-4">
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{stats.totalPages}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Pages</p>
              </Card>
              <Card className="p-3 text-center">
                <div className="flex items-center justify-center">
                  <Heading className="w-4 h-4 text-primary mr-1.5" />
                  <p className="text-2xl font-bold text-foreground">{stats.headingsFound}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Headings</p>
              </Card>
              <Card className="p-3 text-center">
                <div className="flex items-center justify-center">
                  <List className="w-4 h-4 text-primary mr-1.5" />
                  <p className="text-2xl font-bold text-foreground">{stats.listsFound}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">List Items</p>
              </Card>
              <Card className="p-3 text-center">
                <div className="flex items-center justify-center">
                  <Type className="w-4 h-4 text-primary mr-1.5" />
                  <p className="text-2xl font-bold text-foreground">{stats.paragraphsFound}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Paragraphs</p>
              </Card>
              <Card className="p-3 text-center col-span-2 sm:col-span-1">
                <div className="flex items-center justify-center">
                  <File className="w-4 h-4 text-primary mr-1.5" />
                  <p className="text-2xl font-bold text-foreground">{stats.totalCharacters.toLocaleString()}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Characters</p>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1.5">
                <Check className="w-3 h-3 text-emerald-500" />
                Conversion Complete
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied!" : "Copy Markdown"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Download .md
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

          {/* Markdown Output */}
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <span className="text-sm font-medium text-foreground">Markdown Output</span>
              <Badge variant="outline" className="text-xs font-mono">.md</Badge>
            </div>
            <Textarea
              readOnly
              value={allMarkdown}
              className="min-h-[350px] max-h-[600px] resize-y rounded-none border-0 focus-visible:ring-0 font-mono text-sm leading-relaxed"
              placeholder="Your Markdown will appear here..."
            />
          </Card>

          {/* Success Banner */}
          <Card className="p-4 border-primary/30 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 shrink-0">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground">PDF Converted to Markdown!</p>
                <p className="text-sm text-muted-foreground">
                  {pageCount} {pageCount === 1 ? "page" : "pages"} processed. Found {stats?.headingsFound} headings, {stats?.listsFound} list items, and {stats?.paragraphsFound} paragraphs.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
