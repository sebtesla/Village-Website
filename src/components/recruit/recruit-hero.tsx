import { WipeCountdown } from "./wipe-countdown"
import { DiscordCtaButton } from "./discord-cta-button"

export function RecruitHero() {
  return (
    <section className="relative scan-bg border-b border-[color:var(--rc-teal-line)] pt-16 pb-16 sm:pt-24 sm:pb-20 px-4">
      <div className="container mx-auto flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-2 w-2 rounded-full bg-[color:var(--rc-green-live)] pulse-live" />
          <span className="font-tactical text-xs tracking-[0.35em] text-[color:var(--rc-mist)] uppercase">
            Server status: recruiting
          </span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-wide text-[color:var(--rc-bone)] leading-[0.95] mb-5">
          Join The Village
        </h1>
        <p className="text-[color:var(--rc-mist)] text-base sm:text-xl max-w-2xl mb-10">
          Rust, but actually fun. Imagine a group where everyone votes, builds
          close by on wipe day, and drops the toxic nonsense. No auditions
          needed—just show up, play, and back each other up.
        </p>

        <div className="mb-10">
          <WipeCountdown />
        </div>

        <DiscordCtaButton size="lg" />
      </div>
    </section>
  )
}
