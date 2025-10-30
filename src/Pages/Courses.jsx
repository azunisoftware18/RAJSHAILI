import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, X } from "lucide-react";

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
            src="/images/payment-qr.png" // 🔹 apna QR image yahan daalo
            alt="Payment QR"
            className="w-56 h-56 rounded-xl border border-yellow-400 shadow-lg"
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
                src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${course.imageUrl}`}
                alt={course.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Details */}
            <div className="p-6 md:p-10 text-white">
              <h1 className="text-4xl font-extrabold text-yellow-400 mb-2">{course.name}</h1>
              <p className="text-gray-400 text-lg mb-4">Instructor: {course.instructor || "N/A"}</p>

              <div className="flex items-center mb-6">
                <span className="font-bold text-2xl text-yellow-400">{course.rating || "4.5"}</span>
                <Star className="w-6 h-6 text-yellow-400 ml-2" fill="currentColor" />
                <span className="text-gray-500 text-md ml-3">{course.reviews || "(0) Students"}</span>
              </div>

              <div className="mb-8 p-4 bg-blue-800/30 rounded-lg">
                <span className="font-extrabold text-4xl text-white mr-4">{course.price ? `₹${course.price}` : "₹0"}</span>
                <span className="line-through text-gray-400 text-xl">{course.originalPrice || ""}</span>
              </div>

              <p className="text-gray-300 mb-6">{course.description}</p>

              <h2 className="text-xl font-bold text-white mb-3">What You'll Learn:</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-300 mb-8 ml-4">
                {course.keyFeatures?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <button
                onClick={() => setIsPaymentOpen(true)}
                className="w-full bg-yellow-400 text-gray-900 font-bold py-3 text-xl rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-xl"
              >
                Enroll Now - {course.price ? `₹${course.price}` : "₹0"}
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
const CourseCard = ({ course, onClick }) => (
  <div
    className="bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl overflow-hidden border border-blue-800/50 shadow-lg group hover:shadow-yellow-500/10 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
    onClick={() => onClick(course)}
  >
    <div className="overflow-hidden relative">
      <img
        src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${course.imageUrl}`}
        alt={course.name}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
    <div className="p-5">
      {course.isBestseller && (
        <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
          Bestseller
        </span>
      )}
      <h2 className="text-xl font-bold text-white mb-1 truncate">{course.name}</h2>
      <p className="text-gray-400 text-sm mb-3">{course.instructor || "N/A"}</p>
      <div className="flex items-center mb-3">
        <span className="font-bold text-yellow-400">{course.rating || "4.5"}</span>
        <Star className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" />
        <span className="text-gray-500 text-sm ml-2">{course.reviews || "(0)"}</span>
      </div>
      <div className="mb-4">
        <span className="font-extrabold text-2xl text-white">
          {course.price ? `₹${course.price}` : "₹0"}
        </span>{" "}
        <span className="line-through text-gray-500">{course.originalPrice || ""}</span>
      </div>
      <p className="text-yellow-400 text-sm font-semibold hover:text-yellow-300">
        View Details...
      </p>
    </div>
  </div>
);

// ================= Main Courses Page =================
export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
        // ✅ check if data is array
        const data = Array.isArray(res.data) ? res.data : res.data.courses || [];
        setCourses(data);
      } catch (err) {
        console.error("❌ Failed to fetch courses:", err);
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
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} onClick={setSelectedCourse} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg">No courses available.</div>
      )}

      <CourseDetailModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}
