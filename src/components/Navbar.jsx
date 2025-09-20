import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <header className=" shadow-sm fixed items-center text-center w-screen z-50 bg-[#FFD700]" 
        // style={{
        //         background:
        //             "#ffd700"
        //     }}
        >
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-800 text-space">
                            <img src="hero-img/rajshaili-removebg-preview.png" alt=""
                            className="w-13"
                           / >

                            
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 md:pr-8">
                        <Link to="/" className="text-black hover:text-red-700">
                            Home
                        </Link>
                        <Link to="/courses" className="text-black hover:text-red-700">
                            Courses
                        </Link>
                        <Link to="/about" className="text-black hover:text-red-700">
                            About
                        </Link>
                        <Link to="/contact" className="text-black hover:text-red-700">
                            Contact
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 focus:outline-none pr-2 cursor-pointer"
                        >
                            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <nav className="md:hidden px-2 pb-4 space-y-2">
                    <Link
                        to="/"
                        className="block text-gray-700 hover:text-white-"
                    >
                        Home
                    </Link>
                    <Link
                        to="/courses"
                        className="block text-gray-700 hover:text-white-"
                    >
                        Courses
                    </Link>
                    <Link
                        to="/about"
                        className="block text-gray-700 hover:text-white-"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="block text-gray-700 hover:text-white-"
                    >
                        Contact
                    </Link>
                </nav>
            )}
        </header>
    );
}

export default Navbar;
