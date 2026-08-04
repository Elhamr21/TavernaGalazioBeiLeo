"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPassword, confirmResetPassword } from "aws-amplify/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Spinner } from "@/components/ui/spinner"
import {
  forgotPasswordRequestSchema,
  forgotPasswordConfirmSchema,
  type ForgotPasswordRequestInput,
  type ForgotPasswordConfirmInput,
} from "@/lib/content/schemas"

export function ForgotPasswordForm() {
  const router = useRouter()
  const [step, setStep] = useState<"request" | "confirm" | "done">("request")
  const [email, setEmail] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const requestForm = useForm<ForgotPasswordRequestInput>({
    resolver: zodResolver(forgotPasswordRequestSchema),
    defaultValues: { email: "" },
  })

  const confirmForm = useForm<ForgotPasswordConfirmInput>({
    resolver: zodResolver(forgotPasswordConfirmSchema),
    defaultValues: { email: "", code: "", password: "", confirmPassword: "" },
  })

  async function onRequest(values: ForgotPasswordRequestInput) {
    setFormError(null)
    setIsSubmitting(true)
    try {
      await resetPassword({ username: values.email })
      setEmail(values.email)
      confirmForm.setValue("email", values.email)
      setStep("confirm")
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Anfrage fehlgeschlagen.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function onConfirm(values: ForgotPasswordConfirmInput) {
    setFormError(null)
    setIsSubmitting(true)
    try {
      await confirmResetPassword({
        username: values.email,
        confirmationCode: values.code,
        newPassword: values.password,
      })
      setStep("done")
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Zurücksetzen fehlgeschlagen.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === "done") {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Passwort geändert</CardTitle>
          <CardDescription>Sie können sich jetzt mit Ihrem neuen Passwort anmelden.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => router.push("/login")}>
            Zur Anmeldung
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (step === "confirm") {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Code eingeben</CardTitle>
          <CardDescription>Wir haben einen Bestätigungscode an {email} gesendet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...confirmForm}>
            <form onSubmit={confirmForm.handleSubmit(onConfirm)} className="space-y-4">
              <FormField
                control={confirmForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bestätigungscode</FormLabel>
                    <FormControl>
                      <Input autoComplete="one-time-code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={confirmForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Neues Passwort</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="new-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={confirmForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passwort bestätigen</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="new-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {formError && <p className="text-destructive text-sm">{formError}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Spinner className="size-4" /> : "Passwort zurücksetzen"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Passwort vergessen</CardTitle>
        <CardDescription>Geben Sie Ihre E-Mail-Adresse ein, um einen Bestätigungscode zu erhalten.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...requestForm}>
          <form onSubmit={requestForm.handleSubmit(onRequest)} className="space-y-4">
            <FormField
              control={requestForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formError && <p className="text-destructive text-sm">{formError}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Spinner className="size-4" /> : "Code senden"}
            </Button>
            <div className="text-center">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground underline">
                Zurück zur Anmeldung
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
