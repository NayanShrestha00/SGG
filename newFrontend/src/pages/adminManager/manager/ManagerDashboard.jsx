// AdminDashboard.js
import React from "react";
import { ManagerHeader } from "../../../components";
import { Outlet } from "react-router-dom";

const ManagerDashboard = () => {
  return (
    <div className="w-screen flex ">
      {/* Sidebar */}
      <ManagerHeader />

      {/* Main Content: Add margin-left to avoid overlap */}
      <main className="w-4/5 pt-4 bg-[#f3f4f6] ml-[20%]">
        <Outlet />
      </main>
    </div>
  );
};


export default ManagerDashboard;