// Opening hours stay hardcoded per the CMS content rules (not admin-managed).
// Single source for the contact section and footer (see components/opening-hours.tsx).
export const CLOSED_LABEL = "Geschlossen"

export type OpeningHoursRow = {
  /** First (or only) day of the range */
  from: string
  /** Last day of the range, if it covers several days */
  to?: string
  /** One entry per time range, shown stacked */
  hours: string[]
}

export const openingHours: OpeningHoursRow[] = [
  { from: "Montag", hours: [CLOSED_LABEL] },
  { from: "Dienstag", to: "Freitag", hours: ["17:00 - 23:00"] },
  { from: "Samstag", to: "Sonntag", hours: ["11:30 - 14:30", "17:00 - 23:00"] },
]
