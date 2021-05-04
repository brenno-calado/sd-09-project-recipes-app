import React from 'react';
import PropTypes from 'prop-types';

function IngredientsInProgress({ detailsContext }) {
  const { recipe } = detailsContext;
  function renderIngredientsInProgress() {
    const maxIngredients = 20;
    const ingredientsList = [];
    for (let index = 1; index < maxIngredients; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredientsList[index] = (
          <li data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" id={ `${index}-ingredient-step` } />
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

  return (
    <div>
      { renderIngredients() }
      { renderInstructions() }
    </div>
  );
}

IngredientsInProgress.propTypes = {
  data: PropTypes.object,
}.isRequired;

export default IngredientsInProgress;
