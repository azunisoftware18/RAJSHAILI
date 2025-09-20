// src/components/Settings.jsx

import React from 'react';
// Importing a variety of icons from different libraries within react-icons
import { FiSettings, FiMail, FiPhone, FiImage, FiGlobe, FiList, FiUsers } from 'react-icons/fi';
import { BsBuilding } from 'react-icons/bs';
import { FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// A reusable component for each setting item to keep our code DRY
const SettingsItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between py-4">
    <div className="flex items-center space-x-4">
      <div className="text-gray-400">{icon}</div>
      <span className="text-gray-700">{label}</span>
    </div>
    <span className="text-gray-500 font-medium">{value}</span>
  </div>
);

// A reusable component for section titles
const SectionTitle = ({ title }) => (
  <h3 className="text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200">{title}</h3>
);

// Main Settings Page Component
const MainSettings = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your application settings and configurations</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button className="flex items-center space-x-2 px-4 py-3 border-b-2 border-blue-600 text-blue-600 font-semibold focus:outline-none">
            <FiSettings />
            <span>General Settings</span>
          </button>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-10">

          {/* Company Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <SectionTitle title="Company Information" />
            <div className="divide-y divide-gray-200">
              <SettingsItem icon={<BsBuilding size={20} />} label="Name" value="Not set" />
              <SettingsItem icon={<FiImage size={20} />} label="Company Logo" value="Not set" />
              <SettingsItem icon={<FiImage size={20} />} label="Favicon" value="Not set" />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <SectionTitle title="Contact Information" />
            <div className="divide-y divide-gray-200">
              <SettingsItem icon={<FiPhone size={20} />} label="Phone Number" value="Not set" />
              <SettingsItem icon={<FiMail size={20} />} label="Email Address" value="Not set" />
              <SettingsItem icon={<FaWhatsapp size={20} />} label="WhatsApp Number" value="Not set" />
            </div>
          </div>
          
          {/* Social Media Links Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <SectionTitle title="Social Media Links" />
            <div className="divide-y divide-gray-200">
              <SettingsItem icon={<FaFacebookF size={20} />} label="Facebook URL" value="Not set" />
              <SettingsItem icon={<FaTwitter size={20} />} label="Twitter URL" value="Not set" />
              <SettingsItem icon={<FaInstagram size={20} />} label="Instagram URL" value="Not set" />
              <SettingsItem icon={<FiGlobe size={20} />} label="Website URL" value="Not set" />
              <SettingsItem icon={<FaLinkedinIn size={20} />} label="LinkedIn URL" value="Not set" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MainSettings;