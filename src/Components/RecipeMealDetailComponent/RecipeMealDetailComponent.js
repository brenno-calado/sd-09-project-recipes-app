import React, { useContext } from 'react';
import { RecipeContext } from '../../Context';
import IngredientList from '../IngredientList/IngredientList';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './RecipeMealDetailComponent.css';

function RecipeMealDetailComponent() {
  const { recipeSpec } = useContext(RecipeContext);
  console.log(recipeSpec);
  const {
    strMeal,
    strCategory,
    strMealThumb,
    strInstructions,
  } = recipeSpec;
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
      <p data-testid="recipe-category">{ strCategory }</p>
      <IngredientList />
      <h3>Instructions</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      {/* <iframe
        width="560"
        height="315"
        src={ recipe.strYoutube }
        title="YouTube video player"
      /> */}
    </div>
  );
}

export default RecipeMealDetailComponent;
