import React, { useContext } from 'react';
import CardRecipeDrink from '../../Components/CardRecipeDrink.js/CardRecipeDrink';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { RecipeContext } from '../../Context';
import './DrinksScreen.css';

function DrinksScreen() {
  const { recipies, typeRecipies, displaySearchBar } = useContext(RecipeContext);
  return (
    <div>
      <Header title="Bebidas" />
      { (displaySearchBar) && <SearchBar page="bebidas" />}
      <div className="list-drink-container">
        {(recipies.length > 1 && typeRecipies === 'bebidas') && recipies
          .map((recipe, index) => (index < '12')
          && <CardRecipeDrink
            recipe={ recipe }
            // data-testid={ `${index}-recipe-card` }
            index={ index }
          />)}
      </div>
      <Footer />
    </div>
  );
}

export default DrinksScreen;
