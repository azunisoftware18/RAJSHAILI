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
    image: "https://cdn.pixabay.com/video/2024/02/04/199293-909903179_tiny.jpg"
  },
  {
    id: 2,
    title: "Learn Vedic Astrology Part 2",
    instructor: "Janet M",
    rating: "4.7",
    reviews: "(1,500)",
    price: "₹529",
    originalPrice: "₹2,959",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzWLyzx28hbVyetjWy7RZ5FHwBpZyBStACjw&s"
  },
  {
    id: 3,
    title: "Learn Vedic Astrology Part 3",
    instructor: "Janet M",
    rating: "4.7",
    reviews: "(397)",
    price: "₹529",
    originalPrice: "₹2,959",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-0icRuaplwH9NH5Jq7rilS5IXDNlfn-Yuw&s"
  },
  {
    id: 4,
    title: "Learn Vedic Astrology Part 4",
    instructor: "Janet M",
    rating: "4.8",
    reviews: "(2,800)",
    price: "₹569",
    originalPrice: "₹3,419",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV3s41rGEyABM7ozd_6OdcBcCJSCYygnhxwA&s"
  },
  {
    id: 5,
    title: "Learn Vedic Astrology Part 5",
    instructor: "Janet M",
    rating: "4.6",
    reviews: "(900)",
    price: "₹499",
    originalPrice: "₹2,499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQWD8cJ4pEDdaekyepnfcwF5ORBbaiG8ggQ&s"
  },
  {
    id: 6,
    title: "Learn Vedic Astrology Part 6",
    instructor: "Janet M",
    rating: "4.7",
    reviews: "(1,200)",
    price: "₹529",
    originalPrice: "₹2,959",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4FF8JuNq9EgYSzHx_VM9fHIWgAekgGq2Izg&s"
  },
];

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">    

      <h1 className="text-4xl font-bold text-center mb-8 mt-10">Astrology Courses</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {courses.map(course => (
          <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img 
              src={course.image}
              alt="Course"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{course.title}</h2>
              <p className="text-gray-600 mb-2">{course.instructor}</p>
              <div className="flex items-center mb-2">
                <span className="font-semibold text-orange-500">{course.rating}</span>
                <Star className="w-4 h-4 text-orange-500 ml-1" />
                <span className="text-gray-500 ml-2">{course.reviews}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-lg">{course.price}</span>{" "}
                <span className="line-through text-gray-500">{course.originalPrice}</span>
              </div>
              <div className="flex space-x-2 mt-3">
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded cursor-pointer">Premium</span>
                <span className="bg-teal-300 text-teal-800 text-xs px-2 py-1 rounded cursor-pointer">Bestseller</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
