import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, X } from "lucide-react";

// --- FIXED API DEFINITION ---
// Environment Variables for robust access and fallback
const API_URL = (typeof import.meta !== 'undefined' ? import.meta.env.VITE_API_URL : undefined) || "http://localhost:5000/api";
const IMAGE_BASE_URL = (typeof import.meta !== 'undefined' ? import.meta.env.VITE_IMAGE_BASE_URL : undefined) || "http://localhost:5000";
// ----------------------------

// Set axios base URL globally
// This is the BASE URL for all API calls (e.g., http://localhost:5000/api)
axios.defaults.baseURL = API_URL;

// ================= Payment Modal =================
const PaymentModal = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1F3A5A] text-white rounded-2xl p-8 max-w-md w-full relative border border-yellow-400/50 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-yellow-400 text-black rounded-full p-1 hover:bg-yellow-300"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-yellow-400">
          Scan to Pay
        </h2>
        <p className="text-center text-gray-300 mb-4">
          Pay for <span className="font-semibold text-yellow-300">{course.name}</span>
        </p>

        <div className="flex justify-center">
          <img
            src="/images/payment-qr.png"
            alt="Payment QR"
            className="w-56 h-56 rounded-xl border border-yellow-400 shadow-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/224x224/fcd34d/1f2937?text=QR+Code"; }}
          />
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-300 text-sm mb-2">
            UPI ID: <span className="text-yellow-300 font-semibold">yourupi@upi</span>
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-yellow-400 text-gray-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-300 transition-all"
          >
            Payment Done ✅
          </button>
        </div>
      </div>
    </div>
  );
};

// ================= Course Detail Modal =================
const CourseDetailModal = ({ course, onClose }) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  if (!course) return null;

  // Get course data with fallbacks
  const courseName = course.name || course.title || "Untitled Course";
  const coursePrice = course.price || 0;
  const courseDescription = course.description || "No description available.";
  const courseInstructor = course.instructor || "N/A";
  const courseRating = course.rating || "4.5";
  const courseOriginalPrice = course.originalPrice || "";
  const courseKeyFeatures = course.keyFeatures || [];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#192A41]/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-[#1F3A5A] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative border border-blue-800/50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative h-full min-h-[300px] md:min-h-full">
              <img
                src={getImageUrl(course)}
                alt={courseName}
                className="w-full h-full object-cover"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/600x400/1F3A5A/FFFFFF?text=Course+Image"; 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Details */}
            <div className="p-6 md:p-10 text-white">
              <h1 className="text-4xl font-extrabold text-yellow-400 mb-2">{courseName}</h1>
              <p className="text-gray-400 text-lg mb-4">Instructor: {courseInstructor}</p>

              <div className="flex items-center mb-6">
                <span className="font-bold text-2xl text-yellow-400">{courseRating}</span>
                <Star className="w-6 h-6 text-yellow-400 ml-2" fill="currentColor" />
              </div>

              <div className="mb-8 p-4 bg-blue-800/30 rounded-lg">
                <span className="font-extrabold text-4xl text-white mr-4">₹{coursePrice}</span>
                {courseOriginalPrice && (
                  <span className="line-through text-gray-400 text-xl">₹{courseOriginalPrice}</span>
                )}
              </div>

              <p className="text-gray-300 mb-6">{courseDescription}</p>

              {courseKeyFeatures.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-white mb-3">What You'll Learn:</h2>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 mb-8 ml-4">
                    {courseKeyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}

              <button
                onClick={() => setIsPaymentOpen(true)}
                className="w-full bg-yellow-400 text-gray-900 font-bold py-3 text-xl rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-xl"
              >
                Enroll Now - ₹{coursePrice}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isPaymentOpen && <PaymentModal course={course} onClose={() => setIsPaymentOpen(false)} />}
    </>
  );
};

// ================= Course Card =================
const CourseCard = ({ course, onClick }) => {
  // Get course data with fallbacks
  const courseName = course.name || course.title || "Untitled Course";
  const coursePrice = course.price || 0;
  const courseInstructor = course.instructor || "N/A";
  const courseRating = course.rating || "4.5";
  const courseOriginalPrice = course.originalPrice || "";
  const isBestseller = course.isBestseller || false;

  return (
    <div
      className="bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl overflow-hidden border border-blue-800/50 shadow-lg group hover:shadow-yellow-500/10 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(course)}
    >
      <div className="overflow-hidden relative">
        <img
          src={getImageUrl(course)}
          alt={courseName}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/600x400/1F3A5A/FFFFFF?text=Course+Image"; 
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-5">
        {isBestseller && (
          <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
            Bestseller
          </span>
        )}
        <h2 className="text-xl font-bold text-white mb-1 truncate">{courseName}</h2>
        <p className="text-gray-400 text-sm mb-3">{courseInstructor}</p>
        <div className="flex items-center mb-3">
          <span className="font-bold text-yellow-400">{courseRating}</span>
          <Star className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" />
        </div>
        <div className="mb-4">
          <span className="font-extrabold text-2xl text-white">
            ₹{coursePrice}
          </span>{" "}
          {courseOriginalPrice && (
            <span className="line-through text-gray-500">₹{courseOriginalPrice}</span>
          )}
        </div>
        <p className="text-yellow-400 text-sm font-semibold hover:text-yellow-300">
          View Details...
        </p>
      </div>
    </div>
  );
};

// ================= Image URL Helper Function =================
const getImageUrl = (course) => {
  if (!course) return "https://placehold.co/600x400/1F3A5A/FFFFFF?text=Course+Image";
  
  // Try different possible image field names
  const imagePath = course.imageUrl || course.image || course.imagePath || course.thumbnail;
  
  if (!imagePath) {
    return "https://placehold.co/600x400/1F3A5A/FFFFFF?text=Course+Image";
  }
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it starts with /, remove the leading slash
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  // Construct the full URL
  return `${IMAGE_BASE_URL}/${cleanPath}`;
};


// ================= Main Courses Page =================
export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("🔄 Fetching courses from:", `${API_URL}/courses`);
        const res = await axios.get('/courses');
        console.log("✅ Courses API Response:", res.data);
        
        // Handle different response structures
        let coursesData = [];
        
        if (Array.isArray(res.data)) {
          coursesData = res.data;
        } else if (Array.isArray(res.data?.data)) {
          coursesData = res.data.data;
        } else if (Array.isArray(res.data?.courses)) {
          coursesData = res.data.courses;
        } else if (res.data?.data && typeof res.data.data === 'object') {
          coursesData = Object.values(res.data.data);
        } else {
          coursesData = [];
        }
        
        console.log("✅ Processed courses data:", coursesData);
        
        // Log first course details for debugging
        if (coursesData.length > 0) {
          console.log("🔍 First course details:", coursesData[0]);
          console.log("🖼️ First course image URL:", getImageUrl(coursesData[0]));
        }
        
        setCourses(coursesData);
      } catch (err) {
        console.error("❌ Failed to fetch courses:", err);
        console.error("❌ Error details:", err.response?.data);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#192A41] text-yellow-400 text-xl">
        Loading Courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#192A41] py-10 px-4">
      <header className="text-center mb-12 mt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          Our <span className="text-yellow-400">Astrology Courses</span>
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Embark on a journey of cosmic discovery.
        </p>
      </header>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <CourseCard key={course.id || course._id || index} course={course} onClick={setSelectedCourse} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg">
          No courses available. Check the console for errors.
        </div>
      )}

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}