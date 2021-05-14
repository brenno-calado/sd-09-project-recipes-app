import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';
import { fetchIngredients } from '../services/MealApi';
import '../styles/pages/ExploreByIngredients.css';

function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { handleSearchClick } = useContext(RecipesAppContext);

  function handleIngredientClick(ingredient) {
    handleSearchClick({ filter: 'ingredient', searchText: ingredient }, 'comidas');
    setRedirect(true);
  }

  useEffect(() => {
    fetchIngredients().then((response) => {
      setIngredients(response);
    });
  }, []);
  return (
    <>
      <Header />
      <div className="explore-ingredients-container">
        <div className="explore-ingredients-cards-container">
          {ingredients.slice(0, Number('12')).map((ingredient, index) => (
            <button
              type="button"
              data-testid={ `${index}-ingredient-card` }
              key={ ingredient.idIngredient }
              className="ingredient-card"
              onClick={ () => handleIngredientClick(ingredient.strIngredient) }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt=""
              />
              <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</p>
            </button>
          ))}
        </div>
      </div>
      <BottomMenu />
      { redirect && <Redirect to="/comidas" /> }
    </>
  );
}

export default ExploreFoodsByIngredients;
