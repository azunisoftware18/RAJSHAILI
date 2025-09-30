import React from 'react';
import { Star } from 'lucide-react';

// Testimonials ke liye sample data
const testimonials = [
  {
    quote: "This course completely changed my perspective on Vastu. The blend of ancient science and modern psychology taught here is brilliant and highly effective. I feel much more confident in my practice now.",
    name: 'Priya Sharma',
    title: 'Interior Designer',
    avatar: 'https://placehold.co/100x100/FBBF24/192A41?text=PS',
    rating: 5,
  },
  {
    quote: "Dr. Tailor's teaching style is incredible. He makes the most complex concepts so easy to understand and apply. This is by far the best astrology course I have ever taken. Highly recommended!",
    name: 'Amit Kumar',
    title: 'Astrology Enthusiast',
    avatar: 'https://placehold.co/100x100/FBBF24/192A41?text=AK',
    rating: 5,
  },
  {
    quote: "The practical knowledge and hands-on approach of Rajshaili are unparalleled. The community support is amazing, and I've connected with so many like-minded people. A truly transformative experience.",
    name: 'Sunita Rao',
    title: 'Vastu Consultant',
    avatar: 'https://placehold.co/100x100/FBBF24/192A41?text=SR',
    rating: 5,
  },
   {
    quote: "I was skeptical at first, but this institute exceeded all my expectations. The curriculum is well-structured, and the integration of mental health concepts is a game-changer for modern practitioners.",
    name: 'Rahul Verma',
    title: 'Software Engineer',
    avatar: 'https://placehold.co/100x100/FBBF24/192A41?text=RV',
    rating: 4,
  },
];

// Star rating ke liye component
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill={i < rating ? 'currentColor' : 'none'}
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

// Har testimonial ke liye ek card
const TestimonialCard = ({ testimonial }) => (
  <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4 snap-center">
    <div className="bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col border border-blue-800/50 shadow-lg hover:shadow-yellow-500/10 transition-shadow duration-300">
      <div className="flex-grow">
        <p className="text-gray-300 italic leading-relaxed">"{testimonial.quote}"</p>
      </div>
      <div className="flex items-center mt-6 pt-6 border-t border-blue-800/50">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 border-2 border-yellow-400/50" />
        <div>
          <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.title}</p>
          <div className="mt-1">
            <StarRating rating={testimonial.rating} />
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default function Testimonials() {
  return (
    <section className="bg-[#192A41] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Words from Our <span className="text-yellow-400">Community</span>
          </h2>
          <p className="text-lg text-gray-400 mt-2">See what our students have to say about their journey with us.</p>
        </header>
        
        {/* Horizontal Scrollable Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 hide-scrollbar">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
       <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </section>
  );
}
