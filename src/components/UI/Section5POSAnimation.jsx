import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import CreditCard from './Mockups/CreditCardMockup';

const Section5POSAnimation = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [isTransformed, setIsTransformed] = useState(false);
  const [isNFCActive, setIsNFCActive] = useState(false);
  const [nfcProgress, setNfcProgress] = useState(0);
  const [posShakeX, setPosShakeX] = useState(0);
  const constraintsRef = useRef(null);
  const controls = useAnimation();
  const posRef = useRef(null);
  const cardRef = useRef(null);
  const nfcTimerRef = useRef(null);
  const shakeIntervalRef = useRef(null);
  // Check collision with top 30% of POS machine
  const checkCollision = () => {
    if (!posRef.current || !cardRef.current) return false;
    
    const posRect = posRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    
    // Define top 30% of POS machine
    const posTop30Percent = posRect.top + (posRect.height * 0.3);
    
    // Check if card overlaps with top 30% of POS machine
    const isOverlapping = 
      cardRect.right > posRect.left &&
      cardRect.left < posRect.right &&
      cardRect.bottom > posRect.top &&
      cardRect.top < posTop30Percent;
      return isOverlapping;
  };
  // Start NFC process
  const startNFCProcess = () => {
    if (isNFCActive || isTransformed) return;
    
    setIsNFCActive(true);
    setNfcProgress(0);
    
    // Start POS machine shaking with simple state
    shakeIntervalRef.current = setInterval(() => {
      setPosShakeX(prev => prev === 0 ? (Math.random() > 0.5 ? 3 : -3) : 0);
    }, 150);
    
    // Start NFC progress
    nfcTimerRef.current = setInterval(() => {
      setNfcProgress(prev => {
        const newProgress = prev + (100 / 30); // 3 seconds = 30 intervals of 100ms
        if (newProgress >= 100) {
          clearInterval(nfcTimerRef.current);
          clearInterval(shakeIntervalRef.current);
          setPosShakeX(0);
          
          // Start transformation
          setTimeout(() => {
            setIsTransformed(true);
            setIsNFCActive(false);
            setNfcProgress(0);
            setIsDragging(false);
            setIsFloating(false);
            controls.stop();
            
            // Transform back after 2 seconds
            setTimeout(() => {
              setIsTransformed(false);
              setTimeout(() => {
                setIsFloating(true);
              }, 100);
            }, 2000);
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  // Stop NFC process
  const stopNFCProcess = () => {
    if (!isNFCActive) return;
    
    setIsNFCActive(false);
    setNfcProgress(0);
    setPosShakeX(0);
    if (nfcTimerRef.current) {
      clearInterval(nfcTimerRef.current);
    }
    if (shakeIntervalRef.current) {
      clearInterval(shakeIntervalRef.current);
    }
  };

  // Handle drag with collision detection
  const handleDrag = () => {
    if (checkCollision() && !isTransformed && !isNFCActive) {
      startNFCProcess();
    } else if (!checkCollision() && isNFCActive) {
      stopNFCProcess();
    }
  };

  // Floating animation when not dragging
  useEffect(() => {
    if (!isDragging && isFloating) {
      controls.start({
        x: [null, Math.random() * 200 - 100, Math.random() * 200 - 100],
        y: [null, Math.random() * 150 - 75, Math.random() * 150 - 75],
        transition: {
          duration: 4 + Math.random() * 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      });
    }
  }, [isDragging, isFloating, controls]);

  const handleDragStart = () => {
    setIsDragging(true);
    setIsFloating(false);
    controls.stop();
  };
  const handleDragEnd = () => {
    setIsDragging(false);
    setIsFloating(true);
    // Stop NFC if card is released
    if (isNFCActive) {
      stopNFCProcess();
    }
  };
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (nfcTimerRef.current) {
        clearInterval(nfcTimerRef.current);
      }
      if (shakeIntervalRef.current) {
        clearInterval(shakeIntervalRef.current);
      }
    };
  }, []);

  // Begin floating after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsFloating(true), 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      ref={constraintsRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
    >      {/* NFC Loading Overlay */}
      {isNFCActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-35 flex items-center justify-center pointer-events-none"
        >
          {/* Background blur for readability */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-md"
          />
          
          {/* NFC Progress Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative z-10"
          >
            <svg width="100" height="100" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(20, 184, 166, 0.2)"
                strokeWidth="6"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#14b8a6"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - nfcProgress / 100)}`}
                style={{
                  transition: 'stroke-dashoffset 0.1s ease-out'
                }}
              />
            </svg>{/* NFC Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-teal-400"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM20 20H4V4h16v16zM18 6H6v2h12V6zM6 10h4v4H6v-4zM12 10h6v2h-6v-2zM12 14h6v2h-6v-2z"/>
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Transformation overlay - shows checkmark when transformed */}
      {isTransformed && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Animated checkmark */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="text-green-400"
            >
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M35 60 L50 75 L85 40"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              />
            </motion.svg>
            {/* Success pulse */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}      {/* 1. Credit Card: always visible, top layer */}
      <motion.div
        ref={cardRef}
        drag={!isTransformed}
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        initial={{ x: -100, y: 100, opacity: 1, scale: 0.4 }}
        animate={{
          x: isTransformed ? 0 : -100,
          y: isTransformed ? 0 : 100,
          opacity: isTransformed ? 0 : 1,
          scale: isTransformed ? 0 : 0.4,
          ...(isDragging && !isTransformed ? {} : controls),
        }}
        whileHover={{ scale: isTransformed ? 0 : 0.45 }}
        whileDrag={{ scale: isTransformed ? 0 : 0.5, rotate: isTransformed ? 0 : 5 }}
        transition={{ 
          type: 'spring', 
          damping: 25, 
          stiffness: 300, 
          delay: isTransformed ? 0 : 1.2 
        }}
        className="absolute z-30 cursor-grab active:cursor-grabbing"
      >
        <CreditCard />
        {isDragging && !isTransformed && (
          <motion.div
            className="absolute inset-0 bg-teal-400/20 rounded-2xl blur-lg z-20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>      {/* 2. POS Machine: beneath the card */}
      <motion.div
        ref={posRef}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: isTransformed ? 0 : 1, 
          scale: isTransformed ? 0 : 1, 
          y: 0,
          x: posShakeX
        }}
        transition={{ 
          duration: isTransformed ? 0.3 : 1, 
          ease: 'easeOut',
          x: { duration: 0.1 }
        }}
        className="relative z-10"
      >
        <img
          src="/images/POS/posmachine.png"
          alt="POS Machine"
          className="w-80 h-auto object-contain drop-shadow-2xl"
        />
        
        {/* NFC indicator on POS machine */}
        {isNFCActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4 z-20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 0 0 rgba(20, 184, 166, 0.7)",
                  "0 0 0 10px rgba(20, 184, 166, 0)",
                  "0 0 0 0 rgba(20, 184, 166, 0)"
                ]
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-4 h-4 bg-teal-400 rounded-full"
            />
          </motion.div>
        )}
      </motion.div>

      {/* 3. Payment processing pulse */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 right-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-3 h-3 bg-green-400 rounded-full"
        />
      </motion.div>

      {/* 4. Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/40 rounded-full"
            initial={{ x: Math.random() * 400, y: Math.random() * 300, opacity: 0 }}
            animate={{ y: [null, Math.random() * 300], x: [null, Math.random() * 400], opacity: [0, 0.8, 0] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* 5. Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-teal-300/60 text-center pointer-events-none"
      >        <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
          {isNFCActive ? "Hold card steady for NFC..." : "Drag the card around →"}
        </motion.p>
      </motion.div>

      {/* 6. Ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-teal-500/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default Section5POSAnimation;