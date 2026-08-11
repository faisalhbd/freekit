"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Mic, MicOff, RotateCcw } from "lucide-react"
import { toast } from "sonner"

function getNoiseLevel(db: number): { label: string; color: string; bg: string } {
  if (db < 40) return { label: "Quiet", color: "text-green-500", bg: "bg-green-500" }
  if (db < 70) return { label: "Moderate", color: "text-yellow-500", bg: "bg-yellow-500" }
  if (db < 90) return { label: "Loud", color: "text-orange-500", bg: "bg-orange-500" }
  return { label: "Dangerous", color: "text-red-500", bg: "bg-red-500" }
}

export function NoiseLevelMeterTool() {
  const [isActive, setIsActive] = useState(false)
  const [db, setDb] = useState(0)
  const [peakDb, setPeakDb] = useState(0)
  const [avgDb, setAvgDb] = useState(0)
  const [dbHistory, setDbHistory] = useState<number[]>([])

  const streamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animFrameRef = useRef<number>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const stop = useCallback(() => {
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = 0 }
    if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") { audioCtxRef.current.close(); audioCtxRef.current = null }
    analyserRef.current = null
    setIsActive(false)
  }, [])

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const ctx = new AudioContext()
      audioCtxRef.current = ctx
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 2048
      analyser.smoothingTimeConstant = 0.8
      source.connect(analyser)
      analyserRef.current = analyser

      setIsActive(true)
      setPeakDb(0)
      setAvgDb(0)
      setDbHistory([])
      toast.success("Noise level meter started")

      const dataArray = new Float32Array(analyser.fftSize)
      const historyArr: number[] = []

      const measure = () => {
        if (!analyserRef.current) return
        analyserRef.current.getFloatTimeDomainData(dataArray)

        let sumSquares = 0
        for (let i = 0; i < dataArray.length; i++) {
          sumSquares += dataArray[i] * dataArray[i]
        }
        const rms = Math.sqrt(sumSquares / dataArray.length)
        const dbVal = rms > 0 ? Math.max(0, 20 * Math.log10(rms) + 94) : 0
        const clampedDb = Math.round(dbVal * 10) / 10

        setDb(clampedDb)
        historyArr.push(clampedDb)
        if (historyArr.length > 100) historyArr.shift()
        setDbHistory([...historyArr])

        const peak = Math.max(...historyArr)
        setPeakDb(Math.round(peak * 10) / 10)
        const avg = historyArr.reduce((a, b) => a + b, 0) / historyArr.length
        setAvgDb(Math.round(avg * 10) / 10)

        animFrameRef.current = requestAnimationFrame(measure)
      }
      animFrameRef.current = requestAnimationFrame(measure)
    } catch {
      toast.error("Could not access microphone. Please grant permission.")
    }
  }, [])

  const reset = useCallback(() => {
    stop()
    setDb(0)
    setPeakDb(0)
    setAvgDb(0)
    setDbHistory([])
    toast.info("Reset complete")
  }, [stop])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext("2d")
    if (!ctx2d) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx2d.scale(dpr, dpr)

    const draw = () => {
      const c = canvasRef.current
      if (!c) return
      const cx = c.getContext("2d")
      if (!cx) return
      const r = c.getBoundingClientRect()
      cx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx.clearRect(0, 0, r.width, r.height)

      // Grid lines
      cx.strokeStyle = "hsl(var(--border))"
      cx.lineWidth = 0.5
      for (let d = 0; d <= 120; d += 20) {
        const y = r.height - (d / 120) * r.height
        cx.beginPath()
        cx.moveTo(0, y)
        cx.lineTo(r.width, y)
        cx.stroke()
      }

      if (dbHistory.length < 2) return

      const maxPts = Math.floor(r.width)
      const pts = dbHistory.slice(-maxPts)

      // Draw line
      cx.beginPath()
      cx.strokeStyle = "hsl(var(--primary))"
      cx.lineWidth = 2
      for (let i = 0; i < pts.length; i++) {
        const x = (i / (maxPts - 1)) * r.width
        const y = r.height - (Math.min(pts[i], 120) / 120) * r.height
        if (i === 0) cx.moveTo(x, y)
        else cx.lineTo(x, y)
      }
      cx.stroke()

      // Fill under
      cx.lineTo(((pts.length - 1) / (maxPts - 1)) * r.width, r.height)
      cx.lineTo(0, r.height)
      cx.closePath()
      cx.fillStyle = "hsl(var(--primary) / 0.1)"
      cx.fill()
    }

    const interval = setInterval(draw, 100)
    return () => clearInterval(interval)
  }, [dbHistory])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") audioCtxRef.current.close()
    }
  }, [])

  const level = getNoiseLevel(db)
  const gaugePercent = Math.min((db / 120) * 100, 100)

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex size-12 items-center justify-center rounded-xl ${isActive ? "bg-green-500/10" : "bg-muted"}`}>
              {isActive ? <Activity className="size-6 text-green-500" /> : <MicOff className="size-6 text-muted-foreground" />}
            </div>
            <div>
              <h3 className="font-semibold text-lg">Noise Level Meter</h3>
              <p className="text-sm text-muted-foreground">Approximate decibel measurement</p>
            </div>
          </div>
          <Badge variant={isActive ? "default" : "secondary"} className={isActive ? level.color : ""}>
            {isActive ? level.label : "Inactive"}
          </Badge>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 text-center space-y-4">
          <div className={`text-6xl font-bold tabular-nums ${level.color}`}>{db.toFixed(1)}</div>
          <div className="text-lg text-muted-foreground">dB (approximate)</div>

          <div className="relative h-6 w-full rounded-full bg-muted overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="h-full bg-green-500" style={{ width: "33.3%" }} />
              <div className="h-full bg-yellow-500" style={{ width: "25%" }} />
              <div className="h-full bg-orange-500" style={{ width: "16.7%" }} />
              <div className="h-full bg-red-500" style={{ width: "25%" }} />
            </div>
            <div
              className="absolute top-0 h-full w-1 bg-white rounded-full shadow-md transition-all duration-150"
              style={{ left: `${gaugePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 dB</span><span>40</span><span>70</span><span>90</span><span>120 dB</span>
          </div>
        </div>

        <canvas ref={canvasRef} className="w-full h-32 rounded-lg border bg-muted/30" />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xl font-bold tabular-nums">{peakDb.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Peak dB</div>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <div className="text-xl font-bold tabular-nums">{avgDb.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Average dB</div>
          </div>
        </div>

        <div className="flex gap-3">
 {!isActive ? (
            <Button onClick={start} className="flex-1" size="lg">
              <Mic className="mr-2 size-4" /> Start Meter
            </Button>
          ) : (
            <Button onClick={stop} variant="destructive" className="flex-1" size="lg">
              <MicOff className="mr-2 size-4" /> Stop Meter
            </Button>
          )}
          <Button onClick={reset} size="lg" variant="outline">
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}