import React, { useState, useEffect } from 'react'; // Added useState and useEffect
import axios from 'axios'; // Added axios
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// --- API URLs ---
const API_BASE_URL = "http://localhost:3000/api/home";
const IMAGE_BASE_URL = "http://localhost:3000/";

// Data remains the same
const steps = [
    { text: "Sign up now", isActive: true, buttonText: "Start Now" },
    { text: "Start learning", isActive: false },
    { text: "Gain Confidence", isActive: false },
    { text: "Launch Your Practice", isActive: false },
    { text: "Start earning", isActive: false },
    { text: "Serve Your Community", isActive: false },
];

// Reusable Placeholder Component (remains the same)
const ImagePlaceholder = ({ text = "Loading Image...", error = false }) => (
    <div className={`w-full h-full flex items-center justify-center rounded-2xl ${error ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-500'}`}>
        {error ? (
            <div className="text-center p-4">
                 <AlertCircle className="w-10 h-10 mx-auto mb-2" />
                <span>{text}</span>
            </div>
        ) : (
             <div className="flex items-center gap-3 text-lg">
                 <Loader2 className="animate-spin w-6 h-6" />
                <span>{text}</span>
            </div>
        )}
    </div>
);

// Animation variants for the container and list items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation of children (steps)
       delayChildren: 0.2, // Delay before children start animating
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 }, // Start slightly to the left and invisible
  visible: {
    opacity: 1,
    x: 0, // Move to original position
    transition: {
      type: "spring", // Use spring physics for a bouncier effect
      stiffness: 100,
      damping: 12
    }
  }
};


export default function GetStartedSection() { // Removed props
    // --- Added State for API data ---
    const [getStartedImage, setGetStartedImage] = useState(null);
    const [loadingImages, setLoadingImages] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    // --- Added useEffect to fetch data ---
    useEffect(() => {
        const fetchGetStartedData = async () => {
            setLoadingImages(true);
            setFetchError(null);
            try {
                const res = await axios.get(API_BASE_URL);
                if (res.data && res.data.length > 0) {
                    const latestData = res.data[0];
                    // Using card4Image as requested for this section
                    if (latestData.card4Image) {
                        setGetStartedImage(`${IMAGE_BASE_URL}${latestData.card4Image}`);
                    } else {
                        setFetchError("Image 4 (card4Image) not found.");
                    }
                } else {
                    setFetchError("No home data found.");
                }
            } catch (err) {
                console.error("Failed to fetch Get Started data:", err);
                 if (err.message === "Network Error") {
                    setFetchError("Cannot connect to server.");
                } else {
                    setFetchError("Failed to load image.");
                }
            } finally {
                setLoadingImages(false);
            }
        };

        fetchGetStartedData();
    }, []); // Empty array ensures this runs only once

    return (
        // Changed background, added padding and max-width. Added overflow-hidden for animation.
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
             {/* Use motion.div for entry animation */}
            <motion.div
                initial="hidden"
                whileInView="visible" // Animate when the section comes into view
                viewport={{ once: true, amount: 0.2 }} // Trigger once, when 20% is visible
                transition={{ duration: 0.6, ease: "easeOut" }}
                variants={{ // Simple fade-in and slide-up for the whole section
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                }}
                className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 sm:p-10 rounded-3xl shadow-lg border border-slate-200"
            >

                {/* Left Section with Image */}
                <motion.div
                    className="w-full lg:w-2/5 flex-shrink-0 h-80 sm:h-96 lg:h-auto overflow-hidden rounded-2xl shadow-lg border-4 border-white"
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} // Slight delay for image
                 >
                    {loadingImages
                        ? <ImagePlaceholder />
                        : fetchError
                        ? <ImagePlaceholder text={fetchError} error={true} />
                        : (
                            <img
                                src={getStartedImage} // Use state variable
                                alt="Dr. Vaishali Gupta inspiring action"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x600/cccccc/666666?text=Load+Error"; }}
                            />
                        )}
                </motion.div>

                {/* Right Section with Title and Steps */}
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center lg:text-left">
                        Begin Your Transformation
                    </h2>
                     {/* Use motion.div for staggered list animation */}
                    <motion.div
                        className="space-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible" // Animate steps when container is in view
                        viewport={{ once: true, amount: 0.2 }} // Trigger animation for steps
                     >
                        {steps.map((step, index) => { // Changed to curly brace
                             // Use explicit return
                             return (
                                <motion.div
                                    key={index} // key prop is necessary here
                                    variants={itemVariants} // Use item variants for animation
                                    className={`
                                        flex flex-col sm:flex-row justify-between items-center p-4 rounded-xl border-2 transition-all duration-300 ease-in-out
                                        ${step.isActive
                                            ? "border-transparent bg-gradient-to-r from-[#2c4871] to-[#1e3a5f] text-white shadow-lg scale-[1.03] lg:scale-[1.05]" // Slightly larger scale on active
                                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:shadow-md hover:scale-[1.02]" // Enhanced hover
                                        }
                                    `}
                                >
                                    <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
                                        <span className={`text-xl font-bold mr-4 ml-1 w-8 text-center flex-shrink-0 ${step.isActive ? "text-yellow-300" : "text-[#2c4871]"}`}>
                                            {index < 9 ? `0${index + 1}` : index + 1}
                                        </span>
                                        <span className="text-lg font-medium">{step.text}</span>
                                    </div>
                                    {step.isActive && (
                                        <button className="bg-white text-[#2c4871] font-bold py-2 px-6 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 text-sm w-full sm:w-auto mt-2 sm:mt-0">
                                            {step.buttonText}
                                        </button>
                                    )}
                                </motion.div>
                             ); // Closing parenthesis for return
                        })}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

