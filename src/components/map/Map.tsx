import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";
import { MapDefaultCenter, MapDefaultZoom } from "../../utils/constants";
import Marker from "./Marker";
import { User } from "../../types";

export const accessToken = (mapboxgl.accessToken =
  "pk.eyJ1IjoibmplcmlrYXJpdWtpIiwiYSI6ImNtN3E5Ymo1aDBsMHEyanNkbHdhd2U2NnYifQ.iQcPDg1o_dbOD5PKkcpiPw");

interface MapProps {
  data: User[];
}

const Map: React.FC<MapProps> = ({ data,  }) => {
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
        setMapLoaded(true);
      });

      new mapboxgl.Marker({ color: "black", rotation: 45 })
        .setLngLat(MapDefaultCenter)
        .addTo(mapInstance);

      return () => {
        mapInstance.remove();
      };
    }
  }, []);

  return (
    <div ref={mapContainer} style={{ width: "50vw", height: "50vh" }}>
      {mapLoaded && data &&
        mapRef.current &&
        data.map((user, index) => (
          mapRef.current && <Marker key={index} map={mapRef.current} feature={user} itemname="item" />
        ))
      }
    </div>
  );
};

export default Map;
