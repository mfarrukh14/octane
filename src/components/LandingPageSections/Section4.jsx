import React from 'react';

const Section4 = () => (
    <section className="relative bg-black pb-20 z-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">

            <p className="text-teal-400 text-lg mb-2">Online and in person</p>
            <div className="flex flex-col md:flex-row w-full gap-6">
                <div className="w-full md:w-1/2">
                    <h2 className="text-white text-4xl md:text-5xl tracking-tighter font-normal">
                        Sell with style. Every click, every time.
                    </h2>
                </div>
                <div className="w-full md:w-1/2">
                    <span className="text-base md:text-lg tracking-tighter text-gray-400 block">
                        <u className="cursor-pointer hover:text-white">Accelerate your launch</u> with professionally designed ready to use layouts, pick from refined, sales-optimized themes, or build a fully customized storefront from the ground up.
                    </span>
                </div>
            </div>

            {/* Video Section */}
            <div className="mt-12">
                <video
                    className="w-full h-auto rounded-2xl shadow-lg"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/videos/v2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </section>
);

export default Section4;
