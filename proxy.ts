import { NextRequest, NextResponse } from "next/server"
import { fetchAuthSession } from "aws-amplify/auth/server"
import { runWithAmplifyServerContext } from "@/lib/amplify/server"

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const isAuthenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec)
        return session.tokens !== undefined
      } catch {
        return false
      }
    },
  })

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}
