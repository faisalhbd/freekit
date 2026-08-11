"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const themes = ["light", "dark", "system"] as const
const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const
const themeLabels = {
  light: "Light",
  dark: "Dark",
  system: "System",
} as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  function cycleTheme() {
    const currentIndex = themes.indexOf((theme ?? "system") as (typeof themes)[number])
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const resolvedTheme = (theme ?? "system") as keyof typeof themeIcons
  const Icon = themeIcons[resolvedTheme]
  const label = themeLabels[resolvedTheme]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            aria-label="Toggle theme"
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}