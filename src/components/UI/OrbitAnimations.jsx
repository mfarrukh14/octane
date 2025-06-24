import React, { useState } from 'react';
import { FaStar, FaHeart, FaCircle } from 'react-icons/fa';
import { FaDiamond } from 'react-icons/fa6';
import { AiOutlineStar } from 'react-icons/ai';

const OrbitAnimation = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const shouldBlur = (iconKey) =>
    hoveredIcon && hoveredIcon !== iconKey ? 'blur-sm' : '';
  return (
    <div className={`relative w-64 h-64 flex items-center justify-center ${hoveredIcon ? 'orbit-paused' : ''}`}>
      <style>{`
        .counter-rotate-outer {
          animation: counterRotateOuter 20s linear infinite;
        }
        .counter-rotate-inner {
          animation: counterRotateInner 30s linear infinite;
        }
        .orbit-paused .counter-rotate-outer,
        .orbit-paused .counter-rotate-inner {
          animation-play-state: paused;
        }
        .orbit-paused .animate-spin {
          animation-play-state: paused;
        }
        .mini-orbit {
          animation: miniOrbit 2s linear infinite;
        }
        .mini-icon {
          animation: miniCounterRotate 2s linear infinite;
        }
        .hovered-icon {
          filter: none !important;
          z-index: 60 !important;
        }
        @keyframes counterRotateOuter {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(-360deg); }
        }
        @keyframes counterRotateInner {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes miniOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes miniCounterRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>      {/* Center Icon */}
      <img 
        src="/images/octaneLogo.png" 
        alt="Octane Logo"
        className={`w-12 h-12 object-contain z-10 transition-all duration-300 ${shouldBlur('center')}`}
      />{/* Outer Orbit */}
      <div
        className="absolute inset-0 rounded-full animate-spin transition-all duration-300"
        style={{
          animationDuration: '20s',
          border: '2px dotted #9CA3AF',
        }}
      >        {['outer-star', 'outer-heart'].map((key, i) => {
          const imageSrc = key === 'outer-star' ? '/images/orbitIcons/order.png' : '/images/orbitIcons/customer.png';
          const position =
            key === 'outer-star'
              ? { top: '50%', right: '-30px' }
              : { top: '50%', left: '-30px' };

          return (<div
              key={key}
              className={`absolute counter-rotate-outer transition-all duration-300 cursor-pointer ${
                hoveredIcon === key ? 'scale-150 hovered-icon' : ''
              } ${shouldBlur(key)}`}
              style={position}
              onMouseEnter={() => setHoveredIcon(key)}
              onMouseLeave={() => setHoveredIcon(null)}
            >              <img 
                src={imageSrc} 
                alt={key === 'outer-star' ? 'Order Management' : 'Customer Management'}
                className="w-20 h-auto object-contain"
              />              {/* Single mini orbit centered on the icon */}
              {hoveredIcon === key && (
                <div 
                  className="absolute w-20 h-20 pointer-events-none" 
                  style={{ 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    zIndex: '-1'
                  }}
                >
                  <div
                    className="absolute w-full h-full rounded-full mini-orbit"
                    style={{ 
                      border: '1px dotted #9CA3AF',
                    }}
                  >                    <img 
                      src="/images/orbitIcons/paperplane.png"
                      alt="Communication"
                      className="absolute w-4 h-4 object-contain mini-icon"
                      style={{
                        top: '50%',
                        right: '-8px',
                        transform: 'translateY(-50%)',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>      {/* Inner Orbit */}
      <div
        className="absolute inset-20 rounded-full animate-spin transition-all duration-300"
        style={{
          animationDuration: '30s',
          animationDirection: 'reverse',
          border: '2px dotted #9CA3AF',
        }}
      >{['inner-star', 'inner-heart'].map((key, i) => {
          const imageSrc = key === 'inner-star' ? '/images/orbitIcons/inventory.png' : '/images/orbitIcons/warehouse.png';
          const position =
            key === 'inner-star'
              ? { top: '-30px', left: '50%' }
              : { bottom: '-30px', left: '50%' };

          return (<div
              key={key}
              className={`absolute counter-rotate-inner transition-all duration-300 cursor-pointer ${
                hoveredIcon === key ? 'scale-150 hovered-icon' : ''
              } ${shouldBlur(key)}`}
              style={position}
              onMouseEnter={() => setHoveredIcon(key)}
              onMouseLeave={() => setHoveredIcon(null)}
            >              <img 
                src={imageSrc} 
                alt={key === 'inner-star' ? 'Inventory Management' : 'Warehouse Management'}
                className="w-20 h-auto object-contain"
              />              {/* Single mini orbit centered on the icon */}
              {hoveredIcon === key && (
                <div 
                  className="absolute w-20 h-20 pointer-events-none" 
                  style={{ 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    zIndex: '-1'
                  }}
                >
                  <div
                    className="absolute w-full h-full rounded-full mini-orbit"
                    style={{ 
                      border: '1px dotted #9CA3AF',
                    }}
                  >                    <img 
                      src="/images/orbitIcons/paperplane.png"
                      alt="Communication"
                      className="absolute w-4 h-4 object-contain mini-icon"
                      style={{
                        top: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitAnimation;
