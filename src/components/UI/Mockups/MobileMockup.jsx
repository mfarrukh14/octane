import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useDragControls } from 'framer-motion';
import { FaSignal, FaWifi, FaBatteryFull, FaBell } from 'react-icons/fa';

// Constants
const DEVICE_WIDTH = 300;
const DEVICE_HEIGHT = DEVICE_WIDTH * 2.0037;
const SWIPE_THRESHOLD = DEVICE_HEIGHT * 0.25;
const DISPLAY_COUNT = 3;
const INTERVAL_MS = 4000;

const NOTIFICATIONS = [
  "Payment received!",
  "New Order received!",
  "Order Shipped!",
  "New Order received!",
];

export default function MobileMockup() {
  const [now, setNow] = useState(new Date());
  const [queue, setQueue] = useState(
    Array.from({ length: DISPLAY_COUNT }, (_, i) => i % NOTIFICATIONS.length)
  );
  const nextIdxRef = useRef(DISPLAY_COUNT % NOTIFICATIONS.length);
  const y = useMotionValue(0);
  const controls = useDragControls();

  useEffect(() => {
    const clockId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(clockId);
  }, []);

  useEffect(() => {
    const notifInterval = setInterval(() => {
      setQueue(prev => {
        const idx = nextIdxRef.current;
        nextIdxRef.current = (idx + 1) % NOTIFICATIONS.length;
        return [idx, ...prev.slice(0, DISPLAY_COUNT - 1)];
      });
    }, INTERVAL_MS);
    return () => clearInterval(notifInterval);
  }, []);

  const onDragEnd = (_e, info) => {
    if (-info.point.y > SWIPE_THRESHOLD) {
      animate(y, -DEVICE_HEIGHT, {
        type: 'spring', stiffness: 120,
        onComplete: () => setShowFireworks(true),
      });
    } else {
      animate(y, 0, { type: 'spring', stiffness: 200 });
    }
  };

  const dateString = now.toLocaleDateString(undefined, {
    weekday: 'long', month: 'short', day: 'numeric'
  });

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedHours = ((hours + 11) % 12 + 1); // Converts 0–23 to 1–12
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const timeString = `${formattedHours}:${formattedMinutes}`;


  const variants = {
    initial: () => ({ y: -60, opacity: 0 }),
    animate: pos => ({
      y: pos * 72,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 14 }
    }),
    exit: () => ({
      y: DISPLAY_COUNT * 60,
      opacity: 0,
      transition: { type: 'spring', stiffness: 120, damping: 14 }
    }),
  };

  return (
    <div className="">
      <div
        className="relative bg-black rounded-[50px] shadow-2xl"
        style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}
      >

        {/* Bezel border */}
        <div className="absolute inset-0 border-4 border-black rounded-[46px]" />

        {/* Side buttons */}
        <div className="absolute left-[-2px] top-1/5 h-8 w-1 bg-black rounded-full" />
        <div className="absolute left-[-2px] top-[28%] h-8 w-1 bg-black rounded-full" />
        <div className="absolute right-[-3px] top-1/5 h-20 w-8 bg-black rounded-full" />

        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 top-4 transform -translate-x-1/2 bg-black rounded-full opacity-90 flex items-center justify-center"
          style={{ width: DEVICE_WIDTH * 0.29, height: 24, zIndex: 20 }}
        >
          {/* Center content if needed */}
        </div>

        {/* Status Icons */}
        <div
          className="absolute inset-x-0 top-5 flex items-center justify-between px-8 z-30 text-white"
          style={{ width: DEVICE_WIDTH }}        >
          {/* Left side: notification bell + carrier */}
          <div className="flex items-center space-x-2">

          </div>
          {/* Right side: signal, wifi, battery */}
          <div className="flex items-center space-x-2 text-lg">
            <FaSignal className="h-4 w-4" />
            <FaWifi className="h-4 w-4" />
            <FaBatteryFull className="h-4 w-4" />
          </div>
        </div>

        {/* Draggable screen content */}
        <div
          className="absolute inset-2 rounded-[40px] flex flex-col"
          style={{
            y,
            background: 'linear-gradient(to bottom left, rgb(30, 132, 158), #000)',
            zIndex: 10
          }}
        >
          {/* Date & Time */}
          <div className="flex flex-col items-center text-white mt-12">
            <span className="text-sm font-medium">{dateString}</span>
            <span className="text-6xl font-extrabold mt-1 leading-none">{timeString}</span>
          </div>

          {/* Notification Stack */}
          <div className="absolute inset-x-0 top-40 h-60 pointer-events-none">
            <AnimatePresence>
              {queue.map((notifIdx, i) => (
                <motion.div
                  key={notifIdx + '-' + i}
                  custom={i}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-1/2 transform -translate-x-1/2 w-11/12 px-4 py-2 mb-1 bg-white/20 backdrop-blur-sm rounded-xl text-white font-medium"
                >
                  <div className="flex flex-col w-full">
                    {/* Header Row: Octane and Time */}
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Octane</span>
                      <span className="text-white text-xs">{timeString}</span>
                    </div>

                    {/* Notification Body */}
                    <div className="flex items-center space-x-2">
                      <FaBell className="text-white flex-shrink-0" />
                      <span>{NOTIFICATIONS[notifIdx]}</span>
                    </div>
                  </div>
                </motion.div>

              ))}
            </AnimatePresence>
          </div>

          <div className="flex-1" />

          {/* Home Bar */}
          <div className="w-full flex justify-center mb-1">
            <div className="h-1 w-2/5 bg-white/40 rounded-full cursor-grab"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
