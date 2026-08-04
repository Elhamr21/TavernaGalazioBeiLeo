/** "+49 341 56113223" -> "tel:+4934156113223" */
export function toTelHref(displayPhone: string): string {
  return `tel:${displayPhone.replace(/[^+\d]/g, "")}`
}
