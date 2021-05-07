import React, { useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/details.css';
import StartRecipeButton from '../components/StartRecipeButton';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

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

  const ingredientsList = () => {
    const list = [];
    for (let index = 1; mealId[`strIngredient${index}`] !== ''; index += 1) {
      list.push(`
        ${mealId[`strIngredient${index}`]} - ${mealId[`strMeasure${index}`]}
      `);
    }
    return list;
  };

  return (
    <div>
      { (mealId.idMeal === id) ? (
        <div>
          <img
            data-testid="recipe-photo"
            className="recipe-photo"
            alt={ mealId.strMeal }
            src={ mealId.strMealThumb }
          />
          <h3 data-testid="recipe-title" className="recipe-title">{ mealId.strMeal }</h3>
          <ShareButton />
          <FavoriteButton item={ mealId } id={ id } type="meals" />
          <span data-testid="recipe-category">{ mealId.strCategory }</span>
          <ul className="list-ingredients">
            { ingredientsList().map((ingredients, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredients}
              </li>
            ))}
          </ul>
          <p data-testid="instructions" className="instructions">
            { mealId.strInstructions }
          </p>
          <ReactPlayer
            url={ mealId.strYoutube }
            data-testid="video"
            width="100%"
          />
          <Carousel width="100%">
            { drinkRecomendation.slice(0, maxRecomendations).map((drink, index) => (
              <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
                <img alt="Recomendation" src={ drink.strDrinkThumb } />
                <Carousel.Caption>
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {drink.strDrink}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            )) }
          </Carousel>
          <StartRecipeButton id={ id } type="meals" />
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
