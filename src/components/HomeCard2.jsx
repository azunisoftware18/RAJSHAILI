import React, { useState, useEffect, useRef } from 'react';

// Data for the benefits section
const menuItems = [
    "Integrate Ancient & Modern Knowledge",
    "Community & Collaboration",
    "Awards & Recognition",
    "The Practitioner's Path",
    "Launch Your Practice",
];

const content = {
    "Integrate Ancient & Modern Knowledge": {
        title: "To Integrate Ancient and Modern Knowledge",
        description: "To develop and offer interdisciplinary academic programs that seamlessly blend the study of spiritual sciences like astrology and Vastu with modern disciplines, particularly psychology and mental health, to provide a holistic educational experience.",
        features: [
            "3 Membership Levels",
            "15+ Courses",
            "Self Paced Learning",
            "Boost Skills of Practical Implementation",
        ],
        imageSrc: "https://placehold.co/512x512/192A41/FBBF24?text=Knowledge",
        imageAlt: "Icon representing knowledge integration",
    },
    "Community & Collaboration": {
        title: "Join a Global Community of Wisdom Seekers",
        description: "Education at Rajshaili extends beyond the curriculum. We are building a worldwide community of scholars, practitioners, and students dedicated to holistic growth and cross-cultural dialogue.",
        features: [
            "Scholarly Masterminds for deep study",
            "Collaborative Learning with peers and mentors",
            "Global & Local Meetups for connection",
            "Ambassador Program to share the mission",
        ],
        imageSrc: "https://placehold.co/512x512/192A41/FBBF24?text=Community",
        imageAlt: "Icon representing community",
    },
    "Awards & Recognition": {
        title: "Celebrating Excellence & Impact in Practice",
        description: "We honor the dedication of our practitioners who apply our integrated wisdom to serve their communities with integrity and compassion. Our program celebrates the significant milestones achieved by our alumni.",
        features: [
            "The Practitioner's Seal of Excellence",
            "The Rajshaili Hall of Honour",
            "The Acharya's Circle of Distinction",
            "Recognition for community impact",
        ],
        imageSrc: "https://placehold.co/512x512/192A41/FBBF24?text=Awards",
        imageAlt: "Icon representing awards",
    },
    "The Practitioner's Path": {
        title: "Forge a Career of Purpose, Impact, and Integrity",
        description: "Translate profound Vedic Vastu knowledge into a respected professional practice. Our program equips you with the scholarly insights and practical skills to guide others and transform communities.",
        features: [
            "Establish a Respected Professional Practice",
            "Achieve a Sustainable Career Through Service",
            "Embrace the Noble Path of a Shastra Practitioner",
            "Become a Trusted Advisor in Your Community",
        ],
        imageSrc: "https://placehold.co/512x512/192A41/FBBF24?text=Career",
        imageAlt: "Icon representing a professional path",
    },
    "Launch Your Practice": {
        title: "Build a Successful Vastu Practice",
        description: "Go beyond theory and learn the essential business skills to launch and grow your own successful Vastu consultancy. We provide the roadmap to turn your passion into a profession.",
        features: [
            "Business & Marketing Blueprints",
            "Client Consultation & Management Skills",
            "Effective Pricing Strategies for Your Services",
            "Ongoing Mentorship & Professional Support",
        ],
        imageSrc: "https://placehold.co/512x512/192A41/FBBF24?text=Business",
        imageAlt: "Icon representing a successful business",
    },
};

// Har benefit ke liye ek card component
const BenefitCard = ({ data }) => (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 lg:p-12 bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8 min-h-full border border-blue-800/50">
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                    {data.title}
                </h2>
                <p className="text-gray-300 mb-6 text-base lg:text-lg leading-relaxed">
                    {data.description}
                </p>
                <ul className="space-y-3">
                    {data.features.map(
                        (feature, index) => (
                            <li
                                key={index}
                                className="flex items-center text-gray-200 text-sm md:text-base"
                            >
                                <span className="text-yellow-400 font-bold text-lg leading-none mr-3">◆</span>
                                <span>{feature}</span>
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div className="flex-shrink-0 mt-8 md:mt-0">
                <img
                    src={data.imageSrc}
                    alt={data.imageAlt}
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-yellow-500/30"
                />
            </div>
        </div>
    </div>
);


export default function ExclusiveBenefits() {
    const [activeCard, setActiveCard] = useState(0);
    const scrollContainerRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const cardWidth = container.offsetWidth;
            const newIndex = Math.round(scrollLeft / cardWidth);

            if (activeCard !== newIndex) {
                setActiveCard(newIndex);
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [activeCard]);

    const scrollToCard = (index) => {
        cardRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
        });
    };

    return (
        <section className="h-screen bg-[#192A41] flex flex-col overflow-hidden">
            {/* Title Section */}
            <div className="pt-16 pb-8 md:pt-24 md:pb-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                        <span className="text-yellow-400">Exclusive benefits</span> of joining this community
                    </h2>
                </div>
            </div>
            
            {/* Horizontal Scroll Section */}
            <div ref={scrollContainerRef} className="flex-1 flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        ref={el => cardRefs.current[index] = el}
                        className="w-full flex-shrink-0 snap-center flex items-center justify-center"
                    >
                        <BenefitCard data={content[item]} />
                    </div>
                ))}
            </div>

            {/* Bottom Navigation Dots */}
            <div className="py-8">
                <div className="flex justify-center gap-3">
                    {menuItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToCard(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeCard === index ? 'bg-yellow-400 scale-150' : 'bg-blue-800/50 hover:bg-yellow-400/50'}`}
                        />
                    ))}
                </div>
            </div>

             <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </section>
    );
}

