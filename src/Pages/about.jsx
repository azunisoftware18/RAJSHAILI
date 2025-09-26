import React from 'react';
import { Check } from 'lucide-react';
import { Link, HashRouter } from 'react-router-dom';

function About() {
  // NOTE: HashRouter is used here to allow Link components to work in a preview environment.
  // In your main application, you should remove this HashRouter if this component
  // is already inside another router (like BrowserRouter).
  return (
        <div className="bg-[#192A41] text-white">
        {/* Section 1: Dr. R. K. Tailor */}
        <section id="about-dr-tailor" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Meet <span className="text-yellow-400">Dr. R. K. Tailor</span>
                </h1>
                <p className="text-lg text-gray-300 mb-4">
                    Dr. R. K. Tailor stands as a visionary figure at the confluence of ancient wisdom and modern psychological science. As a distinguished academic and respected practitioner, he has dedicated his career of over 20 years to bridging this gap.
                </p>
                <p className="text-lg text-gray-300 mb-8">
                    Currently an Associate Professor at Manipal University Jaipur, he applies his unique interdisciplinary approach to shape a new generation of thinkers who are both intellectually sharp and spiritually grounded.
                </p>
                <Link to="/courses">
                    <button className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300 cursor-pointer">
                    Explore Our Courses
                    </button>
                </Link>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="bg-[#1F3A5A]/50 p-4 rounded-full shadow-2xl">
                        <img 
                            src="AboutImg/Gemini_Generated_Image_nbticbnbticbnbti-removebg-preview (1).png" 
                            alt="Dr. R. K. Tailor" 
                            className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-yellow-400/50" 
                        />
                    </div>
                </div>
            </div>
            </div>
        </section>

        {/* Section 2: Shalini Salecha */}
        <section id="about-shalini" className="py-16 md:py-24 bg-[#1F3A5A]/30">
            <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Meet <span className="text-yellow-400">Dr.Shalini Salecha</span>
                </h1>
                <p className="text-lg text-gray-300 mb-4">
                    Shalini Salecha is a distinguished and well-regarded voice in Vedic Astrology and Vastu Shastra. Based in Jaipur, she is a trusted consultant for those seeking clarity and direction.
                </p>
                <p className="text-lg text-gray-300 mb-8">
                    Known for her welcoming and highly professional approach, her consultations provide deep, actionable wisdom that empowers clients to make informed decisions and transform their spaces and lives.
                </p>
                <Link to="/contact">
                    <button className="border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 cursor-pointer">
                    Request a Consultation
                    </button>
                </Link>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="bg-[#192A41]/50 p-4 rounded-full shadow-2xl">
                        <img 
                            src="AboutImg/Gemini_Generated_Image_ukkt42ukkt42ukkt.png" 
                            alt="Shalini Salecha" 
                            className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-yellow-400/50" 
                        />
                    </div>
                </div>
            </div>
            </div>
        </section>

        {/* Section 3: Awards */}
        <section id="awards" className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12">
                Awards & <span className="text-yellow-400">Accolades</span>
            </h2>
            <div className="bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-blue-800/50 shadow-lg flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 flex justify-center">
                <img 
                    src="AboutImg/all-img.jpeg" 
                    alt="Awards Trophy" 
                    className="rounded-lg shadow-xl w-full max-w-md"
                />
                </div>
                <div className="w-full md:w-1/2">
                <ul className="space-y-4 text-left text-lg text-gray-200">
                    {[
                    "Achaarya Upadhi (2018) – Akhil Bhartiya Prachya Jyotish Shod Sansthan",
                    "Jyotish Praveen Award (2018) – Chaturth International Mahasammelan",
                    "Astrology Excellence (2018) – HNN 27*4 Channel, New Delhi",
                    "Bhrigru Rishi Upadhi (2019) – Akhil Bhartiya Jyotish Sansthan Sangh",
                    "Vedang Bhushan Upadhi (2019) – Akhil Bhartiya Prachya Jyotish Shod Sansthan",
                    "Saraswat Samman (2019) – Rajkiya Maharaj Achaarya Sanskrit Mahavidyalaya"
                    ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                        <Check className="mr-3 h-6 w-6 text-yellow-400 flex-shrink-0" />
                        <span>{item}</span>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            </div>
        </section>
        </div>
  );
}

 export default About;

