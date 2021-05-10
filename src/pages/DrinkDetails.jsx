import React, { useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/details.css';
import RecipeStartButton from '../components/RecipeStartButton';
import RecipeFavoriteButton from '../components/RecipeFavoriteButton';
import RecipeShareButton from '../components/RecipeShareButton';
import RecipeInstructions from '../components/RecipeInstructions';
import RecipeDetailsHeader from '../components/RecipeDetailsHeader';
import RecipeIngredientsList from '../components/RecipeIngredientsList';

function DrinkDetails({ match: { params: { id } } }) {
  const {
    drinkId,
    getDrinkId,
    mealRecomendation,
  } = useContext(RecipesAppContext);

  const maxRecomendations = 6;

  useEffect(() => {
    getDrinkId(id);
  }, [getDrinkId, id]);

  return (
    <div>
      { (drinkId.idDrink === id) ? (
        <div>
          <RecipeDetailsHeader type="Drink" />
          <RecipeShareButton />
          <RecipeFavoriteButton id={ id } type="Drink" />
          <RecipeIngredientsList type="Drink" />
          <RecipeInstructions type="Drink" />
          <Carousel>
            { mealRecomendation.slice(0, maxRecomendations).map((meal, index) => (
              <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
                <img alt="Recomendation" src={ meal.strMealThumb } />
                <Carousel.Caption>
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {meal.strMeal}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            )) }
          </Carousel>
          <RecipeStartButton id={ id } type="cocktails" />
        </div>
      ) : (<p className="loading-message">Loading...</p>)}
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default DrinkDetails;
