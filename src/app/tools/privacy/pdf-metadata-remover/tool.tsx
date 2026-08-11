"use client"

import { useState, useCallback, useRef } from "react"
import { FileX, Upload, Download, FileText, CheckCircle2, Loader2, Trash2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// ─── Types ──────────────────────────────────────────────────────────────────

interface PDFMetadata {
  title: string
  author: string
  subject: string
  keywords: string
  creator: string
  producer: string
  creationDate: string
  modificationDate: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  return (bytes / (1024 * 1024)).toFixed(2) + " MB"
}

function formatDate(d: Date | undefined): string {
  if (!d) return "—"
  try {
    return d.toLocaleString()
  } catch {
    return "—"
  }
}

const EMPTY_META: PDFMetadata = {
  title: "",
  author: "",
  subject: "",
  keywords: "",
  creator: "",
  producer: "",
  creationDate: "",
  modificationDate: "",
}

function emptyMetaLabel(value: string): string {
  return (value || "").length > 0 ? value : "(empty)"
}

// ─── Dynamic import helper ──────────────────────────────────────────────────

async function loadPdfLib() {
  const PDFDocument = (await import("pdf-lib")).PDFDocument
  return { PDFDocument }
}

// ─── Metadata Row ───────────────────────────────────────────────────────────

function MetaRow({ label, before, after }: { label: string; before: string; after: string }) {
  const changed = (before || "") !== (after || "")
  return (
    <div className="grid grid-cols-3 gap-3 py-2 border-b border-border last:border-0 text-sm">
      <span className="font-medium text-muted-foreground">{label}</span>
      <span className={changed ? "text-red-600 dark:text-red-400 line-through" : "text-foreground"}>
        {emptyMetaLabel(before)}
      </span>
      <span className={changed ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}>
        {emptyMetaLabel(after)}
      </span>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function PDFMetadataRemoverTool() {
  const [file, setFile] = useState<File | null>(null)
  const [beforeMeta, setBeforeMeta] = useState<PDFMetadata | null>(null)
  const [afterMeta, setAfterMeta] = useState<PDFMetadata | null>(null)
  const [loading, setLoading] = useState(false)
  const [cleaned, setCleaned] = useState(false)
  const [error, setError] = useState("")
  const [cleanedBlob, setCleanedBlob] = useState<Uint8Array | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (f: File) => {
    setFile(f)
    setBeforeMeta(null)
    setAfterMeta(null)
    setCleaned(false)
    setCleanedBlob(null)
    setError("")
    setLoading(true)

    try {
      const arrayBuffer = await f.arrayBuffer()
      const { PDFDocument } = await loadPdfLib()

      // Load and read metadata
      const doc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
      const title = (doc.getTitle() || "")
      const author = (doc.getAuthor() || "")
      const subject = (doc.getSubject() || "")
      const keywords = (doc.getKeywords() || "")
      const creator = (doc.getCreator() || "")
      const producer = (doc.getProducer() || "")
      const creationDate = doc.getCreationDate()
      const modDate = doc.getModificationDate()

      const meta: PDFMetadata = {
        title,
        author,
        subject,
        keywords,
        creator,
        producer,
        creationDate: formatDate(creationDate),
        modificationDate: formatDate(modDate),
      }
      setBeforeMeta(meta)
    } catch {
      setError("Failed to read the PDF. The file may be corrupted or password-protected.")
    } finally {
      setLoading(false)
    }
  }, [])

  const removeMetadata = async () => {
    if (!file) return
    setLoading(true)
    setError("")

    try {
      const arrayBuffer = await file.arrayBuffer()
      const { PDFDocument } = await loadPdfLib()

      const doc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })

      // Clear all metadata
      doc.setTitle(undefined)
      doc.setAuthor(undefined)
      doc.setSubject(undefined)
      doc.setKeywords(undefined)
      doc.setCreator(undefined)
      doc.setProducer(undefined)
      doc.setCreationDate(undefined)
      doc.setModificationDate(undefined)

      const pdfBytes = await doc.save()

      const afterM: PDFMetadata = {
        title: "",
        author: "",
        subject: "",
        keywords: "",
        creator: "",
        producer: "",
        creationDate: "",
        modificationDate: "",
      }
      setAfterMeta(afterM)
      setCleanedBlob(pdfBytes)
      setCleaned(true)

      // Auto download
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = file.name.replace(/\.pdf$/i, "") + "_cleaned.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      setError("Failed to clean the PDF. The file may be corrupted.")
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) processFile(f)
  }

  const redownload = () => {
    if (!cleanedBlob || !file) return
    const blob = new Blob([cleanedBlob], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = file.name.replace(/\.pdf$/i, "") + "_cleaned.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <FileX className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">PDF Metadata Remover</h3>
              <p className="text-sm text-muted-foreground">
                Strip all identifying metadata from PDF files in your browser
              </p>
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              file ? "border-emerald-500/50 bg-emerald-500/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) processFile(f)
              }}
            />
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="size-8 text-emerald-600 dark:text-emerald-400" />
                <div className="text-left">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                </div>
              </div>
            ) : (
              <>
                <Upload className="mx-auto size-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium">Drop a PDF file here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Only .pdf files are supported</p>
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2 py-4 text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
              <span className="text-sm">Processing PDF...</span>
            </div>
          )}

          {/* Before Metadata */}
          {beforeMeta && !loading && (
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold">Current Metadata</h4>
              <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
                <div className="grid grid-cols-2 gap-3 px-4 py-2 border-b border-border text-xs font-medium text-muted-foreground">
                  <span>Field</span>
                  <span>Value</span>
                </div>
                {(Object.entries(beforeMeta)).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-2 gap-3 px-4 py-2 border-b border-border last:border-0 text-sm">
                    <span className="font-medium text-muted-foreground capitalize">{key}</span>
                    <span className="truncate font-mono text-xs">{emptyMetaLabel(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {afterMeta && beforeMeta && (
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <ArrowRight className="size-4" />
                Before → After Comparison
              </h4>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="grid grid-cols-3 gap-3 px-4 py-2 border-b border-border text-xs font-medium text-muted-foreground">
                  <span>Field</span>
                  <span className="text-red-600 dark:text-red-400">Before</span>
                  <span className="text-emerald-600 dark:text-emerald-400">After</span>
                </div>
                <MetaRow label="Title" before={beforeMeta.title} after={afterMeta.title} />
                <MetaRow label="Author" before={beforeMeta.author} after={afterMeta.author} />
                <MetaRow label="Subject" before={beforeMeta.subject} after={afterMeta.subject} />
                <MetaRow label="Keywords" before={beforeMeta.keywords} after={afterMeta.keywords} />
                <MetaRow label="Creator" before={beforeMeta.creator} after={afterMeta.creator} />
                <MetaRow label="Producer" before={beforeMeta.producer} after={afterMeta.producer} />
                <MetaRow label="Creation Date" before={beforeMeta.creationDate} after={afterMeta.creationDate} />
                <MetaRow label="Modification Date" before={beforeMeta.modificationDate} after={afterMeta.modificationDate} />
              </div>
            </div>
          )}

          {/* Success */}
          {cleaned && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
              <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  All metadata removed successfully!
                </p>
                <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">
                  {cleanedBlob ? formatSize(cleanedBlob.length) : ""} — downloaded automatically
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={redownload} className="gap-1.5 shrink-0">
                <Download className="size-3.5" /> Redownload
              </Button>
            </div>
          )}

          {/* Remove Button */}
          {beforeMeta && !cleaned && !loading && (
            <Button onClick={removeMetadata} className="mt-6 w-full gap-2">
              <Trash2 className="size-4" /> Remove All Metadata
            </Button>
          )}
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <FileX className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Processed in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              Your PDF is loaded and processed using pdf-lib entirely in your browser. The file is never uploaded to any server.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}