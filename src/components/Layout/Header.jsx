import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          
          {/* Left nav */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="text-white text-2xl font-bold ml-5">
              OCTANE
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-6">

            <a href="https://sellers.octane.store/login" className="text-white hover:text-gray-200 transition-colors">
              Log in
            </a>

            <a
              href="https://wa.me/923104030793"
              className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
