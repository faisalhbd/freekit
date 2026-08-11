"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { FileCode, Copy, RotateCcw, Eye, Code2, Shield } from "lucide-react"

// ─── Custom Markdown Parser ─────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return (text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function parseInline(text: string): string {
  if ((text || "").length === 0) return text
  let result = text

  // Escape HTML first
  result = escapeHtml(result)

  // Images: ![alt](url)
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full" />')

  // Links: [text](url)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline underline-offset-4 hover:text-primary/80">$1</a>')

  // Inline code: `code`
  result = result.replace(/`([^`]+)`/g, "<code class=\"px-1.5 py-0.5 rounded bg-muted text-sm font-mono\">$1</code>")

  // Strikethrough: ~~text~~
  result = result.replace(/~~([^~]+)~~/g, "<del>$1</del>")

  // Bold: **text** or __text__
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  result = result.replace(/__([^_]+)__/g, "<strong>$1</strong>")

  // Italic: *text* or _text_ (but not inside bold)
  result = result.replace(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
  result = result.replace(/(?<!_)_(?!_)([^_]+)(?<!_)_(?!_)/g, "<em>$1</em>")

  return result
}

function parseTable(lines: string[]): { html: string; consumed: number } {
  const rows: string[][] = []
  let idx = 0

  // Parse rows
  for (idx = 0; idx < lines.length; idx++) {
    const line = (lines[idx] || "").trim()
    if ((line || "").length === 0) break

    // Check if it's a separator row like | --- | --- |
    if (/^\|?\s*[-:]+[-|\s:]*$/.test(line)) continue

    // Parse cells
    const cells = line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => (c || "").trim())

    rows.push(cells)
  }

  if (rows.length === 0) return { html: "", consumed: 0 }

  let html = '<table class="border-collapse border border-border w-full text-sm">'
  rows.forEach((row, ri) => {
    const tag = ri === 0 ? "th" : "td"
    const cellClass = ri === 0
      ? "border border-border px-3 py-2 bg-muted font-semibold text-left"
      : "border border-border px-3 py-2 text-left"
    html += "<tr>"
    row.forEach((cell) => {
      html += `<${tag} class="${cellClass}">${parseInline(cell)}</${tag}>`
    })
    html += "</tr>"
  })
  html += "</table>"

  return { html, consumed: idx }
}

function parseMarkdown(md: string): string {
  if ((md || "").trim().length === 0) return ""

  const raw = (md || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")
  const lines = raw.split("\n")
  const blocks: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = (line || "").trim()

    // Empty line
    if ((trimmed || "").length === 0) {
      i++
      continue
    }

    // Fenced code blocks: ```lang ... ```
    if ((trimmed || "").startsWith("```")) {
      const lang = (trimmed || "").replace(/^```/, "").trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !(lines[i] || "").trim().startsWith("```")) {
        codeLines.push(lines[i] || "")
        i++
      }
      if (i < lines.length) i++ // skip closing ```
      const codeContent = escapeHtml(codeLines.join("\n"))
      blocks.push(`<pre class="rounded-lg bg-muted p-4 overflow-x-auto"><code class="text-sm font-mono"${(lang || "").length > 0 ? ` class="language-${escapeHtml(lang)}"` : ""}>${codeContent}</code></pre>`)
      continue
    }

    // Headings: # ## ### ####
    const headingMatch = (trimmed || "").match(/^(#{1,4})\s+(.+)/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const content = parseInline(headingMatch[2] || "")
      blocks.push(`<h${level} class="font-bold mt-6 mb-3">${content}</h${level}>`)
      i++
      continue
    }

    // Horizontal rules: --- or *** or ___ (must be on its own line)
    if (/^[-*_]{3,}$/.test(trimmed)) {
      blocks.push("<hr class=\"my-6 border-border\" />")
      i++
      continue
    }

    // Blockquote: > text
    if ((trimmed || "").startsWith(">")) {
      const quoteLines: string[] = []
      while (i < lines.length && ((lines[i] || "").trim().startsWith(">") || ((lines[i] || "").trim().length > 0 && (lines[i] || "").trim()[0] !== "#"))) {
        const qLine = (lines[i] || "").trim()
        if ((qLine || "").startsWith(">")) {
          quoteLines.push(parseInline((qLine || "").replace(/^>\s?/, "")))
          i++
        } else if ((qLine || "").length === 0) {
          break
        } else {
          break
        }
      }
      blocks.push(`<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">${quoteLines.join("<br />")}</blockquote>`)
      continue
    }

    // Table: lines starting with |
    if ((trimmed || "").startsWith("|")) {
      const remaining = lines.slice(i)
      const { html: tableHtml, consumed } = parseTable(remaining)
      if (consumed > 0) {
        blocks.push(tableHtml)
        i += consumed
        continue
      }
    }

    // Unordered list: lines starting with - or *
    if (/^[-*]\s/.test(trimmed)) {
      const listItems: string[] = []
      while (i < lines.length) {
        const li = (lines[i] || "").trim()
        if (/^[-*]\s/.test(li)) {
          listItems.push(parseInline((li || "").replace(/^[-*]\s+/, "")))
          i++
        } else if ((li || "").length === 0) {
          i++
          break
        } else {
          break
        }
      }
      const itemsHtml = listItems.map((item) => `<li class="ml-4">${item}</li>`).join("")
      blocks.push(`<ul class="list-disc my-3 space-y-1">${itemsHtml}</ul>`)
      continue
    }

    // Ordered list: lines starting with 1. 2. etc.
    if (/^\d+\.\s/.test(trimmed)) {
      const listItems: string[] = []
      while (i < lines.length) {
        const li = (lines[i] || "").trim()
        if (/^\d+\.\s/.test(li)) {
          listItems.push(parseInline((li || "").replace(/^\d+\.\s+/, "")))
          i++
        } else if ((li || "").length === 0) {
          i++
          break
        } else {
          break
        }
      }
      const itemsHtml = listItems.map((item) => `<li class="ml-4">${item}</li>`).join("")
      blocks.push(`<ol class="list-decimal my-3 space-y-1">${itemsHtml}</ol>`)
      continue
    }

    // Paragraph: collect lines until empty line or block element
    const paraLines: string[] = []
    while (i < lines.length) {
      const pLine = lines[i] || ""
      const pTrimmed = (pLine || "").trim()
      if ((pTrimmed || "").length === 0) {
        i++
        break
      }
      // Stop if we hit a block-level element
      if (
        (pTrimmed || "").startsWith("#") ||
        (pTrimmed || "").startsWith("```") ||
        (pTrimmed || "").startsWith(">") ||
        (pTrimmed || "").startsWith("|") ||
        /^[-*]\s/.test(pTrimmed) ||
        /^\d+\.\s/.test(pTrimmed) ||
        /^[-*_]{3,}$/.test(pTrimmed)
      ) {
        break
      }
      paraLines.push(pLine)
      i++
    }

    if (paraLines.length > 0) {
      blocks.push(`<p class="my-3 leading-relaxed">${parseInline(paraLines.join(" "))}</p>`)
    }
  }

  return blocks.join("\n")
}

