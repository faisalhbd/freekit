"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Heart, Copy, Check } from "lucide-react"

const paymentOptions = [
  {
    label: "Binance Pay",
    value: "402905217",
    icon: "₿",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500/20",
    description: "Send directly via Binance Pay",
  },
  {
    label: "BTC Wallet",
    value: "1E4MWkHrLdEoVDGqMr2vaWSwBqjBVSbZ6q",
    icon: "₿",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    borderColor: "border-orange-500/20",
    description: "Bitcoin network transfer",
  },
  {
    label: "USDT (TRC-20)",
    value: "TPJBGUa7aXSc83acAXm3wYT81xooQdVeKd",
    icon: "₮",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/20",
    description: "Tether on TRON network",
  },
]

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const textarea = document.createElement("textarea")
      textarea.value = value
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8 shrink-0"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Copy className="size-3.5 text-muted-foreground" />
      )}
    </Button>
  )
}

interface SupportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SupportModal({ open, onOpenChange }: SupportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Header accent */}
        <div className="h-1 bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-500" />

        <div className="p-6 sm:p-8 space-y-6">
          <DialogHeader className="space-y-3 text-center sm:text-left">
            <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 justify-center sm:justify-start">
              <Heart className="size-5 text-pink-500 fill-pink-500" />
              Buy Me a Coffee
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              FreeKit is completely free — no ads, no subscriptions, no monetization.
              But keeping it running requires paying server bills.
              If you find these tools helpful, consider supporting us with a small donation.
            </DialogDescription>
          </DialogHeader>

          {/* Payment Options */}
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <div
                key={option.label}
                className={`rounded-xl border ${option.borderColor} bg-card p-4 space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center size-7 rounded-lg text-sm font-bold ${option.color}`}
                    >
                      {option.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  <CopyButton value={option.value} />
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 truncate rounded-lg bg-muted px-3 py-2 text-xs font-mono text-foreground">
                    {option.value}
                  </code>
                </div>
              </div>
            ))}
          </div>

          {/* Thank you note */}
          <p className="text-center text-xs text-muted-foreground pt-2">
            Every donation, no matter how small, keeps FreeKit alive and free for everyone. Thank you! 🙏
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
