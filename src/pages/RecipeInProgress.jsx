import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeFavoriteButton from '../components/RecipeFavoriteButton';
import RecipeDetailsHeader from '../components/RecipeDetailsHeader';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeShareButton from '../components/RecipeShareButton';
import RecipesAppContext from '../context/RecipesAppContext';
import RecipeIngredients from '../components/RecipeIngredients';

function RecipeInProgress({ match: { params: { id } } }) {
  const [disableBtn, setDisableBtn] = useState(true);
  const { mealId, getMealId } = useContext(RecipesAppContext);

  useEffect(() => {
    if (mealId.idMeal !== id) {
      getMealId(id);
    }
  }, [getMealId, mealId, id]);

  return (
    <div>
      { (mealId.idMeal === id) ? (
        <>
          <RecipeDetailsHeader type="Meal" />
          <RecipeShareButton />
          <RecipeFavoriteButton id={ id } type="Meal" />
          <RecipeIngredients type="meals" id={ id } setDisableBtn={ setDisableBtn } />
          <RecipeInstructions type="Meal" />
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

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default RecipeInProgress;
