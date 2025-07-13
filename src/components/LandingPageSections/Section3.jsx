import React, { useState, useEffect } from 'react';

const cards = [
  {
    id: 1,
    icon: '/images/section3images/reh1.PNG',
    hoverIcon: '/images/section3images/rehh2.png',    // Second image to show on hover
    title: 'Start fast',
    description: 'Starting from home to now a team of hundreds, Octane helped Rang-e-Haya to become a dominating force in the online Fashion domain.',
  },
  {
    id: 2,
    icon: '/images/section3images/hsy1.PNG',
    hoverIcon: '/images/section3images/hsy2.PNG',    // Second image to show on hover
    title: 'Elevate your brand',
    description: 'With Octane handling operations, HSY focuses on making  iconic designs ,while his brand reaches customers worldwide.',
  },
  {
    id: 3,
    icon: '/images/section3images/haseens1.jpeg',
    hoverIcon: '/images/section3images/haseens2.jpg',    
    title: 'Scale efficiently',
    description: 'Enterprises like Haseens rely on Octane to handle high-volume worldwide orders, warehousing, logistics and payments.',
  },
  // ...add as many cards as you need
];

const Card = ({ icon, hoverIcon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
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
    <div className={`p-1 flex flex-col items-start ${isSmallScreen ? 'h-[75vh]' : ''}`}>
      <div 
        className={`relative w-full rounded-lg overflow-hidden bg-white ${isSmallScreen ? 'flex-1' : 'h-64'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={icon} 
          alt="" 
          className="w-full h-full object-cover transition-opacity duration-100 absolute inset-0"
          style={{ opacity: isHovered ? 0 : 1 }}
        />
        <img 
          src={hoverIcon} 
          alt="" 
          className="w-full h-full object-cover transition-opacity duration-100 absolute inset-0"
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
      <div className="flex flex-col xl:flex-row text-white gap-6">
        <div className="w-full xl:w-2/3">
          <h1 className="text-4xl md:text-6xl mb-6 tracking-tighter font-light leading-tight">
            One platform, for scaling and business
          </h1>
        </div>
        <div className="w-full xl:w-1/3 flex items-end">
          <span className="text-gray-400 text-base md:text-lg">
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
        <a href='https://wa.me/923104030793' className="px-5 font-semibold cursor-pointer py-3 border-2 border-white text-white rounded-full text-lg transition-all duration-300 bg-black hover:bg-white hover:text-black">
          Scale your store
        </a>
      </div>
    </div>
  </section>
  );
};

export default Section3;
