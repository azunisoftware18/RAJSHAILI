import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const BlockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

const UnblockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.VITE_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm(`Are you sure you want to delete this user?`)) return;
    try {
      await axios.delete(`${import.meta.VITE_API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete user");
    }
  };

  const handleToggleBlock = async (user) => {
  try {
    const endpoint = user.isBlocked
      ? `${import.meta.VITE_API_URL}/admin/unblock/${user.id}`
      : `${import.meta.VITE_API_URL}/admin/block/${user.id}`;

    await axios.post(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  } catch (error) {
    console.error("Block/Unblock error:", error);
    alert("Failed to update user status");
  }
};


  const formatDateTime = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  };

  // ✅ FIXED: Proper User Status Logic
  const getUserDisplayStatus = (user) => {
    if (user.isBlocked) return "Blocked";
    if (user.isLoggedIn === true) return "Active";
    if (user.isLoggedIn === false) return "Inactive";
    return "Inactive"; // ✅ Default fallback added
  };

  // ✅ Filter logic includes Inactive also
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const userStatus = getUserDisplayStatus(user);

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && userStatus === "Active") ||
      (statusFilter === "Blocked" && userStatus === "Blocked") ||
      (statusFilter === "Inactive" && userStatus === "Inactive");

    return matchesSearch && matchesStatus;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg animate-pulse">
        Fetching user data...
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6 sm:p-8 lg:p-10 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">👥 User Management Dashboard</h1>
          <p className="text-gray-500 text-sm">Monitor, manage, and update users in real-time.</p>
        </header>

        <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        {/* TABLE VIEW */}
        <div className="hidden md:block bg-white/90 shadow-lg backdrop-blur-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredUsers.map((user) => {
                const userStatus = getUserDisplayStatus(user);
                return (
                  <tr
                    key={user.id}
                    className={`transition-all duration-300 hover:bg-blue-50/50 ${
                      user.isBlocked ? "bg-gray-50 opacity-70" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>{user.email}</div>
                      <div>{user.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDateTime(user.createdAt)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full transition-all duration-300 ${
                          userStatus === "Blocked"
                            ? "bg-red-100 text-red-800"
                            : userStatus === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {userStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => handleToggleBlock(user)}
                          className={`flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            user.isBlocked
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                          }`}
                        >
                          {user.isBlocked ? <UnblockIcon /> : <BlockIcon />}
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-200"
                        >
                          <DeleteIcon /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
