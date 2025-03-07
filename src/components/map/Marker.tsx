import { useEffect,useRef } from "react";
import mapboxgl from 'mapbox-gl'
import Package from '../../assets/package.jpg'
import { Map } from 'mapbox-gl';
import { User } from "../../types";
import { Avatar,Typography } from "antd";


interface MarkerProps {
  map: Map;
  feature: User;
  itemname: string;
}

const Marker = ({ map, feature }: MarkerProps) => {

    const markerRef = useRef<mapboxgl.Marker | null>(null);
    const markerEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const coord: [number, number] = [+feature.address.geo.lng, +feature.address.geo.lat];
        if (!markerEl.current) return;

        const marker = new mapboxgl.Marker({
            element: markerEl.current as HTMLElement
          })
        .setLngLat(coord) 
         .addTo(map);
    
      marker.addTo(map);

      markerRef.current = marker
    }, [feature,map]);


    return (
        <div>
            <div ref={markerEl} style={{}} >
                <Avatar  
                src={feature.name? `https://api.dicebear.com/7.x/miniavs/svg?seed=${feature.id}` : Package} 
                
                 alt='avatar'/>
                <Typography.Text>{feature.name}</Typography.Text>
           
            </div>
        </div>
      );
}
 
export default Marker;