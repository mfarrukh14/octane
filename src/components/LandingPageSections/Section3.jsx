import React, { useState, useEffect } from 'react';

const cards = [
  {
    id: 1,
    icon: '/images/section3images/i6.png',        
    hoverIcon: '/images/section3images/i5.png',    // Second image to show on hover
    title: 'Start fast',
    description: 'STarting from home to now a team of hundreds, Octane helped Rang-e-Haya to become a dominating force in the online Fashion domain.',
  },
  {
    id: 2,
    icon: '/images/section3images/i4.png',
    hoverIcon: '/images/section3images/i3.png',    // Second image to show on hover
    title: 'Elevate your brand',
    description: 'With Octane, HSY can focus on design while reaching diaspora markets (USA, UK, UAE) with zero backend headaches.',
  },
  {
    id: 3,
    icon: '/images/section3images/i2.png',
    hoverIcon: '/images/section3images/i1.png',    // Second image to show on hover
    title: 'Scale efficiently',
    description: 'Enterprises like Haseens rely on Octane to handle high-volume worldwide orders, warehousing, logistics and payments.',
  },
  // ...add as many cards as you need
];

const Card = ({ icon, hoverIcon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="p-1 flex flex-col items-start">
      <div 
        className="relative w-full h-64 rounded-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={icon} 
          alt="" 
          className="w-full h-full object-cover transition-opacity duration-100 absolute inset-0 filter blur-[0.5px]"
          style={{ opacity: isHovered ? 0 : 1 }}
        />
        <img 
          src={hoverIcon} 
          alt="" 
          className="w-full h-full object-cover transition-opacity duration-100 absolute inset-0 filter blur-[0.5px]"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>
      <h3 className="text-white text-xl leading-tighter tracking-tighter mt-8">{title}</h3>
      <p className="text-gray-400 text-xl tracking-tighter mt-3">{description}</p>
    </div>
  );
};

const Section3 = () => {
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
  <section className="relative bg-black pb-20 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row text-white">
        <div className="lg:w-2/3">
          <h1 className="text-6xl mb-6 tracking-tighter font-light leading-tight">
            One platform, for scaling and business
          </h1>
        </div>
        <div className="lg:w-1/3 relative p-10">
          <span className="text-gray-400 text-lg absolute bottom-0 right-0">
            Whether you're just getting started or running a full-scale operation, Octane gives you the tools to launch, grow, and streamline your business--all in one place.
          </span>
        </div>
      </div>      {/* Cards grid */}
      <div className={`mt-16 gap-4 grid ${isSmallScreen ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {cards.map(card => (
          <Card
            key={card.id}
            icon={card.icon}
            hoverIcon={card.hoverIcon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>        {/* Action button */}
      <div className="flex justify-center mt-8">
        <button className="px-5 font-semibold cursor-pointer py-3 border-2 border-white text-white rounded-full text-lg transition-all duration-300 bg-black hover:bg-white hover:text-black">
          Start Now!
        </button>
      </div>
    </div>
  </section>
  );
};

export default Section3;
