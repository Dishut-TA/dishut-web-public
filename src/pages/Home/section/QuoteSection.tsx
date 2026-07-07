import LeftHands from '@/assets/images/TanganKiri.png'
import RightHands from '@/assets/images/TanganKanan.png'; 

const QuoteSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-customWhite overflow-hidden flex items-center justify-center">
      <img
        src={LeftHands}
        alt="Ornamen Kiri"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-16 sm:w-24 md:w-32 lg:w-48 object-cover pointer-events-none opacity-60 md:opacity-100"
      />
      <img
        src={RightHands}
        alt="Ornamen Kanan"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-16 sm:w-24 md:w-32 lg:w-48 object-cover pointer-events-none opacity-60 md:opacity-100"
      />
      <div className="relative z-10 max-w-5xl mx-auto px-12 md:px-24 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold italic text-primary leading-relaxed md:leading-loose">
          "Menjaga bumi bukan lagi tentang tugas satu instansi, melainkan tentang janji satu generasi. Pulihkan lahannya, berdayakan petaninya, lestarikan alamnya."
        </h2>
      </div>
    </section>
  );
};

export default QuoteSection;