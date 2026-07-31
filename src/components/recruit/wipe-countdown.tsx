"use client"

import { useEffect, useState } from "react"
import { WIPE_WEEKDAY, WIPE_HOUR_UTC, WIPE_OCCURRENCE } from "@/lib/recruit-config"

function getNextWipe(now: Date): Date {
  // Find the Nth occurrence of WIPE_WEEKDAY in a given month/year, at WIPE_HOUR_UTC.
  const wipeForMonth = (year: number, month: number) => {
    const firstOfMonth = new Date(Date.UTC(year, month, 1, WIPE_HOUR_UTC, 0, 0))
    const firstWeekday = firstOfMonth.getUTCDay()
    let offset = WIPE_WEEKDAY - firstWeekday
    if (offset < 0) offset += 7
    offset += (WIPE_OCCURRENCE - 1) * 7
    return new Date(Date.UTC(year, month, 1 + offset, WIPE_HOUR_UTC, 0, 0))
  }

  const year = now.getUTCFullYear()
  const month = now.getUTCMonth()
  let candidate = wipeForMonth(year, month)
  if (candidate.getTime() <= now.getTime()) {
    candidate = month === 11 ? wipeForMonth(year + 1, 0) : wipeForMonth(year, month + 1)
  }
  return candidate
}

function splitDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

const pad = (n: number) => n.toString().padStart(2, "0")

export function WipeCountdown() {
  const [target, setTarget] = useState<Date | null>(null)
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const nextWipe = getNextWipe(new Date())
    setTarget(nextWipe)

    const tick = () => {
      setRemaining(splitDuration(nextWipe.getTime() - Date.now()))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units: Array<[string, number]> = [
    ["DAYS", remaining.days],
    ["HRS", remaining.hours],
    ["MIN", remaining.minutes],
    ["SEC", remaining.seconds],
  ]

  return (
    <div className="hud-corners border border-[color:var(--rc-teal-line)] bg-[color:var(--rc-panel)]/80 backdrop-blur-sm px-6 py-6 sm:px-10 sm:py-8 inline-block">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <span className="h-2 w-2 rounded-full bg-[color:var(--rc-rust)] pulse-live" />
        <p className="font-tactical text-xs tracking-[0.3em] text-[color:var(--rc-mist)] uppercase">
          Next force wipe {target ? `· ${target.toLocaleDateString(undefined, { month: "short", day: "numeric", timeZone: "UTC" })} 19:00 UTC` : ""}
        </p>
      </div>
      <div className="flex items-end justify-center gap-3 sm:gap-5">
        {units.map(([label, value]) => (
          <div key={label} className="text-center">
            <div className="font-tactical text-4xl sm:text-6xl font-bold text-[color:var(--rc-gold)] tabular-nums leading-none">
              {pad(value)}
            </div>
            <div className="font-tactical text-[10px] sm:text-xs tracking-[0.25em] text-[color:var(--rc-mist)] mt-2">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
