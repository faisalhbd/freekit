import type { Metadata } from "next"
import type { ToolConfig } from "@/types"
import { siteConfig } from "@/config/site"

export function generateToolMetadata(tool: ToolConfig): Metadata {
  const toolUrl = `/tools/${tool.category}/${tool.slug}`
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: `${siteConfig.url}${toolUrl}`,
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: tool.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
      images: ["/og-image.png"],
    },
    // Relative canonical — metadataBase in layout.tsx resolves it.
    alternates: {
      canonical: toolUrl,
    },
  }
}
