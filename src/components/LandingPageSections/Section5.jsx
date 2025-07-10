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
                loop
                autoPlay
                muted
                playsInline
              ></video>
            </div>

            <div className='text-white px-8 pb-8 relative z-10 flex-shrink-0'>
              <h3 className="text-xl tracking-tighter mb-2">From pickup to delivery,Octane handles it all</h3>
              <p className="text-gray-400 tracking-tighter leading-tight">
                Visualize the entire fulfillment journey: from pickup at your vendor, to smart warehousing at Octane, to last-mile delivery — and even managed returns back to the vendor. Octane keeps every step connected and transparent.
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-8 bg-gradient-to-bl from-teal-800 to-black/20 text-white shadow-lg overflow-hidden flex flex-col h-[600px] relative">
            <div className="flex-1 flex items-center justify-center min-h-0">
              <BusinessAnimation />
            </div>
            <div className="relative z-10 flex-shrink-0">
              <h3 className="text-xl tracking-tighter mb-2">Go Live  Everywhere — Powered by Smart Integrations</h3>
              <p className="text-gray-400 tracking-tighter leading-tight">
                Track and optimize your store's performance across platforms with seamless tools and integrations .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;
