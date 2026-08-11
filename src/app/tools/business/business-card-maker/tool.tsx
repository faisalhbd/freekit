"use client"

import { useState } from "react"
import { CreditCard, Printer, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SOLID_COLORS = [
  { name: "White", value: "#ffffff", textDefault: "#1a1a1a" },
  { name: "Light Gray", value: "#f3f4f6", textDefault: "#1a1a1a" },
  { name: "Charcoal", value: "#374151", textDefault: "#ffffff" },
  { name: "Navy", value: "#1e3a5f", textDefault: "#ffffff" },
  { name: "Black", value: "#111827", textDefault: "#ffffff" },
  { name: "Burgundy", value: "#7f1d1d", textDefault: "#ffffff" },
  { name: "Forest Green", value: "#14532d", textDefault: "#ffffff" },
  { name: "Slate", value: "#334155", textDefault: "#ffffff" },
]

const GRADIENT_COLORS = [
  { name: "Ocean Blue", value: "linear-gradient(135deg, #0f172a, #1e40af)", textDefault: "#ffffff" },
  { name: "Sunset", value: "linear-gradient(135deg, #7f1d1d, #ea580c)", textDefault: "#ffffff" },
  { name: "Emerald", value: "linear-gradient(135deg, #064e3b, #059669)", textDefault: "#ffffff" },
  { name: "Purple Haze", value: "linear-gradient(135deg, #4c1d95, #7c3aed)", textDefault: "#ffffff" },
  { name: "Warm Gold", value: "linear-gradient(135deg, #78350f, #d97706)", textDefault: "#ffffff" },
  { name: "Cool Gray", value: "linear-gradient(135deg, #1e293b, #64748b)", textDefault: "#ffffff" },
]

const FONT_STYLES = [
  { name: "Serif", value: "'Georgia', 'Times New Roman', serif" },
  { name: "Sans-Serif", value: "'Helvetica Neue', Arial, sans-serif" },
  { name: "Monospace", value: "'Courier New', 'Lucida Console', monospace" },
]

type ColorMode = "solid" | "gradient"

type CardData = {
  fullName: string
  jobTitle: string
  company: string
  phone: string
  email: string
  website: string
}

type StyleConfig = {
  colorMode: ColorMode
  solidColor: string
  gradientColor: string
  textColor: string
  fontStyle: string
  layout: "left" | "center"
}

export function BusinessCardMakerTool() {
  const [data, setData] = useState<CardData>({
    fullName: "",
    jobTitle: "",
    company: "",
    phone: "",
    email: "",
    website: "",
  })

  const [style, setStyle] = useState<StyleConfig>({
    colorMode: "solid",
    solidColor: "#1e3a5f",
    gradientColor: "linear-gradient(135deg, #0f172a, #1e40af)",
    textColor: "#ffffff",
    fontStyle: FONT_STYLES[1].value,
    layout: "left",
  })

  const updateData = (field: keyof CardData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const updateStyle = (field: keyof StyleConfig, value: string) => {
    setStyle((prev) => ({ ...prev, [field]: value }))
  }

  const handleColorSelect = (colorName: string, mode: ColorMode) => {
    const list = mode === "solid" ? SOLID_COLORS : GRADIENT_COLORS
    const found = list.find((c) => c.name === colorName)
    if (found) {
      setStyle((prev) => ({
        ...prev,
        colorMode: mode,
        solidColor: mode === "solid" ? found.value : prev.solidColor,
        gradientColor: mode === "gradient" ? found.value : prev.gradientColor,
        textColor: found.textDefault,
      }))
    }
  }

  const bgStyle =
    style.colorMode === "solid"
      ? { backgroundColor: style.solidColor }
      : { background: style.gradientColor }

  const handlePrint = () => window.print()
  const resetAll = () => {
    setData({ fullName: "", jobTitle: "", company: "", phone: "", email: "", website: "" })
    setStyle({
      colorMode: "solid",
      solidColor: "#1e3a5f",
      gradientColor: "linear-gradient(135deg, #0f172a, #1e40af)",
      textColor: "#ffffff",
      fontStyle: FONT_STYLES[1].value,
      layout: "left",
    })
  }

  const n = (v: string) => v || ""

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Editor */}
      <div className="print:hidden space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Card Editor</h2>
        </div>

        {/* Personal Info */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3">Personal Information</h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input placeholder="John Doe" value={data.fullName} onChange={(e) => updateData("fullName", e.target.value)} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Job Title</Label>
                <Input placeholder="Software Engineer" value={data.jobTitle} onChange={(e) => updateData("jobTitle", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Company</Label>
                <Input placeholder="Acme Inc." value={data.company} onChange={(e) => updateData("company", e.target.value)} />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input placeholder="(555) 123-4567" value={data.phone} onChange={(e) => updateData("phone", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="john@acme.com" value={data.email} onChange={(e) => updateData("email", e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Website</Label>
              <Input placeholder="www.acme.com" value={data.website} onChange={(e) => updateData("website", e.target.value)} />
            </div>
          </div>
        </Card>

        {/* Style Options */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3">Style Options</h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Card Color</Label>
              <Select
                value={style.colorMode === "solid" ? `solid:${SOLID_COLORS.find((c) => c.value === style.solidColor)?.name || "Navy"}` : `gradient:${GRADIENT_COLORS.find((c) => c.value === style.gradientColor)?.name || "Ocean Blue"}`}
                onValueChange={(v) => {
                  const parts = v.split(":")
                  const mode = parts[0] as ColorMode
                  const name = parts[1]
                  handleColorSelect(name, mode)
                }}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" disabled>Solid Colors</SelectItem>
                  {SOLID_COLORS.map((c) => (
                    <SelectItem key={c.value} value={`solid:${c.name}`}>{c.name}</SelectItem>
                  ))}
                  <SelectItem value="none2" disabled>Gradients</SelectItem>
                  {GRADIENT_COLORS.map((c) => (
                    <SelectItem key={c.name} value={`gradient:${c.name}`}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={style.textColor}
                    onChange={(e) => updateStyle("textColor", e.target.value)}
                    className="w-10 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={style.textColor}
                    onChange={(e) => updateStyle("textColor", e.target.value)}
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Font Style</Label>
                <Select
                  value={FONT_STYLES.find((f) => f.value === style.fontStyle)?.name || "Sans-Serif"}
                  onValueChange={(v) => {
                    const found = FONT_STYLES.find((f) => f.name === v)
                    if (found) updateStyle("fontStyle", found.value)
                  }}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FONT_STYLES.map((f) => (
                      <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Layout</Label>
              <Select
                value={style.layout}
                onValueChange={(v) => updateStyle("layout", v)}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left Aligned</SelectItem>
                  <SelectItem value="center">Centered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button onClick={handlePrint} className="flex-1">
            <Printer className="size-4 mr-2" /> Print Card
          </Button>
          <Button variant="outline" onClick={resetAll}>
            <RotateCcw className="size-4 mr-2" /> Reset
          </Button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="print:m-0 print:p-0 print:max-w-none">
        <div className="flex items-center gap-2 mb-4 print:hidden">
          <CreditCard className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Live Preview</h2>
        </div>
        <div className="flex justify-center">
          <div
            className="relative overflow-hidden shadow-lg border border-border/20 rounded-lg print:shadow-none print:border-0 print:rounded-none"
            style={{
              ...bgStyle,
              width: "350px",
              height: "200px",
              aspectRatio: "3.5 / 2",
              color: style.textColor,
              fontFamily: style.fontStyle,
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: style.layout === "center" ? "center" : "left",
            }}
          >
            <p className="font-bold leading-tight" style={{ fontSize: "20px", marginBottom: "4px" }}>
              {n(data.fullName) || "Your Name"}
            </p>
            <p className="opacity-80" style={{ fontSize: "11px", marginBottom: "12px" }}>
              {[n(data.jobTitle), n(data.company)].filter(Boolean).join(" | ") || "Job Title | Company"}
            </p>
            <div style={{ height: "1px", backgroundColor: style.textColor, opacity: 0.25, marginBottom: "10px" }} />
            <div style={{ fontSize: "9.5px", opacity: 0.85, lineHeight: "1.6" }}>
              {n(data.phone) && <p>{n(data.phone)}</p>}
              {n(data.email) && <p>{n(data.email)}</p>}
              {n(data.website) && <p>{n(data.website)}</p>}
              {!data.phone && !data.email && !data.website && (
                <p style={{ opacity: 0.5 }}>Phone | Email | Website</p>
              )}
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3 print:hidden">
          Standard 3.5&quot; x 2&quot; business card (88.9 x 50.8 mm)
        </p>
      </div>
    </div>
  )
}
