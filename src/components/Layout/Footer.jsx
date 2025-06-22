// Footer.jsx
import React from 'react';
import {
  FaGlobe,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaPinterestP,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-30">
      {/* Border line constrained to content width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border-t border-gray-700" />
      </div>

      {/* Company text on top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="flex justify-start">
          <span className="text-gray-300 font-bold text-lg">OCTANE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mobile Layout - Stack vertically */}
        <div className="flex flex-col space-y-6 lg:hidden">
          {/* Social icons on mobile - centered */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3 flex-wrap justify-center gap-2">
              {[
                FaFacebookF,
                FaTwitter,
                FaYoutube,
                FaInstagram,
                FaTiktok,
                FaLinkedinIn,
                FaPinterestP,
              ].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Country/Language selector on mobile */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 text-sm cursor-pointer">
              <FaGlobe size={14} />
              <span>USA</span>
              <span className="select-none">|</span>
              <span>English</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Links on mobile - stacked and centered */}
          <div className="flex flex-col space-y-3 text-center">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 space-y-2 text-sm">
              <a href="#" className="hover:underline">Terms of service</a>
              <a href="#" className="hover:underline">Privacy policy</a>
              <a href="#" className="hover:underline">Sitemap</a>
            </div>
            <div className="text-sm">
              <a href="#" className="hover:underline">
                Privacy Choices
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:flex items-start justify-between">
          {/* Left side */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 cursor-pointer">
                <FaGlobe size={16} />
                <span>USA</span>
                <span className="select-none">|</span>
                <span>English</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <a href="#" className="hover:underline">Terms of service</a>
              <a href="#" className="hover:underline">Privacy policy</a>
              <a href="#" className="hover:underline">Sitemap</a>
            </div>

            <div>
              <a href="#" className="text-sm hover:underline">
                Privacy Choices
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {[
              FaFacebookF,
              FaTwitter,
              FaYoutube,
              FaInstagram,
              FaTiktok,
              FaLinkedinIn,
              FaPinterestP,
            ].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
