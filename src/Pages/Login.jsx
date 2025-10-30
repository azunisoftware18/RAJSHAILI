  import { useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";

  // ✅ Custom Status Message (for success/error toast)
  const StatusMessage = ({ message, type, onClose }) => {
    if (!message) return null;
    const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
    const title = type === "success" ? "Success!" : "Error!";
    return (
      <div
        className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl max-w-sm ${bgColor} text-white transition-all duration-300`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold">{title}</h4>
            <p className="text-sm mt-1">{message}</p>
          </div>
          <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
            &times;
          </button>
        </div>
      </div>
    );
  };

  export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    const isValidEmail = (email) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

    // 🔹 Register User
    const handleRegister = async (e) => {
      e.preventDefault();
      const { name, email, password, phoneNumber } = formData;

      if (!isValidEmail(email))
        return setStatus({ message: "Please enter a valid email.", type: "error" });
      if (!isValidPhone(phoneNumber))
        return setStatus({
          message: "Please enter a valid 10-digit phone number.",
          type: "error",
        });

      try {
        setLoading(true);
        await axios.post("${import.meta.env.VITE_API_URL}/register", {
          name,
          email,
          password,
          phoneNumber,
        });
        setLoading(false);
        setStatus({
          message: "🎉 Registered successfully! Please login.",
          type: "success",
        });
        setIsLogin(true);
        setFormData({ name: "", email: "", password: "", phoneNumber: "" });
      } catch (err) {
        setLoading(false);
        setStatus({
          message: err.response?.data?.error || "Registration failed ❌",
          type: "error",
        });
      }
    };

    // 🔹 Login User with Role Redirect
    const handleLogin = async (e) => {
      e.preventDefault();
      const { email, password } = formData;

      if (!isValidEmail(email))
        return setStatus({
          message: "Please enter a valid email address.",
          type: "error",
        });

      try {
        setLoading(true);
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          email,
          password,
        });
        setLoading(false);

        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setStatus({ message: "✅ Login successful!", type: "success" });

        // 🔥 Redirect based on role
        setTimeout(() => {
          if (user.role === "admin") navigate("/admin");
          else navigate("/");
        }, 1000);
      } catch (err) {
        setLoading(false);
        setStatus({
          message: err.response?.data?.error || "Login failed ❌",
          type: "error",
        });
      }
    };

    const formTitle = isLogin ? "Welcome Back!" : "Create Account";
    const buttonText = isLogin ? "SIGN IN" : "REGISTER";
    const toggleText = isLogin
      ? "Don't have an account?"
      : "Already have an account?";
    const toggleLinkText = isLogin ? "Sign Up" : "Sign In";

    return (
      <div className="flex h-screen w-full bg-[#1c1f30] font-sans">
        {/* ✅ Status Message */}
        <StatusMessage
          message={status?.message}
          type={status?.type}
          onClose={() => setStatus(null)}
        />

        {/* Left Side - Image */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <img
            src="https://astrology.tv/wp-content/uploads/2019/12/shutterstock_756180220-768x510.png"
            alt="Neon Background"
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1f30] via-transparent to-transparent opacity-90"></div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md text-white">
            <h1 className="text-4xl font-extrabold mb-2">{formTitle}</h1>
            <form
              onSubmit={isLogin ? handleLogin : handleRegister}
              className="space-y-6"
            >
              {/* Register Fields */}
              {!isLogin && (
                <>
                  <div>
                    <label className="text-gray-300 font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-transparent border-b-2 border-gray-700 focus:border-blue-500 outline-none rounded-t-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="10-digit number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-3 bg-transparent border-b-2 border-gray-700 focus:border-blue-500 outline-none rounded-t-lg text-white"
                      required
                    />
                  </div>
                </>
              )}

              {/* Common Fields */}
              <div>
                <label className="text-gray-300 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent border-b-2 border-gray-700 focus:border-blue-500 outline-none rounded-t-lg text-white"
                  required
                />
              </div>

              <div>
                <label className="text-gray-300 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-transparent border-b-2 border-gray-700 focus:border-blue-500 outline-none rounded-t-lg text-white"
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/30 disabled:opacity-50"
              >
                {loading ? "Loading..." : buttonText}
              </button>
            </form>

            {/* Toggle Form */}
            <div className="text-center mt-6 text-gray-400">
              {toggleText}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                  });
                  setStatus(null);
                }}
                className="text-blue-500 font-bold hover:text-blue-400 transition"
              >
                {toggleLinkText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
