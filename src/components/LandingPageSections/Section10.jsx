// src/components/Section10.jsx
import React, { useState, useEffect } from 'react'
import ReactCountryFlag from 'react-country-flag'

const countries = [
  { code: 'MX', name: 'Mexico', currency: 'MXN', price: 2499, buyNow: 'Comprar ahora' },
  { code: 'ES', name: 'Spain', currency: 'EUR', price: 109.99, buyNow: 'Comprar ahora' },
  { code: 'US', name: 'United States', currency: 'USD', price: 125.00, buyNow: 'Buy now' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', price: 89.50, buyNow: 'Buy now' },
  { code: 'AU', name: 'Australia', currency: 'AUD', price: 169.99, buyNow: 'Buy now' },
  { code: 'FR', name: 'France', currency: 'EUR', price: 119.00, buyNow: 'Acheter maintenant' },
  { code: 'DE', name: 'Germany', currency: 'EUR', price: 115.50, buyNow: 'Jetzt kaufen' },
  { code: 'IT', name: 'Italy', currency: 'EUR', price: 120.00, buyNow: 'Acquista ora' },
  { code: 'CA', name: 'Canada', currency: 'CAD', price: 159.99, buyNow: 'Buy now' },
  { code: 'JP', name: 'Japan', currency: 'JPY', price: 14500, buyNow: '今すぐ購入' },
]

const Section10 = () => {
  const [selected, setSelected] = useState(2) // default to US
  const total = countries.length

  // helpers for circular prev/next
  const prevIdx = (i) => (i - 1 + total) % total
  const nextIdx = (i) => (i + 1) % total

  const curr = countries[selected]
  // Get the 3 visible countries (previous, current, next)
  const getVisibleCountries = () => {
    return [
      { country: countries[prevIdx(selected)], position: 'top', index: prevIdx(selected) },
      { country: countries[selected], position: 'middle', index: selected },
      { country: countries[nextIdx(selected)], position: 'bottom', index: nextIdx(selected) }
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
  }

  // Add keyboard navigation
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

  // Add scroll wheel navigation for the flags area
  const handleWheel = (e) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      setSelected(nextIdx(selected))
    } else {
      setSelected(prevIdx(selected))
    }
  }
  return (
    <section className="bg-[#001F29] text-white py-16 px-8">
      <h2 className="text-cyan-400 text-sm uppercase mb-2">Local and global</h2>
      <h1 className="text-3xl md:text-5xl font-light mb-8 md:mb-12">Grow around the world</h1>

      {/* Mobile Layout - Flags above cards */}
      <div className="lg:hidden">
        {/* Flags Row - Horizontal on mobile */}
        <div 
          className="flex items-center justify-center mb-8 relative"
          onWheel={handleWheel}
        >
          {visibleCountries.map(({ country, position, index }, displayIndex) => (
            <div
              key={`${country.code}-${index}`}
              className={`w-12 h-10 mx-2 transition-all duration-500 ease-in-out cursor-pointer ${
                position === 'middle' ? 'transform scale-110 z-10' : 'transform scale-90'
              }`}
              style={{
                opacity: position === 'middle' ? 1 : 0.4,
                background: position !== 'middle' 
                  ? `linear-gradient(${position === 'top' ? '90deg' : '270deg'}, rgba(0,31,41,0.6) 0%, transparent 100%)`
                  : 'transparent'
              }}
            >
              <button
                onClick={() => handleCountryClick(index)}
                className={`w-full cursor-pointer h-full rounded-lg p-1 overflow-hidden transition-all duration-300 relative ${
                  position === 'middle'
                    ? 'bg-white/20'
                    : 'bg-white/20 hover:scale-105 hover:opacity-70'
                }`}              >
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
                {position !== 'middle' && (
                  <div className={`absolute inset-0 bg-gradient-to-${position === 'top' ? 'r' : 'l'} from-[#001F29]/60 to-transparent pointer-events-none`} />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Product Card Stack - Mobile */}
        <div className="relative w-full max-w-sm mx-auto h-80 mb-8">
          {visibleCards.map(({ country, position, index }) => (
            <div
              key={`card-${country.code}-${index}`}
              className={`absolute top-0 w-full h-full rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${
                position === 'center'
                  ? 'left-0 scale-100 opacity-100 bg-white shadow-2xl z-10'
                  : position === 'left'
                  ? 'left-0 -translate-x-4 scale-90 opacity-50 bg-gray-800 z-0'
                  : 'right-0 translate-x-4 scale-90 opacity-50 bg-gray-800 z-0'
              }`}
            >
              <img 
                src="/images/products/product.jpg" 
                alt={`Product for ${country.name}`} 
                className="w-full h-full object-cover" 
              />
              
              {position !== 'center' && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F29]/40 to-transparent" />
              )}
              
              <button 
                className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-lg cursor-pointer w-4/5 py-3 font-medium transition-all duration-300 ${
                  position === 'center'
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
        </div>

        {/* Shipping Modal - Below cards on mobile */}
        <div className="bg-white text-black rounded-xl shadow-2xl w-full max-w-md mx-auto p-4 relative">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">&times;</button>
          <h3 className="font-medium mb-4">Buy 0 shipping labels</h3>
          <ul className="space-y-2 mb-4">
            {[
              { carrier: 'USPS Ground Advantage' },
              { carrier: 'UPS® Ground Saver' },
              { carrier: 'DHL Express Worldwide' },
            ].map((item) => (
              <li key={item.carrier} className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-gray-300 rounded" />
                  <span className="text-sm">0 × {item.carrier}</span>
                </div>
                <span className="text-sm">0.00 USD</span>
              </li>
            ))}
          </ul>
          <div className="border-t pt-2 mb-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>0.00 USD</span></div>
            <div className="flex justify-between bg-gradient-to-r from-green-100 to-transparent py-1">
              <span>Shopify Plan Discount</span><span>0.00 USD</span>
            </div>
            <div className="flex justify-between"><span>Insurance</span><span>Included</span></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">Total</span>
            <span className="font-bold text-xl">0.00 USD</span>
          </div>
          <label className="block mb-4">
            <span className="block text-sm text-gray-600">Shipping date</span>
            <select className="mt-1 block w-full border rounded px-2 py-1 text-sm">
              <option>Today</option>
            </select>
          </label>
          <div className="flex justify-end space-x-2">
            <button className="px-3 py-1 rounded border text-sm">Cancel</button>
            <button className="px-3 py-1 rounded bg-[#00282F] text-white text-sm">Buy 0 shipping labels</button>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Original layout */}
      <div className="hidden lg:flex relative items-center justify-between">        {/* Flags Column - Dial Effect */}
        <div 
          className="flex flex-col items-center mr-8 h-48 justify-center relative"
          onWheel={handleWheel}
        >          {visibleCountries.map(({ country, position, index }, displayIndex) => (
            <div
              key={`${country.code}-${index}`}
              className={`w-14 h-12 mb-4 last:mb-0 transition-all duration-500 ease-in-out cursor-pointer ${
                position === 'middle' ? 'transform scale-110 z-10' : 'transform scale-90'
              }`}
              style={{
                opacity: position === 'middle' ? 1 : 0.4,
                background: position !== 'middle' 
                  ? `linear-gradient(${position === 'top' ? '180deg' : '0deg'}, rgba(0,31,41,0.6) 0%, transparent 100%)`
                  : 'transparent'
              }}
            >
              <button
                onClick={() => handleCountryClick(index)}
                className={`w-full cursor-pointer h-full rounded-lg p-2 overflow-hidden transition-all duration-300 relative ${
                  position === 'middle'
                    ? 'bg-white/20'
                    : 'bg-white/20 hover:scale-105 hover:opacity-70'
                }`}              >
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
                {position !== 'middle' && (
                  <div className={`absolute inset-0 bg-gradient-to-${position === 'top' ? 'b' : 't'} from-[#001F29]/60 to-transparent pointer-events-none`} />
                )}
              </button>
            </div>
          ))}
        </div>        {/* Product Card Stack - Dial Effect */}
        <div className="relative w-80 h-96 flex-shrink-0">
          {visibleCards.map(({ country, position, index }) => (
            <div
              key={`card-${country.code}-${index}`}
              className={`absolute top-0 w-full h-full rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${
                position === 'center'
                  ? 'left-0 scale-100 opacity-100 bg-white shadow-2xl z-10'
                  : position === 'left'
                  ? 'left-0 -translate-x-8 scale-90 opacity-50 bg-gray-800 z-0'
                  : 'right-0 translate-x-8 scale-90 opacity-50 bg-gray-800 z-0'
              }`}
            >
              <img 
                src="/images/products/product.jpg" 
                alt={`Product for ${country.name}`} 
                className="w-full h-full object-cover" 
              />
              
              {/* Gradient overlay for non-center cards */}              {position !== 'center' && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F29]/40 to-transparent" />
              )}
              
              {/* Buy now button */}
              <button 
                className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-lg cursor-pointer w-4/5 py-3 font-medium transition-all duration-300 ${
                  position === 'center'
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
        </div>

        {/* Shipping Modal (on map) */}
        <div className="ml-16 bg-white text-black rounded-xl shadow-2xl w-96 p-6 relative">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">&times;</button>
          <h3 className="font-medium mb-4">Buy 0 shipping labels</h3>
          <ul className="space-y-2 mb-4">
            {[
              { carrier: 'USPS Ground Advantage' },
              { carrier: 'UPS® Ground Saver' },
              { carrier: 'DHL Express Worldwide' },
            ].map((item) => (
              <li key={item.carrier} className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 bg-gray-300 rounded" />
                  <span>0 × {item.carrier}</span>
                </div>
                <span>0.00 USD</span>
              </li>
            ))}
          </ul>
          <div className="border-t pt-2 mb-4">
            <div className="flex justify-between"><span>Subtotal</span><span>0.00 USD</span></div>
            <div className="flex justify-between bg-gradient-to-r from-green-100 to-transparent py-1">
              <span>Shopify Plan Discount</span><span>0.00 USD</span>
            </div>
            <div className="flex justify-between"><span>Insurance</span><span>Included</span></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-2xl">0.00 USD</span>
          </div>
          <label className="block mb-4">
            <span className="block text-sm text-gray-600">Shipping date</span>
            <select className="mt-1 block w-full border rounded px-2 py-1">
              <option>Today</option>
            </select>
          </label>
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-1 rounded border">Cancel</button>
            <button className="px-4 py-1 rounded bg-[#00282F] text-white">Buy 0 shipping labels</button>
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="mt-16 max-w-xl">
        <h4 className="text-xl font-semibold mb-2">Sell and ship everywhere</h4>
        <p className="text-gray-300">
          Shopify takes the complexity out of international selling, from delivering products faster and more affordably with{' '}
          <a href="#" className="underline">Shopify Shipping</a> to localizing your experience with{' '}
          <a href="#" className="underline">Shopify Markets</a>.
        </p>
      </div>
    </section>
  )
}

export default Section10