"use client"

import { useState, useCallback, useMemo } from "react"
import { BarChart3, Search, Trash2, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// ─── Analysis Types ─────────────────────────────────────────────────────────

interface WordStat { word: string; count: number; density: number }
interface TextStats { totalWords: number; uniqueWords: number; sentences: number; paragraphs: number; avgWordsPerSentence: number; avgWordLength: number }

function analyzeText(text: string, keyword: string) {
  if (!text.trim()) return { stats: null, topWords: [], keywordResult: null }

  const words = text.split(/\s+/).filter((w) => w.length > 0)
  const totalWords = words.length
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-zA-Z0-9'-]/g, ""))).size
  const totalChars = words.reduce((s, w) => s + w.replace(/[^a-zA-Z0-9'-]/g, "").length, 0)

  const stats: TextStats = {
    totalWords,
    uniqueWords,
    sentences,
    paragraphs: Math.max(paragraphs, 1),
    avgWordsPerSentence: sentences > 0 ? Math.round(totalWords / sentences) : 0,
    avgWordLength: totalWords > 0 ? Math.round((totalChars / totalWords) * 10) / 10 : 0,
  }

  // Top words
  const wordMap = new Map<string, number>()
  const stopWords = new Set(["the","a","an","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","shall","should","may","might","can","could","of","in","to","for","with","on","at","by","from","as","into","through","during","before","after","above","below","between","out","off","over","under","again","further","then","once","here","there","when","where","why","how","all","each","every","both","few","more","most","other","some","such","no","nor","not","only","own","same","so","than","too","very","just","because","but","and","or","if","while","that","this","it","its","i","me","my","we","our","you","your","he","him","his","she","her","they","them","their","what","which","who","whom","up","about"])  
  for (const w of words) {
    const clean = w.toLowerCase().replace(/[^a-zA-Z0-9'-]/g, "")
    if (clean.length < 2 || stopWords.has(clean)) continue
    wordMap.set(clean, (wordMap.get(clean) || 0) + 1)
  }
  const topWords: WordStat[] = Array.from(wordMap.entries())
    .map(([word, count]) => ({ word, count, density: Math.round((count / totalWords) * 10000) / 100 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 25)

  // Keyword analysis
  let keywordResult: { count: number; density: number; status: string; color: string; icon: typeof CheckCircle } | null = null
  if (keyword.trim()) {
    const kwLower = keyword.toLowerCase()
    const kwWords = kwLower.split(/\s+/)
    const textLower = text.toLowerCase()
    let count = 0
    let pos = 0
    while ((pos = textLower.indexOf(kwLower, pos)) !== -1) { count++; pos++ }
    const density = Math.round((count / totalWords) * 10000) / 100
    let status: string, color: string, icon: typeof CheckCircle
    if (density === 0) { status = "Not found"; color = "text-red-600 dark:text-red-400"; icon = AlertCircle }
    else if (density < 0.5) { status = "Too low"; color = "text-amber-600 dark:text-amber-400"; icon = AlertTriangle }
    else if (density <= 2.5) { status = "Good"; color = "text-emerald-600 dark:text-emerald-400"; icon = CheckCircle }
    else if (density <= 4) { status = "High"; color = "text-amber-600 dark:text-amber-400"; icon = AlertTriangle }
    else { status = "Keyword stuffing"; color = "text-red-600 dark:text-red-400"; icon = AlertCircle }
    keywordResult = { count, density, status, color, icon }
  }

  return { stats, topWords, keywordResult }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function KeywordDensityCheckerTool() {
  const [text, setText] = useState("")
  const [keyword, setKeyword] = useState("")
  const [analyzeTrigger, setAnalyzeTrigger] = useState(0)

  const handleAnalyze = useCallback(() => setAnalyzeTrigger((p) => p + 1), [])
  const result = useMemo(() => analyzeText(text, keyword), [text, keyword, analyzeTrigger])

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Input */}
          <div className="space-y-4">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-4 text-primary" />
                <h2 className="font-semibold">Content Analysis</h2>
              </div>
              <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your article or content here to analyze keyword density..." className="flex min-h-[250px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
              <div className="flex items-center gap-2">
                <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter target keyword or phrase" className="flex-1" />
                <Button onClick={handleAnalyze} disabled={!text.trim()}><Search className="size-4 mr-1.5" />Analyze</Button>
                <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={() => { setText(""); setKeyword("") }}><Trash2 className="size-4" /></Button></TooltipTrigger><TooltipContent>Clear all</TooltipContent></Tooltip>
              </div>
            </Card>
          </div>

          {/* Right: Results */}
          <div className="space-y-4">
            {result.stats && (
              <Card className="p-6 space-y-3">
                <h3 className="font-semibold">Text Statistics</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[["Words", result.stats.totalWords], ["Unique", result.stats.uniqueWords], ["Sentences", result.stats.sentences], ["Paragraphs", result.stats.paragraphs], ["Avg/Sentence", result.stats.avgWordsPerSentence], ["Avg Word Len", result.stats.avgWordLength]].map(([label, val]) => (
                    <div key={String(label)} className="rounded-lg border border-border bg-muted/30 p-2.5 text-center">
                      <p className="text-[10px] text-muted-foreground">{String(label)}</p>
                      <p className="text-lg font-bold font-mono tabular-nums">{Number(val)}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {result.keywordResult && (
              <Card className="p-6 space-y-3">
                <h3 className="font-semibold">Keyword Analysis</h3>
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-3 ${result.keywordResult.color.includes("emerald") ? "bg-emerald-500/10" : result.keywordResult.color.includes("amber") ? "bg-amber-500/10" : "bg-red-500/10"}`}>
                    {(() => { const Icon = result.keywordResult.icon; return <Icon className={`size-6 ${result.keywordResult.color}`} /> })()}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-muted-foreground">"{keyword}"</p>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold">{result.keywordResult.density}%</span>
                      <span className={`text-sm font-medium ${result.keywordResult.color}`}>{result.keywordResult.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{result.keywordResult.count} occurrence{result.keywordResult.count !== 1 ? "s" : ""} in {result.stats?.totalWords || 0} words</p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${result.keywordResult.density <= 0 ? "bg-red-500 w-0" : result.keywordResult.density <= 2.5 ? "bg-emerald-500" : result.keywordResult.density <= 4 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${Math.min(result.keywordResult.density * 20, 100)}%` }} />
                </div>
              </Card>
            )}

            {result.topWords.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-3">Top Words (excl. stop words)</h3>
                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  <div className="grid grid-cols-[1fr_60px_60px_40px] gap-2 text-xs text-muted-foreground font-medium pb-1 border-b border-border">
                    <span>Word</span><span className="text-right">Count</span><span className="text-right">Density</span><span className="text-right">Bar</span>
                  </div>
                  {result.topWords.map((w) => (
                    <div key={w.word} className="grid grid-cols-[1fr_60px_60px_40px] gap-2 text-sm items-center py-1">
                      <span className="font-medium truncate">{w.word}</span>
                      <span className="font-mono text-right tabular-nums">{w.count}</span>
                      <span className={`font-mono text-right tabular-nums ${w.density > 3 ? "text-red-600" : w.density > 2 ? "text-amber-600" : "text-muted-foreground"}`}>{w.density}%</span>
                      <div className="h-2 rounded-full bg-muted overflow-hidden"><div className={`h-full rounded-full ${w.density > 3 ? "bg-red-500" : w.density > 2 ? "bg-amber-500" : "bg-primary"}`} style={{ width: `${Math.min(w.density * 20, 100)}%` }} /></div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
