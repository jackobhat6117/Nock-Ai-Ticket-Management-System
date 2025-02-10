"use client";

import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ChevronDown, MapPin } from "lucide-react";
import { MapMarker } from "@/types/map";
import { RegionTrendChart } from "./region-trend-chart";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 9.145,
  lng: 40.4897,
};


const markers: MapMarker[] = [
  // Active Sites (Green)
  { id: "1", lat: 9.032, lng: 38.7612, status: "active", type: "site", name: "Addis Ababa Site" },
  { id: "2", lat: 6.6666, lng: 44.2666, status: "active", type: "site", name: "Somali Region Site" },
  { id: "3", lat: 9.6809, lng: 39.5323, status: "active", type: "site", name: "Debre Berhan Site" },
  { id: "4", lat: 10.311, lng: 37.7306, status: "active", type: "site", name: "Gondar Site" },
  { id: "5", lat: 11.155, lng: 39.7493, status: "active", type: "site", name: "Dessie Site" },
  { id: "6", lat: 8.5601, lng: 39.2726, status: "active", type: "site", name: "Adama Site" },
  { id: "7", lat: 12.0323, lng: 39.6322, status: "active", type: "site", name: "Woldia Site" },
  { id: "8", lat: 7.062, lng: 38.4764, status: "active", type: "site", name: "Shashamane Site" },
  { id: "9", lat: 9.608, lng: 41.850, status: "active", type: "site", name: "Harar Site" },
  { id: "10", lat: 5.944, lng: 35.618, status: "active", type: "site", name: "Gambella Site" },

  // Inactive Sites (Red)
  { id: "11", lat: 11.5857, lng: 37.3863, status: "inactive", type: "site", name: "Bahir Dar Site" },
  { id: "12", lat: 7.0504, lng: 38.4955, status: "inactive", type: "site", name: "Hawassa Site" },
  { id: "13", lat: 13.4966, lng: 39.4666, status: "inactive", type: "site", name: "Mekelle Site" },
  { id: "14", lat: 9.0, lng: 37.5, status: "inactive", type: "site", name: "Jimma Site" },
  { id: "15", lat: 6.1, lng: 43.0, status: "inactive", type: "site", name: "Jijiga Site" },
  { id: "16", lat: 14.0, lng: 39.5, status: "inactive", type: "site", name: "Axum Site" },
  { id: "17", lat: 10.5, lng: 36.2, status: "inactive", type: "site", name: "Debre Markos Site" },
 
];

export function OutageMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapType, setMapType] = useState<string>("roadmap"); 

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const markerIcons = isLoaded
  ? {
      active: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#22c55e",
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 10,
      },
      inactive: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#ef4444",
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 10,
      },
    }
  : {};

  const handleMapTypeChange = (key: string) => {
    if (isLoaded) {
      switch (key) {
        case "roadmap":
          setMapType(google.maps.MapTypeId.ROADMAP);
          break;
        case "satellite":
          setMapType(google.maps.MapTypeId.SATELLITE);
          break;
        case "terrain":
          setMapType(google.maps.MapTypeId.TERRAIN);
          break;
        case "hybrid":
          setMapType(google.maps.MapTypeId.HYBRID);
          break;
        default:
          setMapType(google.maps.MapTypeId.ROADMAP);
      }
    }
  };

  return isLoaded ? (
    <div className="relative w-full h-screen">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={7}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapTypeId={mapType}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={markerIcons[marker.status]}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
      </GoogleMap>

      <div className="absolute top-20 left-4 z-10 flex gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              startContent={<MapPin className="h-4 w-4" />}
              endContent={<ChevronDown className="h-4 w-4" />}
            >
              Map Type
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Map Types" onAction={(key) => handleMapTypeChange(key as string)}>
            <DropdownItem key="roadmap">Standard</DropdownItem>
            <DropdownItem key="satellite">Satellite</DropdownItem>
            <DropdownItem key="terrain">Terrain</DropdownItem>
            <DropdownItem key="hybrid">Hybrid</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <Card className="absolute top-4 right-4 z-10 w-80">
        <CardBody>
          <h3 className="text-lg font-bold mb-2">Site Status Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Active Sites</span>
              </div>
              <span className="font-semibold">10</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Inactive Sites</span>
              </div>
              <span className="font-semibold">7</span>
            </div>
            {selectedMarker && (
              <div className="mt-4 p-3 bg-default-100 rounded-lg">
                <h4 className="font-semibold">{selectedMarker.name}</h4>
                <p className="text-sm text-default-500">
                  Status:{" "}
                  <span className={selectedMarker.status === "active" ? "text-green-500" : "text-red-500"}>
                    {selectedMarker.status === "active" ? "Active" : "Inactive"}
                  </span>
                </p>
                <p className="text-sm text-default-500">
                  Location: {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
                </p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
        
      <Card className="absolute bottom-4 left-4 z-10">
        <CardBody>
          <h3 className="text-lg font-bold mb-2">Site Statistics</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Region</th>
                  <th className="px-4 py-2">Active</th>
                  <th className="px-4 py-2">Inactive</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Addis Ababa</td>
                  <td className="px-4 py-2 text-green-500">1</td>
                  <td className="px-4 py-2 text-red-500">0</td>
                  <td className="px-4 py-2">1/1</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Somali</td>
                  <td className="px-4 py-2 text-green-500">1</td>
                  <td className="px-4 py-2 text-red-500">0</td>
                  <td className="px-4 py-2">1/1</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Amhara</td>
                  <td className="px-4 py-2 text-green-500">1</td>
                  <td className="px-4 py-2 text-red-500">1</td>
                  <td className="px-4 py-2">1/2</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Tigray</td>
                  <td className="px-4 py-2 text-green-500">0</td>
                  <td className="px-4 py-2 text-red-500">1</td>
                  <td className="px-4 py-2">1/3</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">SNNPR</td>
                  <td className="px-4 py-2 text-green-500">0</td>
                  <td className="px-4 py-2 text-red-500">1</td>
                  <td className="px-4 py-2">1/2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      
      <div className="absolute bottom-4 right-4 z-10 w-[500px]">
        <RegionTrendChart />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}