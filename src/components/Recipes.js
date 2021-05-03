import React from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './Recipes.css';

function Recipes(props) {
  const {
    thumb, category,
    ingredientsList, measureList,
    recipeTitle, recipeInstruction,
  } = props;

  function shareRecipe() {
    console.log('Receita Compartilhada');
  }

  function favoriteRecipes() {
    console.log('Receita Favoritada');
  }

  const example = true;
  const mapExample2 = [{ recomendation: 'Rizoles' }];

  return (
    <div>
      <img src={ thumb } alt="food" data-testid="recipe-photo" />
      <div className="recipes-title">
        <h1 data-testid="recipe-title">{recipeTitle}</h1>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ shareRecipe }
          >
            <img src={ shareIcon } alt="food" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ favoriteRecipes }
            src={ !example ? whiteHeartIcon : blackHeartIcon }
          >
            <img
              src={ !example ? whiteHeartIcon : blackHeartIcon }
              alt="food"
            />
          </button>
        </div>
      </div>
      <div>
        <h3 data-testid="recipe-category">{ category }</h3>
      </div>
      <div>
        <h4>Lista de Ingredientes</h4>
        <ul>
          { ingredientsList.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
            >
              { `${ingredient} (${measureList[index] ? measureList[index] : ''})` }
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Modo de Preparo:</h2>
        <h3 data-testid="instructions">{recipeInstruction}</h3>
      </div>
      {mapExample2.map((item, index) => (
        <div key={ index }>
          <h3
            data-testid={ `${index}-recomendation-card` }
          >
            {item.recomendation }
          </h3>
        </div>
      ))}
    </div>
  );
}

Recipes.propTypes = {
  thumb: PropTypes.object,
  category: PropTypes.string,
  ingredientsList: PropTypes.func,
  measureList: PropTypes.func,
}.isRequired;

export default Recipes;
