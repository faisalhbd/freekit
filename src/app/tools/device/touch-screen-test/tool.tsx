"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Hand, RotateCcw, Pointer } from "lucide-react"
import { toast } from "sonner"

const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#a855f7", "#ec4899", "#14b8a6", "#f97316"]

interface TouchPoint {
  x: number
  y: number
  color: string
}

export function TouchScreenTestTool() {
  const [touchCount, setTouchCount] = useState(0)
  const [multiTouchCount, setMultiTouchCount] = useState(0)
  const [maxMultiTouch, setMaxMultiTouch] = useState(0)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<TouchPoint[]>([])

  const getCanvasPos = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }, [])

  const drawDot = useCallback((x: number, y: number, color: string, radius = 6) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.strokeStyle = "rgba(255,255,255,0.6)"
    ctx.lineWidth = 1.5
    ctx.stroke()
  }, [])

  const drawLine = useCallback((from: { x: number; y: number }, to: { x: number; y: number }, color: string) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.stroke()
  }, [])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(dpr, dpr)
    // Redraw all existing points
    for (let i = 0; i < pointsRef.current.length; i++) {
      const p = pointsRef.current[i]
      drawDot(p.x, p.y, p.color, 6)
      if (i > 0) {
        const prev = pointsRef.current[i - 1]
        drawLine(prev, p, p.color)
      }
    }
  }, [drawDot, drawLine])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [resizeCanvas])

  const addPoint = useCallback((x: number, y: number) => {
    const color = COLORS[pointsRef.current.length % COLORS.length]
    const point: TouchPoint = { x, y, color }
    pointsRef.current.push(point)

    if (lastPos) {
      drawLine(lastPos, { x, y }, color)
    }
    drawDot(x, y, color)
    setLastPos({ x, y })
    setTouchCount((c) => c + 1)
  }, [lastPos, drawLine, drawDot])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault()
    setIsDrawing(true)
    const count = e.touches.length
    setMultiTouchCount(count)
    if (count > maxMultiTouch) setMaxMultiTouch(count)

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i]
      const pos = getCanvasPos(touch.clientX, touch.clientY)
      const color = COLORS[i % COLORS.length]
      drawDot(pos.x, pos.y, color, 10)
      setTouchCount((c) => c + 1)
    }
  }, [getCanvasPos, drawDot, maxMultiTouch])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault()
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i]
      const pos = getCanvasPos(touch.clientX, touch.clientY)
      const color = COLORS[i % COLORS.length]
      drawDot(pos.x, pos.y, color, 4)
      setTouchCount((c) => c + 1)
    }
  }, [getCanvasPos, drawDot])

  const handleTouchEnd = useCallback(() => {
    setMultiTouchCount(0)
    setIsDrawing(false)
    setLastPos(null)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false })
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("touchend", handleTouchEnd)
    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const pos = getCanvasPos(e.clientX, e.clientY)
    addPoint(pos.x, pos.y)
  }, [getCanvasPos, addPoint])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const pos = getCanvasPos(e.clientX, e.clientY)
    const color = COLORS[pointsRef.current.length % COLORS.length]
    drawDot(pos.x, pos.y, color, 3)
    setTouchCount((c) => c + 1)
  }, [isDrawing, getCanvasPos, drawDot])

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false)
    setLastPos(null)
  }, [])

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.scale(dpr, dpr)
    pointsRef.current = []
    setTouchCount(0)
    setMultiTouchCount(0)
    setMaxMultiTouch(0)
    setLastPos(null)
    toast.info("Canvas cleared")
  }, [])

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-orange-500/10">
              <Hand className="size-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Touch Canvas</h3>
              <p className="text-sm text-muted-foreground">Draw to test your touchscreen</p>
            </div>
          </div>
          <div className="flex gap-2">
            {multiTouchCount > 1 && (
              <Badge className="bg-orange-500 text-white">{multiTouchCount}-touch detected!</Badge>
            )}
            {isDrawing && <Badge variant="default">Drawing...</Badge>}
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className="w-full h-80 sm:h-96 rounded-lg border bg-muted/30 cursor-crosshair touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg border p-3">
            <div className="text-2xl font-bold tabular-nums">{touchCount}</div>
            <div className="text-xs text-muted-foreground">Total Touches</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-2xl font-bold tabular-nums">{multiTouchCount || "—"}</div>
            <div className="text-xs text-muted-foreground">Current Touches</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-2xl font-bold tabular-nums">{maxMultiTouch || "—"}</div>
            <div className="text-xs text-muted-foreground">Max Multi-Touch</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={clearCanvas} variant="outline" className="flex-1" size="lg">
            <RotateCcw className="mr-2 size-4" /> Clear Canvas
          </Button>
        </div>

        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Pointer className="size-3" /> Touch or click-drag on the canvas. Use multiple fingers to test multi-touch.
        </p>
      </CardContent>
    </Card>
  )
}