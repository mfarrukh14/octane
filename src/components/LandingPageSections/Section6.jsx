import React, { useState, useEffect } from 'react';
import MobileMockup from '../UI/Mockups/MobileMockup';
import LaptopMockup from '../UI/Mockups/LaptopMockup';

const Section6 = () => {
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
        <section className="relative bg-black pb-20 z-40 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Teal small label */}
                <p className="text-teal-400 text-lg mb-2">Desktop and Mobile</p>

                {/* Main heading */}
                <h2 className="text-white text-5xl tracking-tighter font-normal mb-10">
                    Take care of business
                </h2>            {/* Cards container */}
                <div className={`grid gap-8 ${isSmallScreen ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {/* Card 1 */}
                    <div className="rounded-2xl bg-gradient-to-br from-teal-800 to-black/10 shadow-lg overflow-hidden flex flex-col justify-between h-[600px] relative">
                        <div
                            className="flex-1 overflow-hidden flex items-start justify-start pl-8 pt-8"
                            style={{
                                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                            }}
                        >
                            <LaptopMockup />
                        </div>
                        <div className='text-white mt-4 px-8 pb-8 relative z-10'>
                            <h3 className="text-xl tracking-tighter mb-2">Manage everything in one place</h3>
                            <p className="text-gray-400 tracking-tighter leading-tight">
                                From back office to front of store, you’re always in control with the fully centralized Shopify Admin.
                            </p>
                        </div>
                    </div>                {/* Card 2 */}
                    <div className="rounded-2xl py-8 px-2 sm:px-6 md:px-4 lg:px-8 bg-gradient-to-bl from-teal-800 to-black/20 text-white shadow-lg overflow-hidden flex flex-col justify-between h-[600px] relative">
                        <div
                            className="flex-1 overflow-hidden flex items-start justify-center"
                            style={{
                                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                            }}
                        >
                            <MobileMockup />
                        </div>
                        <div className="mt-4 relative z-10">
                            <h3 className="text-xl tracking-tighter mb-2">Run your store from anywhere</h3>
                            <p className="text-gray-400 tracking-tighter leading-tight">
                                Do it all right from your pocket with the full-featured Shopify mobile app.
                            </p>
                        </div>
                    </div>            </div>
            </div>
        </section>
    );
};

export default Section6;
