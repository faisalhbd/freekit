"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Ear, Play, RotateCcw, Volume2, VolumeX, BarChart3 } from "lucide-react"
import { toast } from "sonner"

const FREQUENCIES = [
  { freq: 125, label: "125 Hz" },
  { freq: 250, label: "250 Hz" },
  { freq: 500, label: "500 Hz" },
  { freq: 1000, label: "1 kHz" },
  { freq: 2000, label: "2 kHz" },
  { freq: 3000, label: "3 kHz" },
  { freq: 4000, label: "4 kHz" },
  { freq: 6000, label: "6 kHz" },
  { freq: 8000, label: "8 kHz" },
  { freq: 10000, label: "10 kHz" },
  { freq: 12000, label: "12 kHz" },
  { freq: 16000, label: "16 kHz" },
]

type Result = { freq: number; label: string; heard: boolean }
type Phase = "intro" | "testing" | "result"

export function HearingTestTool() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [results, setResults] = useState<Result[]>([])
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)

  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const playTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stopTone = useCallback(() => {
    if (playTimerRef.current) { clearTimeout(playTimerRef.current); playTimerRef.current = null }
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); oscillatorRef.current.disconnect() } catch { /* noop */ }
      oscillatorRef.current = null
    }
    if (gainRef.current) { gainRef.current.disconnect(); gainRef.current = null }
    setIsPlaying(false)
  }, [])

  const playTone = useCallback((freq: number) => {
    stopTone()
    let ctx = audioCtx
    if (!ctx || ctx.state === "closed") {
      ctx = new AudioContext()
      setAudioCtx(ctx)
    }

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(0.25, ctx.currentTime + 2.9)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 3.1)

    oscillatorRef.current = osc
    gainRef.current = gain
    setIsPlaying(true)

    playTimerRef.current = setTimeout(() => {
      setIsPlaying(false)
      oscillatorRef.current = null
      gainRef.current = null
    }, 3100)
  }, [audioCtx, stopTone])

  const startTest = useCallback(() => {
    setPhase("testing")
    setCurrentIdx(0)
    setResults([])
    toast.info("Put on headphones and set volume to a comfortable level")
  }, [])

  const respond = useCallback((heard: boolean) => {
    stopTone()
    const freq = FREQUENCIES[currentIdx]
    const newResults = [...results, { freq: freq.freq, label: freq.label, heard }]
    setResults(newResults)

    if (currentIdx < FREQUENCIES.length - 1) {
      const nextIdx = currentIdx + 1
      setCurrentIdx(nextIdx)
      setTimeout(() => playTone(FREQUENCIES[nextIdx].freq), 500)
    } else {
      setPhase("result")
      toast.success("Hearing test complete!")
    }
  }, [currentIdx, results, stopTone, playTone])

  const playCurrentTone = useCallback(() => {
    if (phase === "testing" && currentIdx < FREQUENCIES.length) {
      playTone(FREQUENCIES[currentIdx].freq)
    }
  }, [phase, currentIdx, playTone])

  const restart = useCallback(() => {
    stopTone()
    setPhase("intro")
    setCurrentIdx(0)
    setResults([])
    if (audioCtx && audioCtx.state !== "closed") audioCtx.close()
    setAudioCtx(null)
  }, [stopTone, audioCtx])

  useEffect(() => {
    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current)
      if (oscillatorRef.current) { try { oscillatorRef.current.stop() } catch { /* noop */ } }
      if (audioCtx && audioCtx.state !== "closed") audioCtx.close()
    }
  }, [audioCtx])

  const heardCount = results.filter((r) => r.heard).length
  const progressPercent = Math.round((results.length / FREQUENCIES.length) * 100)

  if (phase === "result") {
    return (
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-purple-500/10">
                <BarChart3 className="size-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Hearing Test Results</h3>
                <p className="text-sm text-muted-foreground">Heard {heardCount} of {FREQUENCIES.length} frequencies</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-end gap-1 h-40">
              {results.map((r) => {
                const height = r.heard ? "100%" : "15%"
                const color = r.heard ? "bg-green-500" : "bg-red-400/60"
                return (
                  <div key={r.freq} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t ${color} transition-all`}
                      style={{ height }}
                    />
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {r.freq >= 1000 ? `${r.freq / 1000}k` : r.freq}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold text-green-500">{heardCount}</div>
              <div className="text-xs text-muted-foreground">Frequencies Heard</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-2xl font-bold text-red-500">{FREQUENCIES.length - heardCount}</div>
              <div className="text-xs text-muted-foreground">Frequencies Missed</div>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              ⚠️ This is not a medical diagnosis. For professional hearing evaluation, consult an audiologist.
            </p>
          </div>

          <Button onClick={restart} className="w-full" size="lg">
            <RotateCcw className="mr-2 size-4" /> Restart Test
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-500/10">
              <Ear className="size-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {phase === "intro" ? "Hearing Test" : `Frequency ${currentIdx + 1} of ${FREQUENCIES.length}`}
              </h3>
              <p className="text-sm text-muted-foreground">
                {phase === "intro"
                  ? "12 frequencies from 125Hz to 16kHz"
                  : `Testing: ${FREQUENCIES[currentIdx].label}`}
              </p>
            </div>
          </div>
          {phase === "testing" && (
            <Badge variant={isPlaying ? "default" : "secondary"}>
              {isPlaying ? <><Volume2 className="mr-1 size-3" /> Playing</> : <><VolumeX className="mr-1 size-3" /> Silent</>}
            </Badge>
          )}
        </div>

        {phase === "intro" ? (
          <div className="rounded-lg border bg-muted/30 p-8 text-center space-y-4">
            <Ear className="mx-auto size-16 text-muted-foreground/50" />
            <h4 className="text-lg font-semibold">Ready to Test Your Hearing?</h4>
            <ul className="text-sm text-muted-foreground space-y-1 text-left max-w-sm mx-auto">
              <li>🎧 Use headphones for best results</li>
              <li>🔊 Set volume to a comfortable level</li>
              <li>🔇 Find a quiet environment</li>
              <li>⏱️ Test takes about 1-2 minutes</li>
            </ul>
            <Button onClick={startTest} size="lg" className="mt-4">
              <Play className="mr-2 size-4" /> Start Test
            </Button>
          </div>
        ) : (
          <>
            <div className="rounded-lg border bg-muted/30 p-8 text-center space-y-4">
              <div className="text-5xl font-bold tabular-nums text-primary">{FREQUENCIES[currentIdx].label}</div>
              <p className="text-sm text-muted-foreground">
                {isPlaying
                  ? "Listen carefully... Can you hear the tone?"
                  : "Click 'Play Tone' to hear this frequency"}
              </p>
            </div>

            <Progress value={progressPercent} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Frequency {currentIdx + 1}</span>
              <span>{progressPercent}% complete</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-2">
                <div className="text-lg font-bold tabular-nums">{results.filter((r) => r.heard).length}</div>
                <div className="text-xs text-muted-foreground">Heard</div>
              </div>
              <div className="rounded-lg border p-2">
                <div className="text-lg font-bold tabular-nums">{results.filter((r) => !r.heard).length}</div>
                <div className="text-xs text-muted-foreground">Missed</div>
              </div>
              <div className="rounded-lg border p-2">
                <div className="text-lg font-bold tabular-nums">{FREQUENCIES.length - currentIdx - 1}</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
            </div>

            <div className="space-y-3">
              {!isPlaying && (
                <Button onClick={playCurrentTone} variant="outline" className="w-full" size="lg">
                  <Play className="mr-2 size-4" /> Play Tone
                </Button>
              )}
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => respond(true)} className="w-full" size="lg" variant="default">
                  ✅ I Can Hear It
                </Button>
                <Button onClick={() => respond(false)} className="w-full" size="lg" variant="destructive">
                  ❌ I Cannot Hear It
                </Button>
              </div>
            </div>
          </>
        )}

        {phase === "testing" && (
          <Button onClick={restart} variant="ghost" size="sm" className="w-full">
            <RotateCcw className="mr-1 size-3" /> Quit Test
          </Button>
        )}
      </CardContent>
    </Card>
  )
}