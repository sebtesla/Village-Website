import { SectionHeading } from "./section-heading"

const STATS = [
  { label: "Turrets", value: "24" },
  { label: "Sleeping bags", value: "18" },
  { label: "TC layers", value: "4" },
  { label: "Wipes survived", value: "6" },
]

export function TheBase() {
  return (
    <section className="border-b border-[color:var(--rc-teal-line)] py-16 sm:py-24 px-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <SectionHeading
            eyebrow="Home base"
            title={
              <>
                One Village.
                <br />
                Everyone&rsquo;s in it.
              </>
            }
            align="left"
          />
          <p className="text-[color:var(--rc-mist)] text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
            No splinter bases, no solo grubbing off in a corner of the map. Everyone
            builds, defends, and loses sleep over the same walls. It's a bigger
            target — that's the point. More guns online when it matters.
          </p>
          <div className="grid grid-cols-2 gap-px bg-[color:var(--rc-teal-line)] max-w-sm">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-[color:var(--rc-panel)] p-4">
                <div className="font-tactical text-2xl sm:text-3xl font-bold text-[color:var(--rc-gold)]">
                  {stat.value}
                </div>
                <div className="font-tactical text-[10px] tracking-[0.2em] text-[color:var(--rc-mist)] uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Base tour video */}
        <div className="hud-corners border border-[color:var(--rc-teal-line)] aspect-video bg-[color:var(--rc-panel)] relative overflow-hidden">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/p34Fwxns2qo"
            title="We Built a VILLAGE on the Hardest Rust Server (Rusty Moose)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
