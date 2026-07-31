export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: "center" | "left"
}) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <div className={`flex flex-col ${alignClass} mb-10 sm:mb-14`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-8 bg-[color:var(--rc-gold-dim)]" />
        <span className="font-tactical text-xs tracking-[0.3em] text-[color:var(--rc-gold)] uppercase">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-[color:var(--rc-gold-dim)]" />
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide text-[color:var(--rc-bone)] leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-[color:var(--rc-mist)] text-base sm:text-lg ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  )
}
