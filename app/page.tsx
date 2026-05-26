import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { IsoMembershipSection } from "@/components/iso-membership-section"
import { LatamMapSection } from "@/components/latam-map-section-new"
import { CapacitySection } from "@/components/capacity-section"
import { MethodologyTeaser } from "@/components/methodology-teaser"
import { SupportSection } from "@/components/support-section"
import { Footer } from "@/components/footer"

export default function ObservatorioPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <IsoMembershipSection />
      <LatamMapSection />
      <CapacitySection />
      <MethodologyTeaser />
      <SupportSection />
      <Footer />
    </main>
  )
}
