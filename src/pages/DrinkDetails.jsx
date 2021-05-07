import React, { useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/details.css';
import StartRecipeButton from '../components/StartRecipeButton';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

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

  const ingredientsList = () => {
    const list = [];

    for (let index = 1; drinkId[`strIngredient${index}`] !== null; index += 1) {
      list.push(`
        ${drinkId[`strIngredient${index}`]} - ${drinkId[`strMeasure${index}`]}
      `);
    }
    return list;
  };

  return (
    <div>
      { (drinkId.idDrink === id) ? (
        <div>
          <img
            data-testid="recipe-photo"
            className="recipe-photo"
            alt={ drinkId.strDrink }
            src={ drinkId.strDrinkThumb }
          />
          <h3
            data-testid="recipe-title"
            className="recipe-title"
          >
            { drinkId.strDrink }
          </h3>
          <ShareButton />
          <FavoriteButton item={ drinkId } id={ id } type="cocktails" />
          <span data-testid="recipe-category">{ drinkId.strAlcoholic }</span>
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
            { drinkId.strInstructions }
          </p>
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
          <StartRecipeButton id={ id } type="cocktails" />
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
