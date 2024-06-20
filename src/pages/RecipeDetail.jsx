import  { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};
const getRecipesFromLocalStorage = () => {
  const recipesData = localStorage.getItem("recipes");
  return recipesData ? JSON.parse(recipesData) : [];
};
const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    setUser(storedUser);
    const recipes = getRecipesFromLocalStorage();
    const foundRecipe = recipes.find((r) => r.id === parseInt(id, 10));
    setRecipe(foundRecipe);
  }, [id]);
  const handleUserIconClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  if (!recipe || !user) {
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
                <li
                  className={`px-4 py-2 cursor-pointer ${
                    location.pathname === "/home" ? "bg-black text-white" : ""
                  }`}
                >
                  <Link to="/home">Home</Link>
                </li>
                <li
                  className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                    location.pathname === "/create-recipe"
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
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
      <div className="p-8">
        <div
          className={`max-w-2xl mx-auto ${
            darkTheme ? "bg-gray-800 text-white" : "bg-white"
          } p-6 rounded-lg shadow-md`}
        >
          <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>
          <img
            src={recipe.imageUrls}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Ingredients</h3>
          <ul
            className={`list-disc pl-5 mb-4 ${
              darkTheme ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3 className="text-xl font-bold mb-2">Cooking time</h3>
          <p
            className={`mb-4 ${darkTheme ? "text-gray-300" : "text-gray-700"}`}
          >
            {recipe.cookingTime} minutes
          </p>
          <h3 className="text-xl font-bold mb-2">Method</h3>
          <p
            className={`mb-4 ${darkTheme ? "text-gray-300" : "text-gray-700"}`}
          >
            {recipe.method}
          </p>
          <Link to="/home" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RecipeDetail;