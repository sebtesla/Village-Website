import { SectionHeading } from "./section-heading"
import { DiscordCtaButton } from "./discord-cta-button"

const STEPS = [
  {
    n: "01",
    title: "Join the Discord",
    body: "Tap the button, land in #welcome. Takes ten seconds.",
  },
  {
    n: "02",
    title: "Read the rules channel",
    body: "Short version: don't grief teammates, don't ninja loot, show up for wipe day if you can.",
  },
  {
    n: "03",
    title: "Introduce yourself",
    body: "Playtime, timezone, what you're into — building, raiding, farming. We'll slot you in.",
  },
  {
    n: "04",
    title: "Get your rank & base invite",
    body: "You're added to the shared base and the wipe-day voice channel. That's it, you're in.",
  },
]

export function HowToJoin() {
  return (
    <section className="border-b border-[color:var(--rc-teal-line)] py-16 sm:py-24 px-4">
      <div className="container mx-auto">
        <SectionHeading eyebrow="Onboarding" title="How to join" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--rc-teal-line)] max-w-5xl mx-auto">
          {STEPS.map((step) => (
            <div key={step.n} className="bg-[color:var(--rc-panel)] p-6 sm:p-7 flex flex-col">
              <span className="font-tactical text-3xl font-bold text-[color:var(--rc-gold-dim)] mb-4">
                {step.n}
              </span>
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[color:var(--rc-bone)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[color:var(--rc-mist)] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <DiscordCtaButton size="lg" />
        </div>
      </div>
    </section>
  )
}
