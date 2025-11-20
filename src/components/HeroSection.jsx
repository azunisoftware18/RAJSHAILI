import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  X,
  Loader2,
  Link as LinkIcon,
  PlayCircle,
  AlertCircle
} from "lucide-react";
import axios from "axios";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// Environment Variables - FIXED
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || API_BASE_URL;

// Configure axios base URL
axios.defaults.baseURL = API_BASE_URL;

// 🌈 Custom Animations (CSS)
const CustomStyles = () => (
  <style>{`
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes modal-scale-up {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
    .animate-modal-scale-up { animation: modal-scale-up 0.4s cubic-bezier(0.165,0.84,0.44,1) forwards; }

    @keyframes float {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    .floating-orb { animation: float 6s ease-in-out infinite; }
    
    /* Shine animation for Glass Card Text */
    .shine {
      background: linear-gradient(90deg, #7f00ff, #e100ff, #00c6ff, #0072ff);
      background-size: 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shine 6s linear infinite;
    }
    @keyframes shine { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
  `}</style>
);

// --- Custom Typewriter Component ---
const CustomTypewriter = () => {
    const words = [
        "Institute of Divine Knowledge",
        "School of Vedic Wisdom",
        "Journey to Self Discovery",
    ];
    const [wordIndex, setWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typeSpeed = 220;
        const deleteSpeed = 120;
        const delaySpeed = 2000;
        let currentTimeout;

        const handleTyping = () => {
            const currentWord = words[wordIndex];
            let newText;
            let speed;

            if (isDeleting) {
                newText = currentWord.substring(0, displayedText.length - 1);
                speed = deleteSpeed;
            } else {
                newText = currentWord.substring(0, displayedText.length + 1);
                speed = typeSpeed;
            }
            
            setDisplayedText(newText);

            if (!isDeleting && newText === currentWord) {
                speed = delaySpeed;
                setIsDeleting(true);
            } else if (isDeleting && newText === "") {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
                speed = typeSpeed;
            }
            
            currentTimeout = setTimeout(handleTyping, speed);
        };

        currentTimeout = setTimeout(handleTyping, typeSpeed);

        return () => clearTimeout(currentTimeout);
    }, [displayedText, isDeleting, wordIndex]);

    return (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 text-purple-400"
            >
                |
            </motion.span>
        </span>
    );
};

// 🌟 Registration Modal
const RegistrationModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    number: "", 
    address: "" 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email required.";
    if (!/^\d{10}$/.test(formData.number)) newErrors.number = "10-digit phone required.";
    if (!formData.address.trim()) newErrors.address = "Address required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const res = await axios.post('/api/register', formData);

      if (res.data.success) {
        setIsSuccess(true);
      } else {
        alert(res.data.message || "An unknown error occurred.");
      }
    } catch (err) {
      console.error("Submission failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error submitting form. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden animate-modal-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hidden md:flex w-full md:w-2/5 bg-slate-900 p-8 flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-500 rounded-full opacity-30 blur-2xl floating-orb" /> 
          <div
            className="absolute -bottom-24 -right-10 w-64 h-64 bg-cyan-400 rounded-full opacity-30 blur-3xl floating-orb"
            style={{ animationDelay: "2s" }}
          />
          <h2 className="text-3xl font-bold text-white mb-4 z-10">RAJSHAILI</h2>
          <p className="text-slate-400 text-center mb-8 z-10">
            Unlock your destiny — begin your journey today.
          </p>
          <img
            src="/hero-img/46992-removebg-preview.png"
            alt="Astrology"
            className="w-64 h-64 object-contain z-10"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/256x256/1e293b/94a3b8?text=Astrology";
            }}
          />
        </div>

        <div className="w-full md:w-3/5 p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          {isSuccess ? (
            <div className="text-center flex flex-col justify-center h-full min-h-[300px]">
              <h2 className="text-3xl font-bold mb-4 text-emerald-600">
                Registration Successful!
              </h2>
              <p className="text-gray-600 mb-8">
                Thank you! You can now join the meeting.
              </p>
              <a
                href="https://meet.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
              >
                <LinkIcon size={20} /> Join Google Meet
              </a>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-2 text-slate-800">Enroll Now</h2>
              <p className="text-gray-500 mb-6">
                Enter your information to begin your journey.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: 'name', label: 'Name', icon: User },
                  { key: 'email', label: 'Email', icon: Mail },
                  { key: 'number', label: 'Phone Number', icon: Phone },
                  { key: 'address', label: 'Address', icon: MapPin }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon size={18} />
                      </span>
                      <input
                        name={key}
                        placeholder={label}
                        value={formData[key]}
                        onChange={handleChange}
                        type={key === 'email' ? 'email' : key === 'number' ? 'tel' : 'text'}
                        maxLength={key === 'number' ? 10 : undefined}
                        className={`w-full p-3 pl-10 bg-gray-100 border-2 rounded-lg text-black placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 transition-colors ${
                          errors[key] ? "border-red-500" : "border-transparent"
                        }`}
                      />
                    </div>
                    {errors[key] && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors[key]}
                      </p>
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Submitting...
                    </>
                  ) : (
                    "Submit & Enroll"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// 💎 Glass Image Card Dynamic
const GlassImageCard = ({ img1, img2 }) => { 
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const img1X = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const img1Y = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const img2X = useTransform(mouseXSpring, [-0.5, 0.5], ["15px", "-15px"]);
  const img2Y = useTransform(mouseYSpring, [-0.5, 0.5], ["10px", "-10px"]);

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[420px] bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-visible"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />
      
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        style={{ transform: "translateZ(60px)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0 }}
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold shine">
          RAJSHAILI INSTITUTE
        </h3>
        <p className="text-slate-300 mt-2 text-xs sm:text-sm md:text-base">
          Explore the Power of Vedic Knowledge
        </p>
      </motion.div>

      <motion.img
        src={img1}
        alt="Card 1"
        style={{ x: img1X, y: img1Y, transform: "translateZ(30px)" }}
        className="absolute -left-10 top-[-10%] w-36 md:w-44 h-auto object-contain rounded-2xl shadow-xl border border-white/20"
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = "https://placehold.co/192x256/334155/94a3b8?text=No+Image"; 
        }}
      />
      <motion.img
        src={img2}
        alt="Card 2"
        style={{ x: img2X, y: img2Y, transform: "translateZ(30px)" }}
        className="absolute -right-10 bottom-[-8%] w-36 md:w-44 h-auto object-contain rounded-2xl shadow-xl border border-white/20"
        onError={(e) => { 
          e.target.onerror = null; 
          e.target.src = "https://placehold.co/192x256/334155/94a3b8?text=No+Image"; 
        }}
      />
    </motion.div>
  );
};

