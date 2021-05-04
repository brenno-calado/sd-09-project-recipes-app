import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { GrFavorite } from 'react-icons/gr';
import { useParams } from 'react-router';
import ReactPlayer from 'react-player';
import { getRecipesById } from '../services/api';

const getIngredientsAndMeasure = (recipe) => {
  let ingredientsList = [];
  for (let i = 1; i <= Number('20'); i += 1) {
    const newItem = {
      ingredient: recipe[`strIngredient${i}`],
      measure: recipe[`strMeasure${i}`],
    };
    if (newItem && newItem.ingredient.length === 0) break;
    ingredientsList = [...ingredientsList, newItem];
  }
  return ingredientsList;
};

function RecipesDetailsCard({ isMeal }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getRecipe() {
      const recipe = await getRecipesById(id, isMeal);
      setRecipeDetails(recipe[0]);
    }
    getRecipe();
  }, [id, isMeal, setRecipeDetails]);

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
      <h1 data-testid="recipe-title">
        { isMeal ? recipeDetails.strMeal : recipeDetails.strDrink }
      </h1>
      <button type="button" data-testid="share-btn">
        <AiOutlineShareAlt />
      </button>
      <button type="button" data-testid="favorite-btn">
        <GrFavorite />
      </button>
      <h2 data-testid="recipe-category">{recipeDetails.strCategory }</h2>
      Ingredientes
      <ul>
        {renderIngredientsAndMeasure()}
      </ul>
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <div data-testid="video">
        {isMeal && <ReactPlayer url={ recipeDetails.strYoutube } />}
      </div>
      {/* <div data-testid={ `${index}-recomendation-card` }>Recomendações</div> */}
      <button type="button" data-testid="start-recipe-btn">
        Iniciar receita
      </button>
    </section>
  );
}

RecipesDetailsCard.propTypes = {
  isMeal: PropTypes.bool.isRequired,
};

export default RecipesDetailsCard;
