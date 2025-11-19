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

/* -------------------------------------------------------------------
   🌍 ENV Config
------------------------------------------------------------------- */
const API = import.meta.env.VITE_API_URL; // Backend URL
const IMG = import.meta.env.VITE_IMAGE_BASE_URL || API; // Fallback for images

axios.defaults.baseURL = API;

/* -------------------------------------------------------------------
   🌟 Reusable Settings Item
------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------
   🌟 Settings Section Container
------------------------------------------------------------------- */
const SettingsSection = ({ title, children, onEditClick }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <button
        onClick={onEditClick}
        className="text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        Edit
      </button>
    </div>

    <div className="space-y-2">{children}</div>
  </div>
);

/* -------------------------------------------------------------------
   🌟 Edit Modal (Dynamic Fields)
------------------------------------------------------------------- */
const EditModal = ({
  section,
  tempData,
  originalData,
  onClose,
  onSave,
  onInputChange,
  onFileChange,
}) => {
  const PREVIEW = (path) =>
    path ? (path.startsWith("/uploads/settings") ? IMG + path : path) : null;

  const Field = ({ label, name, type = "text" }) => (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={tempData[name] || ""}
        onChange={onInputChange}
        className="w-full mt-1 p-2 border rounded-md"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold">Edit {section}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Company Info */}
          {section === "Company Information" && (
            <>
              <Field label="Company Name" name="companyName" />

              {/* Logo */}
              <div className="flex items-center space-x-4">
                {PREVIEW(originalData.companyLogo) && (
                  <img
                    src={PREVIEW(originalData.companyLogo)}
                    alt="Logo"
                    className="h-16 w-16 object-contain border rounded-md"
                  />
                )}
                <div>
                  <label className="text-sm font-medium">Company Logo</label>
                  <input
                    type="file"
                    name="companyLogo"
                    onChange={onFileChange}
                    className="mt-1 text-sm"
                  />
                </div>
              </div>

              {/* Favicon */}
              <div className="flex items-center space-x-4">
                {PREVIEW(originalData.favicon) && (
                  <img
                    src={PREVIEW(originalData.favicon)}
                    alt="Favicon"
                    className="h-12 w-12 object-contain border rounded-md"
                  />
                )}
                <div>
                  <label className="text-sm font-medium">Favicon</label>
                  <input
                    type="file"
                    name="favicon"
                    onChange={onFileChange}
                    className="mt-1 text-sm"
                  />
                </div>
              </div>
            </>
          )}

          {/* Contact Info */}
          {section === "Contact Information" && (
            <>
              <Field label="Phone Number" name="phoneNumber" />
              <Field label="Email Address" name="emailAddress" type="email" />
              <Field label="WhatsApp Number" name="whatsappNumber" />
            </>
          )}

          {/* Social Media */}
          {section === "Social Media Links" && (
            <>
              <Field label="Facebook URL" name="facebookUrl" />
              <Field label="Twitter URL" name="twitterUrl" />
              <Field label="Instagram URL" name="instagramUrl" />
              <Field label="YouTube URL" name="youtubeUrl" />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-5 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------
   🌟 Main Settings Page
------------------------------------------------------------------- */
export default function MainSettings() {
  const [settings, setSettings] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [tempSettings, setTempSettings] = useState({});

  useEffect(() => {
    axios
      .get("/settings")
      .then((res) => setSettings(res.data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  const handleEdit = (section) => {
    setEditingSection(section);
    setTempSettings(settings); // Clone current data
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setTempSettings((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Append all fields
      Object.entries(tempSettings).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post("/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setSettings(res.data.settings);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  const PREVIEW = (path) =>
    path ? (path.startsWith("/uploads/settings") ? IMG + path : path) : null;

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-extrabold text-gray-900">Settings</h1>
      <p className="text-gray-600 mt-1 mb-8">
        Manage your application settings and configurations.
      </p>

      <div className="space-y-8">
        {/* Company Info */}
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
                  src={PREVIEW(settings.companyLogo)}
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
                  src={PREVIEW(settings.favicon)}
                  className="h-10 rounded-md"
                />
              ) : (
                "Not set"
              )
            }
          />
        </SettingsSection>

        {/* Contact Info */}
        <SettingsSection
          title="Contact Information"
          onEditClick={() => handleEdit("Contact Information")}
        >
          <SettingsItem icon={<Phone size={20} />} label="Phone" value={settings.phoneNumber} />
          <SettingsItem icon={<Mail size={20} />} label="Email" value={settings.emailAddress} />
          <SettingsItem icon={<Phone size={20} />} label="WhatsApp" value={settings.whatsappNumber} />
        </SettingsSection>

        {/* Social Media */}
        <SettingsSection
          title="Social Media Links"
          onEditClick={() => handleEdit("Social Media Links")}
        >
          <SettingsItem icon={<Facebook size={20} />} label="Facebook" value={settings.facebookUrl} />
          <SettingsItem icon={<Twitter size={20} />} label="Twitter" value={settings.twitterUrl} />
          <SettingsItem icon={<Instagram size={20} />} label="Instagram" value={settings.instagramUrl} />
          <SettingsItem icon={<Globe size={20} />} label="YouTube" value={settings.youtubeUrl} />
        </SettingsSection>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <EditModal
          section={editingSection}
          tempData={tempSettings}
          originalData={settings}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
        />
      )}
    </div>
  );
}
