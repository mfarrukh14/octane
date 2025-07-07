import React, { useState, useEffect } from 'react';

// Default cards for when no step is active
const defaultCards = [
  {
    title: 'Start Building',
    subtitle: 'Your Journey Begins',
    image: '/images/section10images/s1.png'
  },
  {
    title: 'Get Ready',
    subtitle: 'Setup Complete',
    image: '/images/section10images/s2.jpg'
  }
];

// Step-specific cards
const stepCards = [
  [
    {
      title: 'Product Added',
      subtitle: 'First Item Ready',
      image: '/images/section7images/5.jpg'
    },
    {
      title: 'Inventory Set',
      subtitle: 'Stock Management',
      image: '/images/section7images/2.jpg'
    }
  ],
  [
    {
      title: 'Store Design',
      subtitle: 'Brand Identity',
      image: '/images/section7images/3.jpg'
    },
    {
      title: 'Theme Applied',
      subtitle: 'Visual Complete',
      image: '/images/section7images/4.jpg'
    }
  ],
  [
    {
      title: 'Payment Ready',
      subtitle: 'Secure Checkout',
      image: '/images/section10images/s1.png'
    },
    {
      title: 'Gateway Active',
      subtitle: 'Processing Live',
      image: '/images/section10images/s2.jpg'
    }
  ],
];

const steps = [
  { label: 'Upload your products with ease', cards: stepCards[0] },
  { label: 'Design your store front', cards: stepCards[1] },
  { label: 'Raise Pickup request', cards: stepCards[2] },
];

export default function Section9() {
  const [active, setActive] = useState(null); // null = default, 0,1,2 = steps
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

  const [leftCard, rightCard] = active === null
    ? defaultCards
    : steps[active].cards;
  return (
    <section className="relative bg-black text-white py-20 px-6 md:px-12 lg:px-24">
      <h2 className="text-4xl md:text-6xl font-light text-center mb-16 md:mb-32">
        It's easy to start selling
      </h2>      <div
        className={`max-w-7xl mx-auto flex ${isSmallScreen ? 'flex-col items-center justify-center' : 'justify-between flex-col lg:flex-row items-center lg:items-start'} px-5`}
        onMouseLeave={() => setActive(null)}
      >{/* Cards Section */}
        <div className={`flex-shrink-0 mb-12 lg:mb-0 ${isSmallScreen ? 'flex justify-center w-full' : ''}`}>{/* Desktop Layout: Side by side with staggered positioning */}
          <div className={`${isSmallScreen ? 'hidden' : 'hidden lg:flex'} items-start gap-6`}>
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
          <div className={`${isSmallScreen ? 'flex' : 'flex lg:hidden'} flex-col items-center gap-6`}>
            {/* First Card */}
            <div className={`${isSmallScreen ? 'w-64 h-80' : 'w-64 h-80'} rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out`}>
              <img 
                src={leftCard.image} 
                alt={leftCard.title}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
            </div>
            
            {/* Second Card */}
            <div className={`${isSmallScreen ? 'w-64 h-80' : 'w-64 h-80'} rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out`}>
              <img 
                src={rightCard.image} 
                alt={rightCard.title}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>        {/* Steps Section */}
        <div className={`flex flex-col mt-5 justify-between gap-12 lg:gap-20 w-full lg:w-auto ${isSmallScreen ? '' : ''}`}>
          <ul className={`flex flex-col gap-6 lg:gap-8 ${isSmallScreen ? '' : ''}`}>{steps.map((step, i) => {
            const isActive = active === i;
            const isAnyActive = active !== null;
            const shouldBeUnderlined = i === 0 || i === 1; // Step 1 and Step 2 (0-indexed)
            return (
              <li
                key={i}
                onMouseEnter={() => setActive(i)}                onMouseLeave={() => setActive(null)}
                className={`flex items-center cursor-pointer ${isSmallScreen ? '' : ''}`}
              ><span
                className={
                  `text-3xl lg:text-2xl font-mono w-10 lg:w-12 ml-6 transition-colors duration-300 ease-in-out ` +
                  (isActive ? 'text-green-300' : 'text-green-300')
                }
              >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={
                    `ml-2 lg:ml-4 text-2xl lg:text-3xl tracking-tighter pb-1 transition-colors duration-300 ease-in-out ` +
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
          })}          </ul>
          <button className={`bg-white text-black px-8 py-3 rounded-full font-medium ${isSmallScreen ? 'mx-auto w-full max-w-xs' : 'mx-auto w-full max-w-xs lg:w-1/2'}`}>
            Take your shot
          </button>
        </div>

      </div>
    </section>
  );
}
