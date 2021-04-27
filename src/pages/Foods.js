import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';

const imgStyle = {
  maxWidth: '150x',
  maxHeight: '150px',
  margin: 'auto',
};

// a tela é 360 x 640
const containerStyle = {
  overflowY: 'scroll',
  width: '300px',
  maxHeight: '300px',
  marginTop: '100px',
};

export default function Foods() {
  const { recipesFoods } = useContext(myContext);
  const MAX_LENGTH_RECIPES = 12;
  const recipes = recipesFoods.slice(0, MAX_LENGTH_RECIPES);

  return (
    <div>
      <Header title="Comidas" />
      <div style={ containerStyle }>
        {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              src={ strMealThumb }
              style={ imgStyle }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
