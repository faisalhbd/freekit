"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Speaker, Square, Activity, Volume2 } from "lucide-react"
import { toast } from "sonner"

type TestMode = "idle" | "left" | "right" | "both" | "sweep"

export function SpeakerTestTool() {
  const [mode, setMode] = useState<TestMode>("idle")
  const [sweepFreq, setSweepFreq] = useState(100)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const pannerRef = useRef<StereoPannerNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const animFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  const stopAll = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = 0
    }
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); oscillatorRef.current.disconnect() } catch { /* noop */ }
      oscillatorRef.current = null
    }
    if (pannerRef.current) { pannerRef.current.disconnect(); pannerRef.current = null }
    if (analyserRef.current) { analyserRef.current.disconnect(); analyserRef.current = null }
    if (gainRef.current) { gainRef.current.disconnect(); gainRef.current = null }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
    setMode("idle")
    setSweepFreq(100)
  }, [])

  const drawWaveformRef = useRef<() => void>(() => {})

  useEffect(() => {
    drawWaveformRef.current = () => {
      const canvas = canvasRef.current
      const analyser = analyserRef.current
      if (!canvas || !analyser) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      const bufLen = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufLen)
      analyser.getByteTimeDomainData(dataArray)

      ctx.fillStyle = "hsl(var(--muted))"
      ctx.fillRect(0, 0, rect.width, rect.height)

      ctx.lineWidth = 2
      ctx.strokeStyle = "hsl(var(--primary))"
      ctx.beginPath()

      const sliceWidth = rect.width / bufLen
      let x = 0
      for (let i = 0; i < bufLen; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * rect.height) / 2
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
        x += sliceWidth
      }
      ctx.lineTo(rect.width, rect.height / 2)
      ctx.stroke()

      animFrameRef.current = requestAnimationFrame(() => drawWaveformRef.current())
    }
  }, [])

  const drawWaveform = useCallback(() => { drawWaveformRef.current() }, [])

  const playTone = useCallback((pan: number, label: string) => {
    stopAll()
    try {
      const ctx = new AudioContext()
      audioCtxRef.current = ctx

      const osc = ctx.createOscillator()
      const panner = ctx.createStereoPanner()
      const analyser = ctx.createAnalyser()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(440, ctx.currentTime)
      panner.pan.setValueAtTime(pan, ctx.currentTime)
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      analyser.fftSize = 2048

      osc.connect(panner)
      panner.connect(analyser)
      analyser.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      oscillatorRef.current = osc
      pannerRef.current = panner
      analyserRef.current = analyser
      gainRef.current = gain

      setMode(label as TestMode)
      toast.success(`Playing on ${label === "both" ? "Both Channels" : label.charAt(0).toUpperCase() + label.slice(1) + " Channel"}`)
      drawWaveform()
    } catch {
      toast.error("Failed to play audio. Check browser settings.")
    }
  }, [stopAll, drawWaveform])

  const startSweep = useCallback(() => {
    stopAll()
    try {
      const ctx = new AudioContext()
      audioCtxRef.current = ctx

      const osc = ctx.createOscillator()
      const analyser = ctx.createAnalyser()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(100, ctx.currentTime)
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      analyser.fftSize = 2048

      osc.connect(analyser)
      analyser.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      oscillatorRef.current = osc
      analyserRef.current = analyser
      gainRef.current = gain
      startTimeRef.current = ctx.currentTime

      setMode("sweep")
      toast.success("Frequency sweep started: 100 Hz → 10,000 Hz")
      drawWaveform()

      const sweepAnim = () => {
        if (!audioCtxRef.current) return
        const elapsed = audioCtxRef.current.currentTime - startTimeRef.current
        const progress = Math.min(elapsed / 10, 1)
        const freq = 100 * Math.pow(100, progress)
        if (oscillatorRef.current) {
          oscillatorRef.current.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime)
        }
        setSweepFreq(Math.round(freq))
        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(sweepAnim)
        } else {
          toast.success("Sweep complete!")
        }
      }
      animFrameRef.current = requestAnimationFrame(sweepAnim)
    } catch {
      toast.error("Failed to start sweep. Check browser settings.")
    }
  }, [stopAll, drawWaveform])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (oscillatorRef.current) { try { oscillatorRef.current.stop() } catch { /* noop */ } }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") audioCtxRef.current.close()
    }
  }, [])

  const modeLabel: Record<TestMode, string> = {
    idle: "Idle",
    left: "Left Channel",
    right: "Right Channel",
    both: "Both Channels",
    sweep: "Frequency Sweep",
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-500/10">
              <Speaker className="size-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Stereo Speaker Tester</h3>
              <p className="text-sm text-muted-foreground">440Hz tone test · Web Audio API</p>
            </div>
          </div>
          <Badge variant={mode !== "idle" ? "default" : "secondary"}>
            {modeLabel[mode]}
          </Badge>
        </div>

        <div className="rounded-lg border bg-muted/30 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-40"
            style={{ imageRendering: "auto" }}
          />
          <div className="px-4 py-2 border-t flex items-center gap-2">
            <Activity className="size-4 text-muted-foreground" />
            {mode === "sweep" ? (
              <span className="text-sm font-mono">Frequency: {sweepFreq} Hz</span>
            ) : mode !== "idle" ? (
              <span className="text-sm">440 Hz sine wave</span>
            ) : (
              <span className="text-sm text-muted-foreground">Waveform will appear here</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => playTone(-1, "left")}
            variant={mode === "left" ? "default" : "outline"}
            className="h-14"
          >
            <Volume2 className="mr-2 size-4" /> Left Channel
          </Button>
          <Button
            onClick={() => playTone(1, "right")}
            variant={mode === "right" ? "default" : "outline"}
            className="h-14"
          >
            <Volume2 className="mr-2 size-4" /> Right Channel
          </Button>
          <Button
            onClick={() => playTone(0, "both")}
            variant={mode === "both" ? "default" : "outline"}
            className="h-14"
          >
            <Speaker className="mr-2 size-4" /> Both Channels
          </Button>
          <Button
            onClick={startSweep}
            variant={mode === "sweep" ? "default" : "outline"}
            className="h-14"
          >
            <Activity className="mr-2 size-4" /> Frequency Sweep
          </Button>
        </div>

        {mode !== "idle" && (
          <Button onClick={stopAll} variant="destructive" className="w-full" size="lg">
            <Square className="mr-2 size-4" /> Stop Test
          </Button>
        )}
      </CardContent>
    </Card>
  )
}