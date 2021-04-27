import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';

export default function Foods() {
  const { recipesFoods } = useContext(myContext);
  const MAX_LENGTH_RECIPES = 12;
  const recipes = recipesFoods.slice(0, MAX_LENGTH_RECIPES);

  return (
    <div>
      <Header title="Comidas" />
      {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
          <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
          <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}