// ─── Sample Markdown ────────────────────────────────────────────────────────

const SAMPLE_MARKDOWN = `# Welcome to Markdown

This is a **Markdown to HTML** converter. It supports basic Markdown syntax including *headings*, **bold**, *italic*, and ~~strikethrough~~ text.

## Features

Here is what this converter supports:

- Headings from h1 to h4
- **Bold** and *italic* text formatting
- ~~Strikethrough~~ text
- [Links](https://example.com) and ![Images](https://example.com/image.png)
- Unordered and ordered lists
- Inline \`code\` and code blocks

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

## Blockquote

> Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.
> — John Gruber

## Table

| Feature | Supported | Notes |
| --- | --- | --- |
| Headings | Yes | h1 through h4 |
| Bold / Italic | Yes | Both ** and * syntax |
| Links | Yes | Standard [text](url) |
| Code Blocks | Yes | Fenced with triple backticks |
| Tables | Yes | GFM pipe table syntax |

1. First, write your Markdown
2. Then, see the HTML output
3. Finally, copy the result

---

Enjoy using this Markdown to HTML converter!
`

// ─── Component ──────────────────────────────────────────────────────────────

export function MarkdownToHtmlTool() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)

  const htmlOutput = useMemo(() => {
    if ((input || "").trim().length === 0) return ""
    return parseMarkdown(input)
  }, [input])

  const handleCopy = useCallback(async () => {
    if ((htmlOutput || "").trim().length === 0) return
    try {
      await navigator.clipboard.writeText(htmlOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [htmlOutput])

  const handleClear = useCallback(() => {
    setInput("")
  }, [])

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_MARKDOWN)
  }, [])

  return (
    <div className="space-y-6">
      {/* Input Area */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="md-input" className="text-base font-semibold flex items-center gap-2">
              <FileCode className="size-4" />
              Markdown Input
            </Label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="tabular-nums">
                {(input || "").length} chars
              </Badge>
            </div>
          </div>
          <Textarea
            id="md-input"
            placeholder="Type or paste your Markdown text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px] sm:min-h-[260px] resize-y text-base leading-relaxed font-mono"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleLoadSample}>
              <FileCode className="size-4 mr-1.5" />
              Load Sample
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear} disabled={(input || "").trim().length === 0}>
              <RotateCcw className="size-4 mr-1.5" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {(input || "").trim().length > 0 && (
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <FileCode className="size-3.5 mr-1.5" />
            Markdown: {(input || "").length} chars
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Code2 className="size-3.5 mr-1.5" />
            HTML: {(htmlOutput || "").length} chars
          </Badge>
        </div>
      )}

      {/* Output Area */}
      {(input || "").trim().length > 0 && (
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <Tabs defaultValue="html-code">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <TabsList>
                  <TabsTrigger value="html-code" className="gap-1.5">
                    <Code2 className="size-3.5" />
                    HTML Code
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="gap-1.5">
                    <Eye className="size-3.5" />
                    Rendered Preview
                  </TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="size-4 mr-1.5" />
                  {copied ? "Copied!" : "Copy HTML"}
                </Button>
              </div>

              <TabsContent value="html-code" className="mt-4">
                <div className="rounded-lg border border-border bg-muted/50 overflow-hidden">
                  <div className="p-3 sm:p-4 overflow-x-auto max-h-[500px] overflow-y-auto">
                    <pre className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed text-foreground">
                      <code>{htmlOutput}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-4">
                <div className="rounded-lg border border-border bg-background overflow-hidden">
                  <div className="p-4 sm:p-6 overflow-x-auto max-h-[500px] overflow-y-auto prose-custom">
                    <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {(input || "").trim().length === 0 && (
        <Card>
          <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="rounded-full bg-muted p-4">
              <FileCode className="size-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              Start typing Markdown in the input area above, or click &quot;Load Sample&quot; to see a demo.
            </p>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your Text Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All Markdown to HTML conversion happens entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
