import React from 'react';
import PropTypes from 'prop-types';

function Details({ recipe }) {
  console.log(recipe);
  function getIngredientsLiElements() {
    const maxIngredients = 20;
    const ingredientsList = [];
    for (let index = 1; index < maxIngredients; index += 1) {
      ingredientsList[index] = (
        <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
          {recipe[`strIngredient${index}`]}
        </li>
      );
    }
    return ingredientsList
      .filter((ingr) => ingr.props.children !== null && ingr.props.children !== '');
  }

  function getYouTubeId() {
    const magicNum = 32;
    return recipe.strYoutube.substr(magicNum);
  }

  return (
    <div>
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="img" />
      <br />
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite it</button>
      <h4>ingredients</h4>
      <div>
        <ul>
          {getIngredientsLiElements()}
        </ul>
      </div>
      <div>
        <h4>Instructions</h4>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <section>
        <h2>Recomended Recipes</h2>
      </section>
      <iframe
        title="video"
        id={ getYouTubeId() }
        type="text/html"
        width="640"
        height="360"
        src={ recipe.strYoutube }
      />
      {/* <p>O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";</p>
      {/* O vídeo, presente somente na tela de comidas, deve possuir o atributo data-testid="video";
O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
O botão de iniciar receita deve possuir o atributo data-testid="start-recipe-btn"; */}
    </div>
  );
}

Details.propTypes = { recipe: PropTypes.object }.isRequired;

export default Details;
