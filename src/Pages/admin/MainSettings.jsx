import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Settings,
  Mail,
  Phone,
  Image as ImageIcon,
  Globe,
  Building,
  Save,
  X,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

// --- Setting Item Component ---
const SettingsItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 py-3">
    <div className="text-blue-600 bg-blue-100 p-2 rounded-lg">{icon}</div>
    <div>
      <span className="text-sm text-gray-500">{label}</span>
      <p className="text-gray-800 font-medium break-all">
        {value || <span className="text-gray-400">Not set</span>}
      </p>
    </div>
  </div>
);

// --- Settings Section Card ---
const SettingsSection = ({ title, children, onEditClick }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <button
        onClick={onEditClick}
        className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
      >
        Edit
      </button>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

// --- Edit Modal Component ---
const EditModal = ({
  section,
  data,
  initialData,
  onClose,
  onSave,
  onInputChange,
  onFileChange,
}) => {
  const BACKEND_URL = "http://localhost:3000"; // ✅ backend base URL

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Edit {section}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {section === "Company Information" && (
            <>
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={data.companyName}
                  onChange={onInputChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>

              {/* --- Company Logo --- */}
              <div className="flex items-center space-x-4">
                {initialData.companyLogo && (
                  <img
                    src={`${BACKEND_URL}${initialData.companyLogo}`}
                    alt="Logo Preview"
                    className="h-16 w-16 object-contain rounded-md border"
                  />
                )}
                <div>
                  <label className="text-sm font-medium">Company Logo</label>
                  <input
                    type="file"
                    name="companyLogo"
                    onChange={onFileChange}
                    className="w-full mt-1 text-sm"
                  />
                </div>
              </div>

              {/* --- Favicon --- */}
              <div className="flex items-center space-x-4">
                {initialData.favicon && (
                  <img
                    src={`${BACKEND_URL}${initialData.favicon}`}
                    alt="Favicon Preview"
                    className="h-16 w-16 object-contain rounded-md border"
                  />
                )}
                <div>
                  <label className="text-sm font-medium">Favicon</label>
                  <input
                    type="file"
                    name="favicon"
                    onChange={onFileChange}
                    className="w-full mt-1 text-sm"
                  />
                </div>
              </div>
            </>
          )}

          {section === "Contact Information" && (
            <>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={onInputChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={data.emailAddress}
                  onChange={onInputChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">WhatsApp Number</label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={data.whatsappNumber}
                  onChange={onInputChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
            </>
          )}

          {section === "Social Media Links" && (
            <>
              <div>
                <label className="text-sm font-medium">Facebook URL</label>
                <input
                  type="text"
                  name="facebookUrl"
                  value={data.facebookUrl}
                  onChange={onInputChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Twitter URL</label>
                <input
                  type="text"
                  name="twitterUrl"
                  value={data.twitterUrl}
                  onChange={onInputChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Instagram URL</label>
                <input
                  type="text"
                  name="instagramUrl"
                  value={data.instagramUrl}
                  onChange={onInputChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">YouTube URL</label>
                <input
                  type="text"
                  name="youtubeUrl"
                  value={data.youtubeUrl}
                  onChange={onInputChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end items-center p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-200 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Settings Page ---
export default function MainSettings() {
  const [settings, setSettings] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [tempSettings, setTempSettings] = useState({});

  const API_URL = "http://localhost:3000/api/settings";
  const BACKEND_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(API_URL);
        setSettings(res.data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };
    fetchSettings();
  }, []);

  const handleEdit = (section) => {
    setEditingSection(section);
    setTempSettings(settings);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) setTempSettings((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      for (const key in tempSettings) {
        if (tempSettings[key] instanceof File) {
          formData.append(key, tempSettings[key]);
        } else {
          formData.append(key, tempSettings[key] || "");
        }
      }

      const res = await axios.post(`${API_URL}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setSettings(res.data.settings);
        setIsModalOpen(false);
        setEditingSection(null);
      }
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your application settings and configurations.
          </p>
        </div>

        <div className="space-y-8">
          <SettingsSection
            title="Company Information"
            onEditClick={() => handleEdit("Company Information")}
          >
            <SettingsItem
              icon={<Building size={20} />}
              label="Name"
              value={settings.companyName}
            />
            <SettingsItem
              icon={<ImageIcon size={20} />}
              label="Company Logo"
              value={
                settings.companyLogo ? (
                  <img
                    src={`${BACKEND_URL}${settings.companyLogo}`}
                    alt="Logo"
                    className="h-12 rounded-md"
                  />
                ) : (
                  "Not set"
                )
              }
            />
            <SettingsItem
              icon={<LinkIcon size={20} />}
              label="Favicon"
              value={
                settings.favicon ? (
                  <img
                    src={`${BACKEND_URL}${settings.favicon}`}
                    alt="Favicon"
                    className="h-10 rounded-md"
                  />
                ) : (
                  "Not set"
                )
              }
            />
          </SettingsSection>

          <SettingsSection
            title="Contact Information"
            onEditClick={() => handleEdit("Contact Information")}
          >
            <SettingsItem
              icon={<Phone size={20} />}
              label="Phone Number"
              value={settings.phoneNumber}
            />
            <SettingsItem
              icon={<Mail size={20} />}
              label="Email Address"
              value={settings.emailAddress}
            />
            <SettingsItem
              icon={<Phone size={20} />}
              label="WhatsApp Number"
              value={settings.whatsappNumber}
            />
          </SettingsSection>

          <SettingsSection
            title="Social Media Links"
            onEditClick={() => handleEdit("Social Media Links")}
          >
            <SettingsItem
              icon={<Facebook size={20} />}
              label="Facebook URL"
              value={settings.facebookUrl}
            />
            <SettingsItem
              icon={<Twitter size={20} />}
              label="Twitter URL"
              value={settings.twitterUrl}
            />
            <SettingsItem
              icon={<Instagram size={20} />}
              label="Instagram URL"
              value={settings.instagramUrl}
            />
            <SettingsItem
              icon={<Globe size={20} />}
              label="YouTube URL"
              value={settings.youtubeUrl}
            />
          </SettingsSection>
        </div>
      </div>

      {isModalOpen && (
        <EditModal
          section={editingSection}
          data={tempSettings}
          initialData={settings}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
        />
      )}
    </div>
  );
}
