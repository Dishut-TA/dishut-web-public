import { useState } from "react";
import MapCard from "@/pages/Home/components/MapCard";
import { ChevronDown } from "lucide-react";

const options = [
  "Peta Kekritisan",
  "Peta Kegiatan",
  "Peta Evaluasi Penanaman",
];

const MapSection = () => {
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full py-12 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-6 w-fit z-1000">
          <button
            onClick={() => setOpen(!open)}
            className="flex z-1000 items-center cursor-pointer gap-2 border border-primary text-primary px-4 py-2 rounded-full text-sm"
          >
            {selected}
            <ChevronDown
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              size={16}
            />
          </button>

          <div
            className={`z-1000 absolute mt-2 w-56 bg-customWhite rounded-xl shadow-md border overflow-hidden transition-all duration-300 ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            {options.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setSelected(item);
                  setOpen(false);
                }}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <MapCard />
      </div>
    </section>
  );
};

export default MapSection;