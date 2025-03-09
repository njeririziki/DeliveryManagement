import { useEffect,useRef } from "react";
import mapboxgl from 'mapbox-gl'
import { Map } from 'mapbox-gl';
import { Avatar } from 'antd';
import User1 from '../../assets/user1.jpg';

interface MarkerProps {
  map: Map;
  children: React.ReactNode
 // type: string;
  coordinates: [number, number];
 
}

const Marker = ({ map, coordinates,children }: MarkerProps) => {

    const markerRef = useRef<mapboxgl.Marker | null>(null);
    const markerEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const coord: [number, number] = coordinates;
        if (!markerEl.current) return;

        const marker = new mapboxgl.Marker({
            element: markerEl.current as HTMLElement
          })
        .setLngLat(coord) 
         .addTo(map);
    
      marker.addTo(map);

      markerRef.current = marker
    }, [coordinates,map]);


    return (
        <div>
            <div ref={markerEl} style={{}} >
            {children}
               
            </div>
        </div>
      );
}
 
export default Marker;
