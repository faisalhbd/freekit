"use client"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  Copy,
  Download,
  ArrowRight,
  RotateCcw,
  Check,
  Sparkles,
  Type,
  Heading,
  List,
  Link as LinkIcon,
  Hash,
} from "lucide-react"

interface ConversionStats {
  totalLines: number
  headingsFound: number
  listsFound: number
  linksFound: number
  boldFound: number
  italicFound: number
  paragraphsFound: number
}

function convertTextToMarkdown(input: string): { markdown: string; stats: ConversionStats } {
  const lines = input.split("\n")
  const output: string[] = []
  const stats: ConversionStats = {
    totalLines: lines.length,
    headingsFound: 0,
    listsFound: 0,
    linksFound: 0,
    boldFound: 0,
    italicFound: 0,
    paragraphsFound: 0,
  }

  let prevEmpty = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    const trimmed = (line || "").trim()

    // Empty line → paragraph break
    if (!trimmed) {
      output.push("")
      prevEmpty = true
      continue
    }

    // Skip if this line is an underline (=== or ---)
    if (/^[=\-]{3,}$/.test(trimmed)) {
      // Look back: convert previous line to heading
      if (output.length > 0 && (trimmed.startsWith("=") || trimmed.startsWith("-"))) {
        const prevIdx = output.length - 1
        const prevLine = (output[prevIdx] || "").trim()
        if (prevLine && !prevLine.startsWith("#")) {
          output[prevIdx] = trimmed.startsWith("=") ? `# ${prevLine}` : `## ${prevLine}`
          stats.headingsFound++
        }
      }
      continue
    }

    // Skip lines that are already Markdown headings
    if (/^#{1,6}\s/.test(trimmed)) {
      output.push(trimmed)
      stats.headingsFound++
      prevEmpty = false
      continue
    }

    // Skip lines that are already Markdown list items
    if (/^\s*[-*+]\s/.test(trimmed) || /^\s*\d+\.\s/.test(trimmed)) {
      output.push(line)
      stats.listsFound++
      prevEmpty = false
      continue
    }

    // ALL CAPS with short length → H1
    if (trimmed === trimmed.toUpperCase() && trimmed.length > 2 && trimmed.length < 60 && /[A-Z]/.test(trimmed)) {
      output.push(`# ${trimmed}`)
      stats.headingsFound++
      prevEmpty = false
      continue
    }

    // Lines ending with : → H2
    if (/:\s*$/.test(trimmed) && trimmed.length > 2 && !trimmed.startsWith("http")) {
      output.push(`## ${(trimmed || "").replace(/:\s*$/, "")}`)
      stats.headingsFound++
      prevEmpty = false
      continue
    }

    // Bullet characters → list item
    if (/^[•\-–—]\s/.test(trimmed)) {
      output.push(`- ${(trimmed || "").replace(/^[•\-–—]\s*/, "")}`)
      stats.listsFound++
      prevEmpty = false
      continue
    }

    // Numbered patterns: "1." or "1)" → numbered list
    if (/^\d+[\.\)]\s/.test(trimmed)) {
      output.push(trimmed)
      stats.listsFound++
      prevEmpty = false
      continue
    }

    // URLs → auto-link
    const urlRegex = /(https?:\/\/[^\s\)]+)/g
    let processedLine = trimmed

    // Count URLs found
    const urlMatches = trimmed.match(urlRegex)
    if (urlMatches) {
      stats.linksFound += urlMatches.length
      processedLine = trimmed.replace(urlRegex, "[$1]($1)")
    }

    // Count bold markers
    const boldMatches = trimmed.match(/\*\*[^*]+\*\*/g)
    if (boldMatches) stats.boldFound += boldMatches.length
    const boldAltMatches = trimmed.match(/__[^_]+__/g)
    if (boldAltMatches) stats.boldFound += boldAltMatches.length

    // Count italic markers
    const italicMatches = trimmed.match(/(?<!\*)\*[^*]+\*(?!\*)/g)
    if (italicMatches) stats.italicFound += italicMatches.length
    const italicAltMatches = trimmed.match(/(?<!_)_[^_]+_(?!_)/g)
    if (italicAltMatches) stats.italicFound += italicAltMatches.length

    // Regular paragraph line
    if (prevEmpty) {
      stats.paragraphsFound++
    }
    output.push(processedLine)
    prevEmpty = false
  }

  const markdown = output.join("\n")
  return { markdown, stats }
}

