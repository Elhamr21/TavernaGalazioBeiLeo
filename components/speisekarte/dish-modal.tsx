"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { allergenInfo } from "@/lib/menu-data"
import { X } from "lucide-react"
import type { MenuItem } from "@/lib/menu-data"

interface DishModalProps {
  dish: MenuItem | null
  onClose: () => void
}

export function DishModal({ dish, onClose }: DishModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (dish) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "unset"
      }
    }
  }, [dish])

  // Handle ESC key
  useEffect(() => {
    if (!dish) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [dish, onClose])

  if (!dish) return null

  // Parse allergens string into array
  const allergens = dish.allergens ? dish.allergens.split("-").filter(Boolean) : []
  const allergenNames = allergens.map(code => allergenInfo[code as keyof typeof allergenInfo]).filter(Boolean)

  return (
    <Dialog open={!!dish} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 mb-2">
            <DialogTitle className="font-serif text-2xl text-foreground pr-4">
              {dish.name}
            </DialogTitle>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <DialogDescription className="text-accent font-medium uppercase text-xs tracking-wider">
            {dish.category}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {dish.description}
          </p>

          {/* Price */}
          <div className="pt-4 border-t border-border">
            <p className="font-serif text-3xl text-foreground font-semibold">
              {dish.price}
              <span className="text-lg text-muted-foreground ml-1">€</span>
            </p>
          </div>

          {/* Allergens */}
          {allergenNames.length > 0 && (
            <div className="pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Allergeninformationen
              </p>
              <div className="flex flex-wrap gap-2">
                {allergenNames.map((allergen, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="pt-4">
            <Button
              onClick={onClose}
              variant="default"
              className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Geschlossen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
