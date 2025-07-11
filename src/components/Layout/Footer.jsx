// Footer.jsx
import React, { useEffect, useRef } from 'react';
import {
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

const Footer = () => {
  const mobileMapRef = useRef(null);
  const desktopMapRef = useRef(null);

  useEffect(() => {
    // Load Leaflet CSS and JS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (window.L) {
        initializeMaps();
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  const initializeMaps = () => {
    const coordinates = [31.5223, 74.3902];
    
    // Initialize mobile map
    if (mobileMapRef.current && !mobileMapRef.current._leaflet_id) {
      const mobileMap = window.L.map(mobileMapRef.current, {
        center: coordinates,
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false
      });

      // Dark gray theme tile layer with labels
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mobileMap);

      // Add labels layer
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 19,
        pane: 'shadowPane'
      }).addTo(mobileMap);

      // Add marker
      window.L.marker(coordinates).addTo(mobileMap)
        .bindPopup('NASTP, Lahore')
        .openPopup();
    }

    // Initialize desktop map
    if (desktopMapRef.current && !desktopMapRef.current._leaflet_id) {
      const desktopMap = window.L.map(desktopMapRef.current, {
        center: coordinates,
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false
      });

      // Dark gray theme tile layer with labels
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(desktopMap);

      // Add labels layer
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 19,
        pane: 'shadowPane'
      }).addTo(desktopMap);

      // Add marker
      window.L.marker(coordinates).addTo(desktopMap)
        .bindPopup('NASTP, Lahore')
        .openPopup();
    }
  };
  return (
    <footer className="bg-black text-white pt-12">
      {/* Border line constrained to content width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border-t border-gray-700" />
      </div>

      {/* Company text on top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex justify-start">
          <span className="text-gray-300 font-bold text-2xl">OCTANE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mobile Layout - Stack vertically */}
        <div className="flex flex-col space-y-8 lg:hidden">
          {/* Contact Info on mobile */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Contact Information</h3>
            <div className="flex items-center space-x-3 text-sm">
              <FaMapMarkerAlt className="text-gray-400" size={14} />
              <span>NASTP, Lahore</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <FaEnvelope className="text-gray-400" size={14} />
              <a href="mailto:sellercentral@octane.store" className="hover:text-blue-400 transition-colors">
                sellercentral@octane.store
              </a>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <FaPhone className="text-gray-400" size={14} />
              <a href="tel:+923104030793" className="hover:text-blue-400 transition-colors">
                +92 310 403 0793
              </a>
            </div>
            
            {/* Social LinkedIn */}
            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/octane-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* Map on mobile */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Location</h3>
            <div 
              ref={mobileMapRef}
              className="w-full h-40 bg-gray-800 rounded-lg overflow-hidden"
              style={{ zIndex: 1 }}
            ></div>
          </div>

          {/* Links on mobile - left aligned */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Home</a>
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Legal</a>
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Sitemap</a>
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Grid layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
          {/* Right side - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Quick Links</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Home</a>
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Legal</a>
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Sitemap</a>
              <a href="#" className="font-bold text-gray-400 hover:text-blue-400 transition-colors">Cookie Settings</a>
            </div>
          </div>
          {/* Left side - Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Contact Information</h3>
            <div className="flex items-center space-x-3 text-sm">
              <FaMapMarkerAlt className="text-gray-400" size={16} />
              <span>NASTP, Lahore</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <FaEnvelope className="text-gray-400" size={16} />
              <a href="mailto:sellercentral@octane.store" className="hover:text-blue-400 transition-colors">
                sellercentral@octane.store
              </a>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <FaPhone className="text-gray-400" size={16} />
              <a href="tel:+923104030793" className="hover:text-blue-400 transition-colors">
                +92 310 403 0793
              </a>
            </div>
            
            {/* Social LinkedIn */}
            <div className="pt-4">
              <a
                href="https://www.linkedin.com/company/octane-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* Center - Map */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Location</h3>
            <div 
              ref={desktopMapRef}
              className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden"
              style={{ zIndex: 1 }}
            ></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
