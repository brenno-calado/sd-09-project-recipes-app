import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetailsBtnFinishRecipeInProgress from './DetailsBtnFinishRecipeInProgress';

function IngredientsInProgress({ detailsContext }) {
  const { recipe } = detailsContext;
  const [ingredientsInProgress, setIngredientsInProgress] = useState([]);

  const populateStorage = () => {
    const { id } = recipe;
    const path = window.location.pathname;
    const cocktailsObj = { cocktails: {
      [id]: ingredientsInProgress,
    },
    };
    const mealsObject = { meals: {
      [id]: ingredientsInProgress,
    },
    };

    if (path.includes('comidas')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(mealsObject));
    } localStorage.setItem('inProgressRecipes', JSON.stringify(cocktailsObj));
  };

  const handleChange = (e) => {
    console.log(e.target);
    const { strIngredient } = e.target;
    setIngredientsInProgress((prevState) => [...prevState, strIngredient]);
    populateStorage();
  };

  function renderIngredientsInProgress() {
    const maxIngredients = 20;
    const ingredientsList = [];
    for (let index = 1; index < maxIngredients; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredientsList[index] = (
          <li data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              id={ `${index}-ingredient-step` }
              onChange={ (e) => handleChange(e) }
            />
            <label htmlFor={ `${index}-ingredient-step` }>
              {`${recipe[`strIngredient${index}`]} - ${recipe[`strMeasure${index}`]}`}
            </label>
          </li>
        );
      }
    }
    return ingredientsList
      .filter((ingr) => ingr.props.children !== null
        && ingr.props.children !== ''
        && ingr.props.children !== undefined);
  }

  const renderIngredients = () => (
    <div>
      <h4>Ingredients</h4>
      <ul className="ingredients-in-progess">
        { renderIngredientsInProgress() }
      </ul>
    </div>
  );

  const renderInstructions = () => (
    <div>
      <h4>Instructions</h4>
      <p data-testid="instructions">{recipe.strInstructions}</p>
    </div>
  );

  const props = { recipe };

  return (
    <div>
      { renderIngredients() }
      { renderInstructions() }
      <DetailsBtnFinishRecipeInProgress detailsContext={ props } />
    </div>
  );
}

IngredientsInProgress.propTypes = {
  data: PropTypes.object,
}.isRequired;

export default IngredientsInProgress;
