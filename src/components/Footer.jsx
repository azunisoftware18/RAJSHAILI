import React from "react";
// Link component hata diya gaya hai kyunki router context available nahi hai
// import { Link } from "react-router-dom"; 
// Icons import kar rahe hain
import { Mail, Phone, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
// Framer Motion import kar rahe hain animation ke liye
import { motion } from 'framer-motion';

export default function Footer() {

    // Animation Variants
    // Poore footer container ke liye
    const footerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.15, // Columns ko ek ke baad ek animate karega
                delayChildren: 0.2 // Animation shuru hone se pehle thoda delay
            }
        }
    };

    // Har ek column ke liye
    const columnVariants = {
        hidden: { opacity: 0, y: 30 }, // Neeche se start hoga
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } // Apni jagah par aayega
    };

    return (
        // motion.footer ka istemal kar rahe hain
        <motion.footer
            className="bg-slate-900 text-slate-300 py-16 sm:py-20"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible" // Jab view mein aayega tab animate hoga
            viewport={{ once: true, amount: 0.1 }} // Ek baar animate hoga, jab 10% dikhe
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    // Grid par bhi variants apply kar rahe hain staggering ke liye
                    variants={footerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
                >

                    {/* Column 1: Logo, Description, Contact */}
                    <motion.div variants={columnVariants} className="md:col-span-2 lg:col-span-1">
                        <div className="mb-5">
                            <a href="/"> 
                                <img
                                    src="hero-img/logo.png"
                                    alt="Rajshaili Logo"
                                    className="h-10 w-auto filter brightness-0 invert" 
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.outerHTML = `<span class="text-2xl font-bold text-white">RAJSHAILI</span>`;
                                    }}
                                />
                            </a>
                        </div>
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                            Blending the wisdom of ancient traditions with modern science to create a holistic path for knowledge, well-being, and harmony.
                        </p>
                        <a href="tel:+919983111110" className="flex items-center text-sm font-medium text-slate-200 hover:text-white transition-colors group">
                            <Phone size={16} className="mr-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                            <span>Book a session: +91 9983111110</span>
                        </a>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={columnVariants}>
                        <h3 className="font-semibold text-lg text-white mb-5">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="/" className="text-slate-400 hover:text-white hover:underline transition-colors">Home</a></li>
                            <li><a href="/courses" className="text-slate-400 hover:text-white hover:underline transition-colors">Courses</a></li>
                            <li><a href="/about" className="text-slate-400 hover:text-white hover:underline transition-colors">About</a></li>
                        </ul>
                    </motion.div>

                    {/* Column 3: Support Links */}
                    <motion.div variants={columnVariants}>
                         <h3 className="font-semibold text-lg text-white mb-5">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="/helpcare" className="text-slate-400 hover:text-white hover:underline transition-colors">Help Center</a></li>
                            <li><a href="/contact" className="text-slate-400 hover:text-white hover:underline transition-colors">Contact Us</a></li>
                            <li><a href="/privacypolicy" className="text-slate-400 hover:text-white hover:underline transition-colors">Privacy Policy</a></li>
                            <li><a href="/testimonials" className="text-slate-400 hover:text-white hover:underline transition-colors">Community</a></li>
                        </ul>
                    </motion.div>

                    {/* Column 4: Connect Links with Icons */}
                    <motion.div variants={columnVariants}>
                         <h3 className="font-semibold text-lg text-white mb-5">Connect</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-white hover:underline transition-colors group">
                                    <Facebook size={18} className="mr-3 text-slate-500 group-hover:text-blue-500 transition-colors" /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/shaliniastrology/" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-white hover:underline transition-colors group">
                                    <Instagram size={18} className="mr-3 text-slate-500 group-hover:text-pink-500 transition-colors" /> Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/@ShaliniAstrology" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-white hover:underline transition-colors group">
                                    <Youtube size={18} className="mr-3 text-slate-500 group-hover:text-red-500 transition-colors" /> YouTube
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-white hover:underline transition-colors group">
                                    <Linkedin size={18} className="mr-3 text-slate-500 group-hover:text-blue-400 transition-colors" /> LinkedIn
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Copyright Bar - Yeh bhi fade in hoga */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }} // Columns ke baad animate hoga
                    className="border-t border-slate-700 mt-12 pt-8 text-center text-sm text-slate-500"
                >
                    <p>&copy; {new Date().getFullYear()} Rajshaili Hub. All rights reserved.</p>
                </motion.div>
            </div>
        </motion.footer>
    );
}

// export default Footer; // Removed export default as per user's code

