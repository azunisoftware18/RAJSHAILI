import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, AlertCircle, CheckCircle, Lightbulb, TrendingUp, Sun, Zap } from "lucide-react";
import { motion } from "framer-motion";

// Environment Variables and Configuration
const API_URL = (typeof import.meta !== 'undefined' ? import.meta.env.VITE_API_URL : undefined) || "http://localhost:5000/api";
const IMAGE_BASE_URL = (typeof import.meta !== 'undefined' ? import.meta.env.VITE_IMAGE_BASE_URL : undefined) || "http://localhost:5000";

// Set axios base URL
axios.defaults.baseURL = API_URL;

// --- Helper to clean and construct the image URL ---
const getFullImageUrl = (relativePath) => {
    if (!relativePath) return null;
    const cleanedPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
    return `${IMAGE_BASE_URL}/${cleanedPath}`;
};

// --- Reusable Animated Section Component (Updated Dark Design) ---
const ContentSection = ({ data, title, index }) => {
    // Determine layout: Alternating image position
    const imageOnRight = index % 2 === 0;

    // Determine if data is loaded or if it's the default state
    const isDataAvailable = data && (data.title || data.description || data.imageUrl);

    // Placeholder content if data is missing
    const defaultTitle = isDataAvailable ? data.title : title || `Section ${index + 1}`;
    const defaultDesc = isDataAvailable ? data.description : "This section is currently under development. Please update the content via the Admin Dashboard to customize this message.";
    const imageUrl = isDataAvailable ? getFullImageUrl(data.imageUrl) : null;
    
    // Updated Placeholder Image (Dark background placeholder)
    const defaultImage = "https://placehold.co/600x400/171717/94a3b8?text=Placeholder+Image";
    const displayImage = imageUrl || defaultImage;

    // Determine section background color (Alternating dark shades)
    const bgColor = index % 2 === 0 ? 'bg-[#171717]' : 'bg-gray-900'; 

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col lg:flex-row gap-10 md:gap-16 items-center px-4 py-16 md:py-24 ${bgColor} text-gray-300 border-b border-gray-800`}
        >
            {/* 1. Image/Visual Column (Order changes based on imageOnRight) */}
            <div className={`w-full lg:w-1/2 ${imageOnRight ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="rounded-xl shadow-2xl shadow-yellow-500/10 overflow-hidden border-4 border-yellow-500/50">
                    <img
                        src={displayImage}
                        alt={defaultTitle}
                        className="w-full h-96 object-cover transition-transform duration-500 hover:scale-[1.03]"
                        onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
                    />
                </div>
            </div>

            {/* 2. Text Content Column */}
            <div className={`w-full lg:w-1/2 ${imageOnRight ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                    OUR GUIDING PRINCIPLES
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    {defaultTitle}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                    {defaultDesc}
                </p>
                
                {/* Enhanced Callouts for visual appeal */}
                <ul className="space-y-3 pt-4">
                    <li className="flex items-start text-gray-300">
                        <Sun className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                        <span>Rooted in timeless Vedic scriptures and texts.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                        <Lightbulb className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-1" />
                        <span>Integrating ancient practices with modern psychological insights.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                        <Zap className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" />
                        <span>Empowering individuals for spiritual and material success.</span>
                    </li>
                </ul>
            </div>
        </motion.div>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function AboutPage() {
    const [sectionsData, setSectionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState(null);

    // The titles map the data structure to the desired UI display
    const titles = [
        "Dr. R. K. Tailor - The Vision", 
        "Shalini Salecha - Modern Approach", 
        "Awards & Accolades"
    ];

    // --------------------------------------------------------------------
    // 🔵 FETCH DATA FROM CMS
    // --------------------------------------------------------------------
    useEffect(() => {
        const fetchSections = async () => {
            try {
                // Using axios.defaults.baseURL set above
                const res = await axios.get(`/about-get-all`);
                const data = res.data;

                // Ensure we get exactly 3 sections or pad with empty objects
                const updatedData = titles.map((title, index) => data[index] || {});
                
                setSectionsData(updatedData);

            } catch (err) {
                console.error("Error fetching about sections:", err);
                setPageError("Failed to load About Page content. Please check the backend connection.");
                // Provide empty data structure to prevent crash
                setSectionsData(titles.map(() => ({}))); 
            } finally {
                setLoading(false);
            }
        };

        fetchSections();
    }, []);

    // --------------------------------------------------------------------
    // 🎨 UI RENDER
    // --------------------------------------------------------------------
    if (loading)
        return (
            <div className="flex items-center justify-center h-screen bg-[#171717]">
                <Loader2 className="h-10 w-10 animate-spin text-yellow-500" />
                <p className="ml-3 text-gray-300 font-medium">Loading About Page...</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#171717] pt-20">
            {/* Hero Section */}
            <header className="py-24 bg-black text-white text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Rajshaili Institute</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-4xl mx-auto px-4">
                        Discover the philosophy and the people behind **Rajshaili Institute**, where ancient wisdom meets modern clarity.
                    </p>
                    {pageError && (
                        <div className="mt-8 mx-auto max-w-md bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-xl flex items-center justify-center gap-3 shadow-lg">
                            <AlertCircle className="w-5 h-5"/>
                            <p className="text-sm">{pageError}</p>
                        </div>
                    )}
                </motion.div>
            </header>

            {/* Content Sections */}
            <main className="max-w-7xl mx-auto">
                {sectionsData.map((section, index) => (
                    <ContentSection
                        key={index}
                        data={section}
                        title={titles[index]}
                        index={index}
                    />
                ))}
            </main>

            {/* CTA/Closing Section */}
            <div className="relative py-24 bg-black text-white text-center border-t border-gray-800/50">
                {/* Subtle Glows */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <motion.h2 
                        className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Ready to Begin Your Transformation?
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-gray-300 mb-10 font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Join thousands who have discovered their true path through our carefully crafted courses.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <a
                            href="/courses"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-gray-900 font-bold py-4 px-10 rounded-2xl transition-all shadow-2xl shadow-yellow-500/40 hover:scale-105 text-lg"
                        >
                            <TrendingUp className="w-6 h-6" />
                            Explore All Courses
                        </a>
                    </motion.div>
                    
                    <motion.div 
                        className="mt-8 text-gray-400 text-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Free introductory session available • Certified instructors • Lifetime access
                    </motion.div>
                </div>
            </div>
        </div>
    );
}