import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';
import SearchFoodsAPI from '../services/SearchFoodsAPI';
import '../css/ExploreFoodsIngredients.css';

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
    <div className="explore-food-ingredients-body">
      <Header title="Explorar Ingredientes" />
      <div className="explore-food-ingredients-container">
        {ingredients.map(({ idIngredient, strIngredient }, index) => (
          <div
            key={ idIngredient }
            data-testid={ `${index}-ingredient-card` }
            className="food-ingredients-card"
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
              data-testid={ `${index}-card-img` }
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
