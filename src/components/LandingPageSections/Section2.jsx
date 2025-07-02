import React, { useState, useEffect, useRef } from 'react';

const Section2 = () => {

    // Carousel items with mixed shapes and content
    const carouselItems = [
        { id: 1, type: 'square', title: 'fourseason.pk', subtitle: 'Real-time insights', image: '/images/BrandWebsiteImages/sq1.png', logo: '/images/BrandLogos/l2.png', url: 'https://www.fourseason.pk/' },
        { id: 2, type: 'square', title: 'aghajaan.com.pk', subtitle: '24/7 assistance', image: '/images/BrandWebsiteImages/sq3.jpg', logo: '/images/BrandLogos/l4.png', url: 'https://aghajaan.com.pk/' },
        { id: 3, type: 'rectangle', title: 'meerak.pk', subtitle: 'Lightning fast delivery', image: '/images/BrandWebsiteImages/r1.png', logo: '/images/BrandLogos/l7.png', url: 'https://meerak.pk/' },
        { id: 4, type: 'square', title: 'sarajahan.online', subtitle: 'On-the-go access', image: '/images/BrandWebsiteImages/sq5.png', logo: '/images/BrandLogos/l5.png', url: 'https://sarajahanonline.com/' },
        { id: 5, type: 'rectangle', title: 'laam.pk', subtitle: 'Never lose data', image: '/images/BrandWebsiteImages/laam.jpeg', logo: '/images/BrandLogos/laam.png', url: 'https://laam.pk/' },                
        { id: 6, type: 'square', title: 'SairaShakira.com', subtitle: 'Connect everything', image: '/images/BrandWebsiteImages/sairashakira.png', logo: '/images/BrandLogos/l1.png', url: 'https://www.sairashakira.com/' },
        { id: 7, type: 'rectangle', title: 'jahaan.com', subtitle: 'Smart workflows', image: '/images/BrandWebsiteImages/r3.mp4', logo: '/images/BrandLogos/jahaan.png', url: 'https://jahaan.com.pk/' },
        { id: 8, type: 'square', title: 'laleen.pk', subtitle: 'Enterprise grade', image: '/images/BrandWebsiteImages/laleen.png', logo: '/images/BrandLogos/laleen.png', url: 'https://laleen.pk/' },
        { id: 9, type: 'square', title: 'HEM.com', subtitle: 'Grows with your business', image: '/images/BrandWebsiteImages/hem.png', logo: '/images/BrandLogos/hem.png', url: 'https://hem.com.pk/' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSets = Math.ceil(carouselItems.length / 3);
    const [isPaused, setIsPaused] = useState(false);


    // Auto-advance carousel every 3 seconds, but pause when hovering
    useEffect(() => {
        if (isPaused) return; // Don't set interval if paused
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSets);
        }, 3000);
        
        return () => clearInterval(interval);
    }, [totalSets, isPaused]);

    // Get current 3 items to display for a given set
    const getCurrentItems = (setIndex) => {
        const items = [];
        const startIndex = setIndex * 3;
        for (let i = 0; i < 3; i++) {
            if (startIndex + i < carouselItems.length) {
                items.push(carouselItems[startIndex + i]);
            }
        }
        return items;
    };

    return (
        <section className="relative w-full bg-black rounded-t-[3rem] md:rounded-t-[3rem] lg:rounded-t-[3rem] -mt-10 pt-20 pb-20 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-white">
                    <h1 className="text-7xl md:text-7xl mb-6 tracking-tighter font-light leading-tight">
                        One platform. Every solution. Seamlessly connected.
                    </h1>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <h1 className="text-5xl md:text-5xl tracking-tighter text-gray-500 w-full">
                            <span 
                                className={`inline ${currentIndex === 0 ? 'text-white' : ''} hover:bg-gradient-to-br hover:from-teal-300 hover:via-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent cursor-pointer`}
                                onClick={() => setCurrentIndex(0)}
                            >
                                Sell in-stock and on-demand.&nbsp;
                            </span>
                            <span 
                                className={`inline ${currentIndex === 1 ? 'text-white' : ''} hover:bg-gradient-to-l hover:from-teal-500 hover:via-blue-600 hover:to-purple-700 hover:bg-clip-text hover:text-transparent cursor-pointer`}
                                onClick={() => setCurrentIndex(1)}
                            >
                                Sell locally and globally.&nbsp;
                            </span>
                            <span 
                                className={`inline ${currentIndex === 2 ? 'text-white' : ''} hover:bg-gradient-to-t hover:from-teal-200 hover:via-blue-300 hover:to-purple-400 hover:bg-clip-text hover:text-transparent cursor-pointer`}
                                onClick={() => setCurrentIndex(2 < totalSets ? 2 : totalSets - 1)}
                            >
                                Sell on desktop and mobile.
                            </span>
                            </h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">

                    </div>

                    {/* Carousel of Mixed Shapes */}
                    <div className="w-full relative overflow-hidden mb-16">
                        <div className="w-full flex justify-center">
                            <div className="w-full">
                                <div
                                    className="flex w-full gap-4 transition-transform duration-1000 ease-in-out"
                                    style={{
                                        transform: `translateX(-${currentIndex * 42}%)`,
                                        width: `${totalSets * 80}%`
                                    }}
                                >
                                    {Array.from({ length: totalSets }).map((_, setIndex) => (
                                        <div key={setIndex} className="flex gap-6 w-full justify-center">
                                            {getCurrentItems(setIndex).map((item) => {
                                                let cardWidth = '';
                                                let cardHeight = '';
                                                if (typeof window !== 'undefined' && window.innerWidth < 1200) {
                                                    cardWidth = item.type === 'square' ? '250px' : '100px';
                                                    cardHeight = '230px';
                                                } else {
                                                    cardWidth = item.type === 'square' ? '480px' : '200px';
                                                    cardHeight = '400px';
                                                }
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className={
                                                            (item.type === 'square'
                                                                ? 'carousel-card-square'
                                                                : 'carousel-card-rectangle') + ' rounded-xl overflow-hidden flex-shrink-0 relative group'
                                                        }
                                                        style={{
                                                            background: item.image.endsWith('.mp4') ? 'black' : `url(${item.image})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            width: cardWidth,
                                                            height: cardHeight,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                        onMouseEnter={() => setIsPaused(true)}
                                                        onMouseLeave={() => setIsPaused(false)}
                                                    >
                                                        {/* If the item is a video, render a video element */}
                                                        {item.image.endsWith('.mp4') ? (
                                                            <video
                                                                src={item.image}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                        ) : null}
                                                        {/* Green gradient overlay that appears on hover */}
                                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-98 transition-opacity duration-300"
                                                            style={{
                                                                background: 'linear-gradient(180deg, rgba(1, 27, 14, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%)'
                                                            }}>
                                                        </div>
                                                        {/* Brand logo in the center, hidden by default */}
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <img
                                                                src={item.logo}
                                                                alt={item.title}
                                                                className={`max-h-full object-contain ${item.logo.includes('l8') ? '' : 'brightness-0 invert'}
                                                                ${item.type === 'rectangle' ? 'px-4 max-w-[85%]' : 'max-w-full'}`}
                                                            />
                                                        </div>
                                                        {/* URL display that appears at the bottom when hovered */}
                                                        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <a
                                                                href={item.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-center text-sm md:text-base text-white rounded-full py-2 px-4 transition-all duration-300"
                                                            >
                                                                {item.title}
                                                            </a>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section2;