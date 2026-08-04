import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/data"
import outputs from "@/amplify_outputs.json"
import type { Schema } from "@/amplify/data/resource"

Amplify.configure(outputs, { ssr: true })

/**
 * Public, unauthenticated reads only (guest Identity Pool role). Safe to
 * share as a single module-scoped instance across every request — there is
 * no per-user session attached to this credential, so nothing can leak
 * between concurrent requests.
 */
export const publicClient = generateClient<Schema>({ authMode: "identityPool" })
