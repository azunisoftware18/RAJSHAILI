import React, { useRef, useState } from "react";

export default function AddCourseForm() {
  const [images, setImages] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseTagline, setCourseTagline] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseDiscount, setCourseDiscount] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const inputImageURL = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(newImages);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!courseName || courseName.length < 3) {
      newErrors.courseName = "Course name must be at least 3 characters.";
    }
    if (!courseTagline) {
      newErrors.courseTagline = "Tagline is required.";
    }
    if (!coursePrice || coursePrice <= 0) {
      newErrors.coursePrice = "Price must be greater than 0.";
    }
    if (courseDiscount < 0 || courseDiscount > 100) {
      newErrors.courseDiscount = "Discount must be between 0 and 100.";
    }
    if (editIndex === null && images.length === 0) {
      newErrors.images = "At least one image is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newCourse = {
      images: images.length > 0 ? images : courseList[editIndex]?.images,
      courseName,
      courseTagline,
      coursePrice,
      courseDiscount,
      courseDescription: courseDescription
        .split("\n")
        .filter((line) => line.trim() !== ""),
    };

    if (editIndex !== null) {
      const updatedList = [...courseList];
      updatedList[editIndex] = newCourse;
      setCourseList(updatedList);
    } else {
      setCourseList([...courseList, newCourse]);
    }

    // Reset form fields
    setCourseName("");
    setCourseTagline("");
    setCoursePrice("");
    setCourseDiscount("");
    setCourseDescription("");
    setImages([]);
    if (inputImageURL.current) inputImageURL.current.value = "";
    setErrors({});
    setShowForm(false);
    setEditIndex(null);
  };

  const handleEdit = (course, index) => {
    setEditIndex(index);
    setCourseName(course.courseName);
    setCourseTagline(course.courseTagline);
    setCoursePrice(course.coursePrice);
    setCourseDiscount(course.courseDiscount);
    setCourseDescription(course.courseDescription.join("\n"));
    setImages(course.images || []); // Ensure images is an array
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if(window.confirm("Are you sure you want to delete this course?")) {
        const filteredList = courseList.filter((_, i) => i !== index);
        setCourseList(filteredList);
    }
  };
  
  const resetForm = () => {
      setCourseName("");
      setCourseTagline("");
      setCoursePrice("");
      setCourseDiscount("");
      setCourseDescription("");
      setImages([]);
      if (inputImageURL.current) inputImageURL.current.value = "";
      setErrors({});
      setShowForm(false);
      setEditIndex(null);
  }
  
  const handleViewCourse = (course) => {
    setViewCourse(course);
    if (course.images && course.images.length > 0) {
        setSelectedImage(course.images[0].url);
    }
  }

  const calculateFinalPrice = (price, discount) => {
      if(!price || !discount) return price;
      return (price - (price * discount / 100)).toFixed(2);
  }

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Add Course Button */}
      {!showForm && (
        <div className="text-right mb-6">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 shadow-md transition-all"
            onClick={() => {
                setShowForm(true);
                setEditIndex(null);
            }}
          >
            + Add New Course
          </button>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white shadow-xl p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {editIndex !== null ? "Edit Course Details" : "Add a New Course"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700">Course Name</label>
              <input
                type="text"
                className={`w-full border p-2 rounded mt-1 ${
                  errors.courseName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Advanced Vedic Astrology"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
              {errors.courseName && (
                <p className="text-red-500 text-sm mt-1">{errors.courseName}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Tagline</label>
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                placeholder="A short, catchy tagline for the course"
                value={courseTagline}
                onChange={(e) => setCourseTagline(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded mt-1"
                  placeholder="e.g., 4999"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                />
                 {errors.coursePrice && (
                    <p className="text-red-500 text-sm mt-1">{errors.coursePrice}</p>
                 )}
              </div>
              <div>
                <label className="block font-semibold text-gray-700">Discount (%)</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded mt-1"
                  placeholder="e.g., 20"
                  value={courseDiscount}
                  onChange={(e) => setCourseDiscount(e.target.value)}
                />
                 {errors.courseDiscount && (
                    <p className="text-red-500 text-sm mt-1">{errors.courseDiscount}</p>
                 )}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Description (add points in new lines)</label>
              <textarea
                className="w-full border p-2 rounded mt-1"
                rows="4"
                placeholder="Enter key features of the course..."
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={inputImageURL}
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {editIndex !== null ? "Save Changes" : "Add Course"}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Course List Section */}
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Course List</h3>
      {courseList.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No courses have been added yet.</p>
      ) : (
        <>
        {/* Table View for Medium Screens and Up */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Image</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Price Details</th>
                <th className="border p-3">Description</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseList.map((course, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="border p-2">
                    {course.images[0] && (
                      <img
                        src={course.images[0].url}
                        alt="Course"
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="border p-3">
                    <p className="font-bold">{course.courseName}</p>
                    <p className="text-sm text-gray-600">{course.courseTagline}</p>
                  </td>
                  <td className="border p-3">
                    <p className="font-bold text-lg">₹{calculateFinalPrice(course.coursePrice, course.courseDiscount)}</p>
                    <p className="text-sm text-green-600">{course.courseDiscount}% off</p>
                  </td>
                  <td className="border p-3 text-sm text-gray-700">
                    {course.courseDescription[0]}...
                  </td>
                  <td className="border p-3">
                    <div className="flex justify-center gap-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          onClick={() => handleEdit(course, index)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleViewCourse(course)}
                        >
                          View
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Card View for Small Screens */}
        <div className="block md:hidden space-y-4">
            {courseList.map((course, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex space-x-4">
                    <div className="flex-shrink-0">
                        {course.images[0] && (
                           <img
                                src={course.images[0].url}
                                alt="Course"
                                className="h-24 w-24 object-cover rounded-md"
                            />
                        )}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-lg">{course.courseName}</h4>
                        <p className="text-sm text-gray-600">{course.courseTagline}</p>
                        <div className="flex items-center space-x-2 my-1">
                            <p className="text-md font-semibold text-black">₹{calculateFinalPrice(course.coursePrice, course.courseDiscount)}</p>
                            <p className="text-sm text-gray-500 line-through">₹{course.coursePrice}</p>
                            <p className="text-sm text-green-600">{course.courseDiscount}% off</p>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{course.courseDescription[0]}...</p>
                        <div className="flex justify-end gap-2">
                             <button
                                className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
                                onClick={() => handleEdit(course, index)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
                                onClick={() => handleDelete(index)}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
                                onClick={() => handleViewCourse(course)}
                            >
                                View
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
      )}

      {/* View Card Modal */}
      {viewCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full relative">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Course Details :-</h3>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Side: Images */}
                <div className="w-full md:w-1/2">
                    <div className="main-image mb-2">
                        <img src={selectedImage || viewCourse.images[0]?.url} alt="Course" className="w-full h-64 object-cover rounded-lg shadow-md"/>
                    </div>
                    <div className="thumbnails flex gap-2">
                        {viewCourse.images.map((img, i) => (
                             <img
                                key={i}
                                src={img.url}
                                alt={`Thumbnail ${i}`}
                                className={`h-16 w-16 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img.url ? 'border-blue-500' : 'border-transparent'}`}
                                onClick={() => setSelectedImage(img.url)}
                            />
                        ))}
    
                    </div>
                </div>
                {/* Right Side: Details */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800">{viewCourse.courseName}</h2>
                    <p className="text-gray-600 mb-3">{viewCourse.courseTagline}</p>
                    <div className="flex items-center gap-3 mb-4">
                        <p className="text-2xl font-bold text-purple-700">₹{calculateFinalPrice(viewCourse.coursePrice, viewCourse.courseDiscount)}</p>
                        <p className="text-md text-gray-400 line-through">₹{viewCourse.coursePrice}</p>
                        <p className="text-md font-semibold text-green-600">{viewCourse.courseDiscount}% off</p>
                    </div>
                     <div className="flex gap-3 mb-4">
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Enroll Now</button>
                        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Add to Wishlist</button>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Description:</h4>
                        <div className="max-h-32 overflow-y-auto text-gray-700 pr-2">
                            <ul className="list-disc list-inside space-y-1">
                                {viewCourse.courseDescription.map((desc, i) => (
                                <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
             <button
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              onClick={() => setViewCourse(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

