"use client"

import { useState, useCallback, useMemo, useRef } from "react"
import {
  Copy,
  Check,
  Upload,
  X,
  Mail,
  User,
  Globe,
  Phone,
  Building2,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  ImageIcon,
  Sparkles,
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

// ─── Types ──────────────────────────────────────────────────────────────────

type LayoutStyle = "professional" | "modern" | "minimal" | "bold"

// ─── SVG Social Icons (inline for email compatibility) ──────────────────────

function linkedinSVG(color: string, size = 16): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" fill="${color}"/><rect x="2" y="9" width="4" height="12" fill="${color}"/><circle cx="4" cy="4" r="2" fill="${color}"/></svg>`
}

function twitterSVG(color: string, size = 16): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
}

function githubSVG(color: string, size = 16): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`
}

function instagramSVG(color: string, size = 16): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" stroke="${color}" stroke-width="2"/><circle cx="12" cy="12" r="5" stroke="${color}" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="${color}"/></svg>`
}

// ─── HTML Generation ───────────────────────────────────────────────────────

function generateSignatureHTML(
  fullName: string,
  jobTitle: string,
  company: string,
  email: string,
  phone: string,
  website: string,
  linkedin: string,
  twitter: string,
  github: string,
  instagram: string,
  profileImage: string,
  layout: LayoutStyle,
  primaryColor: string
): string {
  const accent = primaryColor
  const textDark = "#333333"
  const textMid = "#666666"
  const textLight = "#999999"
  const border = "#e0e0e0"

  // Social icons HTML
  const socialLinks: { url: string; svg: string }[] = []
  if (linkedin) socialLinks.push({ url: linkedin, svg: linkedinSVG(accent) })
  if (twitter) socialLinks.push({ url: twitter, svg: twitterSVG(accent) })
  if (github) socialLinks.push({ url: github, svg: githubSVG(accent) })
  if (instagram) socialLinks.push({ url: instagram, svg: instagramSVG(accent) })

  const socialHTML =
    socialLinks.length > 0
      ? `<tr><td style="padding-top:10px;">${socialLinks
          .map(
            (s) =>
              `<a href="${s.url}" target="_blank" style="display:inline-block;margin-right:8px;text-decoration:none;">${s.svg}</a>`
          )
          .join("")}</td></tr>`
      : ""

  const profileHTML = profileImage
    ? `<img src="${profileImage}" alt="Profile" width="80" height="80" style="border-radius:50%;display:block;object-fit:cover;" />`
    : `<div style="width:80px;height:80px;border-radius:50%;background:${accent};display:flex;align-items:center;justify-content:center;"><span style="color:white;font-size:28px;font-family:Arial,sans-serif;font-weight:bold;">${(fullName || "?")[0] || "?"}</span></div>`

  const contactRows: string[] = []
  if (email)
    contactRows.push(`
      <tr>
        <td style="padding:1px 8px 1px 0;color:${textLight};font-size:12px;font-family:Arial,sans-serif;vertical-align:middle;">
          ✉
        </td>
        <td style="padding:1px 0;font-size:12px;font-family:Arial,sans-serif;color:${textMid};">
          <a href="mailto:${email}" style="color:${accent};text-decoration:none;">${email}</a>
        </td>
      </tr>`)
  if (phone)
    contactRows.push(`
      <tr>
        <td style="padding:1px 8px 1px 0;color:${textLight};font-size:12px;font-family:Arial,sans-serif;vertical-align:middle;">
          ☎
        </td>
        <td style="padding:1px 0;font-size:12px;font-family:Arial,sans-serif;color:${textMid};">
          <a href="tel:${phone}" style="color:${textMid};text-decoration:none;">${phone}</a>
        </td>
      </tr>`)
  if (website)
    contactRows.push(`
      <tr>
        <td style="padding:1px 8px 1px 0;color:${textLight};font-size:12px;font-family:Arial,sans-serif;vertical-align:middle;">
          ◉
        </td>
        <td style="padding:1px 0;font-size:12px;font-family:Arial,sans-serif;color:${textMid};">
          <a href="${website.startsWith("http") ? website : `https://${website}`}" target="_blank" style="color:${accent};text-decoration:none;">${website}</a>
        </td>
      </tr>`)

  const contactTable =
    contactRows.length > 0
      ? `<table cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;">${contactRows.join("")}</table>`
      : ""

  if (layout === "professional") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;">
  <tr>
    <td style="vertical-align:top;padding-right:16px;">${profileHTML}</td>
    <td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:18px;font-weight:bold;color:${textDark};padding-bottom:2px;">${fullName || "Your Name"}</td></tr>
        ${jobTitle ? `<tr><td style="font-size:13px;color:${accent};font-weight:600;padding-bottom:1px;">${jobTitle}</td></tr>` : ""}
        ${company ? `<tr><td style="font-size:13px;color:${textMid};padding-bottom:4px;">${company}</td></tr>` : ""}
        <tr><td>${contactTable}</td></tr>
        ${socialHTML}
      </table>
    </td>
  </tr>
</table>`
  }

  if (layout === "modern") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;">
  <tr>
    <td style="vertical-align:top;padding-right:16px;">${profileHTML}</td>
    <td style="vertical-align:top;padding-left:16px;border-left:3px solid ${accent};">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:18px;font-weight:bold;color:${textDark};padding-bottom:2px;">${fullName || "Your Name"}</td></tr>
        ${jobTitle ? `<tr><td style="font-size:12px;color:${accent};text-transform:uppercase;letter-spacing:1px;font-weight:600;padding-bottom:1px;">${jobTitle}</td></tr>` : ""}
        ${company ? `<tr><td style="font-size:13px;color:${textMid};padding-bottom:4px;">${company}</td></tr>` : ""}
        <tr><td>${contactTable}</td></tr>
        ${socialHTML}
      </table>
    </td>
  </tr>
</table>`
  }

  if (layout === "minimal") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;">
  <tr>
    <td style="font-size:16px;font-weight:bold;color:${textDark};padding-bottom:2px;">${fullName || "Your Name"}</td></tr>
  ${jobTitle ? `<tr><td style="font-size:12px;color:${textMid};padding-bottom:4px;">${jobTitle}${company ? ` · ${company}` : ""}</td></tr>` : ""}
  ${!jobTitle && company ? `<tr><td style="font-size:12px;color:${textMid};padding-bottom:4px;">${company}</td></tr>` : ""}
  <tr><td style="border-top:1px solid ${border};padding-top:6px;">${contactTable}</td></tr>
  ${socialHTML}
</table>`
  }

  // bold layout
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;">
  <tr>
    <td style="background:${accent};padding:20px 24px;border-radius:8px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:20px;font-weight:bold;color:#ffffff;padding-bottom:2px;">${fullName || "Your Name"}</td></tr>
        ${jobTitle ? `<tr><td style="font-size:13px;color:rgba(255,255,255,0.85);padding-bottom:1px;">${jobTitle}</td></tr>` : ""}
        ${company ? `<tr><td style="font-size:13px;color:rgba(255,255,255,0.85);padding-bottom:8px;">${company}</td></tr>` : ""}
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:12px 24px 0;">
      <table cellpadding="0" cellspacing="0" border="0">
        ${contactRows
          .map(
            (r) =>
              r
                .replace(/color:${accent}/g, "color:rgba(255,255,255,0.85)")
                .replace(/color:${textMid}/g, "color:${textMid}")
          )
          .join("")}
        <tr><td style="padding-top:10px;">${socialLinks
          .map(
            (s) =>
              `<a href="${s.url}" target="_blank" style="display:inline-block;margin-right:8px;text-decoration:none;">${s.svg.replace(new RegExp(accent, "g"), textMid)}</a>`
          )
          .join("")}</td></tr>
      </table>
    </td>
  </tr>
</table>`
}

