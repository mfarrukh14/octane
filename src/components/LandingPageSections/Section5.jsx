import React, { useState, useEffect } from 'react';
import BusinessAnimation from '../UI/BusinessAnimation';

const Section5 = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1200);
    };

    // Check initial size
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section className="relative bg-gradient-to-bl from-black via-black to-teal-900 pb-20 z-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <p className="text-teal-400 text-lg mb-2">Desktop and Mobile</p>
        <h2 className="text-white text-5xl tracking-tighter font-normal mb-10">
          Take care of business
        </h2>
        <div className={`grid gap-8 ${isSmallScreen ? 'grid-cols-1' : 'grid-cols-2'}`}>
          <div className="rounded-2xl bg-gradient-to-l from-teal-900 to-black shadow-lg overflow-hidden flex flex-col h-[600px] relative">
            <div className="flex-1 relative flex items-center justify-center p-6 min-h-0">
              <video
                src="/videos/businessAnimation.mp4"
                className='hover:opacity-70 transition-opacity duration-300'
                loop
                autoPlay
                muted
                playsInline
              ></video>
            </div>

            <div className='text-white px-8 pb-8 relative z-10 flex-shrink-0'>
              <h3 className="text-xl tracking-tighter mb-2">Your entire setup - managed from a single dashboard</h3>
              <p className="text-gray-400 tracking-tighter leading-tight">
                From order placement, to inventory management, fulfilment and even returns, Octane handles it all right from your computer or mobile screen.
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-8 bg-gradient-to-bl from-teal-800 to-black/20 text-white shadow-lg overflow-hidden flex flex-col h-[600px] relative">
            <div className="flex-1 flex items-center justify-center min-h-0">
              <BusinessAnimation />
            </div>
            <div className="relative z-10 flex-shrink-0">
              <h3 className="text-xl tracking-tighter mb-2">A store that never sleeps!</h3>
              <p className="text-gray-400 tracking-tighter leading-tight">
                24/7 omni present support for any hiccups or problems, Octane runs seamlessly as you rest! 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;
