"use client"

import { useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ClipboardPaste, X } from "lucide-react"

interface ToolInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  rows?: number
  maxLength?: number
  showCharCount?: boolean
  showPasteButton?: boolean
  showClearButton?: boolean
  className?: string
}

export function ToolInput({
  value,
  onChange,
  placeholder = "Enter your text here...",
  label,
  rows = 6,
  maxLength,
  showCharCount = true,
  showPasteButton = true,
  showClearButton = true,
  className,
}: ToolInputProps) {
  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      const trimmed = maxLength ? text.slice(0, maxLength) : text
      onChange(trimmed)
    } catch {
      // Clipboard access may be denied by the browser
    }
  }, [maxLength, onChange])

  const handleClear = useCallback(() => {
    onChange("")
  }, [onChange])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const next = maxLength
        ? e.target.value.slice(0, maxLength)
        : e.target.value
      onChange(next)
    },
    [maxLength, onChange]
  )

  const showToolbar = showPasteButton || showClearButton

  return (
    <div className={className}>
      {label && (
        <Label className="mb-2" htmlFor={label.toLowerCase().replace(/\s+/g, "-")}>
          {label}
        </Label>
      )}

      {showToolbar && (
        <div className="flex justify-end items-center gap-1 mb-2">
          {showPasteButton && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handlePaste}
              aria-label="Paste from clipboard"
            >
              <ClipboardPaste className="size-4" />
              <span className="hidden sm:inline">Paste</span>
            </Button>
          )}
          {showClearButton && value.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              aria-label="Clear input"
            >
              <X className="size-4" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}
        </div>
      )}

      <Textarea
        id={label?.toLowerCase().replace(/\s+/g, "-")}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className="font-mono resize-y"
        aria-label={label ?? "Text input"}
      />

      {showCharCount && (
        <p className="mt-1.5 text-sm text-muted-foreground">
          {maxLength
            ? `${value.length}/${maxLength} characters`
            : `${value.length} characters`}
        </p>
      )}
    </div>
  )
}