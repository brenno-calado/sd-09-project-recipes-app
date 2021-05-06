import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { GrFavorite } from 'react-icons/gr';
import { useParams } from 'react-router';
import ReactPlayer from 'react-player';
import { getRecipesById } from '../services/api';
import RecomendationList from './RecomedationsList';
import { RecipiesContext } from '../context/RecipiesContext';

const getIngredientsAndMeasure = (recipe) => {
  let ingredientsList = [];
  for (let i = 1; i <= Number('20'); i += 1) {
    const newItem = {
      ingredient: recipe[`strIngredient${i}`],
      measure: recipe[`strMeasure${i}`],
    };
    if (newItem.ingredient === null || newItem.ingredient.length === 0) break;
    ingredientsList = [...ingredientsList, newItem];
  }
  return ingredientsList;
};

function RecipesDetailsCard({ isMeal }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { id } = useParams();
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipiesContext);

  useEffect(() => {
    async function getRecipe() {
      const request = await getRecipesById(id, isMeal);
      setRecipeDetails(request[0]);
    }
    getRecipe();
  }, [id, isMeal, setRecipeDetails]);

  function addFavorite() {
    setFavoriteRecipes({ obj: "test" });
  }

  const renderIngredientsAndMeasure = () => getIngredientsAndMeasure(recipeDetails)
    .map(({ ingredient, measure }, index) => (
      <li
        key={ ingredient }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { `${ingredient} - ${measure}` }
      </li>
    ));

  if (!recipeDetails) return <p>Loading...</p>;

  return (
    <section>
      <img
        src={ isMeal ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumb }
        alt="Foto da receita"
        data-testid="recipe-photo"
        width="300"
      />
      <h2 data-testid="recipe-title">
        { isMeal ? recipeDetails.strMeal : recipeDetails.strDrink }
      </h2>
      <button type="button" data-testid="share-btn">
        <AiOutlineShareAlt />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => addFavorite() }
      >
        <GrFavorite />
      </button>
      <h3 data-testid="recipe-category">
        {isMeal ? recipeDetails.strCategory : recipeDetails.strAlcoholic}
      </h3>
      <h4>Ingredientes</h4>
      <ul>
        {renderIngredientsAndMeasure()}
      </ul>
      <h4>Instruções</h4>
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <div data-testid="video">
        {isMeal && <ReactPlayer url={ recipeDetails.strYoutube } />}
      </div>
      <h4>Recomendadas</h4>
      <RecomendationList isMeal={ !isMeal } />
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="fixed-bottom btn btn-primary btn-block"
      >
        Iniciar receita
      </button>
    </section>
  );
}

RecipesDetailsCard.propTypes = {
  isMeal: PropTypes.bool.isRequired,
};

export default RecipesDetailsCard;
