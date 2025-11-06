import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, Trash2, Video } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
const GET_URL = `${API_URL}/home-list`;
const DELETE_URL = `${API_URL}/home-delete`;

// Image base URL cleaner
const IMAGE_BASE_URL = API_URL.replace("/api", "");

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HomeDashboard() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await axios.get(GET_URL);
        setHomes(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load home data. Please check the API.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomes();
  }, []);

  // Delete Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${DELETE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHomes((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete item.");
    }
  };

  // Loading State
  if (loading)
    return (
      <div className="flex min-h-screen justify-center items-center bg-slate-50 text-blue-600">
        <Loader2 className="w-10 h-10 animate-spin mr-3" />
        <p className="text-xl font-semibold">Loading Home Data...</p>
      </div>
    );

  // Error State
  if (error)
    return (
      <div className="flex min-h-screen justify-center items-center bg-slate-50">
        <div className="text-center bg-red-100 p-6 rounded-xl shadow-md">
          <AlertCircle className="mx-auto mb-3 text-red-600 w-10 h-10" />
          <h2 className="text-2xl font-bold text-red-700 mb-2">
            Error Loading Data
          </h2>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-extrabold mb-8 text-slate-900"
        >
          🏠 Home Dashboard
        </motion.h1>

        <AnimatePresence>
          {homes.length ? (
            <motion.div
              variants={itemVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {homes.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300"
                >
                  {/* Images */}
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {[item.card1Image, item.card2Image, item.card3Image, item.card4Image].map(
                      (img, i) => (
                        <img
                          key={i}
                          src={`${IMAGE_BASE_URL}/${img}`}
                          alt={`Card ${i + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-slate-100"
                          onError={(e) => (e.target.src = "/no-image.png")}
                        />
                      )
                    )}
                  </div>

                  {/* Video */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="text-blue-600" size={20} />
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        className="text-blue-500 underline truncate"
                      >
                        {item.videoUrl}
                      </a>
                    </div>
                    <p className="text-sm text-slate-500">
                      Created:{" "}
                      {new Date(item.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <div className="flex justify-end border-t border-slate-100 p-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-slate-500 mt-20 text-lg">
              No Home data found.
            </p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
