import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecomendedMeals from '../components/RecomendedMeals';
import RenderDrinkDetails from '../components/RenderDrinkDetails';
import '../App.css';

const DrinkDetails = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState({});
  const [done, setDone] = useState(false);
  const { idDrink, strInstructions } = recipe;
  console.log(id);
  const storageInProgress = (JSON
    .parse(localStorage.getItem('inProgressRecipes'))) || { cocktails: {} };
  const text = (storageInProgress.cocktails[id] !== undefined)
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
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        setRecipe(result.drinks[0]);
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

  const renderStartRecipeButton = () => (
    <div>
      { !done && (
        <Link to={ `${idDrink}/in-progress` }>
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
      <RenderDrinkDetails recipe={ recipe } id={ id } />
      { renderRecipeInstructions() }
      <RecomendedMeals />
      { renderStartRecipeButton() }
    </div>
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default DrinkDetails;
