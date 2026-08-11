"use client"

import { useState, useRef, useCallback, useMemo, type DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import {
  Upload,
  Download,
  FolderOpen,
  Loader2,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  File,
  FileText,
  FileCode,
  ImageIcon,
  Folder,
  Archive,
  DownloadCloud,
  X,
} from "lucide-react"
import JSZip from "jszip"

interface ZipEntry {
  path: string
  name: string
  isDir: boolean
  size: number
  date: Date | null
  compressedSize: number
  content: string | null
  blob: Blob | null
}

interface TreeNode {
  name: string
  path: string
  isDir: boolean
  size: number
  children: TreeNode[]
  entry: ZipEntry | null
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function getFileTypeCategory(name: string): "text" | "image" | "code" | "archive" | "other" {
  const lower = (name || "").toLowerCase()
  const textExts = [".txt", ".csv", ".md", ".log", ".rtf", ".xml"]
  const codeExts = [".js", ".ts", ".jsx", ".tsx", ".json", ".html", ".css", ".scss", ".less", ".py", ".java", ".c", ".cpp", ".h", ".hpp", ".rb", ".php", ".go", ".rs", ".swift", ".kt", ".yml", ".yaml", ".toml", ".ini", ".cfg", ".env", ".sh", ".bat", ".sql", ".graphql", ".vue", ".svelte"]
  const imageExts = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".svg", ".ico", ".avif"]
  const archiveExts = [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"]

  if (textExts.some((ext) => lower.endsWith(ext))) return "text"
  if (codeExts.some((ext) => lower.endsWith(ext))) return "code"
  if (imageExts.some((ext) => lower.endsWith(ext))) return "image"
  if (archiveExts.some((ext) => lower.endsWith(ext))) return "archive"
  return "other"
}

function isTextFile(name: string): boolean {
  const cat = getFileTypeCategory(name)
  return cat === "text" || cat === "code"
}

function isImageFile(name: string): boolean {
  return getFileTypeCategory(name) === "image"
}

function getFileIcon(name: string, isDir: boolean) {
  if (isDir) return <Folder className="w-4 h-4 text-amber-500 fill-amber-500/20" />
  const cat = getFileTypeCategory(name)
  switch (cat) {
    case "text":
      return <FileText className="w-4 h-4 text-blue-500" />
    case "code":
      return <FileCode className="w-4 h-4 text-emerald-500" />
    case "image":
      return <ImageIcon className="w-4 h-4 text-purple-500" />
    case "archive":
      return <Archive className="w-4 h-4 text-orange-500" />
    default:
      return <File className="w-4 h-4 text-muted-foreground" />
  }
}

function buildTree(entries: ZipEntry[]): TreeNode {
  const root: TreeNode = { name: "/", path: "", isDir: true, size: 0, children: [], entry: null }

  for (const entry of entries) {
    if (entry.isDir) continue

    const parts = entry.path.split("/").filter(Boolean)
    let current = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isLast = i === parts.length - 1
      const childPath = parts.slice(0, i + 1).join("/")

      let existing = current.children.find((c) => c.name === part)
      if (!existing) {
        existing = {
          name: part,
          path: childPath,
          isDir: !isLast,
          size: isLast ? entry.size : 0,
          children: [],
          entry: isLast ? entry : null,
        }
        current.children.push(existing)
      }
      current = existing
    }
  }

  // Sort: directories first, then files, alphabetically
  function sortNodes(nodes: TreeNode[]) {
    nodes.sort((a, b) => {
      if (a.isDir && !b.isDir) return -1
      if (!a.isDir && b.isDir) return 1
      return (a.name || "").localeCompare(b.name || "")
    })
    for (const node of nodes) {
      sortNodes(node.children)
    }
  }
  sortNodes(root.children)

  return root
}

export function ZipExtractTool() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState(0)
  const [extracting, setExtracting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [entries, setEntries] = useState<ZipEntry[]>([])
  const [selectedEntry, setSelectedEntry] = useState<ZipEntry | null>(null)
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set([""]))
  const [error, setError] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const tree = useMemo(() => {
    if (entries.length === 0) return null
    return buildTree(entries)
  }, [entries])

  const stats = useMemo(() => {
    if (entries.length === 0) return null
    const files = entries.filter((e) => !e.isDir)
    const totalSize = files.reduce((sum, e) => sum + e.size, 0)
    const totalCompressed = files.reduce((sum, e) => sum + e.compressedSize, 0)
    const dirs = entries.filter((e) => e.isDir).length
    return {
      fileCount: files.length,
      folderCount: dirs,
      totalSize,
      totalCompressed,
      compressionRatio: totalSize > 0 ? ((1 - totalCompressed / totalSize) * 100).toFixed(1) : "0",
    }
  }, [entries])

  const handleFile = useCallback(async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith(".zip") && selectedFile.type !== "application/zip" && selectedFile.type !== "application/x-zip-compressed") {
      toast.error("Please upload a valid ZIP file.")
      return
    }
    setFile(selectedFile)
    setFileName(selectedFile.name)
    setFileSize(selectedFile.size)
    setEntries([])
    setSelectedEntry(null)
    setError("")
    setProgress(0)
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
    setEntries([])
    setSelectedEntry(null)
    setError("")
    setProgress(0)
    setExpandedPaths(new Set([""]))
  }, [])

  const extractZip = useCallback(async () => {
    if (!file || extracting) return

    setError("")
    setExtracting(true)
    setProgress(0)
    setEntries([])
    setSelectedEntry(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const zip = await JSZip.loadAsync(arrayBuffer)

      const allEntries: ZipEntry[] = []
      const fileNames = Object.keys(zip.files)
      let processed = 0

      for (const relativePath of fileNames) {
        const zipEntry = zip.files[relativePath]
        const entry: ZipEntry = {
          path: relativePath,
          name: relativePath.split("/").pop() || relativePath,
          isDir: zipEntry.dir,
          size: 0,
          date: zipEntry.date || null,
          compressedSize: zipEntry._data ? (zipEntry._data as { compressedSize?: number }).compressedSize || 0 : 0,
          content: null,
          blob: null,
        }

        if (!zipEntry.dir) {
          try {
            if (isTextFile(relativePath)) {
              const text = await zipEntry.async("string")
              entry.content = text
              entry.size = text.length
            } else if (isImageFile(relativePath)) {
              const blob = await zipEntry.async("blob")
              entry.blob = blob
              entry.size = blob.size
            } else {
              const blob = await zipEntry.async("blob")
              entry.blob = blob
              entry.size = blob.size
            }
          } catch {
            entry.size = 0
          }
        }

        allEntries.push(entry)
        processed++
        setProgress(Math.round((processed / fileNames.length) * 100))
      }

      setEntries(allEntries)
      // Auto-expand root folders
      const rootPaths = new Set([""])
      for (const entry of allEntries) {
        const parts = (entry.path || "").split("/")
        if (parts.length > 1) {
          rootPaths.add(parts.slice(0, 1).join("/"))
        }
      }
      setExpandedPaths(rootPaths)
      toast.success(`Extracted ${allEntries.filter((e) => !e.isDir).length} files from the archive!`)
    } catch {
      setError("Failed to extract the ZIP file. It may be corrupted, encrypted, or in an unsupported format.")
      toast.error("ZIP extraction failed.")
    } finally {
      setExtracting(false)
    }
  }, [file, extracting])

  const toggleExpand = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }, [])

  const handleSelectEntry = useCallback((entry: ZipEntry) => {
    if (entry.isDir) return
    setSelectedEntry(entry)
  }, [])

  const handleDownloadFile = useCallback((entry: ZipEntry) => {
    if (entry.isDir || (!entry.content && !entry.blob)) return
    const blob = entry.blob || new Blob([entry.content || ""], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = entry.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${entry.name}`)
  }, [])

  const handleDownloadAll = useCallback(() => {
    const files = entries.filter((e) => !e.isDir)
    if (files.length === 0) return
    for (const entry of files) {
      handleDownloadFile(entry)
    }
    toast.success(`Downloading ${files.length} files...`)
  }, [entries, handleDownloadFile])

  const previewContent = useMemo(() => {
    if (!selectedEntry) return null

    if (selectedEntry.content !== null) {
      return { type: "text" as const, content: selectedEntry.content }
    }

    if (selectedEntry.blob && isImageFile(selectedEntry.name)) {
      const url = URL.createObjectURL(selectedEntry.blob)
      return { type: "image" as const, url }
    }

    return { type: "binary" as const }
  }, [selectedEntry])

  const hasResults = entries.length > 0 && !extracting

  function renderTreeNode(node: TreeNode, depth: number = 0) {
    if (node.isDir && node.path === "") {
      return (
        <div key="root">
          {node.children.map((child) => renderTreeNode(child, depth))}
        </div>
      )
    }

    return (
      <div key={node.path || node.name}>
        <div
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md cursor-pointer transition-colors text-sm ${
            selectedEntry && selectedEntry.path === node.path
              ? "bg-primary/10 text-primary"
              : "hover:bg-muted"
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.isDir) {
              toggleExpand(node.path)
            } else if (node.entry) {
              handleSelectEntry(node.entry)
            }
          }}
        >
          {node.isDir ? (
            <>
              {expandedPaths.has(node.path) ? (
                <ChevronDown className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              )}
              {getFileIcon(node.name, true)}
              <span className="truncate flex-1 font-medium">{node.name}</span>
              <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 shrink-0">
                {node.children.length}
              </Badge>
            </>
          ) : (
            <>
              <span className="w-3.5 shrink-0" />
              {getFileIcon(node.name, false)}
              <span className="truncate flex-1">{node.name}</span>
              <span className="text-xs text-muted-foreground shrink-0 ml-2">
                {formatFileSize(node.size)}
              </span>
              {node.entry && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownloadFile(node.entry!)
                  }}
                >
                  <Download className="w-3 h-3" />
                </Button>
              )}
            </>
          )}
        </div>
        {node.isDir && expandedPaths.has(node.path) && (
          <div>{node.children.map((child) => renderTreeNode(child, depth + 1))}</div>
        )}
      </div>
    )
  }

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
            accept=".zip,application/zip,application/x-zip-compressed"
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
                  {isDragOver ? "Drop your ZIP file here" : "Drag & drop a ZIP file here"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse from your device
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                ZIP files only
              </Badge>
            </>
          ) : (
            <div className="flex items-center gap-4 w-full">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-950/40 shrink-0">
                <Archive className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-medium text-foreground truncate">{fileName}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(fileSize)}</p>
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
              Extracting ZIP archive…
            </span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Extract Button */}
      {file && !extracting && !hasResults && (
        <Button onClick={extractZip} size="lg" className="w-full gap-2">
          <FolderOpen className="w-4 h-4" />
          Extract ZIP File
        </Button>
      )}

      {/* Results */}
      {hasResults && (
        <div className="space-y-4">
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{stats.fileCount}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Files</p>
              </Card>
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{stats.folderCount}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Folders</p>
              </Card>
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{formatFileSize(stats.totalSize)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Total Size</p>
              </Card>
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{formatFileSize(stats.totalCompressed)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Compressed</p>
              </Card>
              <Card className="p-3 text-center col-span-2 sm:col-span-1">
                <p className="text-2xl font-bold text-foreground">{stats.compressionRatio}%</p>
                <p className="text-xs text-muted-foreground mt-0.5">Saved</p>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3">
            <Badge variant="secondary" className="gap-1.5">
              <FolderOpen className="w-3 h-3 text-emerald-500" />
              Archive Extracted
            </Badge>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownloadAll} className="gap-1.5">
                <DownloadCloud className="w-3.5 h-3.5" />
                Download All
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

          <Separator />

          {/* File Tree + Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* File Tree */}
            <Card className="p-0 overflow-hidden">
              <div className="flex items-center justify-between border-b px-4 py-2.5">
                <span className="text-sm font-medium text-foreground">File Tree</span>
                <span className="text-xs text-muted-foreground">{fileName}</span>
              </div>
              <ScrollArea className="h-[450px]">
                <div className="p-2 space-y-0.5 group">
                  {tree && renderTreeNode(tree, 0)}
                </div>
              </ScrollArea>
            </Card>

            {/* Preview Panel */}
            <Card className="p-0 overflow-hidden">
              <div className="flex items-center justify-between border-b px-4 py-2.5">
                <span className="text-sm font-medium text-foreground">Preview</span>
                {selectedEntry && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {formatFileSize(selectedEntry.size)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => setSelectedEntry(null)}
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="min-h-[450px] max-h-[450px] overflow-auto">
                {!selectedEntry ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground py-16">
                    <FolderOpen className="w-10 h-10 opacity-30" />
                    <p className="text-sm">Click a file in the tree to preview it</p>
                  </div>
                ) : previewContent?.type === "text" ? (
                  <Textarea
                    readOnly
                    value={previewContent.content || ""}
                    className="min-h-[450px] rounded-none border-0 focus-visible:ring-0 font-mono text-sm leading-relaxed resize-none"
                  />
                ) : previewContent?.type === "image" ? (
                  <div className="flex items-center justify-center min-h-[450px] p-4 bg-muted/30">
                    <img
                      src={previewContent.url}
                      alt={selectedEntry.name}
                      className="max-w-full max-h-[420px] object-contain rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[450px] gap-3 text-muted-foreground py-16">
                    <File className="w-10 h-10 opacity-30" />
                    <p className="text-sm">Binary file — cannot preview</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadFile(selectedEntry)}
                      className="gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download {selectedEntry.name}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Success Banner */}
          <Card className="p-4 border-primary/30 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 shrink-0">
                <FolderOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground">ZIP Archive Extracted!</p>
                <p className="text-sm text-muted-foreground">
                  {stats?.fileCount} files and {stats?.folderCount} folders extracted from {fileName}. Total uncompressed size: {formatFileSize(stats?.totalSize || 0)}.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
