import { useState, useEffect } from "react";
import MapCard from "@/pages/Home/components/MapCard";
import { ChevronDown, History } from "lucide-react";
import { getProjects } from "@/services/pemetaan.service";
import HistoryModal from "../components/HistoryModal";

const options = [
  "Peta Kekritisan",
  "Peta Kegiatan",
  "Peta Evaluasi Penanaman",
];

const MapSection = () => {
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  useEffect(() => {
    // get latest project id for default map
    getProjects().then(res => {
      let projects = res;
      if (res?.data && Array.isArray(res.data)) {
        projects = res.data;
      } else if (res?.data?.data && Array.isArray(res.data.data)) {
        projects = res.data.data;
      }
      
      if (Array.isArray(projects) && projects.length > 0) {
        setProjectId(projects[0].id);
      }
    }).catch(err => {
      console.error("Failed to load projects", err);
    });
  }, []);

  return (
    <section className="w-full py-12 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="relative w-fit">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center cursor-pointer gap-2 border border-primary text-primary px-4 py-2 rounded-full text-sm bg-white"
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
              className={`absolute mt-2 w-56 bg-customWhite rounded-xl shadow-md border overflow-hidden transition-all duration-300 z-50 ${
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
          
          <button 
            onClick={() => setIsHistoryModalOpen(true)}
            className="flex items-center gap-2 bg-[#144a18] text-white px-5 py-2 rounded-full text-sm hover:bg-[#0f3812] transition-colors cursor-pointer shadow-sm"
          >
            <History size={16} />
            Riwayat Peta
          </button>
        </div>

        {projectId ? (
          <div className="relative z-0">
            <MapCard type={selected === "Peta Kegiatan" ? "kegiatan" : selected === "Peta Evaluasi Penanaman" ? "evaluasi" : "kekritisan"} projectId={projectId} />
          </div>
        ) : (
          <div className="w-full h-100 md:h-137.5 rounded-2xl md:rounded-4xl flex items-center justify-center bg-gray-100 border border-gray-200 text-gray-500">
            Memuat data peta...
          </div>
        )}
      </div>

      <HistoryModal 
        isOpen={isHistoryModalOpen} 
        onClose={() => setIsHistoryModalOpen(false)} 
        onSelectProject={(id) => setProjectId(id)} 
      />
    </section>
  );
};

export default MapSection;