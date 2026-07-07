import CTASection from "./sections/CTASection"
import HeroSection from "./sections/HeroSection"
import LangkahInvestasiSection from "./sections/LangkahInvestasiSection"
import ProgramScheme from "./sections/ProgramScheme"
import RecomendationSection from "./sections/RecomendationSection"
import WhySection from "./sections/WhySection"

const Investation = () => {
  return (
    <div>
        <HeroSection />
        <ProgramScheme />
        <WhySection />
        <LangkahInvestasiSection />
        <RecomendationSection />
        <CTASection />
    </div>
  )
}

export default Investation