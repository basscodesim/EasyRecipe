const saveToFavorites = (recipe) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(recipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  
  const getFavorites = () => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  };
  