// src/components/RecipeDetails.js
import React from 'react';
import './RecipeDetails.css'; // Inside RecipeDetails.js

function RecipeDetails({ recipe, onClose }) {
  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />

      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <p>{recipe.instructions ? recipe.instructions : 'No instructions available.'}</p>

      <h4>Ready in {recipe.readyInMinutes} minutes | Servings: {recipe.servings}</h4>

      <button onClick={onClose}>Back to List</button>
    </div>
  );
}

export default RecipeDetails;
