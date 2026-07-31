import { SectionHeading } from "./section-heading"

export function RecruitingNow() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Right now"
          title="We're recruiting"
          description="Drop into the map and see where we're set up."
        />

        <div className="max-w-4xl mx-auto hud-corners border border-[color:var(--rc-teal-line)]">
          <iframe
            src="https://rustcult-com.onrender.com/"
            title="The Village Map"
            className="w-full aspect-video border-0"
            allow="geolocation"
          />
        </div>
      </div>
    </section>
  )
}
