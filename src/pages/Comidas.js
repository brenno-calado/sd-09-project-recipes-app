import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { RecipiesContext } from '../context/RecipiesContext';
import { getRecipesByName } from '../services/api';
import CategoryFilters from '../components/CategoryFilters';

const mealToRecipe = (meal) => ({
  // ...meal,
  thumbUrl: meal.strMealThumb,
  name: meal.strMeal,
  url: `/comidas/${meal.idMeal}`,
});

function Comidas() {
  const {
    searchMealsList,
    setSearchMealsList,
    showSearchBar,
  } = useContext(RecipiesContext);
  useEffect(() => {
    getRecipesByName('', true).then((data) => { setSearchMealsList(data); });
  }, [setSearchMealsList]);

  return (
    <div>
      <Header title="Comidas" showButton />
      { showSearchBar && <SearchBar isMealsPage /> }
      <CategoryFilters isMealsPage />
      <RecipeList listItems={ searchMealsList && searchMealsList.map(mealToRecipe) } />
    </div>
  );
}

export default Comidas;
