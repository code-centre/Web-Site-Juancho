// src/components/SocialSidebar.tsx
import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const SocialSidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-2/3 transform -translate-y-1/2 z-50">
      <div className="flex flex-col items-center space-y-8 bg-yellow-400 rounded-r-xl py-8 px-4 shadow-lg">
        <a 
          href="https://instagram.com/tucuenta" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-900 hover:text-blue-700 transition-colors"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
        <a 
          href="https://facebook.com/tucuenta" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-900 hover:text-blue-700 transition-colors"
          aria-label="Facebook"
        >
          <FaFacebook size={24} />
        </a>
        <a 
          href="https://twitter.com/tucuenta" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-900 hover:text-blue-700 transition-colors"
          aria-label="Twitter"
        >
          <FaTwitter size={24} />
        </a>
        <a 
          href="https://youtube.com/tucuenta" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-900 hover:text-blue-700 transition-colors"
          aria-label="YouTube"
        >
          <FaYoutube size={24} />
        </a>
      </div>
    </div>
  );
};

export default SocialSidebar;