import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import { RecipeContext } from '../../Context';
import IngredientList from '../IngredientList/IngredientList';
import shareIcon from '../../images/shareIcon.svg';
import './RecipeMealDetailComponent.css';
import RecommendedRecipies from '../RecommendedRecipies/RecommendedRecepies';
import FaveMealBtn from '../FaveMealBtn/FaveMealBtn';

const copy = require('clipboard-copy');

function RecipeMealDetailComponent({ pageType }) {
  const { recipeSpec } = useContext(RecipeContext);
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const {
    idMeal,
    strMeal,
    strCategory,
    strMealThumb,
    strInstructions,
    strYoutube,
  } = recipeSpec;
  let youTubeCode = '';
  if (strYoutube) {
    youTubeCode = strYoutube.replace('https://www.youtube.com/watch?v=', '');
  }

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes && doneRecipes.length > 0) {
      setDone(doneRecipes.some((recipe) => recipe.id === idMeal));
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && Object.keys(inProgressRecipes.meals).length > 0) {
      setInProgress(Object.keys(inProgressRecipes.meals)
        .some((recipe) => recipe === idMeal));
    }
  }, [setDone, setInProgress, idMeal]);

  const copyFunction = () => {
    const recipeLink = `http://localhost:3000/comidas/${idMeal}`;
    copy(recipeLink);
    setShowCopyMsg(true);
  };

  return (
    <div>
      <img
        src={ strMealThumb }
        alt="foto da receita"
        data-testid="recipe-photo"
      />
      <section className="recipe-detail-title-container">
        <h2 data-testid="recipe-title">{ strMeal }</h2>
        <div>
          <button type="button" onClick={ () => copyFunction() }>
            <img
              src={ shareIcon }
              alt="botão de compartilhar"
              data-testid="share-btn"
            />
          </button>
          <FaveMealBtn />
        </div>
        { (showCopyMsg) && <span>Link copiado!</span>}
      </section>
      <p data-testid="recipe-category">{ strCategory }</p>
      <IngredientList />
      <h3>Instructions</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      <h3>Video</h3>
      <iframe
        src={ `https://www.youtube.com/embed/${youTubeCode}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
         autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        data-testid="video"
      />
      <RecommendedRecipies category={ strCategory } pageType={ pageType } />
      {(!done) && (
        <Link to={ `${idMeal}/in-progress` }>
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

RecipeMealDetailComponent.propTypes = {
  pageType: string.isRequired,
};

export default RecipeMealDetailComponent;
