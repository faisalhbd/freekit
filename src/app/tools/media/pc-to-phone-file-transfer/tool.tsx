"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import QRCode from "qrcode"
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
  MonitorSmartphone,
  Smartphone,
  Upload,
  Download,
  QrCode,
  Copy,
  Check,
  X,
  FileText,
  ImageIcon,
  Film,
  Music,
  Archive,
  Wifi,
  WifiOff,
  Send,
  RefreshCw,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react"
import { toast } from "sonner"

type Role = "idle" | "sender" | "receiver"
type ConnectionStatus =
  | "disconnected"
  | "connecting"
  | "waiting"
  | "connected"
  | "transferring"
  | "complete"
  | "error"

interface FileInfo {
  name: string
  size: number
  type: string
  file: File
  progress: number
  status: "pending" | "sending" | "sent" | "receiving" | "received" | "error"
}

const CHUNK_SIZE = 64 * 1024

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return ImageIcon
  if (type.startsWith("video/")) return Film
  if (type.startsWith("audio/")) return Music
  if (type.includes("zip") || type.includes("rar") || type.includes("tar")) return Archive
  return FileText
}

function generateRoomId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let result = ""
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
]

function getInitialUrlState(): { autoRoom: string | null; initialRole: Role; initialStatus: ConnectionStatus; initialInput: string } {
  if (typeof window === 'undefined') return { autoRoom: null, initialRole: 'idle' as Role, initialStatus: 'disconnected' as ConnectionStatus, initialInput: '' }
  const params = new URLSearchParams(window.location.search)
  const roomParam = params.get('room')
  const roleParam = params.get('role')
  if (roomParam && roleParam === 'receiver') {
    return { autoRoom: roomParam, initialRole: 'receiver' as Role, initialStatus: 'connecting' as ConnectionStatus, initialInput: roomParam }
  }
  return { autoRoom: null, initialRole: 'idle' as Role, initialStatus: 'disconnected' as ConnectionStatus, initialInput: '' }
}

