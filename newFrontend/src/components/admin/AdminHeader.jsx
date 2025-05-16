import React from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { AdminManagerSummaryApi } from "../../features/common/AdminManagerSummaryApi";
import axios from "axios";
import { handleError } from "../../utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";



const AdminHeader = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(AdminManagerSummaryApi.AdminLogout.url, {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data.message);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      
      console.log(error);
      
    }
  };

  return (
    <aside className="bg-[#1c252e] w-[20%] p-6 flex flex-col h-screen fixed z-50 text-[#707a7f]">
      {/* Logo & Branding */}
      <div className="flex flex-col items-center space-y-3 mb-8">
        <img
          src="/LogoOnly.png"
          alt="Shulab Ghar Ghadari Logo"
          className="h-24 w-24 rounded-full"
        />
        <h1 className="text-xl font-semibold text-center text-white">
          Shulab Ghar Ghadari
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 flex-grow">
        {[
          { path: "/admin/dashboard", label: "Home" },
          { path: "/admin/allposts", label: "Posts" },
          { path: "/admin/createmanager", label: "Create Manager" },
          { path: "/admin/managerlist", label: "Managers" },
          { path: "/admin/userlist", label: "Customers" },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "block py-2 px-4 rounded-lg font-medium transition-colors duration-300",
                isActive
                  ? "bg-[#29323a] text-white font-semibold"
                  : "hover:text-[#eef2f7]"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto pt-4 space-y-2">
        <Link
          to="/admin/settings"
          className="block py-2 px-4 text-center bg-[#000000] rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Account Settings
        </Link>
        <button
         className="block py-2 px-4 text-center w-full bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition"
         onClick={handleLogout}
        >
          Logout
        </button>
        
      </div>
    </aside>
  );
};

export default AdminHeader;
