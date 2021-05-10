import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeFavoriteButton from '../components/RecipeFavoriteButton';
import RecipeDetailsHeader from '../components/RecipeDetailsHeader';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeShareButton from '../components/RecipeShareButton';
import RecipesAppContext from '../context/RecipesAppContext';
import RecipeIngredients from '../components/RecipeIngredients';

function DrinkInProgress({ match: { params: { id } } }) {
  const [disableBtn, setDisableBtn] = useState(true);
  const { drinkId, getDrinkId } = useContext(RecipesAppContext);

  useEffect(() => {
    if (drinkId.idDrink !== id) {
      getDrinkId(id);
    }
  }, [getDrinkId, drinkId, id]);

  return (
    <div>
      { (drinkId.idDrink === id) ? (
        <>
          <RecipeDetailsHeader type="Drink" />
          <RecipeShareButton />
          <RecipeFavoriteButton id={ id } type="Drink" />
          <RecipeIngredients type="cocktails" id={ id } setDisableBtn={ setDisableBtn } />
          <RecipeInstructions type="Drink" />
          <Link to="/receitas-feitas">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ disableBtn }
            >
              Finalizar Receita
            </button>
          </Link>
        </>
      ) : (<p className="loading-message">Loading...</p>) }
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default DrinkInProgress;
