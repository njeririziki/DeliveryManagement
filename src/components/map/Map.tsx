import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState, useCallback } from "react";
import { MapDefaultCenter, MapDefaultZoom } from "../../utils/constants";
import Marker from "./Marker";
import { Feature } from "../../types";
import { Avatar } from "antd";
import Package from "../../assets/package.jpg";
import Warehouse from "../../assets/warehouse.jpg";
import { updateOrAddSource } from "./helpers";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface MapProps {
  type: string;
  data: Feature[];
}

const Map: React.FC<MapProps> = ({ type, data }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapContainer.current) {
      const mapInstance = (mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: MapDefaultCenter,
        zoom: MapDefaultZoom,
      }));

      mapInstance.on("load", () => {
        mapInstance.resize();
        setMapLoaded(true);

        createMultipleRoutes();
      });

      return () => {
        mapInstance.remove();
      };
    }
  }, []);

  const createMultipleRoutes = useCallback(() => {
  
    if (type === "point" || !mapRef.current) return;

    // Clear existing sources and layers
    const existingSources = mapRef.current?.getStyle()?.sources;
    if (existingSources) {
      Object.keys(existingSources).forEach((sourceId) => {
        if (
          sourceId.startsWith("feature-") ||
          sourceId.startsWith("feature-b")
        ) {
          if (mapRef.current?.getLayer(sourceId)) {
            mapRef.current.removeLayer(sourceId);
          }
          if (mapRef.current) {
            mapRef.current.removeSource(sourceId);
          }
        }
      });
    }

    // Add new sources and layers
    data.forEach((feature, index) => {
      const coordinates = feature.ordercoordinates
        ? [MapDefaultCenter, feature.ordercoordinates]
        : [MapDefaultCenter, feature.coordinates];

      updateOrAddSource(mapRef.current, `feature-${index}`, coordinates);

      if (feature.ordercoordinates) {
        updateOrAddSource(mapRef.current, `feature-b${index}`, [
          feature.ordercoordinates,
          feature.coordinates,
        ]);
      }
    });
  }, [data,type]);

  useEffect(() => {
    if (!mapRef.current) return;

    const flyToCoordinates = (coordinates: [number, number], zoom: number) => {
      mapRef.current!.flyTo({
        center: coordinates,
        zoom,
        essential: true,
      });
    };

    switch (type) {
      case "point":
        flyToCoordinates(data[0].coordinates, 9);
        break;
      case "singleLine":
        flyToCoordinates(data[0].ordercoordinates || data[0].coordinates, 2);
        break;
      case "multipleLines":
        flyToCoordinates(MapDefaultCenter, 1.5);
        break;
      default:
        break;
    }
  }, [data,type]);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      createMultipleRoutes();
    }
  }, [data]);

  return (
    <div ref={mapContainer} className="w-full h-screen">
      {mapLoaded && mapRef.current && (
        <>
          <Marker
            map={mapRef.current}
            feature={{ title: "Warehouse", description: "Loading Point" }}
            coordinates={MapDefaultCenter}
          >
            <Avatar src={Warehouse} alt="avatar" />
          </Marker>
          {data.map(
            (feature, index) =>
              mapRef.current && (
                <>
                  {feature.ordercoordinates && (
                    <Marker
                      map={mapRef.current}
                      feature={{
                        title: `TrackingID: ${feature.featureName}`,
                        description: `Destination: ${feature.address}`,
                      }}
                      coordinates={feature.ordercoordinates}
                    >
                      <Avatar src={Package} alt="avatar" />
                    </Marker>
                  )}
                  <Marker
                    key={index}
                    map={mapRef.current}
                    coordinates={feature.coordinates}
                    feature={{
                      title: feature.customerName || feature.featureName,
                      description: feature.address,
                    }}
                  >
                    <Avatar src={feature.avatar} alt="avatar" />
                  </Marker>
                </>
              )
          )}
        </>
      )}
    </div>
  );
};

export default Map;
