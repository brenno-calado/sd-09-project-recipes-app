import React, { useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/pages/details.css';
import RecipeStartButton from '../components/RecipeStartButton';
import RecipeFavoriteButton from '../components/RecipeFavoriteButton';
import RecipeShareButton from '../components/RecipeShareButton';
import RecipeDetailsHeader from '../components/RecipeDetailsHeader';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeIngredientsList from '../components/RecipeIngredientsList';
import Loading from '../components/Loading';

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
    <div className="details-container">
      { (mealId.idMeal === id) ? (
        <div>
          <RecipeDetailsHeader type="Meal" />
          <div className="buttons-detail-container">
            <RecipeShareButton />
            <RecipeFavoriteButton id={ id } type="Meal" />
          </div>
          <RecipeIngredientsList type="Meal" />
          <RecipeInstructions type="Meal" page="details" />
          <div className="recomendation-container">
            <h4>Recommendations</h4>
            <Carousel width="100%">
              { drinkRecomendation.slice(0, maxRecomendations).map((drink, index) => (
                <Carousel.Item
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    alt="Recomendation"
                    src={ drink.strDrinkThumb }
                    className="carousel-img"
                  />
                  <Carousel.Caption>
                    <p data-testid={ `${index}-recomendation-title` }>
                      {drink.strDrink}
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              )) }
            </Carousel>
          </div>
          <RecipeStartButton id={ id } type="meals" />
        </div>
      ) : (<Loading />)}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default RecipeDetails;
