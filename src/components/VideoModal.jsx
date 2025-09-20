// VideoTestimonials.jsx
import React, { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

const testimonials = [
  {
    name: "Atul Kapur",
    title: "MD - SKOAA Overseas LLP",
    image:
      "https://cdn.prod.website-files.com/6502992df70717be21112efc/6533b9e2694c7dea02ea5c3c_Screenshot%202023-10-21%20at%205.15.10%20PM.png",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    name: "Karan Dogra",
    title: "MD - Akshay Home Solutions",
    image:
      "https://cdn.prod.website-files.com/6502992df70717be21112efc/6533bafe6a9176ae6b511367_Screenshot%202023-10-21%20at%205.20.01%20PM.png",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    name: "Manoj Bansal",
    title: "MD - Sky Decor Laminates",
    image:
      "https://cdn.prod.website-files.com/6502992df70717be21112efc/6533bb4d515cf73360790e38_Screenshot%202023-10-21%20at%205.20.57%20PM.png",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    name: "Sharad Nangla",
    title: "Director - Hearth N Home",
    image:
      "https://cdn.prod.website-files.com/6502992df70717be21112efc/6533bb4d383c4338fb4cc619_Screenshot%202023-10-21%20at%205.21.23%20PM.png",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    name: "Shikha Mishra",
    title: "Founder - Axon Surfaces",
    image:
      "https://cdn.prod.website-files.com/6502992df70717be21112efc/6533bbcbcb7b49b9d9bf4210_Screenshot%202023-10-21%20at%205.22.49%20PM.png",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    name: "Shruti Maheshwari",
    title: "Architect",
    image:
      "https://cdn.prod.website-files.com/6502992df70717be21112efc/6533bbcc17daafaf29bbaacb_Screenshot%202023-10-21%20at%205.23.27%20PM.png",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

export default function VideoCard() {
  const [openVideo, setOpenVideo] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mx-10 my-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative w-full rounded-3xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 md:h-80"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <FaPlayCircle
                className="h-16 w-16 text-white cursor-pointer transition-transform duration-300 hover:scale-125"
                onClick={() => setOpenVideo(testimonial.video)}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/40 to-transparent text-white">
              <h3 className="text-xl font-bold">{testimonial.name}</h3>
              <p className="text-sm font-medium">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Video Modal */}
      {openVideo && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
          onClick={() => setOpenVideo(null)} // 🔹 Background click = close video
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()} // 🔹 Prevent close when clicking inside video box
          >
            <video
              src={openVideo}
              controls
              autoPlay
              className="w-screen md:h-[66.5vh] h-[50vh] object-contain"  
            />
          </div>
        </div>
      )}
    </div>
  );
}
