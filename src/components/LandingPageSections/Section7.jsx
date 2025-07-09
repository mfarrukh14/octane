import React, { useState, useEffect } from 'react';
import BlurText from '../UI/TextAnimations/BlurText';

const Section7 = () => {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setScreenSize(window.innerWidth < 1200 ? 'mobile' : 'desktop');
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getImageStyle = (type) => {
    let cardWidth, cardHeight;
    
    if (typeof window !== 'undefined' && window.innerWidth < 1200) {
      cardWidth = type === 'square' ? '250px' : '100px';
      cardHeight = '230px';
    } else {
      cardWidth = type === 'square' ? '480px' : '200px';
      cardHeight = '400px';
    }

    return {
      width: cardWidth,
      height: cardHeight
    };
  };
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
        {/* Mobile & Desktop: 3 images in horizontal line - 1 vertical rectangle + 2 squares */}
        <div className="mb-8 flex justify-center">
          <div className="flex gap-4 mb-16 px-4 items-center">
            <img 
              src="/images/section8images/1.PNG" 
              alt="Tile 1" 
              className="flex-shrink-0 object-cover rounded-lg" 
              style={getImageStyle('vertical')}
            />
            <img 
              src="/images/section8images/2.PNG" 
              alt="Tile 2" 
              className="flex-shrink-0 object-cover rounded-lg" 
              style={getImageStyle('square')}
            />
            <img 
              src="/images/section8images/4.PNG" 
              alt="Tile 4" 
              className="flex-shrink-0 object-cover rounded-lg" 
              style={getImageStyle('square')}
            />
          </div>
        </div>

        {/* Description Paragraphs - Centered below images */}
        <div className="flex flex-col items-center text-center px-4 mb-12">
          <p className="border-l-2 border-green-500 pl-4 text-gray-300 mb-8 text-xl">
            Octane helps showcase your best sellers to build trust and boost conversions by highlighting what customers already love. It delivers Personalized Experiences with AI and Offers Instant Delivery Items so your customers can shop with confidence and receive their orders faster than ever.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Section7;