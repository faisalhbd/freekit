"use client"

import { createElement } from "react"
import { getIconComponent } from "@/lib/icons"

interface DynamicIconProps {
  name: string
  className?: string
}

/**
 * Client component that renders a Lucide icon by name string.
 * Uses createElement to avoid ESLint react-hooks/static-components rule
 * which flags JSX tags with dynamically resolved component types.
 */
export function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = getIconComponent(name)
  return createElement(Icon, { className })
}