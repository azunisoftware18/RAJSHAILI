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
  User,
  Download,
} from "lucide-react";

const API_GET_URL = `${import.meta.env.VITE_API_URL}/enrollment-list`;
const API_DELETE_URL = `${import.meta.env.VITE_API_URL}/enrollment-delete`; // ✅ FIXED

// 🕒 Format date function
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

// ✨ Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const rowVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
};

// 🧾 MAIN COMPONENT
export default function EnrollmentDashboard() {
  const [enrollments, setEnrollments] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- FETCH ENROLLMENTS ---
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_GET_URL);
        console.log("📦 Enrollment API Response:", res.data);

        // ✅ FIX: ensure data is always an array
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];

        setEnrollments(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError(
          err.message === "Network Error"
            ? "Cannot connect to server."
            : "Failed to load enrollment data."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  // --- DELETE HANDLER ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?"))
      return;

    try {
      await axios.delete(`${API_DELETE_URL}/${id}`);
      setEnrollments((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete enrollment.");
    }
  };

  // --- SEARCH FILTER ---
  const filteredEnrollments = useMemo(() => {
    if (!Array.isArray(enrollments)) return [];
    return enrollments.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [enrollments, searchQuery]);

  // --- DOWNLOAD CSV ---
  const handleDownload = () => {
    if (!filteredEnrollments.length) {
      alert("No data to download.");
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone", "Address", "Enrolled On"];
    const sanitize = (val) => `"${String(val || "").replace(/"/g, '""')}"`;

    const csvRows = filteredEnrollments.map((item) =>
      [
        sanitize(item.id),
        sanitize(item.name),
        sanitize(item.email),
        sanitize(item.number),
        sanitize(item.address),
        sanitize(formatDateTime(item.createdAt)),
      ].join(",")
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...csvRows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "enrollments.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- LOADING STATE ---
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-blue-600">
        <Loader2 className="w-16 h-16 animate-spin" />
        <span className="ml-4 text-2xl font-semibold">Loading...</span>
      </div>
    );

  // --- ERROR STATE ---
  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="bg-red-100 border border-red-400 p-8 rounded-lg text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
          <h2 className="text-3xl font-bold mb-2 text-red-700">Error</h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );

  // --- MAIN UI ---
  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
            <Users size={40} className="text-blue-600" />
            Enrollments
          </h1>
          <p className="text-lg text-slate-600">
            View and manage all user enrollments.
          </p>
        </motion.div>

        {/* Search + Download */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="relative w-full max-w-lg">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-12 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleDownload}
            className="w-full sm:w-auto flex items-center justify-center gap-2 p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
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
                  ].map((title) => (
                    <th
                      key={title}
                      className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <AnimatePresence>
                  {filteredEnrollments.length > 0 ? (
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
                            <span className="text-sm font-medium">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          <div className="flex items-center">
                            <Mail
                              size={16}
                              className="mr-2 text-blue-600 opacity-70"
                            />
                            {item.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          <div className="flex items-center">
                            <Phone
                              size={16}
                              className="mr-2 text-blue-600 opacity-70"
                            />
                            {item.number}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-xs">
                          {item.address}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {formatDateTime(item.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-100"
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
                          ? "No enrollments found."
                          : "No enrollments yet."}
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
