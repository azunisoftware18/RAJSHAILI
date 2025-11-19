// VideoManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Video,
  X,
  Search,
  User,
  Play,
} from "lucide-react";

/* ------------------------------------------
   🌍 API BASE
------------------------------------------- */
const API = import.meta.env.VITE_API_URL + "/videos";

/* ------------------------------------------
   🎬 MAIN COMPONENT
------------------------------------------- */
export default function VideoManagement() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    URL: "",
    Name: "",
    profession: "",
  });

  /* ------------------------------------------
     📌 Fetch Videos
  ------------------------------------------- */
  const fetchVideos = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API);

      const arr =
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data.videos)
          ? res.data.videos
          : [];

      setVideos(arr);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to load videos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  /* ------------------------------------------
     📌 Input Handler
  ------------------------------------------- */
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  /* ------------------------------------------
     📌 Validation
  ------------------------------------------- */
  const validateForm = () => {
    const err = {};
    if (!formData.URL.trim()) err.URL = "Video URL is required";
    else if (!isValidUrl(formData.URL)) err.URL = "Invalid URL";

    if (!formData.Name.trim()) err.Name = "Name is required";
    if (!formData.profession.trim()) err.profession = "Profession is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /* ------------------------------------------
     📌 PERFECT YOUTUBE ID EXTRACTOR
------------------------------------------- */
  const getYouTubeId = (url) => {
    if (!url) return null;

    try {
      const u = new URL(url);

      // Case 1: Typical YouTube watch URL
      if (u.searchParams.get("v")) {
        return u.searchParams.get("v");
      }

      // Case 2: Short links, shorts, embed
      const pathParts = u.pathname.split("/");

      const last = pathParts[pathParts.length - 1];

      if (last.length >= 11) return last;

      return null;
    } catch {
      return null;
    }
  };

  /* ------------------------------------------
     📌 Save / Update
  ------------------------------------------- */
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);

      if (editingVideo) {
        await axios.put(`${API}/${editingVideo.id}`, formData);
      } else {
        await axios.post(API, formData);
      }

      await fetchVideos();
      resetForm();
      alert(`Video ${editingVideo ? "updated" : "added"} successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to save video.");
    } finally {
      setSaving(false);
    }
  };

  /* ------------------------------------------
     📌 Delete
  ------------------------------------------- */
  const handleDelete = async (video) => {
    if (!window.confirm(`Delete "${video.Name}"?`)) return;

    try {
      await axios.delete(`${API}/${video.id}`);
      await fetchVideos();
      alert("Video deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete video.");
    }
  };

  /* ------------------------------------------
     📌 Edit
  ------------------------------------------- */
  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      URL: video.URL,
      Name: video.Name,
      profession: video.profession,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingVideo(null);
    setFormData({ URL: "", Name: "", profession: "" });
    setErrors({});
    setShowModal(true);
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingVideo(null);
    setFormData({ URL: "", Name: "", profession: "" });
    setErrors({});
  };

  /* ------------------------------------------
     📌 Filter Videos
  ------------------------------------------- */
  const filtered = videos.filter((v) =>
    [v.Name, v.profession, v.URL]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* ------------------------------------------
     ⏳ Loading
  ------------------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-blue-600"></div>
        <p className="mt-3">Loading videos...</p>
      </div>
    );
  }

  /* ------------------------------------------
     🎨 UI
  ------------------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-blue-600 text-white py-10 shadow-lg">
        <h1 className="text-3xl text-center font-bold">Video Management</h1>
        <p className="text-center opacity-80 mt-1">Manage all uploaded videos</p>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-xl shadow">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 px-5 py-3 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Add Video
          </button>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {filtered.map((video) => {
            const yt = getYouTubeId(video.URL);

            return (
              <div
                key={video.id}
                className="bg-white shadow rounded-xl overflow-hidden"
              >
                <div className="relative aspect-video bg-gray-200">
                  {yt ? (
                    <img
                      src={`https://img.youtube.com/vi/${yt}/hqdefault.jpg`}
                      className="w-full h-full object-cover"
                      alt={video.Name}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <Video size={48} />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">{video.Name}</h3>

                  <div className="mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      {video.profession}
                    </div>

                    <a
                      href={video.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 mt-2"
                    >
                      <Play size={16} /> Watch Video
                    </a>
                  </div>

                  {/* FIXED BUTTONS */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(video)}
                      className="flex-1 p-3 flex justify-center items-center rounded-xl bg-blue-50 hover:bg-blue-100 transition"
                    >
                      <Edit size={20} className="text-blue-600" />
                    </button>

                    <button
                      onClick={() => handleDelete(video)}
                      className="flex-1 p-3 flex justify-center items-center rounded-xl bg-red-50 hover:bg-red-100 transition"
                    >
                      <Trash2 size={20} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Video size={50} className="mx-auto text-gray-300" />
            <p className="text-gray-500 mt-4 text-lg">No videos found.</p>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <Modal
          onClose={resetForm}
          onSave={handleSave}
          saving={saving}
          editing={!!editingVideo}
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          getYouTubeId={getYouTubeId}
        />
      )}
    </div>
  );
}

/* ------------------------------------------
   🧩 MODAL COMPONENT - FIXED VERSION
------------------------------------------- */
function Modal({
  onClose,
  onSave,
  saving,
  editing,
  formData,
  errors,
  handleInputChange,
  getYouTubeId,
}) {
  const yt = getYouTubeId(formData.URL);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">
            {editing ? "Edit Video" : "Add Video"}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <InputField
            label="Video URL *"
            value={formData.URL}
            error={errors.URL}
            onChange={(v) => handleInputChange("URL", v)}
            placeholder="https://www.youtube.com/watch?v=..."
          />

          <InputField
            label="Name *"
            value={formData.Name}
            error={errors.Name}
            onChange={(v) => handleInputChange("Name", v)}
            placeholder="Video title"
          />

          <InputField
            label="Profession *"
            value={formData.profession}
            error={errors.profession}
            onChange={(v) => handleInputChange("profession", v)}
            placeholder="Profession"
          />

          {/* Thumbnail Preview */}
          {yt && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Thumbnail Preview:</p>
              <img
                src={`https://img.youtube.com/vi/${yt}/hqdefault.jpg`}
                className="rounded-lg border w-full"
                alt="YouTube thumbnail"
              />
            </div>
          )}
        </div>

        {/* Footer - FIXED BUTTONS */}
        <div className="flex gap-3 p-5 border-t sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            disabled={saving}
            className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            disabled={saving}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {saving ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Saving...
              </>
            ) : editing ? (
              "Update Video"
            ) : (
              "Save Video"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------
   🧩 Input Component
------------------------------------------- */
function InputField({ label, value, error, onChange, placeholder }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}