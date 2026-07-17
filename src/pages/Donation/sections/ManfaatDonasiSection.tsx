import { HiOutlineChartBar, HiOutlineSparkles } from "react-icons/hi2";
import BenefitCard from "../components/BenefitCard";
import { HiOutlineGlobeAlt, HiOutlineUsers } from "react-icons/hi";

const benefits = [
  {
    title: "Mendukung Rehabilitasi Hutan",
    description: "Donasi Anda membantu kegiatan penanaman pohon dan pemulihan hutan yang rusak.",
    icon: HiOutlineSparkles,
  },
  {
    title: "Menjaga Ekosistem Alam",
    description: "Program konservasi membantu menjaga keseimbangan ekosistem dan melindungi keanekaragaman hayati.",
    icon: HiOutlineGlobeAlt,
  },
  {
    title: "Memberdayakan Masyarakat",
    description: "Program konservasi juga melibatkan masyarakat sekitar dalam kegiatan rehabilitasi hutan.",
    icon: HiOutlineUsers,
  },
  {
    title: "Transparansi Program",
    description: "Anda dapat memantau perkembangan program melalui laporan dan sistem monitoring platform.",
    icon: HiOutlineChartBar,
  },
];

const ManfaatDonasiSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          Manfaat Donasi Kamu
        </h2>

        <p className="text-primary max-w-2xl mx-auto mb-12">
          Setiap donasi yang Anda berikan membantu memulihkan ekosistem hutan,
          mendukung masyarakat lokal, dan menjaga keberlanjutan lingkungan
        </p>

        <div className="grid text-primary gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, index) => (
            <BenefitCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManfaatDonasiSection;