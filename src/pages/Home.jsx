import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};
const getRecipesFromLocalStorage = () => {
  const recipesData = localStorage.getItem("recipes");
  return recipesData ? JSON.parse(recipesData) : [];
};
const Home = () => {
  const [user, setUser] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    setUser(storedUser);
    const storedRecipes = getRecipesFromLocalStorage();
    setRecipes(storedRecipes);
    storedRecipes.forEach((recipe, index) => {
      console.log(`Recipe ${index}:`, recipe);
    });
  }, []);
  const handleUserIconClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("recipes"); 
    setUser(null);
    setRecipes([]); 
    navigate("/signup");
  };
  if (!user) {
    return <div>Loading...</div>;
  }
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
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <main className={`p-4 ${darkTheme ? "text-white" : "text-gray-800"}`}>
        <h2
          className={`text-2xl font-bold mb-4 ${
            darkTheme ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Recipes
        </h2>
        {recipes.length === 0 ? (
          <p className={`${darkTheme ? "text-gray-300" : "text-gray-700"}`}>
            No recipe
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className={`rounded-lg shadow-md ${
                  darkTheme
                    ? "bg-gray-800 text-gray-200"
                    : "bg-white text-gray-800"
                } p-4`}
              >
                <img
                  src={recipe.imageUrls}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  onError={(e) => {
                    console.error("Image load error:", e);
                    e.target.src = "default-image-url.jpg";
                  }}
                />
                <h3
                  className={`text-xl font-bold mb-2 ${
                    darkTheme ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {recipe.title}
                </h3>
                <p
                  className={`text-gray-700 ${
                    darkTheme ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {recipe.method.substring(0, 100)}...
                </p>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className={`text-blue-500 hover:underline ${
                    darkTheme ? "text-blue-300" : "text-blue-500"
                  }`}
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
export default Home;