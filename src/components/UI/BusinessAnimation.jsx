import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FaMoneyCheckAlt,
  FaCogs,
  FaChartLine,
  FaTag
} from 'react-icons/fa';
import logo from '/images/octaneLogo.png';

const tiles = [
  {
    id: 'payment',
    label: 'Payment Options',
    icon: FaMoneyCheckAlt,
    position: 'top-left',
    detailImages: [
      '/images/paymentTile/p1.png',
      '/images/paymentTile/p2.png',
      '/images/paymentTile/p3.png',
      '/images/paymentTile/p4.png',
      '/images/paymentTile/p5.png',
      '/images/100.png'
    ]
  },
  {
    id: 'gtm',
    label: 'GTM',
    icon: FaTag,
    position: 'top-right',
    detailImages: [
      '/images/gtmTile/google-tag.png',
      '/images/gtmTile/fb pixel icon.png',
      '/images/gtmTile/insta.png',
      '/images/gtmTile/Logo_Google_Analytics.svg.png',
      '/images/100.png'
    ]
  },
  {
    id: 'tech',
    label: 'Tech',
    icon: FaCogs,
    position: 'bottom-left',
    detailImages: [
      '/images/techTile/cms.png',
      '/images/techTile/dms.png',
      '/images/techTile/ims.png',
      '/images/techTile/oms.png',
      '/images/techTile/wms.png',
      '/images/100.png'
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: FaChartLine,
    position: 'bottom-right',
    detailImages: [
      '/images/analyticsTile/sales report icon 2.png',
      '/images/analyticsTile/customer insights icon.png',
      '/images/analyticsTile/Product Analytics .png',
      '/images/analyticsTile/Order Analytics icon.jpg',
      '/images/analyticsTile/inventory reports icon.png',
      '/images/analyticsTile/Feedback Analytics icon.png',
      '/images/analyticsTile/google_analytics_logo_icon.png',
    ],
    detailLabels: ['Sales Report', 'Customer Insights', 'Product Analytics', 'Order Analytics', 'Inventory Reports', 'Feedback Analytics', 'Google Analytics']
  }
];

const tilePositionStyles = {
  'top-left': 'top-0 left-0 rounded-tr-[50%]',
  'top-right': 'top-0 right-0 rounded-tl-[50%]',
  'bottom-left': 'bottom-0 left-0 rounded-br-[50%]',
  'bottom-right': 'bottom-0 right-0 rounded-bl-[50%]'
};

export default function BusinessAnimation() {
  const [hoveredTile, setHoveredTile] = useState(null);

  const tileTransforms = useMemo(() => {
    // Use viewport width to determine if mobile
    const isMobile = window.innerWidth < 768;
    const size = isMobile ? 320 : 448; // Smaller size for mobile
    const tileSize = size * 0.48;
    const offset = (size - tileSize) / 2;
    
    return {
      'top-left': { x: offset, y: offset },
      'top-right': { x: -offset, y: offset },
      'bottom-left': { x: offset, y: -offset },
      'bottom-right': { x: -offset, y: -offset }
    };
  }, []);

  return (
    <div className="relative w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] mx-auto grid grid-cols-2 grid-rows-2 place-items-center">
      {tiles.map((tile) => {
        const isActive = hoveredTile === tile.id;
        const isInactive = hoveredTile !== null && !isActive;
        const { x, y } = isActive ? tileTransforms[tile.position] : { x: 0, y: 0 };
        const Icon = tile.icon;

        return (
          <motion.div
            key={tile.id}
            onMouseEnter={() => setHoveredTile(tile.id)}
            onMouseLeave={() => setHoveredTile(null)}
            animate={{
              scale: isActive ? (window.innerWidth < 768 ? 1.8 : 2) : 1,
              x,
              y,
              zIndex: isActive ? 50 : 10,
              opacity: isInactive ? 0.4 : 1
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              mass: 0.8,
              duration: 0.3
            }}
            className={`absolute w-[48%] h-[48%] overflow-visible ${
              tilePositionStyles[tile.position]
            }`}
            style={{ perspective: '1000px' }}
          >
            {/* Background layer */}
            <div
              className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-[1rem] shadow-lg"
              style={{ filter: isInactive ? 'blur(4px)' : 'none' }}
            />

            {/* Content layer */}
            <div
              className="relative z-10 flex flex-col items-center justify-center h-full w-full text-white cursor-pointer"
              style={{ willChange: 'transform, opacity' }}
            >
              <motion.div
                animate={isActive ? { y: -20 } : { y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  duration: 0.2
                }}
                className={`flex flex-col items-center h-full justify-center ${
                  isActive ? 'pt-8' : ''
                }`}
              >
                <Icon size={window.innerWidth < 768 ? 28 : 32} />
                <div className="text-sm md:text-base font-medium mt-1">{tile.label}</div>
              </motion.div>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1, duration: 0.25 }}
                  className={`grid gap-1 mb-3 md:mb-5 ${
                    tile.id === 'payment' || tile.id === 'analytics' 
                      ? 'grid-cols-3' 
                      : tile.id === 'tech'
                      ? 'grid-cols-3'
                      : tile.id === 'gtm'
                      ? 'grid-cols-3'
                      : 'grid-cols-2'
                  }`}
                >
                  {tile.detailImages ? (
                    // Render images for all tiles with images
                    tile.detailImages.map((imageSrc, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.1 + idx * 0.05,
                          duration: 0.2
                        }}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="flex items-center justify-center p-1 bg-white rounded-lg mb-1">
                          <img 
                            src={imageSrc} 
                            alt={`${tile.label} ${idx + 1}`}
                            className={`object-contain ${
                              tile.id === 'payment' 
                                ? 'w-4 h-4 md:w-6 md:h-6' 
                                : tile.id === 'gtm'
                                ? 'w-4 h-4 md:w-6 md:h-6'
                                : tile.id === 'tech'
                                ? 'w-4 h-4 md:w-6 md:h-6'
                                : 'w-3 h-3 md:w-5 md:h-5'
                            } `}
                          />
                        </div>
                        {tile.detailLabels && tile.detailLabels[idx] && (
                          <span className="text-[6px] text-white/70 text-center leading-tight">
                            {tile.detailLabels[idx]}
                          </span>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    // Render icons for other tiles
                    tile.detailIcons.map((SubIcon, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.1 + idx * 0.05,
                          duration: 0.2
                        }}
                        className="flex items-center justify-center p-1.5 md:p-2 bg-white/10 rounded-lg"
                      >
                        <SubIcon size={window.innerWidth < 768 ? 20 : 24} />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Central Logo */}
      <div className="absolute top-1/2 left-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-black/20 backdrop-blur-lg p-2 shadow-lg -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-contain rounded-full"
        />
      </div>
    </div>
  );
}
