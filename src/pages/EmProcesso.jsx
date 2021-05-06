import React, { /* useContext, */ useEffect, useState } from 'react';
import { useLocation, useParams /* useHistory */ } from 'react-router-dom';
import Loading from '../components/Loading';
import { useRecipes } from '../hooks';
import '../styles/InProgress.css';
import ShareButton from '../components/ShareButton';
import LikeButton from '../components/LikeButton';

function EmProcesso() {
  const { pathname } = useLocation();
  const { id } = useParams();
  /*  const history = useHistory(); */

  const [loading, setLoading] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState({});

  /* const { values: { doneRecipes, inProgressRecipes } } = useContext(RecipesContext); */

  const { getRecipes } = useRecipes();

  const type = pathname.includes('comidas') ? ['comidas', 'Meal'] : ['bebidas', 'Drink'];
  const recType = pathname.includes('comidas')
    ? ['bebidas', 'Drink'] : ['comidas', 'Meal'];

  useEffect(() => {
    async function loadRecipe() {
      const details = await getRecipes(type[0], id);
      setRecipeDetails(details);
    }

    loadRecipe();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function renderIngredients() {
    const ingredients = Object.keys(recipeDetails)
      .filter((key) => key.includes('Ingredient') && recipeDetails[key])
      .map((key) => {
        const ingredientID = key.split('strIngredient')[1];
        return `${recipeDetails[key]} - ${recipeDetails[`strMeasure${ingredientID}`]}`;
      });
    return ingredients.map((ingredient, index) => (
      <>
        <br />
        <label
          key={ ingredient }
          htmlFor="ingredient"
          data-testid={ `${index}-ingredient-step` }
        >
          { ingredient }
          <input
            type="checkbox"
            name="ingredient"
          />
        </label>
      </>
    ));
  }

  /*   function renderStartButtonText() {
    const recipes = type[0] === 'comidas'
      ? inProgressRecipes.meals : inProgressRecipes.cocktails;
    return Object.keys(recipes).find((recipeID) => recipeID === id)
      ? 'Continuar Receita' : 'Iniciar Receita';
  } */

  return (
    loading
      ? <Loading />
      : (
        <main>
          <img
            src={ recipeDetails[`str${type[1]}Thumb`] }
            alt={ recipeDetails[`str${type[1]}`] }
            data-testid="recipe-photo"
            className="details__image"
          />
          <div className="details__horizontal-container">
            <div>
              <h2 data-testid="recipe-title">{recipeDetails[`str${type[1]}`]}</h2>
              <p data-testid="recipe-category">
                {type[1] === 'Drink'
                  ? recipeDetails.strAlcoholic : recipeDetails.strCategory}
              </p>
            </div>
            <div>
              <LikeButton recipeDetails={ recipeDetails } />
              <ShareButton />
            </div>
          </div>
          { renderIngredients() }
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
          {/* !doneRecipes.find(({ id: doneRecipeID }) => id === doneRecipeID)
          && (

            <button
              type="button"
              data-testid="start-recipe-btn"
              className="details__button--start"
              onClick={ () => history.push(`/${type[0]}/${id}/in-progress`) }
            >
              { renderStartButtonText() }
            </button>
          ) */}
          <button
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finalizar
          </button>
        </main>
      )

  );
}

export default EmProcesso;
