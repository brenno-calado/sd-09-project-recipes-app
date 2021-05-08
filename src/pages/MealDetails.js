import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecomendedDrinks from '../components/RecomendedDrinks';
import RenderMealDetails from '../components/renderMealDetails';
import '../App.css';

const MealDetails = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState({});
  const [done, setDone] = useState(false);
  const { idMeal, strInstructions, strYoutube } = recipe;

  const storageInProgress = (JSON
    .parse(localStorage.getItem('inProgressRecipes'))) || { meals: {} };
  const text = (storageInProgress.meals[id] !== undefined)
    ? 'Continuar Receita' : 'Iniciar Receita';

  const isDone = () => {
    const recipesFromStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const recipeIsDone = recipesFromStorage.some((item) => item.id === id);
    if (recipeIsDone) {
      setDone(true);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        setRecipe(result.meals[0]);
      } catch (error) {
        return Error(error);
      }
    };
    fetchRecipe();
    isDone();
  }, [id]);

  const renderRecipeInstructions = () => (
    <div>
      <h3>Modo de preparo:</h3>
      <p
        data-testid="instructions"
      >
        { strInstructions }
      </p>
    </div>
  );

  const renderRecipeVideo = () => (
    <iframe
      title="video"
      width="300"
      height="300"
      src={ strYoutube }
      data-testid="video"
    />
  );

  const renderStartRecipeButton = () => (
    <div>
      { !done && (
        <Link to={ `${idMeal}/in-progress` }>
          <button
            className="footer"
            type="button"
            data-testid="start-recipe-btn"
          >
            {text}
          </button>
        </Link>
      )}
    </div>
  );

  return (
    <div>
      <RenderMealDetails recipe={ recipe } id={ id } />
      { renderRecipeInstructions() }
      { renderRecipeVideo() }
      <RecomendedDrinks />
      { renderStartRecipeButton() }
    </div>
  );
};

MealDetails.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default MealDetails;
