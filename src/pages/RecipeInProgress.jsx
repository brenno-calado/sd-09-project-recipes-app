import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RecipeFavoriteButton from '../components/RecipeFavoriteButton';
import RecipeDetailsHeader from '../components/RecipeDetailsHeader';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeShareButton from '../components/RecipeShareButton';
import RecipesAppContext from '../context/RecipesAppContext';
import RecipeIngredients from '../components/RecipeIngredients';
import '../styles/pages/InProgress.css';
import Loading from '../components/Loading';

function RecipeInProgress({ match: { params: { id } } }) {
  const [disableBtn, setDisableBtn] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { mealId, getMealId } = useContext(RecipesAppContext);

  useEffect(() => {
    if (mealId.idMeal !== id) {
      getMealId(id);
    }
  }, [getMealId, mealId, id]);

  function sendDoneRecipe() {
    const date = new Date();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipe = [{
      id: mealId.idMeal,
      type: 'comida',
      area: mealId.strArea,
      category: mealId.strCategory,
      alcoholicOrNot: '',
      name: mealId.strMeal,
      image: mealId.strMealThumb,
      doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      tags: (mealId.strTags !== null) ? [mealId.strTags] : [''],
    }];
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
    } else {
      doneRecipes.push(doneRecipe[0]);
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }
    setRedirect(true);
  }

  return (
    <div className="in-progress-container">
      { (mealId.idMeal === id) ? (
        <>
          <RecipeDetailsHeader type="Meal" />
          <div className="buttons-inprogress-container">
            <RecipeShareButton />
            <RecipeFavoriteButton id={ id } type="Meal" />
          </div>
          <RecipeIngredients type="meals" id={ id } setDisableBtn={ setDisableBtn } />
          <RecipeInstructions type="Meal" />
          <button
            type="button"
            className="finish-recipe-btn"
            data-testid="finish-recipe-btn"
            disabled={ disableBtn }
            onClick={ sendDoneRecipe }
          >
            Finalizar Receita
          </button>
        </>
      ) : (<Loading />) }
      { (redirect && <Redirect to="/receitas-feitas" />) }
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default RecipeInProgress;
