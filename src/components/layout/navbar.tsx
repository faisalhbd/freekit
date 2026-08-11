"use client"

import Link from "next/link"
import { useState } from "react"
import { Wrench, Menu, ChevronDown, ChevronRight, Heart } from "lucide-react"

import { NAV_LINKS } from "@/config/site"
import {
  getCategoriesWithTools,
  getPopularToolLinks,
} from "@/lib/tool-engine"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { SearchBar } from "@/components/shared/search-bar"
import { SupportModal } from "@/components/shared/support-modal"

const categoriesWithTools = getCategoriesWithTools()
const popularToolLinks = getPopularToolLinks(5)

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80"
        >
          <Wrench className="h-5 w-5 text-primary" />
          <span className="text-lg">FreeKit</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) =>
            link.label === "Tools" ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[280px]">
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {categoriesWithTools.map((cat) => (
                      <DropdownMenuSub key={cat.category.slug}>
                        <DropdownMenuSubTrigger className="flex items-center justify-between gap-4">
                          <span className="flex items-center gap-2">
                            <span
                              className="inline-block h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: cat.category.color }}
                            />
                            {cat.category.name}
                          </span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {cat.count}
                          </span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-[220px]">
                          <DropdownMenuLabel>{cat.category.name}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            {cat.tools.map((tool) => (
                              <DropdownMenuItem key={tool.slug} asChild>
                                <Link
                                  href={`/tools/${tool.category}/${tool.slug}`}
                                  className="flex items-center gap-2"
                                >
                                  <span className="truncate">{tool.title}</span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/tools/${cat.category.slug}`}
                              className="text-xs text-muted-foreground"
                            >
                              View All {cat.category.name} →
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button key={link.label} variant="ghost" size="sm" asChild>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              </Button>
            ),
          )}

          {/* Buy Me a Coffee — Desktop */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSupportOpen(true)}
            className="gap-1.5 text-muted-foreground hover:text-pink-500 hover:bg-pink-500/5"
          >
            <Heart className="size-3.5" />
            <span className="hidden lg:inline">Support</span>
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <SearchBar />
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <SheetHeader className="border-b border-border px-4 py-4">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <Wrench className="h-5 w-5 text-primary" />
                  FreeKit
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-65px)]">
                <div className="flex flex-col p-4">
                  {/* Nav Links */}
                  <div className="space-y-1">
                    {NAV_LINKS.filter((l) => l.label !== "Tools").map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* Categories with expandable tools */}
                  <div className="mt-6">
                    <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Categories
                    </h3>
                    <div className="space-y-1">
                      {categoriesWithTools.map((cat) => (
                        <Collapsible key={cat.category.slug}>
                          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                            <span className="flex items-center gap-2">
                              <span
                                className="inline-block h-2 w-2 rounded-full"
                                style={{ backgroundColor: cat.category.color }}
                              />
                              {cat.category.name}
                            </span>
                            <span className="flex items-center gap-2 text-xs text-muted-foreground">
                              {cat.count}
                              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]>&]:rotate-90" />
                            </span>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="ml-4 space-y-0.5 border-l border-border py-1 pl-3">
                              {cat.tools.map((tool) => (
                                <Link
                                  key={tool.slug}
                                  href={`/tools/${tool.category}/${tool.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                  {tool.title}
                                </Link>
                              ))}
                              <Link
                                href={`/tools/${cat.category.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-md px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-muted"
                              >
                                View All →
                              </Link>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  </div>

                  {/* Popular Tools */}
                  <div className="mt-6">
                    <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Popular Tools
                    </h3>
                    <div className="space-y-1">
                      {popularToolLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Support Button */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <button
                      onClick={() => {
                        setMobileOpen(false)
                        setSupportOpen(true)
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-pink-500/20 bg-pink-500/5 px-4 py-2.5 text-sm font-medium text-pink-600 dark:text-pink-400 transition-colors hover:bg-pink-500/10"
                    >
                      <Heart className="size-4 fill-pink-500" />
                      Buy Me a Coffee
                    </button>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <SupportModal open={supportOpen} onOpenChange={setSupportOpen} />
        </div>
      </nav>
    </header>
  )
}
