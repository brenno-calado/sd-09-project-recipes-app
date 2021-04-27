import React, { useContext } from 'react';
import CardRecipeDrink from '../../Components/CardRecipeDrink.js/CardRecipeDrink';
import Footer from '../../Components/Footer/Footer';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { RecipeContext } from '../../Context';

function DrinksScreen() {
  const { recipies, typeRecipies } = useContext(RecipeContext);

  return (
    <div>
      <h1>Pagina de bebidas</h1>
      <SearchBar page="bebidas" />
      {(recipies.length > 1 && typeRecipies === 'bebidas') && recipies
        .map((recipe, index) => (index < '12')
        && <CardRecipeDrink
          recipe={ recipe }
          data-testid={ `${index}-recipe-card` }
          index={ index }
        />)}
      <Footer />
    </div>
  );
}

export default DrinksScreen;
