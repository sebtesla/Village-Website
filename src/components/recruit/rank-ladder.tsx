"use client"

import { useState } from "react"
import { SectionHeading } from "./section-heading"

// Ranks 01-08 are granted automatically by the voice-activity bot based on
// time spent in voice channels. Ranks 09-10 are reserved roles (Mods /
// elected leadership) rather than activity-based.
const RANKS = [
  {
    tier: "10",
    name: "Commander",
    symbol: "⚑",
    detail: "Held by the elected President and Vice President, granting them undisputed authority in the Village whenever needed.",
    reserved: true,
  },
  {
    tier: "09",
    name: "General",
    symbol: "★",
    detail: "Reserved for the server Mods — the most active members who know the community inside and out and keep things running.",
  },
  {
    tier: "08",
    name: "Colonel",
    symbol: "❱❱❱❱",
    detail: "An elite leader who governs overall server infrastructure, directs large-scale campaigns, and manages executive operations.",
  },
  {
    tier: "07",
    name: "Major",
    symbol: "❱❱❱",
    detail: "A high-ranking administrator who oversees multiple departments, manages officer conduct, and refines server policies.",
  },
  {
    tier: "06",
    name: "Captain",
    symbol: "❱❱",
    detail: "A senior officer who leads major server divisions, commands full operational forces, and coordinates high-level strategy.",
  },
  {
    tier: "05",
    name: "Lieutenant",
    symbol: "❱",
    detail: "A trusted division lead responsible for running specific server ops, managing teams, and maintaining active channels.",
  },
  {
    tier: "04",
    name: "Ensign",
    symbol: "⦁⦁⦁⦁",
    detail: "A junior commissioned officer tasked with overseeing basic administrative duties and tactical squad support.",
  },
  {
    tier: "03",
    name: "Sergeant",
    symbol: "⦁⦁⦁",
    detail: "An experienced field leader who directly manages small groups, maintains discipline, and directs raids or events.",
  },
  {
    tier: "02",
    name: "Corporal",
    symbol: "⦁⦁",
    detail: "A proven front-line member who helps guide newcomers and assists squad leaders on active duty.",
  },
  {
    tier: "01",
    name: "Private",
    symbol: "⦁",
    detail: "The baseline rank for all new members who carry out day-to-day community tasks and operational duties.",
  },
]

export function RankLadder() {
  const [openTier, setOpenTier] = useState("05")

  return (
    <section className="border-b border-[color:var(--rc-teal-line)] py-16 sm:py-24 px-4">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Progression"
          title="Rank ladder"
          description="Ranks 01–09 are handed out automatically by the voice-activity bot based on time logged in channel — no cheating the system. Commander is the one reserved role, held by elected leadership rather than earned by activity alone."
        />

        <div className="max-w-3xl mx-auto space-y-px bg-[color:var(--rc-teal-line)]">
          {RANKS.map((rank) => {
            const isOpen = openTier === rank.tier
            return (
              <div key={rank.tier} className="bg-[color:var(--rc-panel)]">
                <button
                  onClick={() => setOpenTier(isOpen ? "" : rank.tier)}
                  className="w-full flex items-center gap-3 sm:gap-4 px-5 sm:px-7 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="w-28 sm:w-52 shrink-0 flex items-center gap-2 sm:gap-4">
                    <span className="font-tactical text-sm text-[color:var(--rc-gold-dim)] shrink-0">
                      {rank.tier}
                    </span>
                    <span className="font-display text-lg sm:text-3xl font-bold uppercase tracking-wide text-[color:var(--rc-bone)] truncate">
                      {rank.name}
                    </span>
                    {rank.reserved && (
                      <span className="font-tactical text-[10px] tracking-[0.2em] uppercase text-[color:var(--rc-rust)] border border-[color:var(--rc-rust-dim)] px-2 py-0.5 hidden lg:inline shrink-0">
                        Reserved
                      </span>
                    )}
                  </div>
                  <div className="flex-1 flex justify-start">
                    <span className="font-tactical text-sm sm:text-lg text-[color:var(--rc-gold)] tracking-widest whitespace-nowrap w-16 sm:w-24 text-left">
                      {rank.symbol}
                    </span>
                  </div>
                  <div className="w-5 shrink-0 flex justify-center">
                    <span
                      className={`font-tactical text-[color:var(--rc-gold)] transition-transform ${isOpen ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-7 pb-6 -mt-1">
                    <p className="text-[color:var(--rc-bone)] text-sm sm:text-base leading-relaxed max-w-xl">
                      {rank.detail}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
