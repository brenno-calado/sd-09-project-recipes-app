import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { RecipiesContext } from '../context/RecipiesContext';
import { getRecipesByName } from '../services/api';
import CategoryFilters from '../components/CategoryFilters';

const drinkToRecipe = (drink) => ({
  // ...drink,
  thumbUrl: drink.strDrinkThumb,
  name: drink.strDrink,
  url: `/bebidas/${drink.idDrink}`,
});

function Bebidas() {
  const {
    searchDrinksList,
    setSearchDrinksList,
    showSearchBar,
  } = useContext(RecipiesContext);
  useEffect(() => {
    getRecipesByName('').then((data) => { setSearchDrinksList(data); });
  }, [setSearchDrinksList]);

  return (
    <div>
      <Header title="Bebidas" showButton />
      { showSearchBar && <SearchBar isMealsPage={ false } /> }
      <CategoryFilters />
      <RecipeList listItems={ searchDrinksList && searchDrinksList.map(drinkToRecipe) } />
    </div>
  );
}

export default Bebidas;
