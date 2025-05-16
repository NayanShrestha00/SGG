// AdminDashboard.js
import React from "react";
import { AdminHeader } from "../../../components";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="w-screen flex ">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content: Add margin-left to avoid overlap */}
      <main className="w-4/5 pt-4 bg-[#f3f4f6] ml-[20%]">
        <Outlet />
      </main>
    </div>
  );
};


export default AdminDashboard;