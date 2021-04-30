import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from '../components/RecipeList';
import { RecipiesContext } from '../context/RecipiesContext';

const drinkToRecipe = (drink) => ({
  // ...drink,
  thumbUrl: drink.strDrinkThumb,
  name: drink.strDrink,
});

function Bebidas() {
  const { searchDrinksList } = useContext(RecipiesContext);
  return (
    <div>
      <Header title="Bebidas" showButton />
      <SearchBar isMealsPage={ false } />
      <RecipeList listItems={ searchDrinksList.map(drinkToRecipe) } />
    </div>
  );
}

export default Bebidas;
