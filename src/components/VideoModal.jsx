import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PlayCircle, X, Youtube, Loader2, Video } from "lucide-react";
// Import the hook for scroll animations
import { useInView } from 'react-intersection-observer';

// --- FIXED API DEFINITION ---
// Environment Variables for robust access
const API_BASE_URL = (typeof import.meta !== 'undefined' ? import.meta.env.VITE_API_URL : undefined) || "http://localhost:5000/api";
const VIDEO_ENDPOINT = `${API_BASE_URL}/videos`; // Correct, full endpoint for video list
// ----------------------------

// Animated Video Card Component
const AnimatedVideoCard = ({ video, onClick, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger animation once
    threshold: 0.1, // Trigger when 10% of the card is visible
  });

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&?]{11})/);
    if (ytMatch) return { type: "youtube", id: ytMatch[1] };
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return { type: "vimeo", id: vimeoMatch[1] };
    if (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg")) return { type: "file", url };
    return null;
  };

  const getYouTubeThumbnail = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  const embed = getEmbedUrl(video.URL);
  let previewContent;

  if (embed?.type === "file") {
    previewContent = <video src={embed.url} className="w-full h-full object-cover" muted loop playsInline />;
  } else if (embed?.type === "youtube") {
    previewContent = <img src={getYouTubeThumbnail(embed.id)} alt={video.Name} className="w-full h-full object-cover" />;
  } else if (embed?.type === "vimeo") {
    previewContent = <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-600">Vimeo Preview</div>;
  } else {
    previewContent = <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">Preview not available</div>;
  }

  // Calculate delay based on index for staggered effect
  const delay = index * 100; // 100ms delay between cards

  return (
    <div
      ref={ref}
      // Animation classes: Starts off-screen right (translate-x-5) and fades in (opacity-0)
      // When inView is true, it moves to translate-x-0 and opacity-100
      className={`bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden relative cursor-pointer group transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1
                  ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`} // translate-x-5 starts it slightly to the right
      style={{ transitionDelay: `${delay}ms` }} // Apply stagger delay
      onClick={() => onClick(video)}
    >
      <div className="aspect-video relative">
        {previewContent}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className="text-white w-16 h-16 group-hover:scale-110 transition-transform duration-300" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl text-slate-900 mb-1 truncate">{video.Name}</h3>
        <p className="text-sm text-slate-500 truncate">{video.profession || "No profession provided"}</p>
      </div>
    </div>
  );
};


export default function VideoManager() {
  const [videoList, setVideoList] = useState([]);
  const [viewVideo, setViewVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    setError("");
    try {
        // --- FIXED: Using the full, correct endpoint directly ---
      const res = await axios.get(VIDEO_ENDPOINT); 
      console.log("Fetched data:", res.data);
      // Assuming API returns { videos: [...] } or just [...]
      setVideoList(res?.data?.videos || res.data || []);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
      if (err.message === "Network Error") {
        setError("Failed to connect to the server. Please ensure the backend is running.");
      } else {
        setError("Could not load videos. Please try refreshing the page.");
      }
    } finally {
      setLoading(false);
    }
  };


  const getEmbedUrl = (url, autoplay = false) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&?]{11})/);
    if (ytMatch) return { type: "youtube", id: ytMatch[1], url: `https://www.youtube.com/embed/${ytMatch[1]}${autoplay ? "?autoplay=1&controls=1&rel=0" : "?controls=1&rel=0"}` };
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return { type: "vimeo", id: vimeoMatch[1], url: `https://player.vimeo.com/video/${vimeoMatch[1]}${autoplay ? "?autoplay=1" : ""}` };
    if (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg")) return { type: "file", url };
    return null;
  };

  return (
    <div className="w-full bg-white min-h-screen font-sans text-slate-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 flex items-center gap-4 text-slate-900">
          <Youtube size={48} className="text-red-500" /> Our Video Library
        </h1>

        {/* Display Error Message */}
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-md shadow-sm" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )}


        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
            <p className="ml-4 text-xl text-slate-600">Loading videos...</p>
          </div>
        ) : videoList?.length === 0 && !error ? ( // Show only if no error
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300 p-8">
            <Video size={64} className="mb-4 text-slate-400" />
            <p className="text-xl font-medium">No videos found yet.</p>
            <p className="text-md">Check back soon for new content!</p>
          </div>
        ) : !error && ( // Only render list if no error
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {Array.isArray(videoList) && videoList.length > 0 ? (
              videoList.map((video, index) => (
                <AnimatedVideoCard
                  key={video.id}
                  video={video}
                  onClick={setViewVideo}
                  index={index}
                />
              ))
           ) : (
             <div className="flex flex-col items-center justify-center h-64 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300 p-8">
               <Video size={64} className="mb-4 text-slate-400" />
               <p className="text-xl font-medium">No videos found yet.</p>
               <p className="text-md">Check back soon for new content!</p>
             </div>
           )}

          </div>
        )}

        {/* Video Modal */}
        {viewVideo && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-[100] transition-opacity duration-300 ease-in-out animate-fadeIn" // Increased z-index
            onClick={() => setViewVideo(null)}
          >
            <div
              className="rounded-2xl shadow-2xl max-w-4xl w-full relative bg-white border border-slate-200 p-4 sm:p-6 animate-modal-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 transition-colors z-10 bg-white/70 rounded-full p-1"
                onClick={() => setViewVideo(null)}
              >
                <X size={24} />
              </button>

              {(() => {
                const embed = getEmbedUrl(viewVideo.URL, true);
                if (!embed)
                  return (
                    <div className="flex flex-col items-center justify-center h-48 text-red-500">
                      <p className="text-lg font-semibold">Playback Error</p>
                      <p className="text-sm mt-1">Invalid or unsupported video URL.</p>
                    </div>
                  );

                if (embed.type === "file")
                  return (
                    <video
                      src={embed.url}
                      controls
                      autoPlay
                      className="w-full aspect-video rounded-lg shadow-inner bg-black" // Added bg-black for potential letterboxing
                    />
                  );

                return (
                  <iframe
                    src={embed.url}
                    title={viewVideo.Name}
                    className="w-full aspect-video rounded-lg shadow-inner bg-black" // Added bg-black
                    frameBorder="0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                );
              })()}
            </div>
            {/* Custom animation styles */}
            <style jsx global>{` // Use global for keyframes if not using Tailwind JIT/plugins
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes modal-scale-up {
                from { opacity: 0; transform: scale(0.9) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
              }
              .animate-fadeIn {
                animation: fadeIn 0.3s ease-out forwards;
              }
              .animate-modal-scale-up {
                animation: modal-scale-up 0.3s ease-out forwards;
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}