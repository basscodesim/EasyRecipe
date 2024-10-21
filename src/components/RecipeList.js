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

function RecipeList({ recipes, onSelectRecipe }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="recipe-card"
          onClick={() => onSelectRecipe(recipe)} // Handle click for the whole card
        >
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          <h2 className="recipe-title">{recipe.title}</h2>
          <p className="recipe-summary">{recipe.summary ? recipe.summary.replace(/<[^>]+>/g, '') : 'No summary available.'}</p>
          <div className="recipe-footer">
            <span>Ready in {recipe.readyInMinutes} mins</span> | <span>Servings: {recipe.servings}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
