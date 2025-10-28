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
import TopicsSection from '../components/Topics';
import GetStartedSection from '../components/GetStarted';
import WhyJoinSection from '../components/WelcomeCard';
import ExclusiveBenefitsSection from '../components/ChangeCard';
import WhatYoullLearnSection from '../components/TiltCard';
import PartnerLogosSection from '../components/NewsPage';

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



  return (
    <div className=''>

            {/* HeroPage */}
            <HeroSection  />

            {/* Partner Logos */}
            <PartnerLogosSection/>

            {/* 3card */}
            <WhatYoullLearnSection/>

            {/* Exclusive Benefits */}
            <ExclusiveBenefitsSection/>

            {/* Topics You'll Learn */}
            <TopicsSection/>

            {/* Why Join Section */}
             <WhyJoinSection/>

            
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
            <GetStartedSection/>


            {/* Certificate Section */}
            {/* <section className="py-20 bg-gradient-to-r bg-orange-100">
                <div className=" px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Rajshaili Practitioners Certificate Courses
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
            </section> */}


            {/* video card */}
            <div>
                <VideoCard/>
            </div>

            
    </div>
  )
}
