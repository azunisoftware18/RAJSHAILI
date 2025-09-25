import React, { useState } from 'react'
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
  Linkedin,
  LayoutDashboard // Naya icon import kiya gaya
} from 'lucide-react'

// A reusable component to display each setting item
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
)

// A reusable component for each settings section card
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
)

// The Modal component for editing settings
const EditModal = ({ section, data, initialData, onClose, onSave, onInputChange, onFileChange }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                    Edit {section}
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Hero Page Settings Form */}
                {section === 'Hero Page Settings' && (
                    <>
                        <div>
                            <label className="text-sm font-medium">Hero Title</label>
                            <input type="text" name="heroTitle" value={data.heroTitle} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                         <div>
                            <label className="text-sm font-medium">Hero Subtitle</label>
                            <textarea name="heroSubtitle" value={data.heroSubtitle} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" rows="3"></textarea>
                        </div>
                        <div className="flex items-center space-x-4">
                            {initialData.heroImage && <img src={initialData.heroImage} alt="Hero Preview" className="h-16 w-16 object-cover rounded-md border" />}
                            <div>
                                <label className="text-sm font-medium">Hero Background Image</label>
                                <input type="file" name="heroImage" onChange={onFileChange} className="w-full mt-1 text-sm" />
                            </div>
                        </div>
                    </>
                )}

                {section === 'Company Information' && (
                    <>
                        <div>
                            <label className="text-sm font-medium">Company Name</label>
                            <input type="text" name="companyName" value={data.companyName} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div className="flex items-center space-x-4">
                            {initialData.companyLogo && <img src={initialData.companyLogo} alt="Logo Preview" className="h-16 w-16 object-contain rounded-md border" />}
                            <div>
                                <label className="text-sm font-medium">Company Logo</label>
                                <input type="file" name="companyLogo" onChange={onFileChange} className="w-full mt-1 text-sm" />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {initialData.favicon && <img src={initialData.favicon} alt="Favicon Preview" className="h-16 w-16 object-contain rounded-md border" />}
                            <div>
                                <label className="text-sm font-medium">Favicon</label>
                                <input type="file" name="favicon" onChange={onFileChange} className="w-full mt-1 text-sm" />
                            </div>
                        </div>
                    </>
                )}

                {section === 'Contact Information' && (
                    <>
                        <div>
                            <label className="text-sm font-medium">Phone Number</label>
                            <input type="text" name="phoneNumber" value={data.phoneNumber} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email Address</label>
                            <input type="email" name="emailAddress" value={data.emailAddress} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">WhatsApp Number</label>
                            <input type="text" name="whatsappNumber" value={data.whatsappNumber} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" />
                        </div>
                    </>
                )}

                {section === 'Social Media Links' && (
                    <>
                        <div><label className="text-sm font-medium">Facebook URL</label><input type="text" name="facebookUrl" value={data.facebookUrl} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                        <div><label className="text-sm font-medium">Twitter URL</label><input type="text" name="twitterUrl" value={data.twitterUrl} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                        <div><label className="text-sm font-medium">Instagram URL</label><input type="text" name="instagramUrl" value={data.instagramUrl} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                        <div><label className="text-sm font-medium">Website URL</label><input type="text" name="websiteUrl" value={data.websiteUrl} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                        <div><label className="text-sm font-medium">LinkedIn URL</label><input type="text" name="linkedinUrl" value={data.linkedinUrl} onChange={onInputChange} className="w-full mt-1 p-2 border rounded-md" /></div>
                    </>
                )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end items-center p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-200 mr-2">Cancel</button>
                <button onClick={onSave} className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-2">
                    <Save size={16} />
                    <span>Save Changes</span>
                </button>
            </div>
        </div>
    </div>
)


