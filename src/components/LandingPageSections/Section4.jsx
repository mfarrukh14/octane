import React from 'react';
import MobileMockup from '../UI/Mockups/MobileMockup';
import LaptopMockup from '../UI/Mockups/LaptopMockup';

const Section4 = () => (
  <section className="relative bg-black pb-20 z-40 px-6 md:px-12 lg:px-24">
    <div className="max-w-7xl mx-auto">
      {/* Teal small label */}
      <p className="text-teal-400 text-lg mb-2">Desktop and Mobile</p>

      {/* Main heading */}
      <h2 className="text-white text-5xl tracking-tighter font-normal mb-10">
        Take care of business
      </h2>

      {/* Cards container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-teal-800 to-teal-950 shadow-lg h-fit overflow-hidden flex flex-col justify-end">
          <LaptopMockup />
          <div className='text-white'>
            <h3 className="text-2xl mb-2">Card Title 1</h3>
            <p className="text-base">
              Content for the first card goes here. Customize as needed.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-teal-800 to-teal-950 text-white shadow-lg h-fit flex flex-col justify-end">
          <MobileMockup />
          <div>
            <h3 className="text-2xl mb-2">Card Title 2</h3>
            <p className="text-base">
              Content for the second card goes here. Customize as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Section4;
