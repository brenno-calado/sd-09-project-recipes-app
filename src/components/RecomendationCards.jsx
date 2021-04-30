import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../contexts/RecipesContext';
import fetchRecipeDetails from '../services/fetchRecipeDetails';

const SIX = 6;

function RecomendationCards({ path }) {
  const { recomendations, setRecomendations } = useContext(RecipesContext);

  useEffect(() => {
    async function recipeRecomendations() {
      // Logica reversa: Quando a receita for comida, recomendar bebidas e vice-versa.
      const category = path.includes('comidas') ? 'cocktail' : 'meal';
      const fetchedData = await fetchRecipeDetails(null, category);
      setRecomendations(fetchedData);
    }
    recipeRecomendations();

    return setRecomendations([]); // ComponentWillUnmount
  }, [path, setRecomendations]);

  /*   console.log('Recomendacoes:');
  console.log(recomendations); */

  const renderRecomendations = () => {
    const recomendationsList = (
      recomendations.filter((recomendation, index) => (
        index < SIX && recomendation)));

    return (
      recomendationsList.map((recomendation, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          className="card align-items-center m-2 flex-wrap"
          key={ recomendation.idMeal || recomendation.idDrink }
        >
          <img
            className="d-block w-100"
            src={ recomendation.strMealThumb || recomendation.strDrinkThumb }
            alt={ recomendation.srtMeal || recomendation.strDrink }
          />
          <span
            data-testid={ `${index}-recomendation-title` }
            className="text-content"
          >
            {recomendation.strMeal || recomendation.strDrink}
          </span>
        </div>
      )));
  };

  return renderRecomendations();
}

RecomendationCards.propTypes = {
  path: PropTypes.string,
}.isRequired;

/* <span data-testid="0-recomendation-card">card</span> */

export default RecomendationCards;
