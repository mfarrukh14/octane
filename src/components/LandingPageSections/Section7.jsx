import React from 'react';
import BlurText from '../UI/TextAnimations/BlurText';

const Section7 = () => {
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
        <h2 className="text-center text-5xl md:text-6xl font-light mb-3 leading-tight">
          From essential to exceptional
        </h2>
        <div className="text-center mb-32 flex justify-center">
          <BlurText
            textList={[
              "Show your best sellers",
              "Show personalized options through A.I",
              "Show your Instant Delivery Items"
            ]}
            rotationInterval={3500}
            delay={60}
            className="text-3xl md:text-4xl font-light leading-tight justify-center"
            animateBy="words"
            direction="top"
          />
        </div>
        <div className="container mx-auto flex flex-col xl:flex-row items-start xl:items-center px-4">
          <div className="w-full xl:w-1/2 xl:pr-12 mb-12 xl:mb-0 flex flex-col items-center justify-center">
            {/* 1x2 image row with staggered heights */}
            <div className="flex gap-4 w-full ml-10 mb-8 justify-center">
              <img src="/images/section7images/1.png" alt="Tile 1" className="w-36 h-60 object-cover rounded-lg relative" style={{ top: '-16px' }} />
              <img src="/images/section7images/2.jpg" alt="Tile 2" className="w-36 h-60 object-cover rounded-lg relative" style={{ top: '8px' }} />
            </div>
            {/* Description Paragraphs */}
            <p className="border-l-2 border-green-500 pl-4 text-gray-300 mb-8">
              Octane helps showcase your best sellers to build trust and boost conversions by highlighting what customers already love. It delivers Personalized Experiences with AI and Offers Instant Delivery Items so your customers can shop with confidence and receive their orders faster than ever.
            </p>
            <p className="text-sm text-gray-500">
              Based on external study with a Big Three global consulting firm in April, 2023.
            </p>
          </div>
          <div className="w-full xl:w-1/2 flex justify-center relative px-4">
            {/* Moved 2 images here */}
            <div className="flex gap-4 justify-center">
              <img src="/images/section7images/3.jpg" alt="Tile 3" className="w-1/2 h-92 object-cover rounded-lg relative" style={{ top: '-16px' }} />
              <img src="/images/section7images/4.jpg" alt="Tile 4" className="w-1/2 h-92 object-cover rounded-lg relative" style={{ top: '8px' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section7;