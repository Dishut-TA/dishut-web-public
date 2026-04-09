import HeroDonasiSection from "./sections/HeroDonasiSection"
import HeroSection from "./sections/HeroSection"
import ManfaatDonasiSection from "./sections/ManfaatDonasiSection"
import StatsSection from "./sections/StatsSection"
import BG from "@/assets/images/DonasiHandap.png"

const Donation = () => {
  return (
    <div>
        <HeroSection />
        <StatsSection />
        <ManfaatDonasiSection />
        <HeroDonasiSection backgroundImage={BG} />
    </div>
  )
}

export default Donation