import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { fetchDrinkById } from '../services/index';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DrinkDetails() {
  const [isFavorite, setFavorite] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [currentDrink, setCurrentDrink] = useState({});
  const {
    strDrink,
    strDrinkThumb,
    strInstructions,
    strAlcoholic,
  } = currentDrink;
  const recipeId = useParams();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const retrievedRecipe = await fetchDrinkById(recipeId.id);
      setCurrentDrink(retrievedRecipe[0]);
      setFetching(false);
    };
    fetchRecipeDetails();
  }, [recipeId.id]);

  const filterIngredients = () => {
    const recipeIngredients = Object
      .entries(currentDrink).filter((key) => (
        key[0].includes('Ingredient') && key[1] !== '' && key[1] !== null
      ));
    const recipeIngredientsMeasures = Object
      .entries(currentDrink).filter((key) => (
        key[0].includes('Measure') && key[1] !== '' && key[1] !== null
      ));

    const recipeIngredientsAndMeasures = [];
    recipeIngredients.forEach((ingr, index) => {
      recipeIngredientsAndMeasures
        .push(`${ingr[1]}: ${recipeIngredientsMeasures[index][1]}`);
    });
    return recipeIngredientsAndMeasures
      .map((item, index) => (
        <li
          key={ item }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { item }
        </li>
      ));
  };

  const renderRecipeDetails = () => (
    <div className="recipe-details">
      <img
        className="recipe-image"
        src={ strDrinkThumb }
        alt="Receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ strDrink }</h1>
      <div>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="compartilhar" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => setFavorite(!isFavorite) }
        >
          <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
        </button>
      </div>
      <h2 data-testid="recipe-category">{strAlcoholic}</h2>
      <ul>
        { filterIngredients() }
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => console.log('clicou') }
      >
        Iniciar Receita
      </button>
      <section data-testid="0-recomendation-card">Recomendações</section>
    </div>
  );

  return (
    isFetching === false ? renderRecipeDetails() : <h1>Loading...</h1>
  );
}

export default DrinkDetails;
