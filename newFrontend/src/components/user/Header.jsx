import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaHome,
  FaShoppingCart,
  FaExchangeAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { UserSummaryApi } from "../../features/common/UserSummaryApi";
import { logout } from "../../store/authSlice/index";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bottomRef = useRef(null);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (bottomRef.current) {
        const rect = bottomRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;

        if (scrollY > lastScrollY && rect.top <= 0) {
          setIsSticky(true);
        } else if (scrollY === 0) {
          setIsSticky(false);
        }

        setLastScrollY(scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(UserSummaryApi.Logout.url, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="absolute md:top-10 top-5 w-full flex justify-center px-2 z-40">
      <div className="relative flex flex-col w-[98%] px-2 bg-transparent group">
        {/* Top Section - Visible when at the top, hidden when scrolled */}
        <div className={`flex sm:justify-between justify-end items-center bg-[#1d2228] px-6 py-2 rounded-t-lg transition-all duration-300 ${isSticky ? "hidden" : "block"}`}>
          <div className="sm:flex w-[60%] space-x-8 p-2 hidden">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-gray-400 hover:text-[#08689A]" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-[#08689A]" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-400 hover:text-[#08689A]" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-400 hover:text-[#08689A]" />
            </a>
          </div>
          {isAuthenticated ? (
            <div
              className="cursor-pointer h-8 w-8 md:mr-3 bg-gray-400 hover:bg-[#08689A] text-white rounded-full md:flex items-center justify-center relative z-20 hidden"
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              {user?.data?.fullName?.charAt(0)?.toUpperCase()}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 top-9 w-48 bg-[#1d2228] rounded-lg shadow-lg overflow-hidden">
                  {/* User Details */}
                  <div className="px-4 py-3">
                    <p className="block font-bold text-white">{user?.data?.fullName}</p>
                  </div>
                  {/* Menu Links */}
                  <Link to="/profile" className="flex items-center px-4 py-3 text-white hover:bg-white hover:text-black transition-colors duration-200">
                    <FaUserCircle className="mr-2" /> Account
                  </Link>
              
                  <Link to="/help" className="flex items-center px-4 py-3 text-white hover:bg-white hover:text-black transition-colors duration-200">
                    <FaQuestionCircle className="mr-2" /> Help
                  </Link>
                  {/* Divider */}
                  <div className="border-t border-gray-200"></div>
                  {/* Logout */}
                  <button
                    className="flex items-center w-full text-left px-4 py-3 text-white hover:bg-white hover:text-black transition-colors duration-200"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-end md:pr-3 space-x-5 text-white sm:text-[16px] text-[12px]">
              <Link to="/login">LogIn</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>

        {/* Bottom Section - Sticks when scrolling down, returns to normal when scrolling up */}
        <div
          ref={bottomRef}
          className={`flex justify-between items-center px-6 py-1 rounded-b-lg bg-white transition-all duration-300 ${isSticky ? "fixed top-0 left-0 w-full shadow-lg" : "relative"
            }`}
        >
          <div className="flex items-center space-x-5">
            {/* Logo part */}
            <Link to="/" className="h-14 w-14 sm:h-20 sm:w-20">
              <img className="cover" src="/LogoOnly.png" alt="Shulav Ghar Gharadi Logo" />
            </Link>
            {/* Navigation part */}
            <nav className="hidden md:flex md:items-center">
              <ul className="flex space-x-8 text-[16px] font-semibold">
                {[{ to: "new", label: "Home" }, { to: "buy", label: "Buy" }, { to: "converter", label: "Converter" }, { to: "about", label: "About" }].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? "text-[#519fff]" : "text-gray-700 hover:text-[#08689A]"
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </ul>
            </nav>
          </div>
          {/* Sell Property Button - Visible on larger screens */}
          <div className="hidden md:block pr-2">
            <Link to="/sellerform">
              <button className="flex items-center text-left px-4 py-2 rounded-lg bg-[#478adc] text-[16px] text-white font-semibold space-x-2">
                SELL PROPERTY
                <RiAddLine className="h-6 w-6" />
              </button>
            </Link>
          </div>
          {/* Burger Menu Icon */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            <FaBars className="h-6 w-6" />
            {/* {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />} */}
          </div>
        </div>
      </div>

      {/* Burger Menu - Slides in from the left */}
      <div
        className={`fixed top-0 left-0 h-[100vh] w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="font-bold text-xl text-gray-800">Menu</h2>
          <FaTimes
            className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-200"
            onClick={toggleMenu}
          />
        </div>
        <div className="px-6 py-4">
          <h3 className="font-semibold text-gray-600 uppercase text-xs tracking-wider mb-4">PAGES</h3>
          <ul className="space-y-3">
            {[
              { to: "/", label: "Home", icon: <FaHome className="w-5 h-5" /> },
              { to: "/buy", label: "Buy", icon: <FaShoppingCart className="w-5 h-5" /> },
              { to: "/converter", label: "converter", icon: <FaExchangeAlt className="w-5 h-5" /> },
              { to: "/about", label: "About", icon: <FaInfoCircle className="w-5 h-5" /> },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Account Settings and Logout in Mobile Menu */}
        {isAuthenticated && (
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-600 uppercase text-xs tracking-wider mb-4">ACCOUNT</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200"
                >
                  <FaUserCircle className="w-5 h-5" />
                  <span>Account Settings</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center w-full space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-600 uppercase text-xs tracking-wider mb-4">GET SOCIAL</h3>
          <ul className="space-y-3">
            {[
              { href: "https://facebook.com", label: "Facebook", icon: <FaFacebook className="w-5 h-5" /> },
              { href: "https://linkedin.com", label: "LinkedIn", icon: <FaLinkedin className="w-5 h-5" /> },
              { href: "https://twitter.com", label: "Twitter", icon: <FaTwitter className="w-5 h-5" /> },
              { href: "https://instagram.com", label: "Instagram", icon: <FaInstagram className="w-5 h-5" /> },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;