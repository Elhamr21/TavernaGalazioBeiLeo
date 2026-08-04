// Both /login pages check the current session via cookies() (through the
// Amplify adapter, not a direct call Next's static analysis can see) —
// force dynamic so the build doesn't try to prerender them without a
// request context.
export const dynamic = "force-dynamic"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
