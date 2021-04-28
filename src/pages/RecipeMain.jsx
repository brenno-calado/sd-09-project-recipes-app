import React, { useContext, useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import MealsAndDrinkContext from '../context/MealsAndDrinkContext';

const renderCards = (recipes) => {
  if (recipes.length === 0) {
    return;
  }
  return (recipes.map((recipe, index) => (
    <RecipeCard
      image={ recipe.strMealThumb }
      recipeName={ recipe.strMeal }
      index={ index }
      key={ index }
    />
  )));
};

function RecipeMain() {
  const { meals } = useContext(MealsAndDrinkContext);
  const [currentRecipes, setCurrentRecipes] = useState([]);
  useEffect(() => {
    const maxRecipes = 12;
    const recipes = meals ? meals.slice(0, maxRecipes) : [];
    setCurrentRecipes(recipes);
    console.log(recipes);
  }, [meals]);
  return (
    <div className="main-container">
      {renderCards(currentRecipes)}
    </div>
  );
}

export default RecipeMain;
