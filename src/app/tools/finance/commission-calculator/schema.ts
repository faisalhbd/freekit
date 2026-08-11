import type { WebApplicationSchema, FAQSchema, BreadcrumbSchema } from "@/types"
import { generateToolSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/tool-engine"
import { toolConfig } from "./config"
import { faqs } from "./faq"

const TOOL_URL = "https://freekit.online/tools/finance/commission-calculator"

export function getSchemas(): (WebApplicationSchema | FAQSchema | BreadcrumbSchema)[] {
  const toolSchema = generateToolSchema(toolConfig)
  toolSchema.url = TOOL_URL

  const faqSchema = generateFAQSchema(faqs)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Finance Calculators", url: "/tools/finance" },
    { name: toolConfig.title, url: `/tools/${toolConfig.category}/${toolConfig.slug}` },
  ])

  return [toolSchema, faqSchema, breadcrumbSchema]
}
