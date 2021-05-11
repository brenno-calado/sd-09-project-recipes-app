import React, { useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/details.css';
import RecipeStartButton from '../components/RecipeStartButton';
import RecipeFavoriteButton from '../components/RecipeFavoriteButton';
import RecipeShareButton from '../components/RecipeShareButton';
import RecipeDetailsHeader from '../components/RecipeDetailsHeader';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeIngredientsList from '../components/RecipeIngredientsList';

function RecipeDetails({ match: { params: { id } } }) {
  const {
    mealId,
    getMealId,
    drinkRecomendation,
  } = useContext(RecipesAppContext);

  const maxRecomendations = 6;

  useEffect(() => {
    getMealId(id);
  }, [getMealId, id]);

  return (
    <div>
      { (mealId.idMeal === id) ? (
        <div>
          <RecipeDetailsHeader type="Meal" />
          <RecipeShareButton />
          <RecipeFavoriteButton id={ id } type="Meal" />
          <RecipeIngredientsList type="Meal" />
          <RecipeInstructions type="Meal" />
          <ReactPlayer url={ mealId.strYoutube } data-testid="video" width="100%" />
          <Carousel width="100%">
            { drinkRecomendation.slice(0, maxRecomendations).map((drink, index) => (
              <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
                <img alt="Recomendation" src={ drink.strDrinkThumb } />
                <Carousel.Caption>
                  <p data-testid={ `${index}-recomendation-title` }>
                    {drink.strDrink}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            )) }
          </Carousel>
          <RecipeStartButton id={ id } type="meals" />
        </div>
      ) : (<p className="loading-message">Loading...</p>)}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default RecipeDetails;
