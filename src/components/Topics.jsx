import React, { useState, useEffect } from "react"; // Added useState and useEffect
import axios from "axios"; // Added axios
import { CheckCircle, Loader2, AlertCircle, BookOpen } from 'lucide-react';

// --- API URLs ---
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/home`;
const IMAGE_BASE_URL = `${import.meta.env.VITE_API_URL}`;

// Data remains the same
const ContentDataList = [
    "Vedic Vastu Foundations", "Scientific & Psychological Vastu", "The Vastu Purush Mandala",
    "45 Deities & Energy Mapping", "Psychology of the Directions", "Residential & Home Vastu",
    "Commercial & Business Vastu", "Industrial & Factory Vastu", "Vastu in Architectural Maps",
    "Ideal Room & Space Placement", "Dosha & Mahadosha Diagnosis", "Astro-Vastu Integration",
    "Predictive Vastu Techniques", "Ethical Remedies & Rituals", "Non-Destructive Dosha Correction",
    "Advanced Tools: Pyramid Vastu", "Vastu in Modern Construction", "Practical Case Studies & Ethics"
];

// Reusable Placeholder Component
const ImagePlaceholder = ({ text = "Loading Image...", error = false }) => (
    // Adjusted styling for the new layout
    <div className={`w-full h-full flex items-center justify-center rounded-2xl ${error ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-500'}`}>
        {error ? (
            <div className="text-center p-4">
                 <AlertCircle className="w-10 h-10 mx-auto mb-2" />
                <span>{text}</span>
            </div>
        ): (
             <div className="flex items-center gap-3 text-lg">
                 <Loader2 className="animate-spin w-6 h-6" />
                <span>{text}</span>
            </div>
        )}
    </div>
);

// New Topic Card Component
const TopicCard = ({ topic }) => (
    <div className="flex items-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 transform hover:scale-[1.03]">
        <CheckCircle className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
        <span className="text-base text-slate-700 font-medium">{topic}</span>
    </div>
);


export default function TopicsSection() { // Removed props
    // --- Added State for API data ---
    const [topicsImage, setTopicsImage] = useState(null);
    const [loadingImages, setLoadingImages] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    // --- Added useEffect to fetch data on mount ---
    useEffect(() => {
        const fetchTopicsData = async () => {
            setLoadingImages(true);
            setFetchError(null);
            try {
                const res = await axios.get(API_BASE_URL);
                if (res.data && res.data.length > 0) {
                    const latestData = res.data[0]; // Get the latest entry
                    // Use card1Image as requested
                    if (latestData.card1Image) {
                        setTopicsImage(`${IMAGE_BASE_URL}${latestData.card3Image}`);
                    } else {
                        setFetchError("Image 1 (card1Image) not found in the database.");
                    }
                } else {
                    setFetchError("No home data found from API.");
                }
            } catch (err) {
                console.error("Failed to fetch topics data:", err);
                if (err.message === "Network Error") {
                    setFetchError("Cannot connect to server. Is it running?");
                } else {
                    setFetchError("Failed to load image data.");
                }
            } finally {
                setLoadingImages(false);
            }
        };

        fetchTopicsData();
    }, []); // Empty array ensures this runs only once

    return (
        // Changed background, added padding
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-6xl mx-auto">
                 {/* Section Title */}
                 <div className="text-center mb-16">
                     <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                        What's Inside the Curriculum?
                    </h2>
                     <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Dive deep into the core concepts bridging ancient wisdom and modern applications.
                     </p>
                 </div>

                 {/* Image Container - Centered, Rounded */}
                <div className="w-full max-w-4xl mx-auto h-72 md:h-96 mb-16 rounded-2xl shadow-xl overflow-hidden border-4 border-white">
                    {loadingImages
                        ? <ImagePlaceholder />
                        : fetchError
                        ? <ImagePlaceholder text={fetchError} error={true} />
                        : (
                            <img
                                // Use state variable for the image source
                                src={topicsImage} 
                                alt="Rajshaili curriculum visual"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1000x500/cccccc/666666?text=Load+Error"; }}
                            />
                        )}
                </div>

                {/* Topics Grid using TopicCard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ContentDataList.map((topic, index) => (
                        <TopicCard key={index} topic={topic} />
                    ))}
                </div>
            </div>
        </section>
    );
}

