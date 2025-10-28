import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Link tags ko 'a' tags se replace kar diya gaya hai
import { Menu, X, Settings, Bell, User } from "lucide-react"; // Unused icons hata diye gaye hain

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // User state ko localStorage se initialize kiya
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  });
  
  const headerRef = useRef(null); // Mobile menu ko bahar click karke band karne ke liye

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Page load par check karne ke liye
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Login/logout changes ko sunne ke liye
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Mobile menu ko bahar click karke band karne ke liye
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // handleLogout function abhi bhi maujood hai, lekin buttons hata diye gaye hain
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage")); // Navbar update trigger
    window.location.href = "/login"; // Logout ke baad seedha login page par bhej rahe hain
  };

  // Link styles (Dark theme ke liye)
  const linkClasses =
    "relative text-white font-medium transition-colors hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[1.5px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-500 hover:after:w-full";

  // Jab page top par hai (Dark theme)
  const topLinkClasses =
    "relative text-white font-medium transition-colors hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[1.5px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-500 hover:after:w-full";

  return (
    <header
      ref={headerRef} // Ref add kiya
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#192A41]/90 backdrop-blur-md shadow-lg" // Dark theme jab scroll ho
          : "bg-transparent" // Transparent jab top par ho
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo - 'a' tag ka istemal kiya */}
          <a href="/" onClick={closeMenu}>
            <img
              src="/hero-img/logo.png" // Path aapke screenshot ke hisab se (red logo)
              alt="Logo"
              className="h-10 sm:h-12 w-auto" // Thoda bada logo
              // Fallback text ab hamesha white rahega
              onError={(e) => { e.target.onerror = null; e.target.outerHTML = `<span class="text-2xl font-bold text-white">RAJSHAILI</span>`}} 
            />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* 'a' tags ka istemal */}
            <a href="/" className={isScrolled ? linkClasses : topLinkClasses}>
              Home
            </a>
            <a href="/courses" className={isScrolled ? linkClasses : topLinkClasses}>
              Courses
            </a>
            <a href="/about" className={isScrolled ? linkClasses : topLinkClasses}>
              About
            </a>
            <a href="/contact" className={isScrolled ? linkClasses : topLinkClasses}>
              Contact
            </a>

            {user ? (
              <>
                {user.role === "user" && (
                  <>
                    {/* User Profile Button (Dark theme style) */}
                    <a
                      href="/profile"
                      className="bg-yellow-400 text-gray-900 font-semibold py-2 px-5 rounded-full hover:bg-yellow-300 transition-all duration-300 text-sm"
                    >
                      {user.name || "Profile"}
                    </a>
                    {/* LOGOUT BUTTON HATA DIYA GAYA */}
                  </>
                )}

                {user.role === "admin" && (
                  <>
                    {/* Admin Dashboard Button (Redesigned) */}
                    <a
                      href="/admin"
                      className="bg-red-500 text-white font-semibold py-2 px-5 rounded-full hover:bg-red-600 transition-all duration-300 text-sm"
                    >
                      Admin Dashboard
                    </a>
                    {/* LOGOUT BUTTON HATA DIYA GAYA */}
                  </>
                )}
              </>
            ) : (
              // Login Button (Dark theme style)
              <a
                href="/login"
                className="bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-yellow-300 shadow-yellow-300/50 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
              >
                Login / Register
              </a>
            )}
          </nav>

          {/* Mobile Toggle - Text color hamesha white */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`focus:outline-none text-white`} 
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Dark theme */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#192A41]/95 backdrop-blur-md shadow-lg transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center space-y-6 py-8">
          <a href="/" className="text-white text-lg hover:text-yellow-400" onClick={closeMenu}>
            Home
          </a>
          <a href="/courses" className="text-white text-lg hover:text-yellow-400" onClick={closeMenu}>
            Courses
          </a>
          <a href="/about" className="text-white text-lg hover:text-yellow-400" onClick={closeMenu}>
            About
          </a>
          <a href="/contact" className="text-white text-lg hover:text-yellow-400" onClick={closeMenu}>
            Contact
          </a>

          {user ? (
            <>
              {user.role === "user" && (
                <>
                  <a
                    href="/profile"
                    onClick={closeMenu}
                    className="bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded-full hover:bg-yellow-300 transition-all duration-300"
                  >
                    {user.name || "Profile"}
                  </a>
                  {/* LOGOUT BUTTON HATA DIYA GAYA */}
                </>
              )}
              {user.role === "admin" && (
                <>
                  <a
                    href="/admin"
                    onClick={closeMenu}
                    className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 transition-all duration-300"
                  >
                    Admin Dashboard
                  </a>
                  {/* LOGOUT BUTTON HATA DIYA GAYA */}
                </>
              )}
            </>
          ) : (
            <a
              href="/login"
              onClick={closeMenu}
              className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-all duration-300 mt-4"
            >
              Login / Register
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

