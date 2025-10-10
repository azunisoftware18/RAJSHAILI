import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      // agar login nahi hua hai to redirect to login
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null; // jab tak data load ho raha hai

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-yellow-400"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {user.name || "User"}
        </h2>
        <p className="text-gray-600 mb-1">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-600 mb-6">
          <strong>Phone:</strong> {user.phoneNumber || "Not Provided"}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
