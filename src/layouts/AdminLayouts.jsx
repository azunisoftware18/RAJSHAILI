import React from "react";
import AdminNavbar from "../components/admin/AdminNavbar";
import DashboardFooter from "../components/admin/AdminFooter";
import { Outlet } from "react-router-dom";
import SidebarNav from "../Pages/admin/SidebarNav";

export default function AdminLayouts() {
  return (
    <div>
      <div className=" md:flex md:w-full">
        <SidebarNav />

        <div className="md:w-full">
          <AdminNavbar />
          <div className="md:w-full">
            <Outlet />
            <DashboardFooter/>
          </div>
        </div>
      </div>
    </div>
  );
}
