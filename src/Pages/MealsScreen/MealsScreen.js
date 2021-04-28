import React, { useContext } from 'react';
import CardRecipeMeal from '../../Components/CardRecipeMeal.js/CardRecipeMeal';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { RecipeContext } from '../../Context';
import Footer from '../../Components/Footer/Footer';
import './MealsScreen.css';
import Header from '../../Components/Header/Header';

function MealsScreen() {
  const { recipies, typeRecipies, displaySearchBar } = useContext(RecipeContext);
  return (
    <div>
      <Header title="Comidas" />
      { (displaySearchBar) && <SearchBar page="comidas" />}
      <div className="list-meal-container">
        {(recipies.length > 1 && typeRecipies === 'comidas') && recipies
          .map((recipe, index) => (index < '12')
          && <CardRecipeMeal
            recipe={ recipe }
            // data-testid={ `${index}-recipe-card` }
            index={ index }
          />)}
      </div>
      <Footer />
    </div>
  );
}

export default MealsScreen;
