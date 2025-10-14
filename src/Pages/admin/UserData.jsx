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

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm(`Are you sure you want to delete user with ID: ${userId}?`)) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleToggleBlock = (userId) => {
    setUsers(users.map((user) =>
      user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
    ));
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading users...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 mt-1">
            A list of all the users in your account including their name, email, phone, and timestamps.
          </p>
        </header>

        {/* --- Desktop Table --- */}
        <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className={user.isBlocked ? "bg-gray-50 opacity-60" : ""}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>{user.email}</div>
                      <div>{user.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDateTime(user.createDAt)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isBlocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium">
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={() => handleToggleBlock(user.id)}
                          className={`flex items-center ${
                            user.isBlocked ? "text-green-600 hover:text-green-900" : "text-yellow-600 hover:text-yellow-900"
                          }`}
                        >
                          {user.isBlocked ? <UnblockIcon /> : <BlockIcon />}
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="flex items-center text-red-600 hover:text-red-900">
                          <DeleteIcon /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Mobile Cards --- */}
        <div className="block md:hidden space-y-4 mt-6">
          {users.map((user) => (
            <div key={user.id} className={`bg-white shadow-md rounded-lg p-4 ${user.isBlocked ? "opacity-60" : ""}`}>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.phoneNumber}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created: {formatDateTime(user.createDAt)}
                    </p>
                  </div>
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      user.isBlocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>

                <div className="flex justify-end space-x-4 pt-2 border-t border-gray-200 mt-2">
                  <button
                    onClick={() => handleToggleBlock(user.id)}
                    className={`flex items-center text-sm ${
                      user.isBlocked ? "text-green-600 hover:text-green-900" : "text-yellow-600 hover:text-yellow-900"
                    }`}
                  >
                    {user.isBlocked ? <UnblockIcon /> : <BlockIcon />}
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="flex items-center text-red-600 text-sm">
                    <DeleteIcon /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTable;