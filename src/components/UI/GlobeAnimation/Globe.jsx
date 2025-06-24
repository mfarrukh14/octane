import React, { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, SphereGeometry, MeshBasicMaterial, Mesh, DataTexture, RGBAFormat, NearestFilter, AdditiveBlending, PlaneGeometry, DoubleSide } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import countries from "../../../../data/globe.json"

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

// Responsive camera distance based on screen size
const getResponsiveCameraZ = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 768) return 600; // Mobile - move camera further back
    if (width < 1024) return 350; // Tablet - slightly further back
    return 300; // Desktop - original distance
  }
  return 300;
};

let numbersOfRings = [0];

// Pixelated Noise Mask Component
function PixelatedNoiseMask() {
  const meshRef = useRef();
  const [noiseTexture, setNoiseTexture] = useState(null);

  useEffect(() => {
    // Create a pixelated noise texture
    const size = 1800; // Higher resolution for better coverage
    const data = new Uint8Array(size * size * 4);

    for (let i = 0; i < size * size; i++) {
      const stride = i * 4;
      const noise = Math.random();
      
      // 1 out of every 5 pixels should be gray (noise)
      const shouldBeNoise = noise < 0.65; // 20% chance = 1 out of 5
      
      if (shouldBeNoise) {
        // 50% gray noise pixel
        data[stride] = 128;     // R (50% gray = 128/255)
        data[stride + 1] = 128; // G (50% gray = 128/255)
        data[stride + 2] = 128; // B (50% gray = 128/255)
        data[stride + 3] = 100; // A (fully opaque)
      } else {
        // Transparent pixel
        data[stride] = 0;       // R
        data[stride + 1] = 0;   // G  
        data[stride + 2] = 0;   // B
        data[stride + 3] = 0;   // A (fully transparent)
      }
    }

    const texture = new DataTexture(data, size, size, RGBAFormat);
    texture.needsUpdate = true;
    texture.magFilter = NearestFilter; // NearestFilter for pixelated effect
    texture.minFilter = NearestFilter; // NearestFilter for pixelated effect
    
    setNoiseTexture(texture);
  }, []);

  // Animate the noise mask
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.0; // Slow rotation around Y axis
      meshRef.current.rotation.x = time * 0.0; // Very slow rotation around X axis
    }
  });

  if (!noiseTexture) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[102, 64, 64]} />
      <meshBasicMaterial 
        map={noiseTexture}
        transparent={true}
        opacity={1}
        color="rgb(148, 148, 148)"
      />
    </mesh>
  );
}

