"use client"

import { useState, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Gauge, Play, RotateCcw, Wifi, Clock, Download } from "lucide-react"
import { toast } from "sonner"

const TEST_URLS = [
  "https://speed.cloudflare.com/__down?bytes=10000000",
  "https://speed.cloudflare.com/__down?bytes=10000000",
  "https://speed.cloudflare.com/__down?bytes=10000000",
]

type TestStatus = "idle" | "testing" | "done" | "error"

export function InternetSpeedTestTool() {
  const [status, setStatus] = useState<TestStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState<number | null>(null)
  const [peakSpeed, setPeakSpeed] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [downloaded, setDownloaded] = useState<number | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const runTest = useCallback(async () => {
    setStatus("testing")
    setProgress(0)
    setSpeed(null)
    setPeakSpeed(null)
    setDuration(null)
    setDownloaded(null)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const startTime = performance.now()
      let totalBytes = 0
      let currentPeak = 0
      let segmentStart = startTime
      const totalSegments = TEST_URLS.length

      for (let i = 0; i < totalSegments; i++) {
        if (controller.signal.aborted) break

        const response = await fetch(TEST_URLS[i], {
          cache: "no-store",
          signal: controller.signal,
        })

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const reader = response.body?.getReader()
        if (!reader) throw new Error("No readable stream")

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          totalBytes += value.byteLength

          const now = performance.now()
          const segmentElapsed = (now - segmentStart) / 1000
          if (segmentElapsed > 0.2) {
            const segmentBytes = value.byteLength
            const segmentSpeed = (segmentBytes * 8) / (segmentElapsed * 1000000)
            if (segmentSpeed > currentPeak) currentPeak = segmentSpeed
            setSpeed(Math.round(segmentSpeed * 100) / 100)
            setPeakSpeed(Math.round(currentPeak * 100) / 100)
            segmentStart = now
          }

          const overallProgress = ((i + (value.byteLength / 10000000)) / totalSegments) * 100
          setProgress(Math.min(Math.round(overallProgress), 100))
        }

        setProgress(Math.round(((i + 1) / totalSegments) * 100))
      }

      const endTime = performance.now()
      const totalDuration = (endTime - startTime) / 1000
      const avgSpeed = (totalBytes * 8) / (totalDuration * 1000000)

      setSpeed(Math.round(avgSpeed * 100) / 100)
      if (currentPeak < avgSpeed) setPeakSpeed(Math.round(avgSpeed * 100) / 100)
      setDuration(Math.round(totalDuration * 10) / 10)
      setDownloaded(totalBytes)
      setProgress(100)
      setStatus("done")
      toast.success(`Speed test complete: ${avgSpeed.toFixed(2)} Mbps`)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        toast.info("Test cancelled")
      } else {
        toast.error("Speed test failed. Check your internet connection.")
      }
      setStatus("error")
    } finally {
      abortRef.current = null
    }
  }, [])

  const cancelTest = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
    setStatus("idle")
    setProgress(0)
  }, [])

  const reset = useCallback(() => {
    if (abortRef.current) abortRef.current.abort()
    setStatus("idle")
    setProgress(0)
    setSpeed(null)
    setPeakSpeed(null)
    setDuration(null)
    setDownloaded(null)
    toast.info("Reset complete")
  }, [])

  const getSpeedLabel = () => {
    if (!speed) return "—"
    if (speed < 10) return "Slow"
    if (speed < 50) return "Moderate"
    if (speed < 100) return "Fast"
    return "Very Fast"
  }

  const getSpeedColor = () => {
    if (!speed) return "text-muted-foreground"
    if (speed < 10) return "text-red-500"
    if (speed < 50) return "text-yellow-500"
    if (speed < 100) return "text-green-500"
    return "text-emerald-500"
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-green-500/10">
              <Gauge className="size-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Download Speed Test</h3>
              <p className="text-sm text-muted-foreground">~30 MB test data via Cloudflare CDN</p>
            </div>
          </div>
          <Badge variant={status === "testing" ? "default" : status === "done" ? "default" : "secondary"}>
            {status === "idle" ? "Ready" : status === "testing" ? "Testing..." : status === "done" ? "Complete" : "Error"}
          </Badge>
        </div>

        <div className="rounded-lg border bg-muted/30 p-8 text-center space-y-3">
          <div className={`text-5xl font-bold tabular-nums ${getSpeedColor()}`}>
            {speed !== null ? speed.toFixed(2) : "—"}
          </div>
          <div className="text-lg text-muted-foreground">Mbps</div>
          {speed !== null && (
            <div className="text-sm font-medium text-muted-foreground">{getSpeedLabel()}</div>
          )}
          {status === "testing" && (
            <div className="space-y-2 mt-4">
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-muted-foreground">{progress}% complete</div>
            </div>
          )}
        </div>

        {(status === "done" || status === "error") && (
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Wifi className="size-3 text-muted-foreground" />
              </div>
              <div className="text-lg font-bold tabular-nums">{peakSpeed !== null ? peakSpeed.toFixed(2) : "—"}</div>
              <div className="text-xs text-muted-foreground">Peak (Mbps)</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="size-3 text-muted-foreground" />
              </div>
              <div className="text-lg font-bold tabular-nums">{duration !== null ? duration : "—"}s</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Download className="size-3 text-muted-foreground" />
              </div>
              <div className="text-lg font-bold tabular-nums">{downloaded !== null ? (downloaded / 1000000).toFixed(1) : "—"}</div>
              <div className="text-xs text-muted-foreground">MB Downloaded</div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {status === "testing" ? (
            <Button onClick={cancelTest} variant="destructive" className="flex-1" size="lg">
              Cancel Test
            </Button>
          ) : (
            <Button onClick={runTest} className="flex-1" size="lg" disabled={status === "testing"}>
              <Play className="mr-2 size-4" /> Run Speed Test
            </Button>
          )}
          <Button onClick={reset} size="lg" variant="outline" disabled={status === "testing"}>
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}