import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FormActions({
  isSubmitting,
  isDirty,
  onCancel,
}: {
  isSubmitting: boolean
  isDirty: boolean
  onCancel: () => void
}) {
  return (
    <>
      <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting || !isDirty}>
        Abbrechen
      </Button>
      <Button type="submit" disabled={isSubmitting || !isDirty}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Speichern
      </Button>
    </>
  )
}
