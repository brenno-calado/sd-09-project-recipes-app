import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Recommendations from '../components/Recommendations';
import ButtonsContainer from '../components/ButtonsContainer';
import { useRecipes } from '../hooks';
import { RecipesContext } from '../context';
import '../styles/Details.css';
import ButtonStart from '../components/ButtonStart';

function Detalhes() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const {
    values: {
      doneRecipes: doneRecContext,
    },
  } = useContext(RecipesContext);

  const [loading, setLoading] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [doneRecipes] = useState(doneRecContext || []);

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
  }, [id]);

  useEffect(() => {
    console.log(recipeDetails);
    if (Object.keys(recipeDetails).length) {
      setLoading(false);
    }
  }, [recipeDetails]);

  function renderIngredients() {
    return recipeDetails.ingredients.map((ingredient, index) => (
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
          <p data-testid="instructions">{recipeDetails.instructions}</p>
          {type[1] === 'Meal'
          && <a href={ recipeDetails.video } data-testid="video">Video</a>}
          <Recommendations data={ recommendations } />
          { !doneRecipes.find(({ id: doneRecipeID }) => id === doneRecipeID)
          && (
            <ButtonStart id={ id } type={ type } />
          ) }
        </main>
      )

  );
}

export default Detalhes;
