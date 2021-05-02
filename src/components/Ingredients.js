import { object } from 'prop-types';
import React, { useEffect, useState } from 'react';

const Ingredients = (props) => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { recipe } = props;

  const getIngredientsList = () => {
    const ingredientsKey = Object.keys(recipe)
      .filter((key) => key.startsWith('strIngredient'))
      .filter((filteredKey) => (
        recipe[filteredKey] !== null && recipe[filteredKey] !== ''))
      .map((ingredient) => recipe[ingredient]);

    const measuresKey = Object.keys(recipe)
      .filter((key) => key.startsWith('strMeasure'))
      .filter((filteredKey) => (
        recipe[filteredKey] !== null && recipe[filteredKey] !== ''))
      .map((measure) => recipe[measure]);

    setIngredientsList(ingredientsKey.map((ingredient, index) => (
      ingredient.concat(' - ', measuresKey[index]))));
  };

  useEffect(() => {
    getIngredientsList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Ingredients
      <ul>
        {
          ingredientsList.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
            >
              { ingredient }
            </li>
          ))
        }
      </ul>
    </div>
  );
};

Ingredients.propTypes = {
  recipe: object,
}.isRequired;

export default Ingredients;
