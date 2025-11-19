import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Save, X, Loader2, Image } from "lucide-react";

/* ------------------------------------------
   🌍 API CONFIGURATION
------------------------------------------- */
const API_BASE = import.meta.env.VITE_API_URL + "/courses";
const IMG_BASE = import.meta.env.VITE_IMAGE_BASE_URL || "http://localhost:3000";

// Set axios base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

/* ------------------------------------------
   🎯 MAIN COMPONENT
------------------------------------------- */
function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    price: "",
    discount: "",
    description: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  /* ------------------------------------------
     📌 Fetch all courses
  ------------------------------------------- */
  const fetchCourses = async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching courses from:", API_BASE);
      
      const res = await axios.get("/courses");
      
      console.log("✅ Fetched courses response:", res);
      console.log("✅ Fetched courses data:", res.data);
      
      // Handle different response structures
      let coursesData = [];
      
      if (Array.isArray(res.data)) {
        coursesData = res.data;
      } else if (Array.isArray(res.data?.data)) {
        coursesData = res.data.data;
      } else if (Array.isArray(res.data?.courses)) {
        coursesData = res.data.courses;
      } else if (res.data?.data && typeof res.data.data === 'object') {
        // If data is an object, convert to array
        coursesData = Object.values(res.data.data);
      }
      
      console.log("✅ Processed courses:", coursesData);
      setCourses(coursesData);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      console.error("❌ Fetch error response:", err.response);
      alert("Failed to load courses. Check if server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ------------------------------------------
     📌 Input change handler
  ------------------------------------------- */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image" && files && files[0]) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: "Please select a valid image file" }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: "Image size should be less than 5MB" }));
        return;
      }
      
      setForm(prev => ({ ...prev, image: file }));
      setErrors(prev => ({ ...prev, image: "" }));
      
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
    }
  };

  /* ------------------------------------------
     📌 Form validation
  ------------------------------------------- */
  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Course name is required";
    if (!form.tagline.trim()) newErrors.tagline = "Tagline is required";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Valid price is required";
    if (!form.discount || Number(form.discount) < 0) newErrors.discount = "Valid discount is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    
    // Validate discount is less than price
    if (Number(form.discount) >= Number(form.price)) {
      newErrors.discount = "Discount should be less than price";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ------------------------------------------
     📌 Reset form
  ------------------------------------------- */
  const resetForm = () => {
    setForm({
      name: "",
      tagline: "",
      price: "",
      discount: "",
      description: "",
      image: null,
    });
    setEditId(null);
    setImagePreview(null);
    setErrors({});
    
    // Clean up preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  /* ------------------------------------------
     📌 Save or update course - FIXED VERSION
  ------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      setFormLoading(true);
      
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("tagline", form.tagline.trim());
      formData.append("price", form.price);
      formData.append("discount", form.discount);
      formData.append("description", form.description.trim());
      
      if (form.image) {
        formData.append("image", form.image);
      }

      console.log("📤 Submitting form data:", { 
        name: form.name,
        tagline: form.tagline,
        price: form.price,
        discount: form.discount,
        description: form.description,
        hasImage: !!form.image,
        editId
      });

      let response;
      if (editId) {
        console.log("🔄 Updating course:", editId);
        response = await axios.put(`/courses/${editId}`, formData, {
          headers: { 
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        console.log("🆕 Creating new course");
        response = await axios.post("/courses", formData, {
          headers: { 
            "Content-Type": "multipart/form-data",
          },
        });
      }

      console.log("✅ Full server response:", response);
      console.log("✅ Server response data:", response.data);

      // ✅ FIXED: Check for success in different possible formats
      const isSuccess = 
        response.data?.success === true ||
        response.data?.status === 'success' ||
        response.status === 200 ||
        response.status === 201;

      if (isSuccess) {
        await fetchCourses();
        resetForm();
        
        // ✅ FIXED: Get message from different possible locations
        const successMessage = 
          response.data?.message ||
          response.data?.data?.message ||
          `Course ${editId ? "updated" : "created"} successfully!`;
          
        alert(successMessage);
      } else {
        // If no clear success but also no error, assume it worked
        await fetchCourses();
        resetForm();
        alert(`Course ${editId ? "updated" : "created"} successfully!`);
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
      console.error("❌ Error response:", err.response);
      
      // ✅ FIXED: Better error message extraction
      let errorMessage = "Failed to save course. Please try again.";
      
      if (err.response?.data) {
        const errorData = err.response.data;
        
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors.map(e => e.msg || e.message).join(', ');
        } else if (typeof errorData === 'object') {
          errorMessage = JSON.stringify(errorData);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(`Error: ${errorMessage}`);
    } finally {
      setFormLoading(false);
    }
  };

  /* ------------------------------------------
     📌 Edit course
  ------------------------------------------- */
  const handleEdit = (course) => {
    setEditId(course.id || course._id);
    setForm({
      name: course.name,
      tagline: course.tagline,
      price: course.price?.toString() || "",
      discount: course.discount?.toString() || "",
      description: course.description,
      image: null,
    });
    
    // Clean up previous preview
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    
    // Set image preview if course has image
    if (course.imageUrl || course.image) {
      const imagePath = course.imageUrl || course.image;
      const fullImageUrl = imagePath.startsWith('http') 
        ? imagePath 
        : `${IMG_BASE}/${imagePath.replace(/^\//, '')}`;
      setImagePreview(fullImageUrl);
    } else {
      setImagePreview(null);
    }
    
    setErrors({});
  };

  /* ------------------------------------------
     📌 Delete course - FIXED VERSION
  ------------------------------------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;
    
    try {
      console.log("🗑️ Deleting course:", id);
      const response = await axios.delete(`/courses/${id}`);
      console.log("✅ Delete response:", response.data);

      // ✅ FIXED: Check for success in different formats
      const isSuccess = 
        response.data?.success === true ||
        response.data?.status === 'success' ||
        response.status === 200;

      if (isSuccess) {
        await fetchCourses();
        const successMessage = response.data?.message || "Course deleted successfully!";
        alert(successMessage);
      } else {
        throw new Error(response.data?.message || "Delete failed");
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      console.error("❌ Delete error response:", err.response);
      
      let errorMessage = "Failed to delete course. Please try again.";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(errorMessage);
    }
  };

  /* ------------------------------------------
     📌 Get image URL helper
  ------------------------------------------- */
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith('http') 
      ? imageUrl 
      : `${IMG_BASE}/${imageUrl.replace(/^\//, '')}`;
  };

  /* ------------------------------------------
     🎨 UI RENDER
  ------------------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Courses
          </h1>
          <p className="text-gray-600">
            Add, edit, and manage your course offerings
          </p>
        </div>

        {/* Debug Info - Remove in production */}
        {import.meta.env.DEV && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Debug Info:</strong> API Base: {import.meta.env.VITE_API_URL} | 
              Courses: {courses.length} | 
              Editing: {editId || "None"}
            </p>
          </div>
        )}

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {editId ? "✏️ Edit Course" : "➕ Add New Course"}
            </h2>
            {editId && (
              <button
                onClick={resetForm}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X size={20} />
                Cancel Edit
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Web Development Bootcamp"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline *
                </label>
                <input
                  type="text"
                  name="tagline"
                  placeholder="e.g., Learn to build modern web applications"
                  value={form.tagline}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.tagline ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.tagline && <p className="text-red-500 text-sm mt-1">{errors.tagline}</p>}
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g., 4999"
                  value={form.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  min="0"
                  step="1"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount (₹) *
                </label>
                <input
                  type="number"
                  name="discount"
                  placeholder="e.g., 999"
                  value={form.discount}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.discount ? "border-red-500" : "border-gray-300"
                  }`}
                  min="0"
                  step="1"
                />
                {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Describe what students will learn in this course..."
                value={form.description}
                onChange={handleChange}
                rows="4"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Image {!editId && "(Optional)"}
              </label>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-1">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                  />
                  {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                  <p className="text-gray-500 text-xs mt-2">
                    Supported formats: JPG, PNG, WebP. Max size: 5MB
                  </p>
                </div>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Course preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={formLoading}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              >
                {formLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    {editId ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    {editId ? "Update Course" : "Save Course"}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex-1"
              >
                <X size={20} />
                Reset Form
              </button>
            </div>
          </form>
        </div>

        {/* Courses List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              All Courses ({courses.length})
            </h2>
            <button
              onClick={fetchCourses}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Loader2 size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <Loader2 className="animate-spin mx-auto text-blue-600" size={48} />
              <p className="text-gray-600 mt-4 text-lg">Loading courses...</p>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id || course._id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  {/* Course Image */}
                  <div className="relative h-48 bg-gray-200">
                    {course.imageUrl || course.image ? (
                      <img
                        src={getImageUrl(course.imageUrl || course.image)}
                        alt={course.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Image size={48} />
                      </div>
                    )}
                    
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ₹{course.price}
                    </div>
                  </div>
                  
                  {/* Course Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {course.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {course.tagline}
                    </p>
                    
                    {/* Pricing Info */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-green-600 font-bold text-lg">₹{course.price}</span>
                      {course.discount > 0 && (
                        <>
                          <span className="text-gray-400 line-through text-sm">₹{course.discount}</span>
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                            Save ₹{course.discount - course.price}
                          </span>
                        </>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course.id || course._id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <Image className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6">Get started by adding your first course!</p>
              <button
                onClick={resetForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Plus size={20} className="inline mr-2" />
                Add Your First Course
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageCourses;