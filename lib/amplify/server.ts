import "server-only"

import { cookies } from "next/headers"
import { createServerRunner } from "@aws-amplify/adapter-nextjs"
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api"
import { getCurrentUser } from "aws-amplify/auth/server"
import outputs from "@/amplify_outputs.json"
import type { Schema } from "@/amplify/data/resource"

export const { runWithAmplifyServerContext } = createServerRunner({ config: outputs })

/**
 * Per-request, cookie-scoped client for the signed-in admin. Re-reads
 * cookies() on every call — do not replace with a module-scoped client,
 * that would risk bleeding one admin's session into a concurrent request.
 */
export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
  authMode: "userPool",
})

/**
 * Throws if no authenticated "Admin" session is present. Call this at the
 * top of every admin Server Action before mutating — the real enforcement
 * boundary is the allow.groups(['Admin']) rule on the Data model itself,
 * this is just a fast, clear failure before that round-trip.
 */
export async function requireAdmin() {
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec),
  })
  return user
}

export async function getIsAuthenticated() {
  try {
    await requireAdmin()
    return true
  } catch {
    return false
  }
}
