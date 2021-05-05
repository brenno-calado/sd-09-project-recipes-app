import React, { useContext, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import PropTypes from 'prop-types';
import RecipesContext from '../contexts/RecipesContext';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import 'react-multi-carousel/lib/styles.css';

const SIX = 6;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

function RecomendationCards({ path }) {
  const { recomendations, setRecomendations } = useContext(RecipesContext);

  useEffect(() => {
    async function recipeRecomendations() {
      // Logica reversa: Quando a receita for comida, recomendar bebidas e vice-versa.
      const category = path.includes('comidas') ? 'cocktail' : 'meal';
      const fetchedData = await fetchRecipeDetails(null, category);
      setRecomendations(fetchedData.filter((recomendation, index) => (
        index < SIX && recomendation)));
    }
    recipeRecomendations();

    return setRecomendations([]); // ComponentWillUnmount
  }, [path, setRecomendations]);

  const renderRecomendations = () => (
    <Carousel responsive={ responsive }>
      {recomendations.map((recomendation, index) => (
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
        </div>))}
    </Carousel>
  );

  return renderRecomendations();
}

RecomendationCards.propTypes = {
  path: PropTypes.string,
}.isRequired;

export default RecomendationCards;
