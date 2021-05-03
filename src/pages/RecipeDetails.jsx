import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import RecomendationCards from '../components/RecomendationCards';
import Loading from '../components/Loading';
import RecipesContext from '../contexts/RecipesContext';
import '../css/components/RecipeDetails.css';
import RecipeHeader from '../components/recipeDetails/RecipeHeader';

function RecipeDetails({ match: { path, url, params: { id } } }) {
  const { recipe, setRecipe, isLoading, setLoading } = useContext(RecipesContext);
  const [buttonWillHide, setButtonWillHide] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(false);

  useEffect(() => { // ComponentDidMount
    const doneStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (doneStorage.find((currentRecipe) => currentRecipe.id === id)) {
      setButtonWillHide(true);
    }

    const mockInProgress = {
      cocktails: {
        178319: ['essa aqui e uma bebidinha'],
      },
      meals: {
        52771: ['essa aqui e uma comidinha'],
      },
    };
    // const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const type = path.includes('comidas') ? 'meals' : 'cocktails';
    if (Object.keys(mockInProgress[type])[0] === id) { // Trocar mockInProgress por inProgressStorage
      setRecipeInProgress(true);
    }

    // Requisicao dos detalhes da receita atraves da API
    async function recipeDetails() {
      const category = type.slice(0, type.length - 1);
      setLoading(true);
      const fetchedData = await fetchRecipeDetails(id, category);
      // fetchedData[0].strYoutube = fetchedData[0].strYoutube.replace('watch?v=', 'embed/');
      setRecipe(fetchedData[0]);
      setLoading(false);
    }
    recipeDetails();
  }, [path, id, setRecipe, setLoading]);

  const convertRecipeKeys = (key) => (
    Object.keys(recipe) // Referencia: https://stackoverflow.com/questions/26795643/how-to-convert-object-containing-objects-into-array-of-objects
      .filter((filterKey) => filterKey.includes(key))
      .map((currentKey) => recipe[currentKey])
  );

  const recipeIngredients = () => {
    const ingredients = convertRecipeKeys('strIngredient');
    const measures = convertRecipeKeys('strMeasure');
    return (
      <>
        {ingredients.map((ingredient, index) => (
          ingredient !== '' && ingredient !== null && (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
            >
              {`${ingredient} - ${measures[index]}`}
            </li>
          )
        ))}
      </>
    );
  };

  const recipeInstructions = () => (
    <p
      data-testid="instructions"
    >
      {recipe.strInstructions}
    </p>
  );

  const recipeVideo = () => (
    <iframe
      data-testid="video"
      title={ recipe.strMeal || recipe.strDrink }
      src=""
    />
  );

  const startRecipeButton = () => (
    !buttonWillHide && (
      <Link to={ `${url}/in-progress` }>
        <button
          className="recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
        >
          {!recipeInProgress ? 'Iniciar Receita' : 'Continuar Receita'}
        </button>
      </Link>
    )
  );

  if (recipe === undefined) {
    return <Redirect to="/comidas" />;
  }

  return isLoading
    ? <Loading />
    : (
      <section>
        <RecipeHeader
          recipe={ recipe }
          id={ id }
          path={ path }
          url={ url }
        />
        { recipeIngredients()}
        { recipeInstructions()}
        { path.includes('comidas') && recipeVideo()}
        <RecomendationCards path={ path } />
        { startRecipeButton() }
      </section>
    );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
  path: PropTypes.string,
}.isRequired;

export default RecipeDetails;
