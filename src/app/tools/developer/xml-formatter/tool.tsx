"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  FileCode2,
  Copy,
  RotateCcw,
  Minimize2,
  AlertCircle,
  Shield,
  FileJson,
  Check,
  Sparkles,
} from "lucide-react"

// --- Sample XML ---

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore name="City Books" established="2020">
  <book category="fiction" isbn="978-0-13-468599-1">
    <title>The Great Gatsby</title>
    <author>
      <firstName>F. Scott</firstName>
      <lastName>Fitzgerald</lastName>
    </author>
    <year>1925</year>
    <price currency="USD">12.99</price>
    <description>A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.</description>
  </book>
  <book category="science" isbn="978-0-262-13472-9">
    <title>A Brief History of Time</title>
    <author>Stephen Hawking</author>
    <year>1988</year>
    <price currency="USD">15.99</price>
  </book>
  <!-- Special collections -->
  <collection type="featured" active="true">
    <name>Staff Picks</name>
    <item>Catch-22</item>
    <item>1984</item>
  </collection>
</bookstore>`

// --- Indentation Types ---

type IndentType = "2 spaces" | "4 spaces" | "tab"

function getIndentValue(indent: IndentType): string {
  switch (indent) {
    case "2 spaces":
      return "  "
    case "4 spaces":
      return "    "
    case "tab":
      return "\t"
  }
}

// --- XML Formatting (DOMParser + Recursive Traversal) ---

interface FormatResult {
  output: string
  error: string | null
  stats: {
    elements: number
    attributes: number
    depth: number
  }
}

function formatXml(input: string, indentStr: string): FormatResult {
  const trimmed = (input || "").trim()
  if (trimmed.length === 0) {
    return { output: "", error: null, stats: { elements: 0, attributes: 0, depth: 0 } }
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(trimmed, "application/xml")

  const errorNode = doc.querySelector("parsererror")
  if (errorNode) {
    const errorText = errorNode.textContent || "Invalid XML"
    return { output: "", error: errorText, stats: { elements: 0, attributes: 0, depth: 0 } }
  }

  let stats = { elements: 0, attributes: 0, depth: 0 }
  const lines: string[] = []

  // Extract XML declaration from original input
  const declMatch = trimmed.match(/<\?xml[^?]*\?>/)
  if (declMatch) {
    lines.push((declMatch[0] || ""))
  }

  function getIndent(level: number): string {
    return indentStr.repeat(level)
  }

  function serializeNode(node: Node, level: number): void {
    if (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      for (let i = 0; i < node.childNodes.length; i++) {
        serializeNode(node.childNodes[i], level)
      }
      return
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      stats.elements++
      const el = node as Element
      const tagName = el.tagName || "unknown"
      const attrs = el.attributes
      const attrCount = attrs ? attrs.length : 0
      stats.attributes += attrCount
      if (level + 1 > stats.depth) stats.depth = level + 1

      // Build opening tag with attributes
      let openTag = `<${tagName}`
      if (attrs && attrCount > 0) {
        for (let i = 0; i < attrs.length; i++) {
          const attr = attrs[i]
          const attrName = attr.name
          const attrValue = attr.value
          openTag += ` ${attrName}="${attrValue}"`
        }
      }

      const children = el.childNodes
      const hasOnlyText = children.length === 1 && children[0].nodeType === Node.TEXT_NODE
      const textContent = hasOnlyText ? (children[0].textContent || "").trim() : ""

      if (children.length === 0) {
        // Self-closing tag
        lines.push(`${getIndent(level)}${openTag} />`)
      } else if (hasOnlyText && textContent.length > 0) {
        // Element with only inline text content
        lines.push(`${getIndent(level)}${openTag}>${textContent}</${tagName}>`)
      } else if (children.length > 0) {
        // Element with children
        lines.push(`${getIndent(level)}${openTag}>`)
        for (let i = 0; i < children.length; i++) {
          serializeNode(children[i], level + 1)
        }
        lines.push(`${getIndent(level)}</${tagName}>`)
      } else {
        lines.push(`${getIndent(level)}${openTag}></${tagName}>`)
      }
      return
    }

    if (node.nodeType === Node.COMMENT_NODE) {
      const commentText = node.textContent || ""
      lines.push(`${getIndent(level)}<!--${commentText}-->`)
      return
    }

    if (node.nodeType === Node.CDATA_SECTION_NODE) {
      const cdataText = node.textContent || ""
      lines.push(`${getIndent(level)}<![CDATA[${cdataText}]]>`)
      return
    }

    if (node.nodeType === Node.PROCESSING_INSTRUCTION_NODE) {
      const pi = node as ProcessingInstruction
      const piTarget = pi.target || ""
      const piData = pi.data || ""
      // Skip xml declaration (already handled)
      if (piTarget.toLowerCase() === "xml") return
      lines.push(`${getIndent(level)}<?${piTarget} ${piData}?>`)
      return
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent || "").trim()
      if (text.length > 0) {
        lines.push(`${getIndent(level)}${text}`)
      }
      return
    }
  }

  serializeNode(doc, 0)

  return {
    output: lines.join("\n"),
    error: null,
    stats,
  }
}

// --- XML Minification ---

function minifyXml(input: string): FormatResult {
  const trimmed = (input || "").trim()
  if (trimmed.length === 0) {
    return { output: "", error: null, stats: { elements: 0, attributes: 0, depth: 0 } }
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(trimmed, "application/xml")

  const errorNode = doc.querySelector("parsererror")
  if (errorNode) {
    const errorText = errorNode.textContent || "Invalid XML"
    return { output: "", error: errorText, stats: { elements: 0, attributes: 0, depth: 0 } }
  }

  let stats = { elements: 0, attributes: 0, depth: 0 }
  let parts: string[] = []

  // Preserve XML declaration
  const declMatch = trimmed.match(/<\?xml[^?]*\?>/)
  if (declMatch) {
    parts.push((declMatch[0] || ""))
  }

  function serializeNodeMinified(node: Node): void {
    if (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      for (let i = 0; i < node.childNodes.length; i++) {
        serializeNodeMinified(node.childNodes[i])
      }
      return
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      stats.elements++
      const el = node as Element
      const tagName = el.tagName || "unknown"
      const attrs = el.attributes
      const attrCount = attrs ? attrs.length : 0
      stats.attributes += attrCount

      let openTag = `<${tagName}`
      if (attrs && attrCount > 0) {
        for (let i = 0; i < attrs.length; i++) {
          const attr = attrs[i]
          openTag += ` ${attr.name}="${attr.value}"`
        }
      }

      const children = el.childNodes
      if (children.length === 0) {
        parts.push(`${openTag} />`)
      } else {
        parts.push(`${openTag}>`)
        for (let i = 0; i < children.length; i++) {
          serializeNodeMinified(children[i])
        }
        parts.push(`</${tagName}>`)
      }
      return
    }

    if (node.nodeType === Node.COMMENT_NODE) {
      const commentText = node.textContent || ""
      parts.push(`<!--${commentText}-->`)
      return
    }

    if (node.nodeType === Node.CDATA_SECTION_NODE) {
      const cdataText = node.textContent || ""
      parts.push(`<![CDATA[${cdataText}]]>`)
      return
    }

    if (node.nodeType === Node.PROCESSING_INSTRUCTION_NODE) {
      const pi = node as ProcessingInstruction
      if ((pi.target || "").toLowerCase() === "xml") return
      parts.push(`<?${pi.target || ""} ${pi.data || ""}?>`)
      return
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent || "").trim()
      if (text.length > 0) {
        parts.push(text)
      }
      return
    }
  }

  serializeNodeMinified(doc)

  return {
    output: parts.join(""),
    error: null,
    stats,
  }
}

// --- Syntax Highlighting ---

function escapeHtml(str: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function highlightXml(xml: string): string {
  const escaped = escapeHtml(xml)
  const lines = (escaped || "").split("\n")
  return lines
    .map((line) => {
      const trimmedLine = (line || "").trimStart()
      const leadingWhitespace = (line || "").substring(0, (line || "").length - (trimmedLine || "").length)

      // XML declaration
      if (/^&lt;\?xml/.test(trimmedLine)) {
        return `${leadingWhitespace}<span class="text-purple-600 dark:text-purple-400">${trimmedLine}</span>`
      }

      // Comment
      if (/^&lt;!--/.test(trimmedLine)) {
        return `${leadingWhitespace}<span class="text-muted-foreground italic">${trimmedLine}</span>`
      }

      // Processing instruction
      if (/^&lt;\?/.test(trimmedLine)) {
        return `${leadingWhitespace}<span class="text-purple-600 dark:text-purple-400">${trimmedLine}</span>`
      }

      // Self-closing tag with attributes
      let result = trimmedLine
        .replace(
          /^(&lt;)(\w[\w:.-]*)(\s[^&]*?)(\s*\/?&gt;)/,
          (_match, open, tag, attrStr, close) => {
            const highlightedAttrs = (attrStr || "").replace(
              /(\w[\w:.-]*)(=)(&quot;)(.*?)(&quot;)/g,
              '<span class="text-amber-600 dark:text-amber-400">$1</span>$2<span class="text-emerald-600 dark:text-emerald-400">$3$4$5</span>'
            )
            return `<span class="text-blue-600 dark:text-blue-400">${open}${tag}</span>${highlightedAttrs}<span class="text-blue-600 dark:text-blue-400">${close}</span>`
          }
        )
        // Self-closing tag without attributes
        .replace(
          /^(&lt;)(\w[\w:.-]*)(\s*\/?&gt;)/,
          '<span class="text-blue-600 dark:text-blue-400">$1$2$3</span>'
        )
        // Opening tag with attributes and text content on same line
        .replace(
          /^(&lt;)(\w[\w:.-]*)(\s[^&]*?)(&gt;)(.*?)(<\/)(\w[\w:.-]*?)(&gt;)$/,
          (_match, open, tag, attrStr, gt, text, closeOpen, closeTag, closeGt) => {
            const highlightedAttrs = (attrStr || "").replace(
              /(\w[\w:.-]*)(=)(&quot;)(.*?)(&quot;)/g,
              '<span class="text-amber-600 dark:text-amber-400">$1</span>$2<span class="text-emerald-600 dark:text-emerald-400">$3$4$5</span>'
            )
            return `<span class="text-blue-600 dark:text-blue-400">${open}${tag}</span>${highlightedAttrs}<span class="text-blue-600 dark:text-blue-400">${gt}</span>${text}<span class="text-blue-600 dark:text-blue-400">${closeOpen}${closeTag}${closeGt}</span>`
          }
        )
        // Opening tag with text and closing tag (no attributes)
        .replace(
          /^(&lt;)(\w[\w:.-]*?)(&gt;)(.*?)(<\/)(\w[\w:.-]*?)(&gt;)$/,
          '<span class="text-blue-600 dark:text-blue-400">$1$2$3</span>$4<span class="text-blue-600 dark:text-blue-400">$5$6$7</span>'
        )
        // Opening tag with attributes only
        .replace(
          /^(&lt;)(\w[\w:.-]*)(\s[^&]*?)(&gt;)/,
          (_match, open, tag, attrStr, gt) => {
            const highlightedAttrs = (attrStr || "").replace(
              /(\w[\w:.-]*)(=)(&quot;)(.*?)(&quot;)/g,
              '<span class="text-amber-600 dark:text-amber-400">$1</span>$2<span class="text-emerald-600 dark:text-emerald-400">$3$4$5</span>'
            )
            return `<span class="text-blue-600 dark:text-blue-400">${open}${tag}</span>${highlightedAttrs}<span class="text-blue-600 dark:text-blue-400">${gt}</span>`
          }
        )
        // Opening tag without attributes
        .replace(
          /^(&lt;)(\w[\w:.-]*?)(&gt;)/,
          '<span class="text-blue-600 dark:text-blue-400">$1$2$3</span>'
        )
        // Closing tag
        .replace(
          /^(&lt;\/)(\w[\w:.-]*?)(&gt;)/,
          '<span class="text-blue-600 dark:text-blue-400">$1$2$3</span>'
        )

      return `${leadingWhitespace}${result}`
    })
    .join("\n")
}

// --- Component ---

export function XmlFormatterTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [indent, setIndent] = useState<IndentType>("2 spaces")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState({ elements: 0, attributes: 0, depth: 0 })
  const [hasOutput, setHasOutput] = useState(false)

  // --- Computed values ---

  const inputBytes = useMemo(
    () => new TextEncoder().encode(input || "").length,
    [input]
  )

  const outputBytes = useMemo(
    () => new TextEncoder().encode(output || "").length,
    [output]
  )

  const highlightedOutput = useMemo(() => {
    if ((output || "").trim().length === 0) return ""
    return highlightXml(output)
  }, [output])

  // --- Actions ---

  const handleFormat = useCallback(() => {
    const indentStr = getIndentValue(indent)
    const result = formatXml(input, indentStr)
    setOutput(result.output)
    setError(result.error)
    setStats(result.stats)
    setHasOutput(result.output.length > 0)
  }, [input, indent])

  const handleMinify = useCallback(() => {
    const result = minifyXml(input)
    setOutput(result.output)
    setError(result.error)
    setStats(result.stats)
    setHasOutput(result.output.length > 0)
  }, [input])

  const handleCopy = useCallback(async () => {
    if ((output || "").trim().length === 0) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setError(null)
    setStats({ elements: 0, attributes: 0, depth: 0 })
    setHasOutput(false)
  }, [])

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_XML)
    setError(null)
    setOutput("")
    setStats({ elements: 0, attributes: 0, depth: 0 })
    setHasOutput(false)
  }, [])

  const handleInputChange = useCallback((v: string) => {
    setInput(v)
    setError(null)
    setOutput("")
    setStats({ elements: 0, attributes: 0, depth: 0 })
    setHasOutput(false)
  }, [])

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Top action row */}
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleFormat} size="sm" className="gap-1.5">
              <Sparkles className="size-4" />
              Format
            </Button>
            <Button onClick={handleMinify} variant="outline" size="sm" className="gap-1.5">
              <Minimize2 className="size-4" />
              Minify
            </Button>
            <Separator orientation="vertical" className="hidden sm:block h-6" />
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              disabled={(output || "").trim().length === 0}
              className="gap-1.5"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy Output"}
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm" className="gap-1.5">
              <RotateCcw className="size-4" />
              Clear
            </Button>
            <Button onClick={handleLoadSample} variant="ghost" size="sm" className="gap-1.5 ml-auto">
              <FileJson className="size-4" />
              Load Sample
            </Button>
          </div>

          {/* Indentation selector */}
          <div className="flex items-center gap-3">
            <Label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Indentation:</Label>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["2 spaces", "4 spaces", "tab"] as IndentType[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setIndent(opt)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    indent === opt
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  } ${opt !== "tab" ? "border-r border-border" : ""}`}
                >
                  {opt === "tab" ? "Tab" : opt}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input & Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="xml-input" className="text-base font-semibold flex items-center gap-2">
                <FileCode2 className="size-4" />
                Input XML
              </Label>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {inputBytes.toLocaleString()} bytes
              </Badge>
            </div>
            <Textarea
              id="xml-input"
              placeholder={'<root><item>Paste your XML here</item></root>'}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              className="min-h-[300px] sm:min-h-[380px] resize-y font-mono text-sm leading-relaxed"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold flex items-center gap-2">
                <FileJson className="size-4" />
                Formatted Output
              </Label>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {outputBytes.toLocaleString()} bytes
              </Badge>
            </div>
            <div className="relative min-h-[300px] sm:min-h-[380px] rounded-md border border-input bg-muted/50 p-3 overflow-auto">
              {(highlightedOutput || "").trim().length > 0 ? (
                <pre
                  className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{ __html: highlightedOutput }}
                />
              ) : (
                <p className="text-sm text-muted-foreground font-mono">
                  Formatted XML will appear here...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                Invalid XML
              </p>
              <p className="text-xs text-red-700/80 dark:text-red-400/80 break-all">
                {(error || "").substring(0, 500)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      {hasOutput && (
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Stats:</span>
              <Badge variant="outline" className="tabular-nums text-xs">
                Input: {inputBytes.toLocaleString()} bytes
              </Badge>
              <Badge variant="outline" className="tabular-nums text-xs">
                Output: {outputBytes.toLocaleString()} bytes
              </Badge>
              <Badge variant="outline" className="tabular-nums text-xs">
                {stats.elements.toLocaleString()} {stats.elements === 1 ? "element" : "elements"}
              </Badge>
              <Badge variant="outline" className="tabular-nums text-xs">
                {stats.attributes.toLocaleString()} {stats.attributes === 1 ? "attribute" : "attributes"}
              </Badge>
              <Badge variant="outline" className="tabular-nums text-xs">
                Depth: {stats.depth}
              </Badge>
            </div>
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
              100% Private — Your XML Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All formatting, minification, and validation are performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
