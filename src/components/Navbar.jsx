import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // user state initialize from localStorage
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  });

  const headerRef = useRef(null);

  // ✅ Scroll shadow effect
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

  // ✅ Listen for login/logout (auto update without refresh)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    // Patch setItem & removeItem for same-tab updates
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;

    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      window.dispatchEvent(new Event("storage"));
    };

    localStorage.removeItem = function (key) {
      originalRemoveItem.apply(this, arguments);
      window.dispatchEvent(new Event("storage"));
    };

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);

  // ✅ Close mobile menu on outside click
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

  // Link styles
  const linkClasses =
    "relative text-white font-medium transition-colors hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[1.5px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-500 hover:after:w-full";

  const topLinkClasses =
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" onClick={closeMenu}>
            <img
              src="/hero-img/logo.png"
              alt="Logo"
              className="h-10 sm:h-12 w-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.outerHTML = `<span class='text-2xl font-bold text-white'>RAJSHAILI</span>`;
              }}
            />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className={isScrolled ? linkClasses : topLinkClasses}>
              Home
            </a>
            <a
              href="/courses"
              className={isScrolled ? linkClasses : topLinkClasses}
            >
              Courses
            </a>
            <a
              href="/about"
              className={isScrolled ? linkClasses : topLinkClasses}
            >
              About
            </a>
            <a
              href="/contact"
              className={isScrolled ? linkClasses : topLinkClasses}
            >
              Contact
            </a>

            {/* ✅ Show user or login */}
            {user ? (
              <>
                {user.role === "user" && (
                  <a
                    href="/profile"
                    className="bg-yellow-400 text-gray-900 font-semibold py-2 px-5 rounded-full hover:bg-yellow-300 transition-all duration-300 text-sm"
                  >
                    {user.name || "Profile"}
                  </a>
                )}
                {user.role === "admin" && (
                  <a
                    href="/admin"
                    className="bg-red-500 text-white font-semibold py-2 px-5 rounded-full hover:bg-red-600 transition-all duration-300 text-sm"
                  >
                    Admin Dashboard
                  </a>
                )}
              </>
            ) : (
              <a
                href="/login"
                className="bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-yellow-300 shadow-yellow-300/50 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
              >
                Login / Register
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#192A41]/95 backdrop-blur-md shadow-lg transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center space-y-6 py-8">
          <a
            href="/"
            onClick={closeMenu}
            className="text-white text-lg hover:text-yellow-400"
          >
            Home
          </a>
          <a
            href="/courses"
            onClick={closeMenu}
            className="text-white text-lg hover:text-yellow-400"
          >
            Courses
          </a>
          <a
            href="/about"
            onClick={closeMenu}
            className="text-white text-lg hover:text-yellow-400"
          >
            About
          </a>
          <a
            href="/contact"
            onClick={closeMenu}
            className="text-white text-lg hover:text-yellow-400"
          >
            Contact
          </a>

          {/* ✅ Mobile user check */}
          {user ? (
            <>
              {user.role === "user" && (
                <a
                  href="/profile"
                  onClick={closeMenu}
                  className="bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded-full hover:bg-yellow-300 transition-all duration-300"
                >
                  {user.name || "Profile"}
                </a>
              )}
              {user.role === "admin" && (
                <a
                  href="/admin"
                  onClick={closeMenu}
                  className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 transition-all duration-300"
                >
                  Admin Dashboard
                </a>
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
