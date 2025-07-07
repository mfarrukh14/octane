import React, { useState, useEffect, useRef, useMemo } from 'react';
import BlurText from '../UI/TextAnimations/BlurText';

const HeroSection = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Single video source with responsive options
    const videoSource = useMemo(() => ({
        mobile: '/videos/mainVideo.mp4?size=mobile',
        tablet: '/videos/mainVideo.mp4?size=tablet', 
        desktop: '/videos/mainVideo.mp4',
        poster: '/images/placeholders/placeholder.png'
    }), []);

    // Rotating texts for the second heading
    const rotatingTexts = [
        "global brand to look out for!",
        "delivery experience customers love",
        "supply chain that runs itself",
        "business that works while you sleep",
        "store that never misses an order",
        "checkout experience that converts",
        "logistics engine without overhead",
        "platform that grows with you",
        "customer journey from click to door"
    ];

    // Check if device is mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    // Load and play the video when component mounts and comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && videoRef.current) {
                    const video = videoRef.current;

                    // Use correct source based on device
                    const source = isMobile ?
                        videoSource.mobile :
                        (window.innerWidth < 1024 ? videoSource.tablet : videoSource.desktop);

                    video.src = source;
                    video.load();

                    // Once the video can play, start playback
                    video.addEventListener('canplay', () => {
                        setIsVideoLoaded(true);
                        video.play().catch(err => {
                            console.warn('Auto-play prevented:', err);
                            // Still show content even if autoplay is blocked
                            setIsVideoLoaded(true);
                        });
                    }, { once: true });

                    // Disconnect after video starts loading
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        // Observe the section itself
        const section = document.querySelector('section');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, [isMobile, videoSource]);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video Background / Static Fallback */}
            <div className="absolute inset-0 w-full h-full z-0">
                {/* Static Background Image when video is loading */}
                <div
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
                    style={{ backgroundImage: `url(${videoSource.poster})` }}
                />

                <video
                    ref={videoRef}
                    poster={videoSource.poster}
                    muted
                    playsInline
                    loop
                    preload="none"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            {/* Very subtle dark overlay */}
            <div className="absolute inset-0 bg-black/50 z-20"></div>

            {/* Hero Content - Always visible regardless of video loading */}
            <div className="relative z-30 flex items-center h-full text-white w-full">
                <div className="max-w-7xl mx-auto px-4 md:p-12 w-full">
                    <div className="max-w-5xl">
                        <h1 className="text-6xl md:text-5xl sm:text-3xl mb-2 tracking-tighter leading-tight drop-shadow-lg">
                            Build the next
                        </h1>
                        <BlurText
                            textList={rotatingTexts}
                            rotationInterval={4000}
                            delay={80}
                            className="text-6xl md:text-5xl sm:text-3xl mb-6 tracking-tighter leading-tight w-full"
                            animateBy="words"
                            direction="top"
                        />
                        <p className="text-xl md:text-2xl mb-8 leading-relaxed drop-shadow-md">
                            Build, Fullfill, and Grow WorldWide - all from one powerful dashboard.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                            <div className='flex flex-col lg:flex-row md:flex-row sm:flex-col justify-between w-full'>
                               <button
                                    onClick={() => window.open('https://docs.google.com/document/d/1BlMGR8jbJRaksS3NpWFn3QNTh9i6jagOyzkD40cIgcc/edit?usp=drive_link', '_blank')}
                                    className="relative group cursor-pointer overflow-hidden text-white px-8 py-4 rounded-full text-lg font-medium hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full backdrop-blur-md"></span>
                                    <span className="relative flex items-center gap-2">
                                        Why choose Octane
                                        <svg
                                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;