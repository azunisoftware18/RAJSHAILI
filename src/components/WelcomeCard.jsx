import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import { CheckCircle, Sparkles, Zap, Users, Award, Star } from 'lucide-react'; // Added more relevant icons

// Data for stats with icons
const statsData = [
    { value: "10000+", label: "Knowledge Seekers Targeted", icon: Users, color: "text-blue-400" },
    { value: "20+ Yrs", label: "Vastu Experience", icon: Star, color: "text-pink-400" },
    { value: "5000+", label: "Completed Vastu Projects", icon: Award, color: "text-blue-400" },
    { value: "10+", label: "TV Channels Featured", icon: Zap, color: "text-pink-400" }
];

// Animation Variants
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardVariants = {
     hidden: { opacity: 0, scale: 0.9 },
     visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } }
};

const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } } // Stagger children animation
};

const statsItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};


export default function WhyJoinSection() {
    return (
        // Dark theme background with gradient and subtle pattern/noise if possible
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden relative text-slate-100">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-blue-800/40 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                    <defs><pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M100 200V.5M.5 .5H200" fill="none" /></pattern></defs>
                    <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                </svg>
            </div>

            {/* Main animated container */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="max-w-5xl mx-auto flex flex-col items-center relative z-10"
            >
                {/* Section Heading */}
                <motion.h2
                     variants={{ hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut"} } }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-16 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"
                >
                    Why Choose Rajshaili?
                </motion.h2>

                {/* Central Card with Content and Image */}
                <motion.div
                    variants={cardVariants}
                    className="relative w-full rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12 bg-gradient-to-br from-slate-800/70 via-slate-900/80 to-black/70 backdrop-blur-lg border border-slate-700 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-16"
                >
                    {/* Content Section */}
                    <div className="relative z-10 flex-1 text-center lg:text-left">
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-white">
                            Welcome to Rajshaili
                        </h3>
                        <p className="text-base md:text-lg mb-8 font-light text-slate-300 leading-relaxed">
                            Founded by distinguished academic Rajshaili, we are a scholarly sanctuary integrating the profound wisdom of Vastu and Astrology with contemporary psychology for the modern world.
                        </p>
                        <ul className="space-y-3 inline-block text-left"> {/* Centered list items on mobile */}
                            {[
                                "Comprehensive Course Material",
                                "Launch as Vastu Consultant",
                                "One-stop shop for remedies",
                            ].map((item, index) => (
                                <li key={index} className="flex items-center text-slate-200">
                                    <Sparkles className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0 opacity-90" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Image Section */}
                    <div className="relative z-20 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex-shrink-0 mt-6 lg:mt-0">
                        <img
                            src="/hero-img/46992-removebg-preview.png"
                            alt="Astrology Wheel"
                            className="w-full h-full object-contain animate-spin-very-slow filter drop-shadow-[0_8px_25px_rgba(0,192,255,0.4)]" // Enhanced drop shadow
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        {/* Define very slow spin animation inline */}
                        <style>{`
                            @keyframes spin-very-slow {
                              from { transform: rotate(0deg); }
                              to { transform: rotate(360deg); }
                            }
                            .animate-spin-very-slow {
                              animation: spin-very-slow 75s linear infinite; /* Made rotation even slower */
                            }
                        `}</style>
                    </div>
                </motion.div>

                {/* Stats Section - Animated Grid */}
                <motion.div
                     variants={statsContainerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.3 }}
                     className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl"
                >
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={statsItemVariants}
                            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center shadow-lg hover:bg-slate-700/50 transition-colors duration-300 flex flex-col items-center" // Centered content
                        >
                             <stat.icon className={`w-8 h-8 mb-3 ${stat.color}`} strokeWidth={1.5}/>
                            <h4 className={`text-3xl sm:text-4xl font-bold ${stat.color} leading-none mb-1`}>
                                {stat.value}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </motion.div>
        </section>
    );
}

