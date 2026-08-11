import { siteConfig } from "@/config/site"

export const APP_NAME = siteConfig.name
export const APP_DESCRIPTION = siteConfig.description
export const APP_URL = siteConfig.url

export const TOOL_ROUTE_PREFIX = "/tools"

export const MAX_CONTENT_WIDTH = "max-w-7xl" // 1280px

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 200,
  slow: 300,
}

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}