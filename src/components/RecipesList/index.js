import React, { useContext } from 'react';

import RecipeCard from '../RecipeCard';
import RecipesContext from '../../context/RecipesContext';

const RecipesList = () => {
  const { recipes, recipesType } = useContext(RecipesContext);

  const typeSufix = recipesType === 'meals' ? 'Meal' : 'Drink';
  const urlType = recipesType === 'meals' ? 'comidas' : 'bebidas';

  return (
    <main>
      {recipes && recipes.isFetching ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          {recipes.recipesList.map((recipe, index) => (
            <RecipeCard
              key={ recipe[`id${typeSufix}`] }
              recipeName={ recipe[`str${typeSufix}`] }
              recipeImage={ recipe[`str${typeSufix}Thumb`] }
              index={ index }
              type={ urlType }
              id={ recipe[`id${typeSufix}`] }
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default RecipesList;
