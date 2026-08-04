import { redirect } from "next/navigation"
import { getIsAuthenticated } from "@/lib/amplify/server"
import { ForgotPasswordForm } from "@/components/admin/forgot-password-form"

export default async function ForgotPasswordPage() {
  if (await getIsAuthenticated()) {
    redirect("/admin")
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <ForgotPasswordForm />
    </main>
  )
}
