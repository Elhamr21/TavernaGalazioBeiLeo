"use client"

import { Amplify } from "aws-amplify"
import outputs from "@/amplify_outputs.json"

Amplify.configure(outputs, { ssr: true })

/**
 * No-op component whose only job is to run the Amplify.configure() call
 * above inside the browser bundle. Mounted once in the root layout so every
 * client component (login form, admin image upload, etc.) can call
 * aws-amplify/auth and aws-amplify/storage functions without each having to
 * remember to configure Amplify itself first.
 */
export function ConfigureAmplifyClientSide() {
  return null
}
