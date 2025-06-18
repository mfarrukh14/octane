import React from 'react';
import BusinessProcessAnimation from '../UI/BusinessProcessAnimation';


const Section5 = () => (
    <section className="relative bg-black pb-20 z-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
            {/* Teal small label */}
            <p className="text-teal-400 text-lg mb-2">Desktop and Mobile</p>

            {/* Main heading */}
            <h2 className="text-white text-5xl tracking-tighter font-normal mb-10">
                Take care of business
            </h2>            {/* Cards container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card 1 */}
                <div className="rounded-2xl bg-gradient-to-br from-teal-800 to-black/10 shadow-lg overflow-hidden flex flex-col justify-between h-[600px] relative">
                    <div>
                        <BusinessProcessAnimation />
                    </div>
                    <div className='text-white mt-4 px-8 pb-8 relative z-10'>
                        <h3 className="text-xl tracking-tighter mb-2">Manage everything in one place</h3>
                        <p className="text-gray-400 tracking-tighter leading-tight">
                            From back office to front of store, you’re always in control with the fully centralized Shopify Admin.
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="rounded-2xl p-8 bg-gradient-to-bl from-teal-800 to-black/20 text-white shadow-lg overflow-hidden flex flex-col justify-between h-[600px] relative">
                    <div>

                    </div>
                    <div className="mt-4 relative z-10">
                        <h3 className="text-xl tracking-tighter mb-2">Run your store from anywhere</h3>
                        <p className="text-gray-400 tracking-tighter leading-tight">
                            Do it all right from your pocket with the full-featured Shopify mobile app.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

export default Section5;
