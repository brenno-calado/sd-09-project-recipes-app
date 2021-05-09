import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import ButtonsContainer from '../components/ButtonsContainer';
import { useRecipes } from '../hooks';
import { RecipesContext } from '../context';
import '../styles/Details.css';

function EmProcesso() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const { values: { inProgressRecipes },
    actions: { addRecipeToInProgress, addRecipeToDone } } = useContext(RecipesContext);
  const { getRecipes } = useRecipes();

  const type = pathname.includes('comidas')
    ? ['comidas', 'Meal', 'meals']
    : ['bebidas', 'Drink', 'cocktails'];

  const [loading, setLoading] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredientsList, setIngredientList] = useState(
    inProgressRecipes && inProgressRecipes[type[2]] && inProgressRecipes[type[2]][id]
      ? inProgressRecipes[type[2]][id]
      : [],
  );

  useEffect(() => {
    async function loadRecipe() {
      const details = await getRecipes(type[0], id);
      setRecipeDetails(details);
    }

    loadRecipe();
  }, [id]);

  useEffect(() => {
    if (Object.keys(recipeDetails).length) {
      setLoading(false);
    }
  }, [recipeDetails]);

  useEffect(() => {
    const obj = { [id]: ingredientsList };
    addRecipeToInProgress(type[2], obj);
  }, [ingredientsList]);

  function handleCheck(target) {
    const item = target.name;
    const checked = ingredientsList.includes(item);
    setIngredientList((prev) => (checked
      ? prev.filter((ingr) => ingr !== (item))
      : [...prev, Number(item)]));
  }

  function handleClick() {
    addRecipeToDone(recipeDetails);
    history.push('/receitas-feitas');
  }

  function renderIngredients() {
    const ingredients = recipeDetails.ingredients || [];
    const progress = inProgressRecipes[type[2]][id];
    return ingredients.map((ingredient, index) => (
      <div key={ ingredient } data-testid={ `${index}-ingredient-step` }>
        <input
          type="checkbox"
          id={ ingredient }
          name={ index + 1 }
          onChange={ ({ target }) => handleCheck(target) }
          className="inputClass"
          checked={ progress.includes(index + 1) }
        />
        <label
          htmlFor={ ingredient }
          className="inputClass"
        >
          { ingredient }
        </label>
      </div>
    ));
  }

  return (
    loading
      ? <Loading />
      : (
        <main>
          <img
            src={ recipeDetails.image }
            alt={ recipeDetails.name }
            data-testid="recipe-photo"
            className="details__image"
          />
          <div className="details__horizontal-container">
            <div>
              <h2 data-testid="recipe-title">{recipeDetails.name}</h2>
              <p data-testid="recipe-category">
                {type[1] === 'Drink'
                  ? recipeDetails.alcoholicOrNot : recipeDetails.category}
              </p>
            </div>
            <ButtonsContainer recipeDetails={ recipeDetails } />
          </div>
          { renderIngredients() }
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ handleClick }
            disabled={
              recipeDetails.ingredients
              && ingredientsList.length !== recipeDetails.ingredients.length
            }
          >
            Finalizar
          </button>
        </main>
      )

  );
}

export default EmProcesso;
