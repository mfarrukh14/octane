"use client";
import React, { lazy, Suspense } from "react";

const World = lazy(() => 
    import("./Globe").then((m) => ({ default: m.World }))
);

// Lightweight fallback that matches the globe container dimensions
const GlobeFallback = () => (
    <div className="w-full h-full bg-transparent flex items-center justify-center">
        <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-2"></div>
            <p className="text-white/40 text-xs">Initializing globe...</p>
        </div>
    </div>
);

export function GlobeDemo() {
    const globeConfig = {
        pointSize: 1,
        globeColor: "#062056",
        showAtmosphere: true,
        atmosphereColor: "rgb(255, 255, 255)",
        emissive: "#062056",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "rgba(255,255,255,0.7)",
        ambientLight: "#38bdf8",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 800,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 22.3193, lng: 114.1694 },
        autoRotate: true,
        autoRotateSpeed: 0.5,
    };
    const colors = ["#FFBF00", "#a769e9"];
    const sampleArcs = [
        {
            order: 1,
            startLat: -19.885592,
            startLng: -43.951191,
            endLat: -22.9068,
            endLng: -43.1729,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 1,
            startLat: 28.6139,
            startLng: 77.209,
            endLat: 3.139,
            endLng: 101.6869,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 1,
            startLat: -19.885592,
            startLng: -43.951191,
            endLat: -1.303396,
            endLng: 36.852443,
            arcAlt: 0.5,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 2,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 2,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 3.139,
            endLng: 101.6869,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 2,
            startLat: -15.785493,
            startLng: -47.909029,
            endLat: 36.162809,
            endLng: -115.119411,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 3,
            startLat: -33.8688,
            startLng: 151.2093,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 3,
            startLat: 21.3099,
            startLng: -157.8581,
            endLat: 40.7128,
            endLng: -74.006,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 3,
            startLat: -6.2088,
            startLng: 106.8456,
            endLat: 51.5072,
            endLng: -0.1276,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 4,
            startLat: 11.986597,
            startLng: 8.571831,
            endLat: -15.595412,
            endLng: -56.05918,
            arcAlt: 0.5,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 4,
            startLat: -34.6037,
            startLng: -58.3816,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.7,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 4,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 48.8566,
            endLng: -2.3522,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 5,
            startLat: 14.5995,
            startLng: 120.9842,
            endLat: 51.5072,
            endLng: -0.1276,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 5,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: -33.8688,
            endLng: 151.2093,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 5,
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 48.8566,
            endLng: -2.3522,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 6,
            startLat: -15.432563,
            startLng: 28.315853,
            endLat: 1.094136,
            endLng: -63.34546,
            arcAlt: 0.7,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 6,
            startLat: 37.5665,
            startLng: 126.978,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 6,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: 51.5072,
            endLng: -0.1276,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 7,
            startLat: -19.885592,
            startLng: -43.951191,
            endLat: -15.595412,
            endLng: -56.05918,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 7,
            startLat: 48.8566,
            startLng: -2.3522,
            endLat: 52.52,
            endLng: 13.405,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 7,
            startLat: 52.52,
            startLng: 13.405,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 8,
            startLat: -8.833221,
            startLng: 13.264837,
            endLat: -33.936138,
            endLng: 18.436529,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 8,
            startLat: 49.2827,
            startLng: -123.1207,
            endLat: 52.3676,
            endLng: 4.9041,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 8,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: 40.7128,
            endLng: -74.006,
            arcAlt: 0.5,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 9,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 9,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: -22.9068,
            endLng: -43.1729,
            arcAlt: 0.7,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 9,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: -34.6037,
            endLng: -58.3816,
            arcAlt: 0.5,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 10,
            startLat: -22.9068,
            startLng: -43.1729,
            endLat: 28.6139,
            endLng: 77.209,
            arcAlt: 0.7,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 10,
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 31.2304,
            endLng: 121.4737,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 10,
            startLat: -6.2088,
            startLng: 106.8456,
            endLat: 52.3676,
            endLng: 4.9041,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 11,
            startLat: 41.9028,
            startLng: 12.4964,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 11,
            startLat: -6.2088,
            startLng: 106.8456,
            endLat: 31.2304,
            endLng: 121.4737,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 11,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: 1.3521,
            endLng: 103.8198,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 12,
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 37.7749,
            endLng: -122.4194,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 12,
            startLat: 35.6762,
            startLng: 139.6503,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 12,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 13,
            startLat: 52.52,
            startLng: 13.405,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 13,
            startLat: 11.986597,
            startLng: 8.571831,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 13,
            startLat: -22.9068,
            startLng: -43.1729,
            endLat: -34.6037,
            endLng: -58.3816,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 14,
            startLat: -33.936138,
            startLng: 18.436529,
            endLat: 21.395643,
            endLng: 39.883798,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        // Additional arcs with varied sizes
        {
            order: 15,
            startLat: 55.7558,
            startLng: 37.6176,
            endLat: 39.9042,
            endLng: 116.4074,
            arcAlt: 0.8, // Large arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 15,
            startLat: 40.7128,
            startLng: -74.006,
            endLat: 55.7558,
            endLng: 37.6176,
            arcAlt: 0.9, // Large arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 16,
            startLat: -1.2921,
            startLng: 36.8219,
            endLat: 30.0444,
            endLng: 31.2357,
            arcAlt: 0.05, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 16,
            startLat: 25.2048,
            startLng: 55.2708,
            endLat: 24.7136,
            endLng: 46.6753,
            arcAlt: 0.08, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 17,
            startLat: -26.2041,
            startLng: 28.0473,
            endLat: 6.5244,
            endLng: 3.3792,
            arcAlt: 0.4, // Medium arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 17,
            startLat: 19.4326,
            startLng: -99.1332,
            endLat: 4.7110,
            endLng: -74.0721,
            arcAlt: 0.3, // Medium arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 18,
            startLat: 59.9139,
            startLng: 10.7522,
            endLat: 64.1466,
            endLng: -21.9426,
            arcAlt: 0.15, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 18,
            startLat: 41.0082,
            startLng: 28.9784,
            endLat: 33.6844,
            endLng: 73.0479,
            arcAlt: 0.6, // Large arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 19,
            startLat: 12.9716,
            startLng: 77.5946,
            endLat: 18.5204,
            endLng: 73.8567,
            arcAlt: 0.06, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 19,
            startLat: -37.8136,
            startLng: 144.9631,
            endLat: -41.2865,
            endLng: 174.7762,
            arcAlt: 0.12, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 20,
            startLat: 13.7563,
            startLng: 100.5018,
            endLat: 21.0285,
            endLng: 105.8542,
            arcAlt: 0.09, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 20,
            startLat: 45.4215,
            startLng: -75.6972,
            endLat: 56.1304,
            endLng: -106.3468,
            arcAlt: 0.25, // Medium arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 21,
            startLat: -23.5505,
            startLng: -46.6333,
            endLat: -12.0464,
            endLng: -77.0428,
            arcAlt: 0.35, // Medium arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 21,
            startLat: 35.6762,
            startLng: 139.6503,
            endLat: -37.8136,
            endLng: 144.9631,
            arcAlt: 0.85, // Large arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 22,
            startLat: 50.1109,
            startLng: 8.6821,
            endLat: 47.3769,
            endLng: 8.5417,
            arcAlt: 0.04, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 22,
            startLat: 60.1282,
            startLng: 18.6435,
            endLat: 55.6761,
            endLng: 12.5683,
            arcAlt: 0.07, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 23,
            startLat: 31.2304,
            startLng: 121.4737,
            endLat: 1.3521,
            endLng: 103.8198,
            arcAlt: 0.45, // Medium arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 23,
            startLat: 14.0583,
            startLng: 108.2772,
            endLat: 16.0544,
            endLng: 108.2022,
            arcAlt: 0.03, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 24,
            startLat: 26.2041,
            startLng: 50.5860,
            endLat: 24.7136,
            endLng: 46.6753,
            arcAlt: 0.11, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 24,
            startLat: -34.6118,
            startLng: -58.3960,
            endLat: -33.4489,
            endLng: -70.6693,
            arcAlt: 0.18, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 25,
            startLat: 40.7128,
            startLng: -74.006,
            endLat: -33.8688,
            endLng: 151.2093,
            arcAlt: 1.0, // Very large arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 25,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.95, // Very large arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 26,
            startLat: 37.7749,
            startLng: -122.4194,
            endLat: 55.7558,
            endLng: 37.6176,
            arcAlt: 0.9, // Large arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 26,
            startLat: 23.1291,
            startLng: 113.2644,
            endLat: 25.2048,
            endLng: 55.2708,
            arcAlt: 0.65, // Large arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 27,
            startLat: 52.3676,
            startLng: 4.9041,
            endLat: 50.8503,
            endLng: 4.3517,
            arcAlt: 0.02, // Very small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 27,
            startLat: 43.6532,
            startLng: -79.3832,
            endLat: 42.3601,
            endLng: -71.0589,
            arcAlt: 0.13, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 28,
            startLat: 28.6139,
            startLng: 77.209,
            endLat: 40.7128,
            endLng: -74.006,
            arcAlt: 0.8, // Large arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 28,
            startLat: -1.2921,
            startLng: 36.8219,
            endLat: -17.8252,
            endLng: 31.0522,
            arcAlt: 0.22, // Medium arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 29,
            startLat: 39.9042,
            startLng: 116.4074,
            endLat: 37.5665,
            endLng: 126.978,
            arcAlt: 0.16, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 29,
            startLat: 6.9271,
            startLng: 79.8612,
            endLat: 8.5241,
            endLng: 76.9366,
            arcAlt: 0.05, // Small arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 30,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 28.6139,
            endLng: 77.209,
            arcAlt: 0.7, // Large arc
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
    ];    return (
        <div className="flex h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-screen w-full bg-transparent dark:bg-transparent">
            <div className="relative w-full h-full overflow-hidden">
                {/* globe container now truly full‑size */}
                <div className="absolute inset-0 z-10">
                    <Suspense fallback={<GlobeFallback />}>
                        <World data={sampleArcs} globeConfig={globeConfig} />
                    </Suspense>
                </div>
                  {/* Gradient Fade Overlays - Left, Right, and Bottom edges */}
                {/* Left fade */}
                <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none z-20 rounded-r-3xl"></div>
                
                {/* Right fade */}
                <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black via-black/70 to-transparent pointer-events-none z-20 rounded-l-3xl"></div>
                
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-20 rounded-t-3xl"></div>
            </div>
        </div>
    );
}
