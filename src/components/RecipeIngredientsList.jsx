import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeIngredientsList({ type }) {
  const { mealId, drinkId } = useContext(RecipesAppContext);

  const recipe = (type === 'Meal') ? mealId : drinkId;

  const stopCondition = (index) => ((recipe[`strIngredient${index}`] !== '')
  && (recipe[`strIngredient${index}`] !== null));

  function getIngredients() {
    const list = [];
    for (let index = 1; stopCondition(index); index += 1) {
      list.push(`${recipe[`strIngredient${index}`]} - ${recipe[`strMeasure${index}`]}`);
    }
    return list;
  }

  const ingredientsList = getIngredients();

  return (
    <div className="ingredients-container">
      <h4>Ingredients</h4>
      <ul className="list-ingredients">
        { ingredientsList.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { ingredient }
          </li>
        ))}
      </ul>
    </div>
  );
}

RecipeIngredientsList.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default RecipeIngredientsList;
