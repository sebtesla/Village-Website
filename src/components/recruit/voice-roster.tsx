"use client"

import { useEffect, useState } from "react"
import { SectionHeading } from "./section-heading"

const ROSTER = [
  "Piper",
  "Jared The Mormon",
  "Cal",
  "polipoker",
  "Mr. Chunky Monkey",
  "Zoinks",
  "frenzal_",
  "Human Resources",
  "rat large",
  "BigBeardBUBU",
  "madmiller2",
  "Not Eek",
]

export function VoiceRoster() {
  const [speakingIndex, setSpeakingIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSpeakingIndex((i) => (i + 1) % ROSTER.length)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="border-b border-[color:var(--rc-teal-line)] py-16 sm:py-24 px-4">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Wipe day, 6am"
          title="This is what a normal Thursday sounds like"
          description="Voice is always open. Nobody's muted waiting for permission to talk — you show up, you get a callsign, you're in the plan."
        />

        <div className="max-w-xl mx-auto hud-corners border border-[color:var(--rc-teal-line)] bg-[color:var(--rc-panel)]/80">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[color:var(--rc-teal-line)]">
            <span className="font-tactical text-xs tracking-[0.25em] text-[color:var(--rc-mist)] uppercase">
              #wipe-day-ops
            </span>
            <span className="font-tactical text-xs text-[color:var(--rc-green-live)]">
              {ROSTER.length} online
            </span>
          </div>
          <ul className="divide-y divide-[color:var(--rc-teal-line)]">
            {ROSTER.map((name, i) => {
              const isSpeaking = i === speakingIndex
              return (
                <li
                  key={name}
                  className={`flex items-center justify-between px-5 py-3.5 transition-colors ${
                    isSpeaking ? "bg-[color:var(--rc-panel-raised)]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isSpeaking ? "bg-[color:var(--rc-gold)] pulse-live" : "bg-[color:var(--rc-green-live)]"
                      }`}
                    />
                    <span className="font-medium text-[color:var(--rc-bone)]">{name}</span>
                  </div>
                  <span className="font-tactical text-sm text-[color:var(--rc-gold)]">★</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
