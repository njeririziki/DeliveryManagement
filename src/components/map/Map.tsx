import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect, useState } from 'react';

const INITIAL_CENTER = [
  -74.0242,
  40.6941
]
const INITIAL_ZOOM = 10.12

export const accessToken = (mapboxgl.accessToken = 'pk.eyJ1IjoibmplcmlrYXJpdWtpIiwiYSI6ImNtN3E5Ymo1aDBsMHEyanNkbHdhd2U2NnYifQ.iQcPDg1o_dbOD5PKkcpiPw');

const Map: React.FC = () => {

    const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null);
 
 // const [mapLoaded, setMapLoaded] = useState(false)


  useEffect(() => {
    if (mapContainer.current) {
      const mapInstance =(mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
      })
    );

      mapInstance.on('load', () => {
      //  onLoad(mapInstance)
      //  setMapLoaded(true)
      });
    
      return () => {
        mapInstance.remove();
      };
      
    
    }
  }, []);

  return (
    <div ref={mapContainer} style={{ width: '50vw', height: '50vh' }} />
  );
};

export default Map;