"use client"

import { useState, useCallback, useMemo } from "react"
import { Sparkles, Copy, Check, Trash2, RotateCcw, ArrowDown, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

// ─── Cleaning Options ────────────────────────────────────────────────────────

interface CleaningOption {
  id: string
  label: string
  description: string
  defaultEnabled: boolean
}

const CLEANING_OPTIONS: CleaningOption[] = [
  {
    id: "extraSpaces",
    label: "Remove extra spaces",
    description: "Collapse multiple spaces into a single space",
    defaultEnabled: true,
  },
  {
    id: "trailingWhitespace",
    label: "Remove trailing whitespace",
    description: "Strip spaces and tabs from end of each line",
    defaultEnabled: true,
  },
  {
    id: "leadingWhitespace",
    label: "Remove leading whitespace",
    description: "Strip spaces and tabs from beginning of each line",
    defaultEnabled: false,
  },
  {
    id: "emptyLines",
    label: "Remove empty/blank lines",
    description: "Delete all lines with no visible content",
    defaultEnabled: false,
  },
  {
    id: "zeroWidth",
    label: "Remove zero-width characters",
    description: "Strip \u200B, \u200C, \u200D, \uFEFF",
    defaultEnabled: true,
  },
  {
    id: "normalizeLineEndings",
    label: "Normalize line endings",
    description: "Convert \r\n and \r to \n",
    defaultEnabled: true,
  },
  {
    id: "htmlTags",
    label: "Remove HTML tags",
    description: "Strip <tag> and </tag> from text",
    defaultEnabled: false,
  },
  {
    id: "nonPrintable",
    label: "Remove non-printable characters",
    description: "Strip ASCII 0-31 (except \t, \n, \r) and 127",
    defaultEnabled: true,
  },
  {
    id: "multipleBlankLines",
    label: "Convert multiple blank lines to single",
    description: "Collapse 2+ consecutive blank lines into one",
    defaultEnabled: false,
  },
  {
    id: "encodingArtifacts",
    label: "Fix encoding artifacts",
    description: "Fix common mojibake (Ã©→é, â€˜→')",
    defaultEnabled: true,
  },
]

// ─── Cleaning Functions ─────────────────────────────────────────────────────

function removeExtraSpaces(text: string): string {
  return text.replace(/[ \t]+/g, " ")
}

function removeTrailingWhitespace(text: string): string {
  return text
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""))
    .join("\n")
}

function removeLeadingWhitespace(text: string): string {
  return text
    .split("\n")
    .map((line) => line.replace(/^[ \t]+/, ""))
    .join("\n")
}

function removeEmptyLines(text: string): string {
  return text
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .join("\n")
}

function removeZeroWidthCharacters(text: string): string {
  return text
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, "")
}

function normalizeLineEndings(text: string): string {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
}

function removeHtmlTags(text: string): string {
  return text.replace(/<[^>]*>/g, "")
}

function removeNonPrintable(text: string): string {
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
}

function collapseBlankLines(text: string): string {
  return text.replace(/\n{3,}/g, "\n\n")
}

function fixEncodingArtifacts(text: string): string {
  let result = text
  // Common UTF-8 → ISO-8859-1 mojibake patterns
  result = result.replace(/Ã©/g, "é")
  result = result.replace(/Ã¨/g, "è")
  result = result.replace(/Ãª/g, "ê")
  result = result.replace(/Ã«/g, "ë")
  result = result.replace(/Ã /g, "à")
  result = result.replace(/Ã¢/g, "â")
  result = result.replace(/Ã¹/g, "ù")
  result = result.replace(/Ã»/g, "û")
  result = result.replace(/Ã¼/g, "ü")
  result = result.replace(/Ã¶/g, "ö")
  result = result.replace(/Ã¤/g, "ä")
  result = result.replace(/Ã¯/g, "ï")
  result = result.replace(/Ã®/g, "î")
  result = result.replace(/Ã‡/g, "Ç")
  result = result.replace(/Ã§/g, "ç")
  result = result.replace(/Ã„/g, "Ä")
  result = result.replace(/Ã–/g, "Ö")
  result = result.replace(/Ãœ/g, "Ü")
  result = result.replace(/ÃŸ/g, "ß")
  result = result.replace(/Ã±/g, "ñ")
  result = result.replace(/Ã‘/g, "Ñ")
  // Curly quotes mojibake
  result = result.replace(/â€œ/g, "\u201C")
  result = result.replace(/â€/g, "\u201D")
  result = result.replace(/â€˜/g, "\u2018")
  result = result.replace(/â€™/g, "\u2019")
  result = result.replace(/â€”/g, "\u2014")
  result = result.replace(/â€“/g, "\u2013")
  result = result.replace(/â€¦/g, "\u2026")
  // Euro sign
  result = result.replace(/â‚¬/g, "\u20AC")
  // Degree sign
  result = result.replace(/Â°/g, "°")
  return result
}

// ─── Stats Helper ────────────────────────────────────────────────────────────

interface TextStats {
  characters: number
  words: number
  lines: number
}

