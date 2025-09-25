import React, { useState } from "react";
import { User, Lock, Mail, Phone } from "lucide-react";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    // Background video URL. Aap isey apne video URL se badal sakte hain.
    const backgroundVideoURL = "../../public/hero-img/199580-910653705.mp4";

    return (
        <div className="relative min-h-screen w-full">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={backgroundVideoURL} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

            {/* Form Content */}
            <div className="relative min-h-screen flex items-center justify-center p-4 z-20">
                {/* Glass Effect Box */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl w-full max-w-md p-8 text-white">
                    {/* Heading */}
                    <h2 className="text-3xl font-semibold text-center mb-6">
                        {isLogin ? "Login" : "Register"}
                    </h2>

                    {/* Form */}
                    <form className="space-y-4">
                        {/* If Register -> Name field */}
                        {!isLogin && (
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-5 pr-10 outline-none focus:ring-2 focus:ring-yellow-200 placeholder-gray-300"
                                />
                                <User className="absolute right-4 top-3.5 text-gray-300" size={20} />
                            </div>
                        )}

                        {/* If Register -> Email field */}
                        {!isLogin && (
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-5 pr-10 outline-none focus:ring-2 focus:ring-yellow-200 placeholder-gray-300"
                                />
                                <Mail className="absolute right-4 top-3.5 text-gray-300" size={20} />
                            </div>
                        )}
                        
                        {/* Phone Number Field (for Login and Register) */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Phone"
                                className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-5 pr-10 outline-none focus:ring-2 focus:ring-yellow-200 placeholder-gray-300"
                            />
                            <Phone className="absolute right-4 top-3.5 text-gray-300" size={20} />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-5 pr-10 outline-none focus:ring-2 focus:ring-yellow-200 placeholder-gray-300"
                            />
                            <Lock className="absolute right-4 top-3.5 text-gray-300" size={20} />
                        </div>
                        
                        {/* If Register -> Confirm Password */}
                        {!isLogin && (
                           <div className="relative">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-5 pr-10 outline-none focus:ring-2 focus:ring-yellow-200 placeholder-gray-300"
                            />
                            <Lock className="absolute right-4 top-3.5 text-gray-300" size={20} />
                        </div>
                        )}


                        {/* Remember + Forgot (Only for Login) */}
                        {isLogin && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="accent-purple-400 h-4 w-4" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-white text-red-700 font-semibold py-3 rounded-full hover:bg-purple-100 transition"
                        >
                            {isLogin ? "Login" : "Register"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm mt-6">
                        {isLogin ? (
                            <>
                                Don’t have an account?{" "}
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className="font-semibold hover:underline"
                                >
                                    Register
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className="font-semibold hover:underline"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

