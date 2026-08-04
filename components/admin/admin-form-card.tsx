import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminFormCard({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
      {footer && <CardFooter className="justify-end gap-2 border-t">{footer}</CardFooter>}
    </Card>
  )
}
