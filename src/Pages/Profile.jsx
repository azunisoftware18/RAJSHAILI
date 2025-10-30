import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Lock, CheckCircle, XCircle, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Toast Component
const Toast = ({ message, type }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 text-white shadow-lg rounded-xl px-4 py-3 
          ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
      >
        {type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        <span className="font-medium text-sm">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

// Info Row
const InfoRow = ({ label, field, value, onChange, isEdit }) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
    <span className="text-gray-500 text-sm">{label}</span>
    {isEdit ? (
      <input
        type={field === "email" ? "email" : "text"}
        name={field}
        value={value}
        onChange={onChange}
        className="border-b-2 border-gray-300 px-2 py-1 text-sm text-right w-2/3 bg-transparent focus:outline-none focus:border-blue-500 transition-colors duration-300"
      />
    ) : (
      <span className="font-semibold text-gray-800 text-sm text-right break-all">{value || "Not Provided"}</span>
    )}
  </div>
);

// Font Options
const FONT_OPTIONS = [
  "Arial, sans-serif",
  "'Courier New', monospace",
  "'Times New Roman', serif",
  "'Roboto', sans-serif",
  "'Georgia', serif",
  "'Verdana', sans-serif",
];

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({ name: "", phoneNumber: "", email: "" });
  const [showSettings, setShowSettings] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "" });
  const [toast, setToast] = useState({ message: "", type: "" });

  const [avatarFont, setAvatarFont] = useState(FONT_OPTIONS[0]);
  const [showFontPicker, setShowFontPicker] = useState(false);

  const navigate = useNavigate();
  const settingsRef = useRef(null);

  const BASE_URL = "${import.meta.env.VITE_API_URL}";

  // Auto-hide toast
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return navigate("/login");
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role === "admin") return navigate("/admin");
    setUser(parsedUser);
    setFormData({
      name: parsedUser.name || "",
      phoneNumber: parsedUser.phoneNumber || "",
      email: parsedUser.email || "",
    });
  }, [navigate]);

  // Click outside settings dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setShowSettings(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BASE_URL}/api/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const handleEdit = () => setIsEdit(true);
  const handleCancel = () => {
    if (user) setFormData({ name: user.name, phoneNumber: user.phoneNumber, email: user.email });
    setIsEdit(false);
  };

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Update Profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/update-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");
      setToast({ message: data.message || "Profile updated successfully", type: "success" });
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setIsEdit(false);
    } catch (err) {
      setToast({ message: err.message || "Failed to update profile", type: "error" });
    }
  };

  // Change Password
  const handlePasswordChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/change-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(passwordData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to change password");
      setToast({ message: "Password changed successfully!", type: "success" });
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setToast({ message: err.message || "Error changing password", type: "error" });
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/api/delete-account`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      setToast({ message: "Account deleted successfully", type: "success" });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      setToast({ message: "Failed to delete account", type: "error" });
    }
  };

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
      </div>
    );

  // Avatar first letter
  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || "?";

  // Random avatar color
  const getAvatarColor = (name) => {
    const colors = ["#F87171","#FBBF24","#34D399","#60A5FA","#A78BFA","#F472B6","#38BDF8","#4ADE80"];
    const index = name?.charCodeAt(0) % colors.length;
    return colors[index];
  };
  const avatarColor = getAvatarColor(user?.name || "U");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-slate-900 relative overflow-hidden">
      <Toast message={toast.message} type={toast.type} />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900"></div>

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 sm:p-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md cursor-pointer"
                style={{ backgroundColor: avatarColor, fontFamily: avatarFont }}
              >
                {avatarLetter}
              </div>

              {/* Edit Font Button */}
              <button
                onClick={() => setShowFontPicker(!showFontPicker)}
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
              >
                <Pencil className="h-4 w-4 text-gray-600" />
              </button>

              {/* Font Picker */}
              {showFontPicker && (
                <div className="absolute -top-32 right-0 w-40 bg-white border rounded-md shadow-lg z-20 p-2 flex flex-col gap-2">
                  {FONT_OPTIONS.map((font) => (
                    <button
                      key={font}
                      onClick={() => {
                        setAvatarFont(font);
                        setShowFontPicker(false);
                      }}
                      className="text-sm text-gray-800 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                      style={{ fontFamily: font }}
                    >
                      Aa
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Settings Dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
                showSettings ? "opacity-100 translate-y-0 max-h-48" : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"
              }`}
            >
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" /> Change Password
              </button>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Info Rows */}
        <div className="space-y-1">
          <InfoRow label="Full Name" field="name" value={formData.name} onChange={handleChange} isEdit={isEdit} />
          <InfoRow label="Phone Number" field="phoneNumber" value={formData.phoneNumber} onChange={handleChange} isEdit={isEdit} />
          <InfoRow label="Email Account" field="email" value={formData.email} onChange={handleChange} isEdit={isEdit} />
        </div>

        <div className="mt-8">
          {!isEdit ? (
            <button
              onClick={handleEdit}
              className="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-4">
              <button onClick={handleSave} className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
                Save
              </button>
              <button onClick={handleCancel} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Change Password</h2>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData((p) => ({ ...p, currentPassword: e.target.value }))}
              className="w-full mb-3 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData((p) => ({ ...p, newPassword: e.target.value }))}
              className="w-full mb-4 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPasswordModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                Cancel
              </button>
              <button onClick={handlePasswordChange} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
