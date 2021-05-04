import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Card from '../components/Card';
import { useRecipes } from '../hooks';

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

  function renderRecommendations() {
    return <Card data={ recommendations } />;
  }

  return (
    loading
      ? <p>LOADING...</p>
      : (
        <main>
          <img
            src={ recipeDetails[`str${type[1]}Thumb`] }
            alt={ recipeDetails[`str${type[1]}`] }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{recipeDetails[`str${type[1]}`]}</h2>
          {type[1] === 'Drink'
          && <p>{recipeDetails.strAlcoholic}</p>}
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Add to favorites</button>
          <p data-testid="recipe-category">{recipeDetails.strCategory}</p>
          <ul>
            { renderIngredients() }
          </ul>
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
          {type[1] === 'Meal'
          && <a href={ recipeDetails.strYoutube } data-testid="video">Video</a>}
          { renderRecommendations() }
          <button type="button" data-testid="start-recipe-btn">Start recipe</button>
        </main>
      )

  );
}

export default Detalhes;
