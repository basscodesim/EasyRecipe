import React from 'react';
import './RecipeCard.css'; // Ensure you have a CSS file for your card styles

function RecipeCard({ recipe, onClick }) {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <p>
        {recipe.summary
          ? recipe.summary.substring(0, 100) + '...' // Display only the first 100 characters
          : 'No summary available.'}
      </p>
      <p>Ready in {recipe.readyInMinutes} minutes | Servings: {recipe.servings}</p>
    </div>
  );
}

export default RecipeCard;
