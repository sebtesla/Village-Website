import { SectionHeading } from "./section-heading"

// Achievements are separate from rank — rank tracks voice activity,
// achievements track specific things you've actually done.
const ACHIEVEMENTS = [
  {
    icon: "⚑",
    name: "Wipe Day Veteran",
    detail: "Online and active for 6 wipe days in a row.",
  },
  {
    icon: "❱❱❱",
    name: "First Blood",
    detail: "First confirmed kill of a fresh wipe.",
  },
  {
    icon: "◆",
    name: "Raid Boss",
    detail: "Ran 10+ raids in a single wipe cycle.",
  },
  {
    icon: "▦",
    name: "Iron Wall",
    detail: "Base held through an entire wipe without falling.",
  },
  {
    icon: "⬡",
    name: "Loot Goblin",
    detail: "Farmed 10,000+ scrap in one wipe.",
  },
  {
    icon: "☾",
    name: "Night Owl",
    detail: "100+ hours logged in voice after midnight server time.",
  },
  {
    icon: "⚭",
    name: "Recruiter",
    detail: "Brought in 3 members who reached Sergeant or higher.",
  },
  {
    icon: "⌂",
    name: "Architect",
    detail: "Designed a base layout the village actually built.",
  },
]

export function VillageAchievements() {
  return (
    <section className="border-b border-[color:var(--rc-teal-line)] py-16 sm:py-24 px-4">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Beyond rank"
          title="Village achievements"
          description="Rank tracks time in voice. Achievements track what you actually did with it."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[color:var(--rc-teal-line)] max-w-4xl mx-auto">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.name}
              className="bg-[color:var(--rc-panel)] p-5 flex flex-col items-center text-center gap-2"
            >
              <span className="font-tactical text-2xl text-[color:var(--rc-gold)]">{a.icon}</span>
              <span className="font-display text-base font-bold uppercase tracking-wide text-[color:var(--rc-bone)] leading-tight">
                {a.name}
              </span>
              <span className="text-xs text-[color:var(--rc-mist)] leading-snug">{a.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
