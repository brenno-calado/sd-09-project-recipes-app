import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';

export default function Beverages() {
  const { recipesDrinks } = useContext(myContext);
  const MAX_LENGTH_RECIPES = 12;
  const recipes = recipesDrinks.slice(0, MAX_LENGTH_RECIPES);

  return (
    <div>
      <Header title="Bebidas" />
      {recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}
