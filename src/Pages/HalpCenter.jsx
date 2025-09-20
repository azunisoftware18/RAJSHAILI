// src/components/ContactUsPage.jsx

import React from 'react';
// Importing icons from various react-icons libraries
import { 
  FiPhone, 
  FiMail, 
  FiGlobe, 
  FiMessageSquare,
  FiArrowRight // For a potential 'send message' or 'visit link' arrow
} from 'react-icons/fi';
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube
} from 'react-icons/fa';
import { MdHelpCenter } from 'react-icons/md';

// eslint-disable-next-line no-unused-vars
const IconContactItem = ({ icon: IconComponent, label, value, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center group"
  >
    <div className="text-4xl text-red-600 mb-3">
      {/* The actual icon component passed as a prop */}
      <IconComponent /> 
    </div>
    <h4 className="text-lg font-semibold text-gray-800 mb-1">
      {label}
    </h4>
    <p className="text-sm text-gray-600 group-hover:text-red-700">
      {value}
    </p>
    {link && (
      <FiArrowRight className="mt-2 text-red-500 group-hover:translate-x-1 transition-transform duration-200" />
    )}
  </a>
);

// Main  Page Component
const  HelpCare = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-400 via-red-600 to-red-700 min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="text-center mb-12 my-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            HELP CARE
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <IconContactItem 
              icon={FiPhone} 
              label="Phone Number" 
              value="+1 (555) 123-4567" 
              link="tel:+91 9983111110" 
            />
            <IconContactItem 
              icon={FiMail} 
              label="Email Address" 
              value="shalini.salecha6@gmail.com" 
              link="mailto:shalini.salecha6@gmail.com" 
            />
            <IconContactItem 
              icon={FaWhatsapp} 
              label="WhatsApp" 
              value="+1 (555) 987-6543" 
              link="https://wa.me/15559876543" 
            />
          </div>
        </div>

        {/* Social Media Links Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 ">
            Connect With Us
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex-cols-4 gap-6 justify-between">
            <IconContactItem 
              icon={FaFacebookF} 
              label="Facebook" 
              value="@FacebookPage" 
              link="https://www.youtube.com/redirect?event=channel_description&redir_token=QUFFLUhqbjFZQ2JJX0tKbTlPcjhHNE10S1JBMUp0N3VWUXxBQ3Jtc0tsQUlrLWpOQjJZT3JhZU5Gdk16aXFweVBfRmd3bjFjRndVSEhrcUdyck9SU1dwbGNaWWNnY05FS1NRYmJEYzA1dmVwOHptYVVCMDNPTzJCRmVIZ3FjZEpwZTRqOVZSQ05naEh0WjdTRDVjMGRqQjB4aw&q=https%3A%2F%2Fwww.facebook.com%2Fshalini.salecha" 
            />
            <IconContactItem 
              icon={FaTwitter} 
              label="Twitter" 
              value="@TwitterHandle" 
              link="https://twitter.com/yourhandle" 
            />
            <IconContactItem 
              icon={FaInstagram} 
              label="Instagram" 
              value="@Instagram" 
              link="https://www.instagram.com/shaliniastrology/" 
            />
            <IconContactItem 
              icon={FaYoutube} 
              label="TouTube" 
              value="yourcompany" 
              link="https://www.youtube.com/@ShaliniAstrology" 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpCare;

