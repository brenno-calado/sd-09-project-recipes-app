import { arrayOf, string } from 'prop-types';
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const IngredientsList = ({ ingredients, type }) => {
  const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { id } = useParams();

  const getRecipesinProgress = () => {
    if (inProgressRecipes && inProgressRecipes[type]) {
      Object.keys(inProgressRecipes[type]).forEach((recipeId) => {
        if (recipeId === id) {
          setIngredientsChecked(inProgressRecipes[type][recipeId]);
        }
      });
    }
  };

  useEffect(() => {
    getRecipesinProgress();
  }, []);

  const handleIngredientsCheck = (ingredient) => {
    let handleIngredients = [];
    if (ingredientsChecked.length && ingredientsChecked
      .find((item) => item === ingredient)) {
      ingredientsChecked.forEach((item) => {
        if (item !== ingredient) handleIngredients = [...handleIngredients, item];
      });
    } else {
      handleIngredients = [...ingredientsChecked, ingredient];
    }
    if (inProgressRecipes && inProgressRecipes[type]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        [type]: { ...inProgressRecipes[type], [id]: handleIngredients },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        [type]: { [id]: handleIngredients },
      }));
    }
    setIngredientsChecked(handleIngredients);
  };

  return (
    <div>
      <h4>Ingredientes</h4>
      { ingredients.map((ingredient, index) => (
        <label
          htmlFor={ ingredient }
          key={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          { ingredientsChecked.find((item) => item === ingredient)
            ? (
              <input
                checked
                type="checkbox"
                name={ ingredient }
                value={ ingredient }
                onClick={ () => handleIngredientsCheck(ingredient) }
              />)
            : (
              <input
                type="checkbox"
                name={ ingredient }
                value={ ingredient }
                onClick={ () => handleIngredientsCheck(ingredient) }
              />)}

          {ingredient}
        </label>
      )) }
      <button
        disabled={ ingredients.length !== ingredientsChecked.length }
        type="button"
        data-testid="finish-recipe-btn"
      >
        <Link to="/receitas-feitas">Finalizar</Link>
      </button>
    </div>
  );
};

IngredientsList.propTypes = {
  ingredients: arrayOf(string),
}.isRequired;

export default IngredientsList;
