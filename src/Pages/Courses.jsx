import React from 'react';
import { Star } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: "Learn Vedic Astrology Part 1",
    instructor: "Janet M",
    rating: "4.8",
    reviews: "(3,057)",
    price: "₹569",
    originalPrice: "₹3,419",
    image: "https://cdn.pixabay.com/video/2024/02/04/199293-909903179_tiny.jpg",
    isBestseller: false,
  },
  {
    id: 2,
    title: "Learn Vedic Astrology Part 2",
    instructor: "Janet M",
    rating: "4.7",
    reviews: "(1,500)",
    price: "₹529",
    originalPrice: "₹2,959",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzWLyzx28hbVyetjWy7RZ5FHwBpZyBStACjw&s",
    isBestseller: false,
  },
  {
    id: 3,
    title: "Learn Vedic Astrology Part 3",
    instructor: "Janet M",
    rating: "4.7",
    reviews: "(397)",
    price: "₹529",
    originalPrice: "₹2,959",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-0icRuaplwH9NH5Jq7rilS5IXDNlfn-Yuw&s",
    isBestseller: false,
  },
  {
    id: 4,
    title: "Learn Vedic Astrology Part 4",
    instructor: "Janet M",
    rating: "4.8",
    reviews: "(2,800)",
    price: "₹569",
    originalPrice: "₹3,419",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV3s41rGEyABM7ozd_6OdcBcCJSCYygnhxwA&s",
    isBestseller: false,
  },
  {
    id: 5,
    title: "Learn Vedic Astrology Part 5",
    instructor: "Janet M",
    rating: "4.6",
    reviews: "(900)",
    price: "₹499",
    originalPrice: "₹2,499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQWD8cJ4pEDdaekyepnfcwF5ORBbaiG8ggQ&s",
    isBestseller: false,
  },
  {
    id: 6,
    title: "Learn Vedic Astrology Part 6",
    instructor: "Janet M",
    rating: "4.7",
    reviews: "(1,200)",
    price: "₹529",
    originalPrice: "₹2,959",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4FF8JuNq9EgYSzHx_VM9fHIWgAekgGq2Izg&s",
    isBestseller: false,
  },
];

const CourseCard = ({ course }) => (
    <div className="bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl overflow-hidden border border-blue-800/50 shadow-lg group hover:shadow-yellow-500/10 hover:border-yellow-500/50 transition-all duration-300">
        <div className="overflow-hidden relative">
            <img 
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="p-5">
            {course.isBestseller && 
                <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">Bestseller</span>
            }
            <h2 className="text-xl font-bold text-white mb-1 truncate">{course.title}</h2>
            <p className="text-gray-400 text-sm mb-3">{course.instructor}</p>
            <div className="flex items-center mb-3">
                <span className="font-bold text-yellow-400">{course.rating}</span>
                <Star className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" />
                <span className="text-gray-500 text-sm ml-2">{course.reviews}</span>
            </div>
            <div className="mb-4">
                <span className="font-extrabold text-2xl text-white">{course.price}</span>{" "}
                <span className="line-through text-gray-500">{course.originalPrice}</span>
            </div>
            <button className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-md">
                Enroll Now
            </button>
        </div>
    </div>
);

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#192A41] py-10 px-4">
      <header className="text-center mb-12 mt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Our <span className="text-yellow-400">Astrology Courses</span>
        </h1>
        <p className="text-gray-400 mt-2 text-lg">Embark on a journey of cosmic discovery.</p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
