"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Database,
  Copy,
  Check,
  RotateCcw,
  ArrowLeftRight,
  Shield,
  Wand2,
} from "lucide-react"

// --- SQL Keywords ---

const MAIN_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "SET",
  "GROUP BY", "ORDER BY", "HAVING",
  "INSERT INTO", "VALUES",
  "UPDATE", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "DROP INDEX", "CREATE INDEX",
  "LIMIT", "OFFSET",
  "UNION ALL", "UNION",
]

const JOIN_KEYWORDS = [
  "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "CROSS JOIN", "FULL OUTER JOIN", "FULL JOIN",
  "LEFT OUTER JOIN", "RIGHT OUTER JOIN",
  "JOIN",
]

const CONDITION_KEYWORDS = ["ON", "AND", "OR"]

const ALL_KEYWORDS = [
  ...MAIN_KEYWORDS, ...JOIN_KEYWORDS, ...CONDITION_KEYWORDS,
  "AS", "CASE", "WHEN", "THEN", "ELSE", "END",
  "INTO", "NOT", "IN", "EXISTS", "BETWEEN", "LIKE", "IS", "NULL",
  "ASC", "DESC", "DISTINCT", "ALL", "ANY", "SOME",
  "TRUE", "FALSE",
  "IF", "NOT NULL", "PRIMARY KEY", "FOREIGN KEY", "REFERENCES", "DEFAULT", "AUTO_INCREMENT",
  "ADD", "COLUMN", "MODIFY", "CHANGE", "RENAME",
  "INDEX", "UNIQUE", "KEY", "CONSTRAINT",
]

// --- SQL Formatter ---

function formatSQL(sql: string, indentSize: number, uppercaseKeywords: boolean): string {
  // Tokenize: split into tokens (keywords, strings, identifiers, operators, punctuation, whitespace)
  const tokens: { type: "keyword" | "string" | "comment" | "other"; value: string }[] = []
  let i = 0
  const input = (sql || "")

  while (i < input.length) {
    // Single-line comment
    if (input[i] === '-' && i + 1 < input.length && input[i + 1] === '-') {
      let end = input.indexOf('\n', i)
      if (end === -1) end = input.length
      tokens.push({ type: "comment", value: input.slice(i, end) })
      i = end
      continue
    }
    // Multi-line comment
    if (input[i] === '/' && i + 1 < input.length && input[i + 1] === '*') {
      let end = input.indexOf('*/', i + 2)
      if (end === -1) end = input.length
      else end += 2
      tokens.push({ type: "comment", value: input.slice(i, end) })
      i = end
      continue
    }
    // String literal
    if (input[i] === "'") {
      let j = i + 1
      while (j < input.length) {
        if (input[j] === "'" && j + 1 < input.length && input[j + 1] === "'") {
          j += 2
          continue
        }
        if (input[j] === "'") { j++; break }
        j++
      }
      tokens.push({ type: "string", value: input.slice(i, j) })
      i = j
      continue
    }
    // Word (identifier or keyword)
    if (/[a-zA-Z_]/.test(input[i])) {
      let j = i
      while (j < input.length && /[a-zA-Z0-9_.]/.test(input[j])) j++
      const word = input.slice(i, j)
      const isKeyword = ALL_KEYWORDS.includes(word.toUpperCase())
      tokens.push({ type: isKeyword ? "keyword" : "other", value: word })
      i = j
      continue
    }
    // Whitespace
    if (/[\s]/.test(input[i])) {
      i++
      continue
    }
    // Everything else (operators, punctuation, numbers)
    tokens.push({ type: "other", value: input[i] })
    i++
  }

  // Build formatted output
  let output = ""
  let indent = 0
  const pad = " ".repeat(indentSize)

  for (let t = 0; t < tokens.length; t++) {
    const token = tokens[t]
    const val = token.type === "keyword" && uppercaseKeywords
      ? token.value.toUpperCase()
      : token.value

    const upperVal = token.value.toUpperCase()

    // Main keywords: new line at current indent
    if (MAIN_KEYWORDS.includes(upperVal)) {
      if (output.length > 0 && (output[output.length - 1] !== '\n')) output += '\n'
      // Decrease indent for certain keywords that follow a block
      if (["GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "UNION ALL", "UNION"].includes(upperVal)) {
        indent = Math.max(0, indent - 1)
      }
      output += pad.repeat(indent) + val + "\n"
      indent++
      continue
    }

    // JOIN keywords: new line at current indent, stay at same level
    if (JOIN_KEYWORDS.includes(upperVal)) {
      if (output.length > 0 && (output[output.length - 1] !== '\n')) output += '\n'
      output += pad.repeat(indent) + val + "\n"
      continue
    }

    // ON: indent inside JOIN
    if (upperVal === "ON") {
      output += pad.repeat(indent) + val + " "
      continue
    }

    // AND/OR: indent inside WHERE/ON
    if (upperVal === "AND" || upperVal === "OR") {
      output += '\n' + pad.repeat(indent) + val + " "
      continue
    }

    // CASE/END
    if (upperVal === "CASE") {
      output += val + "\n"
      indent++
      continue
    }
    if (upperVal === "END") {
      indent = Math.max(0, indent - 1)
      output += '\n' + pad.repeat(indent) + val
      continue
    }
    if (upperVal === "WHEN") {
      output += pad.repeat(indent) + val + " "
      continue
    }
    if (upperVal === "THEN") {
      output += val + " "
      continue
    }
    if (upperVal === "ELSE") {
      output += '\n' + pad.repeat(indent) + val + " "
      continue
    }

    // Comma: new line for column lists after SELECT, otherwise inline
    if (val === ",") {
      output += ",\n" + pad.repeat(indent)
      continue
    }

    // Parentheses
    if (val === "(") {
      output += val
      continue
    }
    if (val === ")") {
      output += val
      continue
    }

    // Comments
    if (token.type === "comment") {
      output += '\n' + pad.repeat(indent) + val + '\n'
      continue
    }

    // Default: add with space if needed
    const lastChar = output[output.length - 1]
    if (lastChar && lastChar !== ' ' && lastChar !== '\n' && lastChar !== '(' && val !== ')' && val !== ',' && val !== '.' && val !== ';') {
      output += " "
    }
    output += val
  }

  return output.replace(/\n{3,}/g, '\n\n').trim()
}

// --- Count keywords ---

function countKeywords(sql: string): number {
  const regex = /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|CROSS|FULL|ON|AND|OR|GROUP|BY|ORDER|HAVING|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|LIMIT|OFFSET|UNION|AS|CASE|WHEN|THEN|ELSE|END)\b/gi
  return ((sql || "").match(regex) || []).length
}