// Satellite Cards Component
function SatelliteCards() {
  const satelliteGroupRef = useRef();
  const { camera } = useThree();
    // Sample card data - positioned equidistantly around equator
  const cardData = [
    {
      id: 1,
      title: "Unlimited insured inventory storage",
      subtitle: "",
      subtitle2: "",
      position: { lat: 30, lng: 0 }, // Prime Meridian
      color: "#00ff88"
    },
    {
      id: 2,
      title: "Shipped to 150+ countries",
      subtitle: "",
      subtitle2: "",
      position: { lat: 30, lng: 90 }, // 90° East
      color: "#ff6b6b"
    },
    {
      id: 3,    
      title: "Serves 1 million customers",
      subtitle: "",
      subtitle2: "",
      position: { lat: 10, lng: 180 }, // 180° (International Date Line)
      color: "#4ecdc4"
    },
    {
      id: 4,
      title: "Unlimited product listings",
      subtitle: "",
      subtitle2: "",
      position: { lat: 10, lng: 270 }, // 270° West (or -90°)
      color: "#45b7d1"
    }
  ];
  // Convert lat/lng to 3D position above globe surface
  const latLngToVector3 = (lat, lng, altitude = 140) => {
    // Adjust altitude based on screen size for better visibility
    const responsiveAltitude = typeof window !== 'undefined' && window.innerWidth < 768 
      ? altitude * 1.2 // Increase altitude on mobile for better spacing
      : altitude;
      
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    return new Vector3(
      -responsiveAltitude * Math.sin(phi) * Math.cos(theta),
      responsiveAltitude * Math.cos(phi),
      responsiveAltitude * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Store refs for each card to control their rotation
  const cardRefs = useRef([]);

  // Animate satellite cards rotation with earth and make them face camera
  useFrame((state) => {
    if (satelliteGroupRef.current) {
      const time = state.clock.getElapsedTime();
      // Rotate with the same speed as earth (adjust multiplier to match globe rotation)
      satelliteGroupRef.current.rotation.y = time * 0.01; // Adjust speed as needed
    }

    // Make each card face the camera and control visibility/scale based on angle
    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef && camera) {
        cardRef.lookAt(camera.position);
        
        // Calculate if card is behind the globe
        const cardPosition = new Vector3();
        cardRef.getWorldPosition(cardPosition);
        
        // Calculate distance from globe center to camera
        const globeCenter = new Vector3(0, 0, 0);
        const cameraToGlobe = new Vector3().subVectors(camera.position, globeCenter);
        const cardToGlobe = new Vector3().subVectors(cardPosition, globeCenter);
        
        // Check if card is on the opposite side of globe from camera
        const dot = cameraToGlobe.dot(cardToGlobe);
        
        if (dot < 0) {
          // Card is behind the globe - hide it completely
          cardRef.visible = false;
        } else {
          // Card is on the same side as camera - show it
          cardRef.visible = true;
        }
      }
    });
  });

  return (
    <group ref={satelliteGroupRef}>
      {cardData.map((card, index) => {
        const position = latLngToVector3(card.position.lat, card.position.lng);
        
        return (
          <group key={card.id} position={[position.x, position.y, position.z]}>
            {/* Card container that will always face camera */}
            <group 
              ref={(el) => (cardRefs.current[index] = el)}
            >
              
              
              {/* HTML content overlay - Made to fill the entire plane */}              <Html
                transform
                occlude
                position={[0, 0, 1]}
                distanceFactor={typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 30} // Larger distance factor on mobile
                style={{
                  width: typeof window !== 'undefined' && window.innerWidth < 768 ? '600px' : '800px', // Smaller on mobile
                  height: typeof window !== 'undefined' && window.innerWidth < 768 ? '400px' : '500px', // Smaller on mobile
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}
              >                <div
                  style={{
                    background: 'rgba(5, 5, 5, 0.43)',
                    border: `${typeof window !== 'undefined' && window.innerWidth < 768 ? '2px' : '4px'} solid white`, // White border
                    borderRadius: typeof window !== 'undefined' && window.innerWidth < 768 ? '12px' : '20px', // Smaller radius on mobile
                    padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '20px' : '40px', // Less padding on mobile
                    color: 'white',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '18px' : '28px', // Smaller text on mobile
                    textAlign: 'left',
                    backdropFilter: 'blur(15px)',
                    boxShadow: `0 0 ${typeof window !== 'undefined' && window.innerWidth < 768 ? '40px' : '70px'} rgba(255, 255, 255, 0.8)`, // Increased white glow
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box' // Ensures padding is included in width/height
                  }}>                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '36px' : '60px', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2' }}> {/* Gray-200 text color */}
                      {card.title}
                    </div>
                  </div>
                </div>
              </Html>
            </group>
          </group>
        );
      })}
    </group>
  );
}

export function Globe({
  globeConfig,
  data
}) {
  const globeRef = useRef(null);
  const groupRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#5f8acf",
    atmosphereAltitude: 10,
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    landColor: "#20b2aa", // Teal color for the landmass
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.9,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // Initialize globe only once
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      (groupRef.current).add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeMaterial = globeRef.current.globeMaterial();
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const arcs = data;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = hexToRgb(arc.color);
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    // remove duplicates for same lat and lng
    const filteredPoints = points.filter((v, i, a) =>
      a.findIndex((v2) =>
        ["lat", "lng"].every((k) => v2[k] === v[k])) === i);

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(4)
      .hexPolygonMargin(0)  // Set margin to 0 to make polygons solid
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.landColor);  // Use teal color for landmass

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d).startLat * 1)
      .arcStartLng((d) => (d).startLng * 1)
      .arcEndLat((d) => (d).endLat * 1)
      .arcEndLng((d) => (d).endLng * 1)
      .arcColor((e) => (e).color)
      .arcAltitude((e) => (e).arcAlt * 1)
      .arcStroke(() => 0.7)
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => (e).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings);
  }, [
    isInitialized,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.landColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const newNumbersOfRings = genRandomNumbers(0, data.length, Math.floor((data.length * 4) / 5));

      const ringsData = data
        .filter((d, i) => newNumbersOfRings.includes(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isInitialized, data]);

  return (
    <>
      <group ref={groupRef} />
      <PixelatedNoiseMask />
      <SatelliteCards />
    </>
  );
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size]);

  return null;
}

export function World(props) {
  const { globeConfig } = props;
  const [cameraDistance, setCameraDistance] = useState(getResponsiveCameraZ());
  
  // Update camera distance on resize
  useEffect(() => {
    const handleResize = () => {
      setCameraDistance(getResponsiveCameraZ());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  
  // Calculate responsive aspect ratio
  const getAspect = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth / window.innerHeight;
    }
    return aspect;
  };

  return (
    <Canvas 
      scene={scene} 
      camera={new PerspectiveCamera(50, getAspect(), 180, 1800)}
      style={{ width: '100%', height: '100%' }}
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)} />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)} />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.1} />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraDistance}
        maxDistance={cameraDistance}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3} />
    </Canvas>
  );
}

export function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min, max, count) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}