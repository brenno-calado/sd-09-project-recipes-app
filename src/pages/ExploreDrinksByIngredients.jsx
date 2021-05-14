import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';
import { fetchCocktailsIngredients } from '../services/CocktailApi';
import '../styles/pages/ExploreByIngredients.css';

function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { handleSearchClick } = useContext(RecipesAppContext);

  function handleIngredientClick(ingredient) {
    handleSearchClick({ filter: 'ingredient', searchText: ingredient }, 'bebidas');
    setRedirect(true);
  }

  useEffect(() => {
    fetchCocktailsIngredients().then((response) => {
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
              key={ index }
              className="ingredient-card"
              onClick={ () => handleIngredientClick(ingredient.strIngredient1) }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt=""
              />
              <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</p>
            </button>
          ))}
        </div>
      </div>
      <BottomMenu />
      { redirect && <Redirect to="/bebidas" /> }
    </>
  );
}

export default ExploreDrinksByIngredients;
