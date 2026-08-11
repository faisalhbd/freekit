"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { searchTools } from "@/lib/tool-engine"
import { getCategoryIconClasses } from "@/lib/icons"
import { DynamicIcon } from "@/components/shared/dynamic-icon"
import type { SearchResult } from "@/types"

interface SearchBarProps {
  className?: string
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escapedQuery})`, "gi")
  const parts = text.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-primary/15 text-foreground rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    )
  )
}

export function SearchBar({ className }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    const searchResults = searchTools(searchQuery, { limit: 8 })
    setResults(searchResults)
    setSelectedIndex(-1)
  }, [])

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value)
      setIsOpen(true)

      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => {
        performSearch(value)
      }, 200)
    },
    [performSearch]
  )

  const handleClear = useCallback(() => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }, [])

  const handleSelect = useCallback(
    (result: SearchResult) => {
      const href = `/tools/${result.tool.category}/${result.tool.slug}`
      setIsOpen(false)
      setQuery("")
      setResults([])
      router.push(href)
    },
    [router]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) {
        if (e.key === "Escape") {
          setIsOpen(false)
          inputRef.current?.blur()
        }
        return
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          )
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          )
          break
        case "Enter":
          e.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleSelect(results[selectedIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          inputRef.current?.blur()
          break
      }
    },
    [isOpen, results, selectedIndex, handleSelect]
  )

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex < 0) return

    const container = containerRef.current?.querySelector(
      '[data-slot="search-results"]'
    )
    if (!container) return

    const selected = container.children[selectedIndex] as HTMLElement | undefined
    if (selected) {
      selected.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  const showEmptyState = isOpen && query.trim().length === 0
  const showNoResults = isOpen && query.trim().length > 0 && results.length === 0
  const showResults = isOpen && results.length > 0

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim()) {
              setIsOpen(true)
            }
          }}
          placeholder="Search free tools..."
          className="pl-9 pr-9 h-10 bg-background"
          aria-label="Search tools"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          role="combobox"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {(showEmptyState || showNoResults || showResults) && (
        <div
          className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-lg border bg-popover shadow-lg overflow-hidden"
          role="listbox"
        >
          <div
            data-slot="search-results"
            className="max-h-96 overflow-y-auto"
          >
            {/* Empty state */}
            {showEmptyState && (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Start typing to search across all free tools
                </p>
              </div>
            )}

            {/* No results */}
            {showNoResults && (
              <div className="px-4 py-8 text-center">
                <Search className="size-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm font-medium text-foreground">
                  No results found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try different keywords or browse by category
                </p>
              </div>
            )}

            {/* Results list */}
            {showResults && (
              <ul className="p-1">
                {results.map((result, index) => {
                  const iconClasses = getCategoryIconClasses(result.tool.category)
                  const isSelected = index === selectedIndex

                  return (
                    <li key={result.tool.slug} role="option" aria-selected={isSelected}>
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent/50"
                        }`}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div
                          className={`flex items-center justify-center size-9 rounded-full shrink-0 ${iconClasses.bg} ${iconClasses.text}`}
                        >
                          <DynamicIcon name={result.tool.icon} className="size-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium truncate">
                              {highlightMatch(result.tool.title, query)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {result.tool.shortDescription}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full hidden sm:inline-block shrink-0 capitalize">
                          {result.tool.category}
                        </span>
                        <ArrowRight className="size-3.5 text-muted-foreground shrink-0" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-2">
            <p className="text-xs text-muted-foreground text-center">
              Search across all free tools
            </p>
          </div>
        </div>
      )}
    </div>
  )
}