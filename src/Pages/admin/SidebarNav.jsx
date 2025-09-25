import React, { useState } from 'react';
import { Home, Settings, Book, User2, DollarSign, Menu, X, Info, MessageCircleIcon } from 'lucide-react';
// BrowserRouter ko HashRouter se replace kiya gaya hai
import { Link, useLocation, HashRouter } from "react-router-dom";

// SidebarNav component ab direct Link ka istemal karega
function SidebarNav() {
    const [isOpen, setIsOpen] = useState(false);
    // location hook ko yahan use karenge active link check karne ke liye
    const location = useLocation();

    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };
    
    // Helper function to determine link classes
    const getLinkClass = (path) => {
        const baseClass = "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors";
        const activeClass = "text-white bg-blue-600";
        const inactiveClass = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

        // Check for both exact path and sub-paths
        const isActive = location.pathname === path || (path !== "/admin" && location.pathname.startsWith(path));

        return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
    };

    return (
        <>
            {/* Main Sidebar Container */}
            <div className={`
                bg-white shadow-md border-r border-gray-200 
                md:w-64 md:fixed md:h-screen 
                w-full fixed top-0 left-0 z-20 md:z-auto
            `}>
                {/* Header and Mobile Toggle */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <Link to="/admin" className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                            <div className="w-4 h-4 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-xl font-semibold text-gray-900">Mantis</span>
                    </Link>

                    {/* Hamburger Menu Button - Mobile Only */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className={`
                    p-4 space-y-2
                    md:block ${isOpen ? 'block' : 'hidden'}
                `}>
                    <Link to="/admin" onClick={handleLinkClick} className={getLinkClass("/admin")}>
                        <Home className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link to="/admin/aboutfrom" onClick={handleLinkClick} className={getLinkClass("/admin/aboutfrom")}>
                        <Info className="w-5 h-5 mr-3" />
                        About
                    </Link>
                    <Link to="/admin/settings" onClick={handleLinkClick} className={getLinkClass("/admin/settings")}>
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                    </Link>
                    <Link to="/admin/courseform" onClick={handleLinkClick} className={getLinkClass("/admin/courseform")}>
                        <Book className="w-5 h-5 mr-3" />
                        Courses
                    </Link>
                    <Link to="/admin/user" onClick={handleLinkClick} className={getLinkClass("/admin/user")}>
                        <User2 className="w-5 h-5 mr-3" />
                        Users
                    </Link>
                    <Link to="/admin/message" onClick={handleLinkClick} className={getLinkClass("/admin/message")}>
                        <MessageCircleIcon className="w-5 h-5 mr-3" />
                        message
                    </Link>
                    <Link to="/admin/subscription" onClick={handleLinkClick} className={getLinkClass("/admin/subscription")}>
                        <DollarSign className="w-5 h-5 mr-3" />
                        Subscription
                    </Link>
                </nav>
            </div>
            
            {/* This div pushes the main content to the right on desktop */}
            <div className="md:pl-64 pt-16 md:pt-0">
                {/* Aapka main page content yahan aayega (e.g., from React Router's <Outlet />) */}
            </div>
        </>
    );
}

export default SidebarNav;

