import React, { useState } from 'react';

// Default cards for when no step is active
const defaultCards = [
  {
    title: 'Start Building',
    subtitle: 'Your Journey Begins',
    image: '/images/BrandWebsiteImages/r1.png'
  },
  {
    title: 'Get Ready',
    subtitle: 'Setup Complete',
    image: '/images/BrandWebsiteImages/r2.png'
  }
];

// Step-specific cards
const stepCards = [
  [
    {
      title: 'Product Added',
      subtitle: 'First Item Ready',
      image: '/images/BrandWebsiteImages/r3.png'
    },
    {
      title: 'Inventory Set',
      subtitle: 'Stock Management',
      image: '/images/BrandWebsiteImages/sq1.png'
    }
  ],
  [
    {
      title: 'Store Design',
      subtitle: 'Brand Identity',
      image: '/images/BrandWebsiteImages/sq2.png'
    },
    {
      title: 'Theme Applied',
      subtitle: 'Visual Complete',
      image: '/images/BrandWebsiteImages/sq3.png'
    }
  ],
  [
    {
      title: 'Payment Ready',
      subtitle: 'Secure Checkout',
      image: '/images/BrandWebsiteImages/sq4.png'
    },
    {
      title: 'Gateway Active',
      subtitle: 'Processing Live',
      image: '/images/BrandWebsiteImages/sq5.png'
    }
  ],
];

const steps = [
  { label: 'Add your first product', cards: stepCards[0] },
  { label: 'Customize your store', cards: stepCards[1] },
  { label: 'Set up payments', cards: stepCards[2] },
];

export default function Section9() {
  const [active, setActive] = useState(null); // null = default, 0,1,2 = steps

  const [leftCard, rightCard] = active === null
    ? defaultCards
    : steps[active].cards;
  return (
    <section className="relative bg-black text-white py-20 px-6 md:px-12 lg:px-24">
      <h2 className="text-4xl md:text-6xl font-light text-center mb-16 md:mb-32">
        It's easy to start selling
      </h2>

      <div
        className="max-w-7xl mx-auto flex justify-between flex-col lg:flex-row items-center lg:items-start px-5"
        onMouseLeave={() => setActive(null)}
      >        {/* Cards Section */}
        <div className="flex-shrink-0 mb-12 lg:mb-0">          {/* Desktop Layout: Side by side with staggered positioning */}
          <div className="hidden lg:flex items-start gap-6">
            {/* Left Card - Positioned higher */}
            <div className="w-60 h-80 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out -mt-8">
              <img 
                src={leftCard.image} 
                alt={leftCard.title}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
            </div>
            
            {/* Right Card - Positioned lower */}
            <div className="w-60 h-80 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out mt-8">
              <img 
                src={rightCard.image} 
                alt={rightCard.title}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
            </div>
          </div>          {/* Mobile/Tablet Layout: Vertical column with symmetric positioning */}
          <div className="flex lg:hidden flex-col items-center gap-6">
            {/* First Card */}
            <div className="w-64 h-80 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out">
              <img 
                src={leftCard.image} 
                alt={leftCard.title}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
            </div>
            
            {/* Second Card */}
            <div className="w-64 h-80 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out">
              <img 
                src={rightCard.image} 
                alt={rightCard.title}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>        {/* Steps Section */}
        <div className='flex flex-col justify-between gap-12 lg:gap-20 w-full lg:w-auto'>
          <ul className="flex flex-col gap-6 lg:gap-8">          {steps.map((step, i) => {
            const isActive = active === i;
            const isAnyActive = active !== null;
            const shouldBeUnderlined = i === 0 || i === 1; // Step 1 and Step 2 (0-indexed)
            return (
              <li
                key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="flex items-center cursor-pointer"
              >                <span
                className={
                  `text-3xl lg:text-4xl font-mono w-10 lg:w-12 transition-colors duration-300 ease-in-out ` +
                  (isActive ? 'text-green-300' : 'text-green-300')
                }
              >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={
                    `ml-4 lg:ml-6 text-3xl lg:text-5xl tracking-tighter pb-1 transition-colors duration-300 ease-in-out ` +
                    (shouldBeUnderlined ? 'border-b border-gray-400 ' : '') +
                    (isAnyActive
                      ? (isActive ? 'text-white' : 'text-gray-400')
                      : 'text-white'
                    )
                  }
                >
                  {step.label}
                </span>
              </li>
            );
          })}
          </ul>
          <button className="bg-white mx-auto w-full max-w-xs lg:w-1/2 text-black px-8 py-3 rounded-full font-medium">
            Take your shot
          </button>
        </div>

      </div>
    </section>
  );
}
