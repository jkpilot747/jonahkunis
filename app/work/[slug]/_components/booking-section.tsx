import type { ProjectBooking } from "@/lib/projects";

// Renders after the image stack on Graduation only — see "This page
// ends with booking" in docs/content-plan.md. Plain list/table styling per
// docs/design-brief.md's hard rules: no pricing cards, no borders around
// content, no "most popular" treatment.
export function BookingSection({ booking }: { booking: ProjectBooking }) {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-title font-bold tracking-title">
          Packages &amp; pricing
        </h2>
        <div className="flex flex-col">
          {booking.packages.map((pkg, i) => (
            <div
              key={i}
              className={`flex items-baseline gap-4 py-3 ${
                i > 0 ? "border-t border-hairline" : ""
              }`}
            >
              <span className="font-mono text-metadata tracking-metadata text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 items-baseline justify-between gap-4">
                <div>
                  <p className="text-body tracking-body">{pkg.name}</p>
                  {pkg.detail && (
                    <p className="font-mono text-metadata tracking-metadata text-muted">
                      {pkg.detail}
                    </p>
                  )}
                </div>
                <p className="whitespace-nowrap font-mono text-metadata tracking-metadata text-muted">
                  {pkg.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {booking.testimonials.map((t, i) => (
          <div key={i} className="flex flex-col gap-1">
            <p className="text-body tracking-body">&ldquo;{t.quote}&rdquo;</p>
            <p className="font-mono text-metadata tracking-metadata text-muted">
              {t.attribution}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-title font-bold tracking-title">FAQ</h2>
        <div className="flex flex-col gap-3">
          {booking.faq.map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="font-mono text-metadata tracking-metadata text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-body font-bold tracking-body">{item.q}</p>
                <p className="text-body tracking-body">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href={booking.formHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-huge font-bold leading-none tracking-wordmark text-ink transition-opacity duration-150 hover:opacity-60"
      >
        → Book a session ←
      </a>
    </div>
  );
}
