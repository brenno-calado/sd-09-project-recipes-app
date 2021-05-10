import React, { useEffect, useState } from 'react';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { fetchCocktailsIngredients } from '../services/CocktailApi';

function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    fetchCocktailsIngredients().then((response) => {
      setIngredients(response);
    });
  }, []);

  return (
    <div>
      <Header />
      <BottomMenu />
      {ingredients.slice(0, Number('12')).map((ingredient, index) => (
        <div data-testid={ `${index}-ingredient-card` } key={ index }>
          <h4 data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</h4>
          <img src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` } data-testid={ `${index}-card-img` } alt="" />
        </div>
      ))}
    </div>
  );
}

export default ExploreDrinksByIngredients;
