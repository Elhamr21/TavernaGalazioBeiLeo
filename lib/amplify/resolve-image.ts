import "server-only"

import { getUrl } from "aws-amplify/storage"
import "./client" // ensures Amplify.configure() has run before getUrl() is called

const IMAGE_URL_EXPIRES_IN_SECONDS = 3600

/**
 * Resolves an S3 storage path (e.g. "gallery/xyz.jpg") to a public,
 * presigned URL. Amplify Storage has no CloudFront/public bucket policy in
 * front of it by default, so getUrl() always returns a time-limited URL —
 * that's fine here since pages using this are short-revalidate (<= the
 * expiry above), never long-ISR'd or exported statically without refresh.
 *
 * Falls back to the given local /public asset path if no CMS path is set
 * (not yet replaced by an admin) or if the storage read fails for any
 * reason — the public site must never break over a missing/unreachable
 * image.
 */
export async function resolveImageUrl(
  path: string | null | undefined,
  fallbackPublicPath: string,
): Promise<string> {
  if (!path) return fallbackPublicPath

  try {
    const { url } = await getUrl({
      path,
      options: { expiresIn: IMAGE_URL_EXPIRES_IN_SECONDS },
    })
    return url.toString()
  } catch (error) {
    console.error(`resolveImageUrl: failed to resolve "${path}", using fallback`, error)
    return fallbackPublicPath
  }
}

/** Batch variant so callers don't chain N sequential round-trips. */
export async function resolveImageUrls(
  entries: Array<{ path: string | null | undefined; fallbackPublicPath: string }>,
): Promise<string[]> {
  return Promise.all(entries.map((entry) => resolveImageUrl(entry.path, entry.fallbackPublicPath)))
}
