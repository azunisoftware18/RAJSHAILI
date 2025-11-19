import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const headerRef = useRef(null);

  // Improved user state management
  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    };

    // Check initially
    checkUser();

    // Listen for storage changes
    const handleStorageChange = () => {
      checkUser();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Poll for changes (more reliable)
    const interval = setInterval(checkUser, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses =
    "relative text-white font-medium transition-colors hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[1.5px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-500 hover:after:w-full";

  return (
    <header
      ref={headerRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#192A41]/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img
              src="/hero-img/logo.png"
              alt="logo"
              className="h-10 sm:h-12"
              onError={(e) => {
                e.target.outerHTML = `<span class='text-white text-xl font-bold'>RAJSHAILI</span>`;
              }}
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClasses}>Home</Link>
            <Link to="/courses" className={linkClasses}>Courses</Link>
            <Link to="/about" className={linkClasses}>About</Link>
            <Link to="/contact" className={linkClasses}>Contact</Link>

            {/* ✅ SHOW LOGIN BUTTON WHEN USER IS NOT LOGGED IN */}
            {!user ? (
              <Link
                to="/login"
                className="bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-yellow-300 shadow-md transition-all"
              >
                Login / Register
              </Link>
            ) : user.role === "user" ? (
              <Link
                to="/profile"
                className="bg-yellow-400 text-gray-900 font-semibold py-2 px-5 rounded-full hover:bg-yellow-300 transition-all"
              >
                {user.name || "Profile"}
              </Link>
            ) : (
              <Link
                to="/admin"
                className="bg-red-500 text-white font-semibold py-2 px-5 rounded-full hover:bg-red-600 transition-all"
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#192A41]/95 backdrop-blur-md py-6 space-y-6 text-center">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-white text-lg block">Home</Link>
          <Link to="/courses" onClick={() => setIsOpen(false)} className="text-white text-lg block">Courses</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-white text-lg block">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-white text-lg block">Contact</Link>

          {/* ✅ SHOW LOGIN BUTTON IN MOBILE MENU WHEN USER IS NOT LOGGED IN */}
          {!user ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-yellow-400 text-gray-900 font-bold py-3 px-7 rounded-full block w-max mx-auto"
            >
              Login / Register
            </Link>
          ) : user.role === "user" ? (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="bg-yellow-400 text-gray-900 font-semibold py-3 px-7 rounded-full block w-max mx-auto"
            >
              {user.name || "Profile"}
            </Link>
          ) : (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white py-3 px-7 rounded-full block w-max mx-auto"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
}