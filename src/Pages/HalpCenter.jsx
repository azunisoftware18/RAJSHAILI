import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // API call ke liye
import { Phone, Mail, MessageCircle, Facebook, Twitter, Instagram, Youtube, Loader2, AlertCircle } from 'lucide-react'; // Loading aur Error icons
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// API URL (wahi hai)
const API_URL = "http://localhost:3000/api/settings";

// --- Naya 3D Tilt Card Component (Dark Theme) ---
const TiltContactCard = ({ icon, label, value, link }) => {
    const cardRef = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 120, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 120, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    // Parallax transforms
    const iconX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
    const iconY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);
    const textX = useTransform(mouseXSpring, [-0.5, 0.5], ["-5px", "5px"]);
    const textY = useTransform(mouseYSpring, [-0.5, 0.5], ["-5px", "5px"]);
    const valueX = useTransform(mouseXSpring, [-0.5, 0.5], ["-2px", "2px"]);
    const valueY = useTransform(mouseYSpring, [-0.5, 0.5], ["-2px", "2px"]);

    // Glow effect
    const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "200%"]);
    const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "200%"]);

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

    const cardVariant = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <motion.a
            ref={cardRef}
            href={link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            // FIX: Card colors ko dark theme ke liye update kiya
            className="relative bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl p-6 text-center group border border-blue-800/50 transition-all duration-300 hover:border-yellow-500/50 block shadow-lg hover:shadow-xl"
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={cardVariant} // Entry animation
        >
            {/* Background Gradient Glow (Hover Par) */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    // FIX: Glow color ko yellow kiya
                    background: `radial-gradient(400px circle at var(--glow-x) var(--glow-y), rgba(250, 204, 21, 0.15), transparent 60%)`,
                    transform: "translateZ(-20px)", // Peeche rakha
                    '--glow-x': glowX,
                    '--glow-y': glowY,
                }}
            />

            {/* Icon (3D) */}
            <motion.div
                style={{ x: iconX, y: iconY, transform: "translateZ(60px)" }} // Sabse aage
                // FIX: Icon color ko yellow kiya
                className="text-4xl text-yellow-400 mb-4 inline-block"
            >
                {icon}
            </motion.div>
            
            {/* Label (3D) */}
            <motion.h4
                style={{ x: textX, y: textY, transform: "translateZ(40px)" }} // Beech mein
                // FIX: Text color ko white kiya
                className="text-lg font-bold text-white mb-1"
            >
                {label}
            </motion.h4>
            
            {/* Value (3D) */}
            <motion.p
                style={{ x: valueX, y: valueY, transform: "translateZ(20px)" }} // Thoda peeche
                // FIX: Text color ko light kiya aur hover par yellow
                className="text-sm text-slate-300 group-hover:text-yellow-400 transition-colors truncate"
            >
                {value || "Not Set"}
            </motion.p>
        </motion.a>
    );
};

// Helper function (koi badlav nahi)
const getHandle = (url) => {
    if (!url || url === '#') return "Not Set";
    try {
        if (url.includes("instagram.com") || url.includes("facebook.com") || url.includes("twitter.com")) {
            const parts = url.split('/');
            const handle = parts.pop() || parts.pop();
            return handle ? `@${handle}` : "View Profile";
        }
        if (url.includes("youtube.com/@")) {
            const handle = url.split('/@')[1];
            return `@${handle}`;
        }
    } catch (e) {
        console.error("Could not parse URL handle:", e);
    }
    return "View Profile";
};

// Animation variants poore section ke liye
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.1, // Ek ke baad ek items
            delayChildren: 0.2
        } 
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};


// Main HelpCare Page Component
export default function HelpCare() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(API_URL);
        setSettings(res.data || {});
      } catch (err) {
        console.error("Error fetching settings:", err);
        if (err.message === "Network Error") {
          setError("Cannot connect to server. Please ensure the backend is running.");
        } else {
          setError("Failed to load settings data.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // --- Loading State (Dark Theme) ---
  if (loading) {
    return (
      <div className="bg-[#192A41] min-h-screen p-8 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-16 h-16 animate-spin text-yellow-400" />
        <span className="mt-4 text-2xl font-semibold">Loading Support...</span>
      </div>
    );
  }

  // --- Error State (Dark Theme) ---
  if (error) {
    return (
      <div className="bg-[#192A41] min-h-screen p-8 flex items-center justify-center text-white">
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-3xl font-bold mb-2">Error</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  // --- Success State (Data Loaded - Dark Theme) ---
  return (
    // FIX: Background ko dark kiya
    <div className="bg-[#192A41] min-h-screen py-16 sm:py-24 px-4 sm:p-6 lg:p-8 flex justify-center " style={{ perspective: "1500px" }}>
      <motion.div 
        className="max-w-6xl mx-auto w-full"
        variants={sectionVariants} // Poore section par animation lagaya
        initial="hidden"
        animate="visible"
      >
        
        <motion.div variants={itemVariants} className="text-center mb-16 pt-20">
          {/* FIX: Text colors ko white kiya */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Help & Support
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out to us through any of the channels below.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Get in <span className="text-yellow-400">Touch</span>
          </h2>
          {/* Card grid ke liye staggering animation */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={sectionVariants} // Grid ke andar bhi staggering
          >
            <TiltContactCard 
              icon={<Phone />} 
              label="Phone Number" 
              value={settings?.phoneNumber || "Not Set"} 
              link={settings?.phoneNumber ? `tel:${settings.phoneNumber}` : "#"} 
            />
            <TiltContactCard 
              icon={<Mail />} 
              label="Email Address" 
              value={settings?.emailAddress || "Not Set"} 
              link={settings?.emailAddress ? `mailto:${settings.emailAddress}` : "#"} 
            />
            <TiltContactCard 
              icon={<MessageCircle />} 
              label="WhatsApp" 
              value={settings?.whatsappNumber || "Not Set"} 
              link={settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}` : "#"} 
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Connect With <span className="text-yellow-400">Us</span>
          </h2>
          {/* Card grid ke liye staggering animation */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={sectionVariants} // Grid ke andar bhi staggering
          >
            <TiltContactCard 
              icon={<Facebook />} 
              label="Facebook" 
              value={getHandle(settings?.facebookUrl)} 
              link={settings?.facebookUrl || "#"} 
            />
            <TiltContactCard 
              icon={<Twitter />} 
              label="Twitter" 
              value={getHandle(settings?.twitterUrl)} 
              link={settings?.twitterUrl || "#"} 
            />
            <TiltContactCard 
              icon={<Instagram />} 
              label="Instagram" 
              value={getHandle(settings?.instagramUrl)} 
              link={settings?.instagramUrl || "#"} 
            />
            <TiltContactCard 
              icon={<Youtube />} 
              label="YouTube" 
              value={getHandle(settings?.youtubeUrl)} 
              link={settings?.youtubeUrl || "#"} 
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

