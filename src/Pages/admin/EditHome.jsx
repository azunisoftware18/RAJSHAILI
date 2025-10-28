import React, { useState, useEffect } from "react";
import axios from "axios";
import { UploadCloud, Edit, Trash2, Save, XCircle, Image as ImageIcon, Video, AlertCircle, Loader2, Link as LinkIcon, Home, Eye } from 'lucide-react';

// API base URL ko yahan define karein (Apne Express server ke according change karein)
// **Important:** Ensure your backend server is running and accessible at these URLs.
const API_BASE_URL = "http://localhost:3000/api/home";
const UPLOAD_URL = "http://localhost:3000/api/home/upload"; // Assuming separate upload endpoint
const IMAGE_BASE_URL = "http://localhost:3000/"; // Base URL for displaying images

// Changed function declaration to include export default directly
export default function HomeAdminUploader() {
  const [homeList, setHomeList] = useState([]);
  const [formData, setFormData] = useState({
    videoUrl: "",
    card1Image: null,
    card2Image: null,
    card3Image: null,
    card4Image: null,
  });
  const [preview, setPreview] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all home entries
  const fetchHomeList = async () => {
    setLoading(true);
    // Clear previous error on new fetch attempt
    setError("");
    try {
      const res = await axios.get(API_BASE_URL);
      setHomeList(res.data);
    } catch (err) {
      console.error("Error fetching home list:", err);
      // Provide more specific feedback for network errors
      if (err.message === "Network Error") {
          setError("Failed to connect to the server. Please ensure the backend is running and the API URLs are correct.");
      } else {
          setError("Failed to load home page data. Please try again.");
      }
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeList();
  }, []);

  // Handle file input change and generate preview
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
        const file = files[0];
        setFormData({ ...formData, [name]: file });

        const reader = new FileReader();
        reader.onloadend = () => {
             setPreview((prev) => ({ ...prev, [name]: reader.result }));
        }
        reader.readAsDataURL(file);
    } else {
        setFormData({ ...formData, [name]: null });
        setPreview((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Reset form and state
  const resetForm = () => {
    setFormData({ videoUrl: "", card1Image: null, card2Image: null, card3Image: null, card4Image: null });
    setPreview({});
    setEditingId(null);
    setError("");
    // Use try-catch for safety, though element might not exist yet
    try {
        document.getElementById("home-upload-form")?.reset();
    } catch (e) {
        console.warn("Could not reset form element:", e);
    }
  };

  // Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("videoUrl", formData.videoUrl);

      ["card1Image", "card2Image", "card3Image", "card4Image"].forEach((key) => {
        if (formData[key] instanceof File) {
             data.append(key, formData[key]);
        }
      });


      let res;
      if (editingId) {
        // Assuming backend handles PUT with FormData correctly
        res = await axios.put(`${API_BASE_URL}/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
         const updatedItem = res.data.updatedHome || res.data.data || res.data;
        setHomeList((prev) => prev.map((item) => (item.id === editingId ? updatedItem : item)));

      } else {
        res = await axios.post(UPLOAD_URL, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
         const newItem = res.data.homeData || res.data.data || res.data;
        setHomeList((prev) => [newItem, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error("Form submission error:", err.response?.data || err.message);
       if (err.message === "Network Error") {
            setError("Failed to connect to the server for submission. Please check the backend.");
       } else {
            setError(`Operation failed: ${err.response?.data?.error || 'Please try again.'}`);
       }
    } finally {
      setLoading(false);
    }
  };

  // Populate form for editing
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      videoUrl: item.videoUrl || "",
      card1Image: null,
      card2Image: null,
      card3Image: null,
      card4Image: null,
    });
    setPreview({
      card1Image: item.card1Image ? `${IMAGE_BASE_URL}${item.card1Image}` : null,
      card2Image: item.card2Image ? `${IMAGE_BASE_URL}${item.card2Image}` : null,
      card3Image: item.card3Image ? `${IMAGE_BASE_URL}${item.card3Image}` : null,
      card4Image: item.card4Image ? `${IMAGE_BASE_URL}${item.card4Image}` : null,
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete an entry
  const handleDelete = async (id) => {
    // Replaced window.confirm with a simpler check for iframe compatibility
    // In a real app, use a custom modal for confirmation.
    const confirmed = true; // Simulating confirmation
    if (!confirmed) return;


    setLoading(true);
    setError("");
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setHomeList((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      console.error("Delete error:", err);
       if (err.message === "Network Error") {
            setError("Failed to connect to the server for deletion. Please check the backend.");
       } else {
            setError("Delete failed. Please try again.");
       }
    } finally {
        setLoading(false);
    }
  };

  return (
    // Changed main background to white, text to slate-800
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Changed heading text color */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Home size={32} /> Manage Home Page Content
        </h1>

        {/* Form Section - Changed background to slate-50 */}
        <form onSubmit={handleSubmit} id="home-upload-form" className="bg-slate-50 p-6 md:p-8 rounded-2xl mb-10 border border-slate-200 shadow-lg space-y-6">
           {/* Changed heading text color */}
           <h2 className="text-2xl font-semibold text-slate-700 mb-6 border-b border-slate-200 pb-4">
             {editingId ? 'Edit Home Content' : 'Upload New Home Content'}
            </h2>

            {/* Video URL Input */}
            <div>
                 {/* Changed label text color */}
                 <label htmlFor="videoUrl" className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
                     <Video size={16} /> Video URL (YouTube/Vimeo)
                 </label>
                 {/* Adjusted input styles for light theme */}
                 <input
                     type="text"
                     id="videoUrl"
                     name="videoUrl"
                     placeholder="Enter video URL..."
                     value={formData.videoUrl}
                     onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                     className="w-full px-4 py-2.5 border border-slate-300 bg-white text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                     required={!editingId}
                 />
            </div>

            {/* Image Upload Fields - Adjusted backgrounds and borders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {["card1Image", "card2Image", "card3Image", "card4Image"].map((name, i) => (
                    // Changed background to white, adjusted border
                    <div key={i} className="space-y-3 bg-white p-4 rounded-lg border border-slate-200">
                         {/* Changed label text color */}
                         <label htmlFor={name} className="block text-sm font-medium text-slate-600 flex items-center gap-2">
                           <ImageIcon size={16} /> Card {i + 1} Image {editingId && !formData[name] ? '(Leave empty to keep existing)' : ''}
                         </label>
                         <div className="flex flex-col sm:flex-row items-center gap-4">
                             {/* Adjusted file input styles */}
                             <input
                                 type="file"
                                 id={name}
                                 name={name}
                                 accept="image/*"
                                 onChange={handleFileChange}
                                 className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer transition-colors"
                            />
                            {preview[name] ? (
                                <img
                                    src={preview[name]}
                                    alt={`Preview Card ${i+1}`}
                                    // Adjusted border color
                                    className="w-20 h-20 object-cover rounded-lg border-2 border-slate-300 shadow-sm flex-shrink-0"
                                />
                            ) : (
                                // Adjusted placeholder style
                                <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0 border border-slate-200">
                                    <ImageIcon size={24}/>
                                </div>
                            )}
                         </div>
                    </div>
                ))}
            </div>

            {/* Error message style adjusted */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-3" role="alert">
                    <AlertCircle size={20} className="text-red-600" />
                    <span className="block sm:inline">{error}</span>
                     <button type="button" onClick={() => setError('')} className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-700 hover:text-red-900">
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Action Buttons - Adjusted styles */}
            <div className="flex flex-col sm:flex-row gap-4 pt-5 border-t border-slate-200 mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={18} />}
                    {loading ? "Processing..." : editingId ? "Save Changes" : "Upload Content"}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={resetForm}
                        disabled={loading}
                        className="flex-1 flex justify-center items-center gap-2 bg-slate-500 text-white font-semibold py-2.5 px-5 rounded-lg shadow hover:bg-slate-600 transition-colors disabled:opacity-50"
                    >
                        <XCircle size={18} /> Cancel Edit
                    </button>
                )}
            </div>
        </form>

        {/* Existing Entries Table - Adjusted styles */}
        <div className="mt-12">
            {/* Changed heading text color */}
            <h2 className="text-2xl font-semibold text-slate-700 mb-6 border-b border-slate-200 pb-3">Existing Home Content</h2>
            {loading && homeList.length === 0 ? (
                 <div className="flex justify-center items-center py-10">
                    <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
                    {/* Changed text color */}
                    <span className="ml-3 text-slate-500">Loading entries...</span>
                </div>
            ) : homeList.length === 0 ? (
                 // Changed background, border, and text color
                <div className="text-center text-slate-500 py-10 bg-slate-50 rounded-lg border border-slate-200">
                    <Home size={40} className="mx-auto mb-3" />
                    No home page entries found. Upload content using the form above.
                </div>
            ) : (
                // Adjusted border color
                <div className="overflow-x-auto shadow-md rounded-lg border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                        {/* Adjusted thead background and text color */}
                        <thead className="bg-slate-50">
                            <tr>
                                {["Card 1", "Card 2", "Card 3", "Card 4", "Video", "Actions"].map((title) => (
                                    <th key={title} scope="col" className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                         {/* Adjusted tbody background and text color */}
                        <tbody className="bg-white divide-y divide-slate-200">
                            {homeList.map((item) => (
                                // Adjusted row hover background
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-150">
                                    {["card1Image", "card2Image", "card3Image", "card4Image"].map((cardKey, i) => (
                                        <td key={i} className="px-6 py-4 whitespace-nowrap">
                                            {item[cardKey] ? (
                                                <img
                                                    src={`${IMAGE_BASE_URL}${item[cardKey]}`}
                                                    alt={`Card ${i+1}`}
                                                    // Adjusted image border color
                                                    className="w-24 h-16 object-cover rounded-md border border-slate-200 shadow-sm"
                                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/96x64/e2e8f0/94a3b8?text=Error"; }} // Placeholder on error
                                                />
                                            ) : (
                                                // Adjusted placeholder style
                                                <div className="w-24 h-16 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 text-xs border border-slate-200">No Image</div>
                                            )}
                                        </td>
                                    ))}
                                     {/* Adjusted text color */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 max-w-xs truncate">
                                        {item.videoUrl ? (
                                             // Adjusted link colors
                                            <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5 transition-colors">
                                                <LinkIcon size={14} /> View Video
                                            </a>
                                        ) : (
                                             // Adjusted placeholder text color
                                            <span className="text-slate-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        {/* Adjusted button colors */}
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-indigo-600 hover:text-indigo-900 transition-colors p-1.5 hover:bg-indigo-100 rounded-md"
                                            title="Edit"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-900 transition-colors p-1.5 hover:bg-red-100 rounded-md"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

// export default HomeAdminUploader; // Removed export default based on previous context

