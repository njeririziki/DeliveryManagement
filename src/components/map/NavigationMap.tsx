import { useEffect, useState, useRef} from "react";
import mapboxgl from "mapbox-gl";
import { Order} from "../../types";
import Marker from "./Marker";
import Warehouse from '../../assets/warehouse.jpg';
import User1 from '../../assets/user1.jpg';
import Package from '../../assets/package.jpg';
import { Avatar } from "antd";
import { FC } from "react";
import { MapDefaultCenter, MapDefaultZoom } from "../../utils/constants";



mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface OrderMapProps {
  // order: OrderFeature;
  order: Order
}

const OrderMap: FC<OrderMapProps> = ({ order }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
   const [mapLoaded, setMapLoaded] = useState(false);



  useEffect(() => {
    if ( mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: MapDefaultCenter, //[-75.1652, 39.9526], 
        zoom: MapDefaultZoom //6,
      });

     

      map.current.on("load", () => {
         setMapLoaded(true);
         createRoute();
      });
    }

      return () => map.current?.remove();
  }, []);
  
;

    
    const createRoute =  () => {
       if (!map.current) return;

        const coordinates =[
          [order.warehouseLocation.lng, order.warehouseLocation.lat],
          [order.orderLocation.lng, order.orderLocation.lat],
          [order.destinationLocation.lng, order.destinationLocation.lat]
        ];  

       
        const bounds = new mapboxgl.LngLatBounds();
        coordinates.forEach((coord) => bounds.extend(new mapboxgl.LngLat(coord[0], coord[1])));
  
        map.current?.fitBounds(bounds, { padding: 50, duration: 1000 });
        map.current?.setZoom(map.current.getZoom() - 0.5);

        map.current?.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: [coordinates[0], coordinates[1]] },
          },
        });

        map.current?.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#90a4ae", "line-width": 4 },
        });

       
      map.current?.addSource("route2", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: [coordinates[1],coordinates[2]] },
        },
      });

      map.current?.addLayer({
        id: "route2",
          type: "line",
          source: "route2",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#546e7a", "line-width": 4 },
      });

      
      };
    
    
    

  return (
    <div ref={mapContainer} className="w-full h-screen">
      {mapLoaded && map.current && (
       <>
        <Marker map={map.current} coordinates={[order.warehouseLocation.lng, order.warehouseLocation.lat]}>
        <Avatar  src={Warehouse} alt='avatar' />
        </Marker>
        <Marker map={map.current} coordinates={[order.orderLocation.lng, order.orderLocation.lat]}>
        <Avatar  src={Package} alt='avatar' />
        </Marker>
        <Marker map={map.current} coordinates={[order.destinationLocation.lng, order.destinationLocation.lat]}>
        <Avatar  src={User1} alt='avatar' />
        </Marker>
        </>
      )}
    </div>
  );
};

export default OrderMap;
