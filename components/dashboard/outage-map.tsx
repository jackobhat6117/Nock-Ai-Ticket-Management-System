"use client";

import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Skeleton } from "@nextui-org/react";
import { ChevronDown, MapPin } from "lucide-react";
import { MapMarker } from "@/types/map";
import { RegionTrendChart } from "./region-trend-chart";
import { SiteMap, TotalSiteStatusMap, TotalStatusTable } from "@/types/siteData";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 9.145,
  lng: 40.4897,
};

interface siteMapProps {
  data: TotalSiteStatusMap | TotalStatusTable | null | any;
  loading?: boolean;
}

export function OutageMap({ data, loading }: siteMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null | any>(null);
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

  // Calculate total active and inactive sites
  const totalActiveSites = data?.totalSitesStatusMap?.filter((site: TotalSiteStatusMap) => site.sitedownflag === "0").length || 0;
  const totalInactiveSites = data?.totalSitesStatusMap?.filter((site: TotalSiteStatusMap) => site.sitedownflag === "1").length || 0;

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
        {data?.totalSitesStatusMap?.map((marker: TotalSiteStatusMap, index:number) => (
          <Marker
            key={index}
            position={{ lat: Number(marker.locationLat), lng: Number(marker.locationLong) }}
            icon={markerIcons[marker.sitedownflag === "0" ? "active" : "inactive"]}
            onClick={() => setSelectedMarker({
              siteid: marker.siteid,
              region: marker.region,
              lat: Number(marker.locationLat),
              lng: Number(marker.locationLong),
              status: marker.sitedownflag === "0" ? "active" : "inactive",
              active_customer: marker.total_active_customers,
              total_revenue: marker.total_revenue

            
            })}
            title={marker.region} // Tooltip showing the region name
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
            {loading ? (
              <>
                <Skeleton className="h-4 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Active Sites</span>
                  </div>
                  <span className="font-semibold">{totalActiveSites}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Inactive Sites</span>
                  </div>
                  <span className="font-semibold">{totalInactiveSites}</span>
                </div>
              </>
            )}
            {selectedMarker && (
              <div className="mt-4 p-3 bg-default-100 rounded-lg">
                <h4 className="font-semibold">{selectedMarker.region}</h4>
                <p className="text-sm text-default-500">
                  Site ID: {selectedMarker.siteid}
                </p>
                <p className="text-sm text-default-500">
                  Status:{" "}
                  <span className={selectedMarker.status === "active" ? "text-green-500" : "text-red-500"}>
                    {selectedMarker.status === "active" ? "Active" : "Inactive"}
                  </span>
                </p>
                <p className="text-sm text-default-500">
                  Location: {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
                </p>
                <p className="text-sm text-default-500">
                  Active Customer: {selectedMarker.active_customer}
                </p>

                <p className="text-sm text-default-500">
                  Total Revenue: {selectedMarker.total_revenue}
                </p>
                
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <Card className="absolute bottom-4 left-4 z-10 h-96">
        <CardBody>
          <h3 className="text-lg font-bold mb-2">Site Statistics</h3>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full w-96">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Region</th>
                    <th className="px-4 py-2">Active</th>
                    <th className="px-4 py-2">Inactive</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Active Customer</th>
                    <th className="px-4 py-2">Revenu Per Region</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.getSiteTotalStatusTable?.map((item: TotalStatusTable, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{item.region || "Unknown"}</td>
                      <td className="px-4 py-2 text-green-500">{item.site_up}</td>
                      <td className="px-4 py-2 text-red-500">{item.site_down}</td>
                      <td className="px-4 py-2">
                        {item.site_up}/{item.total_sites}
                      </td>
                      <td className="px-4 py-2 text-blue-600">{item.total_active_customers}</td>
                      <td className="px-4 py-2 text-blue-600">{item.total_revenue} Br.</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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