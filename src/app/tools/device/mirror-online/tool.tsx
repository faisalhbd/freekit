"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Maximize, Minimize, Camera, CameraOff } from "lucide-react"
import { toast } from "sonner"

export function MirrorOnlineTool() {
  const [isActive, setIsActive] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setIsActive(false)
  }, [])

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsActive(true)
      toast.success("Mirror activated!")
    } catch {
      toast.error("Could not access camera. Please grant permission.")
    }
  }, [])

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch {
      toast.error("Fullscreen not supported")
    }
  }, [])

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handler)
    return () => {
      document.removeEventListener("fullscreenchange", handler)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
      if (document.fullscreenElement) document.exitFullscreen()
    }
  }, [])

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div
          ref={containerRef}
          className="relative rounded-lg border bg-black overflow-hidden aspect-video flex items-center justify-center group"
        >
          {isActive && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover scale-x-[-1]"
              playsInline
              muted
              autoPlay
            />
          )}
          {!isActive && (
            <div className="flex flex-col items-center gap-3 text-white/50">
              <Camera className="size-16" />
              <p className="text-sm">Click below to open the mirror</p>
            </div>
          )}
          {isActive && (
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                onClick={toggleFullscreen}
                variant="secondary"
                size="icon"
                className="rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
              >
                {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          {!isActive ? (
            <Button onClick={startCamera} className="flex-1" size="lg">
              <Camera className="mr-2 size-4" /> Open Mirror
            </Button>
          ) : (
            <Button onClick={stopCamera} variant="destructive" className="flex-1" size="lg">
              <CameraOff className="mr-2 size-4" /> Close Mirror
            </Button>
          )}
          {isActive && (
            <Button onClick={toggleFullscreen} variant="outline" size="lg">
              {isFullscreen ? <Minimize className="mr-2 size-4" /> : <Maximize className="mr-2 size-4" />}
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}