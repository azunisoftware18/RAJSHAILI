import React, { useState, useEffect } from "react";
import {
  Upload,
  Edit,
  Video,
  Image,
  Save,
  RotateCcw,
  Eye,
  X,
} from "lucide-react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = baseURL;

function ManageHomeData() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  // Files user selects
  const [formData, setFormData] = useState({
    card1Image: null,
    card2Image: null,
    card3Image: null,
    card4Image: null,
    videoUrl: "",
  });

  // Preview URLs (real server images OR blob URLs)
  const [previewUrls, setPreviewUrls] = useState({
    card1Image: "",
    card2Image: "",
    card3Image: "",
    card4Image: "",
  });

  const [imagePreview, setImagePreview] = useState({ open: false, url: "" });

  // ================================
  // 🔵 FETCH HOME DATA
  // ================================
  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/home");

      setHomeData(data);

      // Create preview URLs ONLY from server data
      const serverURL = import.meta.env.VITE_IMAGE_BASE_URL;

      setPreviewUrls({
        card1Image: data.card1Image ? `${serverURL}/${data.card1Image}` : "",
        card2Image: data.card2Image ? `${serverURL}/${data.card2Image}` : "",
        card3Image: data.card3Image ? `${serverURL}/${data.card3Image}` : "",
        card4Image: data.card4Image ? `${serverURL}/${data.card4Image}` : "",
      });

      // Clear input file states
      setFormData((prev) => ({
        ...prev,
        card1Image: null,
        card2Image: null,
        card3Image: null,
        card4Image: null,
        videoUrl: data.videoUrl || "",
      }));
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to load home data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  // ================================
  // 🔵 HANDLE FILE CHANGE
  // ================================
  const handleFileChange = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));

    // Blob preview
    setPreviewUrls((prev) => ({
      ...prev,
      [field]: file ? URL.createObjectURL(file) : prev[field],
    }));
  };

  // ================================
  // 🔵 HANDLE SAVE
  // ================================
  const handleSave = async () => {
    try {
      setSaving(true);

      const submitData = new FormData();

      // Only append selected files
      ["card1Image", "card2Image", "card3Image", "card4Image"].forEach(
        (field) => {
          if (formData[field] instanceof File) {
            submitData.append(field, formData[field]);
          }
        }
      );

      submitData.append("videoUrl", formData.videoUrl || "");

      const response = await axios.post("/home/upsert", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        await fetchHomeData();
        setEditing(false);
        alert("Home data updated!");
      } else {
        alert(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save home data");
    } finally {
      setSaving(false);
    }
  };

  

  const openImagePreview = (url) => setImagePreview({ open: true, url });
  const closeImagePreview = () => setImagePreview({ open: false, url: "" });

  // ================================
  // 🔵 LOADER
  // ================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  // ================================
  // 🔵 UI
  // ================================
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <header className="bg-blue-700 text-white py-6 shadow">
        <h1 className="text-center text-3xl font-bold">Home Page Management</h1>
      </header>

      <div className="container mx-auto px-4 mt-8">
        {/* Buttons */}
        <div className="flex justify-between mb-6">
          {!editing ? (
            <button
              className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
              onClick={() => setEditing(true)}
            >
              <Edit size={18} /> Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                className="bg-green-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
                onClick={handleSave}
                disabled={saving}
              >
                <Save size={18} />
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                className="bg-gray-500 text-white px-5 py-3 rounded-lg"
                onClick={() => {
                  setEditing(false);
                  fetchHomeData();
                }}
              >
                Cancel
              </button>
            </div>
          )}

         
        </div>

        {/* Video Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Video className="text-blue-600" />
            <h2 className="text-xl font-semibold">Video URL</h2>
          </div>

          {editing ? (
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  videoUrl: e.target.value,
                }))
              }
              className="w-full border p-3 rounded"
            />
          ) : (
            <a
              className="text-blue-600 underline break-all"
              href={homeData.videoUrl}
              target="_blank"
            >
              {homeData.videoUrl}
            </a>
          )}
        </div>

        {/* Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-6">
            <Image className="text-blue-600" />
            <h2 className="text-xl font-semibold">Home Page Cards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => {
              const field = `card${num}Image`;
              const preview = previewUrls[field];

              return (
                <div key={num} className="border p-4 rounded">
                  <h3 className="text-center mb-3 font-medium">Card {num}</h3>

                  <div className="h-48 bg-gray-100 rounded flex items-center justify-center relative group overflow-hidden">
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          className="w-full h-full object-cover"
                        />

                        {editing ? (
                          <label className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition">
                            <Upload />
                            <input
                              hidden
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(field, e.target.files[0])
                              }
                            />
                          </label>
                        ) : (
                          <button
                            onClick={() => openImagePreview(preview)}
                            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                      </>
                    ) : editing ? (
                      <label className="cursor-pointer text-blue-600 flex flex-col items-center">
                        <Upload size={30} />
                        Upload Image
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileChange(field, e.target.files[0])
                          }
                        />
                      </label>
                    ) : (
                      <p className="text-gray-500">No Image</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {imagePreview.open && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl">
            <div className="flex justify-between p-4 border-b">
              <h3 className="font-semibold">Image Preview</h3>
              <button onClick={closeImagePreview}>
                <X size={22} />
              </button>
            </div>
            <img
              src={imagePreview.url}
              className="max-h-[80vh] object-contain p-4"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageHomeData;
