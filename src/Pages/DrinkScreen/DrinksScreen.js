import React, { useContext } from 'react';
import CardRecipeDrink from '../../Components/CardRecipeDrink.js/CardRecipeDrink';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { RecipeContext } from '../../Context';

function DrinksScreen() {
  const { recipies } = useContext(RecipeContext);
  return (
    <div>
      <h1>Pagina de bebidas</h1>
      <SearchBar page="bebidas" />
      {(recipies.length > 1) && recipies
        .map((recipe, index) => (index < '12')
        && <CardRecipeDrink
          recipe={ recipe }
          data-testid={ `${index}-recipe-card` }
          index={ index }
        />)}
    </div>
  );
}

export default DrinksScreen;
