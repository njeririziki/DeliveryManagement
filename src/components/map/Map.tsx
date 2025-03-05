import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect } from 'react';

const INITIAL_CENTER: [number, number] = [
  -74.0242,
  40.6941
]
const INITIAL_ZOOM = 10.12

export const accessToken = (mapboxgl.accessToken = 'pk.eyJ1IjoibmplcmlrYXJpdWtpIiwiYSI6ImNtN3E5Ymo1aDBsMHEyanNkbHdhd2U2NnYifQ.iQcPDg1o_dbOD5PKkcpiPw');

interface MapProps {
  data: [number, number];
}

const Map: React.FC<MapProps> = ({data}) => {

    const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainer.current) {
      const mapInstance =(mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
      })
    );

        
      new mapboxgl.Marker()
      .setLngLat(INITIAL_CENTER)
      .addTo(mapRef.current);

    new mapboxgl.Marker({ color: 'black', rotation: 45 })
      .setLngLat(data)
      .addTo(mapRef.current);

      const coordinates = [INITIAL_CENTER, data];

      const line: GeoJSON.Feature<GeoJSON.Geometry> = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates,
        },
      };

      mapInstance.on('load', () => {
        const bounds = new mapboxgl.LngLatBounds();
          
        coordinates.forEach(coord => bounds.extend(coord));
      
        mapInstance.fitBounds(bounds, { padding: 50, maxZoom: 12, duration: 1000 });

        mapInstance.addSource('line', {
          type: 'geojson',
          data: line,
        });

        mapInstance.addLayer({
          id: 'line',
          type: 'line',
          source: 'line',
          layout: {
        'line-join': 'round',
        'line-cap': 'round',
          },
          paint: {
       "line-color": "#ff0000",
        'line-width': 4,
          },
        });
      });
      return () => {
        mapInstance.remove();
      };
      
    
    }
  }, [data]);

  return (
    <div ref={mapContainer} style={{ width: '50vw', height: '50vh' }} />
  );
};

export default Map;