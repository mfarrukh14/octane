import React, { useState, useEffect, Suspense } from 'react'

// Import MultiStepLoader for global loading
import { MultiStepLoader } from './components/UI/multi-step-loader'

// Eagerly load critical components (Header and HeroSection)
import Header from './components/Layout/Header'
import HeroSection from './components/LandingPageSections/HeroSection'
import Footer from './components/Layout/Footer'
import CreditCard from './components/UI/Mockups/CreditCardMockup'
import Section11 from './components/LandingPageSections/Section11'

// Lazy load all sections for better performance
const Section2 = React.lazy(() => import('./components/LandingPageSections/Section2'))
const Section3 = React.lazy(() => import('./components/LandingPageSections/Section3'))
const Section4 = React.lazy(() => import('./components/LandingPageSections/Section4'))
const Section5 = React.lazy(() => import('./components/LandingPageSections/Section5'))
const Section6 = React.lazy(() => import('./components/LandingPageSections/Section6'))
const Section7 = React.lazy(() => import('./components/LandingPageSections/Section7'))
const Section8 = React.lazy(() => import('./components/LandingPageSections/Section8'))
const Section9 = React.lazy(() => import('./components/LandingPageSections/Section9'))
const Section10 = React.lazy(() => import('./components/LandingPageSections/Section10'))

// Loading states for the splash screen
const loadingStates = [
  {
    text: "Initializing Octane Platform...",
  },
  {
    text: "Loading Core Components...",
  },
  {
    text: "Setting up User Interface...",
  },
  {
    text: "Connecting Services...",
  },
  {
    text: "Loading Business Solutions...",
  },
  {
    text: "Preparing Analytics Dashboard...",
  },
  {
    text: "Finalizing Experience...",
  },
  {
    text: "Welcome to Octane!",
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  // Preload all components
  useEffect(() => {
    const preloadComponents = async () => {
      try {
        // Load all lazy components
        await Promise.all([
          import('./components/LandingPageSections/Section2'),
          import('./components/LandingPageSections/Section3'),
          import('./components/LandingPageSections/Section4'),
          import('./components/LandingPageSections/Section5'),
          import('./components/LandingPageSections/Section6'),
          import('./components/LandingPageSections/Section7'),
          import('./components/LandingPageSections/Section8'),
          import('./components/LandingPageSections/Section9'),
          import('./components/LandingPageSections/Section10'),
        ]);

        setComponentsLoaded(true);
      } catch (error) {
        console.error('Error loading components:', error);
        setComponentsLoaded(true); // Still proceed even if there's an error
      }
    };

    preloadComponents();
  }, []);

  // Hide loading screen after components are loaded and loading animation completes
  useEffect(() => {
    if (componentsLoaded) {
      // Add a small delay to ensure the loading animation completes nicely
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [componentsLoaded]);

  return (
    <>
      {/* Global Loading Screen */}
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={800}
        loop={true}
      />

      {/* Main Content */}
      {!loading && (
        <>
          <Header />
          <HeroSection />

          <Suspense fallback={<div className="min-h-[100px]" />}>
            <Section2 />
          </Suspense>

          <Suspense fallback={<div className="min-h-[100px]" />}>
            <Section3 />
          </Suspense>

          <Suspense fallback={<div className="min-h-[100px]" />}>
            <Section4 />
          </Suspense>

          <Suspense fallback={<div className="min-h-[100px]" />}>
            <Section5 />
          </Suspense>

          <Suspense fallback={<div className="min-h-[100px]" />}>
            <Section10 />
          </Suspense>

          <Suspense fallback={<div className="min-h-[100px]" />}>
            <Section6 />
          </Suspense>

          <Suspense fallback={<div className="min-h-[100px]" />}>
            <Section7 />
          </Suspense>

          <Suspense fallback={<div className="min-h-[100px]" />}>
            <Section8 />
          </Suspense>

          <Suspense fallback={<div className="min-h-[100px]" />}>
            <Section9 />
          </Suspense>

          <Suspense fallback={<div className="min-h-[100px]" />}>
            <Section11 />
          </Suspense>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
