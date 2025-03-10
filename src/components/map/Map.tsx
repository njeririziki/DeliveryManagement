import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";
import { MapDefaultCenter, MapDefaultZoom } from "../../utils/constants";
import Marker from "./Marker";
import { Feature } from "../../types";
import { Avatar } from "antd";
import Package from '../../assets/package.jpg'
import Warehouse from "../../assets/warehouse.jpg";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN


interface MapProps {
  type: string;
   data:Feature[];
}

const Map: React.FC<MapProps> = ({type, data }) => {
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

        createMultipleRoutes();
      
      });


      return () => {
        mapInstance.remove();
      };
    }
  }, []);

  useEffect(() => {
 
    if (mapRef.current) {
        
        if(type === "point"){
         mapRef.current.flyTo({ center: data[0].coordinates, zoom:6, essential: true });
        }
         else if (type === "singleLine") {
          // const bounds = new mapboxgl.LngLatBounds();
          
          mapRef.current?.fitBounds([MapDefaultCenter, data[0].coordinates], { padding: 50, duration: 1000 });
          mapRef.current?.setZoom(mapRef.current.getZoom() - 0.5);

      } else if (type === "multipleLines") {
        const bounds = new mapboxgl.LngLatBounds();
        data.forEach((coord) => bounds.extend(coord.coordinates));
  
        mapRef.current?.fitBounds(bounds, { padding: 50, duration: 1000 });
        mapRef.current?.setZoom(mapRef.current.getZoom() - 1);

        // Add source and layer for each feature connecting to the warehouse
      //  createMultipleRoutes();
      }
    }
  }, [data]);

  const createMultipleRoutes = () => {

    if (!mapRef.current) return;
   if(type === 'point') return;
    data.forEach((feature, index) => {
      mapRef.current?.addSource(`feature-${index}`, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates:feature.ordercoordinates ?[MapDefaultCenter,feature.ordercoordinates]:[MapDefaultCenter, feature.coordinates]
          },
          properties: {
            title: feature.featureName,
            icon: "warehouse",
          },
        },
      });
     mapRef.current?.addLayer({
        id: `feature-${index}`,
        type: "line",
        source: `feature-${index}`,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#607d8b", "line-width": 4 },
      });
      
      if (feature.ordercoordinates) {
        mapRef.current?.addSource(`feature-1${index}`, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [feature.ordercoordinates, feature.coordinates],
            },
            properties: {
              title: feature.featureName,
              icon: "warehouse",
            },
          },
        });
        mapRef.current?.addLayer({
          id: `feature-1${index}`,
          type: "line",
          source: `feature-1${index}`,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#263238", "line-width": 4 },
        });
      }
     
    });
  };
  
  

  return (
    <div ref={mapContainer} className="w-full h-screen">
      {mapLoaded && mapRef.current && (
      <>
        <Marker map={mapRef.current} coordinates={MapDefaultCenter}>
        <Avatar src={Warehouse} alt="avatar" />
        </Marker>
        {data.map((feature, index) => (
          mapRef.current && (
            <>
            {feature.ordercoordinates && (
               <Marker map={mapRef.current} coordinates={feature.ordercoordinates}>
               <Avatar  src={Package} alt='avatar' />
               </Marker>)}
            <Marker
              key={index}
              map={mapRef.current}
              coordinates={feature.coordinates}
            >
              <Avatar
                src={feature.avatar}
                alt="avatar"
              />

            </Marker>
            </>
          )
        ))}
      </>
      )}
    </div>
  );
};

export default Map;


