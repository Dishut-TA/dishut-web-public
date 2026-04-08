import AccordionSection from "./section/AccordionSection"
import CtaKonservasiSection from "./section/CtaKonservasiSection"
import DampakProgramSection from "./section/DampakProgramSection"
import HeroSection from "./section/HeroSection"
import PetaPrioritasKonservasiSection from "./section/PetaPrioritasKonservasiSection"
import ProgramKonservasiSection from "./section/ProgramKonservasiSection"

const Home = () => {
  return (
    <div>
        <HeroSection />
        <DampakProgramSection />
        <PetaPrioritasKonservasiSection />
        <AccordionSection />
        <ProgramKonservasiSection />
        <CtaKonservasiSection />
    </div>
  )
}

export default Home