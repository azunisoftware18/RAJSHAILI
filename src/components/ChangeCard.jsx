import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Lightbulb, Star, Users2, Trophy, Rocket, ShieldCheck, TrendingUp, Compass, Heart } from 'lucide-react';

// Data for benefits, with enhanced icons
const contentData = {
    "Effective Education": {
        title: "Integrated Ancient & Modern Knowledge",
        description: "Our interdisciplinary programs seamlessly blend spiritual sciences like Astrology and Vastu with modern psychology, offering a truly holistic educational experience tailored for the contemporary world.",
        features: ["3 Membership Levels", "15+ Comprehensive Courses", "Flexible Self-Paced Learning", "Boost Practical Implementation Skills"],
        imageAlt: "Person gaining knowledge",
        imageSrc: "https://cdn.prod.website-files.com/6502992df70717be21112efc/65029d94e0a72ede5b65092b_Work-Being-creative-01.svg",
        icon: Lightbulb
    },
    "Transform Spaces": {
        title: "Transform Spaces, Transform Lives",
        description: "Master the ancient sciences of Vastu and Astrology, integrated with modern mental health principles. Learn to create harmonious environments that foster well-being and elevate living experiences.",
        features: ["Quarterly Vastu Hackathons", "Exclusive PDF Templates & Knowledge Sheets", "Deep Astro-Vastu Understanding", "Effective Vastu Remedies Available"],
        imageAlt: "Harmonious living space",
        imageSrc: "https://cdn.prod.website-files.com/6502992df70717be21112efc/65029d94f91f4d27cd1fa341_Design-Design-thinking-01.svg",
        icon: Compass // Changed icon for relevance
    },
    "Join a Global Community": {
        title: "Global Community of Wisdom Seekers",
        description: "Connect with a worldwide network of scholars, practitioners, and students. Engage in profound discussions, collaborate on impactful projects, and foster a more conscious and harmonious global society.",
        features: ["Exclusive Inner Circle Masterminds", "Dedicated Learning Partners", "Regular Community Meetups & Events", "Lucrative Affiliate Opportunities"],
        imageAlt: "Diverse group of people collaborating",
        imageSrc: "https://cdn.prod.website-files.com/6502992df70717be21112efc/65029d95483936b32c6f03c7_Business-Business-deal-01.svg",
        icon: Users2
    },
    "Build Your Legacy": {
        title: "Build Your Legacy in Holistic Wellness",
        description: "Your journey with us is a path toward recognized leadership. We celebrate your professional growth, honoring those who achieve success, inspire others, and uphold the highest standards of integrity and compassion.",
        features: ["Prestigious Finisher Award", "Induction into the Hall of Fame", "Opportunity for 1 Crore Club Champion", "Mentorship for Professional Growth"],
        imageAlt: "Award and recognition",
        imageSrc: "https://cdn.prod.website-files.com/6502992df70717be21112efc/65029da5ad0e7c8b64cede36_Interface-Success-01.svg",
        icon: Trophy
    },
    "A Life of Purpose": {
        title: "Discover True Freedom Through Service",
        description: "At Rajshaili, we believe authentic freedom arises from a life aligned with purpose. Learn to apply sacred knowledge to serve others, build a sustainable career, and earn profound respect as a practitioner of integrity.",
        features: ["Cultivate a Purpose-Driven Vocation", "Achieve Abundance by Serving Others", "Live with Integrity as a Shastra Practitioner", "Earn Esteem as a Respected Community Guide"],
        imageAlt: "Person enjoying freedom",
        imageSrc: "https://cdn.prod.website-files.com/6502992df70717be21112efc/65029d9469553d37d6be3470_Social-Media-Share-01.svg",
        icon: Heart // Changed icon for relevance
    }
};

const menuItems = Object.keys(contentData);

// Animation Variants
const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const itemCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const displayCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } }
};

export default function ExclusiveBenefitsSection() {
    const [activeItem, setActiveItem] = useState(menuItems[0]);
    const currentContent = contentData[activeItem];
    const ActiveIcon = currentContent?.icon || Lightbulb; // Fallback icon

    return (
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden relative">
            {/* Background elements for visual interest */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 w-52 h-52 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionVariants}
                className="max-w-7xl mx-auto relative z-10" // Ensure content is above background
            >
                {/* Section Title */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-16 sm:mb-20 text-slate-900 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                        Exclusive Benefits
                    </span>
                    <br className="hidden sm:block" /> of Joining Our Community
                </h2>

                {/* Feature Selection Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }} // Stagger for item cards
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16 sm:mb-20"
                >
                    {menuItems.map((item) => {
                        const ItemIcon = contentData[item]?.icon || Lightbulb;
                        return (
                            <motion.button
                                key={item}
                                variants={itemCardVariants}
                                className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform
                                            ${activeItem === item
                                                ? 'border-indigo-500 bg-white shadow-xl scale-105 ring-4 ring-indigo-200'
                                                : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md hover:-translate-y-1'
                                            }`}
                                onClick={() => setActiveItem(item)}
                            >
                                <ItemIcon className={`w-10 h-10 mb-3 transition-colors duration-300 ${activeItem === item ? 'text-indigo-600' : 'text-slate-500 group-hover:text-indigo-500'}`} />
                                <span className={`font-semibold text-center text-lg leading-tight ${activeItem === item ? 'text-indigo-800' : 'text-slate-700'}`}>
                                    {item}
                                </span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Content Display Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeItem + "-display-card"}
                        variants={displayCardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
                    >
                        {/* Text Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="mb-6 inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full shadow-md">
                                <ActiveIcon className="w-10 h-10 text-indigo-600" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900 leading-tight">
                                {currentContent.title}
                            </h3>
                            <p className="text-slate-700 mb-8 text-lg sm:text-xl leading-relaxed">
                                {currentContent.description}
                            </p>
                            <ul className="space-y-4">
                                {currentContent.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-slate-800 text-base sm:text-lg justify-center lg:justify-start">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image */}
                        <div className="flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mt-10 lg:mt-0">
                            <motion.img
                                key={activeItem + '-image'} // Key change re-animates image
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                                src={currentContent.imageSrc}
                                alt={currentContent.imageAlt}
                                className="w-full h-full object-contain drop-shadow-xl"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/384x384/e2e8f0/cbd5e1?text=Image'; }} // Fallback
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Custom Keyframe for blob animation */}
            <style>{`
                @keyframes animateBlob {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                .animate-blob {
                    animation: animateBlob 10s ease-in-out infinite alternate;
                }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </section>
    );
}

