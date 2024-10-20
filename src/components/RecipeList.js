import { useState } from 'react';
import RecipeDetails from './RecipeDetails';
import axios from 'axios';
import './RecipeList.css'; // Inside RecipeList.js

// Function to fetch detailed recipe data from the API
const fetchRecipeDetails = async (recipeId, setError) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=54ec293cca554caebb7ad219199b9669`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    setError('There was an error fetching the recipe details. Please try again.'); // Set error message
  }
};

function RecipeList({ recipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(null); // New error state

  // Function to handle viewing full recipe details
  const handleViewRecipe = async (recipeId) => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Reset any previous error messages
    const fullRecipe = await fetchRecipeDetails(recipeId, setError);
    setSelectedRecipe(fullRecipe); // Set the detailed recipe as the selected recipe
    setLoading(false); // Set loading to false after fetching
  };

  return (
    <div className="recipe-list">
      {loading && <div className="spinner">Loading...</div>} {/* Loading spinner */}
      {error && <div className="error-message">{error}</div>} {/* Error message */}
      {selectedRecipe ? (
        <RecipeDetails recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      ) : (
        recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
              <button onClick={() => handleViewRecipe(recipe.id)}>View Recipe</button>
            </div>
          ))
        ) : (
          <p>No recipes found. Try searching with different ingredients.</p>
        )
      )}
    </div>
  );
}

export default RecipeList;
