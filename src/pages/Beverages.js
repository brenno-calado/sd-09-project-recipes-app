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

export default function Beverages() {
  const { recipesDrinks } = useContext(myContext);
  const MAX_LENGTH_RECIPES = 12;
  const recipes = recipesDrinks.slice(0, MAX_LENGTH_RECIPES);

  return (
    <div>
      <Header title="Bebidas" />
      <div style={ containerStyle }>
        {recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
              style={ imgStyle }
            />
            <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
