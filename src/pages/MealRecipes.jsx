import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const MealRecipes = () => {
  const [mealRecipes, setMealRecipes] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => {
        response.json()
          .then((data) => {
            setMealRecipes(data.meals);
          });
      });
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => {
        response.json()
          .then((data) => {
            setMealCategories(data.meals);
          });
      });
  }, []);

  const maxIndexRecipes = 11;
  const maxIndexCategories = 4;

  return (
    <div>
      { mealCategories.length > 0
        && mealCategories.map(({ strCategory }, index) => {
          if (index > maxIndexCategories) return;
          return (
            <button
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ strCategory }
            >
              { strCategory }
            </button>
          );
        }) }
      <h1>Receitas</h1>
      { mealRecipes.length > 0
        && mealRecipes.map((recipe, index) => {
          if (index > maxIndexRecipes) return;
          return (
            <RecipeCard
              key={ recipe.strMeal }
              img={ recipe.strMealThumb }
              title={ recipe.strMeal }
              index={ index }
            />
          );
        })}
    </div>

  );
};

export default MealRecipes;
