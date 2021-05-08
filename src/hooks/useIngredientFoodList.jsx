import React from 'react';
import CheckInput from '../components/CheckInput';

function useIngredientFoodList() {
  function ingredientList(apiData, match, handleCheckFoodValuesValues) {
    const newArrayOfApiData = apiData.meals.map((meal) => (
      Object.entries(meal)));

    const recipeItems = [];
    let number = 1;
    newArrayOfApiData[0].forEach((item) => {
      if (item[0] === `strIngredient${number}`
        && (item[1] !== null && item[1] !== '')) {
        const ingredient = item[1];
        newArrayOfApiData[0].forEach((item2) => {
          if (item2[0] === `strMeasure${number}`
            && (item2[1] !== null && item2[1] !== '')) {
            const measure = item2[1];
            recipeItems.push([ingredient, ': ', measure]);
          }
        });
        number += 1;
      }
    });

    return recipeItems.map((item, index) => (
      match.path === '/comidas/:id/in-progress'
        ? (
          <div style={ { display: 'flex', flexDirection: 'column' } }>
            <CheckInput
              index={ index }
              handleCheckedValue={
                (event) => handleCheckFoodValuesValues(event, apiData)
              }
              item={ item }
              match={ match }
              type="meals"
              urlType="comidas"
            />
          </div>
        ) : (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ Math.random() }
          >
            { item }
          </li>

        )
    ));
  }

  return [ingredientList];
}

export default useIngredientFoodList;
