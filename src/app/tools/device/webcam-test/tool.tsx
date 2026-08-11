"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, CameraOff, FlipHorizontal2, Download, RotateCcw, MonitorSmartphone } from "lucide-react"
import { toast } from "sonner"

export function WebcamTestTool() {
  const [isActive, setIsActive] = useState(false)
  const [isMirrored, setIsMirrored] = useState(true)
  const [deviceName, setDeviceName] = useState("")
  const [resolution, setResolution] = useState("")
  const [fps, setFps] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fpsFrames = useRef<number[]>([])
  const animRef = useRef<number>(0)

  const stopCamera = useCallback(() => {
    if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = 0 }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setIsActive(false)
    setDeviceName("")
    setResolution("")
    setFps(0)
    fpsFrames.current = []
  }, [])

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } } })
      streamRef.current = stream
      const track = stream.getVideoTracks()[0]
      setDeviceName((track.label || "Unknown Camera"))

      const settings = track.getSettings()
 const w = settings.width || 0
 const h = settings.height || 0
      setResolution(`${w} × ${h}`)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setIsActive(true)
      toast.success("Camera connected successfully!")

      const measureFps = () => {
        const now = performance.now()
        fpsFrames.current.push(now)
        fpsFrames.current = fpsFrames.current.filter((t) => now - t < 1000)
        setFps(fpsFrames.current.length)
        animRef.current = requestAnimationFrame(measureFps)
      }
      animRef.current = requestAnimationFrame(measureFps)
    } catch {
      toast.error("Could not access camera. Please grant permission.")
    }
  }, [])

  const takeScreenshot = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    if (isMirrored) {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    ctx.drawImage(video, 0, 0)
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `webcam-test-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
      toast.success("Screenshot saved!")
    }, "image/png")
  }, [isMirrored])

  const reset = useCallback(() => {
    stopCamera()
    setIsMirrored(true)
    toast.info("Reset complete")
  }, [stopCamera])

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
    }
  }, [])

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex size-12 items-center justify-center rounded-xl ${isActive ? "bg-green-500/10" : "bg-muted"}`}>
              {isActive ? <Camera className="size-6 text-green-500" /> : <CameraOff className="size-6 text-muted-foreground" />}
            </div>
            <div>
              <h3 className="font-semibold text-lg">Camera Status</h3>
              <p className="text-sm text-muted-foreground max-w-xs truncate">{deviceName || "Not connected"}</p>
            </div>
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <div className="relative rounded-lg border bg-black overflow-hidden aspect-video flex items-center justify-center">
 <video
            ref={videoRef}
            className={`w-full h-full object-contain ${isMirrored ? "scale-x-[-1]" : ""}`}
            playsInline
            muted
          />
          {!isActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/60">
              <MonitorSmartphone className="size-16" />
              <p className="text-sm">Click Start Camera to begin</p>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {isActive && (
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 text-center">
              <div className="text-lg font-bold tabular-nums">{resolution || "—"}</div>
              <div className="text-xs text-muted-foreground">Resolution</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-lg font-bold tabular-nums">{fps} FPS</div>
              <div className="text-xs text-muted-foreground">Frame Rate</div>
            </div>
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
 {!isActive ? (
            <Button onClick={startCamera} className="flex-1" size="lg">
              <Camera className="mr-2 size-4" /> Start Camera
            </Button>
          ) : (
            <Button onClick={stopCamera} variant="destructive" className="flex-1" size="lg">
              <CameraOff className="mr-2 size-4" /> Stop Camera
            </Button>
          )}
          {isActive && (
            <>
              <Button
                onClick={() => setIsMirrored((m) => !m)}
                variant={isMirrored ? "default" : "outline"}
                size="lg"
              >
                <FlipHorizontal2 className="mr-2 size-4" /> {isMirrored ? "Mirrored" : "Normal"}
              </Button>
              <Button onClick={takeScreenshot} variant="outline" size="lg">
                <Download className="mr-2 size-4" /> Screenshot
              </Button>
            </>
          )}
          <Button onClick={reset} size="lg" variant="outline">
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}