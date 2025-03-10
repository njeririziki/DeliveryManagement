import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";
import { MapDefaultCenter, MapDefaultZoom } from "../../utils/constants";
import Marker from "./Marker";
import { Feature } from "../../types";
import { Avatar } from "antd";
//import Package from '../../assets/package.jpg'
import Warehouse from "../../assets/warehouse.jpg";
//import FeatureCard from "./FeatureCard";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN


interface MapProps {
   data:Feature[];
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
    console.log({alotOfData:data});
       
    if (mapRef.current) {
      if (data.length === 1) {    
      mapRef.current.flyTo({ center: data[0].coordinates, zoom:6, essential: true });
      } else if (data.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        data.forEach((coord) => bounds.extend(coord.coordinates));
  
        mapRef.current?.fitBounds(bounds, { padding: 50, duration: 1000 });
        mapRef.current?.setZoom(mapRef.current.getZoom() - 0.7);
      }
    }
  }, [data]);

  return (
    <div ref={mapContainer} className="w-full h-screen">
      {mapLoaded && mapRef.current && (
      <>
        <Marker map={mapRef.current} coordinates={MapDefaultCenter}>
        <Avatar src={Warehouse} alt="avatar" />
        </Marker>
        {data.map((feature, index) => (
          mapRef.current && (
            <Marker
              key={index}
              map={mapRef.current}
              coordinates={feature.coordinates}
            >

              <Avatar
                src={feature.avatar}
                alt="avatar"
              />

              {/* <FeatureCard avatar={feature.avatar}
              feature={{featureName:feature.featureName}} /> */}
              
            </Marker>
          )
        ))}
      </>
      )}
    </div>
  );
};

export default Map;


