import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveIngredients } from '../redux/actions';

function IngredientsList({ recipe, saveIngredientsDispatcher }) {
  const [ingredients, setIngredients] = useState([]);

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
    saveIngredientsDispatcher(Object.entries(obj));
  };

  useEffect(() => {
    getIngredients();
  }, [recipe]);

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
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${ingredient[0]}: ${ingredient[1]}` }
              </li>
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

const mapDispatchToProps = (dispatch) => ({
  saveIngredientsDispatcher:
    (ingredients) => dispatch(saveIngredients(ingredients)),
});

IngredientsList.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  saveIngredientsDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList);
