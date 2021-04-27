import React from 'react';
import RecipeCard from '../components/RecipeCard';

function RecipeMain() {
  return (
    <div className="main-container">
      <RecipeCard
        image="https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        recipeName="Macarrão"
      />
    </div>
  );
}

export default RecipeMain;
