import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';
import SearchDrinksAPI from '../services/SearchDrinksAPI';
import '../css/ExploreBeverageIngredients.css';

export default function ExploreBeveragesIngredients() {
  const { drinkIngredients, setRecipesDrinks } = useContext(myContext);
  const MAX_LENGTH_INGREDIENTS = 12;
  const ingredients = drinkIngredients.slice(0, MAX_LENGTH_INGREDIENTS);
  const history = useHistory();

  const handleClick = async (ingredient) => {
    const recipes = await SearchDrinksAPI('ingredient', ingredient);
    setRecipesDrinks(recipes);
    history.push('/bebidas');
  };

  return (
    <div className="explore-drink-ingredients-body">
      <Header title="Explorar Ingredientes" />
      <div className="explore-drink-ingredients-container">
        {ingredients.map(({ strIngredient1 }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-card-name` }
            className="drink-ingredients-card"
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <button
              type="button"
              data-testid={ `${index}-ingredient-card` }
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
