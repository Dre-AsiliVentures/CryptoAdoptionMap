'use client';

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

//=======Coordinates Logic

const geoUrl =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type MarkerData = {
  name: string;
  coordinates: [number, number];
};

const WorldMap = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [adoptionData, setAdoptionData] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const progress = useMotionValue(0);

  // Default coords (used before data is ready)
  const from = markers[step]?.coordinates ?? [0, 0];
  const to = markers[step + 1]?.coordinates ?? [0, 0];

  const x = useTransform(progress, [0, 1], [from[0], to[0]]);
  const y = useTransform(progress, [0, 1], [from[1], to[1]]);

  // Fetch marker data from Python backend
  const fetchMarkers = async () => {
    try {
      const res = await fetch('http://localhost:8000/markers');
      const data = await res.json();
      setMarkers(data);
    } catch (err) {
      console.error('Failed to fetch markers:', err);
    }
  };

  useEffect(() => {
    fetchMarkers();
    const interval = setInterval(fetchMarkers, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (markers.length >= 2) {
      const animateProgress = () => {
        progress.set(0);
        animate(progress, 1, {
          duration: 3,
          onComplete: () => {
            setStep((prev) => (prev + 1) % (markers.length - 1));
          },
        });
      };

      animateProgress();
      const interval = setInterval(animateProgress, 3000);
      return () => clearInterval(interval);
    }
  }, [markers, progress]);
  //=== Adoption Logic


// Fetch adoption levels
const fetchAdoptionData = async () => {
  try {
    const res = await fetch('http://localhost:8000/adoption');
    const data = await res.json();
    setAdoptionData(data);
  } catch (err) {
    console.error('Failed to fetch adoption data:', err);
  }
};

useEffect(() => {
  fetchAdoptionData();
}, []);

// Utility to determine fill color based on level
const getFillColor = (name: string) => {
  const level = adoptionData[name];
  switch (level) {
    case "high":
      return "#00ff88";
    case "medium":
      return "#ffaa00";
    case "low":
      return "#ff4444";
    default:
      return "#2b2b2b"; // default background
  }
};

useEffect(() => {
  if (Object.keys(adoptionData).length > 0) {
    console.log("Loaded adoption levels:", Object.keys(adoptionData));
  }
}, [adoptionData]);


  //===========================
  if (markers.length < 2) return <div>Loading map...</div>;

  return (
    <div className="w-[90vw] h-[600px] bg-black">
      <ComposableMap projectionConfig={{ scale: 150 }}>
      <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              //console.log(geo.properties); // 👈 Country properties
              const countryName = geo.properties.NAME || geo.properties.name;
              //console.log(countryName);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: getFillColor(countryName),
                      stroke: '#888',
                    },
                    hover: { fill: '#444' },
                    pressed: { fill: '#222' },
                  }}
                />
              );
            })
          }
        </Geographies>

        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={6} fill="#00ffcc" stroke="#000" strokeWidth={1} />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fill: '#fff', fontSize: 12 }}
            >
              {name}
            </text>
          </Marker>
        ))}

         {/* Lat/lng Connecting Line */}

        <Line
          from={from}
          to={to}
          stroke="#00ffff"
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* Interpolated lat/lng marker */}
        <motion.div
          style={{ x, y }}
          className="absolute"
        >
          <Marker coordinates={[x.get(), y.get()]}>
            <circle
              r={6}
              fill="#00ffcc"
              stroke="#000"
              strokeWidth={1}
              style={{ filter: 'drop-shadow(0 0 6px #00ffcc)' }}
            />
          </Marker>
        </motion.div>

      </ComposableMap>
    </div>
  );
};

export default WorldMap;
