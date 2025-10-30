import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Loader2, BookOpen, Image as ImageIcon } from "lucide-react";

// Delete Confirmation Modal
const ConfirmationModal = ({ isOpen, courseName, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white p-7 rounded-2xl shadow-2xl max-w-sm w-full relative">
        <h3 className="text-xl font-bold text-red-600 mb-4 border-b border-gray-200 pb-2">
          Confirm Deletion
        </h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the course:{" "}
          <span className="font-semibold text-gray-900">"{courseName}"</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    price: "",
    discount: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteCourse, setDeleteCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const API = `${import.meta.env.VITE_API_URL}/`;

  // Fetch courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const resetForm = () => {
    setFormData({ name: "", tagline: "", price: "", discount: "", description: "", image: null });
    const fileInput = document.getElementById("file-input");
    if (fileInput) fileInput.value = "";
    setIsEditing(false);
    setEditId(null);
    setMessage("");
    setIsFormVisible(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleEdit = (course) => {
    setEditId(course.id);
    setIsEditing(true);
    setFormData({
      name: course.name,
      tagline: course.tagline,
      price: String(course.price),
      discount: String(course.discount),
      description: course.description,
      image: null,
    });
    setMessage(`Editing Course: ${course.name}`);
    setIsFormVisible(true);
    const formElement = document.getElementById("course-form");
    if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.name || !formData.tagline || !formData.price || (!isEditing && !formData.image)) {
      setMessage("❌ Please fill all required fields and select an image.");
      setLoading(false);
      return;
    }

    if (formData.discount < 0 || formData.discount > 100) {
      setMessage("❌ Discount must be between 0 and 100.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      if (isEditing) {
        await axios.put(`${API}/courses/${editId}`, data, { headers: { "Content-Type": "multipart/form-data" } });
        setMessage(`✅ Course "${formData.name}" updated successfully!`);
      } else {
        await axios.post(`${API}/courses`, data, { headers: { "Content-Type": "multipart/form-data" } });
        setMessage("✅ Course uploaded successfully!");
      }

      resetForm();
      fetchCourses();
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to process course. Check server connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAttempt = (course) => {
    setDeleteCourse(course);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteCourse) return;
    setIsConfirmModalOpen(false);
    setLoading(true);
    setMessage("");

    try {
      await axios.delete(`${API}/courses/${deleteCourse.id}`);
      setMessage(`🗑️ Course "${deleteCourse.name}" deleted successfully!`);
      fetchCourses();
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to delete course.");
    } finally {
      setLoading(false);
      setDeleteCourse(null);
    }
  };

  const calculateFinalPrice = (price, discount) => (price * (1 - discount / 100)).toFixed(0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 pt-4 border-b-4 border-blue-500/10 pb-4">
          <h1 className="text-4xl font-extrabold text-blue-700 flex items-center justify-center gap-3">
            <BookOpen size={36} className="text-blue-500" /> Course Management
          </h1>
          <p className="text-gray-500 mt-2">Add, edit, and manage your online course listings.</p>
        </div>

        {/* Add Button */}
        <div className="mb-8 flex justify-end">
          <button
            type="button"
            onClick={() => { resetForm(); setIsFormVisible(true); setIsEditing(false); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md flex items-center space-x-2"
          >
            <Plus size={20} /> <span>Add New Course</span>
          </button>
        </div>

        {/* Form */}
        {isFormVisible && (
          <form onSubmit={handleSubmit} id="course-form" className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-blue-600 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2 border-b pb-3 border-gray-100">
              {isEditing ? <Edit size={24} className="text-green-600" /> : <Plus size={24} className="text-blue-600" />}
              {isEditing ? "Edit Course Details" : "Add New Course"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Course Name" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="Tagline" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                <input type="number" name="discount" value={formData.discount} onChange={handleChange} min="0" max="100" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300" required />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300"></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <ImageIcon size={18} className="text-blue-500" /> Course Thumbnail Image
              </label>
              <input type="file" name="image" id="file-input" accept="image/*" onChange={handleChange} className="block w-full file:py-2 file:px-4 file:rounded-xl file:bg-blue-100 file:text-blue-700 cursor-pointer" required={!isEditing} />
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">
              <button type="submit" disabled={loading} className={` ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-8 py-3 rounded-xl font-bold text-lg transition-all`}>
                {loading ? (<><Loader2 size={20} className="animate-spin" /> Processing...</>) : (isEditing ? "Save Changes" : "Upload Course")}
              </button>
            </div>

            {message && <p className={`mt-4 text-center text-sm font-semibold p-3 rounded-xl ${message.startsWith('✅') || message.startsWith('🗑️') ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>{message}</p>}
          </form>
        )}

        {/* Courses List */}
        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-800 border-b border-gray-300 pb-3">📚 All Courses ({courses.length})</h2>

        {courses.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-lg">No courses found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map(course => (
              <div key={course.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                {/* Image */}
                <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
                  <img
                    src={course.imageUrl.startsWith("http") ? course.imageUrl : `${API}${course.imageUrl}`}
                    alt={course.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x400/E5E7EB/4B5563?text=Course+Image";
                    }}
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={() => handleEdit(course)} className="bg-yellow-400 hover:bg-yellow-500 p-1.5 rounded-full transition">
                      <Edit size={16} className="text-white" />
                    </button>
                    <button onClick={() => handleDeleteAttempt(course)} className="bg-red-500 hover:bg-red-600 p-1.5 rounded-full transition">
                      <Trash2 size={16} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{course.name}</h3>
                  <p className="text-gray-500 text-sm">{course.tagline}</p>
                  <p className="mt-2 font-semibold text-gray-900">
                    ₹{calculateFinalPrice(course.price, course.discount)}{" "}
                    <span className="line-through text-gray-400 text-sm">₹{course.price}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          courseName={deleteCourse?.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      </div>
    </div>
  );
}
