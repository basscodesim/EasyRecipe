import './App.css';  // Ensure the path is correct based on your project structure
import React, { useState } from 'react';
import RecipeSearch from './components/RecipeSearch';  // Existing RecipeSearch component
import LoginForm from './components/LoginForm';        // Import the LoginForm component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to toggle login

  // Simulate login status update after form submission (or any authentication logic)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <RecipeSearch />   
      ) : (
        <LoginForm />     
      )}
    </div>
  );
}

export default App;
