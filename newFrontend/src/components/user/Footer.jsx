import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <Link to="/">
              <img src="/LogoOnly.png" alt="Logo" className="w-24 h-24 mx-auto md:mx-0" />
            </Link>
            <p className="text-gray-400 mt-4">
              Your trusted platform for buying, selling, and renting properties.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-6 text-center md:text-left mb-6 md:mb-0">
            <div>
              <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
              <ul>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-[#08689A]">Home</Link>
                </li>
                <li>
                  <Link to="buy" className="text-gray-400 hover:text-[#08689A]">Buy</Link>
                </li>
                <li>
                  <Link to="rent" className="text-gray-400 hover:text-[#08689A]">Rent</Link>
                </li>
                <li>
                  <Link to="about" className="text-gray-400 hover:text-[#08689A]">About</Link>
                </li>
                <li>
                  <Link to="help" className="text-gray-400 hover:text-[#08689A]">Help</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Legal</h3>
              <ul>
                <li>
                  <Link to="/privacy-policy" className="text-gray-400 hover:text-[#08689A]">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-gray-400 hover:text-[#08689A]">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-gray-400 hover:text-[#08689A] text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-[#08689A] text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-400 hover:text-[#08689A] text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-400 hover:text-[#08689A] text-2xl" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
