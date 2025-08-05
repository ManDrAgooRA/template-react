// @ts-ignore
import { ScatterplotLayer } from "@deck.gl/layers";
// @ts-ignore
import DeckGL from "@deck.gl/react";
import { useState, useMemo } from "react";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const INITIAL_VIEW_STATE = {
  longitude: -0.09,
  latitude: 51.505,
  zoom: 10.5, // Zoomed out for larger bounds
  pitch: 0,
  bearing: 0,
};

const LONDON_BOUNDS = {
  minLng: -0.93245,
  maxLng: 0.75615,
  minLat: 51.08425,
  maxLat: 51.89445,
};

const randomDescriptions = [
  "Located in a vibrant neighborhood.",
  "Popular among locals.",
  "Recently renovated.",
  "Highly rated by customers.",
  "Close to public transport.",
  "Surrounded by parks and cafes.",
  "Family-friendly area.",
  "Modern and well-equipped.",
];

const getRandomDescription = () => randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];

const generateMockPoints = (count: number, prefix: string) =>
  Array.from({ length: count }, (_, i) => ({
    position: [
      Math.random() * (LONDON_BOUNDS.maxLng - LONDON_BOUNDS.minLng) + LONDON_BOUNDS.minLng,
      Math.random() * (LONDON_BOUNDS.maxLat - LONDON_BOUNDS.minLat) + LONDON_BOUNDS.minLat,
    ],
    name: `${prefix} #${i + 1}`,
    description: getRandomDescription(),
  }));

const CATEGORY_CONFIG = {
  Shops: { color: [255, 140, 0], count: 1000 },
  Kindergartens: { color: [0, 140, 255], count: 100 },
  Gyms: { color: [180, 50, 255], count: 150 },
  Hotels: { color: [0, 200, 140], count: 120 },
  Restaurants: { color: [240, 90, 90], count: 200 },
  Cafes: { color: [90, 180, 255], count: 200 },
  Schools: { color: [100, 200, 100], count: 150 },
} as const;

type CategoryName = keyof typeof CATEGORY_CONFIG;

const categoryData: Record<CategoryName, unknown[]> = Object.entries(CATEGORY_CONFIG).reduce(
  (acc, [name, cfg]) => {
    acc[name as CategoryName] = generateMockPoints(cfg.count, name);
    return acc;
  },
  {} as Record<CategoryName, unknown[]>,
);

export default function App() {
  const [visibleCategories, setVisibleCategories] = useState<Record<CategoryName, boolean>>(() =>
    Object.keys(CATEGORY_CONFIG).reduce((acc, key) => ({ ...acc, [key]: true }), {} as Record<CategoryName, boolean>),
  );

  const visibleLayers = useMemo(() => {
    return Object.entries(CATEGORY_CONFIG).flatMap(([category, config]) =>
      visibleCategories[category as CategoryName]
        ? [
            new ScatterplotLayer({
              id: category,
              data: categoryData[category as CategoryName],
              getPosition: (d: { position: number[] }) => d.position,
              getFillColor: config.color,
              radiusMinPixels: 5,
              pickable: true,
              opacity: 0.85,
            }),
          ]
        : [],
    );
  }, [visibleCategories]);

  return (
    <>
      {/* UI: Category toggles */}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          background: "white",
          padding: "12px",
          borderRadius: "8px",
          margin: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}>
        {Object.keys(CATEGORY_CONFIG).map((cat) => (
          <label
            key={cat}
            style={{ display: "block", marginBottom: "6px" }}>
            <input
              type="checkbox"
              checked={visibleCategories[cat as CategoryName]}
              onChange={(e) =>
                setVisibleCategories((prev) => ({
                  ...prev,
                  [cat]: e.target.checked,
                }))
              }
            />{" "}
            Show {cat}
          </label>
        ))}
      </div>

      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={visibleLayers}
        getTooltip={({ object }: { object: { name: string; description: string } }) =>
          object ? `${object.name}\n${object.description}` : null
        }>
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/light-v10"
          reuseMaps
          // @ts-ignore
          preventStyleDiffing
        />
      </DeckGL>
    </>
  );
}
