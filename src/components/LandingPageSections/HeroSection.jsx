import React, { useState, useEffect, useRef } from 'react';
import BlurText from '../UI/TextAnimations/BlurText';

const HeroSection = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [videosLoaded, setVideosLoaded] = useState(false);
    const videoRefs = useRef([]);

    // Video files from the public/videos folder
    const videos = [
        '/videos/v1.mp4',
        '/videos/v2.mp4',
        '/videos/v3.mp4',
        '/videos/v4.mp4'
    ];

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

    // Handle video loading
    useEffect(() => {
        let loadedCount = 0;
        const checkAllLoaded = () => {
            loadedCount++;
            if (loadedCount === videos.length) {
                setVideosLoaded(true);
            }
        };

        videoRefs.current.forEach((video) => {
            if (video) {
                video.addEventListener('loadeddata', checkAllLoaded);
            }
        });

        return () => {
            videoRefs.current.forEach((video) => {
                if (video) {
                    video.removeEventListener('loadeddata', checkAllLoaded);
                }
            });
        };
    }, [videos.length]);

    // Cycle through videos every 6 seconds
    useEffect(() => {
        if (!videosLoaded) return;

        const interval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [videos.length, videosLoaded]);

    // Ensure current video plays
    useEffect(() => {
        if (videosLoaded && videoRefs.current[currentVideoIndex]) {
            videoRefs.current[currentVideoIndex].play().catch(console.error);
        }
    }, [currentVideoIndex, videosLoaded]);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                {videos.map((video, index) => (
                    <video
                        key={video}
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={video}
                        autoPlay={index === 0}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-5'
                            }`}
                        onLoadStart={() => console.log(`Loading video ${index + 1}`)}
                        onCanPlay={() => console.log(`Video ${index + 1} can play`)}
                        onError={(e) => console.error(`Video ${index + 1} error:`, e)}
                    />
                ))}
            </div>

            {/* Very subtle black overlay - reduced to 10% opacity */}
            <div className="absolute inset-0 bg-black/50 z-20"></div>

            {/* Hero Content */}
            <div className="relative z-30 flex items-center h-full text-white w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-5xl">
                        <h1 className="text-6xl md:text-7xl mb-2 tracking-tighter leading-tight drop-shadow-lg">
                            Build the next
                        </h1>
                        <BlurText
                            textList={rotatingTexts}
                            rotationInterval={2500}
                            delay={80}
                            className="text-6xl md:text-7xl mb-6 tracking-tighter leading-tight w-full"
                            animateBy="words"
                            direction="top"
                        />
                        <p className="text-xl md:text-2xl mb-8 leading-relaxed drop-shadow-md">
                            Start, run, and grow your business with powerful tools and expert support
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                            <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                                Start for Free
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="relative group overflow-hidden text-white px-8 py-4 rounded-full text-lg font-medium hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
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

            {/* Video Loading Indicator */}
            {!videosLoaded && (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-40">
                    <div className="text-white text-xl">Loading videos...</div>
                </div>
            )}
        </section>
    );
};

export default HeroSection;