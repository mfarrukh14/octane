import React, { useState } from 'react';

// Default cards for when no step is active
const defaultCards = [
  {
    title: 'Start Building',
    subtitle: 'Your Journey Begins',
    color: 'bg-gradient-to-br from-blue-500 to-purple-600',
    icon: '🚀'
  },
  {
    title: 'Get Ready',
    subtitle: 'Setup Complete',
    color: 'bg-gradient-to-br from-green-500 to-teal-600',
    icon: '✨'
  }
];

// Step-specific cards
const stepCards = [
  [
    {
      title: 'Product Added',
      subtitle: 'First Item Ready',
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      icon: '📦'
    },
    {
      title: 'Inventory Set',
      subtitle: 'Stock Management',
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      icon: '📊'
    }
  ],
  [
    {
      title: 'Store Design',
      subtitle: 'Brand Identity',
      color: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      icon: '🎨'
    },
    {
      title: 'Theme Applied',
      subtitle: 'Visual Complete',
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      icon: '🖌️'
    }
  ],
  [
    {
      title: 'Payment Ready',
      subtitle: 'Secure Checkout',
      color: 'bg-gradient-to-br from-emerald-500 to-green-600',
      icon: '💳'
    },
    {
      title: 'Gateway Active',
      subtitle: 'Processing Live',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      icon: '⚡'
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
      <h2 className="text-6xl font-light text-center mb-32">
        It's easy to start selling
      </h2>

      <div
        className="max-w-7xl mx-auto flex justify-between flex-col md:flex-row items-center md:items-start px-5"
        onMouseLeave={() => setActive(null)}
      >        {/* Left: Cards */}
        <div className="flex-shrink-0 flex items-start gap-6">          {/* Left Card - Positioned higher */}
          <div className={`w-60 h-80 ${leftCard.color} rounded-xl shadow-2xl p-6 flex flex-col justify-between transition-all duration-500 ease-in-out -mt-8`}>
            <div className="text-center">
              <div className="text-4xl mb-3 transition-all duration-500 ease-in-out">{leftCard.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2 transition-all duration-500 ease-in-out">{leftCard.title}</h3>
              <p className="text-white/80 text-sm transition-all duration-500 ease-in-out">{leftCard.subtitle}</p>
            </div>
            <div className="text-center">
              <div className="w-full h-2 bg-white/20 rounded-full mb-3">
                <div className="w-3/4 h-full bg-white/60 rounded-full transition-all duration-500 ease-in-out"></div>
              </div>
              <span className="text-white/60 text-sm transition-all duration-500 ease-in-out">Progress</span>
            </div>
          </div>          {/* Right Card - Positioned lower */}
          <div className={`w-60 h-80 ${rightCard.color} rounded-xl shadow-2xl p-6 flex flex-col justify-between transition-all duration-500 ease-in-out mt-8`}>
            <div className="text-center">
              <div className="text-4xl mb-3 transition-all duration-500 ease-in-out">{rightCard.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2 transition-all duration-500 ease-in-out">{rightCard.title}</h3>
              <p className="text-white/80 text-sm transition-all duration-500 ease-in-out">{rightCard.subtitle}</p>
            </div>
            <div className="text-center">
              <div className="w-full h-2 bg-white/20 rounded-full mb-3">
                <div className="w-2/3 h-full bg-white/60 rounded-full transition-all duration-500 ease-in-out"></div>
              </div>
              <span className="text-white/60 text-sm transition-all duration-500 ease-in-out">Status</span>
            </div>
          </div>
        </div>

        {/* Right: Steps */}
        <div className='flex flex-col justify-between gap-20'>
          <ul className="flex flex-col gap-8">          {steps.map((step, i) => {
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
                  `text-4xl font-mono w-12 transition-colors duration-300 ease-in-out ` +
                  (isActive ? 'text-green-300' : 'text-green-300')
                }
              >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={
                    `ml-6 text-5xl tracking-tighter pb-1 transition-colors duration-300 ease-in-out ` +
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
          <button className="bg-white mx-auto w-1/2 text-black px-8 py-3 rounded-full font-medium">
            Take your shot
          </button>
        </div>

      </div>
    </section>
  );
}
