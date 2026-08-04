import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getIsAuthenticated } from "@/lib/amplify/server"
import { LoginForm } from "@/components/admin/login-form"

export default async function LoginPage() {
  if (await getIsAuthenticated()) {
    redirect("/admin")
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  )
}
