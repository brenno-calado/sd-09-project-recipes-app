import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/components/RecipeIngredients.css';

function RecipeIngredients({ type, id, setDisableBtn }) {
  const { mealId, drinkId } = useContext(RecipesAppContext);

  const recipe = (type === 'meals') ? mealId : drinkId;

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

  function checkLocalStorageObj() {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes === null) {
      const locaStrObj = { [type]: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(locaStrObj));
    } else if ((inProgressRecipes[type] === undefined)
      || (inProgressRecipes[type][id] === undefined)) {
      const locaStrObj = {
        ...inProgressRecipes,
        [type]: { ...inProgressRecipes[type], [id]: [] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(locaStrObj));
    }
  }

  const [ingredientsChecked, setIngredientsChecked] = useState(ingredientsList
    .reduce((itemA, itemB) => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      checkLocalStorageObj();
      if ((inProgressRecipes !== null)
      && (inProgressRecipes[type] !== undefined)
      && (inProgressRecipes[type][id] !== undefined)) {
        itemA = {
          ...itemA,
          [itemB]: inProgressRecipes[type][id]
            .some((ingredientChecked) => itemB === ingredientChecked),
        };
      }
      return itemA;
    }, {}));

  function handleIngredientChange({ target: { name } }) {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isCheked = inProgressRecipes[type][id]
      .some((ingredient) => ingredient === name);
    setIngredientsChecked((prevState) => ({
      ...prevState,
      [name]: !ingredientsChecked[name],
    }));
    if (isCheked) {
      inProgressRecipes[type][id] = inProgressRecipes[type][id]
        .filter((ingredient) => ingredient !== name);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      return;
    }
    inProgressRecipes[type][id].push(name);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  useEffect(() => {
    const isFinished = Object.values(ingredientsChecked)
      .every((value) => value);
    if (isFinished) {
      setDisableBtn(false);
      return;
    }
    setDisableBtn(true);
  }, [ingredientsChecked, setDisableBtn]);

  return (
    <div className="ingredients-container">
      <h4>Ingredients</h4>
      <form>
        { ingredientsList.map((ingredient, index) => (
          <div
            className="ingredient-container"
            key={ `${index}-ingredient-step` }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              name={ ingredient }
              id={ `${index}-ingredient-step` }
              className="recipe-ingredient"
              checked={ ingredientsChecked[ingredient] }
              onChange={ handleIngredientChange }
            />
            <label
              htmlFor={ `${index}-ingredient-step` }
              className="ingredient-label"
            >
              { ingredient }
            </label>
          </div>
        )) }
      </form>
    </div>
  );
}

RecipeIngredients.propTypes = {
  type: PropTypes.string,
  id: PropTypes.number,
  setDisableBtn: PropTypes.func,
}.isRequired;

export default RecipeIngredients;
