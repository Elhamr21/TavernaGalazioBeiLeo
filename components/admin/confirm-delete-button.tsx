"use client"

import { useState } from "react"
import { Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ConfirmDeleteButton({
  onConfirm,
  itemLabel,
}: {
  onConfirm: () => Promise<void>
  itemLabel: string
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleConfirm() {
    setIsDeleting(true)
    try {
      await onConfirm()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Löschen">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>„{itemLabel}“ löschen?</AlertDialogTitle>
          <AlertDialogDescription>
            Dies kann nicht rückgängig gemacht werden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Abbrechen</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isDeleting}>
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            Löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
