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
  const { recipesDrinks, drinkCategories } = useContext(myContext);
  const MAX_LENGTH_RECIPES = 12;
  const recipes = recipesDrinks.slice(0, MAX_LENGTH_RECIPES);

  const MAX_LENGTH_CATEGORIES = 5;
  const categories = drinkCategories.slice(0, MAX_LENGTH_CATEGORIES);

  return (
    <div>
      <Header title="Bebidas" />
      {categories.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      ))}
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
