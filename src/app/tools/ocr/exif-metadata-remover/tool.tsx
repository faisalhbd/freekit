"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Download,
  EyeOff,
  Loader2,
  RotateCcw,
  Shield,
  Image,
  Check,
  Info,
} from "lucide-react"

interface ImageFile {
  id: string
  file: File
  originalSize: number
  thumbnail: string
  hasMetadata: boolean
  metadataFields: string[]
  processed: boolean
  cleanedBlob: Blob | null
  cleanedSize: number
}

function detectExifFields(arrayBuffer: ArrayBuffer): {
  hasMetadata: boolean
  fields: string[]
} {
  const view = new DataView(arrayBuffer)
  const fields: string[] = []

  // Check for JPEG/JFIF
  if (view.getUint16(0, false) !== 0xffd8) {
    // Not a JPEG - check for WebP
    const uint8 = new Uint8Array(arrayBuffer)
    const riff = String.fromCharCode(...uint8.slice(0, 4))
    const webp = String.fromCharCode(...uint8.slice(8, 12))
    if (riff === "RIFF" && webp === "WEBP") {
      // WebP can have EXIF - check for EXIF chunk
      const text = new TextDecoder().decode(uint8)
      if (text.includes("Exif")) {
        fields.push("EXIF data")
        return { hasMetadata: true, fields }
      }
    }
    // PNG - check for tEXt/iTXt chunks
    if (uint8[0] === 0x89 && uint8[1] === 0x50) {
      const text = new TextDecoder().decode(uint8)
      if (text.includes("tEXt") || text.includes("iTXt") || text.includes("zTXt")) {
        fields.push("PNG metadata chunks")
        return { hasMetadata: true, fields }
      }
    }
    return { hasMetadata: false, fields: [] }
  }

  // JPEG parsing - walk through markers
  let offset = 2
  while (offset < arrayBuffer.byteLength - 1) {
    const marker = view.getUint16(offset, false)

    // Check for SOS (Start of Scan) - image data follows
    if (marker === 0xffda) break

    // Check for standalone markers (no length)
    if (
      (marker & 0xff00) === 0xff00 &&
      marker !== 0xffd0 &&
      marker !== 0xffd1 &&
      marker !== 0xffd2 &&
      marker !== 0xffd3 &&
      marker !== 0xffd4 &&
      marker !== 0xffd5 &&
      marker !== 0xffd6 &&
      marker !== 0xffd7 &&
      marker !== 0xffd8 &&
      marker !== 0xff01 &&
      marker !== 0xffd9
    ) {
      if (offset + 3 < arrayBuffer.byteLength) {
        const length = view.getUint16(offset + 2, false)
        if (length < 2 || offset + 2 + length > arrayBuffer.byteLength) break

        const segmentData = new Uint8Array(arrayBuffer, offset + 4, length - 2)

        // APP1 (0xFFE1) - EXIF data
        if (marker === 0xffe1) {
          const header = String.fromCharCode(...segmentData.slice(0, 4))
          if (header === "Exif") {
            fields.push("EXIF header")
            // Parse IFD tags
            parseExifTags(segmentData, fields, view, offset + 4)
          }
        }
        // APP0 (0xFFE0) - JFIF
        if (marker === 0xffe0) {
          fields.push("JFIF data")
        }
        // APP3 (0xFFE3) - EXIF in some cameras
        if (marker === 0xffe3) {
          fields.push("Additional metadata (APP3)")
        }
        // COM (0xFFFE) - Comment
        if (marker === 0xfffe) {
          fields.push("Image comment")
        }
        // IPTC (APP13)
        if (marker === 0xffed) {
          fields.push("IPTC data")
        }
        // XMP (APP1 with XMP)
        if (marker === 0xffe1) {
          const str = new TextDecoder().decode(segmentData)
          if (str.includes("x:xmpmeta") || str.includes("<xmp")) {
            if (!fields.includes("XMP data")) fields.push("XMP data")
          }
        }

        offset += 2 + length
      } else {
        break
      }
    } else {
      offset += 2
    }
  }

  return {
    hasMetadata: fields.length > 0,
    fields,
  }
}

