import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';
import SearchDrinksAPI from '../services/SearchDrinksAPI';

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

export default function ExploreBeveragesIngredients() {
  const { drinkIngredients, setRecipesDrinks } = useContext(myContext);
  const MAX_LENGTH_INGREDIENTS = 12;
  const ingredients = drinkIngredients.slice(0, MAX_LENGTH_INGREDIENTS);
  const history = useHistory();

  const handleClick = async (ingredient) => {
    // fazer o fetch do ingredient no type ingredient
    const recipes = await SearchDrinksAPI('ingredient', ingredient);
    setRecipesDrinks(recipes);
    history.push('/bebidas');
  };

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <p>Esta é a pagina de explorar bebidas/ingredientes.</p>
      <div style={ containerStyle }>
        {ingredients.map(({ strIngredient1 }, index) => (
          <div key={ index } data-testid={ `${index}-ingredient-card` }>
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
              data-testid={ `${index}-card-img` }
              style={ imgStyle }
            />
            <button
              type="button"
              data-testid={ `${index}-card-name` }
              onClick={ () => handleClick(strIngredient1) }
            >
              { strIngredient1 }
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
