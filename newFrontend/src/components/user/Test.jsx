import { useState, useEffect, useRef } from "react";
import { TbUserPlus } from "react-icons/tb";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice/index";
import axios from "axios";
import { UserSummaryApi } from "../../features/common/UserSummaryApi";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.accessToken);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bgColor, setBgColor] = useState("bg-[#f7f7f7]");
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // To detect route changes

  useEffect(() => {
    // Handle background color based on the current route and scroll position
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.5; // 50% of viewport height
      if (location.pathname === "/" && window.scrollY > scrollThreshold) {
        setBgColor("bg-[#f7f7f7]");
      } else if (location.pathname !== "/") {
        setBgColor("bg-[#f7f7f7]");
      } else {
        setBgColor("bg-transparent");
      }
    };
    handleScroll(); // Run it initially to set the correct state
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); // Only run this effect when the route changes

  // Function to handle clicking outside of the profile dropdown
  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setIsDropdownOpen(false); // Close dropdown if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside); // Clean up event listener
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    try {
      await axios.post( UserSummaryApi.Logout.url, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className={`fixed top-0 left-0 h-16 w-full z-50 ${bgColor} shadow-md transition-all`}>
      <div className="h-full container mx-auto flex items-center px-6 justify-between">
        <div className="flex items-center gap-6">
          <Link to="/">
            <img src="/LogoOnly.png" alt="Logo" className="w-24 h-24" />
          </Link>
          <nav className="hidden md:flex gap-6 text-lg font-semibold">
            {[{ to: "", label: "Home" }, { to: "buy", label: "Buy" }, { to: "rent", label: "Rent" }, { to: "converter", label: "Converter" }, { to: "about", label: "About" }].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "text-[#08689A]" : "text-gray-700 hover:text-[#08689A]"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-6 text-lg font-semibold text-gray-700">
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <div
                className="cursor-pointer h-10 w-10 bg-gray-500 text-white rounded-full flex items-center justify-center"
                onClick={toggleDropdown}
              >
                {user?.data?.fullName?.charAt(0)?.toUpperCase()}
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Account Settings
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">LogIn</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-2xl">
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#f7f7f7] w-full px-6 py-4">
          <nav className="flex flex-col gap-4 text-lg font-semibold">
            {[{ to: "", label: "Home" }, { to: "buy", label: "Buy" }, { to: "rent", label: "Rent" }, { to: "converter", label: "Converter" }, { to: "about", label: "About" }].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "text-[#08689A]" : "text-gray-700 hover:text-[#08689A]"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-[#08689A]" onClick={() => setIsMobileMenuOpen(false)}>
                  Account Settings
                </Link>
                <button className="text-gray-700 hover:text-[#08689A]" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  LogIn
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
