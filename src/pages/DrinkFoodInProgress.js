import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

// const DrinkFoodInProgress = ({ match: { params: { id } } }) => {
const DrinkFoodInProgress = () => {
  const pathName = useLocation().pathname.split('/');
  const { recipes, addById } = useContext(RecipesContext);
  const id = pathName[2];
  let typeId;

  if (pathName[1] === 'comidas') {
    typeId = 'Meal';
  } else {
    typeId = 'Drink';
  }

  useEffect(() => {
    console.log(id);
    addById(pathName[1], pathName[2]);
  }, []);

  const createItens = (recipe) => {
    const returnArray = [];
    let measure;
    const recipeKeys = Object.keys(recipe);
    const ingredients = recipeKeys.filter((item) => item.includes('strIngredient')
      && recipe[item] !== '' && recipe[item] !== null);

    ingredients.forEach((item) => {
      measure = `strMeasure${item.substring('strIngredient'.length, item.length)}`;
      returnArray.push(`${recipe[item]} (${recipe[measure]})`);
    });

    return returnArray;
  };

  if (recipes.length === 0) {
    return (<div>Loading...</div>);
  }
  const recipe = recipes[0];
  const ingredients = createItens(recipe);

  return (

    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${typeId}Thumb`] }
        alt={ recipe[`str${typeId}`] }
      />
      <h3 data-testid="recipe-title">{ recipe[`str${typeId}`] }</h3>
      <button
        type="button"
      >
        <img
          src={ whiteHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"
        />
      </button>
      <button
        type="button"
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid="share-btn"
        />
      </button>
      <h4 data-testid="recipe-category">{ recipe.strategory }</h4>
      <h5>Ingredientes</h5>
      { ingredients.map((item, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            type="checkbox"
            id={ index }
            name={ index }
          />
          <label htmlFor={ index }>{ item }</label>
        </div>
      ))}
      <h5>Instruções</h5>
      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar Receita
      </button>
    </div>
  );
};

// DrinkFoodInProgress.propTypes = {
//   match: PropTypes.object,
//   params: PropTypes.object,
//   id: PropTypes.string,
// }.isRequired;

export default DrinkFoodInProgress;
