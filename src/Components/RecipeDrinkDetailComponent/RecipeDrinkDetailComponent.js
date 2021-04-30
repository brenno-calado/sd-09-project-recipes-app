import { string } from 'prop-types';
import React, { useContext } from 'react';
import { RecipeContext } from '../../Context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import IngredientList from '../IngredientList/IngredientList';
import RecommendedRecipies from '../RecommendedRecipies/RecommendedRecepies';
import './RecipeDrinkDetailComponent.css';

function RecipeDrinkDetailComponent({ pageType }) {
  const { recipeSpec } = useContext(RecipeContext);
  const {
    strDrink,
    strAlcoholic,
    strCategory,
    strDrinkThumb,
    strInstructions,
  } = recipeSpec;
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
          <button type="button">
            <img
              src={ shareIcon }
              alt="botão de compartilhar"
              data-testid="share-btn"
            />
          </button>
          <button type="button">
            <img
              src={ whiteHeartIcon }
              alt="botão de compartilhar"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      </section>
      <p data-testid="recipe-category">{ strAlcoholic }</p>
      <IngredientList />
      <h3>Instructions</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      <RecommendedRecipies category={ strCategory } pageType={ pageType } />
      <div className="start-recipe-container">
        <button type="button" data-testid="start-recipe-btn">
          Iniciar Receita
        </button>
      </div>
    </div>
  );
}

RecipeDrinkDetailComponent.propTypes = {
  pageType: string.isRequired,
};

export default RecipeDrinkDetailComponent;
