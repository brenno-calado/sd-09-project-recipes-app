import React, { useContext } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { RecipiesContext } from '../context/RecipiesContext';

const mealToRecipe = (meal) => ({
  // ...meal,
  thumbUrl: meal.strMealThumb,
  name: meal.strMeal,
});

function Comidas() {
  const { searchMealsList } = useContext(RecipiesContext);
  return (
    <div>
      <Header title="Comidas" showButton />
      <SearchBar isMealsPage />
      <RecipeList listItems={ searchMealsList.map(mealToRecipe) } />
    </div>
  );
}

export default Comidas;
