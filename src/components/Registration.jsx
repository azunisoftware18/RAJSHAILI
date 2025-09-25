import React from "react";

function RegistrationForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-500 p-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-teal-600 mb-6">
          • Registration Form •
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border-b-2 border-gray-200 focus:border-teal-500 outline-none py-2"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full border-b-2 border-gray-200 focus:border-teal-500 outline-none py-2"
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full border-b-2 border-gray-200 focus:border-teal-500 outline-none py-2"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full border-b-2 border-gray-200 focus:border-teal-500 outline-none py-2"
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full border-b-2 border-gray-200 focus:border-teal-500 outline-none py-2 pr-10"
            />
            <span className="absolute right-2 top-2 text-gray-400 cursor-pointer">
              👁
            </span>
          </div>

          {/* Checkbox */}
          <div className="flex items-start space-x-2 text-xs text-gray-500">
            <input type="checkbox" className="mt-1" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            CREATE ACCOUNT
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="#" className="text-teal-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;
