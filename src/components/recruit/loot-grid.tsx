import { SectionHeading } from "./section-heading"

const LOOT = [
  { name: "Metal Frags", qty: "12,400", rarity: "common" },
  { name: "Rifle Ammo", qty: "3,800", rarity: "common" },
  { name: "Scrap", qty: "9,200", rarity: "common" },
  { name: "C4", qty: "22", rarity: "rare" },
  { name: "Rocket", qty: "64", rarity: "rare" },
  { name: "MP5A4", qty: "5", rarity: "rare" },
  { name: "Blueprint: Water Purifier", qty: "1", rarity: "legendary" },
  { name: "Full Metal Facemask", qty: "3", rarity: "legendary" },
]

const rarityStyles: Record<string, string> = {
  common: "border-[color:var(--rc-teal-line)]",
  rare: "border-[color:var(--rc-gold-dim)]",
  legendary: "border-[color:var(--rc-gold)]",
}

const rarityLabel: Record<string, string> = {
  common: "text-[color:var(--rc-mist)]",
  rare: "text-[color:var(--rc-gold-dim)]",
  legendary: "text-[color:var(--rc-gold)]",
}

export function LootGrid() {
  return (
    <section className="border-b border-[color:var(--rc-teal-line)] py-16 sm:py-24 px-4">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Split system"
          title="Last raid's haul"
          description="Everyone who shows up gets a cut, split by rank and who put in the work. No hoarding."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {LOOT.map((item) => (
            <div
              key={item.name}
              className={`relative overflow-hidden bg-[color:var(--rc-panel)] border ${rarityStyles[item.rarity]} p-4 flex flex-col gap-2`}
            >
              {item.rarity === "legendary" && (
                <div className="absolute inset-0 shimmer-legendary pointer-events-none" />
              )}
              <span className={`font-tactical text-[10px] uppercase tracking-[0.2em] ${rarityLabel[item.rarity]}`}>
                {item.rarity}
              </span>
              <span className="font-display text-lg font-bold text-[color:var(--rc-bone)] leading-tight">
                {item.name}
              </span>
              <span className="font-tactical text-sm text-[color:var(--rc-mist)] mt-auto">
                x{item.qty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
