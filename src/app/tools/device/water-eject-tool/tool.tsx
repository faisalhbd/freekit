"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Droplets, Volume2, VolumeX, Play, Square, RotateCcw } from "lucide-react"
import { toast } from "sonner"

const START_FREQ = 80
const END_FREQ = 400
const DURATION = 30

export function WaterEjectTool() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentFreq, setCurrentFreq] = useState(START_FREQ)
  const [cycleCount, setCycleCount] = useState(0)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const startTimeRef = useRef<number>(0)
  const animFrameRef = useRef<number>(0)

  const stopSound = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = 0
    }
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
      } catch {
        // already stopped
      }
      oscillatorRef.current = null
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect()
      gainNodeRef.current = null
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
    setIsPlaying(false)
    setProgress(0)
    setCurrentFreq(START_FREQ)
  }, [])

  const startSound = useCallback(() => {
    if (isPlaying) {
      stopSound()
      return
    }

    try {
      const ctx = new AudioContext()
      audioCtxRef.current = ctx

      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(START_FREQ, ctx.currentTime)
      gainNode.gain.setValueAtTime(0.8, ctx.currentTime)

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      oscillator.start(ctx.currentTime)

      oscillatorRef.current = oscillator
      gainNodeRef.current = gainNode
      startTimeRef.current = ctx.currentTime
      setIsPlaying(true)
      setCycleCount((c) => c + 1)
      toast.success("Water eject started — hold your device speaker-down!")

      const animate = () => {
        if (!audioCtxRef.current) return
        const elapsed = audioCtxRef.current.currentTime - startTimeRef.current
        const p = Math.min(elapsed / DURATION, 1)
        setProgress(Math.round(p * 100))

        if (p < 1) {
          const freq = START_FREQ + (END_FREQ - START_FREQ) * (0.5 - 0.5 * Math.cos(2 * Math.PI * p))
          if (oscillatorRef.current) {
            oscillatorRef.current.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime)
          }
          setCurrentFreq(Math.round(freq))
          animFrameRef.current = requestAnimationFrame(animate)
        } else {
          setIsPlaying(false)
          setProgress(100)
          setCurrentFreq(END_FREQ)
          toast.success("Water eject complete!")
          if (oscillatorRef.current) {
            try {
              oscillatorRef.current.stop()
            } catch {
              // already stopped
            }
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(animate)
    } catch {
      toast.error("Failed to start audio. Please check your browser settings.")
    }
  }, [isPlaying, stopSound])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop() } catch { /* noop */ }
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close()
      }
    }
  }, [])

  const reset = useCallback(() => {
    stopSound()
    setCycleCount(0)
    toast.info("Reset complete")
  }, [stopSound])

  const freqPercent = ((currentFreq - START_FREQ) / (END_FREQ - START_FREQ)) * 100

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10">
              <Droplets className="size-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Low-Frequency Sweep</h3>
              <p className="text-sm text-muted-foreground">80 Hz → 400 Hz · {DURATION} seconds</p>
            </div>
          </div>
          <Badge variant={isPlaying ? "default" : "secondary"}>
            {isPlaying ? "Active" : "Ready"}
          </Badge>
        </div>

        <div className="relative rounded-lg border bg-muted/30 p-6 text-center">
          {isPlaying ? (
            <Volume2 className="mx-auto size-16 animate-pulse text-primary" />
          ) : (
            <VolumeX className="mx-auto size-16 text-muted-foreground/50" />
          )}
          <div className="mt-4 text-3xl font-bold tabular-nums">{currentFreq} Hz</div>
          <p className="mt-1 text-sm text-muted-foreground">
            {isPlaying ? "Playing sweep tone..." : "Press start to begin"}
          </p>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>80 Hz</span>
              <span>{progress}%</span>
              <span>400 Hz</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-150"
              style={{ width: `${freqPercent}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Frequency Position</p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg border p-3">
            <div className="text-2xl font-bold tabular-nums">{cycleCount}</div>
            <div className="text-xs text-muted-foreground">Cycles Run</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-2xl font-bold tabular-nums">{DURATION}s</div>
            <div className="text-xs text-muted-foreground">Duration</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-2xl font-bold">{progress >= 100 ? "✓" : "—"}</div>
            <div className="text-xs text-muted-foreground">Status</div>
          </div>
        </div>

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">
            💡 Tip: Set volume to maximum and hold your device with the speaker facing downward on a soft cloth.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={startSound}
            className="flex-1"
            size="lg"
            variant={isPlaying ? "destructive" : "default"}
          >
            {isPlaying ? (
              <><Square className="mr-2 size-4" /> Stop</>
            ) : (
              <><Play className="mr-2 size-4" /> Start Eject</>
            )}
          </Button>
          <Button onClick={reset} size="lg" variant="outline">
            <RotateCcw className="mr-2 size-4" /> Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