function parseExifTags(
  segmentData: Uint8Array,
  fields: string[],
  view: DataView,
  baseOffset: number
) {
  try {
    const tiffStart = 6 // skip "Exif\0\0"
    if (segmentData.length < tiffStart + 8) return

    const byteOrder = segmentData[tiffStart] === 0x49 ? "little" : "big"
    const isLittle = byteOrder === "little"

    const getU16 = (off: number) =>
      isLittle
        ? view.getUint16(baseOffset + off, true)
        : view.getUint16(baseOffset + off, false)

    // Verify TIFF magic number
    const magic = getU16(tiffStart + 2)
    if (magic !== 42) return

    const ifdOffset = getU16(tiffStart + 4) | (getU16(tiffStart + 6) << 16)
    const ifdStart = tiffStart + ifdOffset

    if (ifdStart + 2 > segmentData.length) return

    const numEntries = getU16(ifdStart)

    const tagNames: Record<number, string> = {
      0x010f: "Camera Make",
      0x0110: "Camera Model",
      0x0112: "Orientation",
      0x011a: "X Resolution",
      0x011b: "Y Resolution",
      0x0131: "Software",
      0x0132: "Date/Time",
      0x013b: "Artist",
      0x8298: "Copyright",
      0x829a: "Exposure Time",
      0x829d: "F-Number",
      0x8827: "ISO Speed",
      0x9003: "Date/Time Original",
      0x9004: "Date/Time Digitized",
      0x920a: "Focal Length",
      0xa405: "Focal Length (35mm)",
      0xa433: "Lens Make",
      0xa434: "Lens Model",
      0xa002: "EXIF Image Width",
      0xa003: "EXIF Image Height",
    }

    const maxEntries = Math.min(numEntries, 50)
    for (let i = 0; i < maxEntries; i++) {
      const entryOffset = ifdStart + 2 + i * 12
      if (entryOffset + 12 > segmentData.length) break

      const tag = getU16(entryOffset)
      if (tagNames[tag] && !fields.includes(tagNames[tag])) {
        fields.push(tagNames[tag])
      }
    }

    // Check for GPS IFD
    if (ifdStart + 2 + numEntries * 12 + 4 <= segmentData.length) {
      const gpsOffset = getU16(ifdStart + 2 + numEntries * 12)
      if (gpsOffset !== 0) {
        fields.push("GPS Location Data")
      }
    }
  } catch {
    // Silently skip parsing errors
  }
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

export function ExifMetadataRemoverTool() {
  const [files, setFiles] = useState<ImageFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(async (fileList: FileList | File[]) => {
    const newFiles: ImageFile[] = []
    const accepted = ["image/jpeg", "image/png", "image/webp"]

    for (const file of Array.from(fileList)) {
      if (!accepted.includes(file.type)) continue

      const id = generateId()
      const thumbnail = URL.createObjectURL(file)
      const buffer = await file.arrayBuffer()
      const { hasMetadata, fields } = detectExifFields(buffer)

      newFiles.push({
        id,
        file,
        originalSize: file.size,
        thumbnail,
        hasMetadata,
        metadataFields: fields,
        processed: false,
        cleanedBlob: null,
        cleanedSize: 0,
      })
    }

    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleClickUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
      e.target.value = ""
    }
  }

  const stripMetadata = useCallback(
    async (imageFile: ImageFile): Promise<Blob> => {
      return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight
          const ctx = canvas.getContext("2d")
          if (!ctx) {
            reject(new Error("Canvas context not available"))
            return
          }
          ctx.drawImage(img, 0, 0)

          const mimeType = imageFile.file.type === "image/png" ? "image/png" : "image/jpeg"
          const quality = mimeType === "image/png" ? undefined : 0.92

          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob)
              else reject(new Error("Failed to create blob"))
            },
            mimeType,
            quality
          )
        }
        img.onerror = () => reject(new Error("Failed to load image"))
        img.src = imageFile.thumbnail
      })
    },
    []
  )

  const processAll = async () => {
    setIsProcessing(true)
    try {
      const updates = await Promise.all(
        files.map(async (f) => {
          if (f.processed) return f
          const cleanedBlob = await stripMetadata(f)
          return {
            ...f,
            processed: true,
            cleanedBlob,
            cleanedSize: cleanedBlob.size,
          }
        })
      )
      setFiles(updates)
    } catch {
      // Individual errors are handled per-file
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadFile = (f: ImageFile) => {
    if (!f.cleanedBlob) return
    const ext = f.file.type === "image/png" ? "png" : "jpg"
    const name = f.file.name.replace(/\.[^.]+$/, "") + "_no-metadata." + ext
    const url = URL.createObjectURL(f.cleanedBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    const processed = files.filter((f) => f.processed && f.cleanedBlob)
    processed.forEach((f) => downloadFile(f))
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file) URL.revokeObjectURL(file.thumbnail)
      return prev.filter((f) => f.id !== id)
    })
  }

  const resetAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.thumbnail))
    setFiles([])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const processedCount = files.filter((f) => f.processed).length
  const metadataCount = files.filter((f) => f.hasMetadata).length
  const allProcessed = files.length > 0 && processedCount === files.length

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        role="button"
        tabIndex={0}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClickUpload}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClickUpload()
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
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFileInput}
          className="hidden"
          aria-label="Upload images"
        />
        <div
          className={`
            flex h-14 w-14 items-center justify-center rounded-full transition-colors
            ${isDragOver ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
          `}
        >
          <Upload className="h-6 w-6" />
        </div>
        <div className="text-center">
          <p className="font-medium">
            Drag & drop images here, or click to browse
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supports JPG, PNG, and WebP — multiple files allowed
          </p>
        </div>
      </div>

      {/* Summary Bar */}
      {files.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{files.length} file{files.length !== 1 ? "s" : ""}</Badge>
            {metadataCount > 0 && (
              <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800">
                <Info className="mr-1 h-3 w-3" />
                {metadataCount} with metadata
              </Badge>
            )}
            {files.length - metadataCount > 0 && (
              <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800">
                <Check className="mr-1 h-3 w-3" />
                {files.length - metadataCount} clean
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetAll}>
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Clear All
            </Button>
            <Button
              size="sm"
              onClick={processAll}
              disabled={isProcessing || files.length === 0}
            >
              {isProcessing ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              ) : (
                <EyeOff className="mr-1.5 h-3.5 w-3.5" />
              )}
              Remove Metadata
            </Button>
            {allProcessed && (
              <Button size="sm" variant="default" onClick={downloadAll}>
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download All
              </Button>
            )}
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {files.map((f) => (
            <Card key={f.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    <Image
                      src={f.thumbnail}
                      alt={f.file.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium truncate">{f.file.name}</p>
                      <Badge
                        variant={
                          f.hasMetadata ? "outline" : "secondary"
                        }
                        className={`shrink-0 text-xs ${
                          f.hasMetadata
                            ? "text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
                            : "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800"
                        }`}
                      >
                        {f.hasMetadata ? (
                          <>
                            <Info className="mr-1 h-3 w-3" />
                            Metadata found
                          </>
                        ) : (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            No metadata
                          </>
                        )}
                      </Badge>
                    </div>

                    {/* Metadata fields */}
                    {f.hasMetadata && f.metadataFields.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {f.metadataFields.slice(0, 6).map((field) => (
                          <Badge
                            key={field}
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            {field}
                          </Badge>
                        ))}
                        {f.metadataFields.length > 6 && (
                          <Badge
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            +{f.metadataFields.length - 6} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Size info */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>Original: {formatBytes(f.originalSize)}</span>
                      {f.processed && f.cleanedBlob && (
                        <>
                          <span>→</span>
                          <span className="text-emerald-600 dark:text-emerald-400">
                            Cleaned: {formatBytes(f.cleanedSize)}
                          </span>
                          {f.cleanedSize < f.originalSize && (
                            <span className="text-xs">
                              ({Math.round((1 - f.cleanedSize / f.originalSize) * 100)}% smaller)
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {f.processed && f.cleanedBlob ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadFile(f)}
                      >
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Download
                      </Button>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-xs text-muted-foreground"
                      >
                        <Shield className="mr-1 h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {files.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-8 text-center text-muted-foreground">
          <Shield className="h-10 w-10 opacity-40" />
          <p className="text-sm max-w-md">
            Upload photos to scan and remove embedded EXIF metadata. Your images
            never leave your browser — all processing is done locally.
          </p>
        </div>
      )}
    </div>
  )
}
