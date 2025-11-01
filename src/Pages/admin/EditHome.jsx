import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Loader2,
  AlertCircle,
  Trash2,
  Search,
  Mail,
  Phone,
  MapPin,
  User,
  Download,
} from "lucide-react";

// ✅ Correct API URLs
const API_GET_URL = `${import.meta.env.VITE_API_URL}/enrollment-list`;
const API_DELETE_URL = `${import.meta.env.VITE_API_URL}/enrollment-delete`;

// ✅ Clean Image URL helper (fixes missing image issues)
const IMAGE_BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

// --- Helper to format date ---
const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "Invalid Date";
  }
};

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
};

export default function EnrollmentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch Enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(API_GET_URL);
        const data = Array.isArray(res.data) ? res.data : []; // ✅ ensures e.filter error won’t happen
        setEnrollments(data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
        if (err.message === "Network Error") {
          setError("Cannot connect to server. Please check backend.");
        } else if (err.response?.status === 404) {
          setError("API route not found (/enrollment-list).");
        } else {
          setError("Failed to load enrollment data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  // ✅ Delete Handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_DELETE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrollments((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete enrollment.");
    }
  };

  // ✅ Safe Filtering
  const filteredEnrollments = useMemo(() => {
    if (!Array.isArray(enrollments)) return [];
    return enrollments.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [enrollments, searchQuery]);

  // ✅ Download CSV
  const handleDownload = () => {
    if (!filteredEnrollments.length) {
      alert("No data to download.");
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone", "Address", "Enrolled On"];

    const sanitize = (val) => {
      let str = String(val || "");
      str = str.replace(/"/g, '""');
      if (str.search(/("|,|\n)/g) >= 0) str = `"${str}"`;
      return str;
    };

    const rows = filteredEnrollments.map((i) =>
      [
        sanitize(i.id),
        sanitize(i.name),
        sanitize(i.email),
        sanitize(i.number),
        sanitize(i.address),
        sanitize(formatDateTime(i.createdAt)),
      ].join(",")
    );

    const csv =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "enrollments.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Loading UI
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8 text-blue-600">
        <Loader2 className="w-16 h-16 animate-spin" />
        <span className="ml-4 text-2xl font-semibold text-slate-700">
          Loading Enrollments...
        </span>
      </div>
    );

  // ✅ Error UI
  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
        <div className="bg-red-100 border border-red-400 rounded-lg p-8 text-center text-red-700">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
          <h2 className="text-3xl font-bold text-red-800 mb-2">
            Error Loading Data
          </h2>
          <p>{error}</p>
        </div>
      </div>
    );

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 text-slate-900">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
            <Users size={40} className="text-blue-600" />
            Enrollments
          </h1>
          <p className="text-lg text-slate-600">
            View and manage all user enrollments from the hero section form.
          </p>
        </motion.div>

        {/* Search & Download */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="relative w-full max-w-lg">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={20} />
            </span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-12 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleDownload}
            className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 p-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            <Download size={18} />
            Download CSV
          </button>
        </motion.div>

        {/* Table */}
        <motion.div
          variants={itemVariants}
          className="shadow-lg rounded-lg border border-slate-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Phone",
                    "Address",
                    "Enrolled On",
                    "Actions",
                  ].map((t) => (
                    <th
                      key={t}
                      className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-slate-200">
                <AnimatePresence>
                  {filteredEnrollments.length ? (
                    filteredEnrollments.map((item) => (
                      <motion.tr
                        key={item.id}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User
                              size={16}
                              className="mr-2 text-blue-600 opacity-70"
                            />
                            <span className="text-sm font-medium text-slate-900">
                              {item.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Mail
                              size={16}
                              className="mr-2 text-blue-600 opacity-70"
                            />
                            <span className="text-sm text-slate-600">
                              {item.email}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Phone
                              size={16}
                              className="mr-2 text-blue-600 opacity-70"
                            />
                            <span className="text-sm text-slate-600">
                              {item.number}
                            </span>
                          </div>
                        </td>

                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 max-w-xs truncate"
                          title={item.address}
                        >
                          {item.address}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {formatDateTime(item.createdAt)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-100 transition-colors"
                            title="Delete Enrollment"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-10 text-slate-500"
                      >
                        {searchQuery
                          ? "No enrollments found matching your search."
                          : "No enrollments found."}
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
