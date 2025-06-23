import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const POSAnimation = () => {
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center">      {/* POS Machine */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <img 
          src="/images/POS/posmachine.png" 
          alt="POS Machine" 
          className="w-64 h-auto object-contain"
        />
        
        {/* Card slot indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute top-1/2 right-0 w-1 h-12 bg-teal-400 rounded-full opacity-50"
          style={{ transform: 'translateY(-50%)' }}
        />
      </motion.div>

      {/* Draggable ATM Card */}
      <motion.div
        ref={constraintsRef}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: -100, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileDrag={{ scale: 1.1, rotate: 5 }}
          className="absolute top-1/2 left-8 pointer-events-auto cursor-grab active:cursor-grabbing"
          style={{ transform: 'translateY(-50%)' }}
        >
          {/* ATM Card */}
          <div className={`
            w-20 h-12 rounded-lg shadow-lg transition-all duration-200
            ${isDragging ? 'shadow-xl shadow-teal-400/50' : 'shadow-md'}
            bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600
            border border-teal-300
            relative overflow-hidden
          `}>
            {/* Card chip */}
            <div className="absolute top-2 left-2 w-3 h-2 bg-yellow-300 rounded-sm opacity-80" />
            
            {/* Card stripe */}
            <div className="absolute top-4 left-0 right-0 h-1 bg-black opacity-30" />
            
            {/* Card number dots */}
            <div className="absolute bottom-2 left-2 flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white/60 rounded-full" />
              ))}
            </div>
            
            {/* Glow effect when dragging */}
            {isDragging && (
              <div className="absolute inset-0 bg-teal-300/20 rounded-lg animate-pulse" />
            )}
          </div>
          
          {/* Motion trail effect */}
          {isDragging && (
            <motion.div
              className="absolute inset-0 bg-teal-400/20 rounded-lg blur-sm"
              initial={{ scale: 1 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Instructions text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-teal-300/70 text-center"
      >
        Drag the card →
      </motion.div>

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full"
            initial={{ 
              x: Math.random() * 300,
              y: Math.random() * 200,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * 200],
              opacity: [0, 1, 0] 
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default POSAnimation;
