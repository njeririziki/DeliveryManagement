import { useEffect,useRef , useState } from "react";
import mapboxgl from 'mapbox-gl'
import { Map } from 'mapbox-gl';
// import { Avatar } from 'antd';
// import User1 from '../../assets/user1.jpg';

interface MarkerProps {
  map: Map;
  children: React.ReactNode
 // type: string;
  coordinates: [number, number];
 
}

const Marker = ({ map, coordinates,children }: MarkerProps) => {

    const markerRef = useRef<mapboxgl.Marker | null>(null);

    const markerEl = useRef<HTMLDivElement>(null);
    const popupEl = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState(false)
  
    const handlePopupOpen = () => {
      setActive(true)
    }
  
    const handlePopupClose = () => {
      setActive(false)
    }
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

    useEffect(() => {
      const marker = markerRef.current
      if (!marker) return
  
      let popup
  
      if (children) {
        popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: true,
          closeOnMove: true,
          maxWidth: '300px',
          offset: 14
        })
        .setHTML(popupEl.current?.outerHTML || '')
          .on('open', handlePopupOpen)
          .on('close', handlePopupClose)
      }
  
      // if popup is undefined, this will remove the popup from the marker
      marker.setPopup(popup)
    }, [children])
    return (
        <div>
            <div ref={markerEl}  >           
               {children}
               

            </div>
        </div>
      );
}
 
export default Marker;
