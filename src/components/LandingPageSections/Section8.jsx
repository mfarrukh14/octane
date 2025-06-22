import React, { Suspense } from "react";
import { GlobeDemo } from "../UI/GlobeAnimation/World";

// Globe loading fallback component
const GlobeLoadingFallback = () => (
    <div className="w-full h-[80vh] sm:h-[70vh] md:h-[75vh] lg:h-screen bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center">
        <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mb-4"></div>
            <p className="text-white/60 text-sm">Loading Global Network...</p>
        </div>
    </div>
);

// Error boundary for globe component
class GlobeErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Globe component error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-[80vh] sm:h-[70vh] md:h-[75vh] lg:h-screen bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-red-400 text-2xl mb-4">🌍</div>
                        <p className="text-white/60 text-sm">Network visualization unavailable</p>
                        <p className="text-white/40 text-xs mt-2">Global reach continues...</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default function Section8() {
    return (        <section className="relative w-full bg-black pb-20 pt-40 z-40 px-12 md:px-12 lg:px-24">
            <div className="flex flex-col lg:flex-row gap-3 w-full">                <div className="w-full lg:w-2/3">
                    <GlobeErrorBoundary>
                        <Suspense fallback={<GlobeLoadingFallback />}>
                            <GlobeDemo />
                        </Suspense>
                    </GlobeErrorBoundary>
                </div>
                <div className="w-full lg:w-1/3 lg:pr-20">
                    <div>
                        <h2 className="text-white text-5xl tracking-tighter font-normal mb-10">
                            Built for Pakistan. Delivering to the world.
                        </h2>
                    </div>
                    <div>
                        <span className="text-gray-400">
                            From remote mountain towns to city marketplaces, Octane unites Pakistan’s sellers with 5.4 billion shoppers across the globe .we enable fast, and reliable delivery to 150+  countries — helping you grow beyond borders. Wherever business takes you, Octane gets you there.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}