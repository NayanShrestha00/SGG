import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import App from "../../App";
import PersistLogin from "../api/PLogin";
import {
  // For User
  Login, Home, Profile, EnquaryForm, SellerForm, Register, ForgotPassword, Editprofile, Buy, Rent, Converter, About, PostDetails, Test, Post, Help,
  // For Admin
  AdminDashboard, AdminManagerLogin, AdminHome, CreateManager, Managers, Users, Posts, AdminAccountSetting,
  // For Manager
  ManagerDashboard, ManagerHome, CreatePost, TotalPost, EnquaryForms, BuyerForms, SellerForms, ManagerAccountSetting,
  // Admin/Manager
  AdminManagerForgotPassword,
  // Extra
  Unauthorized,
} from "../../pages";
import CheckAuth from "../common/CheckAuth";
import New from "../../pages/user/New";

// Router Configuration
const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/" element={<App />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="forgot-password" element={<AdminManagerForgotPassword />} />




        {/* Protected Routes for Users */}
        <Route element={<PersistLogin />}>
          <Route
            element={
              <CheckAuth>
                <Outlet />
              </CheckAuth>
            }
          >
            <Route path="/" element={<Home />} />

            <Route path="about" element={<About />} />
            <Route path="post/:category" element={<Post />} />
            <Route path="test/:postId" element={<Test />} />
            <Route path="new" element={<New />} />
            <Route path="help" element={<Help />} />
            <Route path="profile" element={<Profile />} />
            <Route path="editprofile" element={<Editprofile />} />
            <Route path="enquaryform" element={<EnquaryForm />} />
            <Route path="sellerform" element={<SellerForm />} />
            <Route path="buy" element={<Buy />} />
            <Route path="rent" element={<Rent />} />
            <Route path="converter" element={<Converter />} />
            <Route path="/postdetails/:postId" element={<PostDetails />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <CheckAuth requiredRole="Admin">
              <Outlet />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AdminManagerLogin />} />
        </Route>

        {/* Manager Routes */}
        <Route
          path="manager"
          element={
            <CheckAuth requiredRole="Manager">
              <Outlet />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AdminManagerLogin />} />
        </Route>

        {/* Extra Routes */}
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Admin Routes */}
      <Route path="" element={<AdminDashboard />}>
      <Route element={<PersistLogin />}>
        <Route
          path="admin"
          element={
            <CheckAuth requiredRole="Admin">
              <Outlet />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={< AdminHome />} />
          <Route path="createmanager" element={< CreateManager />} />
          <Route path="managerlist" element={< Managers />} />
          <Route path="userlist" element={< Users />} />
          <Route path="allposts" element={< Posts />} />
          <Route path="settings" element={< AdminAccountSetting />} />
        </Route>
        </Route>
      </Route>
      {/* Manager Routes */}
      <Route path="" element={<ManagerDashboard />}>
      <Route element={<PersistLogin />}>
        <Route
          path="manager"
          element={
            <CheckAuth requiredRole="Manager">
              <Outlet />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={< ManagerHome />} />
          <Route path="createpost" element={< CreatePost />} />
          <Route path="totalpost" element={< TotalPost />} />
          <Route path="enquaryforms" element={< EnquaryForms />} />
          <Route path="sellerforms" element={< SellerForms />} />
          <Route path="buyerforms" element={< BuyerForms />} />
          <Route path="accountsetting" element={< ManagerAccountSetting />} />
        </Route>
        </Route>
      </Route>
    </>
  )
);

export default router;
