// HeroSection.jsx
import React, { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

function HeroSection() {
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <section className="w-full overflow-hidden relative bg-red-800 p-5">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Text and Buttons */}
        <div className="flex-1 text-white text-center md:text-left px-4 md:px-8 py-16 md:py-20">
          <p className="mb-3 text-sm md:text-base font-semibold tracking-wide">
            Ancient Wisdom • Modern Well-being
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Rajshaili: The Institute of{" "}
            <span className="text-[#F8E72D]">Divine Knowledge</span>
          </h1>

          <p className="text-sm md:text-base mb-8 font-medium max-w-xl mx-auto md:mx-0">
            Bridging{" "}
            <span className="font-semibold">
              Vedic Astrology, Vastu & Mental Health
            </span>{" "}
            with modern science to empower you with clarity, peace & purpose.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-black text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
              Join Us Today
            </button>

            <div className="flex items-center space-x-4 text-white">
              <span className="text-xl font-bold">4.9</span>
              <div className="flex text-yellow-400 space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-medium whitespace-nowrap">
                6000+ Reviews <span className="font-bold mx-1">|</span> Excellent
              </p>
              <div>
                <img
                  src="https://cdn.prod.website-files.com/6502992df70717be21112efc/6502992df70717be21112f09_trustpilot.svg"
                  alt="Trustpilot logo"
                  className="h-6 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Image and Play Icon */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <img
            src="hero-img/img-1-removebg-preview.png"
            alt="Woman smiling"
            className="object-contain md:pt-10 w-[100rem] md:h-[50rem] md:mt-5"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-sm md:text-lg font-semibold mb-4 select-none">
              Watch Video
            </span>
            <FaPlayCircle
              className="text-black bg-yellow-400 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
              size={64}
              aria-label="Play video"
              onClick={() => setOpenVideo(true)}
            />
          </div>
        </div>
      </div>

      {/* ✅ Video Modal (native video tag like testimonials) */}
      {openVideo && (
  <div
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    onClick={() => setOpenVideo(false)} // click outside = close
  >
    <div
      className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()} // prevent closing on video click
    >
      <iframe
        className="w-full h-[220px] sm:h-[320px] md:h-[480px] lg:h-[560px] rounded-xl"
        src="https://www.youtube.com/embed/AIJGPal3NM8?autoplay=1&rel=0"
        title="YouTube video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)}


    </section>
  );
}

export default HeroSection;