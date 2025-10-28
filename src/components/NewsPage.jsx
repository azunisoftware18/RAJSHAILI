import React from 'react';
import { motion } from 'framer-motion'; // Framer Motion for animations

// Array of logo URLs (same as before)
const logoUrls = [
    "https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051a4bcc78d63c32ad07_Logo%203.svg",
    "https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051a65d89f1e35c14eed_Logo%202.svg",
    "https://cdn.prod.website-files.com/6502992df70717be21112efc/653a0517df89487c47a2bb01_Logo%206.svg",
    "https://cdn.prod.website-files.com/6502992df70717be21112efc/653a062406312450d40dd24a_Logo%207.svg",
    "https://cdn.prod.website-files.com/6502992df70717be21112efc/653a0519bbd9309fc977cfdd_Logo%208.svg",
    "https://cdn.prod.website-files.com/6502992df70717be21112efc/653a05192eae60d2b50cea9e_Logo%209.svg",
    "https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051bad514fe89ffcd59b_Logo%201.svg",
    "https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051a9c616fb0ff50a2fe_Logo%205.svg",
    "https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051cf7d03bba23c885ec_Logo%204.svg",
];

// Animation Variants
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.05, // Stagger animation of logos
            delayChildren: 0.2
        }
    }
};

const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

// Subtle Float Animation Keyframes (can be adjusted)
const subtleFloatKeyframes = `
  @keyframes subtle-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  .animate-subtle-float {
    animation: subtle-float 3s ease-in-out infinite;
  }
`;

export default function PartnerLogosSection() {
    return (
        // Section Styling: Light gradient background, more padding
        <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            {/* Inject the keyframes using a style tag */}
            <style>{subtleFloatKeyframes}</style>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
                variants={sectionVariants} // Apply container variants
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <h2 className="text-center text-base font-semibold text-slate-500 uppercase tracking-wider mb-10 sm:mb-12">
                    Trusted By Leading Organizations
                </h2>

                {/* Responsive Grid Layout for Logos */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-8 gap-y-10 sm:gap-x-12 items-center">
                    {logoUrls.map((url, index) => (
                        <motion.div
                            key={index}
                            variants={logoVariants} // Apply item animation variant
                            className="flex justify-center items-center"
                        >
                            <img
                                src={url}
                                alt={`Partner logo ${index + 1}`}
                                // Added subtle float animation class, adjusted size and opacity
                                className="max-h-8 sm:max-h-10 w-auto object-contain flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300 animate-subtle-float"
                                // Apply random delay to stagger the float animation
                                style={{ animationDelay: `${Math.random() * 2}s` }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://placehold.co/100x40/f1f5f9/cbd5e1?text=Logo`;
                                    e.target.alt = "Error loading logo";
                                    e.target.style.opacity = '0.5'; // Dim error placeholder
                                }}
                            />
                        </motion.div>
                    ))}
                    {/* Add one more logo for better grid filling on some screens if needed */}
                     <motion.div variants={logoVariants} className="flex justify-center items-center">
                         <img src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051a4bcc78d63c32ad07_Logo%203.svg" alt="Partner logo 10" className="max-h-8 sm:max-h-10 w-auto object-contain flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300 animate-subtle-float" style={{ animationDelay: `${Math.random() * 2}s` }} onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x40/f1f5f9/cbd5e1?text=Logo`; e.target.alt = "Error loading logo"; e.target.style.opacity = '0.5'; }}/>
                     </motion.div>
                     <motion.div variants={logoVariants} className="flex justify-center items-center">
                         <img src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051a65d89f1e35c14eed_Logo%202.svg" alt="Partner logo 11" className="max-h-8 sm:max-h-10 w-auto object-contain flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300 animate-subtle-float" style={{ animationDelay: `${Math.random() * 2}s` }} onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x40/f1f5f9/cbd5e1?text=Logo`; e.target.alt = "Error loading logo"; e.target.style.opacity = '0.5'; }}/>
                     </motion.div>

                </div>
            </motion.div>
        </section>
    );
}

