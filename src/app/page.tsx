import { HeroSection } from "@/components/home/hero-section"
import { FeaturedTools } from "@/components/home/featured-tools"
import { CategoriesSection } from "@/components/home/categories-section"
import dynamic from "next/dynamic"

// Lazy-load below-the-fold sections so the initial HTML payload and DOM
// stay small. This directly addresses three SEO audit failures:
//   - HTML Page Size (40 KB > 33 KB average)
//   - DOM Size (1,738 nodes > 1,500 recommended)
//   - Page Objects / HTTP requests (77 > 20)
//
// The hero, featured tools, and categories are above the fold on first paint
// and stay server-rendered. Everything below is split into separate chunks
// and hydrated as the user scrolls.
const PopularTools = dynamic(
  () => import("@/components/home/popular-tools").then((m) => m.PopularTools),
  { loading: () => null }
)
const LatestTools = dynamic(
  () => import("@/components/home/latest-tools").then((m) => m.LatestTools),
  { loading: () => null }
)
const StatsSection = dynamic(
  () => import("@/components/home/stats-section").then((m) => m.StatsSection),
  { loading: () => null }
)
const HowItWorksSection = dynamic(
  () => import("@/components/home/how-it-works-section").then((m) => m.HowItWorksSection),
  { loading: () => null }
)
const HomepageFAQSection = dynamic(
  () => import("@/components/home/homepage-faq-section").then((m) => m.HomepageFAQSection),
  { loading: () => null }
)
const CtaSection = dynamic(
  () => import("@/components/home/cta-section").then((m) => m.CtaSection),
  { loading: () => null }
)
const HireMeSection = dynamic(
  () => import("@/components/home/hire-me-section").then((m) => m.HireMeSection),
  { loading: () => null }
)

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTools />
      <CategoriesSection />
      <PopularTools />
      <LatestTools />
      <StatsSection />
      <HowItWorksSection />
      <HomepageFAQSection />
      <CtaSection />
      <HireMeSection />
    </>
  )
}
