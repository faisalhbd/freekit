"use client"

import { useState, useCallback, useMemo, useRef } from "react"
import {
  Copy,
  Check,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Upload,
  X,
  UserCircle,
  Palette,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Types ────────────────────────────────────────────────────────────────

type ButtonStyle = "rounded" | "pill" | "sharp"
type BackgroundStyle = "solid" | "gradient"

interface BioLink {
  id: string
  title: string
  url: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function getBorderRadius(style: ButtonStyle): string {
  switch (style) {
    case "pill":
      return "9999px"
    case "sharp":
      return "4px"
    default:
      return "12px"
  }
}

function getBackground(themeColor: string, style: BackgroundStyle): string {
  if (style === "gradient") {
    return `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}88 100%)`
  }
  return themeColor
}

// ─── Component ──────────────────────────────────────────────────────────────

export function LinkInBioGeneratorTool() {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [links, setLinks] = useState<BioLink[]>([{ id: generateId(), title: "", url: "" }])
  const [themeColor, setThemeColor] = useState("#2563eb")
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>("rounded")
  const [bgStyle, setBgStyle] = useState<BackgroundStyle>("solid")
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Link management ──

  const addLink = useCallback(() => {
    setLinks((prev) => [...prev, { id: generateId(), title: "", url: "" }])
  }, [])

  const removeLink = useCallback((id: string) => {
    setLinks((prev) => {
      if (prev.length <= 1) return prev
      return prev.filter((l) => l.id !== id)
    })
  }, [])

  const updateLink = useCallback((id: string, field: "title" | "url", value: string) => {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)))
  }, [])

  const moveLink = useCallback((id: string, direction: "up" | "down") => {
    setLinks((prev) => {
      const idx = prev.findIndex((l) => l.id === id)
      if (idx < 0) return prev
      const newIdx = direction === "up" ? idx - 1 : idx + 1
      if (newIdx < 0 || newIdx >= prev.length) return prev
      const arr = [...prev]
      ;[arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]]
      return arr
    })
  }, [])

  // ── Image upload ──

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setProfileImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const clearImage = useCallback(() => {
    setProfileImage("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  // ── HTML generation ──

  const generatedHTML = useMemo(() => {
    const borderRadius = getBorderRadius(buttonStyle)
    const bg = getBackground(themeColor, bgStyle)
    const displayName = (name || "Your Name").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    const displayBio = (bio || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")

    const linksHTML = links
      .filter((l) => l.title || l.url)
      .map(
        (l) => `    <a href="${l.url || "#"}"
       style="display:block;width:100%;padding:14px 20px;background:${bg};color:#ffffff;text-decoration:none;text-align:center;font-size:15px;font-weight:600;border-radius:${borderRadius};margin-bottom:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;transition:opacity 0.2s;"
       onmouseover="this.style.opacity='0.85'"
       onmouseout="this.style.opacity='1'">${l.title || "Link"}</a>`
      )
      .join("\n")

    const profileHTML = profileImage
      ? `<img src="${profileImage}" alt="${displayName}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid ${themeColor};" />`
      : `<div style="width:80px;height:80px;border-radius:50%;background:${themeColor};display:flex;align-items:center;justify-content:center;"><span style="color:#ffffff;font-size:32px;font-weight:bold;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${(name || "?")[0] || "?"}</span></div>`

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayName}</title>
</head>
<body style="margin:0;padding:0;background:${bgStyle === "gradient" ? bg : "#f8f9fa"};min-height:100vh;display:flex;justify-content:center;">
  <div style="width:100%;max-width:420px;padding:40px 24px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="margin-bottom:16px;display:flex;justify-content:center;">
      ${profileHTML}
    </div>
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">${displayName}</h1>
    ${displayBio ? `<p style="margin:0 0 28px;font-size:14px;color:#6b7280;line-height:1.5;">${displayBio}</p>` : "<div style=\"margin-bottom:28px;\"></div>"}
${linksHTML}
  </div>
</body>
</html>`
  }, [name, bio, profileImage, links, themeColor, buttonStyle, bgStyle])

  // ── Copy HTML ──

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedHTML).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [generatedHTML])

  // ── Preview styles ──

  const previewBg = bgStyle === "gradient"
    ? `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}88 100%)`
    : "#f8f9fa"
  const previewBtnBg = getBackground(themeColor, bgStyle)
  const previewBtnRadius = getBorderRadius(buttonStyle)

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ── Controls Panel ── */}
          <Card className="p-6 space-y-5">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="text-xs gap-1.5">
                  <UserCircle className="size-3" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="links" className="text-xs gap-1.5">
                  <Plus className="size-3" />
                  Links
                </TabsTrigger>
                <TabsTrigger value="style" className="text-xs gap-1.5">
                  <Palette className="size-3" />
                  Style
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Bio / Tagline</Label>
                  <Input
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Creator, Designer, Dreamer"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Profile Image</Label>
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      aria-label="Upload profile image"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1.5"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="size-3" />
                      Upload
                    </Button>
                    {profileImage && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-destructive gap-1"
                        onClick={clearImage}
                      >
                        <X className="size-3" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Links Tab */}
              <TabsContent value="links" className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">Your Links</Label>
                  <Badge variant="secondary" className="text-[10px]">{links.length}</Badge>
                </div>
                <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
                  {links.map((link, idx) => (
                    <div key={link.id} className="rounded-lg border border-border p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-foreground">Link {idx + 1}</span>
                        <div className="flex items-center gap-0.5">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="size-6 p-0"
                                onClick={() => moveLink(link.id, "up")}
                                disabled={idx === 0}
                              >
                                <ChevronUp className="size-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Move up</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="size-6 p-0"
                                onClick={() => moveLink(link.id, "down")}
                                disabled={idx === links.length - 1}
                              >
                                <ChevronDown className="size-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Move down</TooltipContent>
                          </Tooltip>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-6 p-0 text-destructive hover:text-destructive"
                            onClick={() => removeLink(link.id)}
                            disabled={links.length <= 1}
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                      </div>
                      <Input
                        value={link.title}
                        onChange={(e) => updateLink(link.id, "title", e.target.value)}
                        placeholder="Link title"
                        className="text-xs"
                      />
                      <Input
                        value={link.url}
                        onChange={(e) => updateLink(link.id, "url", e.target.value)}
                        placeholder="https://example.com"
                        className="text-xs"
                      />
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1.5 w-full"
                  onClick={addLink}
                >
                  <Plus className="size-3" />
                  Add Link
                </Button>
              </TabsContent>

              {/* Style Tab */}
              <TabsContent value="style" className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Theme Color</Label>
                  <div className="flex items-center gap-3">
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border">
                      <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="absolute inset-0 size-full cursor-pointer opacity-0"
                        aria-label="Theme color"
                      />
                      <div
                        className="size-full rounded-md"
                        style={{ backgroundColor: themeColor }}
                      />
                    </div>
                    <Input
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-28 font-mono text-xs"
                      maxLength={7}
                    />
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {["#2563eb", "#dc2626", "#059669", "#7c3aed", "#ea580c", "#0891b2", "#db2777", "#4f46e5"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setThemeColor(c)}
                        className={`size-6 rounded-full border-2 transition-transform hover:scale-110 ${themeColor === c ? "border-foreground" : "border-border"}`}
                        style={{ backgroundColor: c }}
                        aria-label={`Set color to ${c}`}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Button Style</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { value: "rounded", label: "Rounded" },
                        { value: "pill", label: "Pill" },
                        { value: "sharp", label: "Sharp" },
                      ] as const
                    ).map((opt) => (
                      <Button
                        key={opt.value}
                        variant={buttonStyle === opt.value ? "default" : "outline"}
                        size="sm"
                        className="text-xs w-full"
                        onClick={() => setButtonStyle(opt.value)}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Background Style</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        { value: "solid", label: "Solid" },
                        { value: "gradient", label: "Gradient" },
                      ] as const
                    ).map((opt) => (
                      <Button
                        key={opt.value}
                        variant={bgStyle === opt.value ? "default" : "outline"}
                        size="sm"
                        className="text-xs w-full"
                        onClick={() => setBgStyle(opt.value)}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* ── Preview & Output Panel ── */}
          <div className="space-y-6">
            {/* Phone Preview */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <Smartphone className="size-3.5" />
                  Live Preview
                </Label>
              </div>
              <div className="flex justify-center">
                <div className="relative w-[300px] rounded-[2.5rem] border-[6px] border-foreground/80 bg-background overflow-hidden shadow-xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground/80 rounded-b-xl z-10" />
                  {/* Screen */}
                  <div
                    className="overflow-y-auto"
                    style={{
                      background: previewBg,
                      minHeight: "480px",
                      maxHeight: "480px",
                    }}
                  >
                    <div className="pt-8 pb-6 px-5 text-center">
                      {/* Profile Image */}
                      <div className="flex justify-center mb-3">
                        {profileImage ? (
                          <div
                            className="w-16 h-16 rounded-full bg-cover bg-center border-2"
                            style={{ borderColor: themeColor, backgroundImage: `url(${profileImage})` }}
                          />
                        ) : (
                          <div
                            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                            style={{ backgroundColor: themeColor }}
                          >
                            {(name || "?")[0]}
                          </div>
                        )}
                      </div>
                      {/* Name */}
                      <h3 className="text-base font-bold text-foreground mb-1">
                        {(name || "Your Name")}
                      </h3>
                      {/* Bio */}
                      {bio && (
                        <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                          {bio}
                        </p>
                      )}
                      {!bio && <div className="mb-5" />}
                      {/* Links */}
                      <div className="space-y-2">
                        {links
                          .filter((l) => l.title || l.url)
                          .map((l) => (
                            <div
                              key={l.id}
                              className="py-3 px-4 text-white text-sm font-semibold text-center cursor-default"
                              style={{
                                background: previewBtnBg,
                                borderRadius: previewBtnRadius,
                              }}
                            >
                              {(l.title || "Link")}
                            </div>
                          ))}
                        {links.filter((l) => l.title || l.url).length === 0 && (
                          <p className="text-xs text-muted-foreground py-4">Add links to see them here</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* HTML Output */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Generated HTML</Label>
                <Button
                  variant={copied ? "default" : "outline"}
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      Copy HTML
                    </>
                  )}
                </Button>
              </div>
              <div className="max-h-72 overflow-y-auto rounded-lg border border-border bg-muted/50 p-4">
                <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap break-all">
                  <code>{generatedHTML}</code>
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
