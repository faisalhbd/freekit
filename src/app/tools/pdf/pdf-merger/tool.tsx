"use client"

import { useState, useRef, useCallback, type DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Download,
  Trash2,
  GripVertical,
  FileText,
  ArrowUp,
  ArrowDown,
  Loader2,
  Merge,
  RotateCcw,
} from "lucide-react"

interface PdfFileEntry {
  id: string
  file: File
  name: string
  size: number
  pageCount: number
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

export function PdfMergerTool() {
  const [files, setFiles] = useState<PdfFileEntry[]>([])
  const [merging, setMerging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mergedUrl, setMergedUrl] = useState<string | null>(null)
  const [mergedFileName, setMergedFileName] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)
  const [dragItemIndex, setDragItemIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFiles = useCallback(async (fileList: FileList | File[]) => {
    const newEntries: PdfFileEntry[] = []
    const pdfFiles = Array.from(fileList).filter(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    )

    for (const file of pdfFiles) {
      try {
        const { PDFDocument } = await import("pdf-lib")
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
        const pageCount = pdfDoc.getPageCount()
        newEntries.push({
          id: crypto.randomUUID(),
          file,
          name: file.name,
          size: file.size,
          pageCount,
        })
      } catch {
        // Skip files that cannot be parsed
      }
    }

    if (newEntries.length > 0) {
      setFiles((prev) => [...prev, ...newEntries])
      setMergedUrl(null)
    }
  }, [])

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

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    setMergedUrl(null)
  }, [])

  const moveFile = useCallback((index: number, direction: "up" | "down") => {
    setFiles((prev) => {
      const next = [...prev]
      const newIndex = direction === "up" ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= next.length) return prev
      ;[next[index], next[newIndex]] = [next[newIndex], next[index]]
      return next
    })
    setMergedUrl(null)
  }, [])

  // Drag-to-reorder handlers
  const handleItemDragStart = useCallback((index: number) => {
    setDragItemIndex(index)
  }, [])

  const handleItemDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault()
      if (dragItemIndex !== null && dragItemIndex !== index) {
        setDragOverIndex(index)
      }
    },
    [dragItemIndex]
  )

  const handleItemDrop = useCallback(
    (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
      e.preventDefault()
      e.stopPropagation()
      if (dragItemIndex !== null && dragItemIndex !== dropIndex) {
        setFiles((prev) => {
          const next = [...prev]
          const [removed] = next.splice(dragItemIndex, 1)
          next.splice(dropIndex, 0, removed)
          return next
        })
        setMergedUrl(null)
      }
      setDragItemIndex(null)
      setDragOverIndex(null)
    },
    [dragItemIndex]
  )

  const handleItemDragEnd = useCallback(() => {
    setDragItemIndex(null)
    setDragOverIndex(null)
  }, [])

  const clearAll = useCallback(() => {
    if (mergedUrl) {
      URL.revokeObjectURL(mergedUrl)
    }
    setFiles([])
    setMergedUrl(null)
    setMergedFileName("")
    setProgress(0)
  }, [mergedUrl])

  const mergePdfs = useCallback(async () => {
    if (files.length < 2 || merging) return

    setMerging(true)
    setProgress(0)
    if (mergedUrl) {
      URL.revokeObjectURL(mergedUrl)
      setMergedUrl(null)
    }

    try {
      const { PDFDocument } = await import("pdf-lib")
      const mergedPdf = await PDFDocument.create()

      for (let i = 0; i < files.length; i++) {
        const arrayBuffer = await files[i].file.arrayBuffer()
        const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
        const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices())
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      setMergedUrl(url)
      setMergedFileName("merged-document.pdf")
    } catch {
      // Error handled silently — user can retry
    } finally {
      setMerging(false)
    }
  }, [files, merging, mergedUrl])

  const downloadMerged = useCallback(() => {
    if (!mergedUrl) return
    const link = document.createElement("a")
    link.href = mergedUrl
    link.download = mergedFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [mergedUrl, mergedFileName])

  const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0)
  const totalSize = files.reduce((sum, f) => sum + f.size, 0)

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
            `relative flex flex-col items-center justify-center gap-3 p-8 sm:p-12 cursor-pointer transition-colors border-2 border-dashed rounded-xl m-0 `
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
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          <div
            className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10"
          >
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">
              {isDragOver ? "Drop your PDF files here" : "Drag & drop PDF files here"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse from your device
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            PDF files only
          </Badge>
        </div>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-foreground">
                Files to Merge ({files.length})
              </h3>
              <span className="text-sm text-muted-foreground">
                {totalPages} pages · {formatFileSize(totalSize)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Clear All
            </Button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {files.map((file, index) => (
              <div
                key={file.id}
                draggable
                onDragStart={() => handleItemDragStart(index)}
                onDragOver={(e) => handleItemDragOver(e, index)}
                onDrop={(e) => handleItemDrop(e, index)}
                onDragEnd={handleItemDragEnd}
                className={
                  `flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition-all `
                  +
                  (dragOverIndex === index
                    ? "border-primary bg-primary/5"
                    : dragItemIndex === index
                      ? "opacity-50"
                      : "hover:border-primary/50")
                }
              >
                {/* Drag Handle */}
                <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors">
                  <GripVertical className="w-4 h-4" />
                </div>

                {/* File Icon */}
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-100 dark:bg-red-950/40 shrink-0">
                  <FileText className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {file.pageCount} {file.pageCount === 1 ? "page" : "pages"} · {formatFileSize(file.size)}
                  </p>
                </div>

                {/* Reorder Buttons */}
                <div className="flex items-center gap-0.5 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={index === 0}
                    onClick={(e) => {
                      e.stopPropagation()
                      moveFile(index, "up")
                    }}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={index === files.length - 1}
                    onClick={(e) => {
                      e.stopPropagation()
                      moveFile(index, "down")
                    }}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(file.id)
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {merging && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Merging PDFs…
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

      {/* Action Buttons */}
      {files.length >= 2 && !merging && (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={mergePdfs}
            size="lg"
            className="flex-1 gap-2"
          >
            <Merge className="w-4 h-4" />
            Merge {files.length} PDFs
          </Button>
        </div>
      )}

      {files.length === 1 && !merging && (
        <p className="text-sm text-center text-muted-foreground">
          Add at least one more PDF file to merge.
        </p>
      )}

      {/* Download Result */}
      {mergedUrl && !merging && (
        <Card className="p-4 border-primary/30 bg-primary/5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 shrink-0">
              <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-foreground">Merge Complete!</p>
              <p className="text-sm text-muted-foreground">
                {files.length} files combined into {mergedFileName} ({formatFileSize(totalSize)})
              </p>
            </div>
            <Button onClick={downloadMerged} className="gap-2 shrink-0">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </Card>
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
