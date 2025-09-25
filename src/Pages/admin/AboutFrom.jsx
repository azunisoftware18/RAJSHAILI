import React, { useState } from 'react';
import { Save, UploadCloud } from 'lucide-react';

// Main Component for the Admin Form
const AboutForm = () => {
  // Function to create initial state for each form section
  const createFormState = () => ({
    title: '',
    description: '',
    image: null,
    previewImage: null,
    error: '',
    isSaved: false,
  });

  // State for three different sections of the About page
  const [form1, setForm1] = useState(createFormState());
  const [form2, setForm2] = useState(createFormState());
  const [form3, setForm3] = useState(createFormState());

  // Function to handle saving the form data
  const handleSave = (form, setForm) => {
    if (!form.title && !form.description && !form.image) {
      setForm({ ...form, error: 'Please fill at least one field before saving.', isSaved: false });
      return;
    }
    
    // In a real app, you would send this data to a server.
    // For this example, we just show a confirmation.
    console.log("Saving data:", {
        title: form.title,
        description: form.description,
        imageName: form.image ? form.image.name : 'No new image'
    });

    setForm({ ...form, isSaved: true, error: '' });
    alert('Form Data Saved Successfully!');
  };

  // Function to handle changes in input fields
  const handleInputChange = (form, setForm, field, value) => {
    let updatedForm = { ...form, [field]: value, error: '', isSaved: false };
    
    if (field === "image" && value) {
      const file = value;
      const previewUrl = URL.createObjectURL(file);
      updatedForm = { ...updatedForm, image: file, previewImage: previewUrl };
    }
    
    setForm(updatedForm);
  };

  // Reusable component to render each form section
  const renderForm = (form, setForm, sectionTitle) => (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-4">
        {sectionTitle}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Title and Description */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter the title for this section"
              value={form.title}
              onChange={(e) => handleInputChange(form, setForm, 'title', e.target.value)}
              className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Enter the description..."
              value={form.description}
              onChange={(e) => handleInputChange(form, setForm, 'description', e.target.value)}
              className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-48 resize-none"
              rows="8"
            ></textarea>
          </div>
        </div>

        {/* Right Column: Image Upload */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <div className="mt-1 flex justify-center items-center w-full h-70 border-2 border-gray-300 border-dashed rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition">
            {form.previewImage ? (
              <img 
                src={form.previewImage} 
                alt="Preview" 
                className="max-h-full max-w-full object-contain rounded-md"
              />
            ) : (
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drag & drop or click to upload</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              id={`file-upload-img-${sectionTitle}`}
              className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
              onChange={(e) => handleInputChange(form, setForm, 'image', e.target.files[0])}
            />
          </div>
        </div>
      </div>
      
      {/* Footer / Actions */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-6">
         <div className="feedback-messages text-sm">
            {form.error && <p className="text-red-600 font-medium">{form.error}</p>}
            {form.isSaved && <p className="text-green-600 font-medium">Content saved successfully!</p>}
         </div>
         <button
            type="button"
            onClick={() => handleSave(form, setForm)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 shadow-md transition-all active:scale-95"
          >
            <Save className="w-5 h-5" />
            <span>Save Section</span>
          </button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4 md:p-8 space-y-8 min-h-screen bg-slate-50">
      <h1 className="text-4xl font-extrabold text-gray-900 text-left">Manage About Page</h1>
      {renderForm(form1, setForm1, 'Section 01: Dr. R. K. Tailor')}
      {renderForm(form2, setForm2, 'Section 02: Shalini Salecha')}
      {renderForm(form3, setForm3, 'Section 03: Awards & Accolades')}
    </div>
  );
};

export default AboutForm;

