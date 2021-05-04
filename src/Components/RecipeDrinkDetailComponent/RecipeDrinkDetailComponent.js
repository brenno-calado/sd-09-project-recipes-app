import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import { RecipeContext } from '../../Context';
import IngredientList from '../IngredientList/IngredientList';
import shareIcon from '../../images/shareIcon.svg';
import './RecipeDrinkDetailComponent.css';
import RecommendedRecipies from '../RecommendedRecipies/RecommendedRecepies';
import FaveDrinkBtn from '../FaveDrinkBtn/FaveDrinkBtn';

const copy = require('clipboard-copy');

function RecipeDrinkDetailComponent({ pageType }) {
  const { recipeSpec } = useContext(RecipeContext);
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const {
    idDrink,
    strDrink,
    strAlcoholic,
    strCategory,
    strDrinkThumb,
    strInstructions,
  } = recipeSpec;

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes && doneRecipes.length > 0) {
      setDone(doneRecipes.some((recipe) => recipe.id === idDrink));
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && Object.keys(inProgressRecipes.cocktails).length > 0) {
      setInProgress(Object.keys(inProgressRecipes.cocktails)
        .some((recipe) => recipe === idDrink));
    }
  }, [setDone, setInProgress, idDrink]);

  const copyFunction = () => {
    const recipeLink = `http://localhost:3000/bebidas/${idDrink}`;
    copy(recipeLink);
    setShowCopyMsg(true);
  };

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt="foto da receita"
        data-testid="recipe-photo"
      />
      <section className="recipe-detail-title-container">
        <h2 data-testid="recipe-title">{ strDrink }</h2>
        <div>
          <button type="button" onClick={ () => copyFunction() }>
            <img
              src={ shareIcon }
              alt="botão de compartilhar"
              data-testid="share-btn"
            />
          </button>
          <FaveDrinkBtn />
        </div>
        { (showCopyMsg) && <span>Link copiado!</span>}
      </section>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <IngredientList />
      <h3>Instructions</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      <RecommendedRecipies category={ strCategory } pageType={ pageType } />
      {(!done) && (
        <Link to={ `${idDrink}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
          >
            {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>
        </Link>
      )}
    </div>
  );
}

RecipeDrinkDetailComponent.propTypes = {
  pageType: string.isRequired,
};

export default RecipeDrinkDetailComponent;
