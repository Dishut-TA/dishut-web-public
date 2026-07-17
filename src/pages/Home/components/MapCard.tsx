import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useState } from "react";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { PathOptions, Layer } from "leaflet";
import { useNavigate } from "react-router-dom";

type Props = {
  type?: string;
  showNavigateButton?: boolean;
};

const MapCard = ({
  type = "kekritisan",
  showNavigateButton = false,
}: Props) => {
  const [showLayer, setShowLayer] = useState(true);
  const navigate = useNavigate();

  const position: [number, number] = [-6.90389, 107.61861];

  const geoData: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { nama: "Kabupaten A", status: "sangat_kritis", skor: "80 - 100" },
        geometry: { type: "Polygon", coordinates: [[[107.4, -6.8], [107.6, -6.8], [107.6, -7.0], [107.4, -7.0], [107.4, -6.8]]] },
      },
      {
        type: "Feature",
        properties: { nama: "Kabupaten B", status: "kritis", skor: "50 - 79" },
        geometry: { type: "Polygon", coordinates: [[[107.6, -6.8], [107.8, -6.8], [107.8, -7.0], [107.6, -7.0], [107.6, -6.8]]] },
      },
      {
        type: "Feature",
        properties: { nama: "Kabupaten C", status: "tidak_kritis", skor: "0 - 49" },
        geometry: { type: "Polygon", coordinates: [[[107.5, -7.0], [107.7, -7.0], [107.7, -7.2], [107.5, -7.2], [107.5, -7.0]]] },
      },
    ],
  };

  const getStyle = (feature?: Feature<Geometry, any>): PathOptions => {
    const status = feature?.properties?.status;
    switch (status) {
      case "sangat_kritis": return { color: "#EF4444", fillColor: "#EF4444", fillOpacity: 0.6, weight: 1 };
      case "kritis": return { color: "#F59E0B", fillColor: "#FCD34D", fillOpacity: 0.6, weight: 1 };
      case "tidak_kritis": return { color: "#10B981", fillColor: "#10B981", fillOpacity: 0.6, weight: 1 };
      default: return { color: "#ccc", fillOpacity: 0.2, weight: 1 };
    }
  };

  const onEachFeature = (feature: Feature, layer: Layer) => {
    const props = feature.properties as any;
    (layer as any).bindPopup(`
      <div style="font-size:12px; font-family: sans-serif;">
        <b style="color: #1B5E20;">${props.nama}</b><br/>
        Status: ${props.status}<br/>
        Skor: ${props.skor}
      </div>
    `);

    (layer as any).on({
      mouseover: (e: any) => { e.target.setStyle({ weight: 2, fillOpacity: 0.8 }); },
      mouseout: (e: any) => { e.target.setStyle(getStyle(feature)); },
    });
  };

  return (
    <div className="relative w-full rounded-2xl md:rounded-4xl overflow-hidden shadow-sm bg-white border border-gray-100">
      
      <MapContainer
        center={position}
        zoom={9}
        className="w-full h-100  md:h-137.5 z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showLayer && type === "kekritisan" && (
          <GeoJSON
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
          <div className="absolute top-4 left-14 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-sm text-xs border border-gray-100">
            <p className="font-bold text-primary mb-2">Keterangan</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-inner"></span> <span className="font-medium text-gray-700">Sangat Kritis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-inner"></span> <span className="font-medium text-gray-700">Kritis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-inner"></span> <span className="font-medium text-gray-700">Tidak Kritis</span>
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