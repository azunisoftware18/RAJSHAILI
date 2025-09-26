import React, { useState } from 'react';
import { User, Mail, MessageSquare, Phone } from 'lucide-react';

export default function ContactForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }
    
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      subject: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#192A41] text-white">
      {/* Header Section */}
      <div className="relative h-80 flex flex-col justify-center items-center text-center px-4">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#192A41] to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            We are here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>
      </div>

      {/* Main Content: Form Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-24">
        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className="bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl p-8 border border-blue-800/50 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name*"
                  className="w-full bg-blue-900/30 border border-blue-800/50 rounded-lg py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address*"
                  className="w-full bg-blue-900/30 border border-blue-800/50 rounded-lg py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number*"
                  className="w-full bg-blue-900/30 border border-blue-800/50 rounded-lg py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <div className="relative">
                 <textarea
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full bg-blue-900/30 border border-blue-800/50 rounded-lg py-3 px-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

