import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import L, { type PathOptions, type Layer } from "leaflet";
import { useNavigate } from "react-router-dom";
import { getPetaKekritisan } from "@/services/pemetaan.service";

type Props = {
  type?: string;
  projectId?: number;
  showNavigateButton?: boolean;
};

// Component to handle auto-zooming when geoData changes
const MapUpdater = ({ geoData }: { geoData: FeatureCollection | null }) => {
  const map = useMap();
  useEffect(() => {
    if (geoData && geoData.features.length > 0) {
      try {
        const geoJsonLayer = L.geoJSON(geoData);
        const bounds = geoJsonLayer.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20], maxZoom: 14 });
        }
      } catch (e) {
        console.error("Error auto-zooming to bounds", e);
      }
    }
  }, [geoData, map]);
  return null;
};

const MapCard = ({
  type = "kekritisan",
  projectId,
  showNavigateButton = false,
}: Props) => {
  const [showLayer, setShowLayer] = useState(true);
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const navigate = useNavigate();

  const position: [number, number] = [-6.90389, 107.61861];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "kekritisan" && projectId) {
          console.log("Fetching map data for project:", projectId);
          const res = await getPetaKekritisan(projectId);
          console.log("Response from getPetaKekritisan:", res);
          
          let finalGeoData = null;
          // If the endpoint returns the FeatureCollection directly
          if (res && res.type === "FeatureCollection") {
            finalGeoData = res;
          } else if (res?.features) {
            finalGeoData = {
                type: "FeatureCollection",
                features: res.features
            };
          } else if (res?.geojson_url) {
            console.log("Fetching direct geojson_url:", res.geojson_url);
            try {
              let urlToFetch = res.geojson_url;
              // If it's a relative path from the Python engine
              if (urlToFetch.startsWith('/result/')) {
                urlToFetch = `http://127.0.0.1:8001${urlToFetch}`;
              }
              const directGeoRes = await fetch(urlToFetch);
              finalGeoData = await directGeoRes.json();
              console.log("Direct GeoJSON response:", finalGeoData);
            } catch (err) {
              console.error("Failed to fetch direct geojson_url", err);
            }
          } else {
             console.log("No valid GeoJSON data found in response");
          }

          if (finalGeoData) {
            setGeoData(finalGeoData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch map data", error);
      }
    };
    
    fetchData();
  }, [type, projectId]);

  const getStyle = (feature?: Feature<Geometry, any>): PathOptions => {
    if (feature?.properties?.color) {
      return { color: feature.properties.color, fillColor: feature.properties.color, fillOpacity: 0.6, weight: 1 };
    }
    
    const status = (feature?.properties?.status || feature?.properties?.status_lahan_kritis || "").toLowerCase();
    switch (status) {
      case "sangat_kritis": 
      case "sangat kritis": return { color: "#EF4444", fillColor: "#EF4444", fillOpacity: 0.6, weight: 1 };
      case "kritis": return { color: "#F59E0B", fillColor: "#FCD34D", fillOpacity: 0.6, weight: 1 };
      case "agak_kritis":
      case "agak kritis": return { color: "#FCD34D", fillColor: "#FDE68A", fillOpacity: 0.6, weight: 1 };
      case "potensial_kritis":
      case "potensial kritis": return { color: "#6EE7B7", fillColor: "#6EE7B7", fillOpacity: 0.6, weight: 1 };
      case "tidak_kritis": 
      case "tidak kritis": return { color: "#10B981", fillColor: "#10B981", fillOpacity: 0.6, weight: 1 };
      default: return { color: "#ccc", fillOpacity: 0.4, weight: 1 };
    }
  };

  const onEachFeature = (feature: Feature, layer: Layer) => {
    const props = feature.properties as any;
    const name = props.desa_kelurahan || props.nama_kelompok || props.nama || "Area Lahan";
    const status = props.status_lahan_kritis || props.status || "-";
    const skor = props.skor_cpi_rata2 || props.skor || "-";
    const color = props.color || getStyle(feature).color || "#1B5E20";

    // Calculate center for Google Maps link
    let lat = 0;
    let lng = 0;
    if (typeof (layer as any).getBounds === 'function') {
      const center = (layer as any).getBounds().getCenter();
      lat = center.lat;
      lng = center.lng;
    } else if (feature.geometry.type === 'Point') {
      lat = feature.geometry.coordinates[1];
      lng = feature.geometry.coordinates[0];
    }
    
    const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;

    (layer as any).bindPopup(`
      <div class="min-w-60 font-sans -m-1">
        <div class="border-b border-gray-100 pb-2 mb-2">
          <h3 class="font-bold text-gray-800 text-[15px] mb-0.5 leading-tight">${name}</h3>
          <p class="text-[11px] text-gray-500 font-medium">Kec. ${props.kecamatan || '-'}, ${props.kota_kabupaten || '-'}</p>
        </div>
        <div class="space-y-2 text-[12px]">
          <div class="flex justify-between items-center">
            <span class="text-gray-500 font-medium">Status Lahan</span>
            <span class="font-bold px-2 py-0.5 rounded-full" style="background-color: ${color}20; color: ${color}">${status}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 font-medium">Skor CPI</span>
            <span class="font-bold text-gray-700 bg-gray-100 px-2 rounded">${skor}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 font-medium">Luas Area</span>
            <span class="font-bold text-gray-700">${props.luas_ha || '-'} Ha</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 font-medium">Kelompok Tani</span>
            <span class="font-semibold text-gray-700 truncate max-w-25" title="${props.nama_kelompok || '-'}">${props.nama_kelompok || '-'}</span>
          </div>
        </div>
        <div class="mt-3 pt-2 border-t border-gray-100">
          <span class="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Rekomendasi</span>
          <p class="text-[11px] text-gray-600 mt-1 leading-relaxed line-clamp-2" title="${props.rekomendasi_intervensi || '-'}">${props.rekomendasi_intervensi || '-'}</p>
        </div>
        
        ${lat !== 0 && lng !== 0 ? `
        <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 -mx-4 -mb-3 px-4 pb-3 rounded-b-xl">
          <div class="text-[9px] text-gray-500 font-mono tracking-tighter">
             <span class="block">${lat.toFixed(5)}</span>
             <span class="block">${lng.toFixed(5)}</span>
          </div>
          <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" 
             class="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
             Google Maps
          </a>
        </div>
        ` : ''}
      </div>
    `);

    (layer as any).on({
      mouseover: (e: any) => { 
        e.target.setStyle({ weight: 2, fillOpacity: 0.9, color: '#000' }); 
        e.target.bringToFront();
      },
      mouseout: (e: any) => { e.target.setStyle(getStyle(feature)); },
    });
  };

  return (
    <div className="relative w-full rounded-2xl md:rounded-4xl overflow-hidden shadow-sm bg-white border border-gray-100">
      
      <MapContainer
        center={position}
        zoom={9}
        className="w-full h-125 md:h-150 z-0 font-sans"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater geoData={geoData} />

        {showLayer && geoData && type === "kekritisan" && (
          <GeoJSON
            key={JSON.stringify(geoData)} // force re-render when data changes
            data={geoData}
            style={getStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {showNavigateButton && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-1000">
          <button
            onClick={() => navigate("/pemetaan")}
            className="bg-[#144a18] text-white px-6 md:px-8 py-3 rounded-full shadow-lg text-sm md:text-base font-bold hover:bg-[#0f3812] transition-colors cursor-pointer whitespace-nowrap"
          >
            Lihat Pemetaan Lengkap
          </button>
        </div>
      )}

      {!showNavigateButton && type === "kekritisan" && (
        <>
          <div className="absolute top-4 left-14 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-md text-xs border border-gray-100 z-1000">
            <p className="font-bold text-primary mb-3 text-sm">Legenda Kekritisan</p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#EF4444] shadow-sm"></span> <span className="font-medium text-gray-700">Sangat Kritis</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#F59E0B] shadow-sm"></span> <span className="font-medium text-gray-700">Kritis</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#FCD34D] shadow-sm"></span> <span className="font-medium text-gray-700">Agak Kritis</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#6EE7B7] shadow-sm"></span> <span className="font-medium text-gray-700">Potensial Kritis</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#10B981] shadow-sm"></span> <span className="font-medium text-gray-700">Tidak Kritis</span>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-1000">
            <button
              onClick={() => setShowLayer(!showLayer)}
              className={`w-14 h-7 rounded-full transition-colors flex items-center px-1 shadow-inner cursor-pointer ${
                showLayer ? "bg-[#144a18]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  showLayer ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </>
      )}

    </div>
  );
};

export default MapCard;