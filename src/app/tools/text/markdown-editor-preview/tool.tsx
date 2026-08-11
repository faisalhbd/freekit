"use client"

import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  FileText,
  Bold,
  Italic,
  Heading,
  Link,
  ImageIcon,
  Code,
  List,
  ListOrdered,
  Quote,
  Table,
  Minus,
  Copy,
  RotateCcw,
  Download,
  Eye,
  Shield,
} from "lucide-react"

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
      const langAttr = (lang || "").length > 0 ? ` data-language="${escapeHtml(lang)}"` : ""
      blocks.push(`<pre class="rounded-lg bg-muted p-4 overflow-x-auto my-3"><code class="text-sm font-mono"${langAttr}>${codeContent}</code></pre>`)
      continue
    }

    // Headings: # ## ### ####
    const headingMatch = (trimmed || "").match(/^(#{1,4})\s+(.+)/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const content = parseInline(headingMatch[2] || "")
      const sizeClass = level === 1 ? "text-3xl" : level === 2 ? "text-2xl" : level === 3 ? "text-xl" : "text-lg"
      blocks.push(`<h${level} class="font-bold mt-6 mb-3 ${sizeClass}">${content}</h${level}>`)
      i++
      continue
    }

    // Horizontal rules: --- or *** or ___
    if (/^[-*_]{3,}$/.test(trimmed)) {
      blocks.push("<hr class=\"my-6 border-border\" />")
      i++
      continue
    }

    // Blockquote: > text
    if ((trimmed || "").startsWith(">")) {
      const quoteLines: string[] = []
      while (i < lines.length && ((lines[i] || "").trim().startsWith(">"))) {
        const qLine = (lines[i] || "").trim()
        quoteLines.push(parseInline((qLine || "").replace(/^>\s?/, "")))
        i++
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

const SAMPLE_MARKDOWN = `# Markdown Editor & Preview

Welcome to the **Markdown Editor & Preview** tool! Write Markdown on the left and see the *rendered output* on the right in real time.

## Features

- **Live preview** — See your formatted text as you type
- **Toolbar shortcuts** — Quick buttons for common formatting
- **Export options** — Copy HTML or download as a file
- **GFM support** — Tables, strikethrough, and fenced code blocks
- **100% private** — Everything runs in your browser

## Formatting Examples

### Text Styles

You can write **bold text**, *italic text*, and ~~strikethrough~~. You can also combine **_bold and italic_** together.

### Links and Images

Visit [FreeKit](https://freekit.online) for more free tools.

![Placeholder Image](https://placehold.co/600x200/e2e8f0/475569?text=Sample+Image)

### Code

Inline code looks like \`const x = 42\` within a sentence.

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

### Blockquote

> The best way to predict the future is to invent it.
> — Alan Kay

### Table

| Feature | Status | Notes |
| --- | --- | --- |
| Headings | Supported | h1 through h4 |
| Bold / Italic | Supported | ** and * syntax |
| Links | Supported | Standard [text](url) |
| Code Blocks | Supported | Fenced with triple backticks |
| Tables | Supported | GFM pipe table syntax |

### Ordered List

1. First, write your Markdown in the editor
2. Watch the preview update in real time
3. Use the toolbar to format quickly
4. Export your HTML when you're done

---

Enjoy writing with Markdown!
`

// ─── Toolbar Button Type ────────────────────────────────────────────────────

interface ToolbarAction {
  icon: React.ReactNode
  label: string
  insert: (selected: string) => { before: string; after: string; placeholder: string }
}

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  {
    icon: <Bold className="size-4" />,
    label: "Bold",
    insert: (sel) => sel ? { before: "**", after: "**", placeholder: sel } : { before: "**", after: "**", placeholder: "bold text" },
  },
  {
    icon: <Italic className="size-4" />,
    label: "Italic",
    insert: (sel) => sel ? { before: "*", after: "*", placeholder: sel } : { before: "*", after: "*", placeholder: "italic text" },
  },
  {
    icon: <Heading className="size-4" />,
    label: "Heading",
    insert: () => ({ before: "## ", after: "", placeholder: "Heading" }),
  },
  {
    icon: <Link className="size-4" />,
    label: "Link",
    insert: (sel) => sel ? { before: "[", after: "](https://example.com)", placeholder: sel } : { before: "[", after: "](https://example.com)", placeholder: "link text" },
  },
  {
    icon: <ImageIcon className="size-4" />,
    label: "Image",
    insert: (sel) => sel ? { before: "![", after: "](https://example.com/image.png)", placeholder: sel } : { before: "![", after: "](https://example.com/image.png)", placeholder: "alt text" },
  },
  {
    icon: <Code className="size-4" />,
    label: "Code",
    insert: (sel) => sel ? { before: "`", after: "`", placeholder: sel } : { before: "`", after: "`", placeholder: "code" },
  },
  {
    icon: <List className="size-4" />,
    label: "Unordered List",
    insert: () => ({ before: "- ", after: "", placeholder: "List item" }),
  },
  {
    icon: <ListOrdered className="size-4" />,
    label: "Ordered List",
    insert: () => ({ before: "1. ", after: "", placeholder: "List item" }),
  },
  {
    icon: <Quote className="size-4" />,
    label: "Blockquote",
    insert: () => ({ before: "> ", after: "", placeholder: "Blockquote" }),
  },
  {
    icon: <Table className="size-4" />,
    label: "Table",
    insert: () => ({
      before: "| Header 1 | Header 2 | Header 3 |\n| --- | --- | --- |\n| ",
      after: " | Cell 2 | Cell 3 |",
      placeholder: "Cell 1",
    }),
  },
  {
    icon: <Minus className="size-4" />,
    label: "Horizontal Rule",
    insert: () => ({ before: "\n---\n", after: "", placeholder: "" }),
  },
]

// ─── Component ──────────────────────────────────────────────────────────────

export function MarkdownEditorPreviewTool() {
  const [input, setInput] = useState("")
  const [previewHtml, setPreviewHtml] = useState("")
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Word count helper
  const wordCount = useMemo(() => {
    const text = (input || "").trim()
    if (text.length === 0) return 0
    return text.split(/\s+/).filter((w) => (w || "").length > 0).length
  }, [input])

  const charCount = (input || "").length

  // Debounced preview update
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setPreviewHtml(parseMarkdown(input))
    }, 150)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [input])

  // Handle toolbar insert
  const handleToolbarAction = useCallback((action: ToolbarAction) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = (input || "").substring(start, end)
    const { before, after, placeholder } = action.insert(selected || "")

    const newInput = (input || "").substring(0, start) + before + placeholder + after + (input || "").substring(end)
    setInput(newInput)

    // Restore cursor position
    requestAnimationFrame(() => {
      textarea.focus()
      if (selected) {
        // If text was selected, highlight the wrapped text
        textarea.selectionStart = start + before.length
        textarea.selectionEnd = start + before.length + placeholder.length
      } else {
        // If no selection, place cursor at placeholder
        textarea.selectionStart = start + before.length
        textarea.selectionEnd = start + before.length + placeholder.length
      }
    })
  }, [input])

  // Copy HTML
  const handleCopyHtml = useCallback(async () => {
    if ((previewHtml || "").trim().length === 0) return
    try {
      await navigator.clipboard.writeText(previewHtml)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [previewHtml])

  // Clear
  const handleClear = useCallback(() => {
    setInput("")
  }, [])

  // Load sample
  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_MARKDOWN)
  }, [])

  // Export HTML
  const handleExport = useCallback(() => {
    if ((previewHtml || "").trim().length === 0) return
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Export</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; color: #1a1a1a; }
    pre { background: #f5f5f5; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; }
    code { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.9em; }
    blockquote { border-left: 4px solid #6366f1; padding-left: 1rem; color: #666; font-style: italic; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 0.5rem 0.75rem; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    img { max-width: 100%; height: auto; }
    hr { border: none; border-top: 1px solid #ddd; margin: 1.5rem 0; }
  </style>
</head>
<body>
${previewHtml}
</body>
</html>`
    const blob = new Blob([fullHtml], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "markdown-export.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [previewHtml])

  return (
    <TooltipProvider delayDuration={300}>
    <div className="space-y-4">
      {/* Toolbar */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-wrap items-center gap-1">
            {TOOLBAR_ACTIONS.map((action) => (
              <Tooltip key={action.label}>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 sm:size-9"
                    onClick={() => handleToolbarAction(action)}
                  >
                    {action.icon}
                    <span className="sr-only">{action.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{action.label}</TooltipContent>
              </Tooltip>
            ))}

            <div className="ml-auto flex items-center gap-1.5">
              <Button variant="outline" size="sm" onClick={handleLoadSample}>
                <FileText className="size-4 mr-1.5" />
                <span className="hidden sm:inline">Sample</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyHtml} disabled={(previewHtml || "").trim().length === 0}>
                <Copy className="size-4 mr-1.5" />
                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy HTML"}</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear} disabled={(input || "").trim().length === 0}>
                <RotateCcw className="size-4 mr-1.5" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} disabled={(previewHtml || "").trim().length === 0}>
                <Download className="size-4 mr-1.5" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Split Pane Editor + Preview */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border" style={{ minHeight: "500px" }}>
          {/* Editor Pane */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
              <Label className="text-sm font-semibold flex items-center gap-1.5">
                <FileText className="size-3.5" />
                Editor
              </Label>
              <Badge variant="secondary" className="text-xs tabular-nums">
                {wordCount} words · {charCount} chars
              </Badge>
            </div>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start typing Markdown here...

# Heading
**Bold** and *italic* text
- List items
[Links](url) and `code`

Or click **Sample** to load a demo."
              className="flex-1 w-full p-4 resize-none bg-background text-sm leading-relaxed font-mono focus:outline-none placeholder:text-muted-foreground/60"
              spellCheck={false}
            />
          </div>

          {/* Preview Pane */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
              <Label className="text-sm font-semibold flex items-center gap-1.5">
                <Eye className="size-3.5" />
                Preview
              </Label>
              {(previewHtml || "").trim().length > 0 && (
                <Badge variant="secondary" className="text-xs tabular-nums">
                  {(previewHtml || "").length} chars HTML
                </Badge>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {(previewHtml || "").trim().length > 0 ? (
                <div
                  className="prose-custom max-w-none"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-12">
                  <Eye className="size-10 mb-3 opacity-30" />
                  <p className="text-sm">Start typing to see the preview</p>
                  <p className="text-xs mt-1 opacity-70">or click &quot;Sample&quot; to load a demo</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your Text Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All Markdown parsing and preview rendering happens entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  )
}