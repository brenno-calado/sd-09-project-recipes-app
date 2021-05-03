import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import { RecipiesContext } from '../context/RecipiesContext';
import { getDrinksByName } from '../services/apiDrinks';

const drinkToRecipe = (drink) => ({
  // ...drink,
  thumbUrl: drink.strDrinkThumb,
  name: drink.strDrink,
});

function Bebidas() {
  const {
    searchDrinksList,
    setSearchDrinksList,
    showSearchBar,
  } = useContext(RecipiesContext);
  useEffect(() => {
    getDrinksByName('').then((data) => { setSearchDrinksList(data); });
  }, [setSearchDrinksList]);

  return (
    <div>
      <Header title="Bebidas" showExplorerButton />
      { showSearchBar && <SearchBar isMealsPage={ false } /> }
      <RecipeList listItems={ searchDrinksList && searchDrinksList.map(drinkToRecipe) } />
    </div>
  );
}

export default Bebidas;
