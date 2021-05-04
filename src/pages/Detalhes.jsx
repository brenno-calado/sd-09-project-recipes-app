import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Recommendations from '../components/Recommendations';
import { useRecipes } from '../hooks';
import '../styles/Details.css';

function Detalhes() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const { getRecipes } = useRecipes();

  const type = pathname.includes('comidas') ? ['comidas', 'Meal'] : ['bebidas', 'Drink'];
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
    const ingredients = Object.keys(recipeDetails)
      .filter((key) => key.includes('Ingredient') && recipeDetails[key])
      .map((key) => {
        const ingredientID = key.split('strIngredient')[1];
        return `${recipeDetails[key]} - ${recipeDetails[`strMeasure${ingredientID}`]}`;
      });
    return ingredients.map((ingredient, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ ingredient }
      >
        {ingredient}
      </li>
    ));
  }

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
              <button type="button" data-testid="share-btn">Share</button>
              <button type="button" data-testid="favorite-btn">Add to favorites</button>
            </div>
          </div>
          { renderIngredients() }
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
          {type[1] === 'Meal'
          && <a href={ recipeDetails.strYoutube } data-testid="video">Video</a>}
          <Recommendations data={ recommendations } />
          <button type="button" data-testid="start-recipe-btn">Start recipe</button>
        </main>
      )

  );
}

export default Detalhes;