// Main Settings Page Component
export default function MainSettings() {
    // State to hold all settings data
    const [settings, setSettings] = useState({
        heroTitle: 'Welcome to Rajshaili Institute',
        heroSubtitle: 'Discover the synergy of ancient wisdom and modern psychology.',
        heroImage: null,
        companyName: 'Rajshaili Institute',
        companyLogo: null,
        favicon: null,
        phoneNumber: '+91 98765 43210',
        emailAddress: 'contact@rajshaili.institute',
        whatsappNumber: '+91 98765 43211',
        facebookUrl: 'https://facebook.com/rajshaili',
        twitterUrl: 'https://twitter.com/rajshaili',
        instagramUrl: 'https://instagram.com/rajshaili',
        websiteUrl: 'https://rajshaili.institute',
        linkedinUrl: 'https://linkedin.com/company/rajshaili'
    })

    // State to manage modal visibility and which section is being edited
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingSection, setEditingSection] = useState(null)
    const [tempSettings, setTempSettings] = useState({})

    // Function to open the edit modal
    const handleEdit = (section) => {
        setEditingSection(section)
        setTempSettings(settings) // Load current settings into a temporary state
        setIsModalOpen(true)
    }

    // Function to save changes from the modal
    const handleSave = () => {
        setSettings(tempSettings) // Save temporary changes to the main state
        setIsModalOpen(false)
        setEditingSection(null)
    }

    // Function to handle input changes within the modal
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTempSettings(prev => ({ ...prev, [name]: value }))
    }

    // Function to handle file/image changes
    const handleFileChange = (e) => {
        const { name, files } = e.target
        if (files[0]) {
            const fileUrl = URL.createObjectURL(files[0])
            setTempSettings(prev => ({ ...prev, [name]: fileUrl }))
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="w-full">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your application settings and configurations.</p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-8">
                    <button className="flex items-center space-x-2 px-1 py-3 border-b-2 border-blue-600 text-blue-600 font-semibold focus:outline-none">
                        <Settings size={20} />
                        <span>General Settings</span>
                    </button>
                </div>

                {/* Main Content Sections */}
                <div className="space-y-8">
                    {/* Naya Hero Page Section */}
                    <SettingsSection title="Hero Page Settings" onEditClick={() => handleEdit('Hero Page Settings')}>
                        <SettingsItem icon={<LayoutDashboard size={20} />} label="Hero Title" value={settings.heroTitle} />
                        <SettingsItem icon={<ImageIcon size={20} />} label="Hero Background" value={settings.heroImage ? 'Image uploaded' : 'Not set'} />
                    </SettingsSection>

                    <SettingsSection title="Company Information" onEditClick={() => handleEdit('Company Information')}>
                        <SettingsItem icon={<Building size={20} />} label="Name" value={settings.companyName} />
                        <SettingsItem icon={<ImageIcon size={20} />} label="Company Logo" value={settings.companyLogo ? 'Logo uploaded' : 'Not set'} />
                        <SettingsItem icon={<LinkIcon size={20} />} label="Favicon" value={settings.favicon ? 'Favicon uploaded' : 'Not set'} />
                    </SettingsSection>

                    <SettingsSection title="Contact Information" onEditClick={() => handleEdit('Contact Information')}>
                        <SettingsItem icon={<Phone size={20} />} label="Phone Number" value={settings.phoneNumber} />
                        <SettingsItem icon={<Mail size={20} />} label="Email Address" value={settings.emailAddress} />
                        <SettingsItem icon={<Phone size={20} />} label="WhatsApp Number" value={settings.whatsappNumber} />
                    </SettingsSection>

                    <SettingsSection title="Social Media Links" onEditClick={() => handleEdit('Social Media Links')}>
                        <SettingsItem icon={<Facebook size={20} />} label="Facebook URL" value={settings.facebookUrl} />
                        <SettingsItem icon={<Twitter size={20} />} label="Twitter URL" value={settings.twitterUrl} />
                        <SettingsItem icon={<Instagram size={20} />} label="Instagram URL" value={settings.instagramUrl} />
                        <SettingsItem icon={<Globe size={20} />} label="Website URL" value={settings.websiteUrl} />
                        <SettingsItem icon={<Linkedin size={20} />} label="LinkedIn URL" value={settings.linkedinUrl} />
                    </SettingsSection>
                </div>
            </div>

            {isModalOpen && <EditModal
                section={editingSection}
                data={tempSettings}
                initialData={settings}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                onInputChange={handleInputChange}
                onFileChange={handleFileChange}
            />}
        </div>
    )
}

