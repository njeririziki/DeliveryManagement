import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState, use } from "react";
import { MapDefaultCenter, MapDefaultZoom } from "../../utils/constants";
import Marker from "./Marker";
import { User } from "../../types";
import { Avatar } from "antd";
//import Package from '../../assets/package.jpg'
import Warehouse from "../../assets/warehouse.jpg";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
  // "pk.eyJ1IjoibmplcmlrYXJpdWtpIiwiYSI6ImNtN3E5Ymo1aDBsMHEyanNkbHdhd2U2NnYifQ.iQcPDg1o_dbOD5PKkcpiPw"


interface MapProps {
  data: User[];
}

const Map: React.FC<MapProps> = ({ data }) => {
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


      return () => {
        mapInstance.remove();
      };
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [+data[0].address.geo.lng, +data[0].address.geo.lat], zoom:6, essential: true });
    }
  }, [data]);

  return (
    <div ref={mapContainer} style={{ width: "50vw", height: "50vh" }}>
      {mapLoaded && mapRef.current && (
      <>
        <Marker map={mapRef.current} coordinates={MapDefaultCenter}>
        <Avatar src={Warehouse} alt="avatar" />
        </Marker>
        {data.map((user, index) => (
          mapRef.current && (
            <Marker
              key={index}
              map={mapRef.current}
              coordinates={[+user.address.geo.lng, +user.address.geo.lat]}
            >
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                alt="avatar"
              />
            </Marker>
          )
        ))}
      </>
      )}
    </div>
  );
};

export default Map;
