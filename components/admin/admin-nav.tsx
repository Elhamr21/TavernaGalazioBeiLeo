"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ADMIN_NAV_ITEMS } from "@/lib/content/admin-nav"

export function AdminNav({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {ADMIN_NAV_ITEMS.map((item) => {
        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
