import React, { useState } from 'react';
import { Save, Image as ImageIcon } from 'lucide-react'; // ✅ Lucide icon import

const AboutForm = () => {
  const createFormState = () => ({
    title: '',
    savedTitle: '',
    description: '',
    savedDescription: '',
    image: null,
    savedImage: null,
    previewImage: null,
    error: '',
  });

  const [form1, setForm1] = useState(createFormState());
  const [form2, setForm2] = useState(createFormState());
  const [form3, setForm3] = useState(createFormState());

  const handleSave = (form, setForm) => {
    if (!form.title && !form.description && !form.image) {
      setForm({ ...form, error: 'Please fill at least one field before saving.' });
      return;
    }

    setForm({
      ...form,
      savedTitle: form.title,
      savedDescription: form.description,
      savedImage: form.image,
      error: '',
    });

    alert('Form Data Saved Successfully!');
  };

  const handleInputChange = (form, setForm, field, value) => {
    if (field === "image" && value) {
      const file = value;
      const previewUrl = URL.createObjectURL(file);
      setForm({ ...form, image: file, previewImage: previewUrl, error: '' });
    } else {
      setForm({ ...form, [field]: value, error: '' });
    }
  };

  const renderForm = (form, setForm, sectionTitle) => (
    <div className="bg-white p-6 rounded-3xl  space-y-4 shadow-xl/30 ">
      <h2 className="text-xl font-semibold mb-4">{sectionTitle}</h2>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => handleInputChange(form, setForm, 'title', e.target.value)}
        className="w-full inset-shadow-sm rounded-2xl px-3 py-2"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => handleInputChange(form, setForm, 'description', e.target.value)}
        className="w-full rounded-2xl inset-shadow-sm  px-3 py-2"
        rows="4"
      ></textarea>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        id={`file-upload-img-${sectionTitle}`}
        className="hidden"
        onChange={(e) => handleInputChange(form, setForm, 'image', e.target.files[0])}
      />

      {/* Custom Button with Icon */}
      <label
        htmlFor={`file-upload-img-${sectionTitle}`}
        className="cursor-pointer inline-flex items-center space-x-2  text-black px-4 py-2 hover:shadow-2xl rounded-2xl inset-shadow-sm"
      >
        <ImageIcon className="w-5 h-5" /> 
        <span>Upload Image</span>
      </label>

      {/* ✅ Image Preview */}
      {form.previewImage && (
        <img 
          src={form.previewImage} 
          alt="Preview" 
          className="w-40 h-40 object-cover rounded-xl mt-3 shadow-2xl"
        />
      )}

      <button
        type="button"
        onClick={() => handleSave(form, setForm)}
        className="text-black px-4 py-2 rounded-2xl flex items-center space-x-2 inset-shadow-sm hover:shadow-xl/30"
      >
        <Save className="w-4 h-4" />
        <span>Save</span>
      </button>

      {form.error && <p className="text-red-600">{form.error}</p>}
      {form.savedTitle && <p className="text-green-600">Saved Title: {form.savedTitle}</p>}
      {form.savedDescription && <p className="text-green-600">Saved Description: {form.savedDescription}</p>}
      {form.savedImage && <p className="text-green-600">Saved Image: {form.savedImage.name}</p>}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 min-h-screen">
      {renderForm(form1, setForm1, 'Section 01')}
      {renderForm(form2, setForm2, 'Section 02')}
      {renderForm(form3, setForm3, 'Section 03')}
    </div>
  );
};

export default AboutForm;
