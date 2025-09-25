import React, { useState } from "react";

// Custom CSS animations ke liye style tag
const CustomStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; opacity: 0; }
      to { opacity: 1; opacity: 1; }
    }
    .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
    .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
    
    .opacity-0 { opacity: 0; }
    .delay-200 { animation-delay: 200ms; }
    .delay-400 { animation-delay: 400ms; }
    .delay-600 { animation-delay: 600ms; }
  `}</style>
);

// PlayCircle icon ke liye inline SVG
const FaPlayCircle = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
    >
        <path 
            fillRule="evenodd" 
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" 
            clipRule="evenodd" 
        />
    </svg>
);


export default function HeroSection() {
  const [openVideo, setOpenVideo] = useState(false);

  return (
    // Background updated to the new dark blue theme
    <section className="w-full overflow-hidden relative bg-[#192A41] p-5 md:h-200 h-260">
      <CustomStyles />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between min-h-screen pt-20 md:pt-0">
        {/* Left Text and Buttons */}
        <div className="flex-1 text-white text-center md:text-left px-4 md:px-8 z-10">
          <p className="mb-4 text-sm md:text-base font-semibold tracking-widest text-gray-400 opacity-0 animate-fadeInUp">
            ANCIENT WISDOM • MODERN CLARITY
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white opacity-0 animate-fadeInUp delay-200">
            Rajshaili: The Institute of{" "}
            <span className="text-yellow-400">Divine Knowledge</span>
          </h1>

          <p className="text-base md:text-lg mb-8 font-light max-w-xl mx-auto md:mx-0 text-gray-300 opacity-0 animate-fadeInUp delay-400">
            Bridging Vedic Astrology, Vastu & Mental Health with modern science to
            empower you with clarity, peace & purpose.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fadeInUp delay-600">
            <button className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300  shadow-yellow-300/50 hover:scale-105 transition-all duration-300 cursor-pointer">
              Explore Our Courses
            </button>
            <button 
              onClick={() => setOpenVideo(true)}
              className="flex items-center text-white font-semibold hover:text-yellow-400 transition-colors  animate-bounce"
            >
                <FaPlayCircle className="mr-2 h-6 w-6" /> Watch Intro
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center opacity-0 animate-fadeIn delay-400 mt-10 md:mt-0">
          <img
            src="/public/hero-img/hd-wallpaper-7742822_1920-removebg-preview.png" // Path ko yahan update karein
            alt="Shalini Salecha - Rajshaili Institute"
            className="object-contain w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg animate-spin-slow duration-600 hover:scale-110 hover:fill-yellow-600 hover:drop-shadow-lg hover:drop-shadow-yellow-600/50"
          />
        </div>
      </div>

      {/* Video Modal */}
      {openVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setOpenVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full aspect-video rounded-xl"
              src="https://www.youtube.com/embed/AIJGPal3NM8?autoplay=1&rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}

