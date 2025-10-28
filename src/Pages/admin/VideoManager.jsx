import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Eye, X, Youtube, Edit, Trash2 } from "lucide-react";

// API URL (The import.meta.env was causing issues. Using the fallback URL directly to ensure compatibility.)
const API = "http://localhost:3000/api";

/**
 * Custom Confirmation Modal Component
 */
const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white p-7 rounded-2xl shadow-2xl max-w-sm w-full relative transform transition-all scale-100">
        <h3 className="text-xl font-bold text-red-700 mb-4 border-b pb-2">Confirm Deletion</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-md shadow-red-300"
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Video Manager Component
 */
export default function VideoManager() {
  const [videoList, setVideoList] = useState([]);
  const [URL, setURL] = useState("");
  const [Name, setName] = useState("");
  const [profession, setProfession] = useState(""); // Used as Display Title
  const [editId, setEditId] = useState(null);
  const [viewVideo, setViewVideo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      // NOTE: API call logic is preserved as per user's request.
      const res = await axios.get(`${API}/videos`);
      setVideoList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!URL || !URL.startsWith("http")) newErrors.URL = "A valid URL is required.";
    if (!Name || Name.length < 3) newErrors.Name = "Internal Name must be at least 3 characters.";
    if (!profession) newErrors.profession = "Display Title/Profession is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setURL("");
    setName("");
    setProfession("");
    setErrors({});
    setShowForm(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editId) {
        const res = await axios.put(`${API}/videos/${editId}`, { URL, Name, profession });
        setVideoList((prev) => prev.map((v) => (v.id === res.data.id ? res.data : v)));
      } else {
        const res = await axios.post(`${API}/videos`, { URL, Name, profession });
        setVideoList((prev) => [res.data, ...prev]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      // Using custom modal/message for errors instead of alert
      console.error(err?.response?.data?.error || "Server error"); 
    }
  };

  const handleEdit = (video) => {
    setEditId(video.id);
    setURL(video.URL);
    setName(video.Name);
    setProfession(video.profession);
    setShowForm(true);
  };

  const handleDeleteAttempt = (id) => {
    setDeleteId(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API}/videos/${deleteId}`);
      setVideoList((prev) => prev.filter((v) => v.id !== deleteId));
    } catch (err) {
      console.error(err);
      // Using console error instead of alert
      console.error("Server error while deleting");
    } finally {
      setIsConfirmModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleViewVideo = (video) => {
    setViewVideo(video);
  };

  /**
   * Helper function to convert standard video URL (like YouTube/Vimeo) to an embeddable URL.
   */
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&?]{11})/
    );
    // Added controls=1 and rel=0 for better embed experience
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&controls=1&rel=0`;
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return url;
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      
      {/* --- Header --- */}
      <div className="flex justify-between items-center mb-10 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
          <Youtube size={36} className="text-red-600" /> Video Content Manager
        </h1>
        
        {/* Add Video Button */}
        {!showForm && (
          <button
            className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 shadow-xl transition-all flex items-center justify-center text-lg transform hover:scale-[1.02]"
            onClick={() => {
              setShowForm(true);
              setEditId(null);
            }}
          >
            <Plus size={22} className="mr-2" /> Add New Video
          </button>
        )}
      </div>

      {/* --- Form Section --- */}
      {showForm && (
        <div className="bg-white shadow-2xl p-8 rounded-2xl mb-12 border-t-4 border-blue-600">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {editId ? "Edit Existing Video" : "Add New Video Content"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Video URL */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Video Link (YouTube/Vimeo URL)</label>
              <input
                type="url"
                value={URL}
                placeholder="https://url/watch?v=..."
                onChange={(e) => setURL(e.target.value)}
                className={`w-full border p-3.5 rounded-xl text-gray-800 focus:ring-4 focus:ring-blue-100 transition duration-150 ${
                  errors.URL ? "border-red-500 ring-2 ring-red-100" : "border-gray-300"
                }`}
              />
              {errors.URL && <p className="text-red-500 text-sm mt-1 font-medium">{errors.URL}</p>}
            </div>
            
            {/* Internal Name */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Internal Name (For Reference)</label>
              <input
                type="text"
                value={Name}
                placeholder="e.g., Q4 Testimonial Video"
                onChange={(e) => setName(e.target.value)}
                className={`w-full border p-3.5 rounded-xl text-gray-800 focus:ring-4 focus:ring-blue-100 transition duration-150 ${
                  errors.Name ? "border-red-500 ring-2 ring-red-100" : "border-gray-300"
                }`}
              />
              {errors.Name && <p className="text-red-500 text-sm mt-1 font-medium">{errors.Name}</p>}
            </div>

            {/* Profession / Display Title */}
            <div>
              <label className="block font-bold text-gray-700 mb-1">Display Title / Profession</label>
              <input
                type="text"
                value={profession}
                placeholder="e.g., Client Success Story"
                onChange={(e) => setProfession(e.target.value)}
                className={`w-full border p-3.5 rounded-xl text-gray-800 focus:ring-4 focus:ring-blue-100 transition duration-150 ${
                  errors.profession ? "border-red-500 ring-2 ring-red-100" : "border-gray-300"
                }`}
              />
              {errors.profession && <p className="text-red-500 text-sm mt-1 font-medium">{errors.profession}</p>}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t mt-6">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-300"
              >
                {editId ? "Save Changes" : "Add Video"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- Video List --- */}
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Video Library ({videoList.length})</h3>
      
      {loading ? (
          <div className="text-center py-10 text-gray-500 font-semibold">Loading videos...</div>
      ) : videoList.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow-lg text-center text-gray-500 border border-gray-200">
            <Youtube size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-lg font-medium">No videos found. Start by adding a new video above!</p>
        </div>
      ) : (
        // Grid View for Video Cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videoList.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
            >
              {/* Card Thumbnail / Preview */}
              <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 transition-opacity">
                    <button 
                        onClick={() => handleViewVideo(video)}
                        className="p-4 bg-red-600 rounded-full text-white shadow-xl hover:bg-red-700 transition transform hover:scale-105"
                        title="View Video"
                    >
                        <Eye size={24} />
                    </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="font-extrabold text-xl text-gray-900 leading-snug">{video.Name}</h3>
                <p className="text-red-600 font-medium mb-3 text-sm">{video.profession}</p>
                
                <div className="text-sm text-gray-500 truncate mb-4">
                    <span className="font-semibold text-gray-700">Link:</span> {video.URL}
                </div>

                {/* Actions */}
                <div className="flex justify-start gap-3 border-t pt-3">
                  <button 
                    onClick={() => handleEdit(video)} 
                    className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                    title="Edit Details"
                  >
                    <Edit size={16} className="mr-1" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteAttempt(video.id)} 
                    className="flex items-center text-sm font-semibold text-red-600 hover:text-red-800 transition"
                    title="Delete Video"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- View Modal --- */}
      {viewVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white p-7 rounded-2xl shadow-2xl max-w-3xl w-full relative">
            
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 p-2 rounded-full hover:bg-gray-100 hover:text-gray-600 transition"
              onClick={() => setViewVideo(null)}
            >
              <X size={24} />
            </button>
            
            <h3 className="text-3xl font-extrabold text-gray-900 mb-5 border-b pb-3">Viewing: {viewVideo.Name}</h3>
            
            <div className="space-y-5 text-gray-700">
              {/* Embedded Video Player */}
              <div className="w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                {getEmbedUrl(viewVideo.URL) ? (
                    <iframe
                        src={getEmbedUrl(viewVideo.URL)}
                        title={viewVideo.Name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                ) : (
                    <div className="flex items-center justify-center h-full text-white p-6 bg-red-800/90">
                        <p className="text-center font-semibold">Error: Invalid video URL or unsupported platform. Please check the link and try again.</p>
                    </div>
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="font-bold text-gray-800">Display Title/Role:</p>
                      <p className="text-blue-600 font-semibold">{viewVideo.profession}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="font-bold text-gray-800">Video Link:</p>
                      <a 
                          href={viewVideo.URL} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-600 break-all hover:underline"
                      >
                          {viewVideo.URL}
                      </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        message={`Are you sure you want to delete the video "${videoList.find(v => v.id === deleteId)?.Name || ''}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
}
