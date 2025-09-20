// src/components/DashboardFooter.js

import React from 'react';

const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white p-4 text-sm text-gray-600">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
        
        {/* Left Section */}
        <div className="text-center md:text-left">
          &copy; {currentYear} All rights reserved. {" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          , Distributed by{" "}
          <a href="#" className="text-blue-600 hover:underline">
            ThemeWagon
          </a>
        </div>

        {/* Right Section */}
        <div className="flex space-x-6">
          <a href="#" className="hover:underline">About us</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>

      </div>
    </footer>
  );
};

export default DashboardFooter;
