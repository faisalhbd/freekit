"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Maximize, MousePointerClick, Info } from "lucide-react"
import { toast } from "sonner"

const COLORS = [
  { name: "Red", value: "#ff0000" },
  { name: "Green", value: "#00ff00" },
  { name: "Blue", value: "#0000ff" },
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
] as const

export function DeadPixelTestTool() {
  const [colorIndex, setColorIndex] = useState(-1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isTestingRef = useRef(false)

  const currentColor = colorIndex >= 0 ? COLORS[colorIndex] : null

  const exitTest = useCallback(() => {
    setColorIndex(-1)
    setIsFullscreen(false)
    isTestingRef.current = false
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  const startTest = useCallback(async () => {
    if (!containerRef.current) return
    isTestingRef.current = true
    try {
      await containerRef.current.requestFullscreen()
      setIsFullscreen(true)
      setColorIndex(0)
      toast.success("Test started — click or press Space to cycle colors. Press ESC to exit.")
    } catch {
      toast.error("Fullscreen not supported in this browser")
    }
  }, [])

  const cycleColor = useCallback(() => {
    if (!isTestingRef.current) return
    setColorIndex((prev) => {
      const next = (prev + 1) % COLORS.length
      if (next === 0) {
        toast.success("Color cycle complete — check for dead/stuck pixels")
      }
      return next
    })
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        cycleColor()
      }
      if (e.key === "Escape") {
        exitTest()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [cycleColor, exitTest])

  useEffect(() => {
    const handleFSChange = () => {
      if (!document.fullscreenElement && isTestingRef.current) {
        exitTest()
      }
    }
    document.addEventListener("fullscreenchange", handleFSChange)
    return () => document.removeEventListener("fullscreenchange", handleFSChange)
  }, [exitTest])

  if (isFullscreen && currentColor) {
    const textColor = currentColor.name === "Black" ? "white" : "black"
    return (
      <div
        className="fixed inset-0 z-50 cursor-pointer flex flex-col items-center justify-center transition-colors duration-200"
        style={{ backgroundColor: currentColor.value }}
        onClick={cycleColor}
        role="button"
        tabIndex={0}
        aria-label={`Dead pixel test - ${currentColor.name} screen. Click or press Space to change color.`}
      >
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-lg px-4 py-2 text-sm font-medium opacity-40 hover:opacity-80 transition-opacity"
          style={{ color: textColor, backgroundColor: textColor === "white" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)" }}
        >
          {currentColor.name} — Click / Space to cycle · ESC to exit
        </div>
        <div
          className="absolute top-4 right-4 rounded-lg px-3 py-1 text-xs font-mono opacity-30"
          style={{ color: textColor }}
        >
          {colorIndex + 1}/{COLORS.length}
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-red-500/10">
              <Monitor className="size-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Dead Pixel Checker</h3>
              <p className="text-sm text-muted-foreground">5 colors · Fullscreen inspection</p>
            </div>
          </div>
          <Badge variant="secondary">Ready</Badge>
        </div>

        <div ref={containerRef} className="rounded-lg border bg-muted/30 p-6">
          <div className="grid grid-cols-5 gap-2">
            {COLORS.map((c, i) => (
              <div
                key={c.name}
                className="aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all"
                style={{
                  backgroundColor: c.value,
                  borderColor: i === colorIndex ? "hsl(var(--primary))" : "hsl(var(--border))",
                  color: c.name === "Black" ? "#999" : "#333",
                }}
              >
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <div className="flex items-start gap-2">
            <Info className="size-4 mt-0.5 text-blue-500 shrink-0" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="text-foreground font-medium">Dead pixel</span> — Appears as a black dot on colored backgrounds.</p>
              <p><span className="text-foreground font-medium">Stuck pixel</span> — Appears as a colored dot on all backgrounds, especially visible on black.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={startTest} className="flex-1" size="lg">
            <Maximize className="mr-2 size-4" /> Start Fullscreen Test
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MousePointerClick className="size-3" />
          <span>Click or press Space to cycle colors · ESC to exit fullscreen</span>
        </div>
      </CardContent>
    </Card>
  )
}
