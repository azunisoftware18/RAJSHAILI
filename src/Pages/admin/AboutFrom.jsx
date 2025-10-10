import React, { useState, useEffect } from 'react';
import { Save, UploadCloud, Loader2 } from 'lucide-react';
import axios from 'axios';

const AboutForm = () => {
  const createFormState = () => ({
    id: '',
    title: '',
    description: '',
    image: null,
    previewImage: null, 
    error: '',
    isSaved: false,
    isLoading: false,
  });

  const [form1, setForm1] = useState(createFormState());
  const [form2, setForm2] = useState(createFormState());
  const [form3, setForm3] = useState(createFormState());

  // ==================== Fetch data ====================
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/about-get-all");
        const data = res.data;

        if (data && data.length > 0) {
          const tailor = data.find(d => d.title.includes("R. K. Tailor"));
          const shalini = data.find(d => d.title.includes("Shalini"));
          const awards = data.find(d => d.title.includes("Awards"));

          if (tailor) {
            setForm1(prev => ({
              ...prev,
              id: tailor.id,
              title: tailor.title,
              description: tailor.description,
              previewImage: tailor.imageUrl, // backend se /uploads/path aayega
            }));
          }

          if (shalini) {
            setForm2(prev => ({
              ...prev,
              id: shalini.id,
              title: shalini.title,
              description: shalini.description,
              previewImage: shalini.imageUrl,
            }));
          }

          if (awards) {
            setForm3(prev => ({
              ...prev,
              id: awards.id,
              title: awards.title,
              description: awards.description,
              previewImage: awards.imageUrl,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  // ==================== Save/Update ====================
  const handleSave = async (form, setForm) => {
    if (!form.title && !form.description && !form.image) {
      setForm({ ...form, error: 'Please fill at least one field before saving.', isSaved: false });
      return;
    }

    setForm(prev => ({ ...prev, isLoading: true, error: '', isSaved: false }));

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);

    if (form.image) {
      formData.append('image', form.image); // new image file
    } else if (form.previewImage) {
      formData.append('imageUrl', form.previewImage); // old image url
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/about-update/${form.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const updatedData = response.data.updated;

      setForm(prev => ({
        ...prev,
        isLoading: false,
        isSaved: true,
        previewImage: updatedData.imageUrl || prev.previewImage,
        image: null,
      }));
    } catch (error) {
      console.error("Error updating data:", error);
      setForm(prev => ({
        ...prev,
        isLoading: false,
        isSaved: false,
        error: 'Failed to save data. Please try again.',
      }));
    }
  };

  // ==================== Input Handler ====================
  const handleInputChange = (form, setForm, field, value) => {
    let updatedForm = { ...form, [field]: value, error: '', isSaved: false };

    if (field === "image" && value) {
      const file = value;
      const previewUrl = URL.createObjectURL(file);
      updatedForm = { ...updatedForm, image: file, previewImage: previewUrl };
    }

    setForm(updatedForm);
  };

  // ==================== Render Form ====================
  const renderForm = (form, setForm, sectionTitle) => {
    const fullImageUrl = form.previewImage
      ? form.previewImage.startsWith("/uploads")
        ? `http://localhost:3000${form.previewImage}` // DB se stored image
        : form.previewImage
      : null;

    return (
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-4">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleInputChange(form, setForm, 'title', e.target.value)}
                className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleInputChange(form, setForm, 'description', e.target.value)}
                className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 h-48 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="mt-1 flex justify-center items-center w-full h-70 border-2 border-gray-300 border-dashed rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition">
              {fullImageUrl ? (
                <img src={fullImageUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
              ) : (
                <div className="text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Drag & drop or click to upload</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
                onChange={(e) => handleInputChange(form, setForm, 'image', e.target.files[0])}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-6">
          <div className="feedback-messages text-sm">
            {form.error && <p className="text-red-600 font-medium">{form.error}</p>}
            {form.isSaved && <p className="text-green-600 font-medium">Content updated successfully!</p>}
          </div>
          <button
            type="button"
            onClick={() => handleSave(form, setForm)}
            disabled={form.isLoading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {form.isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>{form.isLoading ? 'Saving...' : 'Save Section'}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-4 md:p-8 space-y-8 min-h-screen bg-slate-50">
      <h1 className="text-4xl font-extrabold text-gray-900">Manage About Page</h1>
      {renderForm(form1, setForm1, 'Section 01: Dr. R. K. Tailor')}
      {renderForm(form2, setForm2, 'Section 02: Shalini Salecha')}
      {renderForm(form3, setForm3, 'Section 03: Awards & Accolades')}
    </div>
  );
};

export default AboutForm;
