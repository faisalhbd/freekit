"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Copy,
  Check,
  RotateCcw,
  ArrowLeftRight,
  Shield,
} from "lucide-react"

// --- Decode HTML entities ---

function decodeEntities(text: string): string {
  return (text || "")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(Number(`0x${code}`)))
    .replace(/&nbsp;/gi, " ")
}

// --- Convert children to markdown text ---

function childrenToMarkdown(el: ChildNode | null, listType?: "ul" | "ol"): string {
  if (!el) return ""
  if (el.nodeType === Node.TEXT_NODE) {
    return (el.textContent || "").replace(/\s+/g, " ")
  }
  if (el.nodeType !== Node.ELEMENT_NODE) return ""
  const element = el as HTMLElement
  const tag = element.tagName.toLowerCase()

  // Skip non-content elements
  if (["script", "style", "head", "meta", "link", "noscript"].includes(tag)) return ""

  const children = Array.from(element.childNodes)
    .map((child) => childrenToMarkdown(child, listType))
    .join("")

  switch (tag) {
    case "h1": return `# ${children.trim()}\n\n`
    case "h2": return `## ${children.trim()}\n\n`
    case "h3": return `### ${children.trim()}\n\n`
    case "h4": return `#### ${children.trim()}\n\n`
    case "h5": return `##### ${children.trim()}\n\n`
    case "h6": return `###### ${children.trim()}\n\n`
    case "p": return `${children.trim()}\n\n`
    case "strong": case "b": return `**${children}**`
    case "em": case "i": return `*${children}*`
    case "a": {
      const href = element.getAttribute("href") || ""
      return `[${children}](${href})`
    }
    case "img": {
      const alt = element.getAttribute("alt") || ""
      const src = element.getAttribute("src") || ""
      return `![${alt}](${src})`
    }
    case "br": return "\n"
    case "hr": return "\n---\n\n"
    case "code": {
      // Check if parent is <pre>
      if (element.parentElement?.tagName.toLowerCase() === "pre") {
        return children
      }
      return `\`${children}\``
    }
    case "pre": {
      const code = children.trim()
      return `\n\`\`\`\n${code}\n\`\`\`\n\n`
    }
    case "blockquote": {
      const lines = children.trim().split("\n")
      return lines.map((l: string) => `> ${l}`).join("\n") + "\n\n"
    }
    case "ul": {
      const items = Array.from(element.children)
        .filter((c) => c.tagName.toLowerCase() === "li")
        .map((li: Element) => {
          const content = Array.from(li.childNodes).map((c) => childrenToMarkdown(c)).join("").trim()
          return `- ${content}`
        })
      return items.join("\n") + "\n\n"
    }
    case "ol": {
      const items = Array.from(element.children)
        .filter((c) => c.tagName.toLowerCase() === "li")
        .map((li: Element, idx: number) => {
          const content = Array.from(li.childNodes).map((c) => childrenToMarkdown(c)).join("").trim()
          return `${idx + 1}. ${content}`
        })
      return items.join("\n") + "\n\n"
    }
    case "table": {
      const rows: string[][] = []
      const trs = element.querySelectorAll("tr")
      trs.forEach((tr) => {
        const cells: string[] = []
        tr.querySelectorAll("th, td").forEach((cell) => {
          cells.push((cell.textContent || "").trim().replace(/\|/g, "\\|"))
        })
        if (cells.length > 0) rows.push(cells)
      })
      if (rows.length === 0) return ""
      const colCount = Math.max(...rows.map((r) => r.length))
      // Pad rows
      rows.forEach((r) => { while (r.length < colCount) r.push("") })
      const header = `| ${rows[0].join(" | ")} |`
      const sep = `| ${rows[0].map(() => "---").join(" | ")} |`
      const body = rows.slice(1).map((r) => `| ${r.join(" | ")} |`).join("\n")
      return `${header}\n${sep}\n${body}\n\n`
    }
    case "div": case "section": case "article": case "main": case "header": case "footer": case "nav":
      return children + "\n"
    case "span": case "small": case "mark": case "abbr":
      return children
    default:
      // Keep text content of unknown tags
      return children
  }
}

// --- Main conversion ---

function htmlToMarkdown(html: string): string {
  const input = (html || "").trim()
  if (input.length === 0) return ""

  // Wrap in div if needed to ensure valid parsing
  const wrapped = `<div>${input}</div>`
  const parser = new DOMParser()
  const doc = parser.parseFromString(wrapped, "text/html")
  const body = doc.body

  let result = ""
  for (const child of Array.from(body.childNodes)) {
    result += childrenToMarkdown(child)
  }

  return result.replace(/\n{3,}/g, "\n\n").trim()
}

// --- Sample HTML ---

const SAMPLE_HTML = `<h1>Getting Started Guide</h1>
<p>Welcome to our documentation. Here you will find everything you need to <strong>get started</strong> with our platform.</p>

<h2>Features</h2>
<ul>
  <li><strong>Fast</strong> — Blazing fast performance</li>
  <li><em>Secure</em> — Enterprise-grade security</li>
  <li>Easy to use — <a href="https://example.com/docs">Read the docs</a></li>
</ul>

<h2>Code Example</h2>
<pre><code>const greeting = "Hello, World!";
console.log(greeting);</code></pre>

<h2>Comparison Table</h2>
<table>
  <tr><th>Plan</th><th>Price</th><th>Features</th></tr>
  <tr><td>Free</td><td>$0</td><td>Basic features</td></tr>
  <tr><td>Pro</td><td>$29/mo</td><td>All features</td></tr>
</table>

<blockquote>
  <p>This is a blockquote with <em>emphasis</em> inside it.</p>
</blockquote>

<hr>
<p>Thanks for reading! Check out our <a href="https://example.com">website</a> for more.</p>`

// --- Component ---

export function HtmlToMarkdownTool() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => {
    return htmlToMarkdown(input)
  }, [input])

  const handleCopy = useCallback(async () => {
    if ((output || "").length === 0) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback */ }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
  }, [])

  const handleSwap = useCallback(() => {
    if ((output || "").length === 0) return
    setInput(output)
  }, [output])

  return (
    <div className="space-y-6">
      {/* Input & Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="html-input" className="text-base font-semibold flex items-center gap-2">
                <FileText className="size-4" />
                HTML Input
              </Label>
              <Button variant="ghost" size="sm" onClick={() => setInput(SAMPLE_HTML)} className="text-xs gap-1">
                Load Sample
              </Button>
            </div>
            <Textarea
              id="html-input"
              placeholder="Paste your HTML markup here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[350px] sm:min-h-[400px] resize-y font-mono text-sm leading-relaxed"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <FileText className="size-4" />
              Markdown Output
            </Label>
            <div className="relative min-h-[350px] sm:min-h-[400px] rounded-md border border-input bg-muted/50 p-3 overflow-auto max-h-96">
              {(output || "").trim().length > 0 ? (
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground">
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground font-mono">Markdown output will appear here...</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy Markdown"}
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm" className="gap-1.5">
              <RotateCcw className="size-4" />
              Clear
            </Button>
            <Button onClick={handleSwap} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              <ArrowLeftRight className="size-4" />
              Swap
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your HTML Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All HTML to Markdown conversion happens entirely in your browser. No content is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}