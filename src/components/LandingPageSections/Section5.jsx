import React from 'react';
import OrbitAnimation from '../UI/OrbitAnimations';

const Section5 = () => (
  <section className="relative bg-black pb-20 z-40 px-6 md:px-12 lg:px-24">
    <div className="max-w-7xl mx-auto">
      <p className="text-teal-400 text-lg mb-2">Desktop and Mobile</p>
      <h2 className="text-white text-5xl tracking-tighter font-normal mb-10">
        Take care of business
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">        <div className="rounded-2xl bg-gradient-to-br from-teal-800 to-black/10 shadow-lg overflow-hidden flex flex-col justify-between h-[600px] relative">
          <div className="flex-1 relative flex items-center justify-center p-6">
            <img 
              src="/images/supplyChain.gif" 
              alt="Supply Chain Process" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className='text-white mt-4 px-8 pb-8 relative z-10'>
            <h3 className="text-xl tracking-tighter mb-2">From pickup to delivery,Octane handles it all</h3>
            <p className="text-gray-400 tracking-tighter leading-tight">
               Visualize the entire fulfillment journey: from pickup at your vendor, to smart warehousing at Octane, to last-mile delivery — and even managed returns back to the vendor. Octane keeps every step connected and transparent.
            </p>
          </div>
        </div>  
        <div className="rounded-2xl p-8 bg-gradient-to-bl from-teal-800 to-black/20 text-white shadow-lg overflow-hidden flex flex-col justify-between h-[600px] relative">
          <div className="flex-1 flex items-center justify-center">
            <OrbitAnimation />
          </div>
          <div className="mt-4 relative z-10">
            <h3 className="text-xl tracking-tighter mb-2">Go Live  Everywhere — Powered by Smart Integrations</h3>
            <p className="text-gray-400 tracking-tighter leading-tight">
                Track and optimize your store’s performance across platforms with seamless tools and integrations .
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Section5;
