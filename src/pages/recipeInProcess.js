import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useLocation, useParams } from 'react-router';
import getFoodsAndDrinks from '../services/servicesAPI';
import DetailHeader from '../components/detailHeader';
import IngredientCheckbox from '../components/ingredientCheckbox';
import finnishRecipe from '../components/finnishARecipe';
import { getItemLocalStorage,
  setItemLocalStorage } from '../services/servicesLocalStorage';

export default function RecipeInProcess() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isFood = (pathname.split('/')[1] === 'comidas');
  const [recipe, setRecipe] = useState([]);
  const [disableBtn, setDisable] = useState(true);
  const [redirectPage, setRedirect] = useState(false);
  const startedRecipes = getItemLocalStorage('inProgressRecipes');
  if (!startedRecipes) {
    setItemLocalStorage('inProgressRecipes', { cocktails: {}, meals: {} });
  }

  useEffect(() => {
    async function getRecipe() {
      const recipeType = isFood ? 'meals' : 'drinks';
      setRecipe(await getFoodsAndDrinks(recipeType, 'getById', id));
    }
    getRecipe();
  }, [isFood, id]);

  const enableBtnCallback = () => {
    setDisable(false);
  };

  if (redirectPage) {
    return <Redirect to="/receitas-feitas" />;
  }

  return (
    recipe.length > 0
    && (
      <main>
        <DetailHeader recipe={ recipe[0] } isFood={ isFood } />
        <IngredientCheckbox
          recipe={ recipe[0] }
          isFood={ isFood }
          callBack={ enableBtnCallback }
        />
        <p data-testid="instructions">{recipe[0].strInstructions}</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="btn btn-info fixed-btn"
          disabled={ disableBtn }
          onClick={ () => {
            finnishRecipe(recipe[0], isFood);
            setRedirect(true);
          } }
        >
          Finalizar Receita
        </button>
      </main>));
}
