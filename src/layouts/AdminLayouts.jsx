import React from "react";
import AdminNavbar from "../components/admin/AdminNavbar";
import DashboardFooter from "../components/admin/AdminFooter";
import { Outlet } from "react-router-dom";
import SidebarNav from "../Pages/admin/SidebarNav";

export default function AdminLayouts() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
}
