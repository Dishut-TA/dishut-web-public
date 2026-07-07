import AccordionSection from "./section/AccordionSection"
import AksiPartisipasiSection from "./section/AksiPartisipasiSection"
import DampakProgramSection from "./section/DampakProgramSection"
import HeroSection from "./section/HeroSection"
import PetaPrioritasKonservasiSection from "./section/PetaPrioritasKonservasiSection"
import QuoteSection from "./section/QuoteSection"

const Home = () => {
  return (
    <div>
        <HeroSection />
        <DampakProgramSection />
        <PetaPrioritasKonservasiSection />
        <AccordionSection />
        <AksiPartisipasiSection /> 
        <QuoteSection />
    </div>
  )
}

export default Home