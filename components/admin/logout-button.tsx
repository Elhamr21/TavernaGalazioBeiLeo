"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "aws-amplify/auth"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleLogout() {
    setIsSigningOut(true)
    try {
      await signOut()
    } finally {
      router.push("/login")
      router.refresh()
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout} disabled={isSigningOut}>
      <LogOut className="h-4 w-4" />
      Abmelden
    </Button>
  )
}
