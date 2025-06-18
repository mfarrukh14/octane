import React, { useState, useEffect, useRef, useMemo } from 'react';
import BlurText from '../UI/TextAnimations/BlurText';

const HeroSection = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isFirstVideoLoaded, setIsFirstVideoLoaded] = useState(false);
    const videoRefs = useRef([]);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive video sources with different resolutions
    const videoSources = useMemo(() => [
        {
            mobile: '/videos/v1.mp4?size=mobile', // Append size query parameter for potential server-side resizing
            tablet: '/videos/v1.mp4?size=tablet',
            desktop: '/videos/v1.mp4',
            poster: '/images/placeholders/placeholder.png' // Static image placeholder
        },
        {
            mobile: '/videos/v2.mp4?size=mobile',
            tablet: '/videos/v2.mp4?size=tablet',
            desktop: '/videos/v2.mp4',
            poster: '/images/placeholders/placeholder.png'
        },
        {
            mobile: '/videos/v3.mp4?size=mobile',
            tablet: '/videos/v3.mp4?size=tablet',
            desktop: '/videos/v3.mp4',
            poster: '/images/placeholders/placeholder.png'
        },
        {
            mobile: '/videos/v4.mp4?size=mobile',
            tablet: '/videos/v4.mp4?size=tablet',
            desktop: '/videos/v4.mp4',
            poster: '/images/placeholders/placeholder.png'
        }
    ], []);

    // Rotating texts for the second heading
    const rotatingTexts = [
        "startup to look out for!",
        "experience customers love",
        "supply chain that runs itself",
        "business that works while you sleep",
        "store that never misses an order",
        "checkout experience that converts",
        "logistics engine without overhead",
        "warehouse with zero guesswork",
        "backend built for scale",
        "next-day delivery promise",
        "store that ships nationwide",
        "platform that grows with you",
        "journey from click to door"
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

    // Load only the first video initially, then load others progressively
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // Only load and play the first video initially
                    if (videoRefs.current[0]) {
                        const firstVideo = videoRefs.current[0];

                        // Use correct source based on device
                        const source = isMobile ?
                            videoSources[0].mobile :
                            (window.innerWidth < 1024 ? videoSources[0].tablet : videoSources[0].desktop);

                        firstVideo.src = source;

                        firstVideo.load();

                        // Once the first video can play, consider the hero section loaded
                        firstVideo.addEventListener('canplay', () => {
                            setIsFirstVideoLoaded(true);
                            firstVideo.play().catch(err => {
                                console.warn('Auto-play prevented:', err);
                                // Still show content even if autoplay is blocked
                                setIsFirstVideoLoaded(true);
                            });
                        }, { once: true });
                    }

                    // Disconnect after first video is loaded
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        // Observe the section itself
        const section = document.querySelector('section');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, [isMobile, videoSources]);

    // Lazy load remaining videos
    useEffect(() => {
        if (!isFirstVideoLoaded) return;

        // Start loading the rest of the videos
        videoSources.forEach((source, index) => {
            if (index > 0 && videoRefs.current[index]) {
                const video = videoRefs.current[index];

                // Use correct source based on device
                video.src = isMobile ?
                    source.mobile :
                    (window.innerWidth < 1024 ? source.tablet : source.desktop);

                // Just load, don't play yet
                video.load();
            }
        });
    }, [isFirstVideoLoaded, isMobile, videoSources]);

    // Cycle through videos every 6 seconds
    useEffect(() => {
        if (!isFirstVideoLoaded) return;

        const interval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isFirstVideoLoaded, videoSources.length]);

    // Ensure current video plays
    useEffect(() => {
        if (!isFirstVideoLoaded) return;

        const currentVideo = videoRefs.current[currentVideoIndex];
        if (currentVideo) {
            // Preload the next video in sequence
            const nextIndex = (currentVideoIndex + 1) % videoSources.length;
            const nextVideo = videoRefs.current[nextIndex];

            if (nextVideo && !nextVideo.src) {
                const source = isMobile ?
                    videoSources[nextIndex].mobile :
                    (window.innerWidth < 1024 ? videoSources[nextIndex].tablet : videoSources[nextIndex].desktop);

                nextVideo.src = source;
                nextVideo.load();
            }

            // Play current video
            currentVideo.play().catch(err => {
                console.warn('Video play error:', err);
                // Handle playback errors gracefully
            });
        }
    }, [currentVideoIndex, isFirstVideoLoaded, isMobile, videoSources]);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video Background / Static Fallback */}
            <div className="absolute inset-0 w-full h-full z-0">
                {/* Static Background Image when videos are loading */}
                <div
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${isFirstVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
                    style={{ backgroundImage: `url(${videoSources[0].poster})` }}
                />

                {videoSources.map((source, index) => (
                    <video
                        key={`video-${index}`}
                        ref={(el) => (videoRefs.current[index] = el)}
                        poster={source.poster}
                        muted
                        playsInline
                        loop
                        preload="none" // Don't preload, we'll handle loading manually
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isFirstVideoLoaded && index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-5'
                            }`}
                    />
                ))}
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
                                <button className="bg-white cursor-pointer text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors shadow-lg">
                                    Get in touch
                                </button>
                                <button
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