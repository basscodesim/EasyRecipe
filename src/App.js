import './App.css';  // Make sure this path is correct based on your project structure
import React, { useState } from 'react'; // Make sure useState is imported from React
import RecipeSearch from './components/RecipeSearch';

function App() {
  return (
    <div className="App">
      <RecipeSearch />
    </div>
  );
}

export default App;