// ─── Component ──────────────────────────────────────────────────────────────

export function EmailSignatureGeneratorTool() {
  const [fullName, setFullName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [website, setWebsite] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [twitter, setTwitter] = useState("")
  const [github, setGithub] = useState("")
  const [instagram, setInstagram] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [layout, setLayout] = useState<LayoutStyle>("professional")
  const [primaryColor, setPrimaryColor] = useState("#2563eb")
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const signatureHTML = useMemo(
    () =>
      generateSignatureHTML(
        fullName,
        jobTitle,
        company,
        email,
        phone,
        website,
        linkedin,
        twitter,
        github,
        instagram,
        profileImage,
        layout,
        primaryColor
      ),
    [fullName, jobTitle, company, email, phone, website, linkedin, twitter, github, instagram, profileImage, layout, primaryColor]
  )

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(signatureHTML).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [signatureHTML])

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    },
    []
  )

  const clearImage = useCallback(() => {
    setProfileImage("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* ── Layout Selector ── */}
        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">Layout Style</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(
              [
                { value: "professional", label: "Professional" },
                { value: "modern", label: "Modern" },
                { value: "minimal", label: "Minimal" },
                { value: "bold", label: "Bold" },
              ] as const
            ).map((opt) => (
              <Button
                key={opt.value}
                variant={layout === opt.value ? "default" : "outline"}
                size="sm"
                className="text-xs w-full"
                onClick={() => setLayout(opt.value)}
              >
                <Sparkles className="size-3 mr-1" />
                {opt.label}
              </Button>
            ))}
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ── Controls Panel ── */}
          <Card className="p-6 space-y-5">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal" className="text-xs gap-1.5">
                  <User className="size-3" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-xs gap-1.5">
                  <Phone className="size-3" />
                  Contact
                </TabsTrigger>
                <TabsTrigger value="social" className="text-xs gap-1.5">
                  <Globe className="size-3" />
                  Social
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Full Name</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Job Title</Label>
                  <Input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Senior Developer"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Company Name</Label>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
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
                      Upload Image
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
                    {profileImage && (
                      <div
                        className="size-8 rounded-full border border-border bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${profileImage})` }}
                      />
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5">
                    <Mail className="size-3" /> Email
                  </Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    type="email"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5">
                    <Phone className="size-3" /> Phone
                  </Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5">
                    <Globe className="size-3" /> Website
                  </Label>
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://example.com"
                    className="text-sm"
                  />
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5">
                    <Linkedin className="size-3" /> LinkedIn URL
                  </Label>
                  <Input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5">
                    <Twitter className="size-3" /> Twitter/X URL
                  </Label>
                  <Input
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="https://x.com/username"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5">
                    <Github className="size-3" /> GitHub URL
                  </Label>
                  <Input
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/username"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium flex items-center gap-1.5">
                    <Instagram className="size-3" /> Instagram URL
                  </Label>
                  <Input
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/username"
                    className="text-sm"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Separator />

            {/* Color Picker */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Accent Color</Label>
              <div className="flex items-center gap-3">
                <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="absolute inset-0 size-full cursor-pointer opacity-0"
                    aria-label="Accent color"
                  />
                  <div
                    className="size-full rounded-md"
                    style={{ backgroundColor: primaryColor }}
                  />
                </div>
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-28 font-mono text-xs"
                  maxLength={7}
                />
                <div className="flex gap-1.5">
                  {["#2563eb", "#dc2626", "#059669", "#7c3aed", "#ea580c", "#0891b2"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setPrimaryColor(c)}
                      className="size-6 rounded-full border border-border transition-transform hover:scale-110"
                      style={{ backgroundColor: c }}
                      aria-label={`Set color to ${c}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* ── Preview & Code Panel ── */}
          <div className="space-y-6">
            {/* Live Preview */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <ImageIcon className="size-3.5" />
                  Live Preview
                </Label>
                <Badge variant="secondary" className="text-[10px] capitalize">
                  {layout}
                </Badge>
              </div>
              <div className="rounded-lg border border-border bg-white p-6">
                <div
                  className="inline-block"
                  dangerouslySetInnerHTML={{ __html: signatureHTML }}
                />
              </div>
            </Card>

            {/* HTML Code */}
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
                  <code>{signatureHTML}</code>
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
