"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, confirmSignIn } from "aws-amplify/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Spinner } from "@/components/ui/spinner"
import { loginSchema, newPasswordSchema, type LoginInput, type NewPasswordInput } from "@/lib/content/schemas"

function friendlyAuthError(error: unknown): string {
  const name = error instanceof Error ? error.name : ""
  if (name === "NotAuthorizedException" || name === "UserNotFoundException") {
    return "E-Mail oder Passwort ist falsch."
  }
  if (name === "UserAlreadyAuthenticatedException") {
    return "Sie sind bereits angemeldet."
  }
  return error instanceof Error ? error.message : "Anmeldung fehlgeschlagen."
}

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/admin"

  const [step, setStep] = useState<"signIn" | "newPasswordRequired">("signIn")
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const signInForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const newPasswordForm = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  async function onSignIn(values: LoginInput) {
    setFormError(null)
    setIsSubmitting(true)
    try {
      const result = await signIn({ username: values.email, password: values.password })
      if (result.isSignedIn) {
        router.push(redirectTo)
        router.refresh()
        return
      }
      if (result.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED") {
        setStep("newPasswordRequired")
        return
      }
      setFormError("Weiterer Anmeldeschritt erforderlich. Bitte kontaktieren Sie den Administrator.")
    } catch (error) {
      setFormError(friendlyAuthError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function onSetNewPassword(values: NewPasswordInput) {
    setFormError(null)
    setIsSubmitting(true)
    try {
      const result = await confirmSignIn({ challengeResponse: values.password })
      if (result.isSignedIn) {
        router.push(redirectTo)
        router.refresh()
        return
      }
      setFormError("Weiterer Anmeldeschritt erforderlich. Bitte kontaktieren Sie den Administrator.")
    } catch (error) {
      setFormError(friendlyAuthError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === "newPasswordRequired") {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Neues Passwort festlegen</CardTitle>
          <CardDescription>Dies ist Ihre erste Anmeldung. Bitte legen Sie ein neues Passwort fest.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...newPasswordForm}>
            <form onSubmit={newPasswordForm.handleSubmit(onSetNewPassword)} className="space-y-4">
              <FormField
                control={newPasswordForm.control}
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
                control={newPasswordForm.control}
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
                {isSubmitting ? <Spinner className="size-4" /> : "Passwort speichern"}
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
        <CardTitle>Admin-Anmeldung</CardTitle>
        <CardDescription>Taverna Galazio bei Leo — Content-Management</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...signInForm}>
          <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
            <FormField
              control={signInForm.control}
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
            <FormField
              control={signInForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passwort</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formError && <p className="text-destructive text-sm">{formError}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Spinner className="size-4" /> : "Anmelden"}
            </Button>
            <div className="text-center">
              <Link href="/login/forgot-password" className="text-sm text-muted-foreground hover:text-foreground underline">
                Passwort vergessen?
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
