import React, { useState, useEffect, useRef } from "react";
// Added Loader2 to the import
import { Search, Bell, User, X, Settings, Edit, Save, LogOut, KeyRound, Loader2 } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// API Endpoint (Make sure this is correct for your setup)
const API_BASE_URL = "http://localhost:3000/api/admin";

export default function AdminNavbar() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false); // Separate loading for save
  const [toasts, setToasts] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const profileModalRef = useRef(null);
  const settingsDropdownRef = useRef(null);
  const passwordModalRef = useRef(null);

  // --- Toast System ---
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000); // Increased duration slightly
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Click Outside Handlers ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Profile Modal
      if (profileModalRef.current && !profileModalRef.current.contains(event.target) && !event.target.closest('#admin-profile-trigger')) {
         closeProfileModal();
      }
      // Close Settings Dropdown
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target) && !event.target.closest('#settings-trigger')) {
        setShowSettingsDropdown(false);
      }
       // Close Password Modal
      // Check if passwordModalRef.current exists before accessing contains
      if (passwordModalRef.current && !passwordModalRef.current.contains(event.target)) {
        closePasswordModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array means this runs once on mount


  // --- Fetch Admin Profile ---
  const fetchAdminProfile = async () => {
    setLoadingProfile(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const res = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminData(res.data.admin);
      setEditedData({ // Initialize editedData only after fetching
        name: res.data.admin?.name || "",
        email: res.data.admin?.email || "",
        phoneNumber: res.data.admin?.phoneNumber || "",
      });
    } catch (err) {
      console.error("Error fetching admin data:", err);
      addToast(err.message === "No token found" ? "Please log in." : "Failed to load profile", "error");
      // Optionally logout user if token is invalid or missing
      // localStorage.removeItem("token");
      // window.location.reload();
    } finally {
      setLoadingProfile(false);
    }
  };

  // Fetch profile when modal opens
  useEffect(() => {
    if (showProfileModal) {
      fetchAdminProfile();
    }
  }, [showProfileModal]);


  // --- Profile Edit Handlers ---
  const handleProfileInputChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
    // Only show save if data actually changed
    // Check if adminData exists before accessing its properties
    if (adminData && value !== adminData[field]) {
      setShowSaveButton(true);
    }
  };

  const handleProfileSave = async () => {
    setLoadingSave(true); // Start save loading
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/update`,
        editedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAdminData(res.data.admin); // Update main data
      setShowSaveButton(false);
      addToast("Profile updated successfully!", "success");
    } catch (err) {
      console.error("Error updating admin data:", err);
      addToast(`Update failed: ${err.response?.data?.error || 'Server error'}`, "error");
    } finally {
        setLoadingSave(false); // Stop save loading
    }
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setShowSettingsDropdown(false); // Close dropdown when modal closes
    setShowSaveButton(false); // Hide save button
    setEditedData({}); // Clear edits
  };

  // --- Password Change Handlers ---
   const handlePasswordInputChange = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };

  const handlePasswordChangeSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast("New passwords do not match!", "error");
      return;
    }
    if (!passwordData.currentPassword || !passwordData.newPassword) {
        addToast("All password fields are required.", "error");
        return;
    }

    setLoadingSave(true); // Use loadingSave for password change too
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_BASE_URL}/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addToast("Password changed successfully!", "success");
      closePasswordModal();
    } catch (err) {
      console.error("Password change failed:", err);
      addToast(`Password change failed: ${err.response?.data?.error || 'Server error'}`, "error");
    } finally {
        setLoadingSave(false);
    }
  };

   const closePasswordModal = () => {
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" }); // Reset password form
   }

   // --- Logout Handler ---
    const handleLogout = () => {
        localStorage.removeItem("token");
        // Redirect to login or reload page
        window.location.reload(); // Simple reload, replace with router navigation if needed
    };

  // --- Profile Modal Component ---
  const UserProfileModal = () => {
    // Moved loading and error checks inside the return, conditional rendering
    return (
      <motion.div
        ref={profileModalRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {loadingProfile ? (
            <div className="flex justify-center items-center h-64 text-slate-500">
                <Loader2 className="animate-spin w-8 h-8" /> <span className="ml-2">Loading Profile...</span>
            </div>
        ) : !adminData ? (
             <div className="text-center p-10 text-red-500">Failed to load admin data.</div>
        ) : (
            <>
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 relative">
                     <div className="flex justify-between items-center mb-4">
                         <h2 className="text-2xl font-bold text-white">Admin Profile</h2>
                        <div className="flex items-center gap-2">
                            {/* Settings Dropdown */}
                            <div className="relative" ref={settingsDropdownRef}>
                                <button id="settings-trigger" onClick={() => setShowSettingsDropdown(prev => !prev)} className="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/20">
                                    <Settings size={20} />
                                </button>
                                <AnimatePresence>
                                    {showSettingsDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50 overflow-hidden origin-top-right"
                                        >
                                            <button onClick={() => { setShowPasswordModal(true); setShowSettingsDropdown(false); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                                <KeyRound size={16}/> Change Password
                                            </button>
                                            <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                <LogOut size={16}/> Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                             <button onClick={closeProfileModal} className="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/20">
                                <X size={22} />
                            </button>
                        </div>
                     </div>
                     {/* Avatar and Name */}
                     <div className="flex items-center gap-4">
                         <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center text-white border-2 border-white/50">
                                <User size={32} />
                            </div>
                         </div>
                         <div>
                            <h1 className="text-xl font-bold text-white">{adminData.name}</h1>
                            <p className="text-sm text-blue-100">{adminData.email}</p>
                         </div>
                     </div>
                </div>

                {/* User Details Form */}
                <div className="p-6 space-y-5">
                  {[{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'phoneNumber', label: 'Phone Number' }].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                      <div className="relative">
                        <input
                          type={key === 'email' ? 'email' : 'text'}
                          value={editedData[key] || ''}
                          onChange={(e) => handleProfileInputChange(key, e.target.value)}
                          placeholder={key === 'phoneNumber' ? 'Add number' : `Enter ${label.toLowerCase()}`}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 pr-10" // Added padding right for icon
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Edit size={16} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save Button */}
                <AnimatePresence>
                  {showSaveButton && (
                    <motion.div
                      className="px-6 pb-6"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={handleProfileSave}
                        disabled={loadingSave}
                        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {loadingSave ? <Loader2 className="animate-spin" size={20}/> : <Save size={18}/>}
                        {loadingSave ? 'Saving...' : 'Save Changes'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
            </>
        )}
      </motion.div>
    );
  };


  // --- Password Change Modal Component ---
  const PasswordChangeModal = () => (
     <motion.div
        ref={passwordModalRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {if(e.target === e.currentTarget) closePasswordModal()}} // Close on background click
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <div className="flex justify-between items-center mb-5 border-b pb-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><KeyRound size={20}/> Change Password</h2>
            <button onClick={closePasswordModal} className="text-gray-400 hover:text-black transition p-1 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {[ { key: 'currentPassword', label: 'Current Password' }, { key: 'newPassword', label: 'New Password' }, { key: 'confirmPassword', label: 'Confirm New Password' } ].map(({key, label}) => (
              <div key={key}>
                <label className="text-sm text-gray-600 block mb-1 font-medium">{label}</label>
                <input
                  type="password"
                  value={passwordData[key]}
                  onChange={(e) => handlePasswordInputChange(key, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={closePasswordModal} className="px-5 py-2 bg-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-300 transition text-sm">Cancel</button>
            <button
                onClick={handlePasswordChangeSubmit}
                disabled={loadingSave}
                className="px-5 py-2 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition text-sm flex items-center gap-2 disabled:opacity-60"
            >
              {loadingSave ? <Loader2 className="animate-spin" size={18}/> : <Save size={16}/>}
              {loadingSave ? 'Saving...' : 'Save Password'}
            </button>
          </div>
        </motion.div>
      </motion.div>
  );


  // --- Main Navbar Return ---
  return (
    <>
      {/* Navbar Header */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-40">
        {/* Search Input */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search (Ctrl + K)"
            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm transition duration-200"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Notification Bell */}
          <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
              2
            </span>
          </div>

          {/* Admin Profile Trigger */}
          <div
             id="admin-profile-trigger"
            className="flex items-center space-x-2 cursor-pointer p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setShowProfileModal(true)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-sm">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {if(e.target === e.currentTarget) closeProfileModal()}} // Close on background click
          >
            <UserProfileModal />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && <PasswordChangeModal />}
      </AnimatePresence>

      {/* Toast Notifications */}
      <div className="fixed top-5 right-5 flex flex-col gap-3 z-[70]">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout // Added layout for smoother add/remove animation
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }} // Changed exit animation
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`px-5 py-3 rounded-lg shadow-lg text-white font-semibold text-sm flex items-center gap-2 ${
                toast.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span>{toast.message}</span> {/* Wrapped message in span */}
              <button onClick={() => removeToast(toast.id)} className="ml-auto pl-2 opacity-70 hover:opacity-100">✕</button> {/* Adjusted button positioning */}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

