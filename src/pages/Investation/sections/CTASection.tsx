import React from "react";
import { FiChevronRight } from "react-icons/fi";
import Button from "@/components/Button";
import PlantCoinIcon from '@/assets/images/BibitInvest.png';
import { useNavigate } from "react-router-dom";

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-customWhite py-16 md:py-24 px-5 md:px-8 lg:px-12">
      <div className="mx-auto">
        <div className="bg-primary rounded-4xl py-12 px-6 md:py-16 md:px-12 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
          <img
            src={PlantCoinIcon}
            alt="Ilustrasi Investasi Hijau"
            className="w-28 md:w-36 object-contain mb-6 drop-shadow-2xl relative z-10"
          />
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-white mb-4 leading-tight relative z-10">
            Mulai Investasi Hijau Bersama Kami
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed relative z-10 font-medium">
            Setiap kontribusi Anda menopang paru-paru bumi sekaligus membangun tatanan ekonomi kerakyatan yang makmur dan bermatabat
          </p>
          <div className="relative z-10">
            <Button
              label="Pilih Program Investasi Sekarang"
              rightIcon={<FiChevronRight className="text-xl" />}
              size="lg"
              variant="tertiary"
              onClick={() => {navigate('/investasi/explore')}}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default CTASection;