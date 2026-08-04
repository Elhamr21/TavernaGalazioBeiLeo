import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/amplify/server"
import { AdminShell } from "@/components/admin/admin-shell"

// Every /admin route reads the signed-in user's cookies via the Amplify
// adapter — but that cookies() call happens inside the adapter, not
// directly in this Server Component, so Next's static-analysis can't see
// it and would otherwise try (and fail) to prerender these pages at build
// time with no request context. Force dynamic explicitly.
export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin().catch(() => null)

  // Defense in depth — proxy.ts already redirects unauthenticated requests
  // away from /admin, this is the same check re-run inside the render path.
  if (!user) {
    redirect("/login")
  }

  const email = user.signInDetails?.loginId ?? user.username ?? null

  return <AdminShell email={email}>{children}</AdminShell>
}
