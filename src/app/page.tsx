import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecruitHero } from "@/components/recruit/recruit-hero"
import { VoiceRoster } from "@/components/recruit/voice-roster"
import { RankLadder } from "@/components/recruit/rank-ladder"
import { VillageAchievements } from "@/components/recruit/village-achievements"
import { TheBase } from "@/components/recruit/the-base"
import { BlogTeaser } from "@/components/recruit/blog-teaser"
import { VillageCourt } from "@/components/recruit/village-court"
import { LootGrid } from "@/components/recruit/loot-grid"
import { HowToJoin } from "@/components/recruit/how-to-join"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col recruit-theme">
      <Header />

      <main className="flex-1">
        <RecruitHero />
        <VoiceRoster />
        <RankLadder />
        <VillageAchievements />
        <TheBase />
        <BlogTeaser />
        <VillageCourt />
        <LootGrid />
        <HowToJoin />
      </main>

      <Footer />
    </div>
  )
}
