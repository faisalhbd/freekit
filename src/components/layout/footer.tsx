"use client"

import { useState } from "react"
import Link from "next/link"
import { Wrench, Twitter, Github, Heart } from "lucide-react"

import { siteConfig, FOOTER_COLUMNS } from "@/config/site"
import { getCategoriesWithTools } from "@/lib/tool-engine"
import { SupportModal } from "@/components/shared/support-modal"

const categoriesWithTools = getCategoriesWithTools()

// Override the Categories column with dynamic data that includes tool counts
const footerColumns = FOOTER_COLUMNS.map((col) => {
  if (col.title === "Categories") {
    return {
      title: col.title,
      links: categoriesWithTools.map((cat) => ({
        label: `${cat.category.name} (${cat.count})`,
        href: `/tools/${cat.category.slug}`,
      })),
    }
  }
  return col
})

const socialLinks = [
  { icon: Twitter, href: siteConfig.twitter, label: "Twitter" },
  { icon: Github, href: siteConfig.github, label: "GitHub" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [supportOpen, setSupportOpen] = useState(false)

  return (
    <footer className="mt-auto border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section: 4-column grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80"
            >
              <Wrench className="h-5 w-5 text-primary" />
              <span className="text-lg">FreeKit</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              100+ free online tools for developers, SEO professionals, and
              creators. Fast, private, and no sign-up required.
            </p>

            {/* Buy Me a Coffee — Footer */}
            <button
              onClick={() => setSupportOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-pink-500/20 bg-pink-500/5 px-4 py-2 text-sm font-medium text-pink-600 dark:text-pink-400 transition-colors hover:bg-pink-500/10"
            >
              <Heart className="size-3.5 fill-pink-500" />
              Buy Me a Coffee
            </button>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Dynamic Footer Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {siteConfig.links.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SupportModal open={supportOpen} onOpenChange={setSupportOpen} />
    </footer>
  )
}