function getTextStats(text: string): TextStats {
  if (!text) return { characters: 0, words: 0, lines: 0 }
  const chars = text.length
  const words = (text.match(/\S+/g) || []).length
  const lines = text.split("\n").length
  return { characters: chars, words, lines }
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function TextCleanerTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [enabledOptions, setEnabledOptions] = useState<Set<string>>(
    () => new Set(CLEANING_OPTIONS.filter((o) => o.defaultEnabled).map((o) => o.id))
  )

  const inputStats = useMemo(() => getTextStats(input), [input])
  const outputStats = useMemo(() => getTextStats(output), [output])

  const hasOutput = output.length > 0

  const toggleOption = useCallback((id: string, checked: boolean) => {
    setEnabledOptions((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }, [])

  const selectAll = useCallback(() => {
    setEnabledOptions(new Set(CLEANING_OPTIONS.map((o) => o.id)))
  }, [])

  const deselectAll = useCallback(() => {
    setEnabledOptions(new Set())
  }, [])

  const cleanText = useCallback(() => {
    const text = input || ""
    if (!text.trim()) {
      toast.error("Please enter some text to clean.")
      return
    }

    let result = text

    // Order matters: normalize line endings first, then per-line operations
    if (enabledOptions.has("normalizeLineEndings")) {
      result = normalizeLineEndings(result)
    }
    if (enabledOptions.has("nonPrintable")) {
      result = removeNonPrintable(result)
    }
    if (enabledOptions.has("zeroWidth")) {
      result = removeZeroWidthCharacters(result)
    }
    if (enabledOptions.has("encodingArtifacts")) {
      result = fixEncodingArtifacts(result)
    }
    if (enabledOptions.has("htmlTags")) {
      result = removeHtmlTags(result)
    }
    if (enabledOptions.has("trailingWhitespace")) {
      result = removeTrailingWhitespace(result)
    }
    if (enabledOptions.has("leadingWhitespace")) {
      result = removeLeadingWhitespace(result)
    }
    if (enabledOptions.has("extraSpaces")) {
      result = removeExtraSpaces(result)
    }
    if (enabledOptions.has("multipleBlankLines")) {
      result = collapseBlankLines(result)
    }
    if (enabledOptions.has("emptyLines")) {
      result = removeEmptyLines(result)
    }

    setOutput(result)
    const changes = result.length !== text.length
    if (changes) {
      toast.success(`Cleaned! ${Math.abs(text.length - result.length)} characters changed.`)
    } else {
      toast.success("Text is already clean — no changes needed.")
    }
  }, [input, enabledOptions])

  const handleCopy = useCallback(async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    toast.success("Cleared.")
  }, [])

  const handleSwap = useCallback(() => {
    setInput(output)
    setOutput("")
  }, [output])

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Sparkles className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Text Cleaner</h3>
              <p className="text-sm text-muted-foreground">
                Select cleaning options, then click Clean All
              </p>
            </div>
          </div>

          {/* Cleaning Options */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Cleaning Options</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs text-primary hover:underline"
                >
                  Select All
                </button>
                <span className="text-muted-foreground">|</span>
                <button
                  type="button"
                  onClick={deselectAll}
                  className="text-xs text-primary hover:underline"
                >
                  Deselect All
                </button>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {CLEANING_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    checked={enabledOptions.has(opt.id)}
                    onCheckedChange={(checked) => toggleOption(opt.id, !!checked)}
                    className="mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium leading-none">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="cleaner-input">Input Text</Label>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span>{inputStats.characters} chars</span>
                <span>{inputStats.words} words</span>
                <span>{inputStats.lines} lines</span>
              </div>
            </div>
            <Textarea
              id="cleaner-input"
              placeholder="Paste or type your messy text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[160px] font-mono text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button onClick={cleanText} className="gap-2 flex-1 sm:flex-none">
              <Sparkles className="size-4" /> Clean All
            </Button>
            <Button onClick={handleClear} variant="outline" className="gap-2">
              <Trash2 className="size-4" /> Clear
            </Button>
          </div>

          {/* Arrow indicator */}
          {hasOutput && (
            <div className="flex justify-center my-2">
              <ArrowDown className="size-5 text-muted-foreground animate-bounce" />
            </div>
          )}

          {/* Output */}
          {hasOutput && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="cleaner-output">Cleaned Output</Label>
                <div className="flex items-center gap-3">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>{outputStats.characters} chars</span>
                    <span>{outputStats.words} words</span>
                    <span>{outputStats.lines} lines</span>
                  </div>
                </div>
              </div>
              <Textarea
                id="cleaner-output"
                value={output}
                readOnly
                className="min-h-[160px] font-mono text-sm bg-emerald-500/5"
              />
              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="outline" className="gap-2">
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? "Copied!" : "Copy Output"}
                </Button>
                <Button onClick={handleSwap} variant="outline" className="gap-2">
                  <RotateCcw className="size-4" /> Swap to Input
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Stats Comparison */}
      {hasOutput && (
        <Card className="p-4">
          <h4 className="text-sm font-medium mb-3">Before / After Comparison</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{inputStats.characters}</p>
              <p className="text-xs text-muted-foreground">Input characters</p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowDown className="size-5 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{outputStats.characters}</p>
              <p className="text-xs text-muted-foreground">Output characters</p>
            </div>
          </div>
          <div className="mt-3 text-center text-xs text-muted-foreground">
            {inputStats.characters > outputStats.characters
              ? `Removed ${inputStats.characters - outputStats.characters} characters (${Math.round(((inputStats.characters - outputStats.characters) / Math.max(inputStats.characters, 1)) * 100)}% reduction)`
              : inputStats.characters < outputStats.characters
                ? `Changed ${outputStats.characters - inputStats.characters} characters`
                : "No size change"
            }
            {" · "}
            {inputStats.lines > outputStats.lines
              ? `${inputStats.lines - outputStats.lines} fewer lines`
              : inputStats.lines < outputStats.lines
                ? `${outputStats.lines - inputStats.lines} more lines`
                : "Same line count"
            }
          </div>
        </Card>
      )}

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Shield className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Client-Side — Your Text Never Leaves Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All cleaning operations are performed locally in your browser. No text data is transmitted to any server.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
