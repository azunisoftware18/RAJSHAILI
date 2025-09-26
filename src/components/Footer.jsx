import React from "react";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-orange-100 text-black py-12">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-35 h-10 rounded-full flex items-center justify-center">
                                <Link to="/">
                                    <img
                                    src="hero-img/logo.png"
                                    alt="Rajshaili Logo"
                                    className="w-full h-10"  // Adjust the size of the logo
                                    />
                            </Link>
                            </div>
                        </div>
                        <p className="text-gray-800">
                            Blending the wisdom of ancient traditions with modern science to create a holistic path for knowledge, well-being, and harmony.
                        </p>
                        <h3 className="mt-5">
                            Book a session: +91 9983111110
                        </h3>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-800">
                            <li>
                                <Link to="/" className="hover:text-gray-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/courses" className="hover:text-gray-500">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-gray-500">
                                    About
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-800">
                            <li>
                                <Link to="/helpcare" className="hover:text-gray-500">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-gray-500">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacypolicy" className="hover:text-gray-500">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <ul className="space-y-2 text-gray-800">
                            <li>
                                <a href="#" className="hover:text-gray-500">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <Link to="https://www.instagram.com/shaliniastrology/" target="_blank" className="hover:text-gray-500">
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link to="https://www.youtube.com/@ShaliniAstrology" target="_blank" className="hover:text-gray-500">
                                    YouTube
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-500">
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-800">
                    <p>&copy; 2025 Rajshaili Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
