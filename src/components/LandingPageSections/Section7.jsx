import React, { useMemo } from 'react';
import { FaArrowUp, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';

const Section8 = () => {
  const avatarSizes = [64, 56, 48, 40, 32, 24]; // pixels: larger first
  const radius = 300; // fixed radius around cart center
  const maxBlur = 4;

  // Generate non-overlapping positions on circumference and blur based on size
  const avatars = useMemo(() => {
    const placed = [];
    const maxSize = Math.max(...avatarSizes);
    const minSize = Math.min(...avatarSizes);

    avatarSizes.forEach((size) => {
      let angle, x, y;
      const attempts = 20;
      let valid = false;

      for (let i = 0; i < attempts; i++) {
        angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius;
        // check against existing
        valid = placed.every((other) => {
          const dx = x - other.x;
          const dy = y - other.y;
          const minDist = (size + other.size) / 2 + 4; // small padding
          return dx * dx + dy * dy >= minDist * minDist;
        });
        if (valid) break;
      }
      // blur increases as size decreases
      const blur = ((maxSize - size) / (maxSize - minSize)) * maxBlur;
      placed.push({ size, x, y, blur });
    });

    return placed;
  }, []);

  return (
    <section className="relative bg-black text-white overflow-hidden py-20">
      {/* Animated teal-900 oval gradient glow moving around the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute animate-ovalMove"
        style={{
          width: '900px',
          height: '900px',
          background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(97, 212, 179, 0.48) 0%, transparent 80%)',
          zIndex: 0,
          filter: 'blur(10px)',
        }}
      />
      <style>{`
        @keyframes ovalMove {
          0% {
            left: 10%;
            top: 30%;
            transform: translate(0, 0) rotate(0deg) scaleX(1.2) scaleY(1);
            border-radius: 50% 50% 50% 50% / 60% 40% 60% 40%;
          }
          20% {
            left: 60%;
            top: 20%;
            transform: translate(0, 0) rotate(10deg) scaleX(1.25) scaleY(0.95);
            border-radius: 48% 52% 55% 45% / 55% 45% 65% 35%;
          }
          40% {
            left: 80%;
            top: 60%;
            transform: translate(0, 0) rotate(20deg) scaleX(1.1) scaleY(1.1);
            border-radius: 60% 40% 50% 50% / 40% 60% 50% 50%;
          }
          60% {
            left: 50%;
            top: 80%;
            transform: translate(0, 0) rotate(10deg) scaleX(1.15) scaleY(1.05);
            border-radius: 52% 48% 45% 55% / 45% 55% 35% 65%;
          }
          80% {
            left: 20%;
            top: 60%;
            transform: translate(0, 0) rotate(-10deg) scaleX(1.18) scaleY(1.08);
            border-radius: 55% 45% 50% 50% / 50% 50% 60% 40%;
          }
          100% {
            left: 10%;
            top: 30%;
            transform: translate(0, 0) rotate(0deg) scaleX(1.2) scaleY(1);
            border-radius: 50% 50% 50% 50% / 60% 40% 60% 40%;
          }
        }
        .animate-ovalMove {
          animation: ovalMove 36s ease-in-out infinite;
        }
      `}</style>
      <div className='max-w-7xl mx-auto relative z-10'>
        <h2 className="text-center text-5xl md:text-6xl font-light mb-16 leading-tight">
          Where your store goes from <br /> simple to standout.
        </h2>      <div className="container mx-auto flex flex-col xl:flex-row items-start xl:items-center px-4">
          <div className="w-full xl:w-1/2 xl:pr-12 mb-12 xl:mb-0">
            <h3 className="text-3xl md:text-4xl font-light mb-8">
              show personalized options through A.I
            </h3>

            {/* Stats */}
            <div className="flex mb-8">
              <div className="mr-12">
                <div className="flex items-center text-green-500 mb-2">
                  <FaArrowUp className="w-5 h-5 mr-2" />
                  <span className="uppercase text-sm">Higher conversions</span>
                </div>
                <div className="text-6xl font-light">
                  15<sup className="text-2xl">%</sup>
                </div>
              </div>
              <div>
                <div className="flex items-center text-green-500 mb-2">
                  <FaShoppingBag className="w-5 h-5 mr-2" />
                  <span className="uppercase text-sm">High-intent shoppers</span>
                </div>
                <div className="text-6xl font-light">
                  150M<sup className="text-2xl">+</sup>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="border-l-2 border-green-500 pl-4 text-gray-300 mb-8">
              Octane helps showcase your best sellers to build trust and boost conversions by highlighting what customers already love. It delivers Personalized Experiences with AI and Offers Instant Delivery Items so your customers can shop with confidence and receive their orders faster than ever.
            </p>

            <p className="text-sm text-gray-500">
              Based on external study with a Big Three global consulting firm in April, 2023.
            </p>
          </div>

          <div className="w-full xl:w-1/2 flex justify-center relative">
            {/* Cart Container */}
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md h-96 flex items-center justify-center">
              <FaShoppingCart className="text-gray-400" size={96} />
            </div>
            {/* Avatars on cart border without overlap */}
            {avatars.map((avt, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  top: `calc(50% + ${avt.y}px)`,
                  left: `calc(50% + ${avt.x}px)`,
                  width: `${avt.size}px`,
                  height: `${avt.size}px`,
                  filter: `blur(${avt.blur}px)`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#718096',
                  border: '2px solid white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/images/section6images/CA1.PNG"
                  alt="Avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section8;