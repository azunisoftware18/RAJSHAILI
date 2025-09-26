import React from 'react'
import {
    Star,
    Users,
    BookOpen,
    Award,
    CheckCircle,
    Play,
    Globe,
    Calendar,
    User,
    Book,
} from "lucide-react";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome, FaStar, FaGlobe, FaPlayCircle } from "react-icons/fa";
import HeroSection from '../components/HeroSection';
import VideoCard from '../components/VideoModal';

export default function HomePage() {
    
const Card = ({
    title,
    price,
    subtitle,
    isRecommended,
    features,
    buttonText,
    buttonColor,
}) => {
    return (
        <div
            className={`
      relative
      p-8 rounded-3xl shadow-xl transition-transform transform-gpu hover:scale-105
      flex flex-col items-center justify-between
      ${
          buttonColor === "pink"
              ? "bg-gradient-to-r from-[#334764] via-[#46628a] to-yellow-300 text-white" //gst
              : "bg-white text-gray-800"
      }
      w-full
      ${isRecommended ? "md:scale-110" : ""}
    `}
        >
            {isRecommended && (
                <div className="absolute top-0 right-0 mt-4 mr-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Recommended
                </div>
            )}
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-4xl font-extrabold mb-1">
                    {price}
                    <span className="text-sm font-normal align-top ml-1 opacity-75">
                        {subtitle}
                    </span>
                </p>
            </div>

            <ul className="list-none text-left w-full">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start my-2">
                        <span
                            className={`inline-block w-2 h-2 rounded-full mt-2 mr-2 ${
                                buttonColor === "pink"
                                    ? "bg-white"
                                    : "bg-yellow-500"
                            }`}
                        ></span>
                        <span
                            className={`${
                                buttonColor === "pink"
                                    ? "text-gray-200"
                                    : "text-gray-600"
                            } text-sm`}
                        >
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            <button
                className={` py-3 px-8 rounded-full font-bold
        transition-all transform-gpu hover:scale-105
        ${
            buttonColor === "pink"
                ? "bg-white text-red-600 shadow-md"
                : "bg-red-600 text-white shadow-md hover:bg-red-700"
        }
      `}
            >
                {buttonText}
            </button>
        </div>
    );
};

const learningPathData = [
    {
        step: 1, 
        title: "The Integrated Framework",
        description: "Begin your journey by understanding our core philosophy: the seamless integration of ancient wisdom from Vastu and Astrology with modern psychology and mental health practices.",
    },
    {
        step: 2,
        title: "Scholarly Study of Sacred Sciences",
        description: "Dive deep into our structured, accredited programs. Gain a theoretical and practical understanding of Vedic Astrology, Vastu Shastra, and Integrative Mental Health.",
    },
    {
        step: 3,
        title: "Fostering Scholarly Inquiry",
        description: "Move beyond theory to engage with our robust research center. Learn to scientifically study and validate ancient traditions, contributing to a global body of knowledge.",
    },
    {
        step: 4,
        title: "Cultivating Personal & Spiritual Growth",
        description: "Nurture your inner development through meditative practices and self-inquiry, ensuring you become an emotionally resilient and spiritually grounded practitioner.",
    },
    {
        step: 5,
        title: "Community Impact & Global Service",
        description: "Learn to apply your knowledge with integrity and compassion. Engage in outreach programs and join a global network to serve the community and promote holistic well-being.",
    },
];

const contentData = {
    "Effective Education": {
        title: "To Integrate Ancient and Modern Knowledge",
        description:
            "To develop and offer interdisciplinary academic programs that seamlessly blend the study of spiritual sciences like astrology and Vastu with modern disciplines, particularly psychology and mental health, to provide a holistic educational experience.",
        features: [
            "3 Membership Levels",
            "15+ Courses",
            "Self Paced Learning",
            "Boost Skills of Practical Implementation",
        ],
        imageAlt: "Image of a person with a lightbulb idea",
        imageSrc:
            "https://cdn.prod.website-files.com/6502992df70717be21112efc/65029d94e0a72ede5b65092b_Work-Being-creative-01.svg",
    },


    "Transform Spaces": {
        title: "Transform Spaces, Transform Lives The Rajshaili Approach",
        description:
            "In a world seeking deeper meaning, we invite you to master the ancient sciences of Vastu and Astrology. Our unique curriculum integrates these disciplines with modern mental health principles to provide more than just knowledge—we offer a path to clarity, purpose, and inner peace. Learn to create harmonious environments that foster well-being and empower yourself to make a positive impact on the world.",
        features: [
            "Home Practical Skills - Quarterly Hackathons",
            "PDF Templates & Knowledge Sheets",
            "Astro-Vastu Understanding",
            "Vastu Remedies Available",
        ],
        imageAlt: "Image of a Vastu Shastra diagram",
        imageSrc:
            "https://cdn.prod.website-files.com/6502992df70717be21112efc/65029d94f91f4d27cd1fa341_Design-Design-thinking-01.svg",
    },


    "Join a Global Community": {
        title: "Join a Global Community of Wisdom Seekers",
        description:
            "At Rajshaili, education extends beyond the curriculum. We are building a worldwide community of scholars, practitioners, and students dedicated to holistic growth and cross-cultural dialogue. Connect with like-minded individuals within our exclusive network, engage in profound discussions, and collaborate on projects that foster a more conscious and harmonious global society. Your journey of learning is a shared one..",
        features: [
            "Inner Circle Masterminds",
            "Learning Partner",
            "Community Meetups",
            "Affiliate Opportunity",
        ],
        imageAlt: "Image of people collaborating",
        imageSrc:
            "https://cdn.prod.website-files.com/6502992df70717be21112efc/65029d95483936b32c6f03c7_Business-Business-deal-01.svg",
    },

    "Build Your Legacy": {
        title: "Build Your Legacy as a Leader in Holistic Wellness",
        description:
            "Your journey with Rajshaili is a path toward leadership. We are committed to recognizing and celebrating your professional growth and the legacy you build. Our accolades are designed to honour those who not only achieve remarkable success in their practice but also inspire others and uphold the highest standards of integrity and compassion in their work",
        features: ["Finisher Award", "Hall of Fame", "1 Cr. Champion"],
        imageAlt: "Image of a trophy and stars",
        imageSrc:
            "https://cdn.prod.website-files.com/6502992df70717be21112efc/65029da5ad0e7c8b64cede36_Interface-Success-01.svg",
    },

    "A Life of Purpose and Freedom": {
    title: "Discover True Freedom Through a Life of Service",
    description: "At Rajshaili, we believe authentic freedom comes from a life aligned with purpose. Learn to apply the sacred knowledge of Vastu Shastra to serve others, build a sustainable and fulfilling career, and earn the respect of your community as a practitioner of integrity.",
    features: [
        "Build a Purpose-Driven Vocation",
        "Find Abundance by Serving Others",
        "Live with the Integrity of a Shastra Practitioner",
        "Earn Esteem as a Community Guide"
    ],
    imageAlt: "Image of a person living a free lifestyle",
    imageSrc: "https://cdn.prod.website-files.com/6502992df70717be21112efc/65029d9469553d37d6be3470_Social-Media-Share-01.svg"
}
};

const menuItems = Object.keys(contentData);

const ContentData = [
    "Vedic Vastu Foundations",
    "Scientific & Psychological Vastu",
    "The Vastu Purush Mandala",
    "45 Deities & Energy Mapping",
    "Psychology of the Directions",
    "Residential & Home Vastu",
    "Commercial & Business Vastu",
    "Industrial & Factory Vastu",
    "Vastu in Architectural Maps",
    "Ideal Room & Space Placement",
    "Dosha & Mahadosha Diagnosis",
    "Astro-Vastu Integration",
    "Predictive Vastu Techniques",
    "Ethical Remedies & Rituals",
    "Non-Destructive Dosha Correction",
    "Advanced Tools: Pyramid Vastu",
    "Vastu in Modern Construction",
    "Practical Case Studies & Ethics"
];

const steps = [
    {
        text: "Sign up now",
        isActive: true,
        buttonText: "Start Now",
    },
    {
        text: "Start learning",
        isActive: false,
    },
    {
        text: "Gain Confidence",
        isActive: false,
    },
    {
        text: "Launch Your Practice",
        isActive: false,
    },
    {
        text: "Start earning",
        isActive: false,
    },
    {
        text: "Serve Your Community",
        isActive: false,
    },
];

const [activeItem, setActiveItem] = useState(menuItems[0]);
    const currentContent = contentData[activeItem];

    const cards = [
        {
            title: "Home Energy Reset",
            price: "₹9,990",
            subtitle: "(*+GST)",
            features: [
                "One Time Fee",
                "2 Powerful Courses",
                "3 Days LIVE Vastu Boot Camp",
                "Community Access",
                "Mobile App",
            ],
            buttonText: "GET STARTED",
            buttonColor: "orange",
        },
        {
            title: "Vastu Shromani",
            price: "₹1,49,990",
            subtitle: "(*+GST)",
            isRecommended: true,
            features: [
                "11+ Powerful Courses",
                "Weekly LIVE Meeting",
                "Support Forum",
                "Weekly Progress Meeting",
                "Premium Group Access",
                "25% Discount on Vastu Yantra",
                "Annual Retreat",
                "Start Practice in 90 days / 180 days",
                "Mobile App Access",
                "Certification Rewards",
            ],
            buttonText: "GET STARTED",
            buttonColor: "pink",
        },
        {
            title: "Vastu Maharishi",
            price: "₹3,49,990",
            subtitle: "(*+GST)",
            features: [
                "Annual Subscription",
                "5+ Powerful Courses",
                "Project Mentoring",
                "121 Consultancy Audit",
                "Instant Support Access",
                "Mastery in Vastu Guaranteed",
                "Inner Circle Group Access",
            ],
            buttonText: "COMING SOON",
            buttonColor: "orange",
        },
    ];
  return (
    <div className=''>
            <HeroSection />
            {/* Partner Logos */}
            <section className="px-12 my-10 bg-white relative bottom-22 py-3">
                <marquee behavior="scroll" direction="left">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Horizontal Scroll Container */}
                        <div className="flex">
                            <img
                                src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051a4bcc78d63c32ad07_Logo%203.svg"
                                alt="logo"
                                className="w-20 h-10 object-contain flex-shrink-0 ml-20 bg-gray-50"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051a65d89f1e35c14eed_Logo%202.svg"
                                alt="logo"
                                className="w-20 h-10 object-contain flex-shrink-0 ml-20"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a0517df89487c47a2bb01_Logo%206.svg"
                                alt="logo"
                                className="w-20 h-10 object-contain flex-shrink-0 ml-20"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a062406312450d40dd24a_Logo%207.svg"
                                alt="logo"
                                className="w-20 h-10 object-contain flex-shrink-0 ml-20"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a0519bbd9309fc977cfdd_Logo%208.svg"
                                alt="logo"
                                className="w-20 h-10 object-contain flex-shrink-0 ml-20"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a05192eae60d2b50cea9e_Logo%209.svg"
                                alt="logo"
                                className="w-20 h-10 object-contain flex-shrink-0 ml-20"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051bad514fe89ffcd59b_Logo%201.svg"
                                alt="logo"
                                className="w-20 h-10 object-contain flex-shrink-0 ml-20"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051a9c616fb0ff50a2fe_Logo%205.svg"
                                alt="logo"
                                className="w-20 h-10 object-contain flex-shrink-0 ml-20"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051cf7d03bba23c885ec_Logo%204.svg"
                                alt="logo"
                                className="w-20 h-10 object-contain flex-shrink-0 ml-20"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/6502992df70717be21112efc/653a051a9c616fb0ff50a2fe_Logo%205.svg"
                                alt="logo"
                                className="w-20 h-10 object-contain flex-shrink-0 ml-20"
                            />
                        </div>
                    </div>
                </marquee>
            </section>
    <section className="px-8">
    <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
        What You'll{" "}
        <span className="bg-gradient-to-r from-yellow-300 via-yellow-300 to-[#46628a] bg-clip-text text-transparent">
            Learn In Vedic Rajshaili Hub?
        </span>
        </h1>
    </div>

    {/* Cards Container */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Card 1 - Family's Vastu Guru */}
        <div className="hover:bg-gradient-to-r from-[#2e4c75] via-[#345583] to-yellow-300 duration-600 hover:text-white hover:shadow-yellow-300/50  bg-white rounded-2xl p-8 border border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold leading-tight">
            Ancient Knowledge <br /> for Modern Life    
            </h2>
            <div className="bg-[#345583]  bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
            <BookOpen className="w-8 h-8 text-white" />
            </div>
        </div>

        <p className="hover:text-white text-opacity-90 leading-relaxed">
            Rajshaili blends ancient wisdom of{" "}
            <span className="font-semibold">Astrology & Vastu</span> with modern
            psychology. We provide a sanctuary where tradition meets science,
            helping you understand cosmic influences and environmental harmony for
            a balanced, successful life.
        </p>
        </div>

        {/* Card 2 - Vedic Vastu Shastra Practitioner */}
        <div className="hover:bg-gradient-to-r from-[#2e4c75] via-[#345583] to-yellow-300 hover:shadow-yellow-300/50 duration-300 hover:text-white bg-white rounded-2xl p-8 border border-orange-200 shadow-lg hover:shadow-xl transition-shadow hover:duration-300">
        <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold leading-tight">
            Vision of <br /> Rajshaili Institute
            </h2>
            <div className="bg-[#345583] p-3 rounded-xl">
            <User className="w-8 h-8 text-white" />
            </div>
        </div>

        <p className="leading-relaxed">
            Our vision is to create a{" "}
            <span className="font-semibold">global platform</span> where spiritual
            sciences are preserved, researched, and integrated with wellness &
            psychology. We aim to foster cross-cultural dialogue and a conscious,
            harmonious world.
        </p>
        </div>

        {/* Card 3 - Launch Successful Practice */}
        <div className="hover:bg-gradient-to-r from-[#2e4c75] via-[#345583] to-yellow-300 hover:shadow-yellow-300/50 duration-300 hover:text-white bg-white rounded-2xl p-8 border border-orange-200 shadow-lg hover:shadow-xl transition-shadow hover:duration-300">
        <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold leading-tight">
            Mission & <br /> Core Objectives
            </h2>
            <div className="bg-[#345583] p-3 rounded-xl">
            <Users className="w-8 h-8 text-white" />
            </div>
        </div>

        <p className="leading-relaxed">
            We bridge{" "}
            <span className="font-semibold">ancient knowledge & modern science</span>{" "}
            through education, research & outreach. Our mission is to empower
            students to grow spiritually, mentally & emotionally, serving society
            with wisdom, harmony & compassion.
        </p>
        </div>
    </div>
    </section>


            {/* Exclusive Benefits */}
            <div className="px-10 md:px-0">
                {/* Main Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800 pt-10">
                    <span className="text-yellow-400">Exclusive benefits</span> of
                    joining this community
                </h2>

                {/* Main Card Component */}
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar Section */}
                    <div className="w-full md:w-1/3 md:p-5">
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                                Benefits:
                            </h2>
                            <ul className="space-y-4 ">
                                {menuItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer p-4 rounded-xl flex items-center transition-all duration-300 border border-yellow-400 hover:shadow-yellow-300/50
                                                    ${
                                                        activeItem === item
                                                            ? "bg-gradient-to-r from-[#2e4c75] via-[#345583] to-yellow-300  text-white shadow-md"
                                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                                    }
                                                `}
                                        onClick={() => setActiveItem(item)}
                                    >
                                        <span
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-4 transition-colors
                                                    ${
                                                        activeItem === item
                                                            ? "bg-white text-[#345583]"
                                                            : "bg-gray-200 text-gray-500"
                                                    }`}
                                        >
                                            {index + 1}
                                        </span>
                                        <span className="font-semibold text-base md:text-lg">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-2/3 md:p-5 mt-8 md:mt-0"> 
                        <div className="p-6 md:p-10 bg-white rounded-xl shadow-lg flex flex-col-reverse md:flex-row items-center gap-8 md:h-130">
                            <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 leading-tight">
                                    {currentContent.title}
                                </h2>
                                <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
                                    {currentContent.description}
                                </p>
                                <ul className="space-y-3">
                                    {currentContent.features.map(
                                        (feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start text-gray-700 text-sm md:text-base"
                                            >
                                                <span className="text-[#345583] font-bold text-lg leading-none mr-2">
                                                    ◆
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="flex-shrink-0">
                                <img
                                    src={currentContent.imageSrc}
                                    alt={currentContent.imageAlt}
                                    className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Topics You'll Learn */}
            <div className="flex flex-col md:flex-row  overflow-hidden  w-full px-10 gap-x-24 py-10">
                {/* Left Section with Image and Gradient Background */}
                <div className="flex-shrink-0 w-full md:w-2/5 relative  rounded-3xl bg-gradient-to-r from-[#1e3453] via-[#2c4871] to-yellow-300">
                    <div className="absolute inset-0"></div>
                    <img
                        src="/public/hero-img/img-3.jpeg"
                        alt="Speaker holding a microphone"
                        className="w-full h-full object-cover rounded-3xl md:rounded-l-3xl z-10 "
                    />
                </div>

                {/* Right Section with Title and Grid */}
                <div className="flex-1 p-6 md:p-12 ">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                        Topics You'll Learn Inside?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ContentData.map((topic, index) => (
                            <div
                                key={index}
                                className="flex items-center p-3 border-2 border-yellow-400 hover:shadow-yellow-300/50 rounded-lg shadow-sm transition-transform duration-200 hover:scale-105"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-sm sm:text-base text-gray-700 font-medium">
                                    {topic}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Join Section */}
            <div className="flex flex-col md:flex-row items-center w-full  px-10 justify-between">
                {/* Left Section with Stats */}
                <div className="flex-shrink-0 text-center md:text-right p-4 md:p-8">
                    <div className="space-y-8 px-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                                10000+
                            </h2>
                            <p className="text-sm md:text-base text-gray-500">
                                Targeting to reach Knowledge Seekers
                            </p>
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-red-600 leading-none">
                                20+ Years
                            </h2>
                            <p className="text-sm md:text-base text-gray-500">
                                Of Experience Vastu Shastra
                            </p>
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-none">
                                5000+
                            </h2>
                            <p className="text-sm md:text-base text-gray-500">
                                Completed Vastu Projects
                            </p>
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-red-600 leading-none">
                                10+
                            </h2>
                            <p className="text-sm md:text-base text-gray-500">
                                TV channels has featured
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Section with Image and Content */}
                <div className="relative flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl px-2">
                    {/* Gradient background div */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e3453] via-[#2c4871] to-yellow-300 rounded-3xl"></div>

                    {/* Content Section */}
                    <div className="relative z-10 p-8 md:p-12 w-full md:w-3/5 text-white">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Welcome to Rajshaili: The Institute of Divine Knowledge
                        </h1>
                        <p className="text-sm md:text-base mb-6 font-medium">
                            Founded by distinguished academic Dr. R. K. Tailor,
                            Rajshaili is a scholarly sanctuary dedicated to holistic education.
                            Our core mission is to integrate the profound wisdom of Vastu and Astrology
                            with contemporary psychology for the modern world.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 mt-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>
                                    Comprehensive Rajshaili Course Material
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 mt-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>
                                    Help You Launch yourself as Vastu Consultant
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 mt-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>
                                    On stop shop for remedies, Yantras and
                                    Rituals
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Image Section */}
                    <div className="relative z-20 w-full md:w-2/5 md:-mr-10 md:-mb-10 p-8 md:p-0">
                        <img
                            src="hero-img/Gemini_Generated_Image_nbticbnbticbnbti-removebg-preview (1).png"
                            alt="Dr. Vaishali Gupta holding a yellow cup"
                            className="w-[100vw] object-contain md:h-auto rounded-8xl md:pt-13"
                        />
                    </div>
                </div>
            </div>

            {/* Learning Path */}
            <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Learning Path
        </h2>

        <div className="relative">
            {/* Vertical Line - Hidden on small screens */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#2c4871]"></div>

            <div className="space-y-12">
                {learningPathData.map((item, index) => (
                    <div
                        key={item.step}
                        className={`flex flex-col md:flex-row items-center relative ${
                            index % 2 !== 0 ? "md:flex-row-reverse" : ""
                        }`}
                    >
                        {/* Text Box */}
                        <div className="w-full md:w-1/2 md:px-8">
                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-blue-300/50">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-[#2c4871] text-white rounded-full flex items-center justify-center font-bold">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        {/* Middle Dot - Hidden on small screens */}
                        <div className="hidden md:flex w-12 h-12 bg-blue-300 rounded-full items-center justify-center relative z-10 my-6 md:my-0">
                            <div className="w-6 h-6 bg-white rounded-full"></div>
                        </div>

                        {/* Empty Space for alignment */}
                        <div className="w-full md:w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</section>
            
            {/* Get Started */}
            <div className="flex flex-col md:flex-row px-10 h-fit pb-10">
                {/* Left Section with Image and Gradient Background */}
                <div className="relative flex-shrink-0 px-5 h-4xl md:w-2/5 rounded-b-none md:rounded-l-3xl rounded-3xl bg-gradient-to-t from-yellow-400 via-[#2c4871] to-[#2c4871]">
                    <div className="absolute inset-0 rounded-3xl md:rounded-l-3xl"></div>
                    <img
                        src="hero-img/img-1-removebg-preview.png"
                        alt="Dr. Vaishali Gupta holding a book"
                        className=" h-fit object-cover rounded-3xl md:rounded-l-3xl z-10 p-4  md:pt-15  md:w-[100vw]"   
                    />
                </div>

                {/* Right Section with Title and Steps */}
                <div className="flex-1 md:p-12 w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 mt-4 md:mt-0">
                        Get Started
                    </h2>
                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`
                  flex justify-between items-center p-4 rounded-lg border-2
                  ${
                      step.isActive
                          ? "border-transparent bg-[#2c4871] text-white"
                          : "border-gray-200 bg-white text-gray-700"
                  }
                  shadow-sm
                `}
                            >
                                <div className="flex items-center">
                                    <span
                                        className={`
                      text-lg font-bold mr-4
                      ${step.isActive ? "text-white" : "text-[#2c4871]"}
                    `}
                                    >
                                        {index < 9
                                            ? `0${index + 1}`
                                            : index + 1}
                                    </span>
                                    <span className="text-lg font-medium">
                                        {step.text}
                                    </span>
                                </div>
                                {step.isActive && (
                                    <button className="bg-white text-[#2c4871] font-bold py-2 px-6 rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
                                        {step.buttonText}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Certificate Section */}
            <section className="py-20 bg-gradient-to-r bg-orange-100">
                <div className=" px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Vastu Practitioners Certificate Courses
                    </h2>
                    <p className="text-xl mb-12 max-w-3xl mx-auto">
                        Get certified as a professional Vedic Vastu practitioner
                        and start your journey as a respected consultant in this
                        ancient science.
                    </p>
                    <div className=" grid md:grid-cols-3 gap-8 md:gap-12 ">
                        {cards.map((card, index) => (
                            <Card key={index} {...card} />
                        ))}
                    </div>
                </div>
            </section>

            {/* video card */}

            <div>
                <VideoCard/>
            </div>

            
    </div>
  )
}
