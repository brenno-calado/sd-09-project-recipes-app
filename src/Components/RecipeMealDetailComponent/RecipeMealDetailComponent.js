import React, { useContext } from 'react';
import { RecipeContext } from '../../Context';
import IngredientList from '../IngredientList/IngredientList';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './RecipeMealDetailComponent.css';

function RecipeMealDetailComponent() {
  const { recipeSpec } = useContext(RecipeContext);
  const {
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
      <h3>Video</h3>
      {/* <iframe
        width="460"
        height="315"
        src={ strYoutube }
        title="YouTube video player"
      /> */}
      <iframe
        src={ `https://www.youtube.com/embed/${youTubeCode}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
         autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <h3>recommended</h3>
    </div>
  );
}

export default RecipeMealDetailComponent;
