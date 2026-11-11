import { CLOSED_LABEL, openingHours } from "@/lib/content/opening-hours"

interface OpeningHoursProps {
  title: string
  /** "light" for normal backgrounds (contact), "dark" for the footer */
  tone?: "light" | "dark"
  className?: string
}

/** Opening hours: handwritten title, bold day names ("Dienstag bis Freitag"), stacked time ranges. */
export function OpeningHours({ title, tone = "light", className = "" }: OpeningHoursProps) {
  const dark = tone === "dark"
  const dayColor = dark ? "text-background" : "text-primary"
  const hoursColor = dark ? "text-background/80" : "text-foreground/80"

  return (
    <div className={`font-rounded ${className}`}>
      <h3
        className={`font-hand mb-4 text-3xl font-bold tracking-wide sm:mb-5 sm:text-4xl ${
          dark ? "text-background" : "text-foreground"
        }`}
      >
        {title}
      </h3>

      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 text-sm sm:gap-x-10 sm:text-base">
        {openingHours.map((row) => (
          <div key={row.from} className="contents">
            <dt className={`font-bold ${dayColor}`}>
              {row.from}
              {row.to && (
                <>
                  {" "}
                  <span className="font-normal">bis</span> {row.to}
                </>
              )}
            </dt>
            <dd className={`flex flex-col gap-1 font-semibold tabular-nums ${hoursColor}`}>
              {row.hours.map((range) => (
                <span key={range} className={range === CLOSED_LABEL ? "opacity-80" : undefined}>
                  {range}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
