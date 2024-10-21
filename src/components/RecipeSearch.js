import axios from 'axios';
import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import RecipeDetails from './RecipeDetails';
import './RecipeSearch.css';

function RecipeSearch() {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]); // State for favorites

  // Load favorites from local storage on component mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=54ec293cca554caebb7ad219199b9669&includeIngredients=${ingredients}&cuisine=${cuisine}&diet=${diet}`
      );

      const detailedRecipesPromises = response.data.results.map(async (recipe) => {
        const recipeResponse = await axios.get(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=54ec293cca554caebb7ad219199b9669`
        );
        return recipeResponse.data;
      });

      const detailedRecipes = await Promise.all(detailedRecipesPromises);
      setRecipes(detailedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert('Error fetching recipes. Please try again.');
    }
  };

  const handleSelectRecipe = (recipe) => {
    console.log('Selected Recipe:', recipe);
    setSelectedRecipe(recipe);
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null);
  };

  const handleSearch = () => {
    if (ingredients.trim() === '') {
      alert('Please enter ingredients before searching.');
      return;
    }

    setSearchHistory((prevHistory) => {
      const newHistory = [...new Set([...prevHistory, ingredients])];
      return newHistory;
    });
    fetchRecipes();
  };

  const handleSelectHistory = (item) => {
    setIngredients(item);
    setShowHistory(false);
  };

  const toggleFavorite = (recipe) => {
    const newFavorites = favorites.includes(recipe.id)
      ? favorites.filter((id) => id !== recipe.id)
      : [...favorites, recipe.id];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Save to local storage
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
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 100)}
        />
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

      {selectedRecipe ? (
        <RecipeDetails 
          recipe={selectedRecipe} 
          onClose={handleCloseDetails} 
          onToggleFavorite={toggleFavorite} // Pass the toggle function
          isFavorite={favorites.includes(selectedRecipe.id)} // Check if it's a favorite
        />
      ) : (
        <RecipeList recipes={recipes} onSelectRecipe={handleSelectRecipe} />
      )}
    </div>
  );
}

export default RecipeSearch;
