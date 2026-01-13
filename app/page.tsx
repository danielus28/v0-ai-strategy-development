import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { IsoMembershipSection } from "@/components/iso-membership-section"
import { LatamMapSection } from "@/components/latam-map-section"
import { CapacitySection } from "@/components/capacity-section"
import { MethodologySection } from "@/components/methodology-section"
import { Footer } from "@/components/footer"

export default function ObservatorioPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <IsoMembershipSection />
      <LatamMapSection />
      <CapacitySection />
      <MethodologySection />
      <Footer />
    </main>
  )
}
