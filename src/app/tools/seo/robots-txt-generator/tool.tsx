"use client"

import { useState, useCallback, useMemo } from "react"
import { Bot, Copy, Check, Plus, Trash2, Info, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Rule { id: string; path: string; type: "allow" | "disallow" }
interface AgentGroup { id: string; userAgent: string; rules: Rule[]; crawlDelay: string }

const PRESET_AGENTS = [
  { value: "*", label: "All Crawlers (*)" },
  { value: "Googlebot", label: "Google" },
  { value: "Bingbot", label: "Bing" },
  { value: "Slurp", label: "Yahoo" },
  { value: "DuckDuckBot", label: "DuckDuckGo" },
  { value: "facebookexternalhit", label: "Facebook" },
  { value: "Twitterbot", label: "Twitter/X" },
]

const id = () => crypto.randomUUID()

function generateRobotsTxt(groups: AgentGroup[], sitemaps: string[], headerComment: string): string {
  const lines: string[] = []
  if (headerComment.trim()) {
    lines.push(`# ${headerComment}`)
    lines.push("")
  }
  for (const group of groups) {
    lines.push(`User-agent: ${group.userAgent}`)
    for (const rule of group.rules) {
      if (rule.path.trim()) {
        lines.push(`${rule.type === "allow" ? "Allow" : "Disallow"}: ${rule.path}`)
      }
    }
    if (group.crawlDelay) {
      lines.push(`Crawl-delay: ${group.crawlDelay}`)
    }
    lines.push("")
  }
  for (const sitemap of sitemaps) {
    if (sitemap.trim()) lines.push(`Sitemap: ${sitemap}`)
  }
  return lines.join("\n")
}

export function RobotsTxtGeneratorTool() {
  const [groups, setGroups] = useState<AgentGroup[]>([
    { id: id(), userAgent: "*", rules: [{ id: id(), path: "/", type: "disallow" }], crawlDelay: "" },
  ])
  const [sitemaps, setSitemaps] = useState<string[]>([""])
  const [headerComment, setHeaderComment] = useState("")
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => generateRobotsTxt(groups, sitemaps, headerComment), [groups, sitemaps, headerComment])

  const addGroup = useCallback(() => setGroups((p) => [...p, { id: id(), userAgent: "Googlebot", rules: [{ id: id(), path: "/", type: "disallow" }], crawlDelay: "" }]), [])
  const removeGroup = useCallback((gid: string) => setGroups((p) => p.filter((g) => g.id !== gid)), [])
  const updateAgent = useCallback((gid: string, ua: string) => setGroups((p) => p.map((g) => g.id === gid ? { ...g, userAgent: ua } : g)), [])
  const updateDelay = useCallback((gid: string, d: string) => setGroups((p) => p.map((g) => g.id === gid ? { ...g, crawlDelay: d } : g)), [])
  const addRule = useCallback((gid: string) => setGroups((p) => p.map((g) => g.id === gid ? { ...g, rules: [...g.rules, { id: id(), path: "", type: "disallow" }] } : g)), [])
  const removeRule = useCallback((gid: string, rid: string) => setGroups((p) => p.map((g) => g.id === gid ? { ...g, rules: g.rules.filter((r) => r.id !== rid) } : g)), [])
  const updateRule = useCallback((gid: string, rid: string, field: string, value: string) => setGroups((p) => p.map((g) => g.id === gid ? { ...g, rules: g.rules.map((r) => r.id === rid ? { ...r, [field]: value } : r) } : g)), [])
  const addSitemap = useCallback(() => setSitemaps((p) => [...p, ""]), [])
  const removeSitemap = useCallback((i: number) => setSitemaps((p) => p.filter((_, idx) => idx !== i)), [])
  const updateSitemap = useCallback((i: number, v: string) => setSitemaps((p) => p.map((s, idx) => idx === i ? v : s)), [])

  const copyOutput = useCallback(async () => { try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* */ } }, [output])

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Configuration */}
          <div className="space-y-4">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Bot className="size-4 text-primary" /><h2 className="font-semibold">Crawler Rules</h2></div>
                <Button variant="outline" size="sm" onClick={addGroup}><Plus className="size-3.5 mr-1" />Add Group</Button>
              </div>
              {groups.map((group) => (
                <div key={group.id} className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Select value={group.userAgent} onValueChange={(v) => updateAgent(group.id, v)}>
                      <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                      <SelectContent>{PRESET_AGENTS.map((a) => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}</SelectContent>
                    </Select>
                    <Input value={group.userAgent} onChange={(e) => updateAgent(group.id, e.target.value)} className="font-mono text-sm flex-1" placeholder="Custom user-agent" />
                    <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" className="size-8 text-destructive" onClick={() => removeGroup(group.id)} disabled={groups.length <= 1}><Trash2 className="size-3.5" /></Button></TooltipTrigger><TooltipContent>Remove group</TooltipContent></Tooltip>
                  </div>
                  <div className="space-y-2">
                    {group.rules.map((rule) => (
                      <div key={rule.id} className="flex items-center gap-2">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <Checkbox checked={rule.type === "allow"} onCheckedChange={(v) => updateRule(group.id, rule.id, "type", v ? "allow" : "disallow")} />
                          <span className="text-xs text-muted-foreground w-14">Allow</span>
                        </label>
                        <Input value={rule.path} onChange={(e) => updateRule(group.id, rule.id, "path", e.target.value)} placeholder="/path/" className="font-mono text-sm flex-1" />
                        <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeRule(group.id, rule.id)}><Trash2 className="size-3" /></Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addRule(group.id)}><Plus className="size-3 mr-1" />Add Rule</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground w-24">Crawl-delay</Label>
                    <Input value={group.crawlDelay} onChange={(e) => updateDelay(group.id, e.target.value)} placeholder="e.g. 10 (seconds)" className="font-mono text-sm h-8" />
                    <span className="text-[10px] text-muted-foreground">seconds</span>
                  </div>
                </div>
              ))}
            </Card>
            {/* Sitemaps */}
            <Card className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Sitemaps</h3>
                <Button variant="outline" size="sm" onClick={addSitemap}><Plus className="size-3.5 mr-1" />Add</Button>
              </div>
              {sitemaps.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono w-16">Sitemap:</span>
                  <Input value={s} onChange={(e) => updateSitemap(i, e.target.value)} placeholder="https://example.com/sitemap.xml" className="font-mono text-sm flex-1" />
                  <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeSitemap(i)}><Trash2 className="size-3" /></Button>
                </div>
              ))}
            </Card>
          </div>
          {/* Right: Output */}
          <div className="space-y-4">
            <Card className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2"><FileText className="size-4 text-primary" /> Generated robots.txt</h3>
                <Button variant="outline" size="sm" onClick={copyOutput}>{copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}{copied ? "Copied" : "Copy"}</Button>
              </div>
              <pre className="rounded-lg bg-muted/50 border border-border p-4 text-xs font-mono overflow-x-auto max-h-[500px] overflow-y-auto whitespace-pre-wrap break-all min-h-[200px]">{output}</pre>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-emerald-500/10 p-2 shrink-0"><Check className="size-5 text-emerald-600 dark:text-emerald-400" /></div>
                <div className="space-y-1"><p className="text-sm font-medium">Place in Your Website Root</p><p className="text-xs text-muted-foreground">Save this file as robots.txt in your website's root directory (e.g., public/robots.txt for Next.js). Test with Google Search Console after deploying.</p></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
