import axios from 'axios';
import { useState } from 'react';
import RecipeList from './RecipeList';
import './RecipeSearch.css'; // Assuming we use RecipeSearch.css for styling

function RecipeSearch() {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // State to show/hide search history

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=54ec293cca554caebb7ad219199b9669&includeIngredients=${ingredients}&cuisine=${cuisine}&diet=${diet}`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert('Error fetching recipes. Please try again.');
    }
  };

  const handleSearch = () => {
    setSearchHistory((prevHistory) => [...new Set([...prevHistory, ingredients])]); // Add new search to history
    fetchRecipes();
  };

  const handleSelectHistory = (item) => {
    setIngredients(item); // Autofill the search bar with the selected history item
    setShowHistory(false); // Close the dropdown once selected
  };

  return (
    <div>
      <h1>Recipe Finder</h1>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          onFocus={() => setShowHistory(true)} // Show search history when the input is focused
          onBlur={() => setTimeout(() => setShowHistory(false), 100)} // Hide search history when the input loses focus, with a small delay to allow selection
        />

        {/* Search History Dropdown */}
        {showHistory && searchHistory.length > 0 && (
          <div className="search-history-dropdown">
            {searchHistory.map((item, index) => (
              <div
                key={index}
                className="search-history-item"
                onClick={() => handleSelectHistory(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}

        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">Select Cuisine</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="chinese">Chinese</option>
          <option value="indian">Indian</option>
        </select>

        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="">Select Diet</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="keto">Keto</option>
          <option value="paleo">Paleo</option>
        </select>

        <button onClick={handleSearch}>Search Recipes</button>
      </div>

      {/* Render the RecipeList component with recipes */}
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default RecipeSearch;
