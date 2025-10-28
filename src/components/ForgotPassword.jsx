import React, { useState } from 'react';
import { Mail, Loader2, ArrowLeft, X } from 'lucide-react'; 

// --- Custom Components ---

// Status Message Component (Replacing alert())
const StatusMessage = ({ message, type, onClose }) => {
    if (!message) return null;
             
    return (
        <div 
            className={`fixed top-5 right-5 p-4 rounded-lg shadow-xl text-white z-50 transition-transform duration-300 transform animate-fadeInUp ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ animationFillMode: 'forwards' }}
        >
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

// --- Main Component ---

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Mock navigation function (since react-router-dom is not available)
    const navigateTo = (path) => console.log(`Navigation Mock: Going to ${path}`);

    const showMessage = (text, type = 'success') => {
        setStatus({ message: text, type });
        setTimeout(() => setStatus({ message: '', type: '' }), 5000);
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            showMessage("Please enter a valid email address.", 'error');
            return;
        }

        setIsLoading(true);

        // --- Simulated API Call ---
        try {
            // Replace with actual axios.post('/api/forgot-password', { email });
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            showMessage(`Password reset link sent to ${email}! Check your inbox.`, 'success');
            setEmail(''); // Clear input after success

        } catch (error) {
            console.error("Forgot password error:", error);
            showMessage("Failed to send reset link. Please check your email or try again.", 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1c1f30] font-sans">
            {/* Custom Styles moved directly into the component's return */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp { animation: fadeInUp 0.4s ease-out forwards; }
                .animate-spin { animation: spin 1s linear infinite; }
            `}</style>
            
            <StatusMessage message={status.message} type={status.type} onClose={() => setStatus({ message: '', type: '' })} />

            {/* Main Container */}
            <div className="flex w-full max-w-5xl h-screen md:h-[600px] overflow-hidden rounded-xl shadow-2xl">
                
                {/* Left Side: Illustration for Forgot Password */}
                <div 
                    className="hidden md:flex md:w-1/2 bg-[#21253a] items-center justify-center p-8 relative overflow-hidden" // Changed background to fit theme
                >
                    {/* Placeholder for the main illustration */}
                    <div className="text-center">
                        <svg className="w-32 h-32 mx-auto text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6-6h6m6-6h-6m-6 0h6m-6 6h6m-6 6h6m6 0h-6m-6 0h6" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v4M12 2a10 10 0 100 20 10 10 0 000-20z" />
                        </svg>

                        <h1 className="text-3xl font-extrabold text-white mt-4">
                            Security First
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Enter your email. We'll send a secure link to recover your account.
                        </p>
                    </div>

                    {/* Faint background pattern/glow */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="1" fill="#4f46e5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#dots)" />
                        </svg>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 bg-[#2a2f4c] p-8 sm:p-12 text-white flex flex-col justify-center">
                    
                    <button 
                        onClick={() => navigateTo('/profile')} // Changed from /login to /profile
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Back to Profile
                    </button>

                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">
                        Reset Password
                    </h2>
                    <p className="text-gray-400 mb-8 text-sm">
                        Enter your registered email address to receive a password reset link.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-600 focus:border-blue-500 focus:outline-none py-3 text-white placeholder-gray-500 transition-colors pl-10"
                                    required
                                />
                                <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <><Loader2 className="animate-spin mr-2" /> Sending...</>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
