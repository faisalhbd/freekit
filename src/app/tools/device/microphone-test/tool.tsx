"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Play, Square, RotateCcw } from "lucide-react"
import { toast } from "sonner"

const RECORD_DURATION = 5

export function MicrophoneTestTool() {
  const [isActive, setIsActive] = useState(false)
  const [volume, setVolume] = useState(0)
  const [deviceName, setDeviceName] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordProgress, setRecordProgress] = useState(0)
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const streamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animFrameRef = useRef<number>(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioElRef = useRef<HTMLAudioElement | null>(null)
  const recTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopMic = useCallback(() => {
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = 0 }
    if (recTimerRef.current) { clearInterval(recTimerRef.current); recTimerRef.current = null }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
    analyserRef.current = null
    setIsActive(false)
    setVolume(0)
    setIsRecording(false)
  }, [])

  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const track = stream.getAudioTracks()[0]
      const settings = track.getSettings()
      const name = track.label || "Unknown Microphone"
      setDeviceName(name)

      const ctx = new AudioContext()
      audioCtxRef.current = ctx
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.8
      source.connect(analyser)
      analyserRef.current = analyser

      setIsActive(true)
      toast.success(`Microphone connected: ${(name || "").substring(0, 50)}`)

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      const update = () => {
        if (!analyserRef.current) return
        analyserRef.current.getByteFrequencyData(dataArray)
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i]
        const avg = sum / dataArray.length
        setVolume(Math.min(Math.round((avg / 255) * 100), 100))
        animFrameRef.current = requestAnimationFrame(update)
      }
      animFrameRef.current = requestAnimationFrame(update)
    } catch (err) {
      toast.error("Could not access microphone. Please grant permission.")
    }
  }, [])

  const startRecording = useCallback(() => {
    if (!streamRef.current) return
    chunksRef.current = []
    setRecordedUrl(null)
    setIsRecording(true)
    setRecordProgress(0)

    const recorder = new MediaRecorder(streamRef.current)
    mediaRecorderRef.current = recorder
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" })
      setRecordedUrl(URL.createObjectURL(blob))
      setIsRecording(false)
      toast.success("Recording complete — click play to listen")
    }
    recorder.start()
    toast.info(`Recording ${RECORD_DURATION} seconds...`)

    let elapsed = 0
    recTimerRef.current = setInterval(() => {
      elapsed += 0.1
      setRecordProgress(Math.min((elapsed / RECORD_DURATION) * 100, 100))
      if (elapsed >= RECORD_DURATION) {
        if (recTimerRef.current) clearInterval(recTimerRef.current)
        recorder.stop()
      }
    }, 100)
  }, [])

  const playRecording = useCallback(() => {
    if (!recordedUrl) return
    const audio = new Audio(recordedUrl)
    audioElRef.current = audio
    audio.onplay = () => setIsPlaying(true)
    audio.onended = () => setIsPlaying(false)
    audio.play()
  }, [recordedUrl])

  const reset = useCallback(() => {
    stopMic()
    if (recordedUrl) URL.revokeObjectURL(recordedUrl)
    setRecordedUrl(null)
    setDeviceName("")
    setRecordProgress(0)
    toast.info("Reset complete")
  }, [stopMic, recordedUrl])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (recTimerRef.current) clearInterval(recTimerRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") audioCtxRef.current.close()
    }
  }, [])

  const volColor = volume > 70 ? "text-red-500" : volume > 40 ? "text-yellow-500" : "text-green-500"

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex size-12 items-center justify-center rounded-xl ${isActive ? "bg-green-500/10" : "bg-muted"}`}>
              {isActive ? <Mic className="size-6 text-green-500" /> : <MicOff className="size-6 text-muted-foreground" />}
            </div>
            <div>
              <h3 className="font-semibold text-lg">Microphone Status</h3>
              <p className="text-sm text-muted-foreground max-w-xs truncate">{deviceName || "Not connected"}</p>
            </div>
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        <div className="rounded-lg border bg-muted/30 p-6 text-center space-y-4">
          <div className={`text-6xl font-bold tabular-nums ${volColor}`}>{volume}%</div>
          <p className="text-sm text-muted-foreground">
            {volume === 0 ? "No input detected" : volume < 20 ? "Very quiet" : volume < 50 ? "Normal speaking level" : volume < 75 ? "Loud" : "Very loud — may cause clipping"}
          </p>
          <div className="space-y-1">
            <Progress value={volume} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>
        </div>

        {isRecording && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-red-600 dark:text-red-400">⏺ Recording...</span>
              <span className="text-sm text-red-600 dark:text-red-400 tabular-nums">{Math.round(recordProgress)}%</span>
            </div>
            <Progress value={recordProgress} className="h-2" />
          </div>
        )}

        {recordedUrl && (
          <div className="rounded-lg border bg-green-500/5 p-4 space-y-3">
            <p className="text-sm font-medium text-green-600 dark:text-green-400">✅ Recording available</p>
            <Button onClick={playRecording} disabled={isPlaying} variant="outline" className="w-full">
              <Play className="mr-2 size-4" /> {isPlaying ? "Playing..." : "Play Recording"}
            </Button>
          </div>
        )}

        <div className="flex gap-3">
 {!isActive ? (
            <Button onClick={startMic} className="flex-1" size="lg">
              <Mic className="mr-2 size-4" /> Start Test
            </Button>
          ) : (
            <Button onClick={stopMic} variant="destructive" className="flex-1" size="lg">
              <MicOff className="mr-2 size-4" /> Stop
            </Button>
          )}
          {isActive && !isRecording && (
            <Button onClick={startRecording} variant="outline" size="lg">
              <Square className="mr-2 size-4" /> Record {RECORD_DURATION}s
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