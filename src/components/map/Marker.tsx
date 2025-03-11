import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Map } from "mapbox-gl";

interface MarkerProps {
  map: Map;
  children: React.ReactNode;
  feature: {
    title: string;
    description: string;
  };
  coordinates: [number, number];
}

const Marker = ({ map, coordinates, children, feature }: MarkerProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const markerEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coord: [number, number] = coordinates;
    if (!markerEl.current) return;

    const marker = new mapboxgl.Marker({
      element: markerEl.current as HTMLElement,
    })
      .setLngLat(coord)
      .addTo(map);

    marker.addTo(map);

    markerRef.current = marker;
  }, [coordinates, map]);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    let popup;

    if (children) {
      popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true,
        closeOnMove: true,
        maxWidth: "300px",
        offset: 14,
      }).setHTML(`<p>${feature.title}</p><p>${feature.description}</p>`);
    }
    // if popup is undefined, this will remove the popup from the marker
    marker.setPopup(popup);
  }, [children, feature]);
  return (
    <div>
      <div ref={markerEl}>{children}</div>
    </div>
  );
};

export default Marker;
