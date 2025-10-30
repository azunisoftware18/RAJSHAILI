import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== Fetch Settings from API =====
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("${import.meta.VITE_API_URL}/settings");
        setSettings(res.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // ===== Animation Variants =====
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (loading) {
    return (
      <div className="bg-slate-900 text-slate-300 py-10 text-center">
        <p>Loading footer...</p>
      </div>
    );
  }

  return (
    <motion.footer
      className="bg-slate-900 text-slate-300 py-16 sm:py-20"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={footerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Column 1: Logo, Description, Contact */}
          <motion.div variants={columnVariants} className="md:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <a href="/">
                {settings?.companyLogo ? (
                  <img
                    src={`${import.meta.VITE_API_URL}/uploads/${settings.companyLogo}`}
                    alt={settings.companyName}
                    className="h-10 w-auto filter brightness-0 invert"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.outerHTML = `<span class="text-2xl font-bold text-white">${settings.companyName}</span>`;
                    }}
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">{settings?.companyName || "RAJSHAILI"}</span>
                )}
              </a>
            </div>

            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Blending the wisdom of ancient traditions with modern science to create a holistic path for knowledge, well-being, and harmony.
            </p>

            <a
              href={`tel:${settings?.phoneNumber || "+919983111110"}`}
              className="flex items-center text-sm font-medium text-slate-200 hover:text-white transition-colors group"
            >
              <Phone size={16} className="mr-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
              <span>Book a session: {settings?.phoneNumber || "+91 9983111110"}</span>
            </a>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={columnVariants}>
            <h3 className="font-semibold text-lg text-white mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="text-slate-400 hover:text-white hover:underline transition-colors">Home</a></li>
              <li><a href="/courses" className="text-slate-400 hover:text-white hover:underline transition-colors">Courses</a></li>
              <li><a href="/about" className="text-slate-400 hover:text-white hover:underline transition-colors">About</a></li>
            </ul>
          </motion.div>

          {/* Column 3: Support Links */}
          <motion.div variants={columnVariants}>
            <h3 className="font-semibold text-lg text-white mb-5">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/helpcare" className="text-slate-400 hover:text-white hover:underline transition-colors">Help Center</a></li>
              <li><a href="/contact" className="text-slate-400 hover:text-white hover:underline transition-colors">Contact Us</a></li>
              <li><a href="/privacypolicy" className="text-slate-400 hover:text-white hover:underline transition-colors">Privacy Policy</a></li>
              <li><a href="/testimonials" className="text-slate-400 hover:text-white hover:underline transition-colors">Community</a></li>
            </ul>
          </motion.div>

          {/* Column 4: Connect Links */}
          <motion.div variants={columnVariants}>
            <h3 className="font-semibold text-lg text-white mb-5">Connect</h3>
            <ul className="space-y-3 text-sm">
              {settings?.facebookUrl && (
                <li>
                  <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center text-slate-400 hover:text-white hover:underline transition-colors group">
                    <Facebook size={18} className="mr-3 text-slate-500 group-hover:text-blue-500 transition-colors" /> Facebook
                  </a>
                </li>
              )}
              {settings?.instagramUrl && (
                <li>
                  <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center text-slate-400 hover:text-white hover:underline transition-colors group">
                    <Instagram size={18} className="mr-3 text-slate-500 group-hover:text-pink-500 transition-colors" /> Instagram
                  </a>
                </li>
              )}
              {settings?.youtubeUrl && (
                <li>
                  <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center text-slate-400 hover:text-white hover:underline transition-colors group">
                    <Youtube size={18} className="mr-3 text-slate-500 group-hover:text-red-500 transition-colors" /> YouTube
                  </a>
                </li>
              )}
              {settings?.twitterUrl && (
                <li>
                  <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center text-slate-400 hover:text-white hover:underline transition-colors group">
                    <Linkedin size={18} className="mr-3 text-slate-500 group-hover:text-blue-400 transition-colors" /> LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-slate-700 mt-12 pt-8 text-center text-sm text-slate-500"
        >
          <p>
            &copy; {new Date().getFullYear()} {settings?.companyName || "Rajshaili Hub"}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
