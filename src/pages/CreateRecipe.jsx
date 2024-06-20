import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [imageUrls, setImageUrls] = useState([""]);
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const navigate = useNavigate();
  const handleUserIconClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  const addImageUrlInput = () => {
    setImageUrls([...imageUrls, ""]);
  };
  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newRecipe = {
      title,
      cookingTime,
      ingredients,
      imageUrls,
      method,
      id: Date.now(),
    };
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    localStorage.setItem("recipes", JSON.stringify([...recipes, newRecipe]));
    toast.success("Recipe added successfully!");
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 2000);
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  return (
    <div
      className={`min-h-screen ${
        darkTheme ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <header
        className={`flex justify-between items-center p-4 ${
          darkTheme ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <h1 className="text-xl font-bold">Kitchen app</h1>
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleUserIconClick}
          >
            <img
              src={user.photoUrl}
              alt={user.username}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span
              className={`font-medium ${
                darkTheme ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {user.username}
            </span>
          </div>
          {isDropdownVisible && (
            <div
              className={`absolute right-0 mt-2 w-48 ${
                darkTheme ? "bg-gray-800" : "bg-white"
              } border rounded-md shadow-lg`}
            >
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/home">Home</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <Link to="/create-recipe">Create recipe</Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={toggleTheme}
                >
                  {darkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div
        className={`min-h-screen ${
          darkTheme ? "bg-gray-900 text-white" : "bg-gray-100"
        } p-8`}
      >
        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            darkTheme ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Add New Recipe
        </h2>
        <form
          onSubmit={handleSubmit}
          className={`max-w-2xl mx-auto ${
            darkTheme ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-md`}
        >
          <div className="mb-4">
            <label
              className={`block ${
                darkTheme ? "text-gray-300" : "text-gray-700"
              } font-medium`}
            >
              Title:
            </label>
            <input
              type="text"
              className={`w-full p-2 border ${
                darkTheme ? "border-gray-700" : "border-gray-300"
              } rounded-md ${
                darkTheme ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your meal name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block ${
                darkTheme ? "text-gray-300" : "text-gray-700"
              } font-medium`}
            >
              Cooking time:
            </label>
            <input
              type="text"
              className={`w-full p-2 border ${
                darkTheme ? "border-gray-700" : "border-gray-300"
              } rounded-md ${
                darkTheme ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              placeholder="Enter preparation time of your meal"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block ${
                darkTheme ? "text-gray-300" : "text-gray-700"
              } font-medium`}
            >
              Ingredients:
            </label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  className={`w-full p-2 border ${
                    darkTheme ? "border-gray-700" : "border-gray-300"
                  } rounded-md ${
                    darkTheme
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  placeholder="Enter ingredients of meal"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 mt-2 bg-teal-500 text-white rounded-md"
              onClick={addIngredient}
            >
              +
            </button>
            {ingredients.length === 0 && (
              <p
                className={`text-gray-600 mt-2 ${
                  darkTheme ? "text-gray-300" : "text-gray-600"
                }`}
              >
                No ingredients yet
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className={`block ${
                darkTheme ? "text-gray-300" : "text-gray-700"
              } font-medium`}
            >
              Image URLs:
            </label>
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className="flex mb-2 items-center">
                <input
                  type="text"
                  className={`w-full p-2 border ${
                    darkTheme ? "border-gray-700" : "border-gray-300"
                  } rounded-md ${
                    darkTheme
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  value={imageUrl}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="Enter image URL"
                  required
                />
                <button
                  type="button"
                  className="ml-2 px-4 py-2 bg-teal-500 text-white rounded-md"
                  onClick={addImageUrlInput}
                >
                  +
                </button>
              </div>
            ))}
            {imageUrls.length === 0 && (
              <p
                className={`text-gray-600 mt-2 ${
                  darkTheme ? "text-gray-300" : "text-gray-600"
                }`}
              >
                No images yet
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className={`block ${
                darkTheme ? "text-gray-300" : "text-gray-700"
              } font-medium`}
            >
              Method:
            </label>
            <textarea
              className={`w-full p-2 border ${
                darkTheme ? "border-gray-700" : "border-gray-300"
              } rounded-md ${
                darkTheme ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="Enter method of meal"
              required
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className={`px-6 py-2 ${
                darkTheme ? "bg-blue-700" : "bg-blue-500"
              } text-white rounded-md`}
            >
              Apply
            </button>
            <button
              type="button"
              className={`px-6 py-2 ${
                darkTheme ? "bg-green-700" : "bg-green-500"
              } text-white rounded-md`}
            >
              Preview
            </button>
          </div>
        </form>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-2xl">Loading...</div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
export default CreateRecipe;