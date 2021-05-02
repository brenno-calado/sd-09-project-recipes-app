import React, { useContext } from 'react';

import RecipeCard from '../RecipeCard';
import RecipesContext from '../../context/RecipesContext';

const RecipesList = () => {
  const { recipes, recipesType, recipesTypeSufix } = useContext(RecipesContext);
  const urlType = recipesType === 'meals' ? 'comidas' : 'bebidas';

  return (
    <main>
      {!recipes || recipes.isFetching ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          {recipes.recipesList.map((recipe, index) => (
            <RecipeCard
              key={ recipe[`id${recipesTypeSufix}`] }
              recipeName={ recipe[`str${recipesTypeSufix}`] }
              recipeImage={ recipe[`str${recipesTypeSufix}Thumb`] }
              index={ index }
              type={ urlType }
              id={ recipe[`id${recipesTypeSufix}`] }
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default RecipesList;
