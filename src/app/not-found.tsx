import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, Search, FileText, Image, Code, Calculator } from 'lucide-react'
import { siteConfig } from '@/config/site'

const popularTools = [
  { title: 'Word Counter', href: '/tools/text/word-counter', icon: FileText },
  { title: 'Image Compressor', href: '/tools/image/image-compressor', icon: Image },
  { title: 'JSON Formatter', href: '/tools/developer/json-formatter', icon: Code },
  { title: 'Lorem Ipsum Generator', href: '/tools/text/lorem-ipsum-generator', icon: FileText },
  { title: 'Percentage Calculator', href: '/tools/calculator/percentage-calculator', icon: Calculator },
  { title: 'CSS Gradient Generator', href: '/tools/css/css-gradient-generator', icon: Code },
]

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
      <div className="space-y-4">
        <p className="text-7xl font-bold text-muted-foreground/30">404</p>
        <h1 className="text-3xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try one of our popular tools below, or head back to the homepage.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            <Search className="mr-2 h-4 w-4" />
            Search Tools
          </Link>
        </Button>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4">Popular Tools</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {popularTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.href} href={tool.href}>
                <Card className="transition-colors hover:bg-muted/50">
                  <CardContent className="flex items-center gap-3 p-4">
                    <Icon className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">{tool.title}</span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        {siteConfig.name} — {siteConfig.description}
      </p>
    </div>
  )
}
