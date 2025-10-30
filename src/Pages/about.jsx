import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // for smooth animation

function About() {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.VITE_API_URL}/about-get-all`);
        setAboutData(res.data);
      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getImageUrl = (imageUrl) =>
    imageUrl ? `${import.meta.VITE_API_URL}/${imageUrl}` : "";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#192A41] text-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const tailor = aboutData.find((d) => d.title?.includes("Tailor"));
  const shalini = aboutData.find((d) => d.title?.includes("Shalini"));
  const awards = aboutData.find((d) => d.title?.includes("Awards"));

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-[#192A41] text-white font-sans">
      {/* Section 1: Dr. R. K. Tailor */}
      {tailor && (
        <motion.section
          id="about-dr-tailor"
          className="py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-yellow-400 drop-shadow-lg">
                {tailor.title}
              </h1>
              <p className="text-lg text-gray-300 mb-8">{tailor.description}</p>
              <Link to="/courses">
                <button className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow-xl hover:bg-yellow-300 hover:scale-110 transition-transform duration-300 cursor-pointer glow">
                  Explore Our Courses
                </button>
              </Link>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="perspective">
                <motion.img
                  src={getImageUrl(tailor.imageUrl)}
                  alt={tailor.title}
                  className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-yellow-400/50 shadow-2xl"
                  whileHover={{ rotateY: 15, rotateX: 10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Section 2: Shalini */}
      {shalini && (
        <motion.section
          id="about-shalini"
          className="py-16 md:py-24 bg-[#1F3A5A]/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-yellow-400 drop-shadow-lg">
                {shalini.title}
              </h1>
              <p className="text-lg text-gray-300 mb-8">{shalini.description}</p>
              <Link to="/contact">
                <button className="border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 cursor-pointer glow">
                  Request a Consultation
                </button>
              </Link>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="perspective">
                <motion.img
                  src={getImageUrl(shalini.imageUrl)}
                  alt={shalini.title}
                  className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-yellow-400/50 shadow-2xl"
                  whileHover={{ rotateY: 15, rotateX: 10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Section 3: Awards */}
      {awards && (
        <motion.section
          id="awards"
          className="py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-12 text-yellow-400 drop-shadow-lg">
              {awards.title}
            </h2>
            <div className="bg-[#1F3A5A]/50 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-blue-800/50 shadow-2xl flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 flex justify-center perspective">
                <motion.img
                  src={getImageUrl(awards.imageUrl)}
                  alt={awards.title}
                  className="rounded-xl shadow-xl w-full max-w-md"
                  whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-lg text-gray-200 text-left">{awards.description}</p>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Glow button & card effect */}
      <style jsx>{`
        .glow {
          box-shadow: 0 0 15px rgba(255, 223, 0, 0.5);
        }
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

export default About;
