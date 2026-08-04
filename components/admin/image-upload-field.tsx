"use client"

import { useEffect, useRef, useState } from "react"
import { uploadData, remove, getUrl } from "aws-amplify/storage"
import { ImageOff, Loader2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

interface ImageUploadFieldProps {
  label: string
  /** Current S3 storage path (e.g. "gallery/xyz.jpg"), or null if unset. */
  value: string | null | undefined
  onChange: (path: string | null) => void
  /** Storage path prefix this field is allowed to write to, e.g. "gallery/". */
  pathPrefix: string
  /**
   * Server-resolved URL for the current value, used until a new file is
   * picked. Optional — when omitted (e.g. inside a per-row list editor
   * where resolving every row's URL server-side isn't worth the round
   * trip), the field resolves `value` itself client-side.
   */
  previewUrl?: string | null
  className?: string
}

export function ImageUploadField({ label, value, onChange, pathPrefix, previewUrl, className }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [localPreview, setLocalPreview] = useState<string | null>(null)
  // Tracks which `value` the resolved URL belongs to, so a stale resolution
  // from a previous value is never shown — checked at read time below
  // instead of reset via a separate synchronous setState in the effect.
  const [selfResolvedPreview, setSelfResolvedPreview] = useState<{ forValue: string; url: string } | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (previewUrl !== undefined || !value) return
    let cancelled = false
    getUrl({ path: value })
      .then(({ url }) => {
        if (!cancelled) setSelfResolvedPreview({ forValue: value, url: url.toString() })
      })
      .catch(() => {
        // Leave any previous resolution in place; the `forValue` check below keeps it from being shown for the wrong value.
      })
    return () => {
      cancelled = true
    }
  }, [value, previewUrl])

  const resolvedPreviewUrl = selfResolvedPreview && selfResolvedPreview.forValue === value ? selfResolvedPreview.url : null
  const displayUrl = localPreview ?? previewUrl ?? resolvedPreviewUrl ?? null

  async function handleFileSelected(file: File) {
    setError(null)

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Nur JPG, PNG oder WEBP erlaubt.")
      return
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError("Datei ist größer als 10MB.")
      return
    }

    setLocalPreview(URL.createObjectURL(file))
    setIsUploading(true)
    try {
      const extension = file.name.split(".").pop() || "jpg"
      const path = `${pathPrefix}${crypto.randomUUID()}.${extension}`
      await uploadData({ path, data: file, options: { contentType: file.type } }).result

      if (value) {
        await remove({ path: value }).catch(() => {
          // Old object may already be gone — not fatal, the new upload already succeeded.
        })
      }

      onChange(path)
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload fehlgeschlagen.")
      setLocalPreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  async function handleRemove() {
    setError(null)
    if (value) {
      try {
        await remove({ path: value })
      } catch {
        // Continue clearing the field even if the S3 object was already gone.
      }
    }
    setLocalPreview(null)
    onChange(null)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
          {displayUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={displayUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageOff className="h-6 w-6" />
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) void handleFileSelected(file)
              event.target.value = ""
            }}
          />
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={isUploading}>
            <Upload className="h-4 w-4" />
            Bild hochladen
          </Button>
          {displayUrl && (
            <Button type="button" variant="ghost" size="sm" onClick={handleRemove} disabled={isUploading}>
              <X className="h-4 w-4" />
              Entfernen
            </Button>
          )}
          <p className="text-xs text-muted-foreground">JPG, PNG oder WEBP, max. 10MB</p>
        </div>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}
