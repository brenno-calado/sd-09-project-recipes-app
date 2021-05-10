import React, { useEffect, useState } from 'react';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { fetchIngredients } from '../services/MealApi';

function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients().then((response) => {
      setIngredients(response);
    });
  }, []);
  return (
    <div>
      <Header />
      <BottomMenu />
      {ingredients.slice(0, Number('12')).map((ingredient, index) => (
        <div data-testid={ `${index}-ingredient-card` } key={ ingredient.idIngredient }>
          <h4 data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</h4>
          <img src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` } data-testid={ `${index}-card-img` } alt="" />
        </div>
      ))}
    </div>
  );
}

export default ExploreFoodsByIngredients;
