import React, { useContext } from 'react';
import CardRecipeMeal from '../../Components/CardRecipeMeal.js/CardRecipeMeal';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { RecipeContext } from '../../Context';
import Footer from '../../Components/Footer/Footer';

function MealsScreen() {
  const { recipies, typeRecipies } = useContext(RecipeContext);
  return (
    <div>
      <h1>Pagina de comidas</h1>
      <SearchBar page="comidas" />
      {(recipies.length > 1 && typeRecipies === 'comidas') && recipies
        .map((recipe, index) => (index < '12')
        && <CardRecipeMeal
          recipe={ recipe }
          data-testid={ `${index}-recipe-card` }
          index={ index }
        />)}
      <Footer />
    </div>
  );
}

export default MealsScreen;
