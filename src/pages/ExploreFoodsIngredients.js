import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';
import SearchFoodsAPI from '../services/SearchFoodsAPI';

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

export default function ExploreFoodsIngredients() {
  const { foodIngredients, setRecipesFoods } = useContext(myContext);
  const MAX_LENGTH_INGREDIENTS = 12;
  const ingredients = foodIngredients.slice(0, MAX_LENGTH_INGREDIENTS);
  const history = useHistory();

  const handleClick = async (ingredient) => {
    // fazer o fetch do ingredient no type ingredient
    const recipes = await SearchFoodsAPI('ingredient', ingredient);
    setRecipesFoods(recipes);
    history.push('/comidas');
  };

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div style={ containerStyle }>
        {ingredients.map(({ idIngredient, strIngredient }, index) => (
          <div
            type="button"
            key={ idIngredient }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
              data-testid={ `${index}-card-img` }
              style={ imgStyle }
            />
            <button
              data-testid={ `${index}-card-name` }
              type="button"
              onClick={ () => handleClick(strIngredient) }
            >
              { strIngredient }
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