export function PcToPhoneFileTransfer() {
  const [autoRoom] = useState(() => getInitialUrlState().autoRoom)
  const [role, setRole] = useState<Role>(() => getInitialUrlState().initialRole)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(() => getInitialUrlState().initialStatus)
  const [roomId, setRoomId] = useState(() => getInitialUrlState().autoRoom || "")
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("")
  const [inputRoomId, setInputRoomId] = useState(() => getInitialUrlState().initialInput)
  const [files, setFiles] = useState<FileInfo[]>([])
  const [copied, setCopied] = useState(false)
  const [totalProgress, setTotalProgress] = useState(0)
  const [transferSpeed, setTransferSpeed] = useState("")
  const [connectedPeers, setConnectedPeers] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  const pcRef = useRef<RTCPeerConnection | null>(null)
  const dcRef = useRef<RTCDataChannel | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const receivedChunksRef = useRef<Map<string, ArrayBuffer[]>>(new Map())
  const receivedMetaRef = useRef<Map<string, { name: string; size: number; type: string }>>(new Map())
  const startTimeRef = useRef<number>(0)
  const bytesTransferredRef = useRef<number>(0)

  const cleanup = useCallback(() => {
    if (dcRef.current) {
      dcRef.current.close()
      dcRef.current = null
    }
    if (pcRef.current) {
      pcRef.current.close()
      pcRef.current = null
    }
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    receivedChunksRef.current.clear()
    receivedMetaRef.current.clear()
    setConnectionStatus("disconnected")
    setConnectedPeers(0)
    setTransferSpeed("")
    setTotalProgress(0)
  }, [])

  // 1. setupDataChannel (no deps on other hooks)
  const setupDataChannel = useCallback(
    (channel: RTCDataChannel) => {
      dcRef.current = channel

      channel.onopen = () => {
        setConnectionStatus("connected")
        toast.success("Connected! You can now transfer files.")
      }

      channel.onclose = () => {
        setConnectionStatus("disconnected")
      }

      channel.onmessage = async (event) => {
        if (typeof event.data === "string") {
          try {
            const msg = JSON.parse(event.data)
            if (msg.type === "file-start") {
              receivedChunksRef.current.set(msg.id, [])
              receivedMetaRef.current.set(msg.id, {
                name: msg.name,
                size: msg.size,
                type: msg.type,
              })
              setFiles((prev) => [
                ...prev,
                {
                  name: msg.name,
                  size: msg.size,
                  type: msg.type,
                  file: null as unknown as File,
                  progress: 0,
                  status: "receiving",
                },
              ])
              setConnectionStatus("transferring")
              startTimeRef.current = Date.now()
              bytesTransferredRef.current = 0
            } else if (msg.type === "file-end") {
              const chunks = receivedChunksRef.current.get(msg.id) || []
              const meta = receivedMetaRef.current.get(msg.id)
              if (meta && chunks.length > 0) {
                const blob = new Blob(chunks, { type: meta.type })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = meta.name
                a.click()
                URL.revokeObjectURL(url)
                setFiles((prev) =>
                  prev.map((f) =>
                    f.name === meta.name ? { ...f, status: "received", progress: 100 } : f
                  )
                )
              }
              receivedChunksRef.current.delete(msg.id)
              receivedMetaRef.current.delete(msg.id)
            } else if (msg.type === "all-done") {
              setConnectionStatus("complete")
              setTransferSpeed("")
              toast.success("All files transferred successfully!")
            }
          } catch {
            // ignore non-JSON strings
          }
        } else {
          const arrayBuf = event.data as ArrayBuffer
          bytesTransferredRef.current += arrayBuf.byteLength
          const elapsed = (Date.now() - startTimeRef.current) / 1000
          if (elapsed > 0) {
            const speed = bytesTransferredRef.current / elapsed
            setTransferSpeed(formatBytes(speed) + "/s")
          }
          const receivingFiles = Object.entries(receivedMetaRef.current)
          if (receivingFiles.length > 0) {
            const [id, meta] = receivingFiles[receivingFiles.length - 1]
            const chunks = receivedChunksRef.current.get(id) || []
            chunks.push(arrayBuf)
            receivedChunksRef.current.set(id, chunks)
            const progress = Math.min(
              100,
              Math.round((bytesTransferredRef.current / (meta.size || 1)) * 100)
            )
            setFiles((prev) =>
              prev.map((f) =>
                f.name === meta.name && f.status === "receiving"
                  ? { ...f, progress }
                  : f
              )
            )
          }
        }
      }
    },
    []
  )

  // 2. createOffer (depends on setupDataChannel)
  const createOffer = useCallback(
    async (room: string) => {
      if (!wsRef.current) return

      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS })
      pcRef.current = pc
      setConnectionStatus("connecting")

      const dc = pc.createDataChannel("file-transfer", { ordered: true })
      setupDataChannel(dc)

      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      pc.onicecandidate = (event) => {
        if (event.candidate === null) {
          wsRef.current?.send(
            JSON.stringify({
              type: "signal",
              room,
              payload: { sdp: pc.localDescription },
            })
          )
        }
      }
    },
    [setupDataChannel]
  )

  // 3. handleSignal (depends on setupDataChannel)
  const handleSignal = useCallback(
    async (payload: any, isSender: boolean, currentRoom: string) => {
      if (payload.sdp?.type === "offer" && !isSender) {
        const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS })
        pcRef.current = pc
        setConnectionStatus("connecting")

        pc.ondatachannel = (event) => {
          setupDataChannel(event.channel)
        }

        await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp))
        const answer = await pc.createAnswer()
        await pc.setLocalDescription(answer)

        pc.onicecandidate = (event) => {
          if (event.candidate === null && wsRef.current) {
            wsRef.current.send(
              JSON.stringify({
                type: "signal",
                room: currentRoom,
                payload: { sdp: pc.localDescription },
              })
            )
          }
        }
      } else if (payload.sdp?.type === "answer" && isSender) {
        await pcRef.current?.setRemoteDescription(
          new RTCSessionDescription(payload.sdp)
        )
      }
    },
    [setupDataChannel]
  )

  // 4. connectSignaling (depends on createOffer, handleSignal)
  const connectSignaling = useCallback(
    (room: string, isSender: boolean) => {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
      const ws = new WebSocket(`${protocol}//${window.location.host}/?XTransformPort=3003`)
      wsRef.current = ws

      ws.onopen = () => {
        ws.send(JSON.stringify({ type: "join", room }))
      }

      ws.onmessage = async (event) => {
        const msg = JSON.parse(event.data)

        if (msg.type === "joined") {
          setConnectedPeers(msg.peerCount)
          if (isSender && msg.peerCount >= 1) {
            createOffer(room)
          } else if (!isSender && msg.peerCount >= 2) {
            setConnectionStatus("waiting")
          }
        }

        if (msg.type === "peer-joined") {
          setConnectedPeers(msg.peerCount)
          if (isSender) {
            createOffer(room)
          } else {
            setConnectionStatus("waiting")
          }
        }

        if (msg.type === "signal") {
          handleSignal(msg.payload, isSender, room)
        }

        if (msg.type === "peer-left") {
          setConnectedPeers(msg.peerCount)
          if (msg.peerCount < 2) {
            setConnectionStatus("disconnected")
            toast.info("Peer disconnected")
          }
        }
      }

      ws.onerror = () => {
        setErrorMessage("Failed to connect to signaling server")
        setConnectionStatus("error")
      }
    },
    [createOffer, handleSignal]
  )

  // 5. startAsSender (depends on connectSignaling)
  const startAsSender = useCallback(async () => {
    const id = generateRoomId()
    setRoomId(id)
    setRole("sender")
    setConnectionStatus("connecting")

    const url = `${window.location.origin}/tools/media/pc-to-phone-file-transfer?room=${id}&role=receiver`
    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 280,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      })
      setQrCodeDataUrl(qrDataUrl)
    } catch {
      toast.error("Failed to generate QR code")
    }

    connectSignaling(id, true)
  }, [connectSignaling])

  // 6. startAsReceiver (depends on connectSignaling, inputRoomId)
  const startAsReceiver = useCallback(() => {
    if (!inputRoomId.trim()) {
      toast.error("Please enter a room code")
      return
    }
    const id = inputRoomId.trim().toUpperCase()
    setRoomId(id)
    setRole("receiver")
    setConnectionStatus("connecting")
    connectSignaling(id, false)
  }, [inputRoomId, connectSignaling])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files
    if (!selected || selected.length === 0) return
    const newFiles: FileInfo[] = Array.from(selected).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
      progress: 0,
      status: "pending",
    }))
    setFiles((prev) => [...prev, ...newFiles])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const sendFiles = useCallback(async () => {
    const channel = dcRef.current
    if (!channel || channel.readyState !== "open") {
      toast.error("Not connected. Please wait for the peer to join.")
      return
    }

    const pendingFiles = files.filter((f) => f.status === "pending")
    if (pendingFiles.length === 0) {
      toast.error("No files to send. Please select files first.")
      return
    }

    setConnectionStatus("transferring")
    startTimeRef.current = Date.now()
    bytesTransferredRef.current = 0
    let transferredBytes = 0
    const totalBytes = pendingFiles.reduce((s, f) => s + f.size, 0)

    for (const fileInfo of pendingFiles) {
      const fileId = Math.random().toString(36).substring(2, 10)

      channel.send(
        JSON.stringify({
          type: "file-start",
          id: fileId,
          name: fileInfo.name,
          size: fileInfo.size,
          type: fileInfo.type,
        })
      )

      setFiles((prev) =>
        prev.map((f) =>
          f.name === fileInfo.name ? { ...f, status: "sending" } : f
        )
      )

      const buffer = await fileInfo.file.arrayBuffer()
      let offset = 0

      while (offset < buffer.byteLength) {
        if (channel.bufferedAmount > 65536 * 16) {
          await new Promise<void>((resolve) => {
            const check = () => {
              if (channel.bufferedAmount <= 65536 * 8) resolve()
              else setTimeout(check, 10)
            }
            check()
          })
        }

        const end = Math.min(offset + CHUNK_SIZE, buffer.byteLength)
        const chunk = buffer.slice(offset, end)
        channel.send(chunk)

        offset = end
        transferredBytes += chunk.byteLength
        bytesTransferredRef.current = transferredBytes

        const fileProgress = Math.round((offset / buffer.byteLength) * 100)
        const overallProgress = Math.round((transferredBytes / totalBytes) * 100)

        setFiles((prev) =>
          prev.map((f) =>
            f.name === fileInfo.name ? { ...f, progress: fileProgress } : f
          )
        )
        setTotalProgress(overallProgress)

        const elapsed = (Date.now() - startTimeRef.current) / 1000
        if (elapsed > 0) {
          const speed = transferredBytes / elapsed
          setTransferSpeed(formatBytes(speed) + "/s")
        }
      }

      channel.send(JSON.stringify({ type: "file-end", id: fileId }))
      setFiles((prev) =>
        prev.map((f) =>
          f.name === fileInfo.name ? { ...f, status: "sent" } : f
        )
      )
    }

    channel.send(JSON.stringify({ type: "all-done" }))
    setConnectionStatus("complete")
    setTransferSpeed("")
    toast.success("All files sent successfully!")
  }, [files])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files
    if (dropped.length > 0) {
      const newFiles: FileInfo[] = Array.from(dropped).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        progress: 0,
        status: "pending",
      }))
      setFiles((prev) => [...prev, ...newFiles])
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const copyRoomId = useCallback(() => {
    navigator.clipboard.writeText(roomId)
    setCopied(true)
    toast.success("Room code copied!")
    setTimeout(() => setCopied(false), 2000)
  }, [roomId])

  const resetAll = useCallback(() => {
    cleanup()
    setRole("idle")
    setRoomId("")
    setQrCodeDataUrl("")
    setFiles([])
    setTotalProgress(0)
    setErrorMessage("")
  }, [cleanup])

  // Auto-join as receiver if URL has room param
  useEffect(() => {
    if (autoRoom) {
      connectSignaling(autoRoom, false)
    }
  }, [autoRoom, connectSignaling])

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup()
  }, [cleanup])

  // ─── Render ──────────────────────────────────────────────────────────

  if (role === "idle") {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            className="group cursor-pointer border-2 border-dashed transition-all hover:border-primary/50 hover:shadow-lg"
            onClick={startAsSender}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <MonitorSmartphone className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg">Send Files</CardTitle>
              <CardDescription>From this device to another</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Select files on this device and generate a QR code for the
                receiving device to scan.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                <MonitorSmartphone className="h-3.5 w-3.5" />
                From this device
                <ChevronRight className="h-3.5 w-3.5" />
                <Smartphone className="h-3.5 w-3.5" />
                To other device
              </div>
            </CardContent>
          </Card>

          <Card
            className="group cursor-pointer border-2 border-dashed transition-all hover:border-primary/50 hover:shadow-lg"
            onClick={() => setRole("receiver")}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110">
                <Download className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg">Receive Files</CardTitle>
              <CardDescription>On this device from another</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Enter the room code shown on the sending device to receive files.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <MonitorSmartphone className="h-3.5 w-3.5" />
                From other device
                <ChevronRight className="h-3.5 w-3.5" />
                <Smartphone className="h-3.5 w-3.5" />
                To this device
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50">
          <CardContent className="flex flex-wrap items-center justify-center gap-6 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              End-to-end encrypted
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wifi className="h-4 w-4 text-emerald-500" />
              No cloud upload
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-emerald-500" />
              P2P direct transfer
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <QrCode className="h-4 w-4 text-emerald-500" />
              No app install
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Receiver: Enter room code
  if (role === "receiver" && connectionStatus === "connecting" && !roomId) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Download className="h-7 w-7" />
          </div>
          <CardTitle>Receive Files</CardTitle>
          <CardDescription>
            Enter the 6-character room code shown on the sending device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              className="flex h-12 w-full rounded-lg border border-input bg-background px-4 text-center text-xl font-mono tracking-[0.3em] uppercase outline-none ring-ring focus:ring-2 focus:ring-offset-2"
              placeholder="ABC123"
              maxLength={6}
              value={inputRoomId}
              onChange={(e) =>
                setInputRoomId(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
              }
              onKeyDown={(e) => e.key === "Enter" && startAsReceiver()}
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => {
                setRole("idle")
                setInputRoomId("")
              }}
            >
              Back
            </Button>
            <Button
              className="flex-1"
              onClick={startAsReceiver}
              disabled={inputRoomId.length < 4}
            >
              <Wifi className="mr-2 h-4 w-4" />
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Active session
  const totalSize = files.reduce((sum, f) => sum + f.size, 0)
  const statusColor =
    connectionStatus === "connected" || connectionStatus === "complete"
      ? "text-emerald-600 dark:text-emerald-400"
      : connectionStatus === "transferring"
        ? "text-amber-600 dark:text-amber-400"
        : connectionStatus === "error"
          ? "text-red-600 dark:text-red-400"
          : "text-muted-foreground"

  const StatusIcon =
    connectionStatus === "connected" || connectionStatus === "complete"
      ? Wifi
      : connectionStatus === "transferring"
        ? Send
        : connectionStatus === "error"
          ? WifiOff
          : RefreshCw

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <Badge
              variant={
                connectionStatus === "connected" || connectionStatus === "complete"
                  ? "default"
                  : connectionStatus === "error"
                    ? "destructive"
                    : "secondary"
              }
              className="gap-1.5"
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
            </Badge>
            {transferSpeed && (
              <span className="text-sm font-mono text-muted-foreground">
                {transferSpeed}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-md border px-2.5 py-1">
              <span className="text-xs text-muted-foreground">Room:</span>
              <span className="font-mono text-sm font-bold tracking-wider">{roomId}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyRoomId}>
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={resetAll}>
              <X className="mr-1.5 h-4 w-4" />
              End
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-4">
          {role === "sender" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Scan to Connect
                </CardTitle>
                <CardDescription>
                  Scan this QR code with your phone camera to receive files
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                {qrCodeDataUrl ? (
                  <>
                    <div className="rounded-xl border-2 border-border p-3 bg-white">
                      <img
                        src={qrCodeDataUrl}
                        alt="QR Code - Scan with phone"
                        className="h-56 w-56"
                      />
                    </div>
                    <p className={`text-sm font-medium ${statusColor}`}>
                      {connectionStatus === "connected"
                        ? "Connected — select files to send"
                        : connectionStatus === "waiting"
                          ? "Waiting for peer to scan..."
                          : connectionStatus === "connecting"
                            ? "Establishing connection..."
                            : "Generate QR code to start"}
                    </p>
                  </>
                ) : (
                  <div className="flex h-56 w-56 items-center justify-center rounded-xl border-2 border-dashed border-border">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {role === "receiver" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Wifi className={`h-5 w-5 ${statusColor}`} />
                  Connection Status
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 py-8">
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full ${
                    connectionStatus === "connected" || connectionStatus === "complete"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : connectionStatus === "error"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-amber-500/10 text-amber-500"
                  }`}
                >
                  <StatusIcon className="h-10 w-10" />
                </div>
                <div className="text-center">
                  <p className={`text-sm font-medium ${statusColor}`}>
                    {connectionStatus === "connected"
                      ? "Connected to sender"
                      : connectionStatus === "transferring"
                        ? "Receiving files..."
                        : connectionStatus === "complete"
                          ? "Transfer complete!"
                          : connectionStatus === "error"
                            ? errorMessage || "Connection error"
                            : "Waiting for sender..."}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Room: {roomId} | Peer: {connectedPeers}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-border/50">
            <CardContent className="py-4">
              <h3 className="text-sm font-semibold mb-3">How it works</h3>
              <ol className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    1
                  </span>
                  <span>
                    <strong className="text-foreground">Sender</strong> clicks &quot;Send Files&quot; and a QR code appears
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    2
                  </span>
                  <span>
                    <strong className="text-foreground">Receiver</strong> scans the QR code (or enters the room code)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    3
                  </span>
                  <span>
                    A <strong className="text-foreground">direct P2P connection</strong> is established via WebRTC
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    4
                  </span>
                  <span>
                    <strong className="text-foreground">Files transfer</strong> directly — no server involved
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {role === "sender" && (
            <>
              <div
                className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors ${
                  connectionStatus === "connected" || files.length > 0
                    ? "border-primary/30 hover:border-primary/50"
                    : "border-muted-foreground/25 opacity-60"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() =>
                  connectionStatus === "connected" && fileInputRef.current?.click()
                }
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">Drop files here or click to browse</p>
                <p className="mt-1 text-xs text-muted-foreground">Any file type supported</p>
              </div>

              {files.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Files ({files.length})</CardTitle>
                      <span className="text-xs text-muted-foreground">
                        Total: {formatBytes(totalSize)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                    {files.map((file, index) => {
                      const FileIcon = getFileIcon(file.type)
                      return (
                        <div key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-lg border p-2.5">
                          <FileIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{file.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                              {file.status !== "pending" && (
                                <span
                                  className={`text-xs ${
                                    file.status === "sent" || file.status === "received"
                                      ? "text-emerald-600 dark:text-emerald-400"
                                      : file.status === "error"
                                        ? "text-red-600"
                                        : "text-amber-600"
                                  }`}
                                >
                                  {file.status === "sending"
                                    ? "Sending..."
                                    : file.status === "sent"
                                      ? "Sent"
                                      : file.status === "receiving"
                                        ? "Receiving..."
                                        : file.status === "received"
                                          ? "Received"
                                          : "Error"}
                                </span>
                              )}
                            </div>
                            {file.progress > 0 && file.progress < 100 && (
                              <Progress value={file.progress} className="mt-1.5 h-1.5" />
                            )}
                          </div>
                          {role === "sender" &&
                            (file.status === "pending" || file.status === "sent") && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeFile(index)
                                }}
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            )}
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}

              {(connectionStatus === "transferring" || connectionStatus === "complete") && (
                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm font-mono text-muted-foreground">{totalProgress}%</span>
                    </div>
                    <Progress value={totalProgress} className="h-2.5" />
                    {transferSpeed && (
                      <p className="mt-2 text-xs text-center text-muted-foreground">{transferSpeed}</p>
                    )}
                  </CardContent>
                </Card>
              )}

              {files.length > 0 && (
                <Button
                  className="w-full h-12 text-base"
                  size="lg"
                  onClick={sendFiles}
                  disabled={
                    connectionStatus !== "connected" ||
                    files.every((f) => f.status === "sent" || f.status === "sending")
                  }
                >
                  <Send className="mr-2 h-5 w-5" />
                  {connectionStatus !== "connected"
                    ? "Waiting for connection..."
                    : connectionStatus === "complete"
                      ? "Send Again"
                      : `Send ${files.filter((f) => f.status === "pending").length} File${files.filter((f) => f.status === "pending").length !== 1 ? "s" : ""}`}
                </Button>
              )}
            </>
          )}

          {role === "receiver" && (
            <>
              {files.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Received Files ({files.length})</CardTitle>
                      <span className="text-xs text-muted-foreground">
                        {formatBytes(files.reduce((s, f) => s + f.size, 0))}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                    {files.map((file, index) => {
                      const FileIcon = getFileIcon(file.type)
                      return (
                        <div key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-lg border p-2.5">
                          <FileIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{file.name}</p>
                            <span className="text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                            {file.progress > 0 && file.progress < 100 && (
                              <Progress value={file.progress} className="mt-1.5 h-1.5" />
                            )}
                          </div>
                          <Badge
                            variant={
                              file.status === "received" ? "default" : file.status === "error" ? "destructive" : "secondary"
                            }
                            className="text-xs"
                          >
                            {file.status === "received" ? "Done" : file.status === "receiving" ? `${file.progress}%` : file.status}
                          </Badge>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}

              {files.length === 0 && (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Download className="h-12 w-12 text-muted-foreground/40" />
                    <p className="mt-3 text-sm text-muted-foreground">Waiting for files...</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Files will appear here and download automatically</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
