import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, HashRouter } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Scroll effect ke liye
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Cleanup function
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const closeMenu = () => setIsOpen(false);

    // Link ke liye common classes
    const linkClasses = "relative text-white font-medium transition-colors hover:text-yellow-400 after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full";

    // NOTE: HashRouter yahan sirf preview environment mein Link component ko chalane ke liye hai.
    // Aapki main application mein, yeh component ek global router ke andar hona chahiye.
    return (
            <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#192A41] shadow-lg' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link to="/" onClick={closeMenu}>
                            <img
                                src="/hero-img/logo.png"
                                alt="Rajshaili Logo"
                                className="w-auto h-12" 
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link to="/" className={linkClasses}>Home</Link>
                            <Link to="/courses" className={linkClasses}>Courses</Link>
                            <Link to="/about" className={linkClasses}>About</Link>
                            <Link to="/contact" className={linkClasses}>Contact</Link>  
                            {/* <Link to="/login" className="bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-yellow-300  shadow-yellow-300/50 transition-all duration-300 shadow-md hover:shadow-lg">
                                Login
                            </Link> */}
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="text-white focus:outline-none">
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`
                    md:hidden absolute top-full left-0 w-full bg-[#192A41] transition-all duration-500 ease-in-out overflow-hidden
                    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                    <nav className="flex flex-col items-center space-y-6 py-8">
                        <Link to="/" className="text-white text-lg hover:text-yellow-400" onClick={closeMenu}>Home</Link>
                        <Link to="/courses" className="text-white text-lg hover:text-yellow-400" onClick={closeMenu}>Courses</Link>
                        <Link to="/about" className="text-white text-lg hover:text-yellow-400" onClick={closeMenu}>About</Link>
                        <Link to="/contact" className="text-white text-lg hover:text-yellow-400" onClick={closeMenu}>Contact</Link>
                        {/* <Link to="/login" className="bg-yellow-400 text-gray-900 font-bold py-2 px-8 rounded-full hover:bg-yellow-300 transition-all duration-300 mt-4" onClick={closeMenu}>
                            Login
                        </Link> */}
                    </nav>
                </div>
            </header>
    );
}

