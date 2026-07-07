import { useNavigate } from 'react-router-dom';
import { FiHeart, FiBriefcase } from 'react-icons/fi'; 
import Button from '@/components/Button';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import BG from "@/assets/images/BGMenanam.png";

const AksiPartisipasiSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full pt-20 pb-32 md:pb-56 lg:md:pb-56 bg-customWhite overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[60%] bg-linear-to-b from-25% from-customWhite to-transparent z-10"></div>
        <img 
          src={BG} 
          alt="Ilustrasi Menanam" 
          className="absolute bottom-0 left-0 w-full h-[85%] md:h-[90%] object-cover object-bottom" 
        />
        <div className="absolute bottom-0 left-0 w-full h-20 md:h-24 bg-linear-to-t from-customWhite to-transparent z-10"></div>
      </div>

      <div className="relative z-10 mx-auto px-6 md:px-24 items-start">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-primary leading-tight">
            Bersama Berdayakan Hutan dan Lahan Jawa Barat:
          </h2>
          <h3 className="text-3xl font-semibold mt-2">
            <span className="text-primary">Tanam Kebaikan Lewat <span className="font-bold text-tertiary">Donasi</span></span>, 
            <span className="text-primary"> Tuai Hasil Lewat <span className="font-bold text-tertiary">Investasi</span></span>.
          </h3>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6 mt-8">
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-md">
              <FiHeart className="text-white text-4xl" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-xl font-bold text-primary mb-2">Donasi</h4>
              <p className="text-xs text-primary/80 leading-relaxed mb-4">
                Aksi nyata publik dalam membeli bibit pohon secara langsung melalui platform. Bibit yang dibeli akan disalurkan dan ditanam oleh KTH binaan dinas untuk menghijaukan kembali lokasi lahan kritis prioritas di Jawa Barat.
              </p>
              <div className="flex justify-center sm:justify-end">
                <Button 
                  label="Donasi" 
                  size="sm" 
                  className="px-6 py-2 rounded-full font-bold bg-primary hover:bg-primary/90 text-white"
                  rightIcon={<MdOutlineKeyboardArrowRight size={20} />}
                  onClick={() => navigate('/donasi/explore')} 
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-md">
              <FiBriefcase className="text-white text-4xl" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-xl font-bold text-primary mb-2">Investasi</h4>
              <p className="text-xs text-primary/80 leading-relaxed mb-4">
                Dapatkan keuntungan dengan penanaman modal publik untuk mendukung usaha Kelompok Tani Hutan (KTH) di bidang komoditas atau ekowisata, dengan skema bagi hasil keuntungan 40% untuk Investor dan 60% untuk KTH.
              </p>
              <div className="flex justify-center sm:justify-end">
                <Button 
                  label="Investasi" 
                  size="sm" 
                  className="px-6 py-2 rounded-full font-bold bg-primary hover:bg-primary/90 text-white"
                  rightIcon={<MdOutlineKeyboardArrowRight size={20} />}
                  onClick={() => navigate('/investasi/explore')} 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AksiPartisipasiSection;