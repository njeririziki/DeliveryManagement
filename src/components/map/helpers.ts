

export const updateOrAddSource = (map: mapboxgl.Map | null, id: string, coords: [number, number][]) => {
    const source = map!.getSource(id) as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: coords },
      });
    } else {
      map!.addSource(id, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: coords },
          properties: {},
        },
      });
      map!.addLayer({
        id,
        type: "line",
        source: id,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: id.includes("b") ? { "line-color": "#263238", "line-width": 4 } :
        { "line-color": "#78909c", "line-width": 4, 'line-dasharray': [2, 2] },
      });
    }
  };