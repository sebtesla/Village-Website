"use client"

import { useEffect, useState } from "react"
import { SectionHeading } from "./section-heading"

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

export function VillageCourt() {
  const [votes, setVotes] = useState({ guilty: 14, notGuilty: 9 })
  const [voted, setVoted] = useState<null | "guilty" | "notGuilty">(null)
  const [deadline] = useState(() => Date.now() + 24 * 60 * 60 * 1000)
  const [remaining, setRemaining] = useState(24 * 60 * 60 * 1000)

  useEffect(() => {
    const tick = () => setRemaining(deadline - Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [deadline])

  const isClosed = remaining <= 0
  const total = votes.guilty + votes.notGuilty
  const guiltyPct = Math.round((votes.guilty / total) * 100)

  const castVote = (choice: "guilty" | "notGuilty") => {
    if (voted || isClosed) return
    setVoted(choice)
    setVotes((v) => ({ ...v, [choice]: v[choice] + 1 }))
  }

  return (
    <section className="border-b border-[color:var(--rc-teal-line)] py-16 sm:py-24 px-4">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Self-governed"
          title="The village court"
          description="Disputes get voted on, not settled by whoever yells loudest in Discord. Every case closes 24 hours after it's opened — here's a live example."
        />

        <div className="max-w-xl mx-auto hud-corners border border-[color:var(--rc-teal-line)] bg-[color:var(--rc-panel)]/80 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <p className="font-tactical text-xs tracking-[0.2em] text-[color:var(--rc-gold-dim)] uppercase">
              Case #0047
            </p>
            <p className="font-tactical text-xs tracking-[0.2em] uppercase flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${isClosed ? "bg-[color:var(--rc-mist)]" : "bg-[color:var(--rc-rust)] pulse-live"}`} />
              <span className={isClosed ? "text-[color:var(--rc-mist)]" : "text-[color:var(--rc-rust)]"}>
                {isClosed ? "Voting closed" : `Closes in ${formatRemaining(remaining)}`}
              </span>
            </p>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--rc-bone)] mb-6">
            Took the last set of raid charges from shared storage without asking
          </h3>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => castVote("guilty")}
              disabled={!!voted || isClosed}
              className={`flex-1 py-3 font-display font-bold uppercase tracking-wide text-sm border transition-colors ${
                voted === "guilty"
                  ? "bg-[color:var(--rc-rust)] border-[color:var(--rc-rust)] text-[color:var(--rc-bone)]"
                  : "border-[color:var(--rc-teal-line)] text-[color:var(--rc-bone)] hover:border-[color:var(--rc-rust)] disabled:cursor-not-allowed disabled:opacity-50"
              }`}
            >
              Guilty
            </button>
            <button
              onClick={() => castVote("notGuilty")}
              disabled={!!voted || isClosed}
              className={`flex-1 py-3 font-display font-bold uppercase tracking-wide text-sm border transition-colors ${
                voted === "notGuilty"
                  ? "bg-[color:var(--rc-teal)] border-[color:var(--rc-teal)] text-[color:var(--rc-bone)]"
                  : "border-[color:var(--rc-teal-line)] text-[color:var(--rc-bone)] hover:border-[color:var(--rc-teal)] disabled:cursor-not-allowed disabled:opacity-50"
              }`}
            >
              Not guilty
            </button>
          </div>

          <div className="h-3 w-full bg-[color:var(--rc-void)] overflow-hidden flex">
            <div
              className="h-full bg-[color:var(--rc-rust)] transition-all duration-500"
              style={{ width: `${guiltyPct}%` }}
            />
            <div
              className="h-full bg-[color:var(--rc-teal)] transition-all duration-500"
              style={{ width: `${100 - guiltyPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 font-tactical text-xs text-[color:var(--rc-mist)]">
            <span>{guiltyPct}% guilty ({votes.guilty})</span>
            <span>{100 - guiltyPct}% not guilty ({votes.notGuilty})</span>
          </div>

          {voted && !isClosed && (
            <p className="mt-4 text-center text-sm text-[color:var(--rc-mist)]">
              Vote recorded. Verdict locks when the 24-hour window closes.
            </p>
          )}
          {isClosed && (
            <p className="mt-4 text-center text-sm text-[color:var(--rc-mist)]">
              This case is closed. Verdict: {guiltyPct >= 50 ? "guilty" : "not guilty"}.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
