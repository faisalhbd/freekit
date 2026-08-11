import { Fragment } from "react"
import Link from "next/link"
import { Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { BreadcrumbItem as BreadcrumbItemType } from "@/types"

interface BreadcrumbNavProps {
  items: BreadcrumbItemType[]
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  if (items.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isHome = item.label === "Home"
          const icon = isHome ? <Home className="size-3.5" /> : null

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center gap-1.5">
                    {icon}
                    <span>{item.label}</span>
                  </BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="flex items-center gap-1.5">
                      {icon}
                      <span>{item.label}</span>
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    {icon}
                    <span>{item.label}</span>
                  </span>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
