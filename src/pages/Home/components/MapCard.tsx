import {
  MapContainer,
  TileLayer,
  GeoJSON,
} from "react-leaflet";
import { useState } from "react";
import type {
  Feature,
  FeatureCollection,
  Geometry,
} from "geojson";
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

  // 🔥 DUMMY GEOJSON
  const geoData: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          nama: "Kabupaten A",
          status: "sangat_kritis",
          skor: "80 - 100",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [107.4, -6.8],
              [107.6, -6.8],
              [107.6, -7.0],
              [107.4, -7.0],
              [107.4, -6.8],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {
          nama: "Kabupaten B",
          status: "kritis",
          skor: "50 - 79",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [107.6, -6.8],
              [107.8, -6.8],
              [107.8, -7.0],
              [107.6, -7.0],
              [107.6, -6.8],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {
          nama: "Kabupaten C",
          status: "tidak_kritis",
          skor: "0 - 49",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [107.5, -7.0],
              [107.7, -7.0],
              [107.7, -7.2],
              [107.5, -7.2],
              [107.5, -7.0],
            ],
          ],
        },
      },
    ],
  };

  // 🎨 STYLE (FIX TS ERROR)
  const getStyle = (
    feature?: Feature<Geometry, any>
  ): PathOptions => {
    const status = feature?.properties?.status;

    switch (status) {
      case "sangat_kritis":
        return {
          color: "red",
          fillColor: "red",
          fillOpacity: 0.6,
          weight: 1,
        };
      case "kritis":
        return {
          color: "orange",
          fillColor: "yellow",
          fillOpacity: 0.6,
          weight: 1,
        };
      case "tidak_kritis":
        return {
          color: "green",
          fillColor: "green",
          fillOpacity: 0.6,
          weight: 1,
        };
      default:
        return {
          color: "#ccc",
          fillOpacity: 0.2,
          weight: 1,
        };
    }
  };

  // 🔥 POPUP + HOVER
  const onEachFeature = (feature: Feature, layer: Layer) => {
    const props = feature.properties as any;

    // popup
    (layer as any).bindPopup(`
      <div style="font-size:12px">
        <b>${props.nama}</b><br/>
        Status: ${props.status}<br/>
        Skor: ${props.skor}
      </div>
    `);

    // hover effect
    (layer as any).on({
      mouseover: (e: any) => {
        e.target.setStyle({
          weight: 2,
          fillOpacity: 0.8,
        });
      },
      mouseout: (e: any) => {
        e.target.setStyle(getStyle(feature));
      },
    });
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-white">

      {/* MAP */}
      <MapContainer
        center={position}
        zoom={10}
        className="w-full h-100 md:h-125"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* GEOJSON */}
        {showLayer && type === "kekritisan" && (
          <GeoJSON
            data={geoData}
            style={getStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {/* BUTTON (ONLY HOME) */}
      {showNavigateButton && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-1000">
          <button
            onClick={() => navigate("/pemetaan")}
            className="bg-primary text-white px-4 py-2 rounded-full shadow-md text-sm hover:opacity-90 transition"
          >
            Lihat Pemetaan Lengkap
          </button>
        </div>
      )}

      {/* LEGEND */}
      {type === "kekritisan" && (
        <div className="absolute top-4 left-4 z-1000 bg-white p-3 rounded-lg shadow text-xs">
          <p className="font-semibold mb-1">Keterangan</p>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500"></span> Sangat Kritis
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400"></span> Kritis
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500"></span> Tidak Kritis
          </div>
        </div>
      )}

      {/* TOGGLE */}
      {type === "kekritisan" && (
        <div className="absolute top-4 right-4 z-1000">
          <button
            onClick={() => setShowLayer(!showLayer)}
            className={`w-12 h-6 rounded-full transition ${
              showLayer ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                showLayer ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default MapCard;