import React from 'react';

function useIngredientList() {
  function ingredientList(apiData) {
    const newArrayOfApiData = apiData.drinks.map((drink) => (
      Object.entries(drink)));

    const recipeItems = [];
    let number = 1;
    newArrayOfApiData[0].forEach((item) => {
      if (item[0] === `strIngredient${number}` && item[1] !== null) {
        const ingredient = item[1];
        newArrayOfApiData[0].forEach((item2) => {
          if (item2[0] === `strMeasure${number}` && item2[1] !== '') {
            const measure = item2[1];
            recipeItems.push([ingredient, ': ', measure]);
          }
        });
        number += 1;
      }
    });
    return recipeItems.map((item, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ Math.random() }
      >
        { item }
      </li>
    ));
  }
  return [ingredientList];
}

export default useIngredientList;
