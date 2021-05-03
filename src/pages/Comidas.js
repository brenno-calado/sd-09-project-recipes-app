import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { RecipiesContext } from '../context/RecipiesContext';
import { getMealsByName } from '../services/apiMeals';

const mealToRecipe = (meal) => ({
  // ...meal,
  thumbUrl: meal.strMealThumb,
  name: meal.strMeal,
});

function Comidas() {
  const {
    searchMealsList,
    setSearchMealsList,
    showSearchBar,
  } = useContext(RecipiesContext);
  useEffect(() => {
    getMealsByName('').then((data) => { setSearchMealsList(data); });
  }, [setSearchMealsList]);

  return (
    <div>
      <Header title="Comidas" showButton />
      { showSearchBar && <SearchBar isMealsPage /> }
      <RecipeList listItems={ searchMealsList && searchMealsList.map(mealToRecipe) } />
    </div>
  );
}

export default Comidas;
