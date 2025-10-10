import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  // 🔹 Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Email validation
  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // ✅ Phone validation
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  // 🔹 Register
  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, phoneNumber } = formData;

    if (!isValidEmail(email)) {
      alert("Please enter a valid email (e.g. user@gmail.com)");
      return;
    }
    if (!isValidPhone(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/register", { name, email, password, phoneNumber });
      alert("🎉 Registered successfully! Please login.");
      setIsLogin(true);
      setFormData({ name: "", email: "", password: "", phoneNumber: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed ❌");
    }
  };

  // 🔹 Login with role-based redirect
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("✅ Login successful!");

      // Redirect by role
      if (user.role === "admin") navigate("/admin");
      else navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {isLogin ? "Login" : "Register"}
        </h2>

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Login
            </button>
            <p className="text-center text-gray-500 mt-3">
              Don’t have an account?{" "}
              <button type="button" onClick={() => setIsLogin(false)} className="text-green-500 font-semibold hover:underline">
                Register
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email (e.g. user@gmail.com)"
              className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number (10 digits)"
              className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
              Register
            </button>
            <p className="text-center text-gray-500 mt-3">
              Already have an account?{" "}
              <button type="button" onClick={() => setIsLogin(true)} className="text-blue-500 font-semibold hover:underline">
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
