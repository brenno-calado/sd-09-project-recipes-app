import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import getFoodsAndDrinks from '../services/servicesAPI';
import DetailHeader from '../components/detailHeader';
import IngredientCheckbox from '../components/ingredientCheckbox';
import ingredientFilter from '../components/IngredientFilter';
import EndRecipe from '../components/endRecipe';

export default function RecipeInProcess() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isFood = (pathname.split('/')[1] === 'comidas');
  const [recipe, setRecipe] = useState([]);
  const [ingredientCount, setIngredientCount] = useState(0);
  const [allIngredients, setAllIngredients] = useState(0);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    async function getRecipe() {
      const recipeType = isFood ? 'meals' : 'drinks';
      setRecipe(await getFoodsAndDrinks(recipeType, 'getById', id));
    }
    getRecipe();
  }, [isFood, id]);

  useEffect(() => {
    if (recipe.length > 0) {
      const ingredientLength = ingredientFilter(recipe[0]).length;
      setAllIngredients(ingredientLength);
    }
  }, [recipe]);

  useEffect(() => {
    setReady(ingredientCount === allIngredients);
  }, [ingredientCount, allIngredients]);

  return (
    recipe.length > 0
    && (
      <div>
        <DetailHeader recipe={ recipe[0] } isFood={ isFood } />
        <IngredientCheckbox
          setCount={ setIngredientCount }
          recipe={ recipe[0] }
          isFood={ isFood }
        />
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe[0].strInstructions}</p>
        <EndRecipe isReady={ isReady } isFood={ isFood } />
      </div>));
}
