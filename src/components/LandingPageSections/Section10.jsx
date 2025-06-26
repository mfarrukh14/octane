// src/components/Section10.jsx
import React, { useState, useEffect } from 'react'
import ReactCountryFlag from 'react-country-flag'

// Custom hook for counter animation
const useCountUp = (endValue, duration = 1000, startValue = 0) => {
  const [count, setCount] = useState(startValue)

  useEffect(() => {
    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      const currentValue = startValue + (endValue - startValue) * progress
      setCount(currentValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [endValue, duration, startValue])

  return count
}

const countries = [
  { code: 'PK', name: 'Pakistan', currency: 'PKR', price: 32500, buyNow: 'ابھی خریدیں', image: '/images/section6images/CA1.PNG' },
  { code: 'AE', name: 'UAE', currency: 'AED', price: 459, buyNow: 'اشتري الآن', image: '/images/section6images/CA2.PNG' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', price: 469, buyNow: 'اشتري الآن', image: '/images/section6images/CA1.PNG' },
  { code: 'CA', name: 'Canada', currency: 'CAD', price: 159.99, buyNow: 'Buy now', image: '/images/section6images/CA2.PNG' },
  { code: 'US', name: 'United States', currency: 'USD', price: 125.00, buyNow: 'Buy now', image: '/images/section6images/CA1.PNG' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', price: 89.50, buyNow: 'Buy now', image: '/images/section6images/CA2.PNG' },
  { code: 'AU', name: 'Australia', currency: 'AUD', price: 169.99, buyNow: 'Buy now', image: '/images/section6images/CA1.PNG' },
]

const Section10 = () => {
  const [selected, setSelected] = useState(0) // default to Pakistan
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const sectionRef = React.useRef(null)
  const total = countries.length

  // helpers for circular prev/next
  const prevIdx = (i) => (i - 1 + total) % total
  const nextIdx = (i) => (i + 1) % total

  // Add currency conversion rates (base: USD)
  const currencyRates = {
    PKR: 278.5,
    AED: 3.67,
    SAR: 3.75,
    CAD: 1.35,
    USD: 1.0,
    GBP: 0.79,
    AUD: 1.48
  }
  // Convert USD amounts to local currency
  const convertCurrency = (usdAmount) => {
    const rate = currencyRates[curr.currency]
    return (usdAmount * rate).toFixed(2)
  }
  // Animated number component
  const AnimatedNumber = ({ value, currency, decimals = 2 }) => {
    const shouldAnimate = isInView || hasAnimated
    const animatedValue = useCountUp(shouldAnimate ? parseFloat(value) : 0, 800)
    return (
      <span>
        {animatedValue.toFixed(decimals)} {currency}
      </span>
    )
  }

  const curr = countries[selected]
  // Get the 5 visible countries (two above, current, two below)
  const getVisibleCountries = () => {
    return [
      { country: countries[prevIdx(prevIdx(selected))], position: 'topmost', index: prevIdx(prevIdx(selected)) },
      { country: countries[prevIdx(selected)], position: 'top', index: prevIdx(selected) },
      { country: countries[selected], position: 'middle', index: selected },
      { country: countries[nextIdx(selected)], position: 'bottom', index: nextIdx(selected) },
      { country: countries[nextIdx(nextIdx(selected))], position: 'bottommost', index: nextIdx(nextIdx(selected)) },
    ]
  }

  // Get the 3 visible cards (left, center, right)
  const getVisibleCards = () => {
    return [
      { country: countries[prevIdx(selected)], position: 'left', index: prevIdx(selected) },
      { country: countries[selected], position: 'center', index: selected },
      { country: countries[nextIdx(selected)], position: 'right', index: nextIdx(selected) }
    ]
  }

  const visibleCountries = getVisibleCountries()
  const visibleCards = getVisibleCards()
  const handleCountryClick = (clickedIndex) => {
    setSelected(clickedIndex)
  }  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected(prevIdx(selected))
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected(nextIdx(selected))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selected])

  // Screen size detection
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

  // Intersection Observer for initial animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true)
          setHasAnimated(true)
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully in view
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasAnimated])
  // Add scroll wheel and swipe navigation for the flags area
  const handleWheel = (e) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      setSelected(nextIdx(selected))
      if (isSmallScreen && window.navigator.vibrate) window.navigator.vibrate(10)
    } else {
      setSelected(prevIdx(selected))
      if (isSmallScreen && window.navigator.vibrate) window.navigator.vibrate(10)
    }
  }

  // Touch swipe for mobile
  useEffect(() => {
    if (!isSmallScreen) return;
    let startY = null;
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      if (startY === null) return;
      const deltaY = e.touches[0].clientY - startY;
      if (Math.abs(deltaY) > 30) {
        if (deltaY > 0) {
          setSelected(prevIdx(selected));
          if (window.navigator.vibrate) window.navigator.vibrate(10);
        } else {
          setSelected(nextIdx(selected));
          if (window.navigator.vibrate) window.navigator.vibrate(10);
        }
        startY = null;
      }
    };
    const flagsRow = document.getElementById('flags-row-mobile');
    if (flagsRow) {
      flagsRow.addEventListener('touchstart', handleTouchStart);
      flagsRow.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      if (flagsRow) {
        flagsRow.removeEventListener('touchstart', handleTouchStart);
        flagsRow.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [isSmallScreen, selected]);

  return (
    <section ref={sectionRef} className="relative py-16 px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tl from-black via-black to-teal-900"></div>
      
      {/* Map Background - Right side only, contained within padding */}
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
        <img 
          src="/images/map.png" 
          alt="World Map" 
          className="w-full h-full object-contain opacity-50 invert"
        />
      </div>
      
      {/* Content Layer */}
      <div className='relative z-10 max-w-7xl mx-auto text-white'>
        <h2 className="text-cyan-400 text-sm uppercase mb-2">Local and global</h2>
        <h1 className="text-3xl md:text-5xl font-light mb-8 md:mb-12">Grow around the world</h1>

        {/* Mobile Layout - Flags above cards */}
        <div className={isSmallScreen ? 'block' : 'lg:hidden'}>
          {/* Flags Row - Horizontal on mobile */}
          <div
            id="flags-row-mobile"
            className="flex items-center justify-center mb-8 relative"
            onWheel={handleWheel}
          >
            {visibleCountries.map(({ country, position, index }, displayIndex) => (
              <div
                key={`${country.code}-${index}`}
                className={`w-12 h-10 mx-2 transition-all duration-500 ease-in-out cursor-pointer 
                  ${position === 'middle' ? 'transform scale-110 z-10' : ''}
                  ${position === 'top' || position === 'bottom' ? 'transform scale-95 z-0 filter blur-[2px] opacity-60' : ''}
                  ${position === 'topmost' || position === 'bottommost' ? 'transform scale-90 z-0 filter blur-sm opacity-30' : ''}`}
                style={{
                  background: position !== 'middle' ? `linear-gradient(${position === 'top' || position === 'topmost' ? '90deg' : '270deg'}, rgba(0,31,41,0.6) 0%, transparent 100%)` : 'transparent'
                }}
              >
                <button
                  onClick={() => handleCountryClick(index)}
                  className={`w-full cursor-pointer h-full rounded-lg p-1 overflow-hidden transition-all duration-300 relative ${position === 'middle' ? 'bg-white/20' : 'bg-white/20 hover:scale-105 hover:opacity-70'}`}
                >
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                    title={country.name}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Product Card Stack - Mobile */}
          <div className="relative w-full max-w-sm mx-auto h-80 mb-8">
            {visibleCards.map(({ country, position, index }) => (<div
              key={`card-${country.code}-${index}`}
              className={`absolute top-0 w-full h-full rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${position === 'center'
                  ? 'left-0 scale-100 opacity-100 bg-white shadow-2xl z-10'
                  : position === 'left'
                    ? 'left-0 -translate-x-4 scale-90 opacity-50 bg-gray-800 z-0'
                    : 'right-0 translate-x-4 scale-90 opacity-50 bg-gray-800 z-0'
                }`}
            >
              <img
                src={country.image}
                alt={`Product for ${country.name}`}
                className="w-full h-full object-cover"
              />

              {position !== 'center' && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F29]/40 to-transparent" />
              )}

              <button
                className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-lg cursor-pointer w-4/5 py-3 font-medium transition-all duration-300 ${position === 'center'
                    ? 'bg-[#00282F] text-white hover:bg-[#003A45] shadow-lg'
                    : 'bg-gradient-to-t from-[#001F29] to-transparent text-white/80'
                  }`}
              >
                {country.buyNow}
              </button>
            </div>
            ))}

            {/* Price bubble - Mobile positioning */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black rounded-full px-3 py-2 flex items-center text-xs shadow-lg transition-all duration-300 z-20">
              <ReactCountryFlag
                countryCode={curr.code}
                svg
                style={{
                  width: '14px',
                  height: '10px',
                  marginRight: '6px'
                }}
              />
              <span className="font-bold mr-1">{curr.code}</span>
              <span>Order for {curr.currency}{curr.price.toLocaleString()}</span>
            </div>
          </div>        {/* Shipping Modal - Below cards on mobile */}
          <div className="bg-white text-black rounded-xl shadow-2xl w-full max-w-md mx-auto p-6 relative">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium">Order summary</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            
            {/* Product Section */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-30 h-30 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/section6images/CA1.PNG" 
                    alt="Product" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <p className="font-medium">Black dress</p>
                  <p className="text-sm text-gray-500">Size: M</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-medium">
                    <AnimatedNumber
                      value={convertCurrency(125.00)}
                      currency={curr.currency}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Options */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Shipping</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input type="radio" name="shipping" className="w-4 h-4" defaultChecked />
                  <div className="flex-1">
                    <p className="text-sm">Standard</p>
                    <p className="text-xs text-gray-500">5-7 business days</p>
                  </div>
                  <p className="text-sm font-medium">
                    <AnimatedNumber
                      value={convertCurrency(8.50)}
                      currency={curr.currency}
                    />
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="radio" name="shipping" className="w-4 h-4" />
                  <div className="flex-1">
                    <p className="text-sm">Express</p>
                    <p className="text-xs text-gray-500">2-3 business days</p>
                  </div>
                  <p className="text-sm font-medium">
                    <AnimatedNumber
                      value={convertCurrency(15.00)}
                      currency={curr.currency}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    <AnimatedNumber
                      value={convertCurrency(125.00)}
                      currency={curr.currency}
                    />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    <AnimatedNumber
                      value={convertCurrency(8.50)}
                      currency={curr.currency}
                    />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>
                    <AnimatedNumber
                      value={convertCurrency(10.67)}
                      currency={curr.currency}
                    />
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-2 border-t font-bold text-lg">
                <span>Total</span>
                <span>
                  <AnimatedNumber
                    value={convertCurrency(144.17)}
                    currency={curr.currency}
                  />
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Continue to checkout
            </button>
          </div>
        </div>

        {/* Desktop Layout - Original layout */}
        <div className={`${isSmallScreen ? 'hidden' : 'hidden lg:flex'} relative items-center justify-between`}>
          {/* Flags Column - Dial Effect */}
          <div
            className="flex flex-col items-center mr-8 h-80 justify-center relative"
            onWheel={handleWheel}
          >
            {visibleCountries.map(({ country, position, index }, displayIndex) => (
              <div
                key={`${country.code}-${index}`}
                className={`w-14 h-12 mb-4 last:mb-0 transition-all duration-500 ease-in-out cursor-pointer 
                  ${position === 'middle' ? 'transform scale-110 z-10' : ''}
                  ${position === 'top' || position === 'bottom' ? 'transform scale-95 z-0 filter blur-[2px] opacity-60' : ''}
                  ${position === 'topmost' || position === 'bottommost' ? 'transform scale-90 z-0 filter blur-sm opacity-30' : ''}`}
                style={{
                  background: position !== 'middle' ? `linear-gradient(${position === 'top' || position === 'topmost' ? '180deg' : '0deg'}, rgba(0,31,41,0.6) 0%, transparent 100%)` : 'transparent'
                }}
              >
                <button
                  onClick={() => handleCountryClick(index)}
                  className={`w-full cursor-pointer h-full rounded-lg p-2 overflow-hidden transition-all duration-300 relative ${position === 'middle' ? 'bg-white/20' : 'bg-white/20 hover:scale-105 hover:opacity-70'}`}
                >
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                    title={country.name}
                  />
                </button>
              </div>
            ))}
          </div>        {/* Product Card Stack - Dial Effect */}
          <div className="relative w-80 h-96 flex-shrink-0">
            {visibleCards.map(({ country, position, index }) => (<div
              key={`card-${country.code}-${index}`}
              className={`absolute top-0 w-full h-full rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${position === 'center'
                  ? 'left-0 scale-100 opacity-100 bg-white shadow-2xl z-10'
                  : position === 'left'
                    ? 'left-0 -translate-x-8 scale-90 opacity-50 bg-gray-800 z-0'
                    : 'right-0 translate-x-8 scale-90 opacity-50 bg-gray-800 z-0'
                }`}
            >
              <img
                src={country.image}
                alt={`Product for ${country.name}`}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay for non-center cards */}              {position !== 'center' && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F29]/40 to-transparent" />
              )}

              {/* Buy now button */}
              <button
                className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-lg cursor-pointer w-4/5 py-3 font-medium transition-all duration-300 ${position === 'center'
                    ? 'bg-[#00282F] text-white hover:bg-[#003A45] shadow-lg'
                    : 'bg-gradient-to-t from-[#001F29] to-transparent text-white/80'
                  }`}
              >
                {country.buyNow}
              </button>

            </div>
            ))}

            {/* Price bubble - now updates with selected country */}
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full px-4 py-2 flex items-center text-sm shadow-lg transition-all duration-300 z-20">
              <ReactCountryFlag
                countryCode={curr.code}
                svg
                style={{
                  width: '16px',
                  height: '12px',
                  marginRight: '8px'
                }}
              />
              <span className="font-bold mr-2">{curr.code}</span>
              <span>Order for {curr.currency}{curr.price.toLocaleString()}</span>
            </div>
          </div>        {/* Shipping Modal (on map) */}
          <div className="ml-16 bg-white text-black rounded-xl shadow-2xl w-96 p-6 relative">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium">Order summary</h3>
              <button className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            
            {/* Product Section */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/section6images/CA1.PNG" 
                    alt="Product" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <p className="font-medium">Black dress</p>
                  <p className="text-sm text-gray-500">Size: M</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-medium">
                    <AnimatedNumber
                      value={convertCurrency(125.00)}
                      currency={curr.currency}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Options */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Shipping</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input type="radio" name="shipping" className="w-4 h-4" defaultChecked />
                  <div className="flex-1">
                    <p className="text-sm">Standard</p>
                    <p className="text-xs text-gray-500">5-7 business days</p>
                  </div>
                  <p className="text-sm font-medium">
                    <AnimatedNumber
                      value={convertCurrency(8.50)}
                      currency={curr.currency}
                    />
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="radio" name="shipping" className="w-4 h-4" />
                  <div className="flex-1">
                    <p className="text-sm">Express</p>
                    <p className="text-xs text-gray-500">2-3 business days</p>
                  </div>
                  <p className="text-sm font-medium">
                    <AnimatedNumber
                      value={convertCurrency(15.00)}
                      currency={curr.currency}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    <AnimatedNumber
                      value={convertCurrency(125.00)}
                      currency={curr.currency}
                    />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    <AnimatedNumber
                      value={convertCurrency(8.50)}
                      currency={curr.currency}
                    />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>
                    <AnimatedNumber
                      value={convertCurrency(10.67)}
                      currency={curr.currency}
                    />
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-2 border-t font-bold text-lg">
                <span>Total</span>
                <span>
                  <AnimatedNumber
                    value={convertCurrency(144.17)}
                    currency={curr.currency}
                  />
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Continue to checkout
            </button>
          </div>
        </div>      {/* Footer text */}
        <div className="mt-16 max-w-xl">
          <h4 className="text-xl font-semibold mb-2">Sell and ship everywhere</h4>
          <p className="text-gray-300">
            Octane takes the complexity out of international selling, from delivering products faster and more affordably with{' '}
            <a href="#" className="underline">Octane Shipping</a> to localizing your experience with{' '}
            <a href="#" className="underline">Octane Markets</a>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Section10