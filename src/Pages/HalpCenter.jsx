import React from 'react';
import { Phone, Mail, MessageCircle, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

// Reusable IconContactItem component
const IconContactItem = ({ icon, label, value, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl p-6 text-center group hover:bg-[#1F3A5A] hover:border-yellow-500/50 border border-blue-800/50 transition-all duration-300"
  >
    <div className="text-4xl text-yellow-400 mb-4 inline-block">
      {icon}
    </div>
    <h4 className="text-lg font-bold text-white mb-1">
      {label}
    </h4>
    <p className="text-sm text-gray-300 group-hover:text-yellow-400 transition-colors">
      {value}
    </p>
  </a>
);

// Main HelpCare Page Component
export default function HelpCare() {
  return (
    <div className="bg-[#192A41] min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Help & Support
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Get in <span className="text-yellow-400">Touch</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <IconContactItem 
              icon={<Phone />} 
              label="Phone Number" 
              value="+91 99831 11110" 
              link="tel:+919983111110" 
            />
            <IconContactItem 
              icon={<Mail />} 
              label="Email Address" 
              value="shalini.salecha6@gmail.com" 
              link="mailto:shalini.salecha6@gmail.com" 
            />
            <IconContactItem 
              icon={<MessageCircle />} 
              label="WhatsApp" 
              value="+91 99831 11110" 
              link="https://wa.me/919983111110" 
            />
          </div>
        </div>

        {/* Social Media Links Section */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Connect With <span className="text-yellow-400">Us</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <IconContactItem 
              icon={<Facebook />} 
              label="Facebook" 
              value="@shalini.salecha" 
              link="https://www.facebook.com/shalini.salecha" 
            />
            <IconContactItem 
              icon={<Twitter />} 
              label="Twitter" 
              value="Coming Soon" // Placeholder, kyunki link available nahi tha
              link="#" 
            />
            <IconContactItem 
              icon={<Instagram />} 
              label="Instagram" 
              value="@shaliniastrology" 
              link="https://www.instagram.com/shaliniastrology/" 
            />
            <IconContactItem 
              icon={<Youtube />} 
              label="YouTube" 
              value="@ShaliniAstrology" 
              link="https://www.youtube.com/@ShaliniAstrology" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
