import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Button from "@/components/Button";
import L from "leaflet";

// Fix icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapCard = () => {
  // Koordinat Jawa Barat (center)
  const position: [number, number] = [-6.90389, 107.61861]; // Bandung

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-white">
      
      {/* Map */}
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={false}
        className="w-full h-75 sm:h-100 md:h-125"
      >
        {/* Tile */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Contoh Marker */}
        <Marker position={position}>
          <Popup>
            Lokasi Prioritas Konservasi (Contoh)
          </Popup>
        </Marker>
      </MapContainer>

      {/* Button overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-1000">
        <Button
          label="Lihat Pemetaan Lengkap"
          variant="primary"
          size="md"
          className="shadow-lg p-2"
        />
      </div>

    </div>
  );
};

export default MapCard;