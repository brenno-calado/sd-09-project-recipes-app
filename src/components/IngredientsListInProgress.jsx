import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLocalStorage } from '../helpers/VerifyRecipeStatus';

function IngredientsListInProgress({ recipe, recipeType, setToggle }) {
  const [ingredients, setIngredients] = useState([]);
  const [checkIngredients, setCheckIngredients] = useState({});

  const getStateFromLocalStorage = (newState) => {
    setLocalStorage(recipe, recipeType);
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      console.log(inProgress);
      if (recipeType === 'comidas'
      && Object.keys(inProgress.meals[recipe.idMeal]).length === 0) {
        const { meals } = inProgress;
        meals[recipe.idMeal] = newState;
      }
      if (recipeType === 'bebidas'
      && Object.keys(inProgress.cocktails[recipe.idDrink]).length === 0) {
        const { cocktails } = inProgress;
        cocktails[recipe.idDrink] = newState;
      }
      if (recipeType === 'comidas'
        && Object.keys(inProgress.meals[recipe.idMeal]).length !== 0) {
        const { meals } = inProgress;
        setCheckIngredients(meals[recipe.idMeal]);
      }
      if (recipeType === 'bebidas'
        && Object.keys(inProgress.cocktails[recipe.idDrink]).length !== 0) {
        const { cocktails } = inProgress;
        setCheckIngredients(cocktails[recipe.idDrink]);
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
  };

  const mountState = (array) => {
    const newState = array.reduce((acc, ingredient) => {
      if (ingredient !== '' && ingredient !== 'null') acc[ingredient] = false;
      return acc;
    }, {});
    setCheckIngredients(newState);
    getStateFromLocalStorage(newState);
  };

  const getIngredients = () => {
    const chave = 'strIngredient';
    const valor = 'strMeasure';
    const arrayKeys = Object.keys(recipe);
    const ingredientKeys = arrayKeys.filter((key) => key.includes(chave));
    const measureKeys = arrayKeys.filter((key) => key.includes(valor));
    const obj = {};
    for (let index = 0; index < ingredientKeys.length; index += 1) {
      obj[recipe[ingredientKeys[index]]] = recipe[measureKeys[index]];
    }
    setIngredients(Object.entries(obj));
    mountState(Object.keys(obj));
  };

  useEffect(() => {
    getIngredients();
  }, [recipe]);

  const handleChange = ({ target: { checked, name } }) => {
    setCheckIngredients((prev) => {
      const object = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const { cocktails, meals } = object;
      if (recipeType === 'comidas') {
        meals[recipe.idMeal] = ({
          ...prev,
          [name]: checked,
        });
      }
      if (recipeType === 'bebidas') {
        cocktails[recipe.idDrink] = ({
          ...prev,
          [name]: checked,
        });
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(object));
      setToggle((prevState) => !prevState);
      return ({
        ...checkIngredients,
        [name]: checked,
      });
    });
  };

  return (
    <div>
      <ul>
        {
          recipe.length !== 0 && ingredients !== undefined
          && ingredients.map((ingredient, index) => {
            if (ingredient[0] === '' || ingredient[0] === 'null') {
              return;
            }
            return (
              <div
                key={ ingredient }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  name={ ingredient[0] }
                  onChange={ handleChange }
                  checked={ checkIngredients[ingredient[0]] }
                />
                <li
                  name={ ingredient[0] }
                  className={ checkIngredients[ingredient[0]] ? 'done' : 'undone' }
                >
                  { `${ingredient[0]}: ${ingredient[1]}` }
                </li>
              </div>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipe: state.recipeDetailsReducer.recipe,
  recipeType: state.recipesReducer.recipeType,
});

IngredientsListInProgress.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  recipeType: PropTypes.string.isRequired,
  setToggle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(IngredientsListInProgress);
