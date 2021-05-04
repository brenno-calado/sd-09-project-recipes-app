import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { GrFavorite } from 'react-icons/gr';
import { useParams } from 'react-router';
import ReactPlayer from 'react-player';
import { RecipiesContext } from '../context/RecipiesContext';
import { getRecipesById } from '../services/api';

function RecipesDetailsCard({ isMeal }) {
  const { recipeDetails, setRecipeDetails } = useContext(RecipiesContext);
  const { id } = useParams();

  useEffect(() => {
    async function getRecipe() {
      const recipe = await getRecipesById(id, isMeal);
      setRecipeDetails(recipe[0]);
    }
    getRecipe();
  }, [id, isMeal, setRecipeDetails]);

  console.log(recipeDetails);
  /* const getRecipe = (recipe, idType) => (
    Object.values(recipe).find((mealOrDrink) => mealOrDrink[idType] === id)
  ); */

  /* const getIngredientsAndMeasure = (recipe) => {
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

  const renderIngredientsAndMeasure = () => {
    if (isMeal && searchMealsList) {
      const mealRecipe = getRecipe(searchMealsList, 'idMeal');
      return mealRecipe && getIngredientsAndMeasure(mealRecipe)
        .map(({ ingredient, measure }, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient} - ${measure}` }
          </li>
        ));
    }
    if (isMeal === false && searchDrinksList) {
      const drinkRecipe = getRecipe(searchDrinksList, 'idDrink');
      return drinkRecipe && getIngredientsAndMeasure(drinkRecipe)
        .map(({ ingredient, measure }) => (
          <li key={ ingredient }>{ `${ingredient} - ${measure}` }</li>
        ));
    }
  };

  const renderImg = () => (
    <img
      src={ isMeal
        ? getRecipe(searchMealsList, 'idMeal').strMealThumb
        : getRecipe(searchDrinksList, 'idDrink').strDrinkThumb }
      alt="Foto da receita"
      data-testid="recipe-photo"
      width="300"
    />
  );

  const renderTitle = () => (
    <h1 data-testid="recipe-title">
      { isMeal
        ? getRecipe(searchMealsList, 'idMeal').strMeal
        : getRecipe(searchDrinksList, 'idDrink').strDrink }
    </h1>
  );

  const renderCategory = () => (
    <h2 data-testid="recipe-category">
      {isMeal
        ? getRecipe(searchMealsList, 'idMeal').strCategory
        : getRecipe(searchDrinksList, 'idDrink').strCategory }
    </h2>
  );

  const renderInstructions = () => (
    <p data-testid="instructions">
      {isMeal
        ? getRecipe(searchMealsList, 'idMeal').strInstructions
        : getRecipe(searchDrinksList, 'idDrink').strInstructions}
    </p>
  );

  const renderVideo = () => (
    <div data-testid="video">
      {isMeal && <ReactPlayer url={ getRecipe(searchMealsList, 'idMeal').strYoutube } />}
    </div>
  ); */

  return (
    <section>
      {/* {renderImg()}
      {renderTitle()}
      <button type="button" data-testid="share-btn">
        <AiOutlineShareAlt />
      </button>
      <button type="button" data-testid="favorite-btn">
        <GrFavorite />
      </button>
      {renderCategory()}
      Ingredientes
      <ul>
        {renderIngredientsAndMeasure()}
      </ul>
      {renderInstructions()}
      {renderVideo()} */}
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
