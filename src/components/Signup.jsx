import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    photoUrl: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSignup = () => {
    if (!user.username.trim()) {
      return toast.error("Username is required");
    }
    if (!validateUsername(user.username)) {
      return toast.error("Username should contain only letters and numbers");
    }
    if (!user.photoUrl.trim()) {
      return toast.error("Photo URL is required");
    }
    if (!validatePhotoUrl(user.photoUrl)) {
      return toast.error("Invalid photo URL format");
    }
    if (!user.email.trim()) {
      return toast.error("Email is required");
    }
    if (!validateEmail(user.email)) {
      return toast.error("Invalid email format");
    }
    if (!user.password.trim()) {
      return toast.error("Password is required");
    }
    if (!/^\d+$/.test(user.password)) {
      return toast.error("Password should only contain numbers");
    }
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Signup successful");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };
  const validateUsername = (username) => {
    return /^[a-zA-Z0-9]+$/.test(username);
  };
  const validatePhotoUrl = (photoUrl) => {
    return /^(http|https):\/\/[^ "]+$/.test(photoUrl);
  };
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleNavigateToLogin = () => {
    navigate("/login"); 
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <input
          type="text"
          name="username"
          placeholder="User name"
          value={user.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="text"
          name="photoUrl"
          placeholder="Photo URL"
          value={user.photoUrl}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-purple-500 text-white p-2 rounded mt-4"
        >
          Signup
        </button>
        <button className="w-full bg-black text-white p-2 rounded mt-4">
          Google
        </button>
        <button
          className="w-full bg-pink-500 text-white p-2 rounded mt-4"
          onClick={handleNavigateToLogin}
        >
          I have an account
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Signup;