"use client"

import { useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/shared/copy-button"
import { Download } from "lucide-react"

interface ToolOutputProps {
  value: string
  label?: string
  showCopyButton?: boolean
  showDownloadButton?: boolean
  downloadFilename?: string
  className?: string
  emptyMessage?: string
}

export function ToolOutput({
  value,
  label,
  showCopyButton = true,
  showDownloadButton = false,
  downloadFilename = "output.txt",
  className,
  emptyMessage = "Output will appear here...",
}: ToolOutputProps) {
  const displayValue = value || emptyMessage
  const isEmpty = !value

  const handleDownload = useCallback(() => {
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = downloadFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [value, downloadFilename])

  const hasActions = showCopyButton || showDownloadButton

  return (
    <div className={className}>
      {label && (
        <Label className="mb-2" htmlFor={label.toLowerCase().replace(/\s+/g, "-")}>
          {label}
        </Label>
      )}

      {hasActions && (
        <div className="flex justify-end items-center gap-1 mb-2">
          {showCopyButton && !isEmpty && (
            <CopyButton text={value} />
          )}
          {showDownloadButton && !isEmpty && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              aria-label={`Download as ${downloadFilename}`}
            >
              <Download className="size-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          )}
        </div>
      )}

      <Textarea
        id={label?.toLowerCase().replace(/\s+/g, "-")}
        value={displayValue}
        readOnly
        className="font-mono min-h-[200px] resize-y bg-muted/30"
        aria-label={label ?? "Output"}
      />
    </div>
  )
}