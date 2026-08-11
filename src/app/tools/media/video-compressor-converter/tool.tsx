"use client"

import { useState, useRef, useCallback } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Film,
  Upload,
  Download,
  X,
  Loader2,
  Settings2,
  Play,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Cpu,
  HardDrive,
  MonitorPlay,
} from "lucide-react"
import { toast } from "sonner"

// ─── Types ────────────────────────────────────────────────────────────────

type OutputFormat = "mp4" | "webm" | "avi" | "mov" | "mkv" | "gif"
type Resolution = "original" | "2160" | "1080" | "720" | "480" | "360"
type Quality = "high" | "medium" | "low" | "very-low"
type ProcessingStage = "idle" | "loading-ffmpeg" | "loaded" | "processing" | "done" | "error"

interface VideoInfo {
  name: string
  size: number
  type: string
  duration: number
  width: number
  height: number
  bitrate: number
}

interface ProcessResult {
  outputUrl: string
  outputSize: number
  savings: number
  outputName: string
}

// ─── Constants ────────────────────────────────────────────────────────────

const FORMAT_OPTIONS: { value: OutputFormat; label: string; desc: string }[] = [
  { value: "mp4", label: "MP4", desc: "H.264 + AAC - Best compatibility" },
  { value: "webm", label: "WebM", desc: "VP9 + Opus - Smaller size" },
  { value: "avi", label: "AVI", desc: "MPEG-4 + MP3 - Legacy format" },
  { value: "mov", label: "MOV", desc: "H.264 + AAC - Apple devices" },
  { value: "mkv", label: "MKV", desc: "H.264 + AAC - Flexible container" },
  { value: "gif", label: "GIF", desc: "Animated GIF - No audio" },
]

const RESOLUTION_OPTIONS: { value: Resolution; label: string; pixels: string }[] = [
  { value: "original", label: "Original", pixels: "Keep current" },
  { value: "2160", label: "4K (2160p)", pixels: "3840x2160" },
  { value: "1080", label: "1080p", pixels: "1920x1080" },
  { value: "720", label: "720p", pixels: "1280x720" },
  { value: "480", label: "480p", pixels: "854x480" },
  { value: "360", label: "360p", pixels: "640x360" },
]

const QUALITY_MAP: Record<Quality, { crf: number; label: string; desc: string }> = {
  high: { crf: 20, label: "High Quality", desc: "Larger file, minimal quality loss" },
  medium: { crf: 26, label: "Balanced", desc: "Good balance of size and quality" },
  low: { crf: 32, label: "Low", desc: "Much smaller, some quality loss" },
  "very-low": { crf: 40, label: "Very Low", desc: "Smallest size, noticeable artifacts" },
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return m + ":" + s.toString().padStart(2, "0")
}

function getOutputExt(format: OutputFormat): string {
  if (format === "mov") return ".mov"
  return "." + format
}

function getOutputMimeType(format: OutputFormat): string {
  const map: Record<OutputFormat, string> = {
    mp4: "video/mp4",
    webm: "video/webm",
    avi: "video/x-msvideo",
    mov: "video/quicktime",
    mkv: "video/x-matroska",
    gif: "image/gif",
  }
  return map[format]
}

// ─── Component ────────────────────────────────────────────────────────────

export function VideoCompressorConverter() {
  const [stage, setStage] = useState<ProcessingStage>("idle")
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("")
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("mp4")
  const [resolution, setResolution] = useState<Resolution>("original")
  const [quality, setQuality] = useState<Quality>("medium")
  const [keepAudio, setKeepAudio] = useState(true)
  const [result, setResult] = useState<ProcessResult | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const ffmpegRef = useRef<any>(null)
  const resultUrlRef = useRef<string>("")

  const cleanupResult = useCallback(() => {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current)
      resultUrlRef.current = ""
    }
    setResult(null)
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      cleanupResult()
      setVideoFile(file)
      setVideoPreviewUrl(URL.createObjectURL(file))
      setVideoInfo(null)
      setStage("idle")
      setProgress(0)
      setErrorMessage("")
      if (fileInputRef.current) fileInputRef.current.value = ""
    },
    [cleanupResult]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files?.[0]
      if (!file || !file.type.startsWith("video/")) {
        toast.error("Please drop a video file")
        return
      }
      cleanupResult()
      setVideoFile(file)
      setVideoPreviewUrl(URL.createObjectURL(file))
      setVideoInfo(null)
      setStage("idle")
      setProgress(0)
      setErrorMessage("")
    },
    [cleanupResult]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const detectVideoInfo = useCallback(async () => {
    if (!videoFile || !videoPreviewUrl) return
    try {
      const video = document.createElement("video")
      video.preload = "metadata"
      video.src = videoPreviewUrl
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve()
        video.onerror = () => reject(new Error("Failed to load video metadata"))
      })
      setVideoInfo({
        name: videoFile.name,
        size: videoFile.size,
        type: videoFile.type,
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        bitrate: Math.round((videoFile.size * 8) / video.duration),
      })
    } catch {
      setVideoInfo({
        name: videoFile.name,
        size: videoFile.size,
        type: videoFile.type,
        duration: 0,
        width: 0,
        height: 0,
        bitrate: 0,
      })
    }
  }, [videoFile, videoPreviewUrl])

  // Auto-detect video info when file changes
  const infoTriggered = useRef(false)
  if (videoFile && videoPreviewUrl && !videoInfo && !infoTriggered.current) {
    infoTriggered.current = true
    detectVideoInfo()
  }

  const processVideo = useCallback(async () => {
    if (!videoFile) return

    cleanupResult()
    setStage("loading-ffmpeg")
    setProgress(5)
    setProgressText("Loading FFmpeg engine...")
    setErrorMessage("")

    try {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg")
      const { fetchFile, toBlobURL } = await import("@ffmpeg/util")

      const ffmpeg = new FFmpeg()
      ffmpegRef.current = ffmpeg

      ffmpeg.on("progress", ({ progress: p, time }) => {
        const pct = Math.round(Math.max(5, Math.min(95, p * 100)))
        setProgress(pct)
        const timeStr = formatDuration(time / 1000000)
        setProgressText("Processing... " + pct + "% (" + timeStr + ")")
      })

      ffmpeg.on("log", ({ message }) => {
        if (message.includes("error") || message.includes("Error")) {
          console.warn("FFmpeg:", message)
        }
      })

      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm"
      await ffmpeg.load({
        coreURL: await toBlobURL(baseURL + "/ffmpeg-core.js", "text/javascript"),
        wasmURL: await toBlobURL(baseURL + "/ffmpeg-core.wasm", "application/wasm"),
      })

      setStage("loaded")
      setProgress(10)
      setProgressText("Writing input file...")

      const inputName = "input" + (videoFile.name.includes(".") ? videoFile.name.substring(videoFile.name.lastIndexOf(".")) : ".mp4")
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile))

      setProgress(15)
      setProgressText("Processing video...")
      setStage("processing")

      // Build FFmpeg arguments
      const args: string[] = ["-i", inputName]

      // Resolution
      if (resolution !== "original") {
        const h = parseInt(resolution)
        args.push("-vf", "scale=-2:" + String(h))
      }

      // Codec and quality based on format
      const crf = QUALITY_MAP[quality].crf

      if (outputFormat === "gif") {
        const vf = resolution !== "original" ? "scale=-2:" + resolution + ",fps=15" : "fps=15"
        args.push("-vf", vf, "-t", "10")
      } else if (outputFormat === "webm") {
        args.push("-c:v", "libvpx-vp9", "-crf", String(crf), "-b:v", "0")
        if (keepAudio) {
          args.push("-c:a", "libopus", "-b:a", "128k")
        } else {
          args.push("-an")
        }
      } else if (outputFormat === "mp4" || outputFormat === "mov") {
        args.push("-c:v", "libx264", "-preset", "fast", "-crf", String(crf))
        if (keepAudio) {
          args.push("-c:a", "aac", "-b:a", "128k")
        } else {
          args.push("-an")
        }
      } else if (outputFormat === "avi") {
        args.push("-c:v", "libx264", "-preset", "fast", "-crf", String(crf))
        if (keepAudio) {
          args.push("-c:a", "libmp3lame", "-b:a", "128k")
        } else {
          args.push("-an")
        }
      } else if (outputFormat === "mkv") {
        args.push("-c:v", "libx264", "-preset", "fast", "-crf", String(crf))
        if (keepAudio) {
          args.push("-c:a", "aac", "-b:a", "128k")
        } else {
          args.push("-an")
        }
      }

      const ext = getOutputExt(outputFormat)
      args.push("-y", "output" + ext)

      await ffmpeg.exec(args)

      setProgress(90)
      setProgressText("Reading output...")

      const outputData = await ffmpeg.readFile("output" + ext)
      const blob = new Blob([outputData], { type: getOutputMimeType(outputFormat) })
      const url = URL.createObjectURL(blob)
      resultUrlRef.current = url

      const baseName = videoFile.name.replace(/\.[^.]+$/, "")
      const outputName = baseName + "_compressed" + ext

      const savingsPct = videoFile.size > 0 ? Math.round((1 - blob.size / videoFile.size) * 100) : 0

      setResult({
        outputUrl: url,
        outputSize: blob.size,
        savings: savingsPct,
        outputName,
      })

      setProgress(100)
      setProgressText("Done!")
      setStage("done")
      const savedPct = Math.abs(savingsPct)
      toast.success("Video processed! Saved " + savedPct + "%")

      // Cleanup ffmpeg FS
      await ffmpeg.deleteFile(inputName)
      await ffmpeg.deleteFile("output" + ext)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Processing failed"
      setErrorMessage(msg)
      setStage("error")
      toast.error("Video processing failed: " + msg)
    }
  }, [videoFile, outputFormat, resolution, quality, keepAudio, cleanupResult])

  const handleDownload = useCallback(() => {
    if (!result) return
    const a = document.createElement("a")
    a.href = result.outputUrl
    a.download = result.outputName
    a.click()
  }, [result])

  const handleReset = useCallback(() => {
    cleanupResult()
    setVideoFile(null)
    setVideoInfo(null)
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl)
    setVideoPreviewUrl("")
    setStage("idle")
    setProgress(0)
    setProgressText("")
    setErrorMessage("")
    ffmpegRef.current = null
    infoTriggered.current = false
  }, [cleanupResult, videoPreviewUrl])

  // ─── Render ──────────────────────────────────────────────────────────────

  const isProcessing = stage === "loading-ffmpeg" || stage === "processing"
  const isDone = stage === "done"
  const hasFile = !!videoFile

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!hasFile && (
        <div
          className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-primary/40 hover:bg-muted/30"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          <Upload className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <p className="text-lg font-medium">Drop your video here or click to browse</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supports MP4, WebM, MOV, AVI, MKV, and more
          </p>
        </div>
      )}

      {hasFile && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Video Preview + Info */}
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="relative bg-black rounded-t-lg">
                  <video
                    src={videoPreviewUrl}
                    controls
                    className="w-full max-h-[360px] object-contain"
                    preload="metadata"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate" title={videoFile.name}>
                        {videoFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatBytes(videoFile.size)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      disabled={isProcessing}
                    >
                      <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                      Change
                    </Button>
                  </div>

                  {videoInfo && videoInfo.duration > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                        <MonitorPlay className="mx-auto h-4 w-4 mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Resolution</p>
                        <p className="text-sm font-semibold">
                          {videoInfo.width}x{videoInfo.height}
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                        <Play className="mx-auto h-4 w-4 mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-semibold">
                          {formatDuration(videoInfo.duration)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                        <Cpu className="mx-auto h-4 w-4 mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Bitrate</p>
                        <p className="text-sm font-semibold">
                          {formatBytes(videoInfo.bitrate)}/s
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                        <HardDrive className="mx-auto h-4 w-4 mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Size</p>
                        <p className="text-sm font-semibold">
                          {formatBytes(videoInfo.size)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress Bar */}
            {(isProcessing || isDone || stage === "error") && (
              <Card>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
                      {isDone && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      {stage === "error" && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      {progressText ||
                        (isProcessing ? "Processing..." : "")}
                    </span>
                    <span className="text-sm font-mono text-muted-foreground">
                      {progress}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2.5" />
                  {isDone && result && (
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-muted-foreground">
                          {formatBytes(videoFile.size)} -&gt; {formatBytes(result.outputSize)}
                        </span>
                        <Badge
                          variant={result.savings >= 0 ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {result.savings >= 0
                            ? "-" + result.savings + "% smaller"
                            : "+" + Math.abs(result.savings) + "% larger"}
                        </Badge>
                      </div>
                      <Button size="sm" onClick={handleDownload}>
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Download
                      </Button>
                    </div>
                  )}
                  {stage === "error" && errorMessage && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errorMessage}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Result Preview */}
            {isDone && result && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Processed Video Preview</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <video
                    src={result.outputUrl}
                    controls
                    className="w-full max-h-[360px] object-contain rounded-t-lg bg-black"
                    preload="metadata"
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right: Settings Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  Output Settings
                </CardTitle>
                <CardDescription>
                  Configure compression and format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Output Format */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Output Format</label>
                  <Select
                    value={outputFormat}
                    onValueChange={(v) => setOutputFormat(v as OutputFormat)}
                    disabled={isProcessing}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FORMAT_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <span className="font-medium">{opt.label}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {opt.desc}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Resolution */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Resolution</label>
                  <Select
                    value={resolution}
                    onValueChange={(v) => setResolution(v as Resolution)}
                    disabled={isProcessing}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RESOLUTION_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <span className="font-medium">{opt.label}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {opt.pixels}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quality / CRF */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quality (CRF)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.entries(QUALITY_MAP) as [Quality, (typeof QUALITY_MAP)[Quality]][]).map(
                      ([key, val]) => (
                        <button
                          key={key}
                          type="button"
                          disabled={isProcessing}
                          className={
                            "rounded-lg border p-2.5 text-left transition-colors " +
                            (quality === key
                              ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                              : "border-border hover:border-primary/30") +
                            (isProcessing ? " opacity-60" : "")
                          }
                          onClick={() => setQuality(key)}
                        >
                          <p className="text-sm font-medium">{val.label}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {"CRF " + val.crf + " - " + val.desc}
                          </p>
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Audio Toggle */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Audio</label>
                  <div className="flex gap-2">
                    <Button
                      variant={keepAudio ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      disabled={isProcessing || outputFormat === "gif"}
                      onClick={() => setKeepAudio(true)}
                    >
                      <Volume2 className="mr-1.5 h-3.5 w-3.5" />
                      Keep Audio
                    </Button>
                    <Button
                      variant={!keepAudio ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      disabled={isProcessing}
                      onClick={() => setKeepAudio(false)}
                    >
                      <VolumeX className="mr-1.5 h-3.5 w-3.5" />
                      Remove Audio
                    </Button>
                  </div>
                  {outputFormat === "gif" && (
                    <p className="text-xs text-muted-foreground">
                      GIF format does not support audio
                    </p>
                  )}
                </div>

                {/* Process Button */}
                <Button
                  className="w-full h-11"
                  onClick={processVideo}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {stage === "loading-ffmpeg" ? "Loading FFmpeg..." : "Processing..."}
                    </>
                  ) : isDone ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reprocess
                    </>
                  ) : (
                    <>
                      <Film className="mr-2 h-4 w-4" />
                      Compress &amp; Convert
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border-border/50">
              <CardContent className="py-4 space-y-2.5">
                <h3 className="text-sm font-semibold">Quick Tips</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-1.5">
                    <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    Lower CRF = higher quality, larger file
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    Reducing resolution saves the most space
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    WebM/VP9 is ~20-40% smaller than MP4/H.264
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    Removing audio saves 5-15% more space
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    First use loads ~32MB FFmpeg engine
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
