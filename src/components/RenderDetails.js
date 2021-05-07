import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const RenderDetails = ({ recipe }) => {
  const { idDrink, strAlcoholic, strCategory, strDrink,
    strDrinkThumb, strInstructions } = recipe;

  const filterIngredients = () => {
    const recipeKeys = Object.keys(recipe);
    const recipeIngredientKeys = recipeKeys.filter((propriety) => (
      propriety.includes('strIngredient')));
    return recipeIngredientKeys.filter((ingredientKey) => (
      recipe[ingredientKey] !== null && recipe[ingredientKey] !== ''
    )).map((ingredintsKeys) => (
      recipe[ingredintsKeys]
    ));
  };

  const filterMeasures = () => {
    const measureKeys = Object.keys(recipe);
    const measureIngredientKeys = measureKeys.filter((propriety) => (
      propriety.includes('strMeasure')));
    return measureIngredientKeys.filter((measureKey) => (
      recipe[measureKey] !== null && recipe[measureKey] !== ''
    )).map((measureKey) => (
      recipe[measureKey]
    ));
  };

  const renderRecipeIngredients = () => {
    const ingredientsList = filterIngredients();
    const measureList = filterMeasures();
    return (
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

    );
  };
  return (
    <div>
      <img
        style={ { width: 300, height: 300 } }
        src={ strDrinkThumb }
        data-testid="recipe-photo"
        alt="Foto do prato"
      />
      <h2
        data-testid="recipe-title"
      >
        { strDrink }
      </h2>
      <h5
        data-testid="recipe-category"
      >
        {strAlcoholic}
      </h5>
      {renderRecipeIngredients()}
      <h3>Modo de preparo:</h3>
      <p
        data-testid="instructions"
      >
        { strInstructions }
      </p>
    </div>
  );
};

RenderDetails.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default RenderDetails;
