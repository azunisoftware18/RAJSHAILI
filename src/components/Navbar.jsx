import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Scroll background change effect
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setIsScrolled(window.scrollY > 10));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Detect user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Menu toggle & close
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // ✅ Logout handler
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
  };

  // ✅ Common link hover style
  const linkClasses =
    "relative text-white font-medium transition-colors hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[1.5px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-500 hover:after:w-full";

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled ? "bg-[#192A41]/90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* ✅ Logo */}
          <Link to="/" onClick={closeMenu}>
            <img
              src="/hero-img/logo.png"
              alt="Rajshaili Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* ✅ Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClasses}>
              Home
            </Link>
            <Link to="/courses" className={linkClasses}>
              Courses
            </Link>
            <Link to="/about" className={linkClasses}>
              About
            </Link>
            <Link to="/contact" className={linkClasses}>
              Contact
            </Link>

            {user ? (
              <>
                {user.role === "user" && (
                  <Link
                    to="/profile"
                    className="bg-yellow-400 text-gray-900 font-semibold py-2 px-5 rounded-full hover:bg-yellow-300 transition-all duration-300"
                  >
                    {user.name || "Profile"}
                  </Link>
                )}

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="bg-red-500 text-white font-semibold py-2 px-5 rounded-full hover:bg-red-600 transition-all duration-300"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-white border border-yellow-400 py-2 px-5 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-yellow-300 shadow-yellow-300/50 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Login / Register
              </Link>
            )}
          </nav>

          {/* ✅ Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#192A41]/95 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center space-y-6 py-8">
          <Link
            to="/"
            className="text-white text-lg hover:text-yellow-400"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-white text-lg hover:text-yellow-400"
            onClick={closeMenu}
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="text-white text-lg hover:text-yellow-400"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white text-lg hover:text-yellow-400"
            onClick={closeMenu}
          >
            Contact
          </Link>

          {user ? (
            <>
              {user.role === "user" && (
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded-full hover:bg-yellow-300 transition-all duration-300"
                >
                  {user.name || "Profile"}
                </Link>
              )}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 transition-all duration-300"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="text-white border border-yellow-400 py-2 px-6 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 text-gray-900 font-bold py-2 px-8 rounded-full hover:bg-yellow-300 transition-all duration-300 mt-4"
              onClick={closeMenu}
            >
              Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
