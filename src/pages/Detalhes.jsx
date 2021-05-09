import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import Recommendations from '../components/Recommendations';
import { useRecipes } from '../hooks';
import { RecipesContext } from '../context';
import '../styles/Details.css';
import ShareButton from '../components/ShareButton';
import LikeButton from '../components/LikeButton';

function Detalhes() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const {
    values: {
      doneRecipes: doneRecContext,
      inProgressRecipes: inProgRecContext,
    },
  } = useContext(RecipesContext);

  const [loading, setLoading] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [doneRecipes] = useState(doneRecContext || []);
  const [inProgressRecipes] = useState(
    inProgRecContext || { cocktails: {}, meals: {} },
  );

  const { getRecipes } = useRecipes();

  const type = pathname.includes('comidas')
    ? ['comidas', 'Meal', 'meals']
    : ['bebidas', 'Drink', 'cocktails'];
  const recType = pathname.includes('comidas')
    ? ['bebidas', 'Drink'] : ['comidas', 'Meal'];

  useEffect(() => {
    async function loadRecipe() {
      const details = await getRecipes(type[0], id);
      setRecipeDetails(details);
    }

    async function loadRecommendations() {
      const REC_AMMOUNT = 6;
      const recs = await getRecipes(recType[0], '', 'name');
      setRecommendations(recs.filter((_, index) => index < REC_AMMOUNT));
    }

    loadRecipe();
    loadRecommendations();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function renderIngredients() {
    const ingredients = recipeDetails.ingredients || [];
    return ingredients.map((ingredient, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ ingredient }
      >
        {ingredient}
      </li>
    ));
  }

  function renderStartButtonText() {
    if (inProgressRecipes[type[2]]) {
      const recipes = inProgressRecipes[type[2]];
      return Object.keys(recipes).find((recipeID) => recipeID === id)
        ? 'Continuar Receita' : 'Iniciar Receita';
    }
    return 'Iniciar Receita';
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
            <div>
              <LikeButton recipeDetails={ recipeDetails } />
              <ShareButton category={ type[0] } id={ id } />
            </div>
          </div>
          { renderIngredients() }
          <p data-testid="instructions">{recipeDetails.instructions}</p>
          {type[1] === 'Meal'
          && <a href={ recipeDetails.video } data-testid="video">Video</a>}
          <Recommendations data={ recommendations } />
          { !doneRecipes.find(({ id: doneRecipeID }) => id === doneRecipeID)
          && (

            <button
              type="button"
              data-testid="start-recipe-btn"
              className="details__button--start"
              onClick={ () => history.push(`/${type[0]}/${id}/in-progress`) }
            >
              { renderStartButtonText() }
            </button>
          ) }
        </main>
      )

  );
}

export default Detalhes;