// --- Sample SQL ---

const SAMPLE_SQL = `SELECT u.id, u.name, u.email, o.order_id, o.total_amount, p.product_name FROM users u LEFT JOIN orders o ON u.id = o.user_id LEFT JOIN order_items oi ON o.order_id = oi.order_id LEFT JOIN products p ON oi.product_id = p.id WHERE u.status = 'active' AND o.created_at >= '2024-01-01' AND o.total_amount > 100 GROUP BY u.id, u.name, u.email, o.order_id, o.total_amount, p.product_name HAVING COUNT(oi.item_id) > 2 ORDER BY o.total_amount DESC LIMIT 50`

// --- Component ---

export function SqlFormatterTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [indentSize, setIndentSize] = useState<2 | 4>(2)
  const [uppercaseKeywords, setUppercaseKeywords] = useState(true)
  const [copied, setCopied] = useState(false)

  const stats = useMemo(() => {
    const out = output || ""
    const lines = (out || "").length > 0 ? out.split("\n").length : 0
    const kwCount = countKeywords(out)
    return { lineCount: lines, keywordCount: kwCount }
  }, [output])

  const handleFormat = useCallback(() => {
    const sql = (input || "").trim()
    if (sql.length === 0) return
    const formatted = formatSQL(sql, indentSize, uppercaseKeywords)
    setOutput(formatted)
  }, [input, indentSize, uppercaseKeywords])

  // Re-format when options change if there's output
  useMemo(() => {
    if ((output || "").length > 0) {
      // We don't auto-reformat to avoid confusion; user clicks Format
    }
  }, [indentSize, uppercaseKeywords])

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
    setOutput("")
  }, [])

  const handleSwap = useCallback(() => {
    if ((output || "").length === 0) return
    setInput(output)
    setOutput("")
  }, [output])

  return (
    <div className="space-y-6">
      {/* Options */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Indent:</Label>
              <div className="flex rounded-lg border border-border overflow-hidden">
                {([2, 4] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => setIndentSize(n)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      indentSize === n
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-muted"
                    } ${n === 2 ? "border-r border-border" : ""}`}
                  >
                    {n} spaces
                  </button>
                ))}
              </div>
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-5" />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="uppercase-toggle"
                checked={uppercaseKeywords}
                onChange={(e) => setUppercaseKeywords(e.target.checked)}
                className="size-4 rounded border-border accent-primary"
              />
              <Label htmlFor="uppercase-toggle" className="text-sm cursor-pointer">Uppercase Keywords</Label>
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-5" />

            <Button onClick={handleFormat} size="sm" className="gap-1.5">
              <Wand2 className="size-4" />
              Format SQL
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Input & Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="sql-input" className="text-base font-semibold flex items-center gap-2">
                <Database className="size-4" />
                SQL Input
              </Label>
              <Button variant="ghost" size="sm" onClick={() => setInput(SAMPLE_SQL)} className="text-xs gap-1">
                Load Sample
              </Button>
            </div>
            <Textarea
              id="sql-input"
              placeholder="Paste your SQL query here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[350px] sm:min-h-[400px] resize-y font-mono text-sm leading-relaxed"
              spellCheck={false}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault()
                  handleFormat()
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Database className="size-4" />
              Formatted Output
            </Label>
            <div className="relative min-h-[350px] sm:min-h-[400px] rounded-md border border-input bg-muted/50 p-3 overflow-auto max-h-96">
              {(output || "").trim().length > 0 ? (
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground">
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground font-mono">Formatted SQL will appear here...</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons + Stats */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy SQL"}
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm" className="gap-1.5">
              <RotateCcw className="size-4" />
              Clear
            </Button>
            <Button onClick={handleSwap} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              <ArrowLeftRight className="size-4" />
              Swap
            </Button>

            <Separator orientation="vertical" className="hidden sm:block h-6 mx-1" />

            {stats.keywordCount > 0 && (
              <Badge variant="outline" className="tabular-nums text-xs">
                {stats.keywordCount} {stats.keywordCount === 1 ? "keyword" : "keywords"}
              </Badge>
            )}
            {stats.lineCount > 0 && (
              <Badge variant="outline" className="tabular-nums text-xs">
                {stats.lineCount} {stats.lineCount === 1 ? "line" : "lines"}
              </Badge>
            )}
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
              100% Private — Your SQL Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All SQL formatting happens entirely in your browser. No queries are sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}