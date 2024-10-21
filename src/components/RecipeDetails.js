import React from 'react';
import './RecipeDetails.css';

function RecipeDetails({ recipe, onClose }) {
  const handleShare = (platform) => {
    const url = window.location.href; // Get the current page URL
    const title = recipe.title;
    const text = `Check out this recipe: ${recipe.title}`;
    const imageUrl = recipe.image;

    let shareUrl;

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank'); // Open the share URL in a new tab
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal__title">
          <h1>{recipe.title}</h1>
        </div>

        <img src={recipe.image} alt={recipe.title} />

        <h3>Ingredients:</h3>
        <ul>
          {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>

        <h3>Instructions:</h3>
        <p>{recipe.instructions ? recipe.instructions : 'No instructions available.'}</p>

        <h4>Ready in {recipe.readyInMinutes} minutes | Servings: {recipe.servings}</h4>

        <div className="recipe-actions">
          <button onClick={onClose}>Back to List</button>
          <div className="action-circle">
            <button className="circle-button">❤️</button>
            <button onClick={() => handleShare('facebook')} className="share-button facebook">F</button>
            <button onClick={() => handleShare('twitter')} className="share-button twitter">T</button>
            <button onClick={() => handleShare('pinterest')} className="share-button pinterest">P</button>
          </div>
        </div>

        <button onClick={onClose} className="link-2"></button>
      </div>
    </div>
  );
}

export default RecipeDetails;
