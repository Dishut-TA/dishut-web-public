import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import FooterColumn from "./FooterColumn";
import FooterPartner from "./FooterPartner";
import LogoUnikom from "@/assets/images/LOGOUNIKOM.png";
import LogoSingmanfaat from "@/assets/images/SingManfaatLogo.png";

const Footer = () => {
  const menus = {
    sosial: ["Facebook", "Instagram", "YouTube"],
    layanan: ["Donasi", "Bantuan", "Blog"],
    perusahaan: ["Tentang Kami"],
    dukungan: ["Pusat Bantuan", "Syarat & Ketentuan", "Kebijakan Privasi"],
  };

  const partners = [
    { name: "Partner1", logo: LogoUnikom },
    { name: "Partner2", logo: LogoSingmanfaat },
  ];

  return (
    <footer className="bg-customWhite py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8">
        
        {/* CONTACT */}
        <div className="space-y-3 text-sm text-primary md:col-span-2">
          <p className="font-semibold">Senin - Jumat: 08.00 - 16.00 WIB</p>

          <div className="flex items-start gap-2">
            <HiLocationMarker className="mt-1" />
            <p>
              Jl. Soekarno-Hatta No. 751, Cisaranten Endah, Kec. Arcamanik, Kota Bandung, Jawa Barat 40292
            </p>
          </div>

          <div className="flex items-center gap-2">
            <HiPhone />
            <p>(022) 740 3431</p>
          </div>

          <div className="flex items-center gap-2">
            <HiMail />
            <p>dishut@jabarprov.go.id</p>
          </div>
        </div>

        {/* MENU */}
        <FooterColumn title="Sosial" items={menus.sosial} />
        <FooterColumn title="Layanan" items={menus.layanan} />
        <FooterColumn title="Perusahaan" items={menus.perusahaan} />
        <FooterColumn title="Dukungan" items={menus.dukungan} />

        {/* PARTNER */}
        <FooterPartner title="Partner" partners={partners} />

      </div>
    </footer>
  );
};

export default Footer;