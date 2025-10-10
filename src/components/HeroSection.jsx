import React, { useState, useEffect } from "react";
import { Link, HashRouter } from "react-router-dom"; 
import { User, Mail, Phone, MapPin, X, Loader2, Link as LinkIcon } from 'lucide-react';
import axios from "axios";

// Naya InteractiveCard Component (hover image fix)
// Naya InteractiveCard Component (hover image fix - FINAL)
const InteractiveCard = ({ coverImage, titleImage, characterImage }) => {
  return (
    <div
      className="group relative flex h-96 w-72 cursor-pointer items-end justify-center p-6
                 sm:h-[450px] sm:w-[350px] [perspective:2500px]"
    >
      {/* Cover Image (Base Layer) */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500
                   group-hover:shadow-[2px_35px_32px_-8px_rgba(0,0,0,0.75)]
                   group-hover:[transform:perspective(900px)_translateY(-5%)_rotateX(25deg)]
                   
                   before:absolute before:left-0 before:top-0 before:h-full before:w-full
                   before:bg-[linear-gradient(to_top,transparent_46%,rgba(12,13,19,0.5)_68%,rgba(12,13,19)_97%)]
                   before:opacity-0 before:transition-all before:duration-500 group-hover:before:opacity-100

                   after:absolute after:bottom-0 after:left-0 after:h-20 after:w-full
                   after:bg-[linear-gradient(to_bottom,transparent_46%,rgba(12,13,19,0.5)_68%,rgba(12,13,19)_97%)]
                   after:opacity-100 after:transition-all after:duration-500 group-hover:after:h-32"
      >
        <img
          src={coverImage}
          alt="Cover"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Character Image (Hover par visible hoga) */}
      <img
        src={characterImage}
        alt="Character"
        className="absolute inset-0 w-full h-full object-contain z-50 opacity-0 scale-90 
                   transition-all duration-700 ease-out 
                   group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-[-40px]"
      />

      {/* Title Image (Top Layer) */}
      <img
        src={titleImage}
        alt="Title"
        className="relative z-30 w-full transition-transform duration-500 ease-out 
                   group-hover:translate-y-[-60px]"
      />
    </div>
  );
};


// Custom CSS animations ke liye style tag
const CustomStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
    .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
    .animate-modal-scale-up { animation: scaleUp 0.4s ease-out forwards; }
    @keyframes scaleUp {
        from { transform: scale(0.9) translateY(10px); opacity: 0; }
        to { transform: scale(1) translateY(0); opacity: 1; }
    }
    .animate-spin-slow { animation: spin 10s linear infinite; }
    
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

