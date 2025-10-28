import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Compass, BrainCircuit, Users } from 'lucide-react'; // Relevant icons

// Card Data (remains the same)
const cardData = [
    {
        icon: Compass,
        title: "Ancient Knowledge for Modern Life",
        description: "Rajshaili blends ancient wisdom of Astrology & Vastu with modern psychology...",
        color: "blue"
    },
    {
        icon: BrainCircuit,
        title: "Vision of Rajshaili Institute",
        description: "Our vision is to create a global platform where spiritual sciences are preserved, researched, and integrated...",
        color: "purple"
    },
    {
        icon: Users,
        title: "Mission & Core Objectives",
        description: "We bridge ancient knowledge & modern science through education, research & outreach...",
        color: "emerald"
    }
];

// Animation Variants for the section container
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

// Map color names to Tailwind/style classes
const colorClasses = {
    blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        gradientStop: 'from-blue-50',
        hoverBorder: 'hover:border-blue-400',
        iconBg: 'bg-blue-600',
        glowRgb: '59, 130, 246' // RGB for blue-500
    },
    purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        gradientStop: 'from-purple-50',
        hoverBorder: 'hover:border-purple-400',
        iconBg: 'bg-purple-600',
        glowRgb: '168, 85, 247' // RGB for purple-500
    },
    emerald: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        gradientStop: 'from-emerald-50',
        hoverBorder: 'hover:border-emerald-400',
        iconBg: 'bg-emerald-600',
        glowRgb: '16, 185, 129' // RGB for emerald-500
    }
};


// 3D Tilt Card Component
const TiltCard = ({ icon: Icon, title, description, color }) => {
    const cardRef = useRef(null);
    const colors = colorClasses[color] || colorClasses.blue; // Fallback

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 120, damping: 30 }); // Adjusted spring
    const mouseYSpring = useSpring(y, { stiffness: 120, damping: 30 });

    // Increased rotation slightly for more pronounced effect
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Card animation variant
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
        }
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={cardVariants} // Apply entry animation variant
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            // Added perspective to the card itself for better isolation
            className={`relative flex flex-col rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 ${colors.hoverBorder} hover:shadow-xl hover:-translate-y-1 bg-gradient-to-b ${colors.gradientStop} to-white group`} // Added group class
        >
             {/* Icon Area */}
            <div
                className={`p-6 ${colors.bg} flex items-center justify-center`}
                style={{ transform: "translateZ(30px)" }} // Push icon area slightly forward
            >
                {/* Applied group-hover directly here for icon scale */}
                <div className={`p-3 rounded-full ${colors.iconBg} text-white shadow-md transform transition-transform group-hover:scale-110`}>
                     <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
            </div>
             {/* Content Area */}
            <div
                className="p-8 flex flex-col flex-grow"
                style={{ transform: "translateZ(20px)" }} // Push content slightly forward
            >
                {/* Changed card.title to title */}
                <h2 className={`text-2xl font-bold leading-tight mb-4 ${colors.text}`}>
                    {title}
                </h2>
                <p className="text-slate-600 leading-relaxed flex-grow">
                    {description}
                </p>
            </div>

             {/* Subtle Glow Effect Layer - stays behind content */}
            <motion.div
                // Applied group-hover directly for opacity
                className={`absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
                style={{
                    background: `radial-gradient(400px circle at var(--x) var(--y), rgba(${colors.glowRgb}, 0.15), transparent 80%)`,
                    transform: "translateZ(10px)", // Position between background and content
                     // Get mouse position from motion values
                     '--x': useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']),
                     '--y': useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']),
                }}
            />
        </motion.div>
    );
};


export default function WhatYoullLearnSection() {
    return (
        // Section with white background and padding
        <section className="px-4 sm:px-8 py-20 sm:py-24 bg-white overflow-hidden">
            {/* Title with Animation */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                    What You'll Learn In{" "}
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Vedic Rajshaili Hub?
                    </span>
                </h1>
                 <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Explore the core principles that blend ancient wisdom with modern insights for holistic well-being.
                 </p>
            </motion.div>

            {/* Cards Container with Animation & Perspective */}
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch" // Added items-stretch
                style={{ perspective: "1500px" }} // Container perspective for 3D
            >
                {/* Map over card data and render TiltCard */}
                {cardData.map((card, index) => (
                    <TiltCard
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                        color={card.color}
                    />
                ))}
            </motion.div>
        </section>
    );
}

