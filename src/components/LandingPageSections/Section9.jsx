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
  { label: 'Customize your store',    cards: stepCards[1] },
  { label: 'Set up payments',          cards: stepCards[2] },
];

export default function Section9() {
  const [active, setActive] = useState(null); // null = default, 0,1,2 = steps

  const [leftCard, rightCard] = active === null
    ? defaultCards
    : steps[active].cards;

  return (
    <section className="relative bg-black text-white py-20 px-6 md:px-12 lg:px-24">
      <h2 className="text-4xl font-light text-center mb-12">
        It's easy to start selling
      </h2>

      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12"
        onMouseLeave={() => setActive(null)}
      >
        {/* Left: Cards */}
        <div className="flex-shrink-0 flex gap-4">
          {/* Left Card */}
          <div className={`w-40 h-56 ${leftCard.color} rounded-lg shadow-lg p-4 flex flex-col justify-between transition-all duration-300`}>
            <div className="text-center">
              <div className="text-3xl mb-2">{leftCard.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{leftCard.title}</h3>
              <p className="text-white/80 text-xs">{leftCard.subtitle}</p>
            </div>
            <div className="text-center">
              <div className="w-full h-1 bg-white/20 rounded-full mb-2">
                <div className="w-3/4 h-full bg-white/60 rounded-full"></div>
              </div>
              <span className="text-white/60 text-xs">Progress</span>
            </div>
          </div>

          {/* Right Card */}
          <div className={`w-40 h-56 ${rightCard.color} rounded-lg shadow-lg p-4 flex flex-col justify-between transition-all duration-300`}>
            <div className="text-center">
              <div className="text-3xl mb-2">{rightCard.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{rightCard.title}</h3>
              <p className="text-white/80 text-xs">{rightCard.subtitle}</p>
            </div>
            <div className="text-center">
              <div className="w-full h-1 bg-white/20 rounded-full mb-2">
                <div className="w-2/3 h-full bg-white/60 rounded-full"></div>
              </div>
              <span className="text-white/60 text-xs">Status</span>
            </div>
          </div>
        </div>

        {/* Right: Steps */}
        <ul className="flex flex-col gap-8">
          {steps.map((step, i) => {
            const isActive = active === i;
            return (
              <li
                key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="flex items-center cursor-pointer"
              >
                <span
                  className={
                    `text-2xl font-mono w-8 ` +
                    (isActive ? 'text-white' : 'text-gray-600')
                  }
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={
                    `ml-4 text-2xl border-b pb-1 ` +
                    (isActive ? 'text-white border-gray-400' : 'text-gray-400 border-transparent')
                  }
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="text-center mt-12">
        <button className="bg-white text-black px-8 py-3 rounded-full font-medium">
          Take your shot
        </button>
      </div>
    </section>
  );
}
