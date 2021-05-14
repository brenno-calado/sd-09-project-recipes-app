import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import RecipeFavoriteButton from '../components/RecipeFavoriteButton';
import RecipeDetailsHeader from '../components/RecipeDetailsHeader';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeShareButton from '../components/RecipeShareButton';
import RecipesAppContext from '../context/RecipesAppContext';
import RecipeIngredients from '../components/RecipeIngredients';
import '../styles/pages/InProgress.css';
import Loading from '../components/Loading';

function DrinkInProgress({ match: { params: { id } } }) {
  const [disableBtn, setDisableBtn] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { drinkId, getDrinkId } = useContext(RecipesAppContext);

  useEffect(() => {
    if (drinkId.idDrink !== id) {
      getDrinkId(id);
    }
  }, [getDrinkId, drinkId, id]);

  function sendDoneRecipe() {
    const date = new Date();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipe = [{
      id: drinkId.idDrink,
      type: 'bebida',
      area: '',
      category: drinkId.strCategory,
      alcoholicOrNot: drinkId.strAlcoholic,
      name: drinkId.strDrink,
      image: drinkId.strDrinkThumb,
      doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      tags: (drinkId.strTags !== null) ? [drinkId.strTags] : [''],
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
      { (drinkId.idDrink === id) ? (
        <>
          <RecipeDetailsHeader type="Drink" />
          <div className="buttons-inprogress-container">
            <RecipeShareButton />
            <RecipeFavoriteButton id={ id } type="Drink" />
          </div>
          <RecipeIngredients type="cocktails" id={ id } setDisableBtn={ setDisableBtn } />
          <RecipeInstructions type="Drink" />
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

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default DrinkInProgress;
