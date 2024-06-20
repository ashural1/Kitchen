import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.email || !storedUser.password) {
      navigate("/signup" && "/login");
    }
  }, [navigate]);
  const handleLogin = () => {
    if (!email.trim()) {
      return toast.error("Email is required");
    }
    if (!validateEmail(email)) {
      return toast.error("Invalid email format");
    }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } else {
      toast.error("Invalid credentials");
    }
  };
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 text-white p-2 rounded mt-4"
        >
          Login
        </button>
        <button className="w-full bg-black text-white p-2 rounded mt-4">
          Google
        </button>
        <button
          className="w-full bg-pink-500 text-white p-2 rounded mt-4"
          onClick={() => navigate("/signup")}
        >
          Create an account
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;