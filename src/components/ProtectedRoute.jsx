import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Agar login nahi hua
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Agar admin route hai aur user admin nahi hai
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
