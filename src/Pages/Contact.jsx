import React, { useState } from 'react';
import { User, Mail, MessageCircle, Phone } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    alert('Message sent successfully!');
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      subject: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-200">
      {/* Header Section with Background Image */}
<div className="relative h-96 flex flex-col justify-center items-center text-white">
  {/* Background Image */}
  <img 
    src="https://media.istockphoto.com/id/1815784643/photo/zodiac-signs-inside-of-horoscope-circle-astrology-in-the-sky-with-many-stars-and-moons.jpg?s=612x612&w=0&k=20&c=OZzWDnmz3Zzrky_AGqJignpg0hoqumC753A9ySD7Jhs=" 
    alt="Background Pattern"
    className="absolute inset-0 w-full h-full object-cover"
  />
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b  to-[#650000]/80"></div>

  {/* Decorative geometric patterns overlay */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-yellow-300 rotate-45"></div>
    <div className="absolute top-20 right-20 w-24 h-24 border border-yellow-300 rotate-12"></div>
    <div className="absolute bottom-20 left-20 w-20 h-20 border border-yellow-300 rotate-45"></div>
  </div>

  {/* Header Content */}
  <div className="text-center z-10 px-4">
    {/* Top right menu icon */}
    <div className="absolute top-6 right-6">
      <div className="flex flex-col space-y-1">
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </div>
    </div>

    <div className="mb-8">
      <h1 className="text-4xl md:text-5xl font-light mb-2 tracking-wide">
        Dr. Vaishali Gupta
      </h1>
      <div className="flex items-center justify-center space-x-4">
        <div className="h-px bg-white w-12"></div>
        <p className="text-lg md:text-xl font-light tracking-widest">
          VASTU & ASTROLOGY
        </p>
        <div className="h-px bg-white w-12"></div>
      </div>
    </div>
    
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-light">
        Contact Us Now
      </h2>
    </div>
  </div>
</div>


      {/* Contact Form Section */}
      <div className="py-16 px-4" style={{ backgroundColor: '#F5F1EB' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center text-slate-600 mb-12 font-serif">
            Send Us Message Now
          </h2>

          <div className="space-y-4">
            {/* Full Name Input */}
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name*"
                className="w-full px-4 py-5 pr-12 text-gray-600 placeholder-gray-400 bg-white rounded-lg border border-gray-200 focus:border-orange-400 focus:outline-none shadow-sm text-base"
              />
              <User className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email*"
                className="w-full px-4 py-5 pr-12 text-gray-600 placeholder-gray-400 bg-white rounded-lg border border-gray-200 focus:border-orange-400 focus:outline-none shadow-sm text-base"
              />
              <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
            </div>

            {/* Phone Number Input */}
            <div className="relative">
            <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone no.*"
                className="w-full px-4 py-5 text-gray-600 placeholder-gray-400 bg-white rounded-lg border border-gray-200 focus:border-orange-400 focus:outline-none shadow-sm text-base"
            />
            <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
            </div>


            {/* Subject Input */}
            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                className="w-full px-4 py-5 pr-12 text-gray-600 placeholder-gray-400 bg-white rounded-lg border border-gray-200 focus:border-orange-400 focus:outline-none shadow-sm text-base"
              />
              <MessageCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full text-white font-semibold py-5 px-6 rounded-lg transition-all duration-300 text-lg tracking-wide"
                style={{ backgroundColor: '#CD8B76' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#B87A65'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#CD8B76'}
              >
                SEND MESSAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;