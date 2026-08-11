import type { WebApplicationSchema, FAQSchema, BreadcrumbSchema } from "@/types"
import { generateToolSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/tool-engine"
import { toolConfig } from "./config"
import { faqs } from "./faq"

const TOOL_URL = "https://freekit.online/tools/pdf/jpg-to-pdf"

export function getSchemas(): (WebApplicationSchema | FAQSchema | BreadcrumbSchema)[] {
  const toolSchema = generateToolSchema(toolConfig)
  toolSchema.url = TOOL_URL
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "PDF & Document Tools", url: "/tools/pdf" },
    { name: toolConfig.title, url: `/tools/${toolConfig.category}/${toolConfig.slug}` },
  ])
  return [toolSchema, faqSchema, breadcrumbSchema]
}