// 🌟 Hero Section (Main Component)
export default function HeroSection() {
  const [openVideo, setOpenVideo] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [homeData, setHomeData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ FETCH DATA FROM BACKEND - FIXED
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try different endpoints based on your backend setup
        const endpoints = ['/api/home', '/home'];
        let response = null;
        
        for (const endpoint of endpoints) {
          try {
            response = await axios.get(endpoint);
            if (response.data) break;
          } catch (err) {
            console.log(`Tried ${endpoint}, failed:`, err.message);
          }
        }

        if (response && response.data) {
          setHomeData(response.data);
          console.log("Home data loaded:", response.data);
        } else {
          throw new Error("No data received from server");
        }
      } catch (err) {
        console.error("Failed to fetch home data", err);
        setError("Unable to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Helper to parse YouTube URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    let videoId = null;
    try {
      if (url.includes("youtube.com/watch?v=")) {
        videoId = new URL(url).searchParams.get("v");
      } else if (url.includes("youtu.be/")) {
        videoId = new URL(url).pathname.split('/')[1]?.split(/[?&]/)[0];
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
    } catch (e) {
      console.error("Error parsing video URL:", url, e);
    }
    return null;
  };

  // ✅ Prepare Data variables - FIXED
  const videoEmbedUrl = getYouTubeEmbedUrl(homeData?.videoUrl);
  
  // Construct full Image URLs (Backend returns relative path 'uploads/home/...')
  const card1ImgSrc = homeData?.card1Image 
    ? `${IMAGE_BASE_URL}/${homeData.card1Image}` 
    : "/hero-img/hero.png";

  const card2ImgSrc = homeData?.card2Image 
    ? `${IMAGE_BASE_URL}/${homeData.card2Image}` 
    : "/hero-img/Gemini_Generated_Image_v7qse5v7qse5v7qs-removebg-preview (1).png";

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#192A41] text-white overflow-hidden py-20">
      <CustomStyles />
      
      <motion.div
        className="absolute top-0 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"
        animate={{ scale: [1, 1.05, 1], x: [0, 10, 0], y: [0, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"
        animate={{ scale: [1, 0.95, 1], x: [0, -10, 0], y: [0, -5, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 px-6 gap-16">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="mb-4 text-sm font-semibold tracking-widest text-cyan-400 uppercase">
            Ancient Wisdom • Modern Clarity
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white">
            Rajshaili:{" "}
            <CustomTypewriter />
          </h1>
          <p className="text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0 text-slate-300">
            Bridging Vedic Astrology, Vastu & Mental Health with modern science
            to empower you with clarity, peace & purpose.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setOpenForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              Enroll Now
            </button>
            
            {/* Only show Watch Intro button if Video URL exists */}
            {videoEmbedUrl && (
              <button
                onClick={() => setOpenVideo(true)}
                className="flex items-center text-slate-200 font-semibold hover:text-white transition-colors group"
              >
                <PlayCircle className="mr-2 h-8 w-8 text-slate-400 group-hover:text-cyan-400" />
                Watch Intro
              </button>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center mt-16 lg:mt-0" style={{ perspective: '1000px' }}>
          {loading ? (
            <div className="flex items-center justify-center h-[400px] text-cyan-400">
              <Loader2 className="animate-spin" size={48} />
              <span className="ml-3">Loading content...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-red-400 p-6 bg-red-900/30 rounded-2xl border border-red-700">
              <AlertCircle className="w-12 h-12 mb-3"/>
              <span className="font-semibold text-center">{error}</span>
            </div>
          ) : (
            // Passing the fetched Image URLs here
            <GlassImageCard img1={card1ImgSrc} img2={card2ImgSrc} />
          )}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {openVideo && videoEmbedUrl && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenVideo(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="w-full h-full"
                src={videoEmbedUrl}
                title="YouTube player"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Modal */}
      <AnimatePresence>
        {openForm && <RegistrationModal onClose={() => setOpenForm(false)} />}
      </AnimatePresence>
    </section>
  );
}