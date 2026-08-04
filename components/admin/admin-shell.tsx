"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/sonner"
import { AdminNav } from "@/components/admin/admin-nav"
import { LogoutButton } from "@/components/admin/logout-button"

export function AdminShell({ email, children }: { email: string | null; children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/30">
      <Toaster position="top-right" />
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 border-r bg-card">
        <div className="px-4 py-5 border-b">
          <Link href="/admin" className="font-serif text-lg font-semibold">
            Taverna Galazio
          </Link>
          <p className="text-xs text-muted-foreground">Content-Management</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <AdminNav />
        </div>
        <div className="p-3 border-t space-y-2">
          {email && <p className="text-xs text-muted-foreground truncate px-1">{email}</p>}
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b bg-card px-4 py-3">
        <Link href="/admin" className="font-serif text-lg font-semibold">
          Taverna Galazio
        </Link>
        <div className="flex items-center gap-2">
          <LogoutButton />
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <Button variant="outline" size="icon" onClick={() => setIsMobileNavOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="border-b px-4 py-4">
                <SheetTitle>Content-Management</SheetTitle>
              </SheetHeader>
              <div className="p-3">
                <AdminNav onNavigate={() => setIsMobileNavOpen(false)} />
              </div>
              {email && <p className="text-xs text-muted-foreground truncate px-4 pt-2">{email}</p>}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Content */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
