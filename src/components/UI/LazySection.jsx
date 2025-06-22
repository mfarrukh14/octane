import React, { useState, useEffect, useRef, Suspense } from 'react';

const LazySection = ({ children, threshold = 0.1, rootMargin = '50px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  const LoadingFallback = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div ref={ref} className="min-h-[100px]">
      {isVisible ? (
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      ) : (
        <div className="py-12"></div>
      )}
    </div>
  );
};

export default LazySection;
