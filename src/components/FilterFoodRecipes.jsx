import React from 'react';

function FilterFoodRecipes({ recipes }) {
  const cardLimit = 12;
  function mapRecipes() {
    const map = recipes && recipes.map((recipe, index) => {
      if (index < cardLimit) {
        return (
          <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb }
              alt="recipe"
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h3>
          </div>
        );
      }
      return '';
    });
    return map;
  }
  return (
    <div>
      {mapRecipes}
    </div>
  );
}

export default FilterFoodRecipes;
