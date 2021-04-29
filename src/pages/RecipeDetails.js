import React, { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails({ recipe }) {
  const [isFavorite, setFavorite] = useState(false);
  const { strMeal, strMealThumb, strCategory } = recipe;

  const filterIngredients = () => {
    // console.log(recipe);
    const recipeIngredients = Object
      .entries(recipe).filter((key) => (
        key[0].includes('Ingredient') && key[1] !== '' && key[1] !== null
      ));
    const recipeIngredientsMeasures = Object
      .entries(recipe).filter((key) => (
        key[0].includes('Measure') && key[1] !== '' && key[1] !== null
      ));
    // console.log(recipeIngredients);
    // console.log(recipeIngredientsMeasures);

    const recipeIngredientsAndMeasures = [];
    recipeIngredients.forEach((ingr, index) => {
      recipeIngredientsAndMeasures
        .push(`${ingr[1]}: ${recipeIngredientsMeasures[index][1]}`);
    });
    return recipeIngredientsAndMeasures
      .map((item, index) => (
        <li
          key={ item }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { item }
        </li>
      ));
  };

  return (
    <div>
      <img src={ strMealThumb } alt="Receita" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <div>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="compartilhar" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => setFavorite(!isFavorite) }
        >
          <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
        </button>
      </div>
      <h2 data-testid="recipe-category">{`Categoria: ${strCategory}`}</h2>
      <ul>
        { filterIngredients() }
      </ul>
    </div>
  );
}

export default RecipeDetails;