// Registration Form Modal
const RegistrationModal = ({ onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', number: '', address: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid.";
        }
        if (!formData.number.trim()) {
            newErrors.number = "Phone number is required.";
        } else if (!/^\d{10}$/.test(formData.number)) {
            newErrors.number = "Phone number must be exactly 10 digits.";
        }
        if (!formData.address.trim()) newErrors.address = "Address is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await axios.post("https://api.raj-shaili.com/api/enrollment-create", formData);
            setIsSuccess(true); // Show success screen instead of closing
        } catch (error) {
            console.error("Submission failed:", error);
            alert("There was an error submitting your form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex overflow-hidden animate-modal-scale-up" onClick={(e) => e.stopPropagation()}>
                {/* Left Side */}
                <div className="w-2/5 bg-[#192A41] text-white p-8 hidden md:flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">RAJSHAILI</h2>
                    <p className="text-gray-300 mb-8">Discover the power of astrology and unlock the secrets of your destiny</p>
                    <img
                        src="hero-img/46992-removebg-preview.png" 
                        alt="Astrology Wheel"
                        className="object-contain w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg animate-spin-slow"
                    />
                </div>
                {/* Right Side */}
                <div className="w-full md:w-3/5 p-8 text-gray-800 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><X size={24}/></button>
                    
                    {isSuccess ? (
                        <div className="text-center flex flex-col justify-center h-full">
                            <h2 className="text-3xl font-bold mb-4 text-green-600">Registration Successful!</h2>
                            <p className="text-gray-600 mb-8">Thank you for enrolling. You can now join the meeting using the link below.</p>
                            <a 
                                href="https://meet.google.com/your-meeting-code-here" // Yahan apna Google Meet link daalein
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <LinkIcon size={20} /> Join Google Meet
                            </a>
                            <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:underline">Close</button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold mb-2">Enrollment now</h2>
                            <p className="text-gray-500 mb-6">Enter your information to enroll for the Rajshaili.</p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Fields */}
                                <div>
                                    <div className="relative"><input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} className={`w-full p-3 border rounded-lg pl-10 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} /><User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/></div>
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <div className="relative"><input type="email" name="email" placeholder="Your email" onChange={handleInputChange} className={`w-full p-3 border rounded-lg pl-10 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} /><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/></div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <div className="relative"><input type="tel" name="number" placeholder="Phone Number" onChange={handleInputChange} className={`w-full p-3 border rounded-lg pl-10 ${errors.number ? 'border-red-500' : 'border-gray-300'}`} maxLength={10}/><Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/></div>
                                    {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                                </div>
                                <div>
                                    <div className="relative"><input type="text" name="address" placeholder="Address" onChange={handleInputChange} className={`w-full p-3 border rounded-lg pl-10 ${errors.address ? 'border-red-500' : 'border-gray-300'}`} /><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/></div>
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>
                                
                                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-gray-400">
                                    {isSubmitting ? (<><Loader2 className="animate-spin mr-2" /> Submitting...</>) : 'Submit'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function HeroSection() {
  const [openVideo, setOpenVideo] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
        setOpenForm(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
        <section className="w-full overflow-hidden relative bg-[#192A41] p-5">
        <CustomStyles />
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between min-h-screen pt-20 md:pt-0">
            {/* Left Text */}
            <div className="w-full md:w-5/12 text-white text-center md:text-left px-4 md:px-8 z-10">
                <p className="mb-4 text-sm md:text-base font-semibold tracking-widest text-gray-400 opacity-0 animate-fadeInUp">ANCIENT WISDOM • MODERN CLARITY</p>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white opacity-0 animate-fadeInUp delay-200">
                    Rajshaili: The Institute of{" "}<span className="text-yellow-400">Divine Knowledge</span>
                </h1>
                <p className="text-base md:text-lg mb-8 font-light max-w-xl mx-auto md:mx-0 text-gray-300 opacity-0 animate-fadeInUp delay-400">
                    Bridging Vedic Astrology, Vastu & Mental Health with modern science to empower you with clarity, peace & purpose.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fadeInUp delay-600">
                    <Link to="/courses" className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 shadow-yellow-300/50 hover:scale-105 transition-all duration-300 cursor-pointer">
                        Explore Our Courses
                    </Link>
                    <button onClick={() => setOpenVideo(true)} className="flex items-center text-white font-semibold hover:text-yellow-400 transition-colors">
                        <FaPlayCircle className="mr-2 h-6 w-6" /> Watch Intro
                    </button>
                </div>
            </div>

            {/* Right Images */}
                <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fadeIn delay-400 mt-10 lg:mt-0">
                <InteractiveCard
                    coverImage="/hero-img/hero.png"
                    titleImage="/hero-img/name2.png"
                    characterImage="/hero-img/hero.png" 
                />
                <InteractiveCard
                    coverImage="/hero-img/Gemini_Generated_Image_v7qse5v7qse5v7qs-removebg-preview (1).png"
                    titleImage="/hero-img/name1.png"
                    characterImage="/hero-img/Gemini_Generated_Image_v7qse5v7qse5v7qs-removebg-preview (1).png"
                />
            </div>
        </div>

        {/* Video Modal */}
        {openVideo && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setOpenVideo(false)}>
                <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    <iframe className="w-full aspect-video rounded-xl" src="https://www.youtube.com/embed/AIJGPal3NM8?autoplay=1&rel=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        )}
        
        {/* Registration Modal */}
        {openForm && <RegistrationModal onClose={() => setOpenForm(false)} />}
        </section>
  );
}