export function TextToMarkdownTool() {
  const [inputText, setInputText] = useState("")
  const [outputMarkdown, setOutputMarkdown] = useState("")
  const [stats, setStats] = useState<ConversionStats | null>(null)
  const [copied, setCopied] = useState(false)

  const handleConvert = useCallback(() => {
    const trimmed = (inputText || "").trim()
    if (!trimmed) {
      toast.error("Please enter some text to convert.")
      return
    }
    const result = convertTextToMarkdown(trimmed)
    setOutputMarkdown(result.markdown)
    setStats(result.stats)
    toast.success("Text converted to Markdown successfully!")
  }, [inputText])

  const handleReset = useCallback(() => {
    setInputText("")
    setOutputMarkdown("")
    setStats(null)
    setCopied(false)
    toast.success("Reset complete.")
  }, [])

  const handleCopy = useCallback(async () => {
    if (!outputMarkdown) return
    try {
      await navigator.clipboard.writeText(outputMarkdown)
      setCopied(true)
      toast.success("Markdown copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy to clipboard.")
    }
  }, [outputMarkdown])

  const handleDownload = useCallback(() => {
    if (!outputMarkdown) return
    const blob = new Blob([outputMarkdown], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "converted.md"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Markdown file downloaded!")
  }, [outputMarkdown])

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInputText((prev) => (prev ? prev + "\n" : "") + text)
      toast.success("Text pasted from clipboard!")
    } catch {
      toast.error("Unable to read clipboard. Please paste manually with Ctrl+V.")
    }
  }, [])

  const handleSample = useCallback(() => {
    const sample = `MEETING NOTES

Project Kickoff:
- Review project scope and deliverables
- Assign team roles and responsibilities
- Set milestone deadlines

Timeline:
1. Phase 1: Research and Discovery - 2 weeks
2. Phase 2: Design and Prototyping - 3 weeks
3. Phase 3: Development - 6 weeks
4. Phase 4: Testing and Launch - 2 weeks

Key decisions from the meeting:

- Use React for the frontend
- Deploy on AWS with CloudFront
- Weekly standups every Monday at 10am
- Budget approved for $50,000

Important links:
https://project-docs.example.com
https://design-system.example.com

Contact: team-lead@example.com
Next meeting scheduled for Friday at 2pm`

    setInputText(sample)
    toast.success("Sample text loaded!")
  }, [])

  const hasInput = (inputText || "").trim().length > 0
  const hasOutput = (outputMarkdown || "").trim().length > 0

  return (
    <div className="space-y-6">
      {/* Input / Output side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Panel */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Plain Text Input</span>
            </div>
            <div className="flex gap-1.5">
              <Button variant="ghost" size="sm" onClick={handlePaste} className="text-xs gap-1 h-7 px-2">
                Paste
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSample} className="text-xs gap-1 h-7 px-2">
                Sample
              </Button>
            </div>
          </div>
          <Card className="p-0 overflow-hidden">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[350px] max-h-[500px] resize-y rounded-none border-0 focus-visible:ring-0 font-mono text-sm leading-relaxed"
              placeholder="Paste your plain text here...&#10;&#10;The tool will detect:&#10;- ALL CAPS lines → Headings&#10;- Lines ending with : → Subheadings&#10;- Bullet points (-, *, •) → Lists&#10;- Numbered items → Numbered lists&#10;- URLs → Auto-linked&#10;- **bold** and *italic* → Preserved"
            />
          </Card>
          <div className="text-xs text-muted-foreground">
            {(inputText || "").split("\n").length} lines · {(inputText || "").length.toLocaleString()} characters
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Markdown Output</span>
            </div>
            {hasOutput && (
              <div className="flex gap-1.5">
                <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs gap-1 h-7 px-2">
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload} className="text-xs gap-1 h-7 px-2">
                  <Download className="w-3 h-3" />
                  Download
                </Button>
              </div>
            )}
          </div>
          <Card className="p-0 overflow-hidden">
            <Textarea
              readOnly
              value={outputMarkdown}
              className="min-h-[350px] max-h-[500px] resize-y rounded-none border-0 focus-visible:ring-0 font-mono text-sm leading-relaxed bg-muted/30"
              placeholder="Converted Markdown will appear here..."
            />
          </Card>
          {hasOutput && (
            <div className="text-xs text-muted-foreground">
              {(outputMarkdown || "").split("\n").length} lines · {(outputMarkdown || "").length.toLocaleString()} characters
            </div>
          )}
        </div>
      </div>

      {/* Convert Button */}
      <div className="flex items-center justify-center gap-3">
        <Button onClick={handleConvert} size="lg" className="gap-2 px-8" disabled={!hasInput}>
          <Sparkles className="w-4 h-4" />
          Convert to Markdown
        </Button>
        <Button variant="outline" size="lg" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {/* Conversion Stats */}
      {stats && (
        <div className="space-y-3">
          <Separator />
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1.5">
              <ArrowRight className="w-3 h-3" />
              Conversion Statistics
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <Card className="p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <Heading className="w-3.5 h-3.5 text-primary" />
                <p className="text-xl font-bold text-foreground">{stats.headingsFound}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Headings</p>
            </Card>
            <Card className="p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <List className="w-3.5 h-3.5 text-primary" />
                <p className="text-xl font-bold text-foreground">{stats.listsFound}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">List Items</p>
            </Card>
            <Card className="p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <LinkIcon className="w-3.5 h-3.5 text-primary" />
                <p className="text-xl font-bold text-foreground">{stats.linksFound}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Links</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xl font-bold text-foreground">{stats.boldFound}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Bold</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xl font-bold text-foreground">{stats.italicFound}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Italic</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xl font-bold text-foreground">{stats.paragraphsFound}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Paragraphs</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xl font-bold text-foreground">{stats.totalLines}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Total Lines</p>
            </Card>
          </div>
        </div>
      )}

      {/* Detection Rules */}
      {!hasOutput && (
        <Card className="p-5 border-dashed">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Smart Detection Rules
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
            {[
              { rule: "ALL CAPS lines", result: "# Heading 1" },
              { rule: "Lines ending with :", result: "## Heading 2" },
              { rule: "Lines starting with - * •", result: "- List item" },
              { rule: "Lines with 1. or 1)", result: "1. Numbered item" },
              { rule: "URLs (https://...)", result: "[url](url)" },
              { rule: "**text** or __text__", result: "**bold** (preserved)" },
              { rule: "*text* or _text_", result: "*italic* (preserved)" },
              { rule: "=== or --- under lines", result: "H1 or H2 heading" },
            ].map((item) => (
              <div key={item.rule} className="flex items-center gap-2">
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono shrink-0">{item.rule}</code>
                <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                <code className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono">{item.result}</code>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
