import React, { useEffect, useState } from "react";
import { Save, UploadCloud, Loader2 } from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;         // main backend url
const IMG = import.meta.env.VITE_IMAGE_BASE_URL; // image base fallback

axios.defaults.baseURL = API;

// --------------------------------------------------------------------
// 🌟 Section Template
// --------------------------------------------------------------------
const sectionTemplate = () => ({
  id: "",
  title: "",
  description: "",
  imageFile: null,
  imageUrl: "",
  preview: "",
  isLoading: false,
  isSaved: false,
  error: "",
});

// --------------------------------------------------------------------
// 🌟 MAIN COMPONENT
// --------------------------------------------------------------------
const AboutForm = () => {
  const [sections, setSections] = useState([
    sectionTemplate(),
    sectionTemplate(),
    sectionTemplate(),
  ]);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------------------------
  // 🔵 FETCH ALL ABOUT SECTIONS
  // --------------------------------------------------------------------
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get(`/about-get-all`);
        const data = res.data;

        const updated = [...sections];

        data.forEach((item, index) => {
          if (!updated[index]) return;

          const imageComplete =
            item.imageUrl?.startsWith("/uploads/about")
              ? IMG + item.imageUrl
              : item.imageUrl;

          updated[index] = {
            ...updated[index],
            id: item.id,
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            preview: imageComplete || "",
          };
        });

        setSections(updated);
      } catch (err) {
        console.error("Error fetching about sections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  // --------------------------------------------------------------------
  // 🔵 HANDLE TEXT INPUTS
  // --------------------------------------------------------------------
  const updateSection = (index, changes) => {
    setSections((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...changes, isSaved: false, error: "" };
      return updated;
    });
  };

  // --------------------------------------------------------------------
  // 🔵 HANDLE IMAGE UPLOAD
  // --------------------------------------------------------------------
  const handleImage = (index, file) => {
    const preview = URL.createObjectURL(file);
    updateSection(index, {
      imageFile: file,
      preview,
    });
  };

  // --------------------------------------------------------------------
  // 🔵 SAVE SECTION (CREATE or UPDATE)
  // --------------------------------------------------------------------
  const saveSection = async (index) => {
    const section = sections[index];

    if (!section.title && !section.description && !section.preview) {
      return updateSection(index, { error: "Please fill at least one field." });
    }

    updateSection(index, { isLoading: true });

    const formData = new FormData();
    formData.append("title", section.title);
    formData.append("description", section.description);

    if (section.imageFile) formData.append("image", section.imageFile);
    else if (section.imageUrl) formData.append("imageUrl", section.imageUrl);

    try {
      let response;

      // CREATE NEW SECTION
      if (!section.id) {
        response = await axios.post(`/about-create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const saved = response.data.data;
        updateSection(index, {
          id: saved.id,
          imageFile: null,
          imageUrl: saved.imageUrl,
          preview: IMG + saved.imageUrl,
          isSaved: true,
          isLoading: false,
        });
      }
      // UPDATE EXISTING SECTION
      else {
        response = await axios.put(`/about-update/${section.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const saved = response.data.updated;

        updateSection(index, {
          imageFile: null,
          imageUrl: saved.imageUrl || section.imageUrl,
          preview:
            saved.imageUrl?.startsWith("/uploads/about")
              ? IMG + saved.imageUrl
              : section.preview,
          isSaved: true,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      updateSection(index, {
        isLoading: false,
        error: "Failed to save. Please try again.",
      });
    }
  };

  // --------------------------------------------------------------------
  // 🌟 SECTION FORM (Reusable)
  // --------------------------------------------------------------------
  const SectionForm = ({ section, index, title }) => (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold border-b pb-4">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Text Inputs */}
        <div className="space-y-5">
          <label>
            <p className="text-sm font-medium mb-1">Title</p>
            <input
              className="w-full border px-4 py-2 rounded-lg"
              value={section.title}
              onChange={(e) => updateSection(index, { title: e.target.value })}
            />
          </label>

          <label>
            <p className="text-sm font-medium mb-1">Description</p>
            <textarea
              className="w-full border px-4 py-2 rounded-lg h-40"
              value={section.description}
              onChange={(e) =>
                updateSection(index, { description: e.target.value })
              }
            />
          </label>
        </div>

        {/* RIGHT: Image Upload */}
        <div className="relative">
          <p className="text-sm font-medium mb-1">Image</p>

          <div className="border-dashed border-2 rounded-lg h-64 flex items-center justify-center bg-gray-50 relative cursor-pointer overflow-hidden">
            {section.preview ? (
              <img
                src={section.preview}
                className="h-full w-full object-contain"
                alt="Preview"
              />
            ) : (
              <div className="text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                <p className="text-gray-600 text-sm">Click to upload</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => handleImage(index, e.target.files[0])}
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center border-t pt-4">
        <div className="text-sm">
          {section.error && <p className="text-red-600">{section.error}</p>}
          {section.isSaved && <p className="text-green-600">Saved successfully!</p>}
        </div>

        <button
          onClick={() => saveSection(index)}
          disabled={section.isLoading}
          className="bg-blue-600 text-white px-5 py-2 flex items-center gap-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {section.isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {section.isLoading ? "Saving..." : "Save Section"}
        </button>
      </div>
    </div>
  );

  // --------------------------------------------------------------------
  // MAIN RETURN
  // --------------------------------------------------------------------
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="w-full p-4 md:p-8 space-y-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900">Manage About Page</h1>

      <SectionForm section={sections[0]} index={0} title="Section 01: Dr. R. K. Tailor" />
      <SectionForm section={sections[1]} index={1} title="Section 02: Shalini Salecha" />
      <SectionForm section={sections[2]} index={2} title="Section 03: Awards & Accolades" />
    </div>
  );
};

export default AboutForm;
